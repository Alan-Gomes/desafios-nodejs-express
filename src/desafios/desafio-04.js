import express from "express";

/* O export deve ser mantido como está para que os testes sejam executados corretamente */
export const app = express();

/*
  Busca por Nome:
  
  Implemente um serviço que permita ao cliente buscar produtos com base em um termo de pesquisa no nome.
  O serviço deve retornar produtos cujo nome contenha o termo de pesquisa, ignorando maiúsculas e minúsculas.
  O serviço deve obedecer o seguinte formato:

  GET /produtos?nome=barbeador

  O retorno deve ser, por exemplo:
  Status 200
  JSON [{ "id": 13, "nome": "Barbeador Elétrico", ...}]

*/
