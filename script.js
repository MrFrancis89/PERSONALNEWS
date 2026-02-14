const API_KEY = 'AIzaSyBlozh78lSX1lWHtGNgj6Y-37DAp88ueZM'; 

// IDs das playlists de "Uploads" (Canais convertidos para Playlist)
const ID_MILITAR = 'UUxDFRhF3Y1A_Gd0-cF8gbqQ'; 
const ID_MARCILIO = 'UU93_N7Y8_vC0uP6v-vU_bsw'; 

// Atualizar Data no topo
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
            
            // Player otimizado para iPhone
            const embedUrl = `https://www.youtube.com/embed/${videoId}?playsinline=1&controls=1&rel=0`;

            document.getElementById(containerId).innerHTML = `<iframe src="${embedUrl}" allowfullscreen></iframe>`;
            
            // Coloca o título e um pedaço da descrição no resumo
            document.getElementById(summaryId).innerHTML = `<strong>${item.title}</strong><br><br>${item.description.substring(0, 150)}...`;
        }
    } catch (e) {
        console.error("Erro na API:", e);
        document.getElementById(summaryId).innerText = "Erro ao carregar. Verifique a cota da API.";
    }
}

// Inicia a busca assim que a página abre
window.onload = () => {
    loadVideo(ID_MILITAR, 'video-container-1', 'summary-1');
    loadVideo(ID_MARCILIO, 'video-container-2', 'summary-2');
};