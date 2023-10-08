import { Client } from "pg";
import { newDb } from "pg-mem";
import request from "supertest";
import { createApp } from "../src/desafios/desafio-08.js";

jest.mock("pg", () => ({
  Client: jest.fn(),
}));

const usuarios = [
  { id: 1, username: "test1" },
  { id: 2, username: "test2" },
  { id: 3, username: "test3" },
  { id: 4, username: "ALL_CAPS" },
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

  test.each`
    payload                                                              | mencoes
    ${{ usuarioId: 3, conteudo: "postagem sem menção" }}                 | ${[]}
    ${{ usuarioId: 2, conteudo: "postagem @ALL_CAPS" }}                  | ${[4]}
    ${{ usuarioId: 1, conteudo: "postagem @test3 @test2" }}              | ${[2, 3]}
    ${{ usuarioId: 1, conteudo: "marcação total @test1 @test3 @test2" }} | ${[1, 2, 3]}
  `(
    'deve cadastrar publicação com conteúdo: "$payload.conteudo"',
    async ({ payload, mencoes: mencoesEsperadas }) => {
      await request(app)
        .post("/postagens")
        .send(payload)
        .expect(201)
        .timeout(500);

      const [post] = [...db.public.getTable("postagens").find({})];
      const mencoes = [...db.public.getTable("postagem_mencoes").find({})];
      expect(post).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          usuario_id: payload.usuarioId,
          conteudo: payload.conteudo,
        })
      );
      expect(mencoes).toHaveLength(mencoesEsperadas.length);
      mencoesEsperadas.forEach((usuarioId) => {
        expect(mencoes).toContainEqual(
          expect.objectContaining({
            postagem_id: post.id,
            usuario_id: usuarioId,
          })
        );
      });
    }
  );
});
