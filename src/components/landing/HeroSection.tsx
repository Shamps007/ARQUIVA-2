import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const textContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const words = gsap.utils.toArray('.scrub-word');
    
    gsap.to(words, {
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=50%", // completes after scrolling half a viewport down
        scrub: 1, // smooth scrubbing
      },
      color: "#4ade80",
      textShadow: "0 0 30px rgba(74, 222, 128, 0.4)",
      stagger: 0.1,
      ease: "power2.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden bg-[#111111]">
      {/* Background with texture/mesh */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
         <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-heading font-extrabold tracking-tight mb-8 max-w-5xl mx-auto leading-[1.1] md:leading-[0.95]">
            <div className="text-[#f2f2f2] mb-3 md:mb-5">
              Sua empresa não precisa de mais anúncios.
            </div>
            <div ref={textContainer} className="flex flex-wrap items-center justify-center gap-x-[0.3em] gap-y-2">
              {["Precisa", "de", "um", "sistema."].map((word, i) => (
                <span 
                  key={i} 
                  className="scrub-word transition-colors duration-200" 
                  style={{ color: "#222222" }} 
                >
                  {word}
                </span>
              ))}
            </div>
          </h1>
          <p className="text-lg md:text-xl text-[#f2f2f2]/60 max-w-3xl mx-auto leading-relaxed font-medium">
            O Método ARQUIVA transforma marketing desorganizado em agenda cheia previsível através de uma arquitetura viva de aquisição e vendas.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
