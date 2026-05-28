# 12 — Design das APIs REST: WhiskeyCLUB

**Responsável**: Tech Lead (agent-tl) + Backend Devs  
**Padrão**: REST + OpenAPI 3.0  
**Versionamento**: /api/v1/  
**Auth**: Bearer JWT no header Authorization

---

## 1. Convenções

```
Base URL:    https://api.{clube}.whiskeyclub.app/api/v1
Auth:        Authorization: Bearer <access_token>
Content-Type: application/json
Timezone:    UTC (ISO 8601)
IDs:         UUID v4

Response de sucesso:
{
  "data": { ... },
  "meta": { "timestamp": "..." }  // opcional
}

Response de erro:
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "E-mail ou senha inválidos",
    "details": [...]  // opcional: erros de validação
  }
}

Paginação (padrão cursor-based):
GET /whiskies?limit=20&cursor=next_cursor_token
Response:
{
  "data": [...],
  "pagination": {
    "next_cursor": "abc123",
    "has_more": true,
    "total": 150  // opcional, pode ser caro
  }
}
```

---

## 2. Módulo Auth — /auth

### POST /auth/register
```yaml
description: Criar nova conta de membro
auth: não requerida
body:
  email: string (required, email format)
  password: string (required, min 8 chars)
  name: string (required)
  birthDate: string (required, ISO date, 18+)
  clubSlug: string (required) ← qual clube está se cadastrando
  acceptedTerms: boolean (required, must be true)

responses:
  201:
    data:
      id: uuid
      email: string
      name: string
      emailVerified: false
      message: "Verifique seu e-mail para ativar a conta"
  400: Validation errors
  409: "E-mail já cadastrado"
```

### POST /auth/login
```yaml
description: Autenticar usuário
auth: não requerida
body:
  email: string
  password: string

responses:
  200:
    data:
      accessToken: string (JWT, expira em 15min)
      refreshToken: string (expira em 7 dias)
      user:
        id: uuid
        email: string
        name: string
        avatarUrl: string | null
        role: enum
  401: "Credenciais inválidas"
  403: "E-mail não confirmado"
```

### POST /auth/refresh
```yaml
description: Renovar access token
auth: não requerida
body:
  refreshToken: string

responses:
  200:
    data:
      accessToken: string
      refreshToken: string (rotacionado)
  401: "Token inválido ou expirado"
```

### POST /auth/logout
```yaml
auth: requerida
body:
  refreshToken: string

responses:
  204: No content
```

### POST /auth/forgot-password
```yaml
auth: não requerida
body:
  email: string

responses:
  200:
    message: "Se o e-mail existe, enviaremos instruções"
  # Sempre retorna 200 para não expor quais e-mails existem
```

### POST /auth/reset-password
```yaml
auth: não requerida
body:
  token: string (do e-mail)
  password: string (nova senha)
  passwordConfirm: string

responses:
  200: "Senha redefinida com sucesso"
  400: "Token inválido, expirado ou senhas não conferem"
```

---

## 3. Módulo Catálogo — /catalog

### GET /catalog/whiskies
```yaml
description: Listar whiskies do clube (paginado)
auth: requerida (member+)
query:
  limit: int (default 20, max 100)
  cursor: string (paginação)
  sort: enum [recent, top_rated, alphabetical]
  type: enum [single_malt, blended, bourbon, ...]
  country: string
  min_abv: float
  max_abv: float
  in_stock: boolean

responses:
  200:
    data: Whiskey[]
    pagination: { next_cursor, has_more }
```

### GET /catalog/whiskies/search
```yaml
description: Busca full-text no catálogo
auth: requerida (member+)
query:
  q: string (required, min 2 chars)
  limit: int (default 20)

responses:
  200:
    data:
      - id, name, distillery, type, abv, imageUrl, rating
      - matchRank: float ← relevância
    meta:
      total: int
      query: string
```

### GET /catalog/whiskies/:id
```yaml
description: Detalhe completo de um whiskey
auth: requerida (member+)

responses:
  200:
    data:
      id, name, fullName, type, country, region
      distillery: { id, name, country, region }
      ageYears, abv, vintageYear, seriesEdition
      tastingColor, tastingNose, tastingPalate, tastingFinish
      sommelierScore
      images: [{ url, thumbnailUrl, isPrimary }]
      averageRating: float
      reviewCount: int
      myReview: Review | null ← review do membro logado
      reviews: Review[] ← últimas 10
      memberTasted: boolean ← membro já provou?
      isFavorited: boolean
```

### POST /catalog/whiskies
```yaml
description: Cadastrar novo whiskey
auth: requerida (sommelier+)
body:
  name: string (required)
  fullName: string
  type: WhiskeyType (required)
  country: string (required)
  distilleryId: uuid | null
  ageYears: int | null
  abv: float (required)
  tastingNose, tastingPalate, tastingFinish, tastingColor: string | null
  sommelierScore: float (0-100) | null
  description: string | null
  status: "draft" | "active"

responses:
  201: Whiskey object
  400: Validation errors
  403: Insufficient permissions
```

### PUT /catalog/whiskies/:id
```yaml
description: Atualizar whiskey
auth: requerida (sommelier+)
body: Partial<WhiskeyBody>
responses:
  200: Updated Whiskey
  404: Not found
```

### POST /catalog/whiskies/:id/images
```yaml
description: Upload de imagem
auth: requerida (sommelier+)
content-type: multipart/form-data
body:
  file: binary (jpg/png/webp, max 5MB)
  isPrimary: boolean

responses:
  201:
    data:
      id, url, thumbnailUrl, isPrimary
```

### POST /catalog/whiskies/:id/reviews
```yaml
description: Avaliar um whiskey
auth: requerida (member+)
body:
  rating: int (1-5, required)
  reviewText: string (max 500, nullable)

responses:
  201: Review object
  409: "Você já avaliou este whiskey"
  403: "Você precisa ter provado este whiskey"
```

---

## 4. Módulo Eventos — /events

### GET /events
```yaml
auth: requerida (member+)
query:
  status: enum [upcoming, past, all]
  limit, cursor

responses:
  200:
    data:
      - id, title, eventType, startsAt, endsAt
      - locationName, priceCents
      - coverImageUrl
      - registeredCount, maxCapacity
      - isRegistered: boolean ← membro está inscrito?
      - waitlistPosition: int | null
```

### GET /events/:id
```yaml
auth: requerida (member+)
responses:
  200:
    data:
      ...all event fields
      lineup:
        - sortOrder, whiskey: { id, name, type, imageUrl }
          notes: string | null (nota do sommelier)
      myRegistration: Registration | null
      registeredCount: int
```

### POST /events/:id/register
```yaml
description: Inscrever-se em evento
auth: requerida (member+)
body:
  {} (sem body, usa member do token)
  # Se evento pago: retorna payment intent para completar no app

responses:
  201 (gratuito):
    data:
      id, status: "registered", qrCodeToken
  200 (pago):
    data:
      paymentRequired: true
      clientSecret: string ← Stripe payment intent
      amount: int ← em centavos
  409: "Você já está inscrito"
  422: "Evento lotado" / "Evento não disponível"
```

### DELETE /events/:id/register
```yaml
description: Cancelar inscrição
auth: requerida (member+)
responses:
  204: Cancelled
  404: Not registered
```

### POST /events (admin)
```yaml
auth: requerida (club_admin+)
body:
  title, description, eventType (required)
  startsAt (required, ISO datetime)
  endsAt: datetime | null
  locationName, locationAddress: string | null
  onlineUrl: string | null
  maxCapacity: int | null
  isWaitlistEnabled: boolean
  priceCents: int (default 0)
  coverImageUrl: string | null
  lineupWhiskeyIds: uuid[] ← lista ordenada de whiskies

responses:
  201: Event object
```

### POST /events/:id/checkin (admin)
```yaml
auth: requerida (club_admin+)
body:
  qrCodeToken: string

responses:
  200:
    data:
      memberId, memberName, memberAvatar
      status: "checked_in"
      pointsEarned: 20
  404: "Token inválido"
  409: "Já fez check-in"
```

---

## 5. Módulo Assinaturas — /subscriptions

### GET /subscription-plans
```yaml
auth: requerida (member+)
responses:
  200:
    data:
      - id, name, description
      - priceCents, currency, billingInterval
      - features: string[]
      - trialDays: int | null
      - isCurrentPlan: boolean
```

### POST /subscriptions
```yaml
description: Criar nova assinatura
auth: requerida (member+)
body:
  planId: uuid (required)
  paymentMethod: enum [card, pix, boleto]

responses:
  201 (pix/boleto):
    data:
      subscriptionId: uuid
      paymentMethod: "pix"
      pixCode: string ← código copia e cola
      pixQrCode: string ← base64 imagem
      expiresAt: datetime
  200 (card):
    data:
      subscriptionId: uuid
      clientSecret: string ← Stripe setup intent
      requiresAction: true
```

### GET /subscriptions/current
```yaml
auth: requerida (member+)
responses:
  200:
    data:
      id, status, planId, plan: { name, priceCents }
      currentPeriodStart, currentPeriodEnd
      cancelAtPeriodEnd: boolean
  404: "Sem assinatura ativa"
```

### DELETE /subscriptions/current
```yaml
description: Cancelar assinatura
auth: requerida (member+)
body:
  reason: string (opcional)

responses:
  200:
    data:
      status: "cancelled"
      accessUntil: datetime ← acesso mantido até fim do período
```

### GET /subscriptions/invoices
```yaml
auth: requerida (member+)
query:
  limit: int (default 12)

responses:
  200:
    data:
      - id, amountCents, status
      - paidAt, receiptUrl
      - periodStart, periodEnd
```

---

## 6. Módulo Dashboard Admin — /admin

### GET /admin/dashboard/stats
```yaml
auth: requerida (club_admin+)
query:
  period: enum [30d, 90d, 12m]

responses:
  200:
    data:
      activeMembers: int
      mrrCents: int
      newMembersThisPeriod: int
      churnRate: float ← %
      upcomingEvents: int
      topWhiskies:
        - whiskey: { id, name }
          reviewCount: int, averageRating: float
      revenueHistory:
        - date, totalCents
      memberGrowth:
        - date, count
```

### GET /admin/members
```yaml
auth: requerida (club_admin+)
query:
  status: enum [active, inactive, suspended, all]
  plan: uuid (filter by plan)
  search: string
  limit, cursor

responses:
  200:
    data:
      - id, user: { name, email, avatarUrl }
        role, status, joinedAt
        subscription: { planName, status, nextPayment } | null
```

### PATCH /admin/members/:id
```yaml
auth: requerida (club_admin+)
body:
  status: MemberStatus | undefined
  role: MemberRole | undefined

responses:
  200: Updated ClubMember
```

---

## 7. Módulo Notificações — /notifications

### GET /notifications
```yaml
auth: requerida (member+)
query:
  unread_only: boolean
  limit: int (default 20)

responses:
  200:
    data:
      - id, type, title, body
      - readAt: datetime | null
      - data: object ← deep link info
      - createdAt
    meta:
      unreadCount: int
```

### POST /notifications/:id/read
```yaml
auth: requerida (member+)
responses:
  200: { readAt: datetime }
```

### POST /notifications/read-all
```yaml
auth: requerida (member+)
responses:
  200: { updated: int }
```

### GET /notifications/preferences
```yaml
auth: requerida (member+)
responses:
  200: NotificationPreferences object
```

### PUT /notifications/preferences
```yaml
auth: requerida (member+)
body: Partial<NotificationPreferences>
responses:
  200: Updated preferences
```

### POST /devices/fcm-token
```yaml
description: Registrar token FCM do dispositivo
auth: requerida (member+)
body:
  token: string
  platform: enum [ios, android, web]

responses:
  201: { id }
```

---

## 8. Códigos de Erro Padrão

| Código | HTTP | Descrição |
|--------|------|-----------|
| `VALIDATION_ERROR` | 400 | Dados de entrada inválidos |
| `INVALID_CREDENTIALS` | 401 | E-mail/senha incorretos |
| `EMAIL_NOT_VERIFIED` | 403 | Conta não confirmada |
| `UNAUTHORIZED` | 401 | Token ausente ou inválido |
| `FORBIDDEN` | 403 | Sem permissão para esta ação |
| `NOT_FOUND` | 404 | Recurso não encontrado |
| `ALREADY_EXISTS` | 409 | Conflito (e-mail já cadastrado, etc.) |
| `RATE_LIMITED` | 429 | Muitas requisições |
| `PAYMENT_REQUIRED` | 402 | Plano não permite este recurso |
| `INTERNAL_ERROR` | 500 | Erro interno do servidor |

---

## 9. Webhooks (Backend → Plataforma)

### POST /webhooks/stripe (ou /webhooks/asaas)

```yaml
description: Receber eventos de pagamento do gateway
auth: Webhook signature verification (X-Signature header)

events_handled:
  - payment_intent.succeeded → ativar membro
  - payment_intent.payment_failed → notificar membro
  - customer.subscription.deleted → cancelar acesso
  - customer.subscription.updated → atualizar plano
  - invoice.paid → registrar pagamento
  - invoice.payment_failed → iniciar grace period
```

---

*Documento mantido pelo Tech Lead (agent-tl). Versão 1.0.*
