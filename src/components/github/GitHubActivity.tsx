import { useEffect, useState, useRef } from 'react';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchGitHubContributions().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  // No scroll needed - RTL direction shows end by default

  // Build the contribution grid - show full year with no duplicate months
  const buildGrid = () => {
    if (!stats || stats.contributionDays.length === 0) {
      return { weeks: [], monthLabels: [] };
    }

    // Sort contributions by date ascending
    const sorted = [...stats.contributionDays].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const lastDate = new Date(sorted[sorted.length - 1].date);
    const lastMonth = lastDate.getMonth();
    const lastYear = lastDate.getFullYear();

    // Filter: remove duplicate months from earlier years (if Jan 2026 exists, remove Jan 2025)
    const filteredDays = sorted.filter(day => {
      const date = new Date(day.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      
      // If this month exists in the latest year, skip it from earlier years
      if (month <= lastMonth && year < lastYear) {
        return false;
      }
      return true;
    });

    if (filteredDays.length === 0) {
      return { weeks: [], monthLabels: [] };
    }

    // Create a map for quick lookup
    const contributionMap = new Map<string, ContributionDay>();
    filteredDays.forEach(day => {
      contributionMap.set(day.date, day);
    });

    // Get valid months from filtered data (to avoid showing duplicate month labels)
    const validMonths = new Set<string>();
    filteredDays.forEach(day => {
      const date = new Date(day.date);
      validMonths.add(`${date.getFullYear()}-${date.getMonth()}`);
    });

    // Start from the first day in filtered data
    const firstDate = new Date(filteredDays[0].date);
    const startDate = new Date(firstDate);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const filteredLastDate = new Date(filteredDays[filteredDays.length - 1].date);
    
    // Build weeks array
    const weeks: ContributionDay[][] = [];
    const monthLabels: { month: string; weekIndex: number }[] = [];
    let currentDate = new Date(startDate);
    let currentWeek: ContributionDay[] = [];
    let lastMonthSeen = '';

    while (currentDate <= filteredLastDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayOfWeek = currentDate.getDay();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const monthKey = `${year}-${month}`;
      
      // Only add month label if this month is in our valid filtered months
      if (monthKey !== lastMonthSeen && validMonths.has(monthKey)) {
        if (dayOfWeek === 0 || currentWeek.length === 0) {
          monthLabels.push({
            month: currentDate.toLocaleDateString('en-US', { month: 'short' }),
            weekIndex: weeks.length
          });
          lastMonthSeen = monthKey;
        }
      }
      
      // Get contribution for this day - show level 0 for days without contributions
      const contribution = contributionMap.get(dateStr);
      currentWeek.push(contribution || { date: dateStr, count: 0, level: 0 });
      
      if (dayOfWeek === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0, level: 0 });
      }
      weeks.push(currentWeek);
    }

    return { weeks, monthLabels };
  };

  const { weeks, monthLabels } = buildGrid();

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div 
              className="p-2.5 sm:p-3 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl border border-emerald-500/20"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Github className="size-5 sm:size-6 text-emerald-400" />
            </motion.div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl text-white">GitHub Activity</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                <span className="text-emerald-400 font-semibold">{stats?.totalContributions}</span> contributions in the last year
              </p>
            </div>
          </div>
          <motion.a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-5 py-2.5 rounded-xl font-semibold hover:from-emerald-400 hover:to-emerald-500 transition-all shadow-lg shadow-emerald-500/25 w-full sm:w-auto text-sm sm:text-base"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="size-4" />
            Visit GitHub
            <ExternalLink className="size-3.5" />
          </motion.a>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 mb-6 sm:mb-8">
          <motion.div 
            className="bg-[#21262d]/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#30363d] hover:border-emerald-500/30 transition-colors"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 mb-1 sm:mb-2">
              <Activity className="size-3 sm:size-4" />
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">Total</span>
            </div>
            <p className="text-xl sm:text-3xl font-bold text-white">{stats?.totalContributions}</p>
          </motion.div>
          
          <motion.div 
            className="bg-[#21262d]/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#30363d] hover:border-emerald-500/30 transition-colors"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 mb-1 sm:mb-2">
              <Calendar className="size-3 sm:size-4" />
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">Active</span>
            </div>
            <p className="text-xl sm:text-3xl font-bold text-white">{stats?.activeDays} <span className="text-xs sm:text-sm text-gray-500">days</span></p>
          </motion.div>
          
          <motion.div 
            className="bg-[#21262d]/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#30363d] hover:border-orange-500/30 transition-colors"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 text-orange-400 mb-1 sm:mb-2">
              <Flame className="size-3 sm:size-4" />
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">Streak</span>
            </div>
            <p className="text-xl sm:text-3xl font-bold text-white">
              {stats?.currentStreak}
              <span className="text-orange-400 ml-1">🔥</span>
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-[#21262d]/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#30363d] hover:border-purple-500/30 transition-colors"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 text-purple-400 mb-1 sm:mb-2">
              <TrendingUp className="size-3 sm:size-4" />
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">Best</span>
            </div>
            <p className="text-xl sm:text-3xl font-bold text-white">{stats?.longestStreak} <span className="text-xs sm:text-sm text-gray-500">days</span></p>
          </motion.div>
        </div>

        {/* Contribution Grid - Scrollable on all devices, RTL scroll so it starts at the end */}
        <div ref={scrollContainerRef} className="overflow-x-auto pb-2 -mx-2 px-2" style={{ direction: 'rtl' }}>
          <div className="inline-block min-w-max" style={{ direction: 'ltr' }}>
            {/* Month labels - positioned relative to grid */}
            <div className="flex text-xs text-gray-500 mb-1 h-4 ml-7 relative" style={{ width: `${weeks.length * 12 + weeks.length * 2}px` }}>
              {monthLabels.map((label, i) => (
                <span
                  key={`${label.month}-${i}-${label.weekIndex}`}
                  className="absolute text-[10px] sm:text-[11px]"
                  style={{ 
                    left: `${label.weekIndex * 12}px`,
                  }}
                >
                  {label.month}
                </span>
              ))}
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
                    className="flex flex-col gap-[2px] sm:gap-[3px]"
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
