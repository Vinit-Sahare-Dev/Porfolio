import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, Building } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { developerInfo } from '@/data/developer';

interface TimelineItem {
  type: 'experience' | 'education' | 'achievement';
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  location?: string;
  icon: typeof Briefcase;
  color: string;
}

export function ResumeTimeline() {
  // Combine and sort all timeline items
  const timelineItems: TimelineItem[] = [
    // Experience
    ...developerInfo.experience.map(exp => ({
      type: 'experience' as const,
      title: exp.title,
      subtitle: exp.company,
      period: exp.period,
      description: exp.description,
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500'
    })),
    // Education
    ...developerInfo.education.map(edu => ({
      type: 'education' as const,
      title: edu.degree,
      subtitle: edu.institution,
      period: edu.period,
      description: edu.grade,
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-500'
    })),
    // Key Achievements (first 3)
    ...developerInfo.achievements.slice(0, 3).map((achievement, index) => ({
      type: 'achievement' as const,
      title: achievement,
      subtitle: 'Professional Achievement',
      period: index === 0 ? '2024' : index === 1 ? '2024' : '2023',
      icon: Award,
      color: 'from-amber-500 to-orange-500'
    }))
  ];

  // Sort by period (most recent first) - rough sorting
  const sortedItems = timelineItems.sort((a, b) => {
    const getYear = (period: string) => {
      const match = period.match(/\d{4}/);
      return match ? parseInt(match[0]) : 0;
    };
    return getYear(b.period) - getYear(a.period);
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'experience':
        return 'Work Experience';
      case 'education':
        return 'Education';
      case 'achievement':
        return 'Achievement';
      default:
        return '';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'experience':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'education':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'achievement':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-background to-muted/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Professional Timeline</h3>
              <p className="text-sm text-muted-foreground">
                My journey through education, work, and achievements
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

        <div className="space-y-8">
          {sortedItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={`${item.type}-${index}`}
                className="relative pl-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Icon circle */}
                <motion.div
                  className={`absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="size-7 text-white" />
                </motion.div>

                {/* Content card */}
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getTypeColor(item.type)}`}>
                          {getTypeLabel(item.type)}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building className="size-4" />
                        <p className="text-sm font-medium">{item.subtitle}</p>
                      </div>
                    </div>
                    
                    {item.period && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                        <Calendar className="size-4" />
                        <span className="font-medium">{item.period}</span>
                      </div>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {item.location && (
                    <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                      <MapPin className="size-4" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">
                {developerInfo.experience.length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Work Experiences</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">
                {developerInfo.education.length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Education Milestones</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">
                {developerInfo.achievements.length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Achievements</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
