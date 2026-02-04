import { motion } from 'framer-motion';
import { Award, Code, Users, Zap } from 'lucide-react';

interface Achievement {
  value: string;
  label: string;
  icon: typeof Award;
  color: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    value: '8+',
    label: 'Projects',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    description: 'Full-stack applications built'
  },
  {
    value: '3',
    label: 'Internships',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    description: 'Professional experience gained'
  },
  {
    value: '10+',
    label: 'Technologies',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    description: 'Tech stack mastered'
  },
  {
    value: '1',
    label: 'Patent',
    icon: Award,
    color: 'from-green-500 to-emerald-500',
    description: 'Published innovation'
  }
];

export function AchievementsInfographic() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {achievements.map((achievement, index) => {
        const Icon = achievement.icon;
        
        return (
          <motion.div
            key={achievement.label}
            className="relative group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ y: -8 }}
          >
            {/* Animated background glow */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${achievement.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
            />
            
            {/* Card */}
            <div className="relative bg-card border border-border rounded-2xl p-6 text-center overflow-hidden hover:border-primary/50 transition-colors">
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-primary/5 to-transparent rounded-full" />
              
              {/* Icon */}
              <motion.div
                className={`relative w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center`}
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
              >
                <Icon className="w-8 h-8 text-white" />
                
                {/* Pulse ring */}
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${achievement.color}`}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              </motion.div>
              
              {/* Value with counter animation */}
              <motion.div
                className="text-4xl font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {achievement.value}
              </motion.div>
              
              {/* Label */}
              <h3 className="font-semibold text-lg mb-2">{achievement.label}</h3>
              
              {/* Description */}
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
              
              {/* Progress bar */}
              <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${achievement.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 1,
                    delay: index * 0.2 + 0.5,
                    ease: "easeOut"
                  }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
