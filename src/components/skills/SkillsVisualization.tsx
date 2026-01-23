import { motion } from 'framer-motion';
import { Code2, Server, Database, Settings } from 'lucide-react';
import { SkillBar } from './SkillBar';

const skillsData = [
  {
    category: 'Frontend',
    icon: Code2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript/TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Bootstrap', level: 80 }
    ]
  },
  {
    category: 'Backend',
    icon: Server,
    color: 'text-green-500',
    bgColor: 'bg-green-500',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'Spring Boot', level: 85 },
      { name: 'REST APIs', level: 90 },
      { name: 'Microservices', level: 75 },
      { name: 'Hibernate/JPA', level: 80 }
    ]
  },
  {
    category: 'Database',
    icon: Database,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 75 },
      { name: 'SQL', level: 90 }
    ]
  },
  {
    category: 'DevOps & Tools',
    icon: Settings,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'Kubernetes', level: 70 },
      { name: 'Git/GitHub', level: 90 },
      { name: 'Maven', level: 85 },
      { name: 'Postman', level: 90 }
    ]
  }
];

export function SkillsVisualization() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {skillsData.map((category, categoryIndex) => {
        const Icon = category.icon;
        
        return (
          <motion.div
            key={category.category}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-lg bg-accent ${category.color}`}>
                <Icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">{category.category}</h3>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={category.bgColor}
                  index={skillIndex}
                />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
