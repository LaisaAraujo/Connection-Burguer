 //Função recebe 2 parametros, recebe uma lista de produtos e o local onde o html sera rendizado
 export function carregarProdutos(listaProdutos,localHTML) {
    listaProdutos.forEach(produto => {
     
          let html =`  
        <div class="box" id="${produto. codigo_produto}">
            <img src="${produto.imagem_produto}" alt="" id="${produto.codigo_produto}">
            <div class="texto-lanche">
                <h3>${produto.nome_produto}</h3>
                <h3> R$ ${produto.preco_produto}</h3>
            </div>
            <a href="./produto1.html"><button id="${produto. codigo_produto}">Ver mais</button></a>
        `
                     localHTML.innerHTML += html
           
    });


 
 }
 //Funcao para clicar na pagina , para encontrar o prduto unico 
    export function handleClick(){
     let produtos = document.querySelectorAll("div.box")
     console.log(produtos)
 
     produtos.forEach(produto => produto.addEventListener ('click',(evento) => {
     
       let idProduto = evento.target.id
       localStorage.setItem('prodID',idProduto)
       console.log(idProduto)
       
     }))
 
    }
    export function findProduct(produtos, prodID){
     let produto = produtos.find(prod => prod.codigoProduto == prodID )
     return produto 
 }
 
 
  export function addItemCarrinho(item, carrinhoCompras){
   let botaoComprar = document.querySelector('button')
      botaoComprar.addEventListener('click', () =>{
       let quantidade = parseInt(document.querySelector("#qtd").value)
       let newitem = {...item,quantidade}
       carrinhoCompras.push(newitem)
             alert("item adicionado ao carrinho")
              localStorage.setItem('carrinho',JSON.stringify(carrinhoCompras))
    
     })
  }
 
  //função para calcular o preço total
 export function calcTotal(carrinhoCompras){
   let total = 0;
 
   const totalCarrinho = document.querySelector('.totalCarrinho')
 
   totalCarrinho.innerHTML = '';
 
   console.log(totalCarrinho)
 
   carrinhoCompras.forEach(item =>{
       total += (item.preco_produto * item.quantidade);
   })
 
   let totCarrinho = `<p>Total: R$ ${total.toFixed(2)}</p>`;
 
   totalCarrinho.innerHTML += totCarrinho;
 } 