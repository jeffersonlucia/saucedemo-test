# DevOps e CI/CD

## Ambientes

| Ambiente | Branch | Uso |
|----------|--------|-----|
| local | feature/* | desenvolvimento |
| dev | develop | integração contínua |
| staging | release/* | QA + UAT com cliente piloto |
| prod | main | produção |

## Pipeline (GitHub Actions)

### Monorepo jobs

1. **lint-api** — ESLint + tsc
2. **test-api** — Jest + Testcontainers (Postgres)
3. **lint-flutter** — `flutter analyze`
4. **test-flutter** — `flutter test`
5. **build-flavor-matrix** — `client_a`, `client_a_sp` APK/IPA (staging)
6. **deploy-api** — Docker → ECS/Cloud Run/Fly.io
7. **deploy-web-mock** — GitHub Pages para `mock/` (opcional)

### Secrets por flavor

```
CLIENT_A_ANDROID_KEYSTORE_BASE64
CLIENT_A_IOS_CERTIFICATE
STRIPE_SECRET_KEY_STAGING
DATABASE_URL_STAGING
```

## Infraestrutura sugerida (MVP)

| Componente | Opção econômica | Opção escala |
|------------|-----------------|--------------|
| API | Fly.io / Railway | AWS ECS Fargate |
| DB | Supabase / Neon | RDS PostgreSQL |
| CDN assets | Cloudflare R2 | S3 + CloudFront |
| Mobile distribuição | TestFlight + Play Internal | Stores públicas |

## Observabilidade

- **Logs:** structured JSON → Datadog ou Grafana Loki
- **APM:** OpenTelemetry
- **Erros mobile:** Sentry (por flavor com `environment` tag)
- **Uptime:** Better Uptime / Pingdom

## IaC

- Terraform modules: `infra/terraform/{env}/`
- Versionar junto ao repo quando API existir

## Checklist pré-lançamento

- [ ] Pen test básico (OWASP top 10 API)
- [ ] LGPD: política de privacidade + DPA
- [ ] Backup restore testado
- [ ] Rollback de migration documentado
