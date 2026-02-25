# language: pt
Funcionalidade: Login no The Internet
  Como usuário do site de testes
  Quero fazer login com credenciais válidas
  Para verificar que o sistema de autenticação funciona

  Cenário: Login com credenciais válidas
    Dado que estou na página de login do The Internet
    Quando preencho o usuário com "tomsmith"
    E preencho a senha com "SuperSecretPassword!"
    E clico no botão de login
    Então devo ver a mensagem de boas-vindas "You logged into a secure area!"

  Cenário: Login com credenciais inválidas
    Dado que estou na página de login do The Internet
    Quando preencho o usuário com "usuario_errado"
    E preencho a senha com "senha_errada"
    E clico no botão de login
    Então devo ver uma mensagem de erro de login
