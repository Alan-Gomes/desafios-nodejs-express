import express from "express";

/* O export deve ser mantido como está para que os testes sejam executados corretamente */
export const app = express();

/*
  Contador de Visitas:

  Implemente um contador de visitas que registra quantas visitas foram realizadas.
  O sistema consiste em dois serviços: um POST para registrar uma visita e um GET para ler o total de visitas
  O serviço POST deve obedecer o seguinte formato:

  POST /visitas
  O retorno deve ser:
  Status 204
  Sem conteúdo de resposta

  O serviço GET deve obedecer o seguinte formato:

  GET /visitas
  O retorno deve ser:
  Status 200
  JSON { "visitas": 123 } <-- número de visitas contado
*/
