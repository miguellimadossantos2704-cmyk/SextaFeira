// 1. COLOQUE SUA CHAVE REAL AQUI (A QUE COMEÇA COM AIza...)
const apiKey = "AIzaSyABOmVCTaGI5QhTpTO8EWxkLO7WxNbcxpM"; 

// --- FUNÇÃO PARA EU FALAR COM VOCÊ ---
function falar(texto) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = texto;
    msg.language = 'pt-BR';
    msg.rate = 1.2; 
    window.speechSynthesis.speak(msg);
}

// --- FUNÇÃO PARA VOCÊ FALAR COMIGO (VOZ) ---
function ouvir() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';
    recognition.onstart = () => {
        document.getElementById('resposta-ia').innerText = "Ouvindo... pode falar, Chefe! 🎙️";
    };
    recognition.onresult = (event) => {
        document.getElementById('input-user').value = event.results[0][0].transcript;
        perguntarSextaFeira(); 
    };
    recognition.start();
}

// --- FUNÇÃO PRINCIPAL ---
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
                contents: [{ parts: [{ text: "Você é a Sexta-Feira, assistente sarcástica do Homem de Ferro. Responda ao Chefe: " + pergunta }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            const resposta = data.candidates[0].content.parts[0].text;
            display.innerText = resposta;
            falar(resposta); // EU FALANDO COM VOCÊ!
            input.value = '';
        } else {
            display.innerText = "O Google deu vácuo. Chave errada ou bloqueada! 💀";
        }
    } catch (e) {
        display.innerText = "Erro na Matrix! Verifique a conexão. 💥";
    }
}

// --- ESSA LINHA FAZ O BOTÃO FUNCIONAR DE VERDADE ---
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-enviar');
    if(btn) btn.addEventListener('click', perguntarSextaFeira);
});
