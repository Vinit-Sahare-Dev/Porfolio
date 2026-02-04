import { motion } from 'framer-motion';
import { Monitor, Server, Database, Cloud, Shield, Zap } from 'lucide-react';

interface ArchLayer {
  name: string;
  components: {
    label: string;
    icon: typeof Monitor;
    color: string;
  }[];
}

const architecture: ArchLayer[] = [
  {
    name: 'Frontend Layer',
    components: [
      { label: 'React', icon: Monitor, color: 'from-blue-500 to-cyan-500' },
      { label: 'TypeScript', icon: Zap, color: 'from-blue-600 to-blue-400' }
    ]
  },
  {
    name: 'Backend Layer',
    components: [
      { label: 'Spring Boot', icon: Server, color: 'from-green-500 to-emerald-500' },
      { label: 'REST APIs', icon: Zap, color: 'from-green-600 to-green-400' }
    ]
  },
  {
    name: 'Data Layer',
    components: [
      { label: 'MySQL', icon: Database, color: 'from-orange-500 to-red-500' },
      { label: 'MongoDB', icon: Database, color: 'from-orange-600 to-orange-400' }
    ]
  },
  {
    name: 'Infrastructure',
    components: [
      { label: 'Docker', icon: Cloud, color: 'from-purple-500 to-pink-500' },
      { label: 'Security', icon: Shield, color: 'from-purple-600 to-purple-400' }
    ]
  }
];

export function ArchitectureVisualization() {
  return (
    <div className="space-y-8">
      {architecture.map((layer, layerIndex) => (
        <motion.div
          key={layer.name}
          initial={{ opacity: 0, x: layerIndex % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: layerIndex * 0.2 }}
        >
          {/* Layer title */}
          <motion.h3
            className="text-lg font-semibold mb-4 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: layerIndex * 0.2 + 0.2 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {layer.name}
          </motion.h3>
          
          {/* Components grid */}
          <div className="grid grid-cols-2 gap-4">
            {layer.components.map((component, compIndex) => {
              const Icon = component.icon;
              
              return (
                <motion.div
                  key={component.label}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: layerIndex * 0.2 + compIndex * 0.1 + 0.3
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${component.color} rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}
                  />
                  
                  {/* Component card */}
                  <div className="relative bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <motion.div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${component.color} flex items-center justify-center flex-shrink-0`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                      
                      {/* Label */}
                      <span className="font-medium">{component.label}</span>
                    </div>
                    
                    {/* Animated underline */}
                    <motion.div
                      className={`mt-3 h-0.5 bg-gradient-to-r ${component.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 0.8,
                        delay: layerIndex * 0.2 + compIndex * 0.1 + 0.5
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Connection line to next layer */}
          {layerIndex < architecture.length - 1 && (
            <motion.div
              className="flex justify-center my-6"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.5, delay: layerIndex * 0.2 + 0.6 }}
            >
              <motion.div
                className="w-0.5 h-12 bg-gradient-to-b from-primary via-primary/50 to-transparent"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </motion.div>
      ))}
      
      {/* Data flow indicators */}
      <motion.div
        className="mt-8 p-4 bg-muted/50 rounded-lg border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: architecture.length * 0.2 + 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <motion.div
            animate={{
              x: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            →
          </motion.div>
          <span>Data flows from top to bottom through secure layers</span>
          <motion.div
            animate={{
              x: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            →
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
