const apiKey = "AIzaSyABOmVCTaGI5QhTpTO8EWxkLO7WxNbcxpM"; // <--- BOTA A CHAVE CERTA!

async function perguntarSextaFeira() {
    const input = document.getElementById('input-user');
    const display = document.getElementById('resposta-ia');
    const pergunta = input.value.trim();
    if (!pergunta) return;

    display.innerText = "Sexta-Feira processando... 🚀";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Você é a Sexta-Feira, IA sarcástica. Responda ao Chefe: " + pergunta }] }]
            })
        });
        const data = await response.json();
        if (data.candidates) {
            const txt = data.candidates[0].content.parts[0].text;
            display.innerText = txt;
            const msg = new SpeechSynthesisUtterance(txt);
            msg.lang = 'pt-BR';
            window.speechSynthesis.speak(msg);
            input.value = '';
        } else { display.innerText = "Erro na API! Chave errada?"; }
    } catch (e) { display.innerText = "Erro de conexão direto!"; }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-enviar').onclick = perguntarSextaFeira;
});

