const BASE_URL = "http://localhost:3000";


// Centralizar requisições ao backend
async function apiFetch(endpoint, options = {}) {
    const url = `http://localhost:3000/${endpoint}`;
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Erro na requisição para ${url}`);
    return response.json();
}

// Função para carregar produtos no cardápio
export async function carregarProdutos(localHTML) {
    try {
        const listaProdutos = await apiFetch('produtos');

        listaProdutos.forEach(produto => {
            const html = `
                <div class="box" id="${produto.codigo_produto}">
                    <img src="${produto.imagem_produto}" alt="${produto.nome_produto}" id="${produto.codigo_produto}">
                    <div class="texto-lanche">
                        <h3>${produto.nome_produto}</h3>
                        <h4>R$ ${produto.preco_produto}</h4>
                    </div>
                    <a href="./produto1.html"><button id="${produto.codigo_produto}">Ver mais</button></a>
                </div>
            `;
            localHTML.innerHTML += html;
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Captura o clique em produtos e armazena o ID no localStorage
export function handleClick() {
    const produtos = document.querySelectorAll('div.box');

    produtos.forEach(produto => 
        produto.addEventListener('click', (evento) => {
            const idProduto = evento.target.id;
            localStorage.setItem('prodID', idProduto); // Armazena o ID para a página de detalhes
        })
    );
}

// Busca um produto pelo ID no backend
export async function findProduct(prodID) {
    try {
        return await apiFetch(`produtos/${prodID}`);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
    }
}

export async function addItemCarrinho(newItem) {
    try {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || { pedidos: [] };

        // Se não houver pedidos, cria um novo pedido
        if (carrinho.pedidos.length === 0) {
            carrinho.pedidos.push({
                id_pedido: 1, 
                itens: [],
                total: 0,
                finalizado: false 
            });
        }

        const pedidoAtual = carrinho.pedidos[carrinho.pedidos.length - 1];
        if (pedidoAtual.finalizado) {
            alert("Este pedido já foi finalizado. Não é possível adicionar mais itens.");
            return;
        }

        const itemExistente = pedidoAtual.itens.find(item => item.codigo_produto === newItem.codigo_produto);
        if (itemExistente) {
            itemExistente.quantidade += newItem.quantidade;
        } else {
            pedidoAtual.itens.push(newItem);
        }

        pedidoAtual.total = pedidoAtual.itens.reduce((acc, item) => acc + item.quantidade * parseFloat(item.preco_produto), 0);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        alert("Item adicionado ao carrinho com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar item ao carrinho:", error);
        alert(`Erro ao adicionar item ao carrinho: ${error.message}`);
    }
}


// Exibe os detalhes do produto na página produto1.html
export async function carregarDetalhesProduto() {
    const codProduto = localStorage.getItem("prodID");
    const container = document.querySelector("main section div.container");

    try {
        const item = await findProduct(codProduto);

        if (!item) {
            container.innerHTML = "<p>Produto não encontrado.</p>";
            return;
        }

        const html = `
            <div class="left-side">
                <div class="items">
                    <div class="select-image">
                        <img src="${item.imagem_produto}" alt="Imagem do produto">
                    </div>
                </div>
            </div>
            <div class="right-side">
                <div class="content">
                    <h3>Pedido</h3>
                    <h2>${item.nome_produto}</h2>
                    <p>${item.descricao_produto}</p>
                    <div class="prices">
                        <span class="price">R$${item.preco_produto.toFixed(2)}</span>
                        <input id="qtd" class="product-qtd-input" type="number" value="1" min="1">
                    </div>
                    <button class="btn">Adicionar ao carrinho</button>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Adiciona evento de clique no botão
        document.querySelector(".btn").addEventListener("click", () => {
            const quantidade = parseInt(document.querySelector("#qtd").value);
            addItemCarrinho({ ...item, quantidade });
        });
    } catch (error) {
        console.error("Erro ao carregar detalhes do produto:", error);
    }
}

// Calcula o total do carrinho
export async function calcTotal() {
    try {
        const carrinhoCompras = JSON.parse(localStorage.getItem("carrinho")) || [];

        let total = 0;
        const totalCarrinho = document.querySelector('.totalCarrinho');
        totalCarrinho.innerHTML = '';

        carrinhoCompras.forEach(item => {
            total += item.preco_produto * item.quantidade;
        });

        const totCarrinho = `<p>Total: R$ ${total.toFixed(2)}</p>`;
        totalCarrinho.innerHTML = totCarrinho;
    } catch (error) {
        console.error('Erro ao calcular o total do carrinho:', error);
    }
}

// Carrega itens do carrinho na tabela
export async function carregarCarrinho() {
    try {
        const carrinhoCompras = JSON.parse(localStorage.getItem("carrinho")) || { pedidos: [] };
        const pedidoAtual = carrinhoCompras.pedidos[carrinhoCompras.pedidos.length - 1] || { itens: [] };

        const tabelaCarrinho = document.querySelector('.cart-table tbody');
        tabelaCarrinho.innerHTML = '';

        pedidoAtual.itens.forEach(item => {
            const html = `
                <tr>
                    <td>${item.nome_produto}</td>
                    <td>R$ ${item.preco_produto.toFixed(2)}</td>
                    <td>${item.quantidade}</td>
                </tr>
            `;
            tabelaCarrinho.innerHTML += html;
        });

        calcTotal();
    } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
    }
}

//Função para finalizar pedido
export async function finalizarPedido() {
    try {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || { pedidos: [] };
        const pedidoFinalizado = carrinho.pedidos[carrinho.pedidos.length - 1];
        pedidoFinalizado.finalizado = true;

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        alert('Pedido finalizado com sucesso!');
    } catch (error) {
        console.error('Erro ao finalizar pedido:', error);
        alert(`Erro ao finalizar pedido: ${error.message}`);
    }
}
