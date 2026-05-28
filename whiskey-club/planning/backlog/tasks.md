# Tasks — granularização técnica de uma história (exemplo)

Mostramos como cada história vira **tasks executáveis por agentes específicos**.
O backlog completo segue este padrão e será mantido no Notion.

---

## Exemplo: US-2.3 "Confirmar presença em 1 toque"

### Tasks de Discovery (PM + PO + UX)
- [ ] **D-2.3.1** — PO define regras de capacidade, idempotência e cancelamento; documenta em ADR-EVT-001.
- [ ] **D-2.3.2** — UX desenha estados (idle, loading, success, erro de capacidade, erro de rede) no Figma.
- [ ] **D-2.3.3** — Designer entrega micro-interação Lottie de sucesso (≤ 30KB).

### Tasks de Backend
- [ ] **B-2.3.1** — Endpoint `POST /v1/events/:id/attendance` (idempotente via `Idempotency-Key`).
- [ ] **B-2.3.2** — Lock pessimista no contador de capacidade (Redis `WATCH` ou advisory lock no PG).
- [ ] **B-2.3.3** — Use case `ConfirmAttendance` com regras: plano elegível, capacidade, não duplicado, data futura.
- [ ] **B-2.3.4** — Emitir evento de domínio `AttendanceConfirmed` (consumido por notifications e analytics).
- [ ] **B-2.3.5** — Testes: unit (use case), integração (concorrência: 100 reqs simultâneas com capacidade 1).
- [ ] **B-2.3.6** — Atualizar OpenAPI + publicar SDK.

### Tasks de DBA
- [ ] **DB-2.3.1** — Garantir índice `(event_id, member_id) UNIQUE` em `attendances`.
- [ ] **DB-2.3.2** — Política RLS em `attendances`.

### Tasks de Frontend (Flutter)
- [ ] **F-2.3.1** — `AttendanceRepository` + DTO via SDK gerado.
- [ ] **F-2.3.2** — `EventDetailController` (Riverpod): estado, ação `confirm()`.
- [ ] **F-2.3.3** — UI da tela de detalhe consumindo o controller (botão com estados, success sheet com QR).
- [ ] **F-2.3.4** — Disparo de evento de analytics `event_attendance_confirmed`.
- [ ] **F-2.3.5** — Tratamento de erros amigáveis (capacidade esgotada → CTA "Entrar na waitlist").
- [ ] **F-2.3.6** — Widget test do controller e widget; golden por flavor da success sheet.

### Tasks de QA Automation
- [ ] **Q-2.3.1** — Integration test (`patrol`): fluxo completo confirma + QR aparece.
- [ ] **Q-2.3.2** — E2E web (PWA) cobrindo o mesmo fluxo.
- [ ] **Q-2.3.3** — Teste de regressão visual (golden) por flavor.

### Tasks de DevOps
- [ ] **OP-2.3.1** — Dashboard Grafana com painel "confirmações por minuto" por tenant.
- [ ] **OP-2.3.2** — Alerta se taxa de erro > 2% em 5min.

### Tasks de Docs
- [ ] **DOC-2.3.1** — Artigo de ajuda do sócio: "Como confirmo minha presença".
- [ ] **DOC-2.3.2** — Atualizar manual do operador: regras de capacidade.

### Tasks de Simulação (validação antes de DoR/após Done)
- [ ] **SIM-2.3.1** — Agente Cliente-Sim (sócio premium) executa a jornada em staging e reporta fricções.
- [ ] **SIM-2.3.2** — Agente Cliente-Sim (dono) confirma que vê o aumento de presença no dashboard.

---

## Convenção de IDs de task

`<Trilha>-<US>.<seq>` onde **Trilha**:

- `D` Discovery
- `B` Backend
- `DB` Database
- `F` Frontend
- `Q` QA Automation
- `OP` DevOps
- `DOC` Docs
- `SIM` Simulação por agente cliente

## Como agentes pegam as tasks

Veja `agents/orchestration.md`. Em resumo: o **PM** quebra a história em tasks deste formato, marca a trilha, e o **orquestrador** atribui ao agente daquela trilha. Hand-off explícito ao concluir.
