# Integrações Externas

| Integração | Provedor primário | Fallback | Uso | Onde fica o segredo |
|---|---|---|---|---|
| Pagamento cartão internacional | Stripe | — | Cobrança SaaS B2B + eventos avulsos B2C | Vault |
| Pagamento BR (cartão + boleto) | Asaas | Pagar.me | Mensalidade de sócio | Vault |
| Pix | Asaas/EFI direto | — | Eventos avulsos, mensalidade | Vault |
| Push iOS | APNs via FCM | — | Notificações | Per-flavor (credencial do clube) |
| Push Android | FCM | — | Notificações | Per-flavor |
| E-mail | Resend | SES | Transacional + marketing | Vault, domínio por clube |
| WhatsApp | Z-API | Twilio | Lembretes, recibos | Vault |
| SMS | Twilio | — | 2FA fallback | Vault |
| OAuth login | Apple, Google | — | Login social mobile | Vault |
| Storage | Cloudflare R2 | AWS S3 | Mídia | Vault |
| CDN | Cloudflare | — | Assets, imagens | Per-domain |
| Maps (futuro) | Google Maps | OpenStreetMap | Localização de unidades | Per-flavor key |
| Calendário (futuro) | Google Calendar | iCal export | "Adicionar ao calendário" | OAuth do sócio |

## Contratos de integração

Cada integração externa tem um **adapter** no backend que implementa uma porta (interface) do domínio. Trocar provedor = trocar adapter. Domínio nunca sabe que existe Stripe.

```typescript
// domain/billing/ports.ts
export interface PaymentGateway {
  charge(input: ChargeInput): Promise<ChargeResult>;
  refund(paymentId: string): Promise<RefundResult>;
}

// infra/billing/stripe-payment-gateway.ts
export class StripePaymentGateway implements PaymentGateway { ... }
```

## Webhooks recebidos

| Provedor | Endpoint | Eventos relevantes |
|---|---|---|
| Stripe | `/webhooks/stripe` | `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated` |
| Asaas | `/webhooks/asaas` | `PAYMENT_CONFIRMED`, `PAYMENT_OVERDUE` |
| Pix (banco) | `/webhooks/pix/:bank` | confirmação assíncrona |

Todos com:
- Validação de assinatura HMAC.
- Idempotência por `event_id`.
- Persistência em `webhook_events` antes do processamento (replay possível).

## Custos esperados (F1, projeção 5 clubes × 300 sócios)

| Item | $/mês estimado |
|---|---|
| Hosting backend (Render/Fly) | $80 |
| Postgres managed | $50 |
| Redis | $20 |
| S3 + CDN | $25 |
| Sentry | $30 |
| Resend | $20 |
| WhatsApp (Z-API) | $40 |
| Codemagic CI | $90 |
| Domínios (5 × $15/ano) | $7 |
| **Total** | **~ $360** |

Custo por sócio ativo: $360 / 1500 = **$0.24/mês** (alvo cumprido).
