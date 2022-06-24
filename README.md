#### Descrição do projeto

Desenvolvi esse projeto quando fui contratado para resolver um problema de pagamento e de envio de email. Esse projeto é apenas o back end, tendo em vista, que para utilizar ele é bem importante ler essa documentação.

---- Configurações inicias

Primeiro passo, após ter clonado, é importante instalar as dependências para o projeto rodar. Nesse caso só utilizar em seu terminal o npm i ou npm install. Após só rodar npm run dev e acessar em seu navegador http://localhost:5555

---- Configurações de autenticações

Após ter instalado as dependências, vc vai precisar fazer algumas configurações, essas seriam mais para poder se autênticar com os provedores (nodemailer: envio de email, pagseguro: gateway de pagamento)

---- Nodemailer

Seria importante ler a documentação do próprio nodemailer para ter uma melhor usabilidade, mas nesse caso, o que vc precisa, é ir no nodemailer.createTransport passar o host e a port que a plataforma que você utiliza para administração do seus email fornece e depois seu email e senha normal, se tudo ocorrer direito, a autenticação irá funcionar.

É bem importante você também deixar o seu email e senha dentro do .env e criar variáveis ambiente para ambos, assim você ira proteger os seus dados.

---- pagseguro

A api que eu utilizei nesse servidor, é a checkout transparente.

Para a autenticação, basta você criar um arquivo na raiz do projeto chamado .env, nele colar as variáveis que estão dentro do arquivo .env.example e lá colocar seu token e o email da conta do pagseguro.

--- Router

No arquivo router.ts ficará todas as rotas do servidor e para cada rota terá um arquivo que está localizado na pasta controller.

--- Controller

É bem importante, antes de você integrar esse back end com sua aplicação, ler os dados que o servidor está recebendo, nesse caso, vá até a pasta controller e ler como os dados estão sendo recebidos, como eles estão sendo tratados e o feedback para o usuário, dito isso, você poderá administrar e atualizar para que melhor se encaixe em sua aplicação.

--- User-cases

Nessa pasta contém os arquivos que recebem os dados vindo do controller, cada arquivo contém o feedback que o usuário receberá caso deixe de enviar algum dado ou envia-los de forma incorreta. Para esse autenticação dos dados estou utilizando a biblioteca yup e nela você poderá enviar o feedback que mais faça sentido para você.

--- testes

Resolvi somente realizar os teste do submit para o provedor pagseguro, todos os testes realizados estão passando, se por necessidade você precisar adicionar algo nessa transação, certifique de testar para não quebrar sua aplicação.

--- utils

Por ultimo, vem a pasta utils, ela ficará responsável por traduzir os dados para json, pois essa api do pagseguro toda vez que o usuário faz o pagamento ela retorna alguns dados no formato XML, o arquivo responsável por essa tradução esta dentro da pasta utils. Se por necessidade você precisar de mais dados, basta atribuir o novo valor na interface ResponsePagSeguroProvider e retornar na função.