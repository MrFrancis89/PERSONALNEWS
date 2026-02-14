// Sua Chave API que você gerou
const API_KEY = 'AIzaSyBlozh78lSX1lWHtGNgj6Y-37DAp88ueZM'; 

// IDs CORRETOS (Convertidos para Playlist de Uploads)
// Hoje no Mundo Militar: UCxDFRhF3Y1A_Gd0-cF8gbqQ -> UUxDFRhF3Y1A_Gd0-cF8gbqQ
const ID_HOJE_MILITAR = 'UUxDFRhF3Y1A_Gd0-cF8gbqQ'; 
// Eduardo Marcílio: UC93_N7Y8_vC0uP6v-vU_bsw -> UU93_N7Y8_vC0uP6v-vU_bsw
const ID_MARCILIO = 'UU93_N7Y8_vC0uP6v-vU_bsw'; 

// Função para carregar a data (Estilo iOS)
const options = { weekday: 'long', day: 'numeric', month: 'long' };
document.getElementById('currentDate').innerText = new Date().toLocaleDateString('pt-BR', options);

async function loadVideo(playlistId, containerId, summaryId) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=1&key=${API_KEY}`;

    try {
        const req = await fetch(url);
        const json = await req.json();

        if (json.items && json.items.length > 0) {
            const item = json.items[0].snippet;
            const videoId = item.resourceId.videoId;
            const title = item.title;
            const description = item.description;

            // Player otimizado para não sair do navegador no iPhone
            const embedUrl = `https://www.youtube.com/embed/${videoId}?playsinline=1&modestbranding=1&rel=0`;

            document.getElementById(containerId).innerHTML = `<iframe src="${embedUrl}" allowfullscreen></iframe>`;
            
            // Resumo formatado
            document.getElementById(summaryId).innerHTML = `<strong>${title}</strong><br><br>${description.substring(0, 160)}...`;
        }
    } catch (e) {
        console.error("Erro:", e);
        document.getElementById(summaryId).innerText = "Erro ao carregar vídeo.";
    }
}

// Inicializa os canais
window.onload = () => {
    loadVideo(ID_HOJE_MILITAR, 'video-container-1', 'summary-1');
    loadVideo(ID_MARCILIO, 'video-container-2', 'summary-2');
};