# 07 — Granularização de Tasks: WhiskeyCLUB

**Responsável**: Tech Lead (agent-tl) + PO (agent-po)  
**Formato**: Épico → Feature → Task → Subtask

---

## Estrutura de Decomposição

```
ÉPICO (Nível 1) — Objetivo de negócio amplo
  └── FEATURE (Nível 2) — Funcionalidade entregável
        └── TASK (Nível 3) — Unidade de trabalho (1-3 dias)
              └── SUBTASK (Nível 4) — Passo técnico (horas)
```

---

## ÉPICO EP-01: Autenticação e Identidade

### Feature F-01.01: Backend de Auth

**TASK T-01.01.01** — Setup do módulo auth no backend
| Campo | Valor |
|-------|-------|
| Responsável | Backend Dev 1 |
| Estimativa | 4h |
| Sprint | 1 |
| Dependências | Nenhuma |

Subtasks:
- [ ] Criar estrutura de pastas `src/modules/auth/`
- [ ] Instalar e configurar `@fastify/jwt`
- [ ] Configurar `bcrypt` para hash de senhas
- [ ] Criar tipos TypeScript: `AuthUser`, `JwtPayload`, `TokenPair`
- [ ] Setup de variáveis de ambiente para JWT secrets

---

**TASK T-01.01.02** — Endpoint POST /auth/register
| Campo | Valor |
|-------|-------|
| Responsável | Backend Dev 1 |
| Estimativa | 6h |
| Sprint | 1 |
| Dependências | T-01.01.01, Schema DB users |

Subtasks:
- [ ] Schema Zod de validação do body
- [ ] Verificar unicidade do e-mail no DB
- [ ] Hashear senha com bcrypt (12 rounds)
- [ ] Inserir usuário no DB via Prisma
- [ ] Gerar e enviar e-mail de confirmação (SendGrid)
- [ ] Retornar 201 com dados públicos do usuário
- [ ] Teste unitário do serviço de registro
- [ ] Teste de integração do endpoint

---

**TASK T-01.01.03** — Endpoint POST /auth/login
| Campo | Valor |
|-------|-------|
| Responsável | Backend Dev 1 |
| Estimativa | 4h |
| Sprint | 1 |
| Dependências | T-01.01.01 |

Subtasks:
- [ ] Buscar usuário por e-mail no DB
- [ ] Comparar senha com bcrypt.compare
- [ ] Gerar access_token (JWT, 15min, assínado com RS256)
- [ ] Gerar refresh_token (UUID v4, 7 dias)
- [ ] Salvar refresh_token no Redis
- [ ] Retornar 200 com token pair
- [ ] Rate limiting específico para login (5 tentativas/min)
- [ ] Testes unitários e de integração

---

**TASK T-01.01.04** — Endpoint POST /auth/refresh
| Campo | Valor |
|-------|-------|
| Responsável | Backend Dev 1 |
| Estimativa | 3h |
| Sprint | 1 |
| Dependências | T-01.01.03 |

Subtasks:
- [ ] Validar refresh_token no Redis
- [ ] Verificar se token não está na blacklist
- [ ] Gerar novo access_token
- [ ] Rotacionar refresh_token (invalidar antigo, criar novo)
- [ ] Testes do fluxo de refresh

---

**TASK T-01.01.05** — Endpoint POST /auth/logout
| Campo | Valor |
|-------|-------|
| Responsável | Backend Dev 1 |
| Estimativa | 2h |
| Sprint | 1 |
| Dependências | T-01.01.04 |

Subtasks:
- [ ] Invalidar refresh_token no Redis
- [ ] Adicionar access_token à blacklist (até expirar)
- [ ] Retornar 204 No Content
- [ ] Testes

---

**TASK T-01.01.06** — Endpoint POST /auth/forgot-password + /auth/reset-password
| Campo | Valor |
|-------|-------|
| Responsável | Backend Dev 1 |
| Estimativa | 5h |
| Sprint | 1 |
| Dependências | T-01.01.01 |

Subtasks:
- [ ] Gerar token de reset único (UUID, expira em 1h)
- [ ] Salvar token no Redis
- [ ] Enviar e-mail com link de reset (template SendGrid)
- [ ] Endpoint de validação e nova senha
- [ ] Invalidar token após uso
- [ ] Testes

---

### Feature F-01.02: Flutter — Telas de Autenticação

**TASK T-01.02.01** — Setup do módulo auth no Flutter
| Campo | Valor |
|-------|-------|
| Responsável | Flutter Dev 1 |
| Estimativa | 4h |
| Sprint | 1 |

Subtasks:
- [ ] Criar estrutura de pastas `lib/features/auth/`
- [ ] Criar `AuthRepository` (interface + implementação)
- [ ] Criar `AuthCubit` com estados: Initial, Loading, Authenticated, Error
- [ ] Registrar dependências no GetIt
- [ ] Configurar `flutter_secure_storage` para tokens
- [ ] Criar `AuthInterceptor` no Dio (adiciona Bearer token, refresha se 401)

---

**TASK T-01.02.02** — Tela de Login
| Campo | Valor |
|-------|-------|
| Responsável | Flutter Dev 1 |
| Estimativa | 6h |
| Sprint | 1 |
| Dependências | T-01.02.01, Design tela login (Figma) |

Subtasks:
- [ ] Implementar `LoginPage` com `BlocBuilder`
- [ ] Campo e-mail com validação de formato
- [ ] Campo senha com toggle show/hide
- [ ] Botão "Entrar" com loading state
- [ ] Tratamento de erros (credenciais inválidas, erro de rede)
- [ ] Link "Esqueci minha senha"
- [ ] Link "Criar conta"
- [ ] Navegação pós-login para Home
- [ ] Widget tests

---

**TASK T-01.02.03** — Tela de Cadastro
| Campo | Valor |
|-------|-------|
| Responsável | Flutter Dev 1 |
| Estimativa | 8h |
| Sprint | 1 |

Subtasks:
- [ ] Formulário multi-step (dados pessoais → preferências → aceite)
- [ ] Validação inline dos campos
- [ ] Checkbox de aceite de termos com link para documento
- [ ] Loading state durante cadastro
- [ ] Tela de "Confirme seu e-mail" após cadastro
- [ ] Widget tests

---

**TASK T-01.02.04** — Tela de Recuperação de Senha
| Campo | Valor |
|-------|-------|
| Responsável | Flutter Dev 1 |
| Estimativa | 3h |
| Sprint | 1 |

Subtasks:
- [ ] Campo de e-mail + botão enviar
- [ ] Estado de sucesso com orientação
- [ ] Deep link para tela de nova senha (no app, quando abrir o link do e-mail)
- [ ] Tela de nova senha com confirmação
- [ ] Widget tests

---

## ÉPICO EP-03: Catálogo de Whiskies

### Feature F-03.01: Backend do Catálogo

**TASK T-03.01.01** — Schema e migrations: tabelas de catálogo
| Campo | Valor |
|-------|-------|
| Responsável | DBA + Backend Dev 2 |
| Estimativa | 4h |
| Sprint | 3 |

Subtasks:
- [ ] Criar tabela `whiskies` no Prisma schema
- [ ] Criar tabela `distilleries` (países, regiões)
- [ ] Criar tabela `whiskey_images`
- [ ] Criar tabela `whiskey_reviews`
- [ ] Criar índices para full-text search (GIN index em PostgreSQL)
- [ ] Escrever seed de dados de teste (10 whiskies)
- [ ] Gerar e rodar migration

---

**TASK T-03.01.02** — API: CRUD de whiskies
| Campo | Valor |
|-------|-------|
| Responsável | Backend Dev 2 |
| Estimativa | 8h |
| Sprint | 3 |

Subtasks:
- [ ] GET /catalog/whiskies (paginado, com filtros)
- [ ] GET /catalog/whiskies/:id (detalhe)
- [ ] POST /catalog/whiskies (criar, role: sommelier)
- [ ] PUT /catalog/whiskies/:id (atualizar)
- [ ] DELETE /catalog/whiskies/:id (arquivar, soft delete)
- [ ] Validação Zod para todos os schemas
- [ ] Cache Redis no GET (TTL 15min)
- [ ] Testes de cada endpoint

---

**TASK T-03.01.03** — API: Upload de imagens de whiskey
| Campo | Valor |
|-------|-------|
| Responsável | Backend Dev 2 |
| Estimativa | 5h |
| Sprint | 3 |

Subtasks:
- [ ] Configurar `@fastify/multipart`
- [ ] Validar tipo (jpg, png, webp) e tamanho (máx 5MB)
- [ ] Gerar thumbnail 300x300 (sharp.js)
- [ ] Upload para S3/R2 com path organizados por clube/whiskey
- [ ] Salvar URL no DB
- [ ] Endpoint DELETE para remover imagem
- [ ] Testes de upload

---

**TASK T-03.01.04** — API: Busca full-text
| Campo | Valor |
|-------|-------|
| Responsável | Backend Dev 2 |
| Estimativa | 4h |
| Sprint | 3 |

Subtasks:
- [ ] Criar função PostgreSQL para full-text search (pt e en)
- [ ] Endpoint GET /catalog/search?q=texto
- [ ] Indexar: nome, destilaria, notas de degustação
- [ ] Ordenar por relevância (ts_rank)
- [ ] Testar com dados em pt-BR e en-US
- [ ] Benchmarking de performance da query

---

### Feature F-03.02: Flutter — Telas do Catálogo

**TASK T-03.02.01** — CatalogBloc e Repository
| Campo | Valor |
|-------|-------|
| Responsável | Flutter Dev 1 |
| Estimativa | 6h |
| Sprint | 3 |

Subtasks:
- [ ] `CatalogRepository` com métodos: getWhiskies, getWhiskey, searchWhiskies
- [ ] `CatalogBloc` com estados: Loading, Loaded, Error, Empty
- [ ] `FilterState` para gerenciar filtros ativos
- [ ] Cache local com Hive (whisky list TTL 30min)
- [ ] Injeção de dependências

---

**TASK T-03.02.02** — Tela de Catálogo (CatalogPage)
| Campo | Valor |
|-------|-------|
| Responsável | Flutter Dev 1 |
| Estimativa | 8h |
| Sprint | 3 |

Subtasks:
- [ ] Grid 2 colunas de WhiskeyCards com lazy loading
- [ ] Barra de busca com debounce 300ms
- [ ] Bottom sheet de filtros
- [ ] Chips de filtros ativos
- [ ] Pull-to-refresh
- [ ] Estado vazio e estado de erro
- [ ] Scroll position mantida ao voltar da tela de detalhe
- [ ] Widget tests

---

**TASK T-03.02.03** — Tela de Detalhe do Whiskey (WhiskeyDetailPage)
| Campo | Valor |
|-------|-------|
| Responsável | Flutter Dev 1 |
| Estimativa | 8h |
| Sprint | 3 |

Subtasks:
- [ ] Hero animation na imagem ao navegar do card
- [ ] Galeria de fotos com PageView
- [ ] Seção de ficha técnica com ícones
- [ ] Roda de sabores (notas de degustação) — widget customizado
- [ ] Lista de avaliações dos membros
- [ ] Botão favorito com animação
- [ ] Seção "Eventos com este whiskey"
- [ ] Widget tests

---

## ÉPICO EP-05: Pagamentos e Assinaturas

### Feature F-05.01: Integração de Pagamento

**TASK T-05.01.01** — Configurar gateway de pagamento (Stripe/Asaas)
| Campo | Valor |
|-------|-------|
| Responsável | Backend Dev 1 |
| Estimativa | 8h |
| Sprint | 5 |

Subtasks:
- [ ] Criar conta e obter chaves API do gateway
- [ ] Configurar webhooks no dashboard do gateway
- [ ] Endpoint de recebimento de webhooks (POST /webhooks/payment)
- [ ] Verificação de assinatura do webhook
- [ ] Handler para eventos: payment_success, payment_failed, subscription_cancelled
- [ ] Testes com webhook.site e modo de teste do gateway

---

**TASK T-05.01.02** — Fluxo de criação de assinatura
| Campo | Valor |
|-------|-------|
| Responsável | Backend Dev 1 |
| Estimativa | 8h |
| Sprint | 5 |

Subtasks:
- [ ] POST /subscriptions (criar assinatura)
  - Criar customer no gateway
  - Criar subscription no gateway
  - Retornar client_secret para o app completar o pagamento
- [ ] Webhook handler: ativar membro após pagamento confirmado
- [ ] E-mail de boas-vindas após ativação
- [ ] Teste E2E do fluxo completo com dados de teste

---

**TASK T-05.01.03** — Gestão de assinatura
| Campo | Valor |
|-------|-------|
| Responsável | Backend Dev 1 |
| Estimativa | 6h |
| Sprint | 5 |

Subtasks:
- [ ] GET /subscriptions/:id (status atual)
- [ ] POST /subscriptions/:id/cancel
- [ ] POST /subscriptions/:id/pause
- [ ] POST /subscriptions/:id/upgrade (muda de plano)
- [ ] GET /subscriptions/:id/invoices (histórico)
- [ ] Webhook: renovação automática mensal
- [ ] Webhook: falha no pagamento → notificação + grace period 3 dias

---

## Template de Task (Usar para novas tasks)

```markdown
**TASK T-XX.XX.XX** — [Nome da Task]
| Campo | Valor |
|-------|-------|
| Responsável | [Papel] |
| Estimativa | Xh |
| Sprint | N |
| Dependências | T-XX.XX.XX, [outro] |

Subtasks:
- [ ] Subtask 1
- [ ] Subtask 2
- [ ] Testes
```

---

## Backlog Resumido por Sprint

### Sprint 1 (Total: ~60h)
- T-01.01.01 a T-01.01.06 (Auth Backend) — 24h
- T-01.02.01 a T-01.02.04 (Auth Flutter) — 21h
- T-DB.01 (Schema inicial) — 6h
- T-DEV.01 (CI/CD base) — 8h

### Sprint 2 (Total: ~65h)
- T-02.01.01 a T-02.01.05 (Clubs API) — 25h
- T-02.02.01 a T-02.02.03 (Dashboard Flutter) — 20h
- T-DB.02 (Schema clubs + members) — 5h

### Sprint 3 (Total: ~68h)
- T-03.01.01 a T-03.01.04 (Catalog API) — 21h
- T-03.02.01 a T-03.02.03 (Catalog Flutter) — 22h
- T-03.03 (Design telas catálogo) — 10h
- T-QA.03 (Testes catálogo) — 8h
- T-DB.03 (Índices e otimização) — 7h

### Sprint 4 (Total: ~70h)
- T-04.01 a T-04.05 (Events API) — 26h
- T-04.06 a T-04.09 (Events Flutter) — 24h
- T-04.10 (QR Code check-in) — 8h
- T-QA.04 (Testes eventos) — 12h

### Sprint 5 (Total: ~70h)
- T-05.01.01 a T-05.01.03 (Payments) — 22h
- T-05.02 (Flutter checkout) — 20h
- T-QA.05 (Testes pagamentos) — 16h
- T-SEC.01 (Revisão de segurança) — 12h

---

*Documento mantido pelo Tech Lead (agent-tl) + PO (agent-po). Versão 1.0.*
