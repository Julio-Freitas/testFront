**Sitesma de cadastro utilizando firebase  e react.js**
o webApp foi desenvolvido utilizando os recursos do real Database e authentication, do firebase.
Onde é possível cadastrar um usário e o mesmo popular uma tabela de registro ponto de trabalho.

o webApp possui:
	*Tela de Login
	*Tela de cadastro
	*painel de registro de ponto



---

## Divisão do projeto.
Dividiu-se o projeto em 3 etapas
1º_  Estrutura da tabala e como ela comunica com o usuário logado
2º_ Desenvolvimendo de telas lOGIN/CADASTRO/painel
3º_ Estilização, autentificação e validações;

## Tela Login 
	O sistema possui uma tela de login para acessar o painel admin, onde é necéssário fazer um cadastro para  proseguir.
	Quando o usuário é logado, é regrado um Token no localStorage do navegor, onde o mesmo serve para autenticar o usuário logado enquanto o mesmo está regitrando seu ponto.
	Após deslogar, o Token é removido, e encerra-se a comunicação do usuário com o firebase e consquentimente com a tabela de registro em questão.
	
## Tela Cadastro
	Input de email e senha, depois o usuário é redirecionado par a tela de login.
	Após o cadastro, em tempo real, é criada uma tabela utilizando um identificador do usuário

## Painel admin
	Desenvolveu-se um pequeno painel parao usuário inserir os dados de registro como:
		Entrada, Saída para o almoço, Retorno do Almoço e Sáida do trabalho.
	Só é possível fazer um cadastro por dia, para evitar registros com datas duplicadas.
	
## Comunicação 
	A comunicação é feita com a dataBase em tempo real do firebase
