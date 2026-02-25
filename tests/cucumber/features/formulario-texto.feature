# language: pt
Funcionalidade: Formulário de texto no DemoQA
  Como usuário do DemoQA
  Quero preencher e submeter o formulário de texto
  Para verificar que os dados são exibidos corretamente

  Cenário: Preencher e submeter o formulário de texto
    Dado que estou na página de formulário de texto do DemoQA
    Quando preencho o campo "Nome Completo" com "João Silva"
    E preencho o campo "Email" com "joao.silva@exemplo.com"
    E preencho o campo "Endereço Atual" com "Rua das Flores, 123"
    E clico no botão de submissão do formulário
    Então devo ver o nome "João Silva" na saída
    E devo ver o email "joao.silva@exemplo.com" na saída
