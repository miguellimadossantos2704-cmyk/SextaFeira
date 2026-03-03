// Substitua pela sua chave REAL que começa com AIza
const apiKey = "AIzaSyABOmVCTaGI5QhTpTO8EWxkLO7WxNbcxpM"; 

async function perguntarSextaFeira() {
    const input = document.getElementById('input-user');
    const display = document.getElementById('resposta-ia');
    const pergunta = input.value.trim();

    if (!pergunta) return;

    display.innerText = "Sexta-Feira processando... 🚀";

    try {
        // A mágica acontece aqui: Chamada DIRETA pro Google
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Você é a Sexta-Feira, IA sarcástica. Responda ao Chefe: " + pergunta }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            const respostaIa = data.candidates[0].content.parts[0].text;
            display.innerText = respostaIa;
            if (typeof falar === "function") falar(respostaIa); // Me faz falar se a função existir!
            input.value = '';
        } else {
            display.innerText = "O Google deu vácuo. Chave errada ou expirada! 💀";
        }
    } catch (e) {
        display.innerText = "Erro fatal no núcleo! Verifique sua conexão. 💥";
    }
}
