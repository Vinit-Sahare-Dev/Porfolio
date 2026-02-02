import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Code2, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

const GITHUB_USERNAME = 'Vinit-Sahare-Dev';

interface CompactStats {
  totalCommits: number;
  totalStars: number;
  totalRepos: number;
  topLanguages: { language: string; percentage: number }[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Other: '#8b949e'
};

async function fetchCompactStats(): Promise<CompactStats> {
  try {
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
    );
    const repos = await reposResponse.json();

    if (!Array.isArray(repos)) {
      throw new Error('Invalid response');
    }

    const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
    const totalRepos = repos.filter((repo: any) => !repo.fork).length;

    const languageStats: Record<string, number> = {};
    repos.forEach((repo: any) => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    });

    const totalLangCount = Object.values(languageStats).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(languageStats)
      .map(([language, count]) => ({
        language,
        percentage: (count / totalLangCount) * 100
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);

    const contributionsResponse = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
    );
    const contributionsData = await contributionsResponse.json();
    const totalCommits = contributionsData.total?.lastYear || 0;

    return {
      totalCommits,
      totalStars,
      totalRepos,
      topLanguages
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return {
      totalCommits: 0,
      totalStars: 0,
      totalRepos: 0,
      topLanguages: []
    };
  }
}

export function GitHubStatsCompact() {
  const [stats, setStats] = useState<CompactStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompactStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted rounded" />
          ))}
        </div>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-background to-muted/20 border-primary/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Github className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">GitHub Overview</h3>
              <p className="text-xs text-muted-foreground">Real-time statistics</p>
            </div>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            View Profile
            <TrendingUp className="size-3" />
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            className="text-center p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            whileHover={{ y: -2 }}
          >
            <Code2 className="size-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.totalCommits}</p>
            <p className="text-xs text-muted-foreground">Commits</p>
          </motion.div>

          <motion.div
            className="text-center p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            whileHover={{ y: -2 }}
          >
            <Star className="size-5 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.totalStars}</p>
            <p className="text-xs text-muted-foreground">Stars</p>
          </motion.div>

          <motion.div
            className="text-center p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            whileHover={{ y: -2 }}
          >
            <GitFork className="size-5 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.totalRepos}</p>
            <p className="text-xs text-muted-foreground">Repos</p>
          </motion.div>
        </div>

        {stats.topLanguages.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-3">Top Languages</p>
            <div className="flex gap-2 h-2 rounded-full overflow-hidden bg-muted">
              {stats.topLanguages.map((lang, index) => (
                <motion.div
                  key={lang.language}
                  className="h-full"
                  style={{
                    backgroundColor: LANGUAGE_COLORS[lang.language] || LANGUAGE_COLORS.Other,
                    width: `${lang.percentage}%`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  title={`${lang.language}: ${lang.percentage.toFixed(1)}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {stats.topLanguages.map((lang) => (
                <div key={lang.language} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: LANGUAGE_COLORS[lang.language] || LANGUAGE_COLORS.Other }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {lang.language} <span className="font-medium">{lang.percentage.toFixed(0)}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
