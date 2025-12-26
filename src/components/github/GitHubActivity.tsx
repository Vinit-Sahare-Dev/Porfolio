import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Activity, Flame, TrendingUp } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubStats {
  totalContributions: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  contributionDays: ContributionDay[];
}

const GITHUB_USERNAME = 'Vinit-Sahare-Dev';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

/**
 * Fetches GitHub contribution data using a proxy service
 */
async function fetchGitHubContributions(): Promise<GitHubStats> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
    );
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    
    const contributions: ContributionDay[] = (data.contributions || []).map((day: any) => ({
      date: day.date,
      count: day.count,
      level: day.level as 0 | 1 | 2 | 3 | 4
    }));
    
    const totalContributions = data.total?.lastYear || contributions.reduce((sum, day) => sum + day.count, 0);
    const activeDays = contributions.filter(day => day.count > 0).length;
    
    // Calculate current streak from today backwards
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Sort by date descending
    const sortedContributions = [...contributions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Check if today or yesterday has contributions, then count streak
    for (let i = 0; i < sortedContributions.length; i++) {
      const dayDate = new Date(sortedContributions[i].date);
      dayDate.setHours(0, 0, 0, 0);
      
      // Skip future dates
      if (dayDate > today) continue;
      
      if (sortedContributions[i].count > 0) {
        currentStreak++;
      } else {
        // Allow one day gap (today might not have contributions yet)
        const diffDays = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays <= 1 && i === 0) continue;
        break;
      }
    }
    
    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    const sortedAsc = [...contributions].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    for (const day of sortedAsc) {
      if (day.count > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }
    
    return {
      totalContributions,
      activeDays,
      currentStreak,
      longestStreak,
      contributionDays: contributions
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
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
    longestStreak: 0,
    contributionDays: days
  };
}

const levelColors = {
  0: 'bg-[#161b22]',
  1: 'bg-[#0e4429]',
  2: 'bg-[#006d32]',
  3: 'bg-[#26a641]',
  4: 'bg-[#39d353]'
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

  // Group contributions by week, matching GitHub's calendar layout
  const getWeeksWithMonths = () => {
    if (!stats || stats.contributionDays.length === 0) return { weeks: [], monthLabels: [] };
    
    // Sort contributions by date ascending
    const sorted = [...stats.contributionDays].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const weeks: ContributionDay[][] = [];
    const monthLabels: { month: string; weekIndex: number }[] = [];
    let currentWeek: ContributionDay[] = [];
    let lastMonth = -1;
    
    // Get the first day and pad to start of week (Sunday = 0)
    const firstDate = new Date(sorted[0].date);
    const firstDayOfWeek = firstDate.getDay();
    
    // Pad the first week with empty days
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: '', count: 0, level: 0 });
    }
    
    sorted.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();
      const month = date.getMonth();
      
      // Track month changes
      if (month !== lastMonth) {
        monthLabels.push({
          month: date.toLocaleDateString('en-US', { month: 'short' }),
          weekIndex: weeks.length
        });
        lastMonth = month;
      }
      
      currentWeek.push(day);
      
      // End of week (Saturday) or last day
      if (dayOfWeek === 6 || index === sorted.length - 1) {
        // Pad remaining days if it's the last week
        while (currentWeek.length < 7) {
          currentWeek.push({ date: '', count: 0, level: 0 });
        }
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    return { weeks, monthLabels };
  };

  const { weeks, monthLabels } = getWeeksWithMonths();

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d1117] to-[#161b22] border border-[#30363d] p-6 sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-[#21262d] rounded-xl" />
            <div className="space-y-2">
              <div className="h-5 bg-[#21262d] rounded w-40" />
              <div className="h-4 bg-[#21262d] rounded w-56" />
            </div>
          </div>
          <div className="h-32 bg-[#21262d] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d1117] to-[#161b22] border border-[#30363d]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative p-5 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <motion.div 
              className="p-3 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl border border-emerald-500/20"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Github className="size-6 text-emerald-400" />
            </motion.div>
            <div>
              <h3 className="font-bold text-xl text-white">GitHub Activity</h3>
              <p className="text-sm text-gray-400">
                <span className="text-emerald-400 font-semibold">{stats?.totalContributions}</span> contributions in the last year
              </p>
            </div>
          </div>
          <motion.a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-emerald-400 hover:to-emerald-500 transition-all shadow-lg shadow-emerald-500/25"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="size-4" />
            Visit GitHub
            <ExternalLink className="size-3.5" />
          </motion.a>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <motion.div 
            className="bg-[#21262d]/80 backdrop-blur-sm rounded-xl p-4 border border-[#30363d] hover:border-emerald-500/30 transition-colors"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Activity className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Total</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">{stats?.totalContributions}</p>
          </motion.div>
          
          <motion.div 
            className="bg-[#21262d]/80 backdrop-blur-sm rounded-xl p-4 border border-[#30363d] hover:border-emerald-500/30 transition-colors"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Calendar className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Active Days</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">{stats?.activeDays}</p>
          </motion.div>
          
          <motion.div 
            className="bg-[#21262d]/80 backdrop-blur-sm rounded-xl p-4 border border-[#30363d] hover:border-orange-500/30 transition-colors"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-2 text-orange-400 mb-2">
              <Flame className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Streak</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {stats?.currentStreak}
              <span className="text-orange-400 ml-1">🔥</span>
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-[#21262d]/80 backdrop-blur-sm rounded-xl p-4 border border-[#30363d] hover:border-purple-500/30 transition-colors"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <TrendingUp className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Best</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">{stats?.longestStreak}</p>
          </motion.div>
        </div>

        {/* Contribution Grid */}
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="min-w-[750px]">
            {/* Month labels - positioned based on actual data */}
            <div className="flex text-xs text-gray-500 mb-2 ml-8">
              {monthLabels.map((label, i) => {
                // Calculate position based on week index
                const totalWeeks = weeks.length;
                const leftPercent = (label.weekIndex / totalWeeks) * 100;
                return (
                  <span
                    key={`${label.month}-${i}`}
                    className="absolute"
                    style={{ 
                      left: `calc(32px + ${leftPercent}%)`,
                      minWidth: '30px'
                    }}
                  >
                    {label.month}
                  </span>
                );
              })}
            </div>
            
            {/* Simplified month row */}
            <div className="relative h-5 mb-1 ml-8">
              {monthLabels.map((label, i) => {
                const totalWeeks = weeks.length;
                const leftPercent = (label.weekIndex / totalWeeks) * 100;
                return (
                  <span
                    key={`${label.month}-${i}`}
                    className="absolute text-xs text-gray-500"
                    style={{ left: `${leftPercent}%` }}
                  >
                    {label.month}
                  </span>
                );
              })}
            </div>
            
            {/* Grid */}
            <div className="flex gap-[3px]">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] text-[10px] text-gray-500 pr-2 w-6">
                <span className="h-[11px]"></span>
                <span className="h-[11px] leading-[11px]">Mon</span>
                <span className="h-[11px]"></span>
                <span className="h-[11px] leading-[11px]">Wed</span>
                <span className="h-[11px]"></span>
                <span className="h-[11px] leading-[11px]">Fri</span>
                <span className="h-[11px]"></span>
              </div>
              
              {/* Contribution cells */}
              <div className="flex gap-[3px] flex-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((day, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-[11px] h-[11px] rounded-sm ${day.date ? levelColors[day.level] : 'bg-transparent'} cursor-pointer transition-all`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          delay: weekIndex * 0.01,
                          duration: 0.2 
                        }}
                        whileHover={{ 
                          scale: 1.8, 
                          zIndex: 10,
                          boxShadow: day.count > 0 ? '0 0 8px rgba(57, 211, 83, 0.5)' : 'none'
                        }}
                        title={day.date ? `${day.count} contributions on ${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}` : ''}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-end gap-1.5 mt-4 text-xs text-gray-500">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-[11px] h-[11px] rounded-sm ${levelColors[level as 0 | 1 | 2 | 3 | 4]}`}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
