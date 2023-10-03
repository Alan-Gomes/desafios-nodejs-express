import request from "supertest";
import { app } from "../src/desafios/desafio-03.js";
import { produtos } from "../src/produtos.js";

const produtosOriginais = structuredClone(produtos);
const categorias = [
  ...new Set(produtosOriginais.map(({ categoria }) => categoria)),
];

describe("Desafio 03 - Filtragem por Categoria", () => {
  test.each(categorias)(
    "deve retornar a resposta correta para a categoria %s",
    async (cat) => {
      const produtos = produtosOriginais.filter(
        ({ categoria }) => categoria === cat
      );
      const { body } = await request(app)
        .get(`/produtos?categoria=${cat}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body.sort()).toEqual(produtos.sort());
    }
  );

  test("deve retornar a resposta correta para uma categoria inexistente", async () => {
    const { body } = await request(app)
      .get(`/produtos?categoria=xxxxxx`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
    expect(body).toEqual({ message: "Categoria não existe" });
  });
});
