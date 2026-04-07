// Importa a classe Pool da biblioteca pg.
// Ela é usada para criar e gerenciar conexões com o PostgreSQL.
import { Pool } from "pg";

// Importa automaticamente as variáveis do arquivo .env.
// Assim, conseguimos usar process.env.DB_USER, process.env.DB_HOST etc.
import "dotenv/config";

// Cria e exporta o pool de conexões com o banco.
// O pool reutiliza conexões e melhora o desempenho da aplicação.
export const pool = new Pool({

  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});