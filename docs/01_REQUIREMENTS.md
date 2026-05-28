# 01 — Requisitos do Sistema: WhiskeyCLUB

**Responsável**: Analista de Requisitos (agent-ra)  
**Revisado por**: PO (agent-po), Tech Lead (agent-tl)  
**Status**: Baseline v1.0

---

## 1. Requisitos Funcionais (RF)

### RF-001 — Autenticação e Controle de Acesso

| ID | Requisito | Prioridade | Persona |
|----|-----------|-----------|---------|
| RF-001.1 | O sistema deve permitir cadastro via e-mail e senha | Must Have | Todos |
| RF-001.2 | O sistema deve suportar login social (Google, Apple) | Should Have | Membros |
| RF-001.3 | O sistema deve ter autenticação de dois fatores (2FA) | Should Have | Admin |
| RF-001.4 | O sistema deve gerenciar sessões com JWT e refresh token | Must Have | Todos |
| RF-001.5 | O sistema deve ter controle de permissões por papel (RBAC) | Must Have | Todos |
| RF-001.6 | O sistema deve permitir redefinição de senha por e-mail | Must Have | Todos |
| RF-001.7 | O sistema deve ter logout em todos os dispositivos | Should Have | Todos |

**Papéis (Roles):**
- `super_admin` — gerencia plataforma inteira
- `club_owner` — gerencia seu clube
- `club_admin` — administrador secundário do clube
- `sommelier` — gerencia catálogo e degustações
- `member_premium` — membro com assinatura
- `member_free` — membro sem assinatura

---

### RF-002 — Gestão de Clube

| ID | Requisito | Prioridade | Persona |
|----|-----------|-----------|---------|
| RF-002.1 | O dono deve poder criar e configurar seu clube | Must Have | Club Owner |
| RF-002.2 | O sistema deve suportar personalização de marca (logo, cores, nome) | Must Have | Club Owner |
| RF-002.3 | O dono deve poder configurar planos de assinatura para membros | Must Have | Club Owner |
| RF-002.4 | O dono deve poder gerenciar administradores do clube | Should Have | Club Owner |
| RF-002.5 | O dono deve visualizar dashboard com KPIs do clube | Must Have | Club Owner |
| RF-002.6 | O sistema deve gerar relatórios de receita, churn, MRR | Should Have | Club Owner |
| RF-002.7 | O dono deve poder configurar notificações automáticas | Should Have | Club Owner |
| RF-002.8 | O sistema deve suportar múltiplas unidades por clube | Could Have | Club Owner |

**KPIs no Dashboard:**
- Total de membros ativos
- MRR (Monthly Recurring Revenue)
- Churn rate mensal
- Próximos eventos
- Pedidos pendentes
- Whiskies mais populares

---

### RF-003 — Catálogo de Whiskies

| ID | Requisito | Prioridade | Persona |
|----|-----------|-----------|---------|
| RF-003.1 | O sommelier deve poder cadastrar whiskies com ficha técnica completa | Must Have | Sommelier |
| RF-003.2 | O sistema deve suportar upload de imagens e fotos do rótulo | Must Have | Sommelier |
| RF-003.3 | O membro deve poder navegar o catálogo com filtros | Must Have | Member |
| RF-003.4 | O sistema deve ter busca full-text no catálogo | Should Have | Member |
| RF-003.5 | O membro deve poder avaliar e comentar whiskies | Should Have | Member |
| RF-003.6 | O sistema deve exibir notas de degustação do sommelier | Must Have | Member |
| RF-003.7 | O sistema deve sugerir whiskies baseado no histórico do membro | Could Have | Member |
| RF-003.8 | O catálogo deve ser acessível offline (cache local) | Should Have | Member |
| RF-003.9 | O sistema deve ter banco de dados de produtores e destilarias | Could Have | Sommelier |

**Ficha Técnica do Whiskey:**
- Nome completo, destilaria, país/região
- Tipo (Single Malt, Blend, Bourbon, etc.)
- Graduação alcoólica, idade, série/edição
- Notas de degustação (cor, nariz, paladar, final)
- Pontuação (interna e crítica especializada)
- Preço de mercado estimado
- Disponibilidade no clube

---

### RF-004 — Gestão de Membros

| ID | Requisito | Prioridade | Persona |
|----|-----------|-----------|---------|
| RF-004.1 | O admin deve poder visualizar lista completa de membros | Must Have | Club Admin |
| RF-004.2 | O admin deve poder aprovar/rejeitar novos membros | Should Have | Club Admin |
| RF-004.3 | O membro deve ter perfil com histórico de degustações | Must Have | Member |
| RF-004.4 | O sistema deve ter sistema de pontos e conquistas (gamificação) | Should Have | Member |
| RF-004.5 | O admin deve poder comunicar-se com membros individuais ou em grupo | Should Have | Club Admin |
| RF-004.6 | O sistema deve registrar palato do membro (preferências) | Could Have | Member |
| RF-004.7 | O sistema deve gerar "passaporte" de whiskies provados | Could Have | Member |
| RF-004.8 | O admin deve poder exportar lista de membros (CSV) | Should Have | Club Admin |

---

### RF-005 — Eventos e Degustações

| ID | Requisito | Prioridade | Persona |
|----|-----------|-----------|---------|
| RF-005.1 | O admin deve poder criar eventos de degustação | Must Have | Club Admin |
| RF-005.2 | O membro deve poder se inscrever em eventos | Must Have | Member |
| RF-005.3 | O sistema deve gerenciar capacidade e lista de espera | Should Have | Club Admin |
| RF-005.4 | O sistema deve enviar lembretes automáticos de eventos | Should Have | Member |
| RF-005.5 | O admin deve poder criar roteiros de degustação com whiskies | Must Have | Sommelier |
| RF-005.6 | O membro deve poder fazer check-in no evento via QR Code | Should Have | Member |
| RF-005.7 | O sistema deve registrar presença nos eventos | Should Have | Club Admin |
| RF-005.8 | Eventos devem suportar modalidade presencial e online (link) | Could Have | Club Admin |

---

### RF-006 — Assinaturas e Pagamentos

| ID | Requisito | Prioridade | Persona |
|----|-----------|-----------|---------|
| RF-006.1 | O membro deve poder assinar um plano do clube | Must Have | Member |
| RF-006.2 | O sistema deve processar pagamentos via cartão de crédito | Must Have | Member |
| RF-006.3 | O sistema deve suportar PIX como método de pagamento | Must Have | Member |
| RF-006.4 | O sistema deve gerar boletos bancários | Should Have | Member |
| RF-006.5 | O sistema deve gerenciar renovações automáticas | Must Have | Member |
| RF-006.6 | O sistema deve notificar sobre falhas no pagamento | Must Have | Member |
| RF-006.7 | O membro deve ter histórico de faturas/recibos | Must Have | Member |
| RF-006.8 | O admin deve gerenciar inadimplência e bloqueio de acesso | Should Have | Club Admin |
| RF-006.9 | O sistema deve calcular e repassar comissão da plataforma | Must Have | Super Admin |

---

### RF-007 — Loja (E-commerce)

| ID | Requisito | Prioridade | Persona |
|----|-----------|-----------|---------|
| RF-007.1 | O admin deve poder cadastrar produtos na loja (kits, garrafas, acessórios) | Should Have | Club Admin |
| RF-007.2 | O membro deve poder comprar produtos da loja | Should Have | Member |
| RF-007.3 | O sistema deve gerenciar estoque de produtos | Should Have | Club Admin |
| RF-007.4 | O sistema deve suportar carrinho de compras | Should Have | Member |
| RF-007.5 | O sistema deve integrar com Correios/transportadoras | Could Have | Club Admin |
| RF-007.6 | O membro deve poder rastrear seus pedidos | Could Have | Member |
| RF-007.7 | O sistema deve suportar kits mensais (subscription box) | Should Have | Member |

---

### RF-008 — Notificações

| ID | Requisito | Prioridade | Persona |
|----|-----------|-----------|---------|
| RF-008.1 | O sistema deve enviar push notifications via Firebase | Must Have | Member |
| RF-008.2 | O sistema deve enviar e-mails transacionais | Must Have | All |
| RF-008.3 | O admin deve poder enviar notificações em massa | Should Have | Club Admin |
| RF-008.4 | O membro deve poder configurar preferências de notificação | Should Have | Member |
| RF-008.5 | O sistema deve ter notificações in-app (sino) | Should Have | All |

---

## 2. Requisitos Não-Funcionais (RNF)

### RNF-001 — Performance

| ID | Requisito | Métrica |
|----|-----------|---------|
| RNF-001.1 | Tempo de carregamento inicial do app | < 3 segundos na rede 4G |
| RNF-001.2 | Tempo de resposta das APIs | < 500ms para 95% das requests |
| RNF-001.3 | Capacidade de carga simultânea | 1.000 usuários simultâneos |
| RNF-001.4 | Throughput das APIs | 100 req/seg por clube |
| RNF-001.5 | Tamanho do app (download) | < 50MB |

### RNF-002 — Disponibilidade e Confiabilidade

| ID | Requisito | Métrica |
|----|-----------|---------|
| RNF-002.1 | Uptime da plataforma | 99.5% (3.65h de downtime/ano) |
| RNF-002.2 | Backup dos dados | Diário, retido por 30 dias |
| RNF-002.3 | Recovery Time Objective (RTO) | < 4 horas |
| RNF-002.4 | Recovery Point Objective (RPO) | < 24 horas |

### RNF-003 — Segurança

| ID | Requisito | Detalhe |
|----|-----------|---------|
| RNF-003.1 | Criptografia em trânsito | TLS 1.3 obrigatório |
| RNF-003.2 | Criptografia em repouso | AES-256 para dados sensíveis |
| RNF-003.3 | Conformidade LGPD | Consentimento, portabilidade, exclusão |
| RNF-003.4 | Armazenamento de senhas | bcrypt, salt único por usuário |
| RNF-003.5 | Rate limiting | 100 req/min por IP |
| RNF-003.6 | Auditoria de acesso | Log de todas as ações admin |
| RNF-003.7 | Tokens JWT | Expiração 15min + refresh 7 dias |

### RNF-004 — Usabilidade

| ID | Requisito | Critério |
|----|-----------|---------|
| RNF-004.1 | Sistema de design consistente | Design system único por flavor |
| RNF-004.2 | Acessibilidade | WCAG 2.1 Nível AA |
| RNF-004.3 | Suporte a modo escuro | Dark/Light mode em todos os módulos |
| RNF-004.4 | Responsividade | iOS, Android, Web (tablet e desktop) |
| RNF-004.5 | Internacionalização | pt-BR obrigatório, en-US should have |

### RNF-005 — Escalabilidade

| ID | Requisito | Estratégia |
|----|-----------|-----------|
| RNF-005.1 | Arquitetura multi-tenant | Isolamento por schema no PostgreSQL |
| RNF-005.2 | Escala horizontal | Contêineres Docker + Kubernetes |
| RNF-005.3 | Cache distribuído | Redis para sessões e catálogo |
| RNF-005.4 | CDN para mídias | Cloudflare para imagens e assets |

### RNF-006 — Manutenibilidade

| ID | Requisito | Padrão |
|----|-----------|-------|
| RNF-006.1 | Cobertura de testes | ≥ 80% de cobertura unitária |
| RNF-006.2 | Documentação de API | OpenAPI 3.0 atualizada |
| RNF-006.3 | Versionamento de API | Versionamento semântico (/api/v1/) |
| RNF-006.4 | CI/CD automatizado | Deploy automático em staging |
| RNF-006.5 | Code review obrigatório | Mínimo 1 aprovação antes de merge |

---

## 3. Regras de Negócio (RN)

| ID | Regra |
|----|-------|
| RN-001 | Um membro só pode pertencer a um clube por conta (MVP) |
| RN-002 | O clube deve ter ao menos 1 plano ativo para aceitar membros pagantes |
| RN-003 | Membros free não têm acesso a eventos pagos |
| RN-004 | A plataforma retém 10% de todas as transações de assinatura |
| RN-005 | Whiskies com teor alcoólico devem exibir aviso de responsabilidade |
| RN-006 | Usuários menores de 18 anos não podem se cadastrar |
| RN-007 | Dados de pagamento nunca são armazenados no banco (tokenizados pelo gateway) |
| RN-008 | Cancelamento de assinatura mantém acesso até o fim do período pago |
| RN-009 | Um evento cancelado reembolsa automaticamente todos os inscritos |
| RN-010 | O estoque de um produto não pode ser negativo |

---

## 4. Critérios de Aceite Globais

- Todas as telas devem carregar em menos de 3 segundos
- Todas as ações destrutivas (deletar, cancelar) exigem confirmação
- Formulários devem validar campos antes de submissão
- Erros de API devem exibir mensagens amigáveis ao usuário
- Todas as flows de pagamento devem ter feedback visual de loading
- O app deve funcionar com dados em cache quando offline

---

*Documento mantido pelo Analista de Requisitos (agent-ra). Versão 1.0 — Baseline.*
