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
    
    // Calculate current streak - count consecutive days with contributions from most recent
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Sort by date descending (most recent first)
    const sortedDesc = [...contributions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Find the streak starting from the most recent day with contributions
    let foundFirstContribution = false;
    for (const day of sortedDesc) {
      if (day.count > 0) {
        foundFirstContribution = true;
        currentStreak++;
      } else if (foundFirstContribution) {
        break; // Streak broken
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
  return {
    totalContributions: 260,
    activeDays: 97,
    currentStreak: 0,
    longestStreak: 0,
    contributionDays: []
  };
}

const levelColors: Record<number, string> = {
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

  // Build the contribution grid exactly like GitHub does
  const buildGrid = () => {
    if (!stats || stats.contributionDays.length === 0) {
      return { weeks: [], monthLabels: [] };
    }

    // Sort contributions by date ascending
    const sorted = [...stats.contributionDays].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Create a map for quick lookup
    const contributionMap = new Map<string, ContributionDay>();
    sorted.forEach(day => {
      contributionMap.set(day.date, day);
    });

    // Get the date range - from first day in data to last day
    const firstDate = new Date(sorted[0].date);
    const lastDate = new Date(sorted[sorted.length - 1].date);
    
    // Adjust to start from the Sunday of the week containing the first date
    const startDate = new Date(firstDate);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    // Build weeks array (each week is an array of 7 days, Sun-Sat)
    const weeks: ContributionDay[][] = [];
    const monthLabels: { month: string; weekIndex: number; year: number }[] = [];
    let currentDate = new Date(startDate);
    let currentWeek: ContributionDay[] = [];
    let lastMonthSeen = -1;
    let lastYearSeen = -1;

    while (currentDate <= lastDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayOfWeek = currentDate.getDay();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      
      // Track month labels at the start of each month
      if (month !== lastMonthSeen && dayOfWeek === 0) {
        monthLabels.push({
          month: currentDate.toLocaleDateString('en-US', { month: 'short' }),
          weekIndex: weeks.length,
          year
        });
        lastMonthSeen = month;
        lastYearSeen = year;
      } else if (month !== lastMonthSeen && currentWeek.length === 0) {
        // Also add month label if it's the first day we're processing for a new month
        monthLabels.push({
          month: currentDate.toLocaleDateString('en-US', { month: 'short' }),
          weekIndex: weeks.length,
          year
        });
        lastMonthSeen = month;
        lastYearSeen = year;
      }
      
      // Get contribution for this day or empty
      const contribution = contributionMap.get(dateStr);
      currentWeek.push(contribution || { date: dateStr, count: 0, level: 0 });
      
      // End of week (Saturday)
      if (dayOfWeek === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Push remaining days
    if (currentWeek.length > 0) {
      // Pad to 7 days
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0, level: 0 });
      }
      weeks.push(currentWeek);
    }

    // Find the week index where year changes (from 2024 to 2025)
    let yearGapIndex = -1;
    for (let i = 1; i < monthLabels.length; i++) {
      if (monthLabels[i].year > monthLabels[i - 1].year) {
        yearGapIndex = monthLabels[i].weekIndex;
        break;
      }
    }

    return { weeks, monthLabels, yearGapIndex };
  };

  const { weeks, monthLabels, yearGapIndex } = buildGrid();

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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
              <span className="text-xs font-medium uppercase tracking-wide">Active</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">{stats?.activeDays} <span className="text-sm text-gray-500">days</span></p>
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
            <p className="text-2xl sm:text-3xl font-bold text-white">{stats?.longestStreak} <span className="text-sm text-gray-500">days</span></p>
          </motion.div>
        </div>

        {/* Contribution Grid */}
        <div className="overflow-x-auto pb-2 -mx-2 px-2 hide-scrollbar">
          <div style={{ minWidth: `${Math.max(weeks.length * 13 + (yearGapIndex > 0 ? 50 : 30), 650)}px` }}>
            {/* Month labels */}
            <div className="flex text-xs text-gray-500 mb-1 ml-7 h-4 relative">
              {monthLabels.map((label, i) => {
                // Calculate extra offset for months after year gap
                const extraOffset = yearGapIndex > 0 && label.weekIndex >= yearGapIndex ? 16 : 0;
                return (
                  <span
                    key={`${label.month}-${i}-${label.weekIndex}`}
                    className="absolute text-[10px] sm:text-[11px]"
                    style={{ 
                      left: `calc(${(label.weekIndex + 1) * 13 + extraOffset}px)`,
                    }}
                  >
                    {label.month}
                  </span>
                );
              })}
            </div>
            
            {/* Grid with day labels */}
            <div className="flex gap-[2px] sm:gap-[3px] relative mt-3">
              {/* Day labels */}
              <div className="flex flex-col gap-[2px] sm:gap-[3px] text-[9px] sm:text-[10px] text-gray-500 pr-1 w-6 sm:w-7 flex-shrink-0">
                <span className="h-[10px] sm:h-[11px]"></span>
                <span className="h-[10px] sm:h-[11px] leading-[10px] sm:leading-[11px]">Mon</span>
                <span className="h-[10px] sm:h-[11px]"></span>
                <span className="h-[10px] sm:h-[11px] leading-[10px] sm:leading-[11px]">Wed</span>
                <span className="h-[10px] sm:h-[11px]"></span>
                <span className="h-[10px] sm:h-[11px] leading-[10px] sm:leading-[11px]">Fri</span>
                <span className="h-[10px] sm:h-[11px]"></span>
              </div>
              
              {/* Contribution cells */}
              <div className="flex gap-[2px] sm:gap-[3px]">
                {weeks.map((week, weekIndex) => (
                  <div 
                    key={weekIndex} 
                    className={`flex flex-col gap-[2px] sm:gap-[3px] ${yearGapIndex > 0 && weekIndex === yearGapIndex ? 'ml-3 sm:ml-4' : ''}`}
                  >
                    {week.map((day, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-sm ${day.date ? levelColors[day.level] : 'bg-transparent'} cursor-pointer transition-all`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          delay: weekIndex * 0.008,
                          duration: 0.15 
                        }}
                        whileHover={{ 
                          scale: 1.8, 
                          zIndex: 10,
                          boxShadow: day.count > 0 ? '0 0 10px rgba(57, 211, 83, 0.6)' : 'none'
                        }}
                        title={day.date ? `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}` : ''}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-end gap-1 sm:gap-1.5 mt-3 sm:mt-4 text-[10px] sm:text-xs text-gray-500">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-sm ${levelColors[level]}`}
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
