DROP TABLE IF EXISTS compras;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  saldo NUMERIC(10,2) NOT NULL
);

CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  preco NUMERIC(10,2) NOT NULL,
  estoque INT NOT NULL
);

CREATE TABLE compras (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuarios(id),
  produto_id INT NOT NULL REFERENCES produtos(id),
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nome, saldo) VALUES
('Arthur', 250.00),
('Zaion', 180.00),
('Matheus', 320.00),
('Hiury', 90.00),
('Samuel', 500.00),
('Yan', 140.00);

INSERT INTO produtos (nome, preco, estoque) VALUES
('The last of us', 60.00, 1),
('CS2', 80.00, 5),
('FIFA 24', 120.00, 3),
('Red Dead Redemption 2', 150.00, 2),
('The Witcher 3', 70.00, 4),
('Cyberpunk 2077', 130.00, 2),
('Minecraft', 99.00, 6),
('Hollow Knight', 46.00, 8),
('Cuphead', 55.00, 3),
('Elden Ring', 200.00, 2);
