import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Send, Mail, Github, Linkedin, ArrowUpRight, MousePointer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import MagneticWrapper from "../MagneticWrapper";
import GeometricShapes from "../GeometricShapes";
import GlitchText from "../GlitchText";

const ContactSection = () => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    // Step 1: Name Validation
    if (currentStep === 0) {
      if (!formData.name.trim()) {
        toast({ title: "Name is required", description: "Please enter your name to continue.", variant: "destructive" });
        return;
      }
      if (formData.name.trim().length < 2) {
        toast({ title: "Name too short", description: "Name must be at least 2 characters.", variant: "destructive" });
        return;
      }
    }

    // Step 2: Email Validation
    if (currentStep === 1) {
      if (!formData.email.trim()) {
        toast({ title: "Email is required", description: "Please enter your email to continue.", variant: "destructive" });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
        return;
      }
    }

    // Step 3: Message Validation (checked on submit, but good to check before enabling submit button if we had a review step)
    // Since message is the last step before submit, we validate it here if we treat "Next" as "Review" or just ensure it's filled.

    setCurrentStep((prev) => prev + 1);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      toast({ title: "Message is required", description: "Please enter your message.", variant: "destructive" });
      return;
    }
    if (formData.message.trim().length < 10) {
      toast({ title: "Message too short", description: "Please provide a bit more detail (min 10 chars).", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get EmailJS credentials from environment variables
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      // Check if credentials are configured
      if (!publicKey || !serviceId || !templateId) {
        console.error("EmailJS credentials not configured");
        toast({
          title: "Configuration Error",
          description: "Email service is not configured. Please contact the site administrator.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Supto", // Your name
      };

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      toast({
        title: "Message sent!",
        description: "I'll get back to you as soon as possible.",
      });

      setFormData({ name: "", email: "", message: "" });
      setCurrentStep(0);
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:main.supto@gmail.com" },
    { icon: Github, label: "GitHub", href: "https://github.com/supto707" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/codewithsupto/" },
  ];

  return (
    <section ref={containerRef} id="contact" className="py-32 px-6 md:px-12 relative overflow-hidden">
      <GeometricShapes variant="contact" />
      <div className="max-w-7xl mx-auto">
        {/* Giant CTA */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}
          className="text-center mb-24"
        >
          <div className="flex flex-col items-center justify-center">
            <motion.div className="text-[12vw] md:text-[10vw] font-black uppercase tracking-[-0.04em] leading-[0.85] text-center font-sans text-foreground">
              <GlitchText text="START A" hover={false} />
            </motion.div>
            <motion.div className="text-[12vw] md:text-[10vw] font-black uppercase tracking-[-0.04em] leading-[0.85] text-center font-sans text-foreground">
              <GlitchText text="CONVERSATION?" hover={false} />
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <div>
            <motion.span
              style={{ opacity: headerOpacity, y: headerY }}
              className="font-mono text-xs tracking-[0.3em] text-muted-foreground"
            >
              // LET'S CONNECT
            </motion.span>

            <motion.p
              style={{ opacity: headerOpacity, y: headerY }}
              className="mt-6 text-muted-foreground max-w-md leading-relaxed"
            >
              I'm always interested in hearing about new projects, opportunities,
              or just having a conversation about tech and design. Let's build something great together.
            </motion.p>

            <motion.p
              style={{ opacity: headerOpacity, y: headerY }}
              className="mt-4 font-mono text-sm text-primary"
            >
              // Open for freelance, contract, and full-time roles
            </motion.p>

            {/* Direct Links */}
            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="mt-12 flex items-center gap-6"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-mono text-sm uppercase tracking-wider">{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Animated Stepper Form */}
          <div className="relative">
            {/* Stepper Indicator */}
            <div className="flex items-center justify-between mb-12">
              {[0, 1, 2].map((step) => (
                <div key={step} className="flex-1 flex items-center relative">
                  {/* Line */}
                  <div
                    className={`h-[2px] w-full absolute top-1/2 left-0 -translate-y-1/2 -z-10 ${step === 0 ? "hidden" : ""} ${step <= currentStep ? "bg-primary" : "bg-foreground/10"} transition-colors duration-500`}
                    style={{ left: "-50%", width: "100%" }}
                  />

                  {/* Circle */}
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: step <= currentStep ? "hsl(var(--primary))" : "hsl(var(--muted))",
                      scale: step === currentStep ? 1.2 : 1,
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold z-10 mx-auto border-4 border-background ${step <= currentStep ? "text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    {step + 1}
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.form
              key="contact-form"
              style={{ opacity: headerOpacity, y: headerY }}
              onSubmit={handleSubmit}
              className="min-h-[300px] flex flex-col justify-between"
            >
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-bold">First, what's your name?</h3>
                    <p className="text-muted-foreground mb-6">I like to know who I'm talking to.</p>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-4 rounded-lg bg-card border border-foreground/10 focus:border-primary/50 focus:outline-none transition-colors font-mono text-lg"
                      placeholder="John Doe"
                    />
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-bold">Great, where can I send a reply?</h3>
                    <p className="text-muted-foreground mb-6">No spam, just a friendly hello back.</p>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 rounded-lg bg-card border border-foreground/10 focus:border-primary/50 focus:outline-none transition-colors font-mono text-lg"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-bold">What's on your mind?</h3>
                    <p className="text-muted-foreground mb-6">Briefly describe your project or enquiry.</p>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-4 rounded-lg bg-card border border-foreground/10 focus:border-primary/50 focus:outline-none transition-colors resize-none font-mono text-lg"
                      placeholder="I have an idea for..."
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 font-mono text-xs tracking-wider rounded-lg transition-colors ${currentStep === 0 ? "opacity-0 cursor-default" : "hover:bg-foreground/5 text-muted-foreground"}`}
                >
                  BACK
                </button>

                {currentStep < 2 ? (
                  <MagneticWrapper strength={0.15}>
                    <button
                      type="button"
                      onClick={() => handleNextStep()}
                      className="px-8 py-3 bg-foreground text-background font-mono text-xs font-bold tracking-wider rounded-lg hover:bg-primary transition-colors duration-300"
                    >
                      NEXT STEP
                    </button>
                  </MagneticWrapper>
                ) : (
                  <MagneticWrapper strength={0.15}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-primary text-primary-foreground font-mono text-xs font-bold tracking-wider rounded-lg hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSubmitting ? "SENDING..." : <>SEND MESSAGE <Send className="w-3 h-3" /></>}
                    </button>
                  </MagneticWrapper>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
