// Sua Chave API
const API_KEY = 'AIzaSyBlozh78lSX1lWHtGNgj6Y-37DAp88ueZM'; 

// IDs das Playlists de Uploads
const ID_HOJE_MILITAR = 'UUxDFRhF3Y1A_Gd0-cF8gbqQ'; 
const ID_RICARDO_MARCILIO = 'UU0UaA9_m_wS_O-vM5X578yA'; // ID correto do Prof. Ricardo Marcílio

// Formatação da data para o topo da página
const options = { weekday: 'long', day: 'numeric', month: 'long' };
document.getElementById('currentDate').innerText = new Date().toLocaleDateString('pt-BR', options);

async function loadVideo(playlistId, containerId, summaryId) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=1&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Se a API do Google der erro, mostra na tela
        if (data.error) {
            document.getElementById(summaryId).innerHTML = `<span style="color:#FF3B30">Erro da API: ${data.error.message}</span>`;
            return;
        }

        if (data.items && data.items.length > 0) {
            const video = data.items[0].snippet;
            const videoId = video.resourceId.videoId;
            
            // LINK OFICIAL CORRIGIDO: URL de Embed do YouTube
            const embedUrl = `https://www.youtube.com/embed/${videoId}?playsinline=1&modestbranding=1&rel=0`;

            // Insere o vídeo
            document.getElementById(containerId).innerHTML = `
                <iframe width="100%" height="220" src="${embedUrl}" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>
            `;
            
            // Insere o título e descrição
            document.getElementById(summaryId).innerHTML = `
                <strong style="color:#0A84FF; font-size: 16px;">${video.title}</strong><br><br>
                <span style="font-size: 14px; color: #555;">${video.description.substring(0, 150)}...</span>
            `;
        } else {
            document.getElementById(summaryId).innerText = "Nenhum vídeo recente encontrado.";
        }
    } catch (err) {
        document.getElementById(summaryId).innerText = "Erro ao conectar com o YouTube. Verifique sua internet.";
    }
}

// Inicializa a busca para os dois canais
window.onload = () => {
    loadVideo(ID_HOJE_MILITAR, 'video-container-1', 'summary-1');
    loadVideo(ID_RICARDO_MARCILIO, 'video-container-2', 'summary-2');
};
