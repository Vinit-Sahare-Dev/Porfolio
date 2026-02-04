import { motion } from 'framer-motion';
import { Lightbulb, Code, TestTube, Rocket, ArrowRight } from 'lucide-react';

interface ProcessStep {
  title: string;
  description: string;
  icon: typeof Lightbulb;
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    title: 'Ideation',
    description: 'Understanding requirements and planning architecture',
    icon: Lightbulb,
    color: 'from-yellow-500 to-amber-500'
  },
  {
    title: 'Development',
    description: 'Writing clean, maintainable, and scalable code',
    icon: Code,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Testing',
    description: 'Comprehensive testing and quality assurance',
    icon: TestTube,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Deployment',
    description: 'Launching to production with CI/CD pipelines',
    icon: Rocket,
    color: 'from-green-500 to-emerald-500'
  }
];

export function ProcessDiagram() {
  return (
    <div className="relative">
      {/* Desktop: Horizontal layout */}
      <div className="hidden md:flex items-center justify-between gap-4">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === processSteps.length - 1;
          
          return (
            <div key={step.title} className="flex items-center flex-1">
              {/* Step card */}
              <motion.div
                className="relative group flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                />
                
                {/* Card content */}
                <div className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-center mb-2">{step.title}</h3>
                  
                  {/* Description */}
                  <p className="text-xs text-muted-foreground text-center">
                    {step.description}
                  </p>
                </div>
              </motion.div>
              
              {/* Arrow connector */}
              {!isLast && (
                <motion.div
                  className="flex items-center justify-center px-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
                >
                  <motion.div
                    animate={{
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Mobile: Vertical layout */}
      <div className="md:hidden space-y-6">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === processSteps.length - 1;
          
          return (
            <div key={step.title} className="relative">
              {/* Step card */}
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`}
                />
                
                {/* Card content */}
                <div className="relative bg-card border border-border rounded-xl p-6">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <motion.div
                      className={`w-12 h-12 flex-shrink-0 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <div className="flex-1">
                      {/* Title */}
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Vertical connector */}
              {!isLast && (
                <motion.div
                  className="flex justify-center py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <motion.div
                    className="w-0.5 h-8 bg-gradient-to-b from-primary to-primary/20"
                    animate={{
                      scaleY: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
