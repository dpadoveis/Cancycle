document.addEventListener("DOMContentLoaded", function () {
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


    fetch(`http://localhost:3000/usuarios/pedidos`)
        .then((response) => {
            if (!response.ok) throw new Error("Erro ao buscar os pedidos disponíveis");
            return response.json();
        })
        .then((pedidos) => {
            const container = document.querySelector(".pacotes-cards");

            pedidos.forEach((pedido) => {
                const card = criarCardPedido(pedido);
                container.appendChild(card);
            });
        })
        .catch((error) => {
            console.error("Erro ao carregar os pedidos disponíveis:", error);
        });

    fetch(`http://localhost:3000/pedidos`)
        .then((response) => response.json())
        .then((data) => {
            const container = document.getElementById("pedidoContainer");
            data.forEach((pedido) => {
                const card = document.createElement("div");
                card.className = "pedido-card";
                card.innerHTML = `
                    <h3>${pedido.nome_empresa}</h3>
                    <p>${pedido.descricao}</p>
                    <p>Pontos: ${pedido.pontos}</p>
                `;
                card.addEventListener("click", () => abrirModal(pedido.id));
                container.appendChild(card);
            });
        });

    function abrirModal(pedidoId) {
        const modal = document.getElementById("pedidoModal");
        modal.style.display = "block";
        document.getElementById("verificarCodigo").onclick = () => verificarPedido(pedidoId);
    }

    function verificarPedido(idPedido) {
        const inputCodigo = document.getElementById("codigoPedido").value;

        if (inputCodigo == idPedido) {
            fetch(`http://localhost:3000/pedidos/${idPedido}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cpf_cnpj: "15919016698" }) 
            })
                .then((response) => response.json())
                .then((result) => {
                    alert(result.message);
                    location.reload(); 
                })
                .catch((error) => {
                    alert("Erro ao processar o pedido.");
                    console.error(error);
                });
        } else {
            alert("Código incorreto. Tente novamente!");
        }
    }

    // Fechar modal
    document.getElementById("fecharModal").onclick = () => {
        document.getElementById("pedidoModal").style.display = "none";
    };
});
