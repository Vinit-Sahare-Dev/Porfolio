import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Activity } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubStats {
  totalContributions: number;
  activeDays: number;
  currentStreak: number;
  contributionDays: ContributionDay[];
}

const GITHUB_USERNAME = 'Vinit-Sahare-Dev';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

/**
 * Fetches GitHub contribution data using a proxy service
 * Falls back to mock data if fetch fails
 */
async function fetchGitHubContributions(): Promise<GitHubStats> {
  try {
    // Using GitHub's contribution calendar via a CORS proxy
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
    );
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    
    // Process the contribution data
    const contributions = data.contributions || [];
    const totalContributions = data.total?.lastYear || contributions.reduce((sum: number, day: any) => sum + day.count, 0);
    const activeDays = contributions.filter((day: any) => day.count > 0).length;
    
    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    const sortedContributions = [...contributions].sort((a: any, b: any) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    for (const day of sortedContributions) {
      if (day.count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    // Map to our format with levels
    const contributionDays: ContributionDay[] = contributions.map((day: any) => ({
      date: day.date,
      count: day.count,
      level: day.level as 0 | 1 | 2 | 3 | 4
    }));
    
    return {
      totalContributions,
      activeDays,
      currentStreak,
      contributionDays: contributionDays.slice(-365) // Last year
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    // Return placeholder data on error
    return generatePlaceholderData();
  }
}

function generatePlaceholderData(): GitHubStats {
  const days: ContributionDay[] = [];
  const today = new Date();
  
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const count = Math.random() > 0.6 ? Math.floor(Math.random() * 10) : 0;
    days.push({
      date: date.toISOString().split('T')[0],
      count,
      level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4
    });
  }
  
  return {
    totalContributions: days.reduce((sum, d) => sum + d.count, 0),
    activeDays: days.filter(d => d.count > 0).length,
    currentStreak: 0,
    contributionDays: days
  };
}

const levelColors = {
  0: 'bg-muted/50',
  1: 'bg-emerald-900/60',
  2: 'bg-emerald-700/80',
  3: 'bg-emerald-500',
  4: 'bg-emerald-400'
};

export function GitHubActivity() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubContributions().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  // Group contributions by week for the grid
  const getWeeks = () => {
    if (!stats) return [];
    
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    
    stats.contributionDays.forEach((day, index) => {
      const dayOfWeek = new Date(day.date).getDay();
      
      if (index === 0) {
        // Fill empty days at the start
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: '', count: 0, level: 0 });
        }
      }
      
      currentWeek.push(day);
      
      if (dayOfWeek === 6 || index === stats.contributionDays.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    return weeks;
  };

  const weeks = getWeeks();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (loading) {
    return (
      <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-48" />
          <div className="h-24 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Github className="size-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">GitHub Activity</h3>
            <p className="text-sm text-muted-foreground">
              {stats?.totalContributions} contributions in the last year
            </p>
          </div>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
        >
          <Github className="size-4" />
          Visit GitHub
          <ExternalLink className="size-3" />
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-accent/50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-2 text-primary mb-1">
            <Activity className="size-4" />
          </div>
          <p className="text-xl sm:text-2xl font-bold">{stats?.totalContributions}</p>
          <p className="text-xs text-muted-foreground">Contributions</p>
        </div>
        <div className="bg-accent/50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-2 text-emerald-500 mb-1">
            <Calendar className="size-4" />
          </div>
          <p className="text-xl sm:text-2xl font-bold">{stats?.activeDays}</p>
          <p className="text-xs text-muted-foreground">Active Days</p>
        </div>
        <div className="bg-accent/50 rounded-lg p-3 text-center col-span-2 sm:col-span-1">
          <div className="flex items-center justify-center gap-2 text-orange-500 mb-1">
            <span className="text-lg">🔥</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold">{stats?.currentStreak}</p>
          <p className="text-xs text-muted-foreground">Current Streak</p>
        </div>
      </div>

      {/* Contribution Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[700px]">
          {/* Month labels */}
          <div className="flex text-xs text-muted-foreground mb-2 pl-8">
            {months.map((month, i) => (
              <span key={month} className="flex-1 text-center" style={{ width: `${100/12}%` }}>
                {month}
              </span>
            ))}
          </div>
          
          {/* Grid */}
          <div className="flex gap-0.5">
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 text-xs text-muted-foreground pr-2 justify-around h-[88px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            
            {/* Contribution cells */}
            <div className="flex gap-0.5 flex-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-0.5">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm ${levelColors[day.level]} cursor-pointer`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: (weekIndex * 7 + dayIndex) * 0.002,
                        duration: 0.3 
                      }}
                      whileHover={{ scale: 1.5 }}
                      title={day.date ? `${day.count} contributions on ${day.date}` : ''}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm ${levelColors[level as 0 | 1 | 2 | 3 | 4]}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
