# language: pt
Funcionalidade: Interação com Checkboxes no The Internet
  Como usuário do site de testes
  Quero marcar e desmarcar checkboxes
  Para verificar que os elementos interativos funcionam

  Cenário: Marcar checkbox desmarcada
    Dado que estou na página de checkboxes do The Internet
    Quando marco a primeira checkbox
    Então a primeira checkbox deve estar marcada

  Cenário: Desmarcar checkbox marcada
    Dado que estou na página de checkboxes do The Internet
    Quando desmarco a segunda checkbox
    Então a segunda checkbox deve estar desmarcada
