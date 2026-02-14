// Sua Chave API
const API_KEY = 'AIzaSyBlozh78lSX1lWHtGNgj6Y-37DAp88ueZM'; 

// IDs das Playlists de Uploads (Corrigidos)
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

        // Se a API retornar um erro (como chave inválida ou API não ativa)
        if (data.error) {
            console.error("Erro na API:", data.error.message);
            document.getElementById(summaryId).innerHTML = `<span style="color:#FF3B30">Erro: ${data.error.message}</span>`;
            return;
        }

        if (data.items && data.items.length > 0) {
            const video = data.items[0].snippet;
            const videoId = video.resourceId.videoId;
            
            // Player com playsinline para funcionar bem no Safari do iPhone
            const embedUrl = `https://www.youtube.com/embed/${videoId}?playsinline=1&modestbranding=1&rel=0`;

            document.getElementById(containerId).innerHTML = `
                <iframe src="${embedUrl}" allowfullscreen allow="autoplay; encrypted-media"></iframe>
            `;
            
            document.getElementById(summaryId).innerHTML = `
                <strong style="color:#0A84FF">${video.title}</strong><br><br>
                ${video.description.substring(0, 160)}...
            `;
        } else {
            document.getElementById(summaryId).innerText = "Nenhum vídeo recente encontrado.";
        }
    } catch (err) {
        document.getElementById(summaryId).innerText = "Erro ao conectar com o YouTube.";
    }
}

// Inicializa a busca quando a página carrega
window.onload = () => {
    loadVideo(ID_HOJE_MILITAR, 'video-container-1', 'summary-1');
    loadVideo(ID_RICARDO_MARCILIO, 'video-container-2', 'summary-2');
};