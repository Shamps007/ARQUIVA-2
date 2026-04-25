import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function BenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Use class selector to avoid React strict mode ref array staleness
    const cards = gsap.utils.toArray('.benefit-card');
    const elements = [...cards, buttonRef.current];

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    
    return () => mm.revert();
  }, { scope: containerRef });

  const benefits = [
    "Mais contatos qualificados",
    "Mais reuniões agendadas",
    "Mais vendas com constância",
    "Menos dependência de indicação"
  ];

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-[#111111] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {benefits.map((item, i) => (
            <div 
              key={i} 
              className="benefit-card flex items-center gap-3 bg-white/[0.03] border border-[#333333] rounded-2xl px-6 py-5 shadow-sm"
            >
              <CheckCircle2 className="w-6 h-6 text-[#4ade80] shrink-0" />
              <span className="text-base font-semibold text-[#f2f2f2]">{item}</span>
            </div>
          ))}
        </div>

        <div 
          ref={buttonRef}
          className="flex justify-center"
        >
          <Button 
            size="lg" 
            className="w-full sm:w-auto h-16 px-10 text-lg bg-[#4ade80] hover:bg-[#4ade80]/90 text-[#111111] font-bold rounded-xl shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all flex items-center justify-center gap-2" 
            onClick={() => window.open('https://wa.me/554796368569?text=Oi%2C%20gostaria%20do%20meu%20diagnostico%21', '_blank')}
          >
            Quero meu diagnóstico gratuito <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
