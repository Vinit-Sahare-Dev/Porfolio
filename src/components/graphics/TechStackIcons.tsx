import { motion } from 'framer-motion';
import { Code2, Database, Server, Layers, Cloud, GitBranch } from 'lucide-react';

interface TechIcon {
  name: string;
  icon: typeof Code2;
  color: string;
  description: string;
}

const techStack: TechIcon[] = [
  {
    name: 'Frontend',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    description: 'React, TypeScript, Tailwind'
  },
  {
    name: 'Backend',
    icon: Server,
    color: 'from-green-500 to-emerald-500',
    description: 'Java, Spring Boot, REST APIs'
  },
  {
    name: 'Database',
    icon: Database,
    color: 'from-purple-500 to-pink-500',
    description: 'MySQL, MongoDB'
  },
  {
    name: 'Architecture',
    icon: Layers,
    color: 'from-orange-500 to-red-500',
    description: 'Microservices, Design Patterns'
  },
  {
    name: 'DevOps',
    icon: Cloud,
    color: 'from-indigo-500 to-blue-500',
    description: 'Docker, Kubernetes, CI/CD'
  },
  {
    name: 'Version Control',
    icon: GitBranch,
    color: 'from-amber-500 to-yellow-500',
    description: 'Git, GitHub, Collaboration'
  }
];

export function TechStackIcons() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {techStack.map((tech, index) => {
        const Icon = tech.icon;
        
        return (
          <motion.div
            key={tech.name}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            {/* Glow effect */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Card */}
            <div className="relative bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
              {/* Animated icon */}
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="w-8 h-8 text-white" />
              </motion.div>
              
              {/* Name */}
              <h3 className="font-semibold mb-2">{tech.name}</h3>
              
              {/* Description */}
              <p className="text-xs text-muted-foreground">{tech.description}</p>
              
              {/* Animated dots */}
              <div className="flex justify-center gap-1 mt-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tech.color}`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
