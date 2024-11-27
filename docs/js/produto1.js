import { addItemCarrinho } from "./funcoes.js";

// Obtém o código do produto da URL
let codigoProduto = new URLSearchParams(window.location.search).get('codigo_produto'); // Agora é let

// Seleciona o container para renderizar o produto
const container = document.querySelector("main section div.container");

// Função para carregar o produto
(async () => {
    try {
        codigoProduto = localStorage.getItem("prodID"); // Isso agora funciona porque é let

        if (!codigoProduto) {
            container.innerHTML = "<p>Nenhum código de produto foi especificado.</p>";
            return;
        }

        // Busca o produto no JSON Server pelo codigo_produto
        const response = await fetch(`http://localhost:3000/produtos?codigo_produto=${codigoProduto}`);
        const produtos = await response.json();

        // Verifica se algum produto foi encontrado
        if (!produtos.length) {
            container.innerHTML = "<p>Produto não encontrado.</p>";
            return;
        }

        const produto = produtos[0]; // Seleciona o primeiro produto encontrado

        // Gera o HTML do produto
        const html = `
            <div class="left-side">
                <div class="items">
                    <div class="select-image">
                        <img src="${produto.imagem_produto}" alt="Imagem do produto">
                    </div>
                </div>
            </div>
            <div class="right-side">
                <div class="content">
                    <h3>Pedido</h3>
                    <h2>${produto.nome_produto}</h2>
                    <p>${produto.descricao_produto}</p>
                    <div class="prices">
                        <span class="price">R$${parseFloat(produto.preco_produto).toFixed(2)}</span>
                        <input id="qtd" class="product-qtd-input" type="number" value="1" min="1">
                    </div>
                    <button class="btn">Adicionar ao carrinho</button>
                </div>
            </div>
        `;

        // Insere o HTML no container
        container.innerHTML = html;

        // Seleciona o botão e adiciona o evento de clique
        const btnAddCarrinho = document.querySelector(".btn");
        btnAddCarrinho.addEventListener("click", () => {
            const quantidade = parseInt(document.querySelector("#qtd").value);

            // Cria o objeto do item com a quantidade selecionada
            const newItem = {
                ...produto,
                quantidade: quantidade,
            };

            // Adiciona o item ao carrinho via JSON Server
            addItemCarrinho(newItem);
        });
    } catch (error) {
        console.error("Erro ao carregar o produto:", error);
        container.innerHTML = "<p>Erro ao carregar o produto. Tente novamente mais tarde.</p>";
    }
})();
