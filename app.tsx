import React, { useState } from 'react';
import { 
  Scale, 
  ShieldCheck, 
  Briefcase, 
  Users, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Award,
  Clock,
  Send,
  Loader2,
  Menu,
  X
} from 'lucide-react';
import { getLegalResponse } from './services/geminiService.ts';
import { PracticeArea, ChatMessage } from './types.ts';

const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: '1',
    title: 'Direito do Trabalho',
    description: 'Especialistas em reverter demissões injustas, horas extras não pagas e assédio no ambiente de trabalho.',
    icon: 'Briefcase'
  },
  {
    id: '2',
    title: 'Direito Previdenciário',
    description: 'Auxílio na obtenção de aposentadorias, pensões e benefícios do INSS com agilidade técnica.',
    icon: 'Clock'
  },
  {
    id: '3',
    title: 'Direito Civil',
    description: 'Resolução de conflitos contratuais, danos morais e questões de responsabilidade civil.',
    icon: 'Scale'
  },
  {
    id: '4',
    title: 'Direito de Família',
    description: 'Atendimento humanizado para divórcios, guardas, pensões e inventários complexos.',
    icon: 'Users'
  }
];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, userMsg]);
    setUserInput('');
    setIsTyping(true);

    try {
      const response = await getLegalResponse(userInput);
      const aiMsg: ChatMessage = { role: 'assistant', content: response || "Desculpe, não consegui processar sua dúvida agora." };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Erro de conexão. Tente novamente mais tarde." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-legal-blue p-2 rounded-lg shadow-lg">
                <Scale className="text-legal-gold w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-legal-blue serif-font leading-tight tracking-tight">TRAFER</span>
                <span className="text-[9px] tracking-[0.2em] text-legal-gold uppercase font-bold">Advocacia & Consultoria</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-10">
              <a href="#inicio" className="text-slate-600 hover:text-legal-blue text-xs font-bold uppercase tracking-widest transition-colors">Início</a>
              <a href="#areas" className="text-slate-600 hover:text-legal-blue text-xs font-bold uppercase tracking-widest transition-colors">Atuação</a>
              <a href="#contato" className="bg-legal-blue text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg">Fale Conosco</a>
            </div>

            <button className="md:hidden text-legal-blue" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-6 space-y-4 shadow-xl">
            <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="block text-slate-700 font-bold">Início</a>
            <a href="#areas" onClick={() => setIsMenuOpen(false)} className="block text-slate-700 font-bold">Áreas de Atuação</a>
            <a href="#contato" onClick={() => setIsMenuOpen(false)} className="block bg-legal-blue text-white p-4 rounded-xl text-center font-bold">Iniciar Consulta</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-slate-50/50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100/50 -z-10 skew-x-6 transform origin-top-right"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-legal-blue/5 text-legal-blue font-bold text-xs uppercase tracking-widest">
                <ShieldCheck size={14} className="text-legal-gold" />
                <span>Justiça e Compromisso</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-legal-blue leading-[1.1] serif-font">
                Defesa Técnica e <span className="text-legal-gold">Estratégica</span>.
              </h1>
              <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-light">
                Unimos tradição e inovação para garantir a melhor defesa dos seus direitos trabalhistas e previdenciários.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <a href="#contato" className="flex items-center justify-center gap-3 bg-legal-blue text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
                  <MessageCircle size={24} />
                  WhatsApp
                </a>
                <button onClick={() => setChatOpen(true)} className="flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-700 px-10 py-5 rounded-2xl font-bold text-lg hover:border-legal-gold transition-all">
                  Consulta Online
                </button>
              </div>
            </div>
            
            <div className="relative fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1000" 
                  alt="Escritório de Advocacia" 
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-legal-blue/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Practice */}
      <section id="areas" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-legal-gold font-bold tracking-[0.3em] uppercase text-xs">Especialidades</h2>
            <p className="text-4xl md:text-5xl font-bold text-legal-blue serif-font">Atuação Especializada</p>
            <div className="w-24 h-1.5 bg-legal-gold mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRACTICE_AREAS.map((area) => (
              <div key={area.id} className="group p-10 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-legal-gold hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="mb-8 p-6 rounded-3xl bg-white group-hover:bg-legal-blue transition-colors duration-500 shadow-sm">
                  {area.icon === 'Briefcase' && <Briefcase className="text-legal-blue group-hover:text-white w-10 h-10" />}
                  {area.icon === 'Clock' && <Clock className="text-legal-blue group-hover:text-white w-10 h-10" />}
                  {area.icon === 'Scale' && <Scale className="text-legal-blue group-hover:text-white w-10 h-10" />}
                  {area.icon === 'Users' && <Users className="text-legal-blue group-hover:text-white w-10 h-10" />}
                </div>
                <h3 className="text-2xl font-bold text-legal-blue mb-4 serif-font">{area.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{area.description}</p>
                <a href="#contato" className="inline-flex items-center gap-2 text-legal-gold font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                  Consultar <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-legal-blue rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-20 text-white space-y-12">
                <h2 className="text-4xl md:text-5xl font-bold serif-font leading-tight">Vamos iniciar sua defesa agora?</h2>
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                      <Phone className="text-legal-gold w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">WhatsApp</p>
                      <p className="text-xl font-bold">(11) 99999-9999</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                      <Mail className="text-legal-gold w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">E-mail</p>
                      <p className="text-xl font-bold">contato@trafer.adv.br</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-12 md:p-20">
                <form className="space-y-6">
                  <input type="text" placeholder="Nome Completo" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-legal-gold focus:ring-4 focus:ring-legal-gold/10 outline-none transition-all font-medium" />
                  <input type="tel" placeholder="WhatsApp" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-legal-gold focus:ring-4 focus:ring-legal-gold/10 outline-none transition-all font-medium" />
                  <textarea rows={4} placeholder="Como podemos ajudar?" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-legal-gold focus:ring-4 focus:ring-legal-gold/10 outline-none transition-all font-medium"></textarea>
                  <button className="w-full bg-legal-blue text-white py-6 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                    Enviar Solicitação
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex justify-center items-center gap-3">
            <Scale className="text-legal-gold w-8 h-8" />
            <span className="text-3xl font-bold serif-font tracking-tight">TRAFER</span>
          </div>
          <div className="w-16 h-1 bg-legal-gold mx-auto"></div>
          <p className="text-slate-500 text-sm uppercase tracking-[0.3em]">
            © 2024 Trafer Advocacia & Consultoria. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* AI Assistant UI */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-4">
        {chatOpen && (
          <div className="w-[360px] md:w-[420px] h-[550px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col border border-slate-100 animate-in slide-in-from-bottom duration-500 overflow-hidden">
            <div className="p-6 bg-legal-blue text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-legal-gold/20 flex items-center justify-center border border-legal-gold/40">
                  <Scale className="text-legal-gold w-5 h-5" />
                </div>
                <span className="font-bold text-xs uppercase tracking-widest">Consultor IA</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {messages.length === 0 && (
                <div className="text-center py-12 opacity-40">
                  <MessageCircle className="mx-auto w-10 h-10 text-legal-blue mb-4" />
                  <p className="text-xs font-bold uppercase tracking-widest">Tire sua dúvida agora.</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' ? 'bg-legal-blue text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
                    <Loader2 className="w-4 h-4 text-legal-gold animate-spin" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Analisando...</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-100">
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Descreva seu problema jurídico..." 
                  className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-legal-gold/20 outline-none transition-all"
                />
                <button type="submit" disabled={isTyping} className="bg-legal-blue text-white p-3.5 rounded-2xl shadow-lg hover:bg-slate-800 transition-all">
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <a href="https://wa.me/5511999999999" target="_blank" className="w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-4 border-white">
            <MessageCircle size={30} />
          </a>
          <button onClick={() => setChatOpen(!chatOpen)} className="w-16 h-16 bg-legal-blue text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-4 border-white">
            {chatOpen ? <X size={28} /> : <Scale size={28} className="text-legal-gold" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;