document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("showLogin").addEventListener("click", () => {
        document.getElementById("formLogin").style.display = "block";
        document.getElementById("formCadastroUsuario").style.display = "none";
        document.getElementById("formCadastroEstabelecimento").style.display = "none";
    });

    document.getElementById("tipoCadastro").addEventListener("change", function () {
        const tipoCadastro = this.value;

        document.getElementById("formCadastroUsuario").style.display =
            tipoCadastro === "usuario" ? "block" : "none";

        document.getElementById("formCadastroEstabelecimento").style.display =
            tipoCadastro === "estabelecimento" ? "block" : "none";

        document.getElementById("formLogin").style.display = "none";
    });


    document.getElementById("tipoLogin").addEventListener("change", function () {
        const tipoLogin = this.value;
        const campoCpfCnpj = document.getElementById("cpfCnpjLogin");
        const labelCpfCnpj = document.getElementById("labelCpfCnpj");

        if (tipoLogin === "usuario") {
            labelCpfCnpj.textContent = "CPF";
            campoCpfCnpj.placeholder = "Digite o CPF";
            campoCpfCnpj.disabled = false;
        } else if (tipoLogin === "estabelecimento") {
            labelCpfCnpj.textContent = "CNPJ";
            campoCpfCnpj.placeholder = "Digite o CNPJ";
            campoCpfCnpj.disabled = false;
        } else {
            labelCpfCnpj.textContent = "CPF ou CNPJ";
            campoCpfCnpj.placeholder = "Selecione um tipo acima";
            campoCpfCnpj.disabled = true;
        }
    });

    async function cadastrarUsuario(event) {
        event.preventDefault();

        const cpf = document.getElementById("cpfCadastro").value;
        const nome = document.getElementById("nomeCadastroUsuario").value;
        const email = document.getElementById("emailCadastroUsuario").value;
        const senha = document.getElementById("senhaCadastroUsuario").value;

        try {
            const response = await fetch("http://localhost:3000/usuarios/cadastro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cpf_cnpj: cpf, nome, email, senha }),
            });

            if (!response.ok) {
                throw new Error(`Erro no cadastro: ${response.statusText}`);
            }

            const data = await response.text();
            alert(data);
        } catch (error) {
            console.error("Erro ao realizar o cadastro de usuário:", error);
            alert("Erro ao realizar o cadastro de usuário.");
        }
    }

    async function cadastrarEstabelecimento(event) {
        event.preventDefault();

        const cnpj = document.getElementById("cnpjCadastro").value;
        const nome = document.getElementById("nomeCadastroEstabelecimento").value;
        const email = document.getElementById("emailCadastroEstabelecimento").value;
        const senha = document.getElementById("senhaCadastroEstabelecimento").value;

        try {
            const response = await fetch("http://localhost:3000/estabelecimentos/cadastro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cnpj, nome, email, senha }),
            });

            if (!response.ok) {
                throw new Error(`Erro no cadastro: ${response.statusText}`);
            }

            const data = await response.text();
            alert(data);
        } catch (error) {
            console.error("Erro ao realizar o cadastro de estabelecimento:", error);
            alert("Erro ao realizar o cadastro de estabelecimento.");
        }
    }

    async function login(event) {
        event.preventDefault();

        const tipoLogin = document.getElementById("tipoLogin").value;
        const cpf_cnpj = document.getElementById("cpfCnpjLogin").value;
        const senha = document.getElementById("senhaLogin").value;

        const endpoint = tipoLogin === "usuario" ? "usuarios/login" : "estabelecimentos/login";

        try {
            const response = await fetch(`http://localhost:3000/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cpf_cnpj, senha }),
            });

            if (!response.ok) {
                throw new Error(`Erro no login: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.success) {
                alert("Login realizado com sucesso!");
                window.location.href =
                    tipoLogin === "usuario" ? "../html/PerfilUsuario.html" : "../html/PerfilEstabelecimento.html";
            } else {
                alert("Credenciais inválidas. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao realizar o login:", error);
            alert("Erro ao realizar o login.");
        }
    }

    // Associar eventos aos formulários
    document.getElementById("formularioCadastroUsuario").addEventListener("submit", cadastrarUsuario);
    document.getElementById("formularioCadastroEstabelecimento").addEventListener("submit", cadastrarEstabelecimento);
    document.getElementById("formularioLogin").addEventListener("submit", login);
});
