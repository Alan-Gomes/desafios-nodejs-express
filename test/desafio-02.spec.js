import request from "supertest";
import { app } from "../src/desafios/desafio-02.js";
import { produtos } from "../src/produtos.js";

const produtosOriginais = structuredClone(produtos);

describe("Desafio 02 - Detalhes do Produto", () => {
  test.each(produtosOriginais)(
    "deve retornar a resposta correta para o produto com id $id",
    async (produto) => {
      const { body } = await request(app)
        .get(`/produtos/${produto.id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(body).toEqual(produto);
    }
  );

  test("deve retornar a resposta correta para um produto inexistente", async () => {
    const { body } = await request(app)
      .get(`/produtos/9999999`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);
    expect(body).toEqual({ message: "Produto não encontrado" });
  });
});
