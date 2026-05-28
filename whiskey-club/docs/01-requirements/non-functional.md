# Requisitos Não Funcionais

## Performance

- **TTI** (Time-to-Interactive) do app mobile ≤ **2.5s** em rede 4G mediana em device mediano (Moto G fast / iPhone SE 2020).
- Resposta de API P95 ≤ **400ms** para endpoints de listagem; P95 ≤ **800ms** para escritas.
- Cold start do app ≤ **3s** no Android low-end.

## Disponibilidade

- SLA da API: **99.5%** em F1, **99.9%** em F2+.
- Janelas de manutenção comunicadas com ≥ 48h.

## Escalabilidade

- Arquitetura deve suportar **100 clubes ativos × 2.000 sócios** sem refator (= 200k usuários).
- Eventos com pico de check-in (50 leituras/min por unidade) devem ser absorvidos.

## Segurança

- LGPD compliant desde o dia 0:
  - Consentimento explícito no onboarding.
  - Direito ao esquecimento (purga em até 30 dias).
  - Portabilidade de dados (export JSON).
- Autenticação: senha forte + biometria + 2FA obrigatório no backoffice.
- Dados sensíveis em repouso criptografados (AES-256).
- TLS 1.3 mandatório.
- Segredos só em vault, nunca em variável de ambiente em texto plano.
- Pen test antes de cada release de fase.

## Privacidade & Compliance

- Política de privacidade e termos por **clube**, hospedados na nossa stack mas brandados.
- Consentimento de comunicação granular (e-mail, push, WhatsApp) por canal.
- Idade mínima 18 (verificação no cadastro) — produto envolve álcool.

## Acessibilidade

- WCAG 2.1 AA no PWA e backoffice.
- App mobile: tamanho de fonte respeitando preferência do SO, contraste ≥ 4.5:1.

## Observabilidade

- **Logs**: estruturados (JSON), correlacionados por `trace_id`.
- **Métricas**: RED (Rate, Errors, Duration) por endpoint; USE (Utilization, Saturation, Errors) por recurso.
- **Tracing distribuído**: OpenTelemetry com export para Grafana Tempo / Datadog.
- **Crash reporting** mobile: Sentry / Crashlytics.
- **Dashboard de saúde por clube** (visível no backoffice).

## Confiabilidade

- Backup do banco a cada **6h**, retenção 30 dias.
- Disaster recovery testado **trimestralmente**.
- RTO ≤ 4h, RPO ≤ 1h.

## Internacionalização

- App preparado para i18n (extração de strings via ARB), apenas **pt-BR ativo no MVP**.
- Datas/moedas/timezones por clube (default America/Sao_Paulo, BRL).

## Manutenibilidade

- Cobertura de testes ≥ 70% backend, ≥ 60% app.
- Lint, format, type-check obrigatórios em CI.
- Documentação de ADRs (Architecture Decision Records) em `docs/02-architecture/adrs/`.

## Custos (target)

- Infra ≤ **R$ 0,40 por sócio ativo/mês** em F1.
- Otimização via cache agressivo (CDN para assets, Redis para reads frequentes).

## Auditoria

- Toda ação destrutiva no backoffice → audit log imutável (append-only), retenção 5 anos.
- Quem fez o quê, quando, em qual unidade.
