import request from "supertest";
import { app } from "../src/desafios/desafio-01.js";
import { produtos } from "../src/produtos.js";

const produtosOriginais = structuredClone(produtos);

describe("Desafio 01 - Listagem de produtos", () => {
  test("deve retornar todos os produtos", async () => {
    const { body } = await request(app)
      .get("/produtos?query=teste")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(body.sort()).toEqual(produtosOriginais.sort());
  });
});
