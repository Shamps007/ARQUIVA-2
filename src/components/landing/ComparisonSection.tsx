import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { XCircle, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ComparisonSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Select the items directly within the columns for staggering
    const col1Items = gsap.utils.toArray('.col-1-item', col1Ref.current);
    const col2Items = gsap.utils.toArray('.col-2-item', col2Ref.current);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%', // Starts animation when the top of the section hits 80% viewport
        toggleActions: 'play none none none',
      }
    });

    // Column 1 animates in
    tl.fromTo(
      col1Ref.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      col1Items,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
      "-=0.4" // Start slightly before column finishes sliding in
    )
    // Column 2 animates in right after
    .fromTo(
      col2Ref.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.6" // Start while col1 items are staggering
    )
    .fromTo(
      col2Items,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
      "-=0.4"
    );

  }, { scope: containerRef });

  const negativePoints = [
    "Mês bom seguido de mês ruim",
    "Agenda oscilando toda semana",
    "Muitos 'curiosos' e poucos fechamentos",
    "Dependência total de indicações",
    "Sensação de estar jogando dinheiro fora"
  ];

  const positivePoints = [
    "Processo comercial estruturado",
    "Demanda sob controle na sua mão",
    "Leads qualificados que querem comprar",
    "Escala previsível com lucro",
    "Clareza total do seu custo por venda"
  ];

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-[#111111] overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Sua empresa vive assim?
          </h2>
          <p className="text-lg md:text-xl text-white/60">
            O marketing "tradicional" está quebrando negócios de serviços.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Column 1: Gargalo */}
          <div 
            ref={col1Ref}
            className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col gap-6"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-white/70" />
              </div>
              <h3 className="text-2xl font-bold text-white">O "Gargalo" Atual</h3>
            </div>
            
            <div className="space-y-5">
              {negativePoints.map((item, i) => (
                <div key={i} className="col-1-item flex items-start gap-4">
                  <div className="mt-1 bg-white/5 rounded-full p-1 shrink-0">
                    <XCircle className="w-4 h-4 text-white/50" />
                  </div>
                  <p className="text-white/70 text-lg leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Previsibilidade */}
          <div 
            ref={col2Ref}
            className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col gap-6 relative"
          >
            <div className="absolute top-8 right-8 bg-[#4ade80]/10 border border-[#4ade80]/20 text-[#4ade80] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Solução
            </div>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-[#4ade80]" />
              </div>
              <h3 className="text-2xl font-bold text-[#4ade80] pr-20">Previsibilidade ARQUIVA</h3>
            </div>

            <div className="space-y-5">
              {positivePoints.map((item, i) => (
                <div key={i} className="col-2-item flex items-start gap-4">
                  <div className="mt-1 bg-[#4ade80]/10 rounded-full p-1 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                  </div>
                  <p className="text-white text-lg font-medium leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
