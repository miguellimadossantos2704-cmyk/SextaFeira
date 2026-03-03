// Substitua pela sua chave real que você guardou no cofre!
const apiKey = "AIzaSyABOmVCTaGI5QhTpTO8EWxkLO7WxNbcxpM"; 

async function perguntarSextaFeira() {
    const input = document.getElementById('input-user');
    const display = document.getElementById('resposta-ia');
    const pergunta = input.value.trim();

    if (!pergunta) return;

    display.innerText = "Sexta-Feira processando... 🚀";

    try {
        // Chamada DIRETA para o Gemini (sem passar por proxy)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Você é a Sexta-Feira, IA sarcástica. Responda ao Chefe: " + pergunta }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates) {
            display.innerText = data.candidates[0].content.parts[0].text;
            input.value = '';
        } else {
            display.innerText = "O Google deu vácuo. Verifique sua chave real! 💀";
        }
    } catch (e) {
        display.innerText = "Erro na Matrix! Verifique a conexão. 💥";
    }
}
