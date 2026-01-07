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
import { getLegalResponse } from './services/geminiService';
import { PracticeArea, ChatMessage } from './types';

const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: '1',
    title: 'Direito do Trabalho',
    description: 'Defesa dos direitos do trabalhador, verbas rescisórias, horas extras e reconhecimento de vínculo.',
    icon: 'Briefcase'
  },
  {
    id: '2',
    title: 'Direito Previdenciário',
    description: 'Aposentadorias, auxílio-doença, BPC/LOAS e revisões de benefícios junto ao INSS.',
    icon: 'Clock'
  },
  {
    id: '3',
    title: 'Direito Civil',
    description: 'Indenizações por danos morais e materiais, contratos, cobranças e responsabilidade civil.',
    icon: 'Scale'
  },
  {
    id: '4',
    title: 'Direito de Família',
    description: 'Divórcio, guarda de filhos, pensão alimentícia e inventários com agilidade e sigilo.',
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

    const response = await getLegalResponse(userInput);
    const aiMsg: ChatMessage = { role: 'assistant', content: response || "Erro ao processar resposta." };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-legal-blue p-2 rounded-lg">
                <Scale className="text-legal-gold w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-bold text-legal-blue serif-font block leading-none">TRAFER</span>
                <span className="text-[10px] tracking-widest text-legal-gold uppercase font-semibold">Advocacia & Consultoria</span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-slate-600 hover:text-legal-blue font-medium transition-colors">Início</a>
              <a href="#areas" className="text-slate-600 hover:text-legal-blue font-medium transition-colors">Áreas de Atuação</a>
              <a href="#sobre" className="text-slate-600 hover:text-legal-blue font-medium transition-colors">O Escritório</a>
              <a href="#contato" className="bg-legal-blue text-white px-6 py-2.5 rounded-full font-semibold hover:bg-slate-800 transition-all">Fale Conosco</a>
            </div>

            {/* Mobile Nav Button */}
            <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-4 shadow-lg">
            <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="block text-lg text-slate-700 font-medium">Início</a>
            <a href="#areas" onClick={() => setIsMenuOpen(false)} className="block text-lg text-slate-700 font-medium">Áreas de Atuação</a>
            <a href="#sobre" onClick={() => setIsMenuOpen(false)} className="block text-lg text-slate-700 font-medium">O Escritório</a>
            <a href="#contato" onClick={() => setIsMenuOpen(false)} className="block bg-legal-blue text-white px-6 py-3 rounded-xl text-center font-semibold">WhatsApp</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-legal-blue/5 -z-10 skew-x-12 transform origin-top"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-legal-gold/10 text-legal-gold font-semibold text-sm">
                <ShieldCheck size={16} />
                <span>Justiça e Transparência</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-legal-blue leading-tight serif-font">
                Defendendo seus <span className="text-legal-gold">Direitos</span> com Excelência.
              </h1>
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                Especialistas em causas trabalhistas, previdenciárias e cíveis. Oferecemos suporte jurídico personalizado para garantir o que é seu por direito.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contato" className="flex items-center justify-center gap-2 bg-legal-blue text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  <MessageCircle size={22} />
                  Consultoria WhatsApp
                </a>
                <a href="#areas" className="flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-legal-gold transition-all">
                  Áreas de Atuação
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Direito e Justiça" 
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-legal-blue/40 to-transparent"></div>
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="bg-legal-gold/20 p-3 rounded-full">
                    <Award className="text-legal-gold w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-legal-blue serif-font">+15 Anos</p>
                    <p className="text-sm text-slate-500 font-medium">Experiência Jurídica</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="areas" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-legal-gold font-bold tracking-widest uppercase text-xs">Especialidades</h2>
            <p className="text-3xl md:text-4xl font-bold text-legal-blue serif-font">Áreas de Atuação Estratégica</p>
            <div className="w-20 h-1 bg-legal-gold mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRACTICE_AREAS.map((area) => (
              <div key={area.id} className="group p-8 rounded-2xl bg-slate-50 border border-transparent hover:border-legal-gold hover:bg-white hover:shadow-2xl transition-all duration-300">
                <div className="mb-6 inline-block p-4 rounded-xl bg-white shadow-sm group-hover:bg-legal-blue transition-colors">
                  {area.icon === 'Briefcase' && <Briefcase className="text-legal-blue group-hover:text-white w-8 h-8" />}
                  {area.icon === 'Clock' && <Clock className="text-legal-blue group-hover:text-white w-8 h-8" />}
                  {area.icon === 'Scale' && <Scale className="text-legal-blue group-hover:text-white w-8 h-8" />}
                  {area.icon === 'Users' && <Users className="text-legal-blue group-hover:text-white w-8 h-8" />}
                </div>
                <h3 className="text-xl font-bold text-legal-blue mb-4 group-hover:text-legal-gold transition-colors">{area.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">{area.description}</p>
                <a href="#contato" className="inline-flex items-center gap-2 text-legal-blue font-bold text-sm group-hover:translate-x-2 transition-transform">
                  Saiba mais <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-legal-blue text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-4xl font-bold text-legal-gold serif-font">+2.500</p>
              <p className="text-[10px] md:text-xs text-slate-300 uppercase tracking-widest">Clientes Satisfeitos</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-bold text-legal-gold serif-font">98%</p>
              <p className="text-[10px] md:text-xs text-slate-300 uppercase tracking-widest">Sucesso Judicial</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-bold text-legal-gold serif-font">15</p>
              <p className="text-[10px] md:text-xs text-slate-300 uppercase tracking-widest">Anos de Atuação</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-bold text-legal-gold serif-font">+10</p>
              <p className="text-[10px] md:text-xs text-slate-300 uppercase tracking-widest">Especialistas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-16 bg-legal-blue text-white space-y-10">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold serif-font">Atendimento Personalizado</h2>
                  <p className="text-slate-300">Nossa equipe está pronta para ouvir você e traçar a melhor estratégia jurídica para o seu caso.</p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                      <Phone className="text-legal-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">WhatsApp</p>
                      <p className="text-lg font-bold">(11) 99999-9999</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                      <Mail className="text-legal-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">E-mail</p>
                      <p className="text-lg font-bold">contato@traferadvocacia.com.br</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                      <MapPin className="text-legal-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Onde Estamos</p>
                      <p className="text-lg font-bold">Av. Paulista, 1000 - SP</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-16">
                <form className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nome Completo</label>
                    <input type="text" placeholder="Ex: Maria Silva" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-legal-gold focus:ring-4 focus:ring-legal-gold/10 outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telefone</label>
                    <input type="tel" placeholder="(11) 90000-0000" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-legal-gold focus:ring-4 focus:ring-legal-gold/10 outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Área de Interesse</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-legal-gold focus:ring-4 focus:ring-legal-gold/10 outline-none transition-all bg-white appearance-none">
                      <option>Direito do Trabalho</option>
                      <option>Previdenciário</option>
                      <option>Civil e Família</option>
                      <option>Outros</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Breve Descrição</label>
                    <textarea rows={3} placeholder="Como podemos te ajudar?" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-legal-gold focus:ring-4 focus:ring-legal-gold/10 outline-none transition-all"></textarea>
                  </div>
                  <button className="w-full bg-legal-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                    Enviar Solicitação
                  </button>
                  <p className="text-[10px] text-slate-400 text-center uppercase tracking-tighter">Garantimos total sigilo e proteção dos seus dados.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="flex justify-center items-center gap-2">
            <Scale className="text-legal-gold" />
            <span className="text-xl font-bold serif-font">TRAFER ADVOCACIA</span>
          </div>
          <p className="text-slate-500 text-sm max-w-md mx-auto">Ética, competência e resultados. Sua tranquilidade jurídica é nossa maior prioridade.</p>
          <div className="pt-8 border-t border-white/5 text-[10px] text-slate-600 uppercase tracking-widest">
            © 2024 Trafer Advocacia - OAB/SP 000.000 - Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Floating Buttons & Chat AI */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="w-[340px] h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 animate-in slide-in-from-bottom duration-300">
            <div className="p-4 bg-legal-blue text-white rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-legal-gold/20 flex items-center justify-center border border-legal-gold/30">
                  <Scale className="text-legal-gold w-4 h-4" />
                </div>
                <span className="font-bold text-xs uppercase tracking-widest">Assistente Virtual</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:bg-white/10 p-1 rounded-md transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scroll-smooth">
              {messages.length === 0 && (
                <div className="text-center py-10 opacity-50 space-y-2">
                  <MessageCircle className="mx-auto w-8 h-8 text-legal-blue" />
                  <p className="text-xs font-medium">Tire suas dúvidas básicas aqui.</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2 rounded-xl text-xs leading-relaxed ${
                    msg.role === 'user' ? 'bg-legal-blue text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2">
                    <Loader2 className="w-3 h-3 text-legal-gold animate-spin" />
                    <span className="text-[10px] text-slate-400 italic">Analisando direito...</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 rounded-b-2xl">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Sua dúvida jurídica..." 
                  className="flex-1 bg-slate-100 border-none rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-legal-gold outline-none"
                />
                <button type="submit" disabled={isTyping} className="bg-legal-blue text-white p-2 rounded-lg disabled:opacity-50 transition-all">
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            className="w-12 h-12 bg-green-500 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 border-2 border-white"
          >
            <MessageCircle size={24} />
          </a>
          <button 
            onClick={() => setChatOpen(!chatOpen)}
            className="w-14 h-14 bg-legal-blue text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 border-4 border-white"
          >
            {chatOpen ? <X size={26} /> : <Scale size={26} className="text-legal-gold" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;