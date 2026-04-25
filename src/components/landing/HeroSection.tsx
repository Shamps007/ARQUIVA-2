import React, { useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

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
            <div className="flex flex-wrap items-center justify-center gap-x-[0.3em] gap-y-2">
              {["Precisa", "de", "um", "sistema."].map((word, i) => (
                <span 
                  key={i} 
                  className="text-primary drop-shadow-[0_0_15px_rgba(0,255,87,0.4)] transition-colors duration-200"
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
