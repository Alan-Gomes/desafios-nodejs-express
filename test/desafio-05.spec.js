import request from "supertest";
import { app } from "../src/desafios/desafio-05.js";
import { produtos } from "../src/produtos.js";

const produtosOriginais = structuredClone(produtos);

describe("Desafio 05 - Adicionar Novo Produto", () => {
  const novoProduto = {
    id: 21,
    nome: "Carro",
    descricao: "Veículo automotivo",
    valorUnitario: 100_000_000.0,
    categoria: "Veículos",
  };

  beforeEach(() => {
    produtos.length = 0;
    produtos.push(...produtosOriginais);
  });

  test("deve inserir produto válido", async () => {
    const { body } = await request(app)
      .post("/produtos")
      .send(novoProduto)
      .expect(201)
      .timeout(500);

    expect(body).toEqual({});
    expect(produtos).toContainEqual(novoProduto);
    expect(produtos).toHaveLength(produtosOriginais.length + 1);
  });

  test.each(Object.keys(novoProduto))(
    "deve falhar quando o campo '%s' for omitido",
    async (campo) => {
      const { body } = await request(app)
        .post("/produtos")
        .send({
          ...novoProduto,
          [campo]: undefined,
        })
        .expect(400)
        .timeout(500);

      expect(body).toEqual({ message: "Todos os campos são obrigatórios" });
      expect(produtos).toHaveLength(produtosOriginais.length);
    }
  );

  test.each(produtosOriginais.map(({ id }) => id))(
    "deve falhar quando tentar criar um produto com id %i",
    async (id) => {
      const { body } = await request(app)
        .post("/produtos")
        .send({
          ...novoProduto,
          id,
        })
        .expect(400)
        .timeout(500);

      expect(body).toEqual({
        message: "Já existe um produto com o id informado",
      });
      expect(produtos).toHaveLength(produtosOriginais.length);
    }
  );
});
