import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { Counter, Gauge, Rate, Trend } from "k6/metrics";
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { baseUrl, headers } from './config.js'; // Importa baseUrl e headers

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

export const options = {
    stages: [
        { duration: '5s', target: 1 },
        { duration: '1m', target: 10},
        { duration: '30s', target: 0 },
    ],
   
};

const MyCounter = new Counter("quantidade_de_chamadas");
const myGauge = new Gauge("Tempo_bloqueado");
const myRate = new Rate("taxa_req_201");
const myTrend = new Trend("Taxa_de_espera");

export default function () {
    const payload = JSON.stringify(createUserPayload());

    const params = {
        headers: headers, // Usa os headers do arquivo de configuração
    };

    const res = http.post(`${baseUrl}/api/diligencia-pdf-faltante`, payload, params); // Usa a baseUrl
    MyCounter.add(1);
    myGauge.add(res.timings.blocked);
    myRate.add(res.status === 201);
    myTrend.add(res.timings.waiting);

    console.log("Payload:", payload); // Log do payload gerado aleatoriamente para teste de performance
    console.log("Headers:", JSON.stringify(params.headers)); // Log dos headers
    console.log("Response Body:", res.body);
    console.log("Response Status Code:", res.status);

    check(res, {
        "Status code é 201": (r) => r.status === 201,
    });
}

export function handleSummary(data) {
    return {
        // O relatório será salvo na pasta 'k6-results' com o nome 'post-load-test-report.html'
        "./../results/k6-results/post-load-test-report.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
