// Substitua pela sua chave nova (aquela que começa com AIza...)
const apiKey = "AIzaSyB1DazEcPxxyHjXFCpYWB2O4eVU64MjE_M"; 

// --- SEXTA-FEIRA FALANDO ---
function falar(texto) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = texto;
    msg.language = 'pt-BR';
    msg.rate = 1.2;
    window.speechSynthesis.speak(msg);
}

// --- SEXTA-FEIRA OUVINDO ---
function ouvir() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';
    recognition.onstart = () => console.log("Ouvindo...");
    recognition.onresult = (event) => {
        document.getElementById('input-user').value = event.results[0][0].transcript;
        perguntarSextaFeira();
    };
    recognition.start();
}

// --- FUNÇÃO PRINCIPAL ---
async function perguntarSextaFeira() {
    const inputElement = document.getElementById('input-user');
    const respostaTela = document.getElementById('resposta-ia');
    const pergunta = inputElement.value.trim();

    if (!pergunta) return;

    respostaTela.innerText = "Sexta-Feira está processando... 🚀";

    try {
        // Chamada DIRETA para o Google (evita erro de Proxy)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Você é a Sexta-Feira, assistente sarcástica do Homem de Ferro. Responda ao Chefe: " + pergunta }] }]
            })
        });

        const data = await response.json();
        const respostaIa = data.candidates[0].content.parts[0].text;
        
        respostaTela.innerText = respostaIa;
        falar(respostaIa); // Ela fala a resposta!
        inputElement.value = '';

    } catch (error) {
        console.error(error);
        respostaTela.innerText = "Erro na Matrix, Chefe! Verifica a chave de API. 💀";
    }
}
