import request from "supertest";
import { app } from "../src/desafios/desafio-04.js";

describe("Desafio 04 - Busca por Nome", () => {
  const pesquisas = {
    barbeador: [
      {
        id: 13,
        nome: "Barbeador Elétrico",
        descricao: "Barbeador recarregável com múltiplas lâminas",
        valorUnitario: 39.99,
        categoria: "Cuidados Pessoais",
      },
    ],
    AR: [
      {
        id: 3,
        nome: "Celular",
        descricao: "Smartphone de última geração",
        valorUnitario: 799.99,
        categoria: "Eletrônicos",
      },
      {
        id: 13,
        nome: "Barbeador Elétrico",
        descricao: "Barbeador recarregável com múltiplas lâminas",
        valorUnitario: 39.99,
        categoria: "Cuidados Pessoais",
      },
      {
        id: 17,
        nome: "Guarda-Chuva",
        descricao: "Guarda-chuva compacto resistente ao vento",
        valorUnitario: 14.99,
        categoria: "Acessórios",
      },
    ],
    qualquercoisa: [],
  };

  test.each(Object.entries(pesquisas))(
    "para o termo '%s' deve retornar %o",
    async (nome, resultado) => {
      const { body } = await request(app)
        .get(`/produtos?nome=${nome}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body.sort()).toEqual(resultado.sort());
    }
  );
});
