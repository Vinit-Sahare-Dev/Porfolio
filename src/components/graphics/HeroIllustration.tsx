import { motion } from 'framer-motion';
import { Code, Terminal, Braces, GitBranch } from 'lucide-react';

export function HeroIllustration() {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Central code window */}
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Window frame */}
        <div className="bg-card border-2 border-primary/20 rounded-xl overflow-hidden shadow-2xl">
          {/* Window header */}
          <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">Portfolio.tsx</span>
          </div>
          
          {/* Code content */}
          <div className="p-6 font-mono text-sm space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-purple-500"
            >
              <span className="text-blue-500">const</span> developer = {'{'}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="pl-4"
            >
              <span className="text-red-500">name</span>: <span className="text-green-500">"Vinit Sahare"</span>,
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="pl-4"
            >
              <span className="text-red-500">role</span>: <span className="text-green-500">"Full Stack Developer"</span>,
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="pl-4"
            >
              <span className="text-red-500">skills</span>: [<span className="text-green-500">"Java"</span>, <span className="text-green-500">"React"</span>, <span className="text-green-500">"Spring Boot"</span>]
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="text-purple-500"
            >
              {'}'};
            </motion.div>
            
            {/* Blinking cursor */}
            <motion.span
              className="inline-block w-2 h-4 bg-primary ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Floating code icons */}
      <motion.div
        className="absolute top-10 left-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
          <Code className="w-8 h-8 text-white" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute top-20 right-10"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
          <Terminal className="w-7 h-7 text-white" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 left-20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
          <Braces className="w-6 h-6 text-white" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 right-20"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
          <GitBranch className="w-7 h-7 text-white" />
        </div>
      </motion.div>
      
      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <motion.line
          x1="20%"
          y1="30%"
          x2="50%"
          y2="50%"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.line
          x1="80%"
          y1="35%"
          x2="50%"
          y2="50%"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
      </svg>
      
      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
