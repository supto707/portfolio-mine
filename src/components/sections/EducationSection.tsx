import { motion } from "framer-motion";
import Counter from "../Counter";

const education = [
  {
    degree: "Higher Secondary Certificate",
    institution: "Kaunia Degree College, Rangpur",
    period: 2023,
    gpa: 4.33,
    maxGpa: 5.00,
  },
  {
    degree: "School Secondary Certificate",
    institution: "Cantonment Public School & College Lalmonirhat",
    period: 2021,
    gpa: 5.00,
    maxGpa: 5.00,
  },
];

const certifications = [
  { name: "Complete Web Development", issuer: "Programming Hero", year: "Batch-12" },
  { name: "Golang Coding Bootcamp", issuer: "Master Academy", year: "2021" },
  { name: "Computer Science", issuer: "Harvard Education", year: "CS50" },
  { name: "Algorithm", issuer: "Princeton University", year: "Coursera" },
  { name: "Digital Marketing specialist", issuer: "SR-Dream IT", year: "Certified" },
  { name: "Graphics Design fundamentals", issuer: "UDEMY", year: "Certified" },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-32 px-6 md:px-12 bg-card overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground"
        >
          // EDUCATION
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 text-3xl md:text-4xl font-black uppercase tracking-tighter"
        >
          ALWAYS LEARNING
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs tracking-[0.2em] text-muted-foreground mb-6"
            >
              $ cat education.log
            </motion.p>

            <div className="font-mono text-sm space-y-6 p-6 rounded-lg border border-foreground/10 bg-background">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="border-l-2 border-primary/50 pl-4"
                >
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                    <span className="text-primary">[<Counter from={2000} to={edu.period} duration={2} />]</span>
                    <span className="text-foreground font-bold">{edu.degree}</span>
                  </div>
                  <p className="text-muted-foreground mt-1">@ {edu.institution}</p>
                  <div className="text-muted-foreground/70 mt-2 text-xs flex items-center gap-1">
                    # GPA :
                    <span className="text-primary">
                      <Counter from={0} to={edu.gpa} decimals={2} duration={2.5} />
                    </span>
                    / {edu.maxGpa.toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs tracking-[0.2em] text-muted-foreground mb-6"
            >
              $ ls certifications/
            </motion.p>

            <div className="font-mono text-sm space-y-4 p-6 rounded-lg border border-foreground/10 bg-background">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                  className="flex items-start gap-3 group"
                >
                  <span className="text-primary shrink-0">→</span>
                  <div>
                    <span className="text-foreground group-hover:text-primary transition-colors">
                      {cert.name}
                    </span>
                    <span className="text-muted-foreground"> from {cert.issuer}</span>
                    <span className="text-muted-foreground/50"> ({cert.year})</span>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="pt-4 border-t border-foreground/10"
              >
                <span className="text-muted-foreground/50">$ _</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
