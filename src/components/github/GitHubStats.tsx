import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Code2, TrendingUp, Calendar, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';

const GITHUB_USERNAME = 'Vinit-Sahare-Dev';

interface LanguageStats {
  [key: string]: number;
}

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

interface GitHubEvent {
  type: string;
  repo: string;
  created_at: string;
  payload?: any;
}

interface GitHubStatsData {
  totalCommits: number;
  languages: LanguageStats;
  topRepos: Repository[];
  recentActivity: GitHubEvent[];
  contributionStreak: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Other: '#8b949e'
};

async function fetchGitHubStats(): Promise<GitHubStatsData> {
  try {
    // Fetch user repos
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );
    const repos = await reposResponse.json();

    // Calculate language stats and get top repos
    const languageStats: LanguageStats = {};
    const topRepos: Repository[] = [];

    if (Array.isArray(repos)) {
      repos.forEach((repo: any) => {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        }
      });

      // Get top 5 repos by stars
      topRepos.push(
        ...repos
          .filter((repo: any) => !repo.fork)
          .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || 'No description available',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || 'Unknown',
            url: repo.html_url
          }))
      );
    }

    // Fetch recent activity
    const eventsResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`
    );
    const events = await eventsResponse.json();

    const recentActivity: GitHubEvent[] = Array.isArray(events)
      ? events.slice(0, 5).map((event: any) => ({
          type: event.type,
          repo: event.repo.name,
          created_at: event.created_at,
          payload: event.payload
        }))
      : [];

    // Fetch contribution data for commits this year
    const contributionsResponse = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
    );
    const contributionsData = await contributionsResponse.json();
    
    const totalCommits = contributionsData.total?.lastYear || 0;
    
    // Calculate current streak
    let contributionStreak = 0;
    if (contributionsData.contributions) {
      const sortedDesc = [...contributionsData.contributions].sort((a: any, b: any) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      let foundFirstContribution = false;
      for (const day of sortedDesc) {
        if (day.count > 0) {
          foundFirstContribution = true;
          contributionStreak++;
        } else if (foundFirstContribution) {
          break;
        }
      }
    }

    return {
      totalCommits,
      languages: languageStats,
      topRepos,
      recentActivity,
      contributionStreak
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return {
      totalCommits: 0,
      languages: {},
      topRepos: [],
      recentActivity: [],
      contributionStreak: 0
    };
  }
}

function getEventDescription(event: GitHubEvent): string {
  const repoName = event.repo.split('/')[1];
  
  switch (event.type) {
    case 'PushEvent':
      const commits = event.payload?.commits?.length || 1;
      return `Pushed ${commits} commit${commits > 1 ? 's' : ''} to ${repoName}`;
    case 'CreateEvent':
      return `Created ${event.payload?.ref_type || 'repository'} in ${repoName}`;
    case 'PullRequestEvent':
      return `${event.payload?.action || 'opened'} pull request in ${repoName}`;
    case 'IssuesEvent':
      return `${event.payload?.action || 'opened'} issue in ${repoName}`;
    case 'WatchEvent':
      return `Starred ${repoName}`;
    case 'ForkEvent':
      return `Forked ${repoName}`;
    default:
      return `Activity in ${repoName}`;
  }
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="p-6 animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-muted rounded" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (!stats) return null;

  // Calculate language percentages
  const totalLangCount = Object.values(stats.languages).reduce((a, b) => a + b, 0);
  const languagePercentages = Object.entries(stats.languages)
    .map(([lang, count]) => ({
      language: lang,
      percentage: (count / totalLangCount) * 100,
      count
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-background to-muted/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Github className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">GitHub Statistics</h3>
              <p className="text-sm text-muted-foreground">Real-time activity and insights</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2 text-primary mb-2">
                <Code2 className="size-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Commits</span>
              </div>
              <p className="text-3xl font-bold">{stats.totalCommits}</p>
              <p className="text-xs text-muted-foreground mt-1">This year</p>
            </motion.div>

            <motion.div
              className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2 text-orange-500 mb-2">
                <Activity className="size-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Streak</span>
              </div>
              <p className="text-3xl font-bold">{stats.contributionStreak}</p>
              <p className="text-xs text-muted-foreground mt-1">Days active</p>
            </motion.div>

            <motion.div
              className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2 text-blue-500 mb-2">
                <TrendingUp className="size-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Languages</span>
              </div>
              <p className="text-3xl font-bold">{Object.keys(stats.languages).length}</p>
              <p className="text-xs text-muted-foreground mt-1">Used</p>
            </motion.div>

            <motion.div
              className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2 text-purple-500 mb-2">
                <Calendar className="size-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Repos</span>
              </div>
              <p className="text-3xl font-bold">{stats.topRepos.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Public</p>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Language Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 h-full">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Code2 className="size-5 text-primary" />
              Most Used Languages
            </h4>
            <div className="space-y-4">
              {languagePercentages.map((lang, index) => (
                <motion.div
                  key={lang.language}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: LANGUAGE_COLORS[lang.language] || LANGUAGE_COLORS.Other }}
                      />
                      <span className="text-sm font-medium">{lang.language}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {lang.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: LANGUAGE_COLORS[lang.language] || LANGUAGE_COLORS.Other }}
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Top Repositories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 h-full">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Star className="size-5 text-primary" />
              Top Repositories
            </h4>
            <div className="space-y-3">
              {stats.topRepos.map((repo, index) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{repo.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {repo.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
                      <span className="flex items-center gap-1">
                        <Star className="size-3" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="size-3" />
                        {repo.forks}
                      </span>
                    </div>
                  </div>
                  {repo.language && (
                    <div className="flex items-center gap-1 mt-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.Other }}
                      />
                      <span className="text-xs text-muted-foreground">{repo.language}</span>
                    </div>
                  )}
                </motion.a>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Activity className="size-5 text-primary" />
            Recent Activity
          </h4>
          <div className="space-y-3">
            {stats.recentActivity.map((event, index) => (
              <motion.div
                key={`${event.type}-${event.repo}-${index}`}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="p-1.5 bg-primary/10 rounded-md flex-shrink-0">
                  <Github className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{getEventDescription(event)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getTimeAgo(event.created_at)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
