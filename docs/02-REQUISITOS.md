# Documento de requisitos — Whiskey Club OS

**Autor:** Analista de requisitos (agente)  
**Versão:** 0.1  
**Status:** Rascunho para validação com PO e cliente simulado

---

## 1. Escopo

Sistema de gerenciamento de clubes de whiskey com aplicativo mobile (Flutter), painel administrativo, API multi-tenant e flavorização por cliente/unidade.

## 2. Requisitos funcionais

### RF-001 — Multi-tenant e flavors
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-001.1 | Cada cliente (tenant) possui isolamento lógico de dados | Must |
| RF-001.2 | Cada unidade pode sobrescrever branding e configurações locais | Must |
| RF-001.3 | Build do app gera artefatos distintos por flavor (bundle ID, ícone, nome) | Must |
| RF-001.4 | Feature flags por tenant/unidade | Should |

### RF-002 — Autenticação e autorização
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-002.1 | Login e-mail/senha e recuperação de senha | Must |
| RF-002.2 | Papéis: platform_admin, club_owner, staff, member | Must |
| RF-002.3 | RBAC por unidade (staff só vê sua filial) | Must |
| RF-002.4 | OAuth social (Apple/Google) para membros | Should |

### RF-003 — Catálogo e estoque
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-003.1 | Cadastro de garrafa: nome, destilaria, tipo, ABV, país, notas | Must |
| RF-003.2 | Lote/serial opcional, quantidade, localização na adega | Must |
| RF-003.3 | Movimentação: entrada, saída, degustação, quebra | Must |
| RF-003.4 | Alerta estoque mínimo | Should |

### RF-004 — Eventos e degustações
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-004.1 | Criar evento com data, capacidade, garrafas associadas | Must |
| RF-004.2 | Reserva pelo membro com confirmação | Must |
| RF-004.3 | Check-in no evento (QR ou manual) | Should |
| RF-004.4 | Registro de notas de degustação pós-evento | Must |

### RF-005 — Assinaturas
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-005.1 | Planos configuráveis (preço, benefícios, cotas) | Must |
| RF-005.2 | Cobrança recorrente integrada (Stripe/Mercado Pago) | Must |
| RF-005.3 | Upgrade/downgrade e cancelamento | Must |
| RF-005.4 | Histórico de faturas | Should |

### RF-006 — Membro (app)
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-006.1 | Ver próximos eventos e reservar | Must |
| RF-006.2 | Ver benefícios do plano atual | Must |
| RF-006.3 | Histórico de degustações e notas pessoais | Must |
| RF-006.4 | Perfil de paladar (tags: fumado, doce, especiado…) | Should |

### RF-007 — Gestão (painel dono)
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-007.1 | Dashboard: membros ativos, MRR, eventos, estoque crítico | Must |
| RF-007.2 | CRUD membros e convites | Must |
| RF-007.3 | Relatórios exportáveis (CSV) | Should |

### RF-008 — Notificações
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-008.1 | Push: lembrete de evento, confirmação de reserva | Must |
| RF-008.2 | E-mail transacional | Should |

## 3. Requisitos não funcionais

| ID | Categoria | Descrição |
|----|-----------|-----------|
| RNF-001 | Performance | API p95 < 300ms para leituras principais |
| RNF-002 | Disponibilidade | 99.5% MVP (single region) |
| RNF-003 | Segurança | TLS, JWT curto + refresh, LGPD, logs de auditoria |
| RNF-004 | Escalabilidade | Suportar 50 tenants / 500 unidades no ano 1 |
| RNF-005 | i18n | pt-BR MVP; en-US preparado |
| RNF-006 | Offline | Cache read-only de eventos e catálogo no app |
| RNF-007 | Acessibilidade | WCAG 2.1 AA no mock e UI final |
| RNF-008 | Observabilidade | Logs estruturados, traces, métricas de negócio |

## 4. Regras de negócio

- **RN-01:** Membro inadimplente não reserva eventos até regularizar.
- **RN-02:** Capacidade de evento não pode ser excedida (lista de espera opcional fase 2).
- **RN-03:** Degustação consome volume do estoque conforme regra configurável (ml por dose).
- **RN-04:** Dados de um tenant nunca vazam para outro (row-level security).

## 5. Integrações

| Sistema | Uso | Fase |
|---------|-----|------|
| Stripe / Mercado Pago | Assinaturas | MVP |
| Firebase / OneSignal | Push | MVP |
| SendGrid / Resend | E-mail | MVP |
| S3 / GCS | Imagens de rótulos | MVP |

## 6. Rastreabilidade

Cada história em `03-BACKLOG-EPICOS-HISTORIAS.md` referencia IDs RF/RNF acima.

## 7. Pendências de descoberta

- [ ] Validar campos obrigatórios de garrafa com dono simulado
- [ ] Definir provedor de pagamento por país
- [ ] Confirmar necessidade de nota fiscal no MVP
