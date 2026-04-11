# ProjetoBD - API de Loja de Jogos (estilo Steam)

## Descrição
Este projeto é uma API REST desenvolvida em **Node.js** com **Express** e **PostgreSQL**, simulando uma loja digital de jogos no estilo Steam.

O sistema permite:
- listar usuários
- listar produtos
- listar compras
- realizar compras
- controlar saldo do usuário
- controlar estoque dos produtos
- registrar histórico de compras
- garantir integridade dos dados com **transações**
- evitar problemas de concorrência com **bloqueio de registros (`FOR UPDATE`)**

---

## Objetivo da atividade
O objetivo do projeto é demonstrar a integração entre **código** e **banco de dados relacional**, implementando:

- persistência de dados
- regras de negócio
- transações (`BEGIN`, `COMMIT`, `ROLLBACK`)
- controle de concorrência (`FOR UPDATE`)
- consistência e integridade dos dados

---

## Tecnologias utilizadas
- **Node.js**
- **Express**
- **PostgreSQL**
- **pgAdmin 4**
- **pg** (node-postgres)
- **dotenv**
- **cors**
- **nodemon**
- **Thunder Client** (para testes)

---

## Estrutura do projeto

```text
ProjetoBD/
├── src/
│   ├── db.js
│   └── server.js
├── database.sql
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md