import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// Lista todos os usuários cadastrados
app.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
});

// Lista todos os produtos cadastrados
app.get("/produtos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM produtos ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

// Lista o histórico de compras
app.get("/compras", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        compras.id,
        usuarios.nome AS usuario,
        produtos.nome AS produto,
        compras.data
      FROM compras
      JOIN usuarios ON compras.usuario_id = usuarios.id
      JOIN produtos ON compras.produto_id = produtos.id
      ORDER BY compras.id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar compras" });
  }
});

// Realiza a compra de um produto por um usuário
app.post("/comprar", async (req, res) => {
  const { usuario_id, produto_id } = req.body;
  const client = await pool.connect();

  try {
    // Inicia a transação
    await client.query("BEGIN");

    // Busca e bloqueia o usuário durante a transação
    const usuarioResult = await client.query(
      "SELECT * FROM usuarios WHERE id = $1 FOR UPDATE",
      [usuario_id]
    );

    if (usuarioResult.rows.length === 0) {
      throw new Error("Usuário não encontrado");
    }

    const usuario = usuarioResult.rows[0];

    // Busca e bloqueia o produto durante a transação
    const produtoResult = await client.query(
      "SELECT * FROM produtos WHERE id = $1 FOR UPDATE",
      [produto_id]
    );

    if (produtoResult.rows.length === 0) {
      throw new Error("Produto não encontrado");
    }

    const produto = produtoResult.rows[0];

    // Validações de regra de negócio
    if (produto.estoque <= 0) {
      throw new Error("Produto sem estoque");
    }

    if (Number(usuario.saldo) < Number(produto.preco)) {
      throw new Error("Saldo insuficiente");
    }

    // Atualiza saldo do usuário
    await client.query(
      "UPDATE usuarios SET saldo = saldo - $1 WHERE id = $2",
      [produto.preco, usuario_id]
    );

    // Atualiza estoque do produto
    await client.query(
      "UPDATE produtos SET estoque = estoque - 1 WHERE id = $1",
      [produto_id]
    );

    // Registra a compra
    await client.query(
      "INSERT INTO compras (usuario_id, produto_id) VALUES ($1, $2)",
      [usuario_id, produto_id]
    );

    // Confirma a transação
    await client.query("COMMIT");

    res.json({ mensagem: "Compra realizada com sucesso!" });
  } catch (error) {
    // Desfaz a transação em caso de erro
    await client.query("ROLLBACK");

    console.error(error.message);
    res.status(400).json({ erro: error.message });
  } finally {
    // Libera a conexão para o pool
    client.release();
  }
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});