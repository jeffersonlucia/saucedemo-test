# Observabilidade

## Pilares

1. **Logs** estruturados.
2. **Métricas** RED/USE.
3. **Tracing** distribuído.
4. **Crash & RUM** mobile/web.
5. **Alertas** acionáveis (não-ruidosos).

## Stack

| Pilar | Ferramenta |
|---|---|
| Logs | Loki + Grafana (ou Datadog se vier orçamento) |
| Métricas | Prometheus + Grafana |
| Tracing | Tempo (OTLP) |
| Mobile crash | Sentry (mobile + backend num projeto separado) |
| Web RUM | Sentry Browser |
| Uptime sintético | Better Stack / Uptime Kuma self-hosted |
| Status público | StatusPage por clube enterprise |

## Correlação

- Todo log/metric/trace carrega `trace_id`, `tenant_id`, `user_id` (se aplicável), `flavor`.
- App envia `trace_id` no header `traceparent` (W3C Trace Context).

## SLOs

| Serviço | SLO | Janela |
|---|---|---|
| API leitura | 99.5% < 500ms | 30 dias |
| API escrita | 99.5% < 1s | 30 dias |
| Cobrança (Stripe webhook) | 99.9% sucesso de processamento | 7 dias |
| App cold start P95 | < 3s | 30 dias |

## Alertas (exemplos)

- 5xx > 1% por 5 min → PagerDuty para tech lead on-call.
- Cobrança falhada > 10 em 1h pro mesmo clube → notifica PM.
- Sentry: novo issue com > 50 ocorrências em 10 min → on-call.
- Fila `mail` com lag > 5 min → on-call.

## Dashboards mínimos

1. **Saúde geral** (5xx, latência, uptime).
2. **Saúde por clube** (req/s, error %, principais endpoints).
3. **Funil de aquisição** (visitas → cadastro → ativação → primeira presença).
4. **Receita** (MRR, churn, cobranças falhadas).
5. **Mobile** (crashes, ANRs, sessão sem crash %).
