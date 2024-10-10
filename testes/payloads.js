import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// gera um payload aleatório para testes de performance
export function createUserPayload() {
    return {
        nome: randomString(8), // gera um nome aleatório 
        ano: "2024",  // gera um ano 
        mesreferencia: "12", // gera um mes
        prazo: "2024-10-20", // gera um prazo
        procedente_cod_funcionario: "3113", 
        principal_ug: {
            ent_codigo: 4, // gera um estado
            nome: "Santa Denise do Leste", // gera um nome
            municipio_codigo: 25 // gera um municipio
        }
    };
}

