import request from "supertest";
import { app } from "../src/desafios/desafio-06.js";

describe("Desafio 06 - Contador de Visitas", () => {
  const getVisitas = async () => {
    const { body } = await request(app)
      .get("/visitas")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .timeout(500);
    return body;
  };

  test("deve ter um contagem válida", async () => {
    const body = await getVisitas();

    expect(body).toEqual({ visitas: expect.any(Number) });
    expect(body.visitas).toBeGreaterThanOrEqual(0);
  });

  test.each([1, 10, 20, 55].map((incrementos) => ({ incrementos })))(
    "deve adicionar $incrementos ao contador após $incrementos incrementos",
    async ({ incrementos }) => {
      const { visitas: valorInicial } = await getVisitas();

      expect(valorInicial).toBeGreaterThanOrEqual(0);
      for (let passo = 0; passo < incrementos; passo++) {
        await request(app).post("/visitas").expect(204).timeout(500);
      }
      const { visitas: valorFinal } = await getVisitas();

      expect(valorFinal).toEqual(valorInicial + incrementos);
    }
  );
});
