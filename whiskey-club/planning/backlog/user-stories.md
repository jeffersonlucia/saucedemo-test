# Histórias de Usuário (sample do MVP — Fase 1)

> Formato: **US-<épico>.<nº>** — *"Como <persona>, eu quero <objetivo>, para <valor>"*.
> Cada história tem critérios de aceite (Given/When/Then), dependências e estimativa em pontos (Fibonacci: 1, 2, 3, 5, 8, 13).

Backlog completo será mantido no Notion (ver `notion-import/`). Aqui está a base do MVP para evidenciar o **nível de granularização esperado**.

---

## Épico E1 — Identidade & Membership

### US-1.1 — Login com e-mail e senha
*Como sócio, eu quero entrar no app com e-mail e senha, para acessar meus benefícios.*
**Estimativa**: 3
**Critérios**
- Dado que sou sócio cadastrado, quando informo e-mail+senha válidos, então sou redirecionado para Home.
- Quando informo credenciais inválidas, então vejo erro genérico ("e-mail ou senha incorretos") sem revelar qual.
- Após 5 tentativas erradas em 10 min, conta é bloqueada por 15 min.
- Token JWT é guardado em Secure Storage (mobile) / cookie httpOnly (web).

### US-1.2 — Login biométrico após primeiro acesso
*Estimativa*: 2 — depende de US-1.1.

### US-1.3 — Onboarding em 3 telas
*Estimativa*: 3 — depende do Design System.

### US-1.4 — Carteirinha digital com QR rotativo
*Estimativa*: 5
**Critérios**
- Sócio ativo vê carteirinha com foto, nome, plano, vencimento.
- QR muda a cada 60s usando segredo do sócio (TOTP-like).
- Funciona offline (cache do segredo em Secure Storage).
- Marina, ao escanear, valida assinatura no backend.

### US-1.5 — Editar perfil (foto, telefone, preferências)
*Estimativa*: 3

### US-1.6 — Esqueci minha senha
*Estimativa*: 3

### US-1.7 — Aceite de termos LGPD no primeiro acesso
*Estimativa*: 2

---

## Épico E2 — Agenda & Eventos

### US-2.1 — Listar eventos dos próximos 60 dias
*Estimativa*: 5
**Critérios**
- Sócio vê lista cronológica, agrupada por mês.
- Filtros: tipo (degustação, masterclass, harmonização, livre), unidade (se multi-unidade).
- Eventos elegíveis só pro plano do sócio aparecem (segmentação por plan_ids).
- Estados: loading skeleton, vazio (com CTA), erro com retry.

### US-2.2 — Ver detalhe do evento
*Estimativa*: 3

### US-2.3 — Confirmar presença em 1 toque
*Estimativa*: 5
**Critérios**
- Sócio confirma → recebe QR de check-in + entrada no calendário do dispositivo.
- Idempotente: 2 cliques rápidos = 1 confirmação.
- Notifica backend para decrementar capacidade.

### US-2.4 — Entrar em waitlist e ser promovido
*Estimativa*: 5

### US-2.5 — Cancelar presença até X horas antes
*Estimativa*: 3

---

## Épico E4 — Backoffice Eventos

### US-4.1 — Login backoffice com 2FA obrigatório
*Estimativa*: 5

### US-4.2 — Criar evento com formulário multi-step
*Estimativa*: 8
**Critérios**
- Step 1: básico (título, tipo, descrição markdown).
- Step 2: data, capacidade, preço, segmentação por plano.
- Step 3: flight (selecionar garrafas do cellar).
- Salvar como rascunho ou publicar.
- Publicar dispara: notificação para sócios elegíveis (push se ligado), inclusão na agenda.

### US-4.3 — Editar evento publicado (com regras)
*Estimativa*: 5 — campos sensíveis (preço, data) exigem segunda confirmação e geram audit.

### US-4.4 — Importar sócios via CSV
*Estimativa*: 8

### US-4.5 — Calendário visual dos eventos
*Estimativa*: 5

---

## Épico E5 — PDV

### US-5.1 — Login do tablet em modo unidade (com PIN curto)
*Estimativa*: 3

### US-5.2 — Listar presenças do evento em andamento
*Estimativa*: 3

### US-5.3 — Escanear QR do sócio (câmera traseira)
*Estimativa*: 5 — valida assinatura, mostra ficha do sócio, marca presença.

### US-5.4 — Encerrar evento e gerar relatório
*Estimativa*: 5

---

## Épico E9 — Multi-tenant & Flavor (foundations)

### US-9.1 — Backend isola tenants via RLS
*Estimativa*: 8

### US-9.2 — App carrega FlavorConfig no bootstrap
*Estimativa*: 5

### US-9.3 — Pipeline gera build por flavor (matrix)
*Estimativa*: 5

### US-9.4 — Golden tests por flavor passam em CI
*Estimativa*: 3

### US-9.5 — Lint custom proíbe hardcode user-facing
*Estimativa*: 3

---

## Épico E11 — Pagamentos

### US-11.1 — Cobrança recorrente mensal via Stripe
*Estimativa*: 8

### US-11.2 — Cobrança Pix avulsa para evento
*Estimativa*: 5

### US-11.3 — Tratar webhook de pagamento falhado e re-tentar
*Estimativa*: 5

### US-11.4 — Sócio vê status de pagamento no perfil
*Estimativa*: 3

---

## DoR (Definition of Ready) — todo item precisa ter

- [ ] Persona-alvo clara
- [ ] Critérios de aceite Given/When/Then
- [ ] Mocks/Wireframes vinculados (se UI)
- [ ] Decisões de design e dados resolvidas
- [ ] Dependências mapeadas
- [ ] Estimativa atribuída (pontos)

## DoD (Definition of Done) — todo item entregue precisa ter

- [ ] Código revisado por humano **e** pelo agente revisor
- [ ] Testes automatizados cobrindo o critério
- [ ] Documentação atualizada (técnica e/ou usuário)
- [ ] Sem TODO/FIXME novos
- [ ] Telemetria emitindo
- [ ] Deploy em staging + smoke verde
- [ ] PO aprovou em staging
