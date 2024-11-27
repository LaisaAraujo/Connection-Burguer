async function carregarPedidos() {
    try {
        const resposta = await fetch('http://localhost:3000/carrinho');
        const pedido = await resposta.json(); // Retorna um único objeto
        const resultadoDiv = document.getElementById('resultado');

        // Verifica se o pedido existe e possui itens
        if (!pedido || !pedido.itens || pedido.itens.length === 0) {
            resultadoDiv.innerHTML = '<p>Nenhum pedido encontrado.</p>';
            return;
        }

        // Renderiza o pedido
        let pedidoHtml = `<h2>Pedido:</h2>`;
        pedidoHtml += `<ul>`;

        // Informações dos itens do pedido
        pedido.itens.forEach(item => {
            pedidoHtml += '<hr>';
            pedidoHtml += `<li><strong>Produto:</strong> ${item.nome_produto}</li>`;
            pedidoHtml += `<li><strong>Quantidade:</strong> ${item.quantidade || 1}</li>`;
            pedidoHtml += `<li><strong>Preço Unitário:</strong> R$${parseFloat(item.preco_produto).toFixed(2)}</li>`;
            pedidoHtml += `<li><strong>Subtotal:</strong> R$${(item.quantidade * item.preco_produto).toFixed(2)}</li>`;
        });

        pedidoHtml += '</ul>';

        // Informações de endereço
        pedidoHtml += `<h3>Endereço:</h3>`;
        pedidoHtml += `<p><strong>Nome:</strong> ${pedido.endereco.nome}</p>`;
        pedidoHtml += `<p><strong>Endereço:</strong> ${pedido.endereco.endereco}, ${pedido.endereco.numero}</p>`;
        pedidoHtml += `<p><strong>Bairro:</strong> ${pedido.endereco.bairro}</p>`;
        pedidoHtml += `<p><strong>CEP:</strong> ${pedido.endereco.cep}</p>`;

        // Informações de pagamento
        pedidoHtml += `<h3>Pagamento:</h3>`;
        pedidoHtml += `<p><strong>Forma de Pagamento:</strong> ${pedido.pagamento.forma_pagamento}</p>`;

        // Total do pedido
        pedidoHtml += `<h3>Total:</h3>`;
        pedidoHtml += `<p><strong>R$${parseFloat(pedido.total).toFixed(2)}</strong></p>`;

        pedidoHtml += '<hr>'; // Separador entre pedidos

        // Insere o HTML no container
        resultadoDiv.innerHTML = pedidoHtml;
    } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = '<p>Erro ao carregar pedidos. Tente novamente mais tarde.</p>';
    }
}

// Carregar os pedidos quando a página for carregada
window.onload = carregarPedidos;
