// URL base do JSON Server
const BASE_URL = 'http://localhost:3000';

// Elementos do DOM
const carrinhoTabela = document.querySelector('.cart-table tbody');
const totalCarrinhoDiv = document.querySelector('#cart-total');
const finalizarBtn = document.querySelector('#finalizar-compra');

// Variáveis para armazenar os itens e o total
let carrinho = [];
let total = 0;

// Carregar carrinho do JSON Server
async function carregarCarrinho() {
  try {
    const response = await fetch(`${BASE_URL}/carrinho`);
    const dados = await response.json();

    carrinho = dados.itens || [];
    total = dados.total || 0;

    atualizarTabela();
  } catch (error) {
    console.error('Erro ao carregar o carrinho:', error);
  }
}

// Atualizar tabela de exibição do carrinho
function atualizarTabela() {
  carrinhoTabela.innerHTML = '';
  total = 0;

  carrinho.forEach(item => {
    total += item.quantidade * parseFloat(item.preco_produto);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.nome_produto} (${item.quantidade}x)</td>
      <td>R$ ${(item.quantidade * item.preco_produto).toFixed(2)}</td>
      <td>
        <button class="remover-btn" data-id="${item.codigo_produto}">Remover</button>
      </td>
    `;
    carrinhoTabela.appendChild(row);
  });

  totalCarrinhoDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;

  // Adicionar evento de clique nos botões de remover
  document.querySelectorAll('.remover-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codigoProduto = btn.getAttribute('data-id');
      removerItem(codigoProduto);
    });
  });
}

// Buscar produto pelo código
async function buscarProduto(codigoProduto) {
  try {
    const response = await fetch(`${BASE_URL}/produtos?codigo_produto=${codigoProduto}`);
    const produtos = await response.json();
    return produtos[0];
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
  }
}

// Adicionar item ao carrinho
async function adicionarAoCarrinho(codigoProduto, quantidade = 1) {
  const produto = await buscarProduto(codigoProduto);
  if (!produto) return;

  const itemExistente = carrinho.find(item => item.codigo_produto === codigoProduto);

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    const novoItem = {
      id: crypto.randomUUID(),
      codigo_produto: produto.codigo_produto,
      nome_produto: produto.nome_produto,
      preco_produto: produto.preco_produto,
      quantidade,
    };
    carrinho.push(novoItem);
  }

  await salvarCarrinho();
  atualizarTabela();
}

// Remover item do carrinho
async function removerItem(codigoProduto) {
  const index = carrinho.findIndex(item => item.codigo_produto === codigoProduto);

  if (index > -1) {
    carrinho.splice(index, 1);
    await salvarCarrinho();
    atualizarTabela();
  }
}

// Salvar carrinho no JSON Server
async function salvarCarrinho() {
  const carrinhoAtualizado = {
    itens: carrinho,
    total,
    endereco: {}, // Mantém vazio até a finalização
    pagamento: {}, // Mantém vazio até a finalização
  };

  try {
    await fetch(`${BASE_URL}/carrinho`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carrinhoAtualizado),
    });
  } catch (error) {
    console.error('Erro ao salvar o carrinho:', error);
  }
}

// Finalizar compra
async function finalizarCompra() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const endereco = obterEndereco();
  const pagamento = obterPagamento();

  if (!endereco || !pagamento) {
    return;
  }

  const carrinhoFinalizado = {
    itens: carrinho,
    total,
    endereco,
    pagamento,
  };

  try {
    const response = await fetch(`${BASE_URL}/carrinho`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carrinhoFinalizado),
    });

    if (!response.ok) throw new Error('Erro ao finalizar a compra.');

    alert('Compra finalizada com sucesso!');
    carrinho = [];
    atualizarTabela();
  } catch (error) {
    console.error('Erro ao finalizar a compra:', error);
    alert('Erro ao finalizar a compra. Tente novamente.');
  }
}

// Obter informações do formulário de endereço
function obterEndereco() {
  const nome = document.getElementById('name');
  const endereco = document.getElementById('endereco');
  const cep = document.getElementById('cep');
  const bairro = document.getElementById('bairro');
  const numero = document.getElementById('numero');

  if (!nome.value || !endereco.value || !cep.value || !bairro.value || !numero.value) {
    alert('Por favor, preencha todos os campos do endereço.');
    return null;
  }

  return {
    nome: nome.value,
    endereco: endereco.value,
    cep: cep.value,
    bairro: bairro.value,
    numero: numero.value,
  };
}

// Obter informações do formulário de pagamento
function obterPagamento() {
  const formaPagamento = document.querySelector('input[name="pagamento"]:checked');
  if (!formaPagamento) {
    alert('Selecione uma forma de pagamento.');
    return null;
  }
  return { forma_pagamento: formaPagamento.value };
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  carregarCarrinho();
  finalizarBtn.addEventListener('click', finalizarCompra);
});
