# Requisitos Funcionais

Notação: **RF-Xnn** = Requisito Funcional do módulo X, número nn.
Cada RF tem prioridade **M** (MoSCoW: Must / Should / Could / Wont) e fase alvo (F1=MVP, F2, F3).

---

## Módulo 1 — Identidade & Membership

| ID | Requisito | M | Fase |
|---|---|---|---|
| RF-101 | Sócio se autentica por e-mail+senha e por biometria após primeiro login | Must | F1 |
| RF-102 | Sócio possui carteirinha digital com QR único (rotativo a cada 60s) | Must | F1 |
| RF-103 | Sócio pode editar dados (foto, telefone, endereço, preferências de whiskey) | Must | F1 |
| RF-104 | Sistema suporta múltiplos planos por clube (configurável pelo dono) | Must | F1 |
| RF-105 | Sócio pode visualizar status do plano (ativo, suspenso, em renovação) | Must | F1 |
| RF-106 | Sócio pode pausar/cancelar a renovação (gate de retenção: mostra próximo evento) | Should | F2 |
| RF-107 | Guest pode se cadastrar sem ser sócio (acesso a eventos pay-per-use) | Must | F1 |
| RF-108 | Programa de indicação: sócio gera link e ganha crédito quando indicado vira sócio | Could | F3 |

## Módulo 2 — Agenda & Eventos

| ID | Requisito | M | Fase |
|---|---|---|---|
| RF-201 | Sócio vê agenda dos próximos 60 dias, filtrável por tipo (degustação, masterclass, harmonização, livre) | Must | F1 |
| RF-202 | Sócio confirma presença em 1 toque | Must | F1 |
| RF-203 | Sócio entra em waitlist se sem vaga; promovido automaticamente se libera | Must | F1 |
| RF-204 | Eventos podem ser segmentados por plano (gold-only, etc.) | Must | F1 |
| RF-205 | Eventos podem permitir +1 convidado pago | Should | F2 |
| RF-206 | Push notification para novos eventos com base em preferências | Should | F2 |
| RF-207 | Lembrete automático 24h e 2h antes do evento | Should | F2 |
| RF-208 | Sócio pode cancelar presença até X horas antes (configurável) | Must | F1 |
| RF-209 | Após o evento, sócio pode rever flight e dar tasting notes pessoais | Could | F2 |

## Módulo 3 — Cellar do Clube & Cellar Pessoal

| ID | Requisito | M | Fase |
|---|---|---|---|
| RF-301 | Cellar do clube: lista navegável de garrafas com foto, distillery, região, idade, ABV, notas | Must | F1 |
| RF-302 | Cada garrafa tem ficha técnica + nota do curador | Must | F1 |
| RF-303 | Cellar pessoal do sócio: marca garrafas como "provei" / "tenho em casa" / "quero provar" | Should | F2 |
| RF-304 | E-commerce: comprar garrafa pelo app, retirar na unidade ou entrega (onde permitido) | Could | F3 |
| RF-305 | Curador (Otto) cataloga garrafas no backoffice com upload de imagem e markdown nas notas | Must | F1 |

## Módulo 4 — Backoffice (Dono / Gerente / Curador)

| ID | Requisito | M | Fase |
|---|---|---|---|
| RF-401 | Login SSO ou e-mail+senha + 2FA obrigatório | Must | F1 |
| RF-402 | CRUD de sócios, com importação CSV | Must | F1 |
| RF-403 | CRUD de eventos, com calendário visual | Must | F1 |
| RF-404 | CRUD de garrafas (cellar) | Must | F1 |
| RF-405 | Dashboard: sócios ativos, churn, receita do mês, próximos eventos | Should | F2 |
| RF-406 | Multi-unidade: trocar de unidade no header, ver dados consolidados | Must | F2 |
| RF-407 | Roles: dono, gerente, curador, recepção — permissões granulares | Must | F1 |
| RF-408 | Export CSV de qualquer listagem | Should | F2 |

## Módulo 5 — Operação no PDV (tablet em loja)

| ID | Requisito | M | Fase |
|---|---|---|---|
| RF-501 | Modo evento: leitura de QR de check-in, lista de presença em tempo real | Must | F1 |
| RF-502 | Ficha do sócio aparece ao escanear (foto, plano, preferências, último evento) | Must | F1 |
| RF-503 | Lançamento de consumo extra no evento (garrafa avulsa fora do flight) | Should | F2 |
| RF-504 | Fecha evento, gera relatório (presença, no-show, receita extra) | Must | F1 |
| RF-505 | Modo offline parcial: aceita check-in sem internet, sincroniza depois | Should | F2 |

## Módulo 6 — Aquisição & Funil Público

| ID | Requisito | M | Fase |
|---|---|---|---|
| RF-601 | Cada clube tem landing pública (`/[slug-do-clube]`) com agenda visível | Must | F1 |
| RF-602 | Visitante compra ingresso de evento avulso sem ser sócio | Must | F1 |
| RF-603 | Visitante pede pra virar sócio (form → vira lead no backoffice) | Must | F1 |
| RF-604 | SEO básico nas landings (OG tags, sitemap) | Should | F2 |

## Módulo 7 — Pagamentos & Faturamento

| ID | Requisito | M | Fase |
|---|---|---|---|
| RF-701 | Cobrança recorrente da mensalidade do sócio (cartão e Pix) | Must | F1 |
| RF-702 | Cobrança avulsa para eventos pagos | Must | F1 |
| RF-703 | Notificação de cobrança falhada + tentativa de recuperação | Must | F1 |
| RF-704 | Faturamento do clube para o SaaS: emite NF e cobra mensalidade do Ricardo | Must | F1 |
| RF-705 | Split de pagamento (futuro: clube X comissão da plataforma em e-commerce) | Could | F3 |

## Módulo 8 — Notificações & Comunicação

| ID | Requisito | M | Fase |
|---|---|---|---|
| RF-801 | Push notifications segmentadas (por plano, preferência, comportamento) | Should | F2 |
| RF-802 | E-mail transacional (welcome, lembrete, recibo) | Must | F1 |
| RF-803 | WhatsApp transacional via Twilio/Z-API | Should | F2 |
| RF-804 | Inbox dentro do app (histórico de comunicações) | Could | F3 |

## Módulo 9 — Multi-tenant & Flavor

| ID | Requisito | M | Fase |
|---|---|---|---|
| RF-901 | Cada clube tem flavor próprio: logo, paleta, tipografia, copy, app icon, splash | Must | F1 |
| RF-902 | Provisionamento de novo flavor por configuração (JSON + assets), sem mudar código | Must | F1 |
| RF-903 | Build pipeline gera artefatos iOS/Android por flavor | Must | F1 |
| RF-904 | App publicado nas stores com bundle id do clube (não nosso) | Must | F1 |
| RF-905 | Multi-unidade dentro do mesmo flavor (Fase 2) | Must | F2 |
| RF-906 | Web app (PWA) com tema por subdomínio do clube | Should | F2 |
