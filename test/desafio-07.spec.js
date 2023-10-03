import { Client } from "pg";
import { newDb } from "pg-mem";
import request from "supertest";
import { createApp } from "../src/desafios/desafio-07.js";

jest.mock("pg", () => ({
  Client: jest.fn(),
}));

const usuarios = [
  { id: 1, nome: "Alan Gomes", email: "contato@alangomes.dev" },
  { id: 2, nome: "João Carvalho", email: "joaoc@example.com" },
  { id: 3, nome: "Administrador", email: "admin@example.com" },
];

describe("Desafio 07 - Buscar usuário por id (BD)", () => {
  let db;
  let app;

  beforeEach(async () => {
    db = newDb();
    Client.mockReturnValue(new (db.adapters.createPg().Client)());
    app = await createApp();

    const table = db.public.getTable("usuarios");
    usuarios.forEach((usuario) => table.insert(usuario));
  });

  afterEach(() => {
    Client.mockRestore();
  });

  test.each(usuarios)("deve buscar usuário por id $id", async (usuario) => {
    const { body } = await request(app)
      .get(`/usuarios/${usuario.id}`)
      .expect(200)
      .timeout(500);

    expect(body).toEqual(usuario);
  });

  test("deve ocorrer erro quando id não existir", async () => {
    const { body } = await request(app)
      .get(`/usuarios/123`)
      .expect(404)
      .timeout(500);

    expect(body).toEqual({ message: "Usuário não encontrado" });
  });

  test("deve criar usuário na tabela", async () => {
    await request(app)
      .post(`/usuarios`)
      .send({ nome: "Usuário Teste", email: "teste@example.com" })
      .expect(201)
      .timeout(500);

    const users = [...db.public.getTable("usuarios").find({})];
    expect(users).toContainEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nome: "Usuário Teste",
        email: "teste@example.com",
      })
    );
  });
});
