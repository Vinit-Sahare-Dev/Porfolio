import { motion } from 'framer-motion';
import { Github, Linkedin, Award, GraduationCap, Briefcase } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { Badge } from '@/components/ui/badge';

export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description={`Learn about ${developerInfo.name}, ${developerInfo.tagline}. ${developerInfo.professionalSummary.split('\n\n')[0]}`}
      />
      
      <div className="min-h-screen">
        <section className="py-12 md:py-16 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <motion.div initial={{ opacity: 0.8, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">About Me</h1>
              <p className="text-sm md:text-base text-muted-foreground">{developerInfo.tagline}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-10 md:py-14 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-xl font-semibold">Professional Summary</h2>
              {developerInfo.professionalSummary.split('\n\n').map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </motion.div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2"><Briefcase className="size-4" /> Experience</h2>
              {developerInfo.experience.map((exp, i) => (
                <div key={i} className="border border-border rounded-lg p-6">
                  <div className="flex justify-between flex-wrap gap-2 mb-2">
                    <h3 className="font-semibold">{exp.title}</h3>
                    <Badge variant="secondary">{exp.period}</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">{exp.company}</p>
                  <p className="text-muted-foreground text-sm">{exp.description}</p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2"><GraduationCap className="size-4" /> Education</h2>
              {developerInfo.education.map((edu, i) => (
                <div key={i} className="flex justify-between flex-wrap gap-2 border-l-2 border-primary pl-4">
                  <div>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-muted-foreground text-sm">{edu.institution}</p>
                  </div>
                  <Badge variant="outline">{edu.grade}</Badge>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2"><Award className="size-4" /> Achievements</h2>
              <ul className="space-y-3">
                {developerInfo.achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">▹</span>{a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 pt-6">
              {developerInfo.socialLinks.github && (
                <a href={developerInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 border border-border rounded-lg hover:bg-accent transition-colors">
                  <Github className="size-5" />
                </a>
              )}
              {developerInfo.socialLinks.linkedin && (
                <a href={developerInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 border border-border rounded-lg hover:bg-accent transition-colors">
                  <Linkedin className="size-5" />
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}