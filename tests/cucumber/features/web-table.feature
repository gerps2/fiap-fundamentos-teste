# language: pt
Funcionalidade: Web Tables no DemoQA
  Como usuário do DemoQA
  Quero adicionar registros na tabela web
  Para verificar que os dados são persistidos corretamente

  Cenário: Adicionar um novo registro na tabela
    Dado que estou na página de web tables do DemoQA
    Quando clico no botão de adicionar registro
    E preencho o formulário de registro com os seguintes dados:
      | Campo         | Valor              |
      | Primeiro Nome | Carlos             |
      | Sobrenome     | Oliveira           |
      | Email         | carlos@exemplo.com |
      | Idade         | 30                 |
      | Salário       | 5000               |
      | Departamento  | Engenharia         |
    E submeto o formulário de registro
    Então devo ver "Carlos" na tabela
    E devo ver "Oliveira" na tabela
    E devo ver "carlos@exemplo.com" na tabela
