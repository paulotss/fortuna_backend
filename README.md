# Fortuna Back-end

Esse é o repositório do código back-end do sistema Fortuna. Trata-se de um sistema completo para vendas de produtos com geração de relatórios, controle de estoque, área dedicada ao cliente para consulta de saldo e extrato, possibilidade de leitura de código de barras, etc. 

> [Repositório do código front-end](https://github.com/paulotss/fortuna_frontend)

### Tecnologias utilizadas

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

### Execução

Faça o clone do repositório:

```
git clone git@github.com:paulotss/fortuna_backend.git
```

Crie um arquivo .env e insira as variáveis de ambiente conforme o exemplo:

```
DATABASE_URL="mysql://<user>:<password>@fortuna_db:3306/fortuna"
PORT=3001
JWT_TOKEN='shhhhh'
```

Preferencialmente utilize o docker junto com docker-compose para rodar a aplicação:

```
docker-compose up -d
```

Com isso, você já vai rodando o banco de dados. Agora basta entra no container do back-end e rodar o servidor express:

```
docker exec -it fortuna_back bash
npm run dev
```

Para acessar as rotas utilize 
```
http://localhost:<PORT>
```