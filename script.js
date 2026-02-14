// Sua Chave API
const API_KEY = 'AIzaSyBlozh78lSX1lWHtGNgj6Y-37DAp88ueZM'; 

// ID da Playlist de Uploads do canal "Hoje no Mundo Militar"
const ID_HOJE_MILITAR = 'UUxDFRhF3Y1A_Gd0-cF8gbqQ'; 

// Formatação da data para o topo da página
const options = { weekday: 'long', day: 'numeric', month: 'long' };
document.getElementById('currentDate').innerText = new Date().toLocaleDateString('pt-BR', options);

async function loadVideo(playlistId, containerId, summaryId) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=1&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Verificação de Erro da API
        if (data.error) {
            console.error("Erro na API:", data.error.message);
            document.getElementById(summaryId).innerHTML = `<span style="color:#FF3B30">Erro: ${data.error.message}</span>`;
            return;
        }

        if (data.items && data.items.length > 0) {
            const video = data.items[0].snippet;
            const videoId = video.resourceId.videoId;
            
            // Link oficial e corrigido do Player do YouTube
            const embedUrl = `https://www.youtube.com/embed/${videoId}?playsinline=1&modestbranding=1&rel=0`;

            // Insere o vídeo no HTML
            document.getElementById(containerId).innerHTML = `
                <iframe width="100%" height="250" src="${embedUrl}" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>
            `;
            
            // Insere o título e a descrição
            document.getElementById(summaryId).innerHTML = `
                <strong style="color:#0A84FF">${video.title}</strong><br><br>
                ${video.description.substring(0, 160)}...
            `;
        } else {
            document.getElementById(summaryId).innerText = "Nenhum vídeo recente encontrado.";
        }
    } catch (err) {
        document.getElementById(summaryId).innerText = "Erro ao conectar com o YouTube.";
        console.error(err);
    }
}

// Inicializa a busca apenas para o canal Hoje no Mundo Militar
window.onload = () => {
    loadVideo(ID_HOJE_MILITAR, 'video-container-1', 'summary-1');
};
