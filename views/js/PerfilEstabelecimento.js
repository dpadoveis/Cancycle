document.addEventListener("DOMContentLoaded", function () {
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
                const card = criarCardPedido(pedido);
                listaPedidos.appendChild(card);
            });
        })
        .catch((error) => {
            console.error("Erro ao carregar os pedidos:", error);
        });

    // Submeter o formulário de adicionar pedido
    document.getElementById("addPedidoForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("descricao", document.getElementById("descricaoPedido").value);
        formData.append("pontos", document.getElementById("pontosPedido").value);

        const descricao = document.getElementById("descricaoPedido").value;
        const pontos = document.getElementById("pontosPedido").value;

        try {
            const response = await fetch("http://localhost:3000/estabelecimentos/addPedido", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ descricao, pontos }),
            });


            if (!response.ok) throw new Error("Erro ao adicionar o pedido");

            const data = await response.json();
            alert("Pedido adicionado com sucesso!");

            const listaPedidos = document.getElementById("listaPedidos");
            const card = criarCardPedido(data.pedido);
            listaPedidos.appendChild(card);

            document.getElementById("addPedidoModal").style.display = "none";
            document.getElementById("addPedidoForm").reset();
        } catch (error) {
            console.error("Erro ao adicionar o pedido:", error);
            alert("Falha ao adicionar o pedido.");
        }
    });

    configurarModais([
        { buttonId: "addPedidoBtn", modalId: "addPedidoModal", closeButtonId: "closeModal" },
    ]);
});

function criarCardPedido(pedido) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="card-content">
            <h2>${pedido.nome_empresa}</h2>
            <p>Descrição: ${pedido.descricao}</p>
            <p>Pontos: ${pedido.pontos}</p>
            <p>Código : ${pedido.id}</p>
        </div>
    `;
    return card;
}

function configurarModais(modais) {
    modais.forEach(({ buttonId, modalId, closeButtonId }) => {
        const openButton = document.getElementById(buttonId);
        const modal = document.getElementById(modalId);
        const closeButton = document.getElementById(closeButtonId);

        openButton.addEventListener("click", () => {
            modal.style.display = "flex";
        });

        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });
    });
}