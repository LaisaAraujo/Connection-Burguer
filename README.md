# Connection Burguer.

## Sobre nós.
O connection burguer é um site para hambúrgueres artesanal com ingredientes selecionados voltado para estudantes de TI onde o nome dos lanches são inspirados em linguagem de programação, unindo a tecnologia com sabor único. <br>

## Fluxo das páginas e funcionalidades.
### Cardápio
- Adicionar ao carrinho <br>
  - Essa funcionalidade será um botão que irá ficar localizado ao lado de cada item, ao clicar nele o item será adicionado na tela de “Pedido”.

### Pedido
- Aumentar e diminuir quantidade do item
  - Essa funcionalidade terá dois botões. 
    - O botão de aumentar a quantidade do item, será identificado pelo símbolo de adição “+”, ficará localizado ao lado do item na tela de pedido.
      - Ao clicar no botão irá aumentar a quantidade do item e o contador irá acompanhar a contagem.
    - O botão de diminuir a quantidade do item, será identificado pelo símbolo de subtração “-”, ficará localizado ao lado do item na tela de pedido.
      - Ao clicar no botão irá diminuir a quantidade do item e o contador irá acompanhar a contagem.
        - Caso tenha apenas uma quantidade do item e clique em diminuir, o item será excluído do carrinho.
- Total do valor do pedido
  - Essa funcionalidade estará localizada abaixo do resumo de todos os itens escolhidos pelo usuário e irá acompanhar a soma de todos os itens que estiverem no carrinho.
- Entrega em casa
  - Essa funcionalidade estará localizada abaixo do “total do valor do pedido”. O usuário terá a opção de selecionar.
- Retirada no balcão
  - Essa funcionalidade estará localizada abaixo do “Entregar em casa”. O usuário terá a opção de selecionar.
- Avançar
  - Essa funcionalidade será um botão localizado no final da tela e ao clicar irá avançar para próxima.
    - Terá uma validação, caso o usuário clique em “Avançar” e não tenha selecionado alguma das opções “Retirada no balcão” ou “Entrega em casa” não deixará ele prosseguir para próxima etapa.

### Entrega em casa
- Essa tela só será exibida caso o usuário selecione “Retirada no balcão” no step anterior.
  - Formulário de dados do usuário
    - O formulário irá solicitar três informações
      - nome do usuário
      - telefone de contato
      - e-mail.
  - Formulário de dados do endereço
    - O formulário irá solicitar nove informações:
      - nome do usuário
      - telefone de contato
      - e-mai
      - endereço
      - CEP
      - Nome da rua
      - Complemento
      - Bairro.
  - Voltar
    - Ao clicar irá voltar para tela do resumo do pedido.
  - Avançar
    - Ao clicar irá avançar para tela de “Forma de pagamento”.
      - Terá validação dos campos, exceto os campos “completo” e “e-mail” não será obrigatório.

### Retirada no balcão
- Essa tela só será exibida caso o usuário selecione “Entrega em casa” no step anterior.
  - Formulário de dados do usuário
    - O formulário irá solicitar três informações
      - nome do usuário
      - telefone de contato
      - e-mail.
   - Voltar
     - Ao clicar irá voltar para tela do resumo do pedido.
   - Avançar
     - Ao clicar irá avançar para tela de “Forma de pagamento”.
       - Terá validação dos campos, exceto o campo “e-mail” não será obrigatório.


  
## Stack utilizada.
**Front-end:** HTML/CSS. <br>
**Back-end:** PHP.

## Design.
- Em breve...
