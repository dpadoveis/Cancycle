$(document).ready(function () {
    // Alternância de formulários
    $('#showLogin').click(function () {
        $('#formCadastroUsuario').hide();
        $('#formCadastroEstabelecimento').hide();
        $('#formLogin').show();
    });

    $('#showCadastro').click(function () {
        $('#formLogin').hide();
        $('#formCadastroUsuario').show();
    });

    $('#toggleUsuario').click(function () {
        $('#formCadastroEstabelecimento').hide();
        $('#formLogin').hide();
        $('#formCadastroUsuario').show();
    });

    $('#toggleEstabelecimento').click(function () {
        $('#formCadastroUsuario').hide();
        $('#formLogin').hide();
        $('#formCadastroEstabelecimento').show();
    });

    $('#formCadastroEstabelecimento .toggle-link').click(function () {
        $('#formCadastroEstabelecimento').hide();
        $('#formLogin').show();
    });
});

// Função para cadastrar usuário
async function cadastrarUsuario(event) {
    event.preventDefault();

    const cpf = document.getElementById('cpfCadastro').value;
    const nome = document.getElementById('nomeCadastroUsuario').value;
    const email = document.getElementById('emailCadastroUsuario').value;
    const senha = document.getElementById('senhaCadastroUsuario').value;

    try {
        const response = await fetch('http://localhost:3000/usuarios/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf_cnpj: cpf, nome, email, senha })
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

// Função para cadastrar estabelecimento
async function cadastrarEstabelecimento(event) {
    event.preventDefault();

    const cnpj = document.getElementById('cnpjCadastro').value;
    const nome = document.getElementById('nomeCadastroEstabelecimento').value;
    const email = document.getElementById('emailCadastroEstabelecimento').value;
    const senha = document.getElementById('senhaCadastroEstabelecimento').value;

    try {
        const response = await fetch('http://localhost:3000/estabelecimentos/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cnpj, nome, email, senha })
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

// Função para login
async function loginUsuario(event) {
    event.preventDefault();

    const cpf_cnpj = document.getElementById('cpfCnpjLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    try {
        const response = await fetch('http://localhost:3000/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf_cnpj, senha })
        });

        if (!response.ok) {
            throw new Error(`Erro no login: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
            alert("Login realizado com sucesso!");
            window.location.href = "../html/PerfilUsuario.html";
        } else {
            alert("Credenciais inválidas. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao realizar o login:", error);
        alert("Erro ao realizar o login.");
    }
}

// Adicionar eventos de envio aos formulários
document.getElementById('formularioCadastroUsuario').addEventListener('submit', cadastrarUsuario);
document.getElementById('formularioCadastroEstabelecimento').addEventListener('submit', cadastrarEstabelecimento);
document.getElementById('formularioLogin').addEventListener('submit', loginUsuario);
