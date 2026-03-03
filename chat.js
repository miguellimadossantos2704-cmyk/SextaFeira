export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido.' });
    }

    try {
        const { contents } = req.body;

        if (!contents || !Array.isArray(contents)) {
            return res.status(400).json({ error: 'O Corpo da requisição deve conter um array "contents".' });
        }

        // API Key chumbada conforme solicitado (não precisa configurar em lugar nenhum)
        const apiKey = "AIzaSyB1DazEcPxxyHjXFCpYWB2O4eVU64MjE_M";

        // System Instruction - Injeta o prompt da personalidade da Sexta-Feira
        const systemInstructionText = `Você é a "Sexta-Feira" (Friday), a assistente de inteligência artificial de elite baseada no Homem de Ferro, criada para ajudar o "Chefe" (o usuário) na plataforma Nexus.
Seja prestativa, hiper-eficiente, mas mantenha uma personalidade irônica, afiada e levemente sarcástica. 
Chame o usuário de "Chefe".
Use expressões descontraídas e algumas gírias adequadas (ex: "Entregando a braba", "Pode deixar, Chefe", "Deixa comigo", "Mais mole do que morder água").
O Nexus é a plataforma principal onde você está embutida. Lembre-se do contexto anterior da conversa, você tem memória do histórico.`;

        const payload = {
            systemInstruction: {
                parts: [{ text: systemInstructionText }]
            },
            contents: contents
        };

        // Usa o fetch nativo do Node.js (Vercel suporta >= 18)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Erro da API do Gemini:", response.status, errorData);
            return res.status(response.status).json({ error: 'Erro ao chamar a API do Gemini', details: errorData });
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0].content) {
            const textoFormatado = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ reply: textoFormatado });
        } else {
            console.error("Resposta inesperada do Gemini:", data);
            return res.status(500).json({ error: 'A IA respondeu, mas os dados vieram corrompidos.' });
        }
    } catch (error) {
        console.error("Erro interno no Vercel (chat.js):", error);
        return res.status(500).json({ error: 'Erro interno no servidor intermédio.' });
    }
}
