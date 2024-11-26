// Obtendo os dados do JSON Server para os pedidos
async function carregarPedidos() {
    try {
        const resposta = await fetch('http://localhost:3000/carrinho');
        const pedidos = await resposta.json();
        const resultadoDiv = document.getElementById('resultado');

        // Verifique se o pedido é um objeto válido e contém dados
        if (!pedidos || !pedidos.itens || pedidos.itens.length === 0) {
            resultadoDiv.innerHTML = '<p>Nenhum pedido encontrado.</p>';
            return;
        }

        let pedidoHtml = `<h2>Pedido:</h2>`;
        pedidoHtml += `<ul>`;

        // Informações dos itens do pedido
        pedidos.itens.forEach(item => {
            pedidoHtml += '<hr>';
            pedidoHtml += `<li><strong>Produto:</strong> ${item.nome_produto}</li>`;
            pedidoHtml += `<li><strong>Quantidade:</strong> ${item.quantidade || 1}</li>`;
            pedidoHtml += `<li><strong>Preço Unitário:</strong> R$${parseFloat(item.preco_produto).toFixed(2)}</li>`;
            pedidoHtml += `<li><strong>Subtotal:</strong> R$${(item.quantidade * item.preco_produto).toFixed(2)}</li>`;
        });

        pedidoHtml += '</ul>';

        // Informações de endereço
        pedidoHtml += `<h3>Endereço:</h3>`;
        pedidoHtml += `<p><strong>Nome:</strong> ${pedidos.endereco.nome}</p>`;
        pedidoHtml += `<p><strong>Endereço:</strong> ${pedidos.endereco.endereco}, ${pedidos.endereco.numero}</p>`;
        pedidoHtml += `<p><strong>Bairro:</strong> ${pedidos.endereco.bairro}</p>`;
        pedidoHtml += `<p><strong>CEP:</strong> ${pedidos.endereco.cep}</p>`;

        // Informações de pagamento
        pedidoHtml += `<h3>Pagamento:</h3>`;
        pedidoHtml += `<p><strong>Forma de Pagamento:</strong> ${pedidos.pagamento.forma_pagamento}</p>`;

        // Total do pedido
        pedidoHtml += `<h3>Total:</h3>`;
        pedidoHtml += `<p><strong>R$${parseFloat(pedidos.total).toFixed(2)}</strong></p>`;

        resultadoDiv.innerHTML = pedidoHtml;
    } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = '<p>Erro ao carregar pedidos. Tente novamente mais tarde.</p>';
    }
}

// Carregar os pedidos quando a página for carregada
window.onload = carregarPedidos;
