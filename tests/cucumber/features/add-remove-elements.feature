# language: pt
Funcionalidade: Adicionar e Remover Elementos no The Internet
  Como usuário do site de testes
  Quero adicionar e remover elementos da página
  Para verificar que a manipulação do DOM funciona

  Cenário: Adicionar um elemento
    Dado que estou na página de adicionar e remover elementos do The Internet
    Quando clico no botão "Add Element"
    Então devo ver o botão "Delete" na página

  Cenário: Adicionar e remover um elemento
    Dado que estou na página de adicionar e remover elementos do The Internet
    Quando clico no botão "Add Element"
    E clico no botão "Delete"
    Então não devo ver nenhum botão "Delete" na página
