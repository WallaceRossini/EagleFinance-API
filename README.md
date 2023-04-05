# API

API para gerenciamento de usuários e transações financeiras.

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma
- JWT
- bcrypt
- zod

## Instalação

1. Clone o repositório:

2. Instale as dependências: `npm install`

3. Crie o arquivo `.env` a partir do `.env.example` e preencha com as suas informações.

4. Rode as migrações do banco de dados:`npx prisma migrate dev`
  
## Endpoints

### User

- `GET /users`: lista todos os usuários.
- `GET /users/:id`: retorna os dados do usuário com o ID informado.
- `POST /users`: cria um novo usuário.
- `PUT /users/:id`: atualiza os dados do usuário com o ID informado.
- `DELETE /users/:id`: deleta o usuário com o ID informado.

### Transaction

- `GET /transactions`: lista todas as transações.
- `GET /transactions/:id`: retorna os dados da transação com o ID informado.
- `POST /transactions`: cria uma nova transação.
- `PUT /transactions/:id`: atualiza os dados da transação com o ID informado.
- `DELETE /transactions/:id`: deleta a transação com o ID informado.

### Auth

- `POST /sign`: autentica um usuário e retorna um token JWT.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
