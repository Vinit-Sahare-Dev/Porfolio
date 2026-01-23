import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Code2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { CodeExample } from '@/data/codeExamples';

interface CodePlaygroundProps {
  example: CodeExample;
  index?: number;
}

export function CodePlayground({ example, index = 0 }: CodePlaygroundProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="p-4 border-b border-border bg-accent/30">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="size-5 text-primary flex-shrink-0" />
              <h3 className="font-semibold text-base">{example.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{example.description}</p>
          </div>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 p-2 rounded-lg bg-background hover:bg-accent transition-colors"
            aria-label="Copy code"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="size-4 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy className="size-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {example.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Code Block */}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm bg-[#1e1e1e] text-[#d4d4d4] max-h-96">
          <code className="language-{example.language}">{example.code}</code>
        </pre>
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="text-xs bg-background/80 backdrop-blur-sm">
            {example.language}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}
