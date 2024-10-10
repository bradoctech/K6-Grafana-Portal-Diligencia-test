import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export function createUserPayload() {
    return {
        nome: randomString(8), // gera um nome aleatório
        ano: "2024",
        mesreferencia: "12",
        prazo: "2024-10-20",
        procedente_cod_funcionario: "3113",
        principal_ug: {
            ent_codigo: 4,
            nome: "Santa Denise do Leste",
            municipio_codigo: 25
        }
    };
}
