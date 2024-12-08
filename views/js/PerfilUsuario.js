document.addEventListener("DOMContentLoaded", function () {
    // Busca os dados do usuário
    fetch(`http://localhost:3000/usuarios/usuarioAtual`)
        .then((response) => {
            if (!response.ok) throw new Error("Erro ao buscar os dados do usuário");
            return response.json();
        })
        .then((data) => {
            document.getElementById("nome").textContent = data.nome;
            document.getElementById("email").textContent = data.email;
            document.getElementById("cpf").textContent = data.cpf_cnpj || "Não informado";
            document.getElementById("pontos").textContent = data.pontos || 0;
        })
        .catch((error) => {
            console.error("Erro ao carregar os dados do usuário:", error);
        });

    // Logout
    document.getElementById("logout-btn").addEventListener("click", function () {
        alert("Você saiu da sua conta!");
        window.location.href = "Home.html";
    });
});
