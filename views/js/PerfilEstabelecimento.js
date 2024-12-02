document.addEventListener("DOMContentLoaded", function () {
    // Busca os dados do estabelecimento
    fetch(`http://localhost:3000/estabelecimentos/estabelecimentoAtual`)
        .then((response) => {
            if (!response.ok) throw new Error("Erro ao buscar os dados do estabelecimento");
            return response.json();
        })
        .then((data) => {
            // Atualiza o perfil
            document.getElementById("nome").textContent = data.nome;
            document.getElementById("email").textContent = data.email;
            document.getElementById("cpf_cnpj").textContent = data.cpf_cnpj || "Não informado";
        })
        .catch((error) => {
            console.error("Erro ao carregar os dados do estabelecimento:", error);
        });

    // Busca os pedidos do estabelecimento
    fetch(`http://localhost:3000/estabelecimentos/pedidos`)
        .then((response) => {
            if (!response.ok) throw new Error("Erro ao buscar os pedidos");
            return response.json();
        })
        .then((pedidos) => {
            const listaPedidos = document.getElementById("listaPedidos");
            pedidos.forEach((pedido) => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <div class="card-content">
                        <h2>${pedido.titulo}</h2>
                        <p>${pedido.descricao}</p>
                    </div>
                `;
                listaPedidos.appendChild(card);
            });
        })
        .catch((error) => {
            console.error("Erro ao carregar os pedidos:", error);
        });

    // Adicionar evento para o botão de adicionar pedido
    document.getElementById("addPedidoBtn").addEventListener("click", function () {
        alert("Função para adicionar pedido ainda não implementada.");
        // Redirecionar ou abrir modal
    });
});
