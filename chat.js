// 1. COLE SUA NOVA CHAVE AQUI (A que você gerou no AI Studio)
const apiKey = "AIzaSyB1DazEcPxxyHjXFCpYWB2O4eVU64MjE_M"; 

// --- FUNÇÃO PARA EU FALAR COM VOCÊ ---
function falar(texto) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = texto;
    msg.language = 'pt-BR';
    msg.rate = 1.2; 
    window.speechSynthesis.speak(msg);
}

// --- FUNÇÃO PARA VOCÊ FALAR COMIGO (MICROFONE) ---
function ouvir() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';
    recognition.onstart = () => {
        document.getElementById('resposta-ia').innerText = "Ouvindo... pode falar, Chefe! 🎙️";
    };
    recognition.onresult = (event) => {
        const voz = event.results[0][0].transcript;
        document.getElementById('input-user').value = voz;
        perguntarSextaFeira(); // Já envia automático!
    };
    recognition.start();
}

// --- FUNÇÃO PRINCIPAL SEM PROXY ---
async function perguntarSextaFeira() {
    const input = document.getElementById('input-user');
    const display = document.getElementById('resposta-ia');
    const pergunta = input.value.trim();

    if (!pergunta) return;

    display.innerText = "Processando... segura a onda! 🚀";

    try {
        // Conexão DIRETA com o Gemini
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Você é a Sexta-Feira, IA sarcástica. Responda ao Chefe: " + pergunta }] }]
            })
        });

        const data = await response.json();
        const resposta = data.candidates[0].content.parts[0].text;
        
        display.innerText = resposta;
        falar(resposta); // Eu falo a resposta para você!
        input.value = '';

    } catch (e) {
        display.innerText = "Erro fatal no núcleo! Verifique sua chave de API. 💀";
    }
}
