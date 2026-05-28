# Jornadas de Usuário

Diagramas em mermaid. Cada jornada destaca os pontos onde o **multi-agente** durante o desenvolvimento precisa de atenção (UX, Back, DBA, QA).

## J1 — André recebe convite e ativa sua conta

```mermaid
sequenceDiagram
  participant Ricardo as Dono (backoffice)
  participant Sys as Plataforma
  participant Andre as Sócio André
  Ricardo->>Sys: cadastra André (e-mail + plano)
  Sys-->>Andre: e-mail "Bem-vindo ao Clube [Marca]"
  Andre->>Sys: clica no link, baixa app do clube
  Andre->>Sys: cria senha + biometria
  Sys-->>Andre: mostra carteirinha digital + agenda do mês
```

**Pontos críticos**:
- Deep link com tenant_id correto.
- Onboarding < 90s.
- Carteirinha precisa funcionar offline.

## J2 — André confirma presença num evento

```mermaid
flowchart LR
  A[Push notif: novo evento] --> B[Abre app na tela do evento]
  B --> C{Vagas disponíveis?}
  C -- sim --> D[Confirma com 1 toque]
  C -- não --> E[Entra na waitlist]
  D --> F[Recebe QR de check-in]
  F --> G[No dia: Marina escaneia QR]
  G --> H[Sócio entra, perfil aparece no tablet]
```

## J3 — Camila descobre o clube e compra um evento avulso

```mermaid
flowchart TD
  A[Vê post Instagram] --> B[Acessa landing do clube]
  B --> C[Vê agenda pública]
  C --> D[Clica num evento avulso]
  D --> E[Cadastro rápido como guest]
  E --> F[Paga com Pix]
  F --> G[Recebe ingresso por e-mail + WhatsApp]
  G --> H[Pós-evento: convite pra virar sócia]
```

## J4 — Ricardo cria um evento no backoffice

```mermaid
sequenceDiagram
  participant R as Ricardo
  participant BO as Backoffice
  participant App as App dos sócios
  R->>BO: novo evento (título, data, capacidade, preço)
  R->>BO: seleciona garrafas do flight (cellar do clube)
  R->>BO: define quem vê (todos / plano gold+ / convidados também)
  R->>BO: publica
  BO-->>App: aparece na agenda dos sócios elegíveis
  BO-->>App: push opcional ("novo evento Glenmorangie 18!")
```

## J5 — Marina opera a noite do evento

```mermaid
flowchart LR
  A[Abre tablet PDV] --> B[Vê lista do evento]
  B --> C[Sócio chega, escaneia QR]
  C --> D[Perfil do sócio: nome, plano, preferências]
  D --> E[Anota observações / consumo extra]
  E --> F[Encerra evento]
  F --> G[Relatório gerado: presença, no-show, receita extra]
```

## J6 — Ricardo escala para 2ª unidade

```mermaid
flowchart TD
  A[Compra plano Pro] --> B[Cria unidade 2 no backoffice]
  B --> C{Mesma marca?}
  C -- sim --> D[Sócios escolhem unidade preferida]
  C -- não --> E[Novo flavor é provisionado]
  D --> F[Eventos passam a ter unidade]
  E --> F
```

---

## Mapa Jornada × Épico

| Jornada | Épico no backlog |
|---|---|
| J1 | E1 — Identidade & Membership |
| J2 | E2 — Agenda & Eventos |
| J3 | E3 — Aquisição & Public funnel |
| J4 | E4 — Backoffice Eventos |
| J5 | E5 — Operação na unidade |
| J6 | E6 — Multi-unidade & Flavor Provisioning |
