# language: pt
Funcionalidade: Elementos interativos no DemoQA
  Como usuário do DemoQA
  Quero interagir com diferentes tipos de botões
  Para verificar que cada tipo de clique funciona corretamente

  Cenário: Realizar duplo clique em botão
    Dado que estou na página de botões do DemoQA
    Quando realizo um duplo clique no botão de duplo clique
    Então devo ver a mensagem "You have done a double click"

  Cenário: Realizar clique direito em botão
    Dado que estou na página de botões do DemoQA
    Quando realizo um clique direito no botão de clique direito
    Então devo ver a mensagem "You have done a right click"

  Cenário: Realizar clique simples em botão
    Dado que estou na página de botões do DemoQA
    Quando clico no botão de clique dinâmico
    Então devo ver a mensagem "You have done a dynamic click"
