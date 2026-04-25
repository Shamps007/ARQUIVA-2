/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  BarChart3, 
  Target, 
  Zap, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle,
  MessageSquare,
  Users,
  ShieldCheck,
  ChevronDown,
  AlertTriangle,
  TrendingUp,
  BrainCircuit,
  Map,
  Rocket,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HeroSection from "./HeroSection";
import BenefitsSection from "./BenefitsSection";
import ComparisonSection from "./ComparisonSection";

const NICHES = [
  "Clínicas", "Dentistas", "Estéticas", "Imobiliárias", "Advogados", "Academias", "Consultorias", "Escritórios B2B"
];

const PILLARS = [
  {
    title: "1. Atrair",
    subtitle: "As pessoas certas",
    description: "Captura de leads altamente qualificados através de tráfego pago estratégico.",
    icon: <Users className="w-8 h-8 text-primary" />,
    span: "md:col-span-3"
  },
  {
    title: "2. Qualificar",
    subtitle: "Separar curioso de comprador",
    description: "Filtros inteligentes que garantem que sua equipe fale apenas com quem pode pagar.",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    span: "md:col-span-3"
  },
  {
    title: "3. Converter",
    subtitle: "Interesse em contato",
    description: "Narrativas persuasivas e layouts otimizados para máxima conversão de leads.",
    icon: <Zap className="w-8 h-8 text-primary" />,
    span: "md:col-span-2"
  },
  {
    title: "4. Agendar",
    subtitle: "Levar para agenda",
    description: "Sistemas de agendamento automático que eliminam o vai-e-vem de mensagens.",
    icon: <Calendar className="w-8 h-8 text-primary" />,
    span: "md:col-span-2"
  },
  {
    title: "5. Vender",
    subtitle: "Previsibilidade comercial",
    description: "Scripts e processos treinados para fechar vendas com constância e margem.",
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    span: "md:col-span-2"
  }
];

const METHODOLOGY = [
  {
    stage: "01",
    title: "Diagnóstico",
    subtitle: "Clarity over execution",
    description: "Identificamos os furos no seu balde. Antes de vender mais, precisamos entender por que você está perdendo dinheiro hoje."
  },
  {
    stage: "02",
    title: "Mapa das Vendas",
    subtitle: "Cost per sale, scaling safety",
    description: "Desenhamos a arquitetura completa do seu novo funil, definindo metas claras de custo por lead e ROI."
  },
  {
    stage: "03",
    title: "Execução com Controle",
    subtitle: "Validated scripts and real metrics",
    description: "Colocamos o sistema para rodar com acompanhamento em tempo real, ajustando os anúncios e scripts até a validação."
  }
];

const DIAGNOSTIC_NICHES = [
  "Serviço", "Varejo", "Indústria", "Médico", "Dentista", "Psicólogo", "Food Service", "Educação", 
  "SAAS", "Finanças", "Franquia / Franchising", "Telecom", 
  "Energia Solar", "Turismo", "Outro"
];

const DIAGNOSTIC_ROLES = [
  "Proprietário", "Sócio", "CEO/Diretor Executivo", "Diretor", 
  "Gerente", "Supervisor", "Coordenador", "Analista", 
  "Assistente/Funcionário", "Outros"
];

function DiagnosticForm({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    niche: "",
    customNiche: "",
    role: "",
    customRole: "",
    revenue: "",
    goal: "",
    name: "",
    whatsapp: ""
  });
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showCustomRoleInput, setShowCustomRoleInput] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        whatsapp: formData.whatsapp,
        segmento: formData.niche === "Outro" ? formData.customNiche : formData.niche,
        cargo: formData.role === "Outros" ? formData.customRole : formData.role,
        faturamento: formData.revenue,
        objetivo: formData.goal
      };

      console.log("NOME DIGITADO:", formData.name);
      console.log("📦 DADOS DO PAYLOAD:", payload);

      // URL ATUALIZADA DA PLANILHA
      const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzQWPCniw486cnX8RQzzmxdcJx4aRFh02-2WTKNg6Xo1FtTRE1AzYROELkA960KguGG/exec"; 

      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload)
        });
      }
      
      console.log("Formulário enviado!");
      onComplete();
    } catch (error) {
      console.error("Erro na comunicação com a planilha:", error);
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNicheSelect = (n: string) => {
    if (n === "Outro") {
      setShowCustomInput(true);
      setFormData(prev => ({ ...prev, niche: "Outro" }));
    } else {
      setFormData(prev => ({ ...prev, niche: n, customNiche: "" }));
      setShowCustomInput(false);
      nextStep();
    }
  };

  const handleRoleSelect = (r: string) => {
    if (r === "Outros") {
      setShowCustomRoleInput(true);
      setFormData(prev => ({ ...prev, role: "Outros" }));
    } else {
      setFormData(prev => ({ ...prev, role: r, customRole: "" }));
      setShowCustomRoleInput(false);
      nextStep();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass max-w-xl w-full p-8 md:p-12 rounded-[2.5rem] relative z-10 border-white/5"
      >
        <div className="mb-12">
          {/* Header from image */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(0,255,87,0.3)]">
              <ShieldCheck className="text-background w-6 h-6 font-bold" />
            </div>
            <span className="text-xl font-heading font-black tracking-[0.05em] uppercase text-white/90">DIAGNÓSTICO ARQUIVA</span>
          </div>
          
          {/* Progress Bar from image */}
          <div className="flex gap-3 mb-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 shadow-sm ${i <= step ? "bg-primary shadow-[0_0_10px_rgba(0,255,87,0.4)]" : "bg-white/10"}`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xl">É um prazer te receber aqui!</p>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white leading-[1.1]">Como devemos te chamar?</h2>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/60 ml-1">Seu nome</Label>
                    <Input id="name" placeholder="Ex: Lucas Guckert" className="h-16 rounded-2xl bg-white/5 border-white/10 focus:border-primary text-white text-lg px-6" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} />
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4 pt-4">
                  <Button 
                    onClick={nextStep}
                    disabled={!formData.name}
                    className="w-full h-16 text-sm sm:text-xl md:text-xl bg-primary text-background font-bold glow-btn hover:bg-primary/90 rounded-2xl whitespace-normal h-auto py-2 sm:py-0"
                  >
                    Continuar <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-6 sm:h-6 flex-shrink-0" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white leading-[1.1]">
                    {formData.name ? `Maravilha, ${formData.name.split(" ")[0]}!` : "Maravilha!"}
                  </h2>
                  <p className="text-muted-foreground text-xl">Qual é o seu número de contato (WhatsApp)?</p>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-white/60 ml-1">WhatsApp</Label>
                    <Input 
                      id="whatsapp" 
                      placeholder="(00) 00000-0000" 
                      className="h-16 rounded-2xl bg-white/5 border-white/10 focus:border-primary text-white text-lg px-6" 
                      value={formData.whatsapp}
                      onChange={e => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 11) {
                          let masked = val;
                          if (val.length > 2) masked = `(${val.slice(0, 2)}) ${val.slice(2)}`;
                          if (val.length > 7) masked = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
                          setFormData(prev => ({ ...prev, whatsapp: masked }));
                        }
                      }} 
                    />
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4 pt-4">
                  <Button variant="ghost" onClick={prevStep} className="h-16 px-4 sm:px-8 text-muted-foreground hover:text-white text-base sm:text-lg">Voltar</Button>
                  <Button 
                    onClick={nextStep}
                    disabled={formData.whatsapp.replace(/\D/g, "").length < 10}
                    className="flex-1 h-16 text-sm sm:text-xl md:text-xl bg-primary text-background font-bold glow-btn hover:bg-primary/90 rounded-2xl whitespace-normal h-auto py-2 sm:py-0"
                  >
                    Continuar <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-6 sm:h-6 flex-shrink-0" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white leading-[1.1]">
                  Qual o segmento da sua empresa?
                </h2>
                
                <div className="space-y-4">
                  <Select 
                    onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, niche: value }));
                      setShowCustomInput(value === "Outro");
                    }} 
                    value={formData.niche}
                  >
                    <SelectTrigger className="w-full h-16 rounded-2xl bg-white/5 border-white/10 text-white text-lg px-6 focus:ring-primary focus:border-primary">
                      <SelectValue placeholder="Selecione o segmento" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-white/10 text-white max-h-[300px]">
                      {DIAGNOSTIC_NICHES.map((n) => (
                        <SelectItem key={n} value={n} className="text-lg py-3 focus:bg-primary/20 focus:text-primary cursor-pointer hover:bg-primary/20 hover:text-primary">
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {showCustomInput && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4 pt-2"
                  >
                    <Label className="text-white/60 ml-1">Especifique seu segmento:</Label>
                    <Input 
                      autoFocus
                      placeholder="Ex: Consultoria em TI" 
                      className="h-16 rounded-2xl bg-white/5 border-white/10 focus:border-primary text-white text-lg"
                      value={formData.customNiche}
                      onChange={e => setFormData(prev => ({ ...prev, customNiche: e.target.value }))}
                    />
                  </motion.div>
                )}

                <div className="flex gap-2 sm:gap-4 pt-4">
                  <Button variant="ghost" onClick={prevStep} className="h-16 px-4 sm:px-8 text-muted-foreground hover:text-white text-base sm:text-lg">Voltar</Button>
                  <Button 
                    onClick={nextStep}
                    disabled={!formData.niche || (formData.niche === "Outro" && !formData.customNiche)}
                    className="flex-1 h-16 text-sm sm:text-xl md:text-xl bg-primary text-background font-bold glow-btn hover:bg-primary/90 rounded-2xl whitespace-normal h-auto py-2 sm:py-0"
                  >
                    Continuar <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-6 sm:h-6 flex-shrink-0" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white leading-[1.1]">
                  E qual é o seu cargo aí dentro?
                </h2>
                
                <div className="space-y-4">
                  <Select 
                    onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, role: value }));
                      setShowCustomRoleInput(value === "Outros");
                    }} 
                    value={formData.role}
                  >
                    <SelectTrigger className="w-full h-16 rounded-2xl bg-white/5 border-white/10 text-white text-lg px-6 focus:ring-primary focus:border-primary">
                      <SelectValue placeholder="Selecione o seu cargo" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-white/10 text-white max-h-[300px]">
                      {DIAGNOSTIC_ROLES.map((r) => (
                        <SelectItem key={r} value={r} className="text-lg py-3 focus:bg-primary/20 focus:text-primary cursor-pointer hover:bg-primary/20 hover:text-primary">
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {showCustomRoleInput && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4 pt-2"
                  >
                     <Label className="text-white/60 ml-1">Especifique seu cargo:</Label>
                    <Input 
                      autoFocus
                      placeholder="Ex: Diretor de Marketing" 
                      className="h-16 rounded-2xl bg-white/5 border-white/10 focus:border-primary text-white text-lg"
                      value={formData.customRole}
                      onChange={e => setFormData(prev => ({ ...prev, customRole: e.target.value }))}
                    />
                  </motion.div>
                )}

                <div className="flex gap-2 sm:gap-4 pt-4">
                  <Button variant="ghost" onClick={prevStep} className="h-16 px-4 sm:px-8 text-muted-foreground hover:text-white text-base sm:text-lg">Voltar</Button>
                  <Button 
                    onClick={nextStep}
                    disabled={!formData.role || (formData.role === "Outros" && !formData.customRole)}
                    className="flex-1 h-16 text-sm sm:text-xl md:text-xl bg-primary text-background font-bold glow-btn hover:bg-primary/90 rounded-2xl whitespace-normal h-auto py-2 sm:py-0"
                  >
                    Continuar <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-6 sm:h-6 flex-shrink-0" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white leading-[1.1]">Estamos quase lá...</h2>
                  <p className="text-muted-foreground text-xl">Qual seu faturamento mensal médio?</p>
                </div>
                <div className="space-y-4">
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, revenue: value }))} value={formData.revenue}>
                    <SelectTrigger className="w-full h-16 rounded-2xl bg-white/5 border-white/10 text-white text-lg px-6 focus:ring-primary focus:border-primary">
                      <SelectValue placeholder="Qual o faturamento mensal da sua empresa?" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-white/10 text-white">
                      {[
                        "Até 50 mil",
                        "De 51 mil à 70 mil",
                        "De 71 mil à 100 mil",
                        "De 101 mil à 200 mil",
                        "De 201 mil à 400 mil",
                        "De 401 mil à 1 milhão",
                        "De 1 à 4 milhões",
                        "De 4 à 16 milhões",
                        "De 16 a 40 milhões",
                        "Mais de 40 milhões"
                      ].map((rev) => (
                        <SelectItem key={rev} value={rev} className="text-lg py-3 focus:bg-primary/20 focus:text-primary cursor-pointer hover:bg-primary/20 hover:text-primary">
                          {rev}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 sm:gap-4 pt-4">
                  <Button variant="ghost" onClick={prevStep} className="h-16 px-4 sm:px-8 text-muted-foreground hover:text-white text-base sm:text-lg">Voltar</Button>
                  <Button 
                    onClick={nextStep}
                    disabled={!formData.revenue}
                    className="flex-1 h-16 text-sm sm:text-xl md:text-xl bg-primary text-background font-bold glow-btn hover:bg-primary/90 rounded-2xl whitespace-normal h-auto py-2 sm:py-0"
                  >
                    Continuar <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-6 sm:h-6 flex-shrink-0" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground text-xl">Para finalizar,</p>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-white leading-[1.2]">
                    Conte-me um pouco sobre a sua empresa e o que espera atingir com a ajuda do Método Arquiva.
                  </h2>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <textarea 
                      placeholder="Fale um pouco mais sobre o seu objetivo e/ou negócio (mínimo de 20 caracteres)" 
                      className="w-full min-h-[150px] p-6 rounded-2xl bg-white/5 border-white/10 focus:border-primary text-white text-lg resize-none outline-none focus:ring-1 focus:ring-primary transition-all"
                      value={formData.goal}
                      onChange={e => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                    />
                    <div className="text-right text-sm text-white/40">
                      {formData.goal.trim().length} / 20 mín
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4 pt-4 justify-end">
                  <Button variant="ghost" onClick={prevStep} disabled={isSubmitting} className="h-16 px-4 sm:px-8 text-muted-foreground hover:text-white text-base sm:text-lg">Voltar</Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || formData.goal.trim().length < 20}
                    className="flex-1 max-w-[280px] h-16 text-base sm:text-lg md:text-lg bg-primary text-background font-bold glow-btn hover:bg-primary/90 transition-colors rounded-xl whitespace-normal h-auto py-2 sm:py-0 ml-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "ENVIANDO..." : "PROSSEGUIR"} {!isSubmitting && <ArrowRight className="w-5 h-5 flex-shrink-0" />}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.2em] uppercase opacity-30 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4" /> Sistema Seguro Growth Academy
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => {
    return window.location.pathname === "/pag";
  });

  if (!isSubmitted) {
    return <DiagnosticForm onComplete={() => setIsSubmitted(true)} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-background font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden"
    >
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#111111]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4ade80] flex items-center justify-center rounded-lg">
              <ShieldCheck className="text-[#111111] w-5 h-5 font-bold" />
            </div>
            <span className="text-xl font-heading font-extrabold tracking-tighter text-white">ARQUIVA</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#metodo" className="text-sm font-bold text-[#f2f2f2] hover:text-[#4ade80] transition-colors">O Método</a>
            <a href="#pilares" className="text-sm font-bold text-[#f2f2f2] hover:text-[#4ade80] transition-colors">Arquitetura</a>
            <a href="#sobre" className="text-sm font-bold text-[#f2f2f2] hover:text-[#4ade80] transition-colors">Especialista</a>
            <Button size="sm" className="bg-[#4ade80]/20 font-bold text-[#4ade80] border border-[#4ade80]/30 hover:bg-[#4ade80]/30" onClick={() => window.open('https://wa.me/554796368569?text=Oi%2C%20gostaria%20do%20meu%20diagnostico%21', '_blank')}>
              Solicitar Diagnóstico
            </Button>
          </div>
        </div>
      </nav>

      <HeroSection />
      <ComparisonSection />
      <BenefitsSection />

      {/* Niches Marquee */}
      <div className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="container mx-auto px-6 mb-10 text-center">
          <span className="text-2xl md:text-4xl uppercase tracking-[0.3em] font-black text-primary drop-shadow-[0_0_15px_rgba(0,255,87,0.5)]">Nichos Atendidos</span>
        </div>
        <div className="flex whitespace-nowrap animate-marquee">
          {[...NICHES, ...NICHES].map((niche, i) => (
            <span key={i} className="mx-12 text-2xl md:text-4xl font-heading font-black text-white/10 uppercase tracking-tighter hover:text-primary/40 transition-colors cursor-default">
              {niche}
            </span>
          ))}
        </div>
      </div>

      {/* Pain Block (Comparison) */}
      <section className="py-32 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight text-white">Sua empresa vive assim?</h2>
            <p className="text-muted-foreground text-lg">O marketing "tradicional" está quebrando negócios de serviços.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass p-10 rounded-[2.5rem] border-destructive/20 bg-destructive/[0.02]"
            >
              <AlertTriangle className="w-12 h-12 text-destructive mb-6" />
              <h3 className="text-2xl font-bold mb-6 text-destructive">O "Gargalo" Atual</h3>
              <ul className="space-y-5">
                {[
                  "Mês bom seguido de mês ruim",
                  "Agenda oscilando toda semana",
                  "Muitos 'curiosos' e poucos fechamentos",
                  "Dependência total de indicações",
                  "Sensação de estar jogando dinheiro fora"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground leading-snug">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass p-10 rounded-[2.5rem] border-primary/30 bg-primary/[0.02] relative"
            >
              <TrendingUp className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-6 text-primary">Previsibilidade ARQUIVA</h3>
              <ul className="space-y-5">
                {[
                  "Processo comercial estruturado",
                  "Demanda sob controle na sua mão",
                  "Leads qualificados que querem comprar",
                  "Escala previsível com lucro",
                  "Clareza total do seu custo por venda"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 leading-snug text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute top-6 right-8 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded tracking-widest">SOLUÇÃO</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology (Arquitetura ARQUIVA) */}
      <section id="pilares" className="py-32 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="mb-20 max-w-3xl">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">Inteligência Comercial</span>
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mt-4 text-white">Arquitetura Viva de Aquisição e Vendas</h2>
            <p className="text-muted-foreground mt-6 text-xl">Não é apenas um anúncio. É um ecossistema projetado para vender.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`${pillar.span} glass group p-10 rounded-[3rem] hover:border-primary/50 transition-all duration-500`}
              >
                <div className="relative z-10">
                  <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-2xl w-fit group-hover:bg-primary transition-all duration-500">
                    {pillar.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-white">{pillar.title}</h3>
                  <p className="text-primary/60 text-sm font-bold uppercase tracking-widest mb-6">{pillar.subtitle}</p>
                  <p className="text-muted-foreground text-lg leading-relaxed">{pillar.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="metodo" className="py-32 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">O Plano</span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mt-4 text-white">Jornada da Implementação</h2>
            <p className="text-muted-foreground mt-6 text-lg">Três etapas cruciais para sair do amadorismo comercial e escalar com segurança.</p>
            <div className="mt-12 p-6 glass rounded-3xl border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <BrainCircuit className="text-primary w-6 h-6" />
                <span className="font-bold text-white">Estratégia Customizada</span>
              </div>
              <p className="text-sm text-muted-foreground">Cada negócio tem uma jornada única. Nós desenhamos o mapa ideal para o seu nicho.</p>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-12">
            {METHODOLOGY.map((step, i) => (
              <motion.div
                key={i}
                viewport={{ once: true }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-12 pb-12 border-l border-white/10 last:border-0 last:pb-0"
              >
                <div className="absolute left-[-13px] top-0 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,255,87,0.5)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <div className="glass p-10 rounded-[2.5rem] hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-heading font-black text-white/5">{step.stage}</span>
                    <div className="flex items-center gap-2 text-xs font-mono text-primary/80 uppercase tracking-[0.2em]">
                      <Map className="w-3 h-3" /> {step.subtitle}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Profile */}
      <section id="sobre" className="py-32 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="glass max-w-6xl mx-auto rounded-[4rem] overflow-hidden flex flex-col md:flex-row items-stretch">
            <div className="md:w-1/2 relative group min-h-[400px]">
              <img 
                src="/lucas.jpeg" 
                alt="Lucas Guckert" 
                className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="md:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
              <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4">Fundador & Estrategista</span>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 tracking-tight text-white">Lucas Guckert</h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Arquiteto de crescimento previsível e criador do <span className="text-white font-semibold">Método ARQUIVA</span>. 
                  Minha missão é simples: libertar donos de empresas da "sorte" no marketing.
                </p>
                <p>
                  Ao longo de anos validando processos comerciais para dezenas de nichos, estruturei um sistema que não apenas gera leads, mas constrói um ativo de vendas lucrativo.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <div className="text-3xl font-heading font-bold text-primary mb-1">30+</div>
                  <p className="text-xs uppercase tracking-widest font-bold text-white/60">Empresas Impactadas</p>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-primary mb-1">R$ 5M+</div>
                  <p className="text-xs uppercase tracking-widest font-bold text-white/60">Gerados em Vendas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold mb-4 tracking-tight text-white">Dúvidas Frequentes</h2>
          <p className="text-muted-foreground italic">Esclareça os pontos principais e tome sua decisão.</p>
        </div>
        <Accordion type="single" collapsible="true" className="w-full space-y-4">
          {[
            { 
              question: "O Método ARQUIVA serve para o meu nicho?", 
              answer: "Sim. Se você é um profissional de serviços (clínicas, advogados, dentistas) ou uma empresa B2B que depende de reuniões agendadas para vender, o sistema foi desenhado exatamente para você." 
            },
            { 
              question: "Em quanto tempo vejo os primeiros leads?", 
              answer: "O setup estratégico leva cerca de 7 a 10 dias. Após o 'go-live', os primeiros contatos qualificados costumam entrar nas primeiras 48 horas de veiculação das campanhas." 
            },
            { 
              question: "Como funciona a Análise Gratuita?", 
              answer: "É uma reunião de 15 a 20 minutos onde eu ou alguém sênior do meu time vai olhar seus números atuais e dizer exatamente qual o caminho para dobrar seu agendamento em 30 dias." 
            }
          ].map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="glass rounded-2xl px-6 border-white/5 overflow-hidden">
              <AccordionTrigger className="text-lg font-bold hover:no-underline text-left py-6 text-white">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="relative px-6 py-12 md:p-24 rounded-[2.5rem] md:rounded-[4rem] bg-gradient-to-br from-primary to-primary-foreground overflow-hidden text-center shadow-[0_0_100px_rgba(0,255,87,0.2)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent)]" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-heading font-black text-background tracking-tighter mb-8 leading-[1] sm:leading-[0.9]">
                VOCÊ NÃO PRECISA DE MAIS TENTATIVAS.<br /><span className="opacity-70">PRECISA DE MÉTODO.</span>
              </h2>
              <p className="text-background/80 text-xl md:text-2xl font-medium mb-12">
                Garanta sua sessão estratégica hoje e receba o diagnóstico do seu funil comercial.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" className="w-full sm:w-auto h-auto sm:h-20 py-4 sm:py-0 px-6 sm:px-12 text-lg sm:text-2xl bg-background text-primary hover:bg-background/90 group shadow-2xl font-black uppercase tracking-tighter whitespace-normal" onClick={() => window.open('https://wa.me/554796368569?text=Oi%2C%20gostaria%20do%20meu%20diagnostico%21', '_blank')}>
                  QUERO MINHA ANÁLISE <Rocket className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl">
                <ShieldCheck className="text-background w-6 h-6 font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-black tracking-tighter leading-none text-white">ARQUIVA</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 text-white">Sistemas de Aquisição</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-muted-foreground uppercase tracking-widest">
              <a href="https://www.instagram.com/eusoulucasguckert/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
              <a href="https://wa.me/554796368569?text=Oi%2C%20gostaria%20do%20meu%20diagnostico%21" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-primary transition-colors">Diagnóstico</a>
              <a href="#metodo" className="hover:text-primary transition-colors">Método</a>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-white">© 2026 Lucas Guckert</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Crescimento & Previsibilidade</p>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
