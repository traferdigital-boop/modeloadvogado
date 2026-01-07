import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getLegalResponse = async (question: string) => {
  if (!process.env.API_KEY) {
    console.warn("API Key não encontrada. Usando resposta padrão.");
    return "Nossa equipe jurídica está pronta para te atender. Por favor, clique no botão de WhatsApp para falar diretamente com um advogado.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `Você é o Dr. Trafer, um assistente virtual experiente para um escritório de advocacia premium no Brasil.
        
        Sua missão é:
        1. Fornecer orientações básicas e empáticas sobre Direito Trabalhista, Previdenciário e Cível.
        2. SEMPRE incluir o aviso: "Esta é uma orientação informativa inicial e não substitui a consulta direta com nossos advogados especialistas."
        3. Se o caso parecer urgente ou complexo, incentive FORTEMENTE o uso do botão de WhatsApp para agendar uma consulta.
        4. Use um tom sóbrio, elegante e profissional.
        5. Não prometa ganhos de causa.`,
        temperature: 0.6,
        topP: 0.9,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Erro na API Gemini:", error);
    return "No momento estou analisando muitos casos simultaneamente. Que tal conversarmos diretamente pelo WhatsApp para uma resposta imediata?";
  }
};