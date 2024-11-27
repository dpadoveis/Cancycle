// URL fixa para todos os QR Codes gerados
const baseUrl = "https://www.instagram.com/digaoestacaobh/";

// Função para exibir a modal com o QR Code e senha gerados
function showQRCode(produto) {
    const senha = gerarSenhaAleatoria(6);
    const data = `${baseUrl}?produto=${produto}&code=${senha}`;

    // Atualiza o QR Code e exibe a modal
    modalTitle.textContent = `QR Code para ${produto}`;
    qrcode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;
    senhaDisplay.textContent = `Senha gerada: ${senha}`;
    modal.style.display = "block";
}

// Função para gerar uma senha aleatória de até 6 caracteres
function gerarSenhaAleatoria(tamanho) {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let senha = "";
    for (let i = 0; i < tamanho; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return senha;
}

// Fecha a modal ao clicar no botão de fechar
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fecha a modal ao clicar fora dela
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
