
# Desafio Back-end - Node JS



# Sobre o Desenvolvimento:

Durante o processo de desenvolvimento do projeto utilizei as seguintes tecnologias para desenvolver a api:

- Express
- TypeScript
- TypeOrm
- Jest
- Postgres
- Redis
- Docker

Como ferramenta de padronização de codigo utilizei ESLint com padrão AirBnB + Prettier.
Utilizei o GitHub Actions Para criar a pipline de integração continua.


---


##  Como executar o projeto:

#### Docker + docker-compose:

```bash
#Na raiz do projeto executar para startar:
	 docker-compose up -d
	
#Para encerrar os serviços levantados pelo docker:
	docker-compose down
```

#####Vai iniciar o Banco de dados, Redis e a api.
---
#### Via CLI:
```bash
#Para rodar o banco de dados e o Redis vamos precisar executar o docker novamente para subirmos novamente uma instacia do BD e do Cache. Porem, é possivel  também preencher o arquivo .env com os dados de um banco Postgres e do Redis e não utilizar o Docker.

#Vamos instanciar apenas o Redis e o Postgres:
	 docker-compose up -d redis db

#Após os serviços subirem, vamos startar o projeto:
	yarn

#Precisamos rodar as migrations do typeorm para criarmos as tabelas no banco
	yarn run:migrations
	
#Agora podemos rodar o projeto como dev ou fazer o build dele. Para rodar como dev:
	yarn dev:server
	
#ou fazer o Build:
	yarn build
	
#e dar Start no projeto com pm2
	yarn start

	
```

#### Execução dos testes:
```
	yarn test
```

## Endpoints:

#####Todas Os endpoints estão protegidos com autenticação, com execeção a do registro de novo usuario e de login.

### POST `/users`
Esta rota faz o cadastro de um novo usuario:
```json
{
	"name": "teste",
	"email": "user@usuario.com",
	"password": "123456"
}
```
| Campo        | Tipo       |
|--------------|------------|
| name   | String     |
| email  | String     |
| password | String        |


### POST `/Auth`
Esta rota faz autenticação do usuario retornado um JWT para autenticação nas demais rotas da API
```json
{
	"email": "user@usuario.com",
	"password": "123456"
}
```
| Campo        | Tipo       |
|--------------|------------|
| email   | String     |
| password  | String     |


###Todas os demais endpoints funcionam como solicitado no desafio:

### POST `/starstore/product`
Este Metodo recebe um produto para ser cadastrado na api:
```json
{
   "title":"Blusa do Imperio",
   "price":7990,
   "zipcode":"78993-000",
   "seller":"João da Silva",
   "thumbnailHd":"https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg",
   "date":"26/11/2015"
}
```
| Campo       | Tipo   |
|-------------|--------|
| title       | String |
| price       | int    |
| zipcode     | String |
| seller      | String |
| thumbnailHd | String |
| date        | String |


### GET `/starstore/products`
Este Metodo retorna todos os produtos cadastrados na api
```json
[
  {
    "title": "Blusa do Imperio",
    "price": 7990,
    "zipcode": "78993-000",
    "seller": "João da Silva",
    "thumbnailHd": "https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg",
    "date": "26/11/2015"
  },
  {
    "title": "Blusa Han Shot First",
    "price": 7990,
    "zipcode": "13500-110",
    "seller": "Joana",
    "thumbnailHd": "https://cdn.awsli.com.br/1000x1000/21/21351/produto/7234148/55692a941d.jpg",
    "date": "26/11/2015"
  },
  {
    "title": "Sabre de luz",
    "price": 150000,
    "zipcode": "13537-000",
    "seller": "Mario Mota",
    "thumbnailHd": "http://www.obrigadopelospeixes.com/wp-content/uploads/2015/12/kalippe_lightsaber_by_jnetrocks-d4dyzpo1-1024x600.jpg",
    "date": "20/11/2015"
  }
]
```

### POST `/starstore/buy`
Esse método recebe os dados da compra do usuario:
```json
{
   "client_id":"7e655c6e-e8e5-4349-8348-e51e0ff3072e",
   "client_name":"Luke Skywalker",
   "total_to_pay":1236,
   "credit_card":{
      "card_number":"1234123412341234",
      "value":7990,
      "cvv":789,
      "card_holder_name":"Luke Skywalker",
      "exp_date":"12/24"
   }
}
```

+ Transaction

| Campo        | Tipo       |
|--------------|------------|
| client_id    | String     |
| client_name  | String     |
| total_to_pay | int        |
| credit_card  | CreditCard |

+ CreditCard

| Campo            | Tipo   |
|------------------|--------|
| card_number      | String |
| card_holder_name | String |
| value            | int    |
| cvv              | int    |
| exp_date         | String |


### GET `/starstore/history`
Esse método retorna o historico de compras na api
```json
[
   {
      "client_id":"7e655c6e-e8e5-4349-8348-e51e0ff3072e",
      "purchase_id":"569c30dc-6bdb-407a-b18b-3794f9b206a8",
      "value":1234,
      "date":"19/08/2016",
      "card_number":"**** **** **** 1234"
   },
   {
      "client_id":"7e655c6e-e8e5-4349-8348-e51e0ff3072e",
      "purchase_id":"569c30dc-6bdb-407a-b18b-3794f9b206a8",
      "value":1234,
      "date":"19/08/2016",
      "card_number":"**** **** **** 1234"
   },
   {
      "client_id":"7e655c6e-e8e5-4349-8348-e51e0ff3072e",
      "purchase_id":"569c30dc-6bdb-407a-b18b-3794f9b206a8",
      "value":1234,
      "date":"19/08/2016",
      "card_number":"**** **** **** 1234"
   }
]
```

### GET `/starstore/history/{clientId}`
Esse método retorna todas as compras de um cliente especifico:
```json
[
   {
      "client_id":"7e655c6e-e8e5-4349-8348-e51e0ff3072e",
      "purchase_id":"569c30dc-6bdb-407a-b18b-3794f9b206a8",
      "value":1234,
      "date":"19/08/2016",
      "card_number":"**** **** **** 1234"
   },
   {
      "client_id":"7e655c6e-e8e5-4349-8348-e51e0ff3072e",
      "purchase_id":"569c30dc-6bdb-407a-b18b-3794f9b206a8",
      "value":1234,
      "date":"19/08/2016",
      "card_number":"**** **** **** 1234"
   }
]
```
