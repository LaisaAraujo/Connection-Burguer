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

### Forma de pagamento
- Opções de pagamento
  - Irá exibir cinco opções de pagamento para o usuário selecionar.
    - Dinheiro
    - Cartão de crédito
    - Cartão de débito
    - Vale refeição
    - Vale alimentação
- Voltar
  - Ao clicar irá voltar para tela do resumo do pedido.
- Avançar
  - Ao clicar irá avançar para tela de “Forma de pagamento”.
    - Terá validação dos campos. Irá ser validado se o usuário selecionou alguma das opções, caso não tenha selecionado não irá prosseguir para próxima etapa.

### Confirmação de entrega
- Entrega
  - Irá exibir as informações conforme escolhido pelo usuário na tela do “Resumo do pedido”.
    - Caso o usuário tenha selecionado “Retirada no balcão” irá aparecer as informações: nome do usuário, e-mail e telefone.
    - Caso o usuário tenha selecionado “Entregar em casa” irá aparecer o endereço completo e as informações do usuário.
  - Trocar
    - Ao clicar no botão que estará localizado ao lado das informações de entrega vai aparecer duas opções: “Retirada no balcão” ou “Entregar em casa”.
      - Ao clicar na opção “Entregar em casa” irá direcionar para formulário da tela “Entrega em casa”
      - Ao clicar na opção “Retirada no balcão” irá direcionar para o formulário da tela “Retirada no balcão”.
- Forma de pagamento
  - Irá exibir a opções selecionada pelo o usuário na tela “Forma de pagamento”
  - Trocar
    - Ao clicar no botão que estará localizado ao lado das informações de forma de pagamento, irá direcionar o usuário para tela de forma de pagamento.
- Observação do pedido
  - O campo será um texto que o usuário poderá preencher conforme sua necessidade, seja informando algo sobre o pagamento ou o pedido.
- Total do valor do pedido
  - A soma de todos os itens do pedido, estará localizado no final da tela.
- Finalizar pedido
  - Essa funcionalidade será um botão que estará localizado no final da tela e ao clicar irá direcionar para a ”tela de sucesso”.

### Tela de sucesso
- Essa tela irá exibir uma mensagem para o usuário dizendo que recebemos o seu pedido.

  
## Stack utilizada.
**Front-end:** HTML/CSS. <br>
**Back-end:** PHP.

## Design.
- Em breve...
