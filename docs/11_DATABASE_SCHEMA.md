# 11 — Schema do Banco de Dados: WhiskeyCLUB

**Responsável**: DBA (agent-dba)  
**Stack**: PostgreSQL 16 + Prisma ORM  
**Estratégia**: Multi-tenant com Row Level Security (RLS)

---

## 1. Schema ERD (Texto)

```
CLUBS ──────────────────────────────────────────────────────────
  id (PK, UUID)
  slug (UNIQUE) ← URL-friendly name
  name
  description
  logo_url
  primary_color / secondary_color ← tema visual
  plan_tier (starter/growth/pro/enterprise)
  status (active/suspended/cancelled)
  owner_id (FK → users)
  created_at / updated_at

USERS ───────────────────────────────────────────────────────────
  id (PK, UUID)
  email (UNIQUE)
  password_hash
  name / avatar_url
  birth_date ← 18+ verificação
  phone
  role (super_admin/club_owner/club_admin/sommelier/member)
  email_verified (bool)
  status (active/inactive/suspended)
  created_at / updated_at

CLUB_MEMBERS ────────────────────────────────────────────────────
  id (PK, UUID)
  club_id (FK → clubs)
  user_id (FK → users)
  role (owner/admin/sommelier/premium_member/free_member)
  status (active/inactive/suspended)
  joined_at
  ← INDEX (club_id, user_id) UNIQUE
  ← RLS by club_id

SUBSCRIPTION_PLANS ──────────────────────────────────────────────
  id (PK, UUID)
  club_id (FK → clubs)
  name (ex: "Premium", "VIP")
  description
  price_cents (integer, ex: 18900 = R$189,00)
  currency (BRL)
  billing_interval (monthly/annual)
  features (JSONB) ← lista de benefícios
  is_active (bool)
  max_members (nullable)
  trial_days (nullable)

SUBSCRIPTIONS ───────────────────────────────────────────────────
  id (PK, UUID)
  club_id (FK → clubs) ← RLS
  member_id (FK → club_members)
  plan_id (FK → subscription_plans)
  status (active/past_due/cancelled/trialing/paused)
  current_period_start (date)
  current_period_end (date)
  cancelled_at (nullable)
  gateway_subscription_id ← Stripe/Asaas ID
  gateway_customer_id
  created_at / updated_at

PAYMENTS ────────────────────────────────────────────────────────
  id (PK, UUID)
  club_id (FK → clubs) ← RLS
  subscription_id (FK → subscriptions)
  member_id (FK → club_members)
  amount_cents (integer)
  currency (BRL)
  status (pending/succeeded/failed/refunded)
  payment_method (card/pix/boleto)
  gateway_payment_id
  paid_at (nullable)
  receipt_url (nullable)
  created_at

DISTILLERIES ────────────────────────────────────────────────────
  id (PK, UUID)
  name
  country
  region
  description
  founded_year (nullable)
  website_url (nullable)
  image_url (nullable)
  created_at

WHISKIES ────────────────────────────────────────────────────────
  id (PK, UUID)
  club_id (FK → clubs) ← RLS
  distillery_id (FK → distilleries, nullable)
  name
  full_name
  type (single_malt/blended/bourbon/rye/irish/japanese/other)
  country
  region (nullable)
  age_years (nullable)
  abv (DECIMAL 4,1) ← ex: 46.0
  vintage_year (nullable)
  series_edition (nullable, ex: "Batch 7")
  
  -- Notas de degustação (sommelier)
  tasting_color TEXT
  tasting_nose TEXT
  tasting_palate TEXT
  tasting_finish TEXT
  sommelier_score (DECIMAL 3,1) ← 0-100
  
  -- Preços e disponibilidade
  market_price_cents (nullable)
  club_price_cents (nullable)
  in_stock (bool, default true)
  
  -- Metadados
  description TEXT
  status (active/draft/archived)
  
  -- Full text search
  search_vector TSVECTOR ← índice GIN
  
  created_at / updated_at
  ← INDEX GIN (search_vector)

WHISKEY_IMAGES ──────────────────────────────────────────────────
  id (PK, UUID)
  whiskey_id (FK → whiskies)
  url
  thumbnail_url
  sort_order (int)
  is_primary (bool)
  created_at

WHISKEY_REVIEWS ─────────────────────────────────────────────────
  id (PK, UUID)
  club_id (FK → clubs) ← RLS
  whiskey_id (FK → whiskies)
  member_id (FK → club_members)
  rating (int, 1-5)
  review_text (TEXT, nullable)
  created_at / updated_at
  ← INDEX UNIQUE (whiskey_id, member_id) ← um review por membro por whiskey

EVENTS ──────────────────────────────────────────────────────────
  id (PK, UUID)
  club_id (FK → clubs) ← RLS
  title
  description TEXT
  event_type (in_person/online/hybrid)
  status (draft/published/cancelled/completed)
  
  -- Data e local
  starts_at (TIMESTAMPTZ)
  ends_at (TIMESTAMPTZ)
  location_name (nullable)
  location_address (nullable)
  online_url (nullable)
  
  -- Capacidade
  max_capacity (nullable)
  is_waitlist_enabled (bool, default false)
  
  -- Preço
  price_cents (int, default 0) ← 0 = gratuito
  
  -- Imagem
  cover_image_url (nullable)
  
  created_by (FK → club_members)
  created_at / updated_at

EVENT_LINEUP ────────────────────────────────────────────────────
  id (PK, UUID)
  event_id (FK → events)
  whiskey_id (FK → whiskies)
  sort_order (int)
  notes TEXT (nullable) ← nota do sommelier para este whiskey neste evento

EVENT_REGISTRATIONS ─────────────────────────────────────────────
  id (PK, UUID)
  club_id (FK → clubs) ← RLS
  event_id (FK → events)
  member_id (FK → club_members)
  status (registered/waitlisted/cancelled/checked_in)
  qr_code_token (VARCHAR 64, UNIQUE) ← para check-in
  registered_at
  checked_in_at (nullable)
  payment_id (FK → payments, nullable) ← se evento pago

MEMBER_POINTS ───────────────────────────────────────────────────
  id (PK, UUID)
  club_id (FK → clubs) ← RLS
  member_id (FK → club_members)
  points (int) ← positivo = ganho, negativo = resgate
  reason (review/check_in/referral/bonus/redeemed)
  reference_id (UUID, nullable) ← ID do review, evento, etc.
  created_at
  ← VIEW: member_points_balance (SUM por membro)

MEMBER_TASTED_WHISKIES ──────────────────────────────────────────
  id (PK, UUID)
  club_id (FK → clubs)
  member_id (FK → club_members)
  whiskey_id (FK → whiskies)
  event_id (FK → events, nullable)
  tasted_at
  ← INDEX UNIQUE (member_id, whiskey_id)

NOTIFICATIONS ───────────────────────────────────────────────────
  id (PK, UUID)
  club_id (FK → clubs)
  member_id (FK → club_members)
  type (event_reminder/new_event/payment_due/welcome/etc.)
  title
  body TEXT
  data JSONB ← deep link data
  read_at (nullable)
  sent_at
  created_at

NOTIFICATION_PREFERENCES ────────────────────────────────────────
  id (PK, UUID)
  member_id (FK → club_members) UNIQUE
  push_enabled (bool, default true)
  email_enabled (bool, default true)
  event_reminders (bool, default true)
  new_events (bool, default true)
  payment_alerts (bool, default true)
  marketing (bool, default false)
  quiet_hours_start (TIME, nullable) ← ex: 22:00
  quiet_hours_end (TIME, nullable)   ← ex: 08:00

MEMBER_FCM_TOKENS ───────────────────────────────────────────────
  id (PK, UUID)
  member_id (FK → club_members)
  token TEXT UNIQUE
  platform (ios/android/web)
  created_at / last_used_at
```

---

## 2. Prisma Schema Completo

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum ClubStatus {
  active
  suspended
  cancelled
}

enum ClubPlanTier {
  starter
  growth
  pro
  enterprise
}

model Club {
  id              String      @id @default(uuid())
  slug            String      @unique
  name            String
  description     String?
  logoUrl         String?     @map("logo_url")
  primaryColor    String?     @map("primary_color")
  secondaryColor  String?     @map("secondary_color")
  planTier        ClubPlanTier @default(starter) @map("plan_tier")
  status          ClubStatus  @default(active)
  ownerId         String      @map("owner_id")
  createdAt       DateTime    @default(now()) @map("created_at")
  updatedAt       DateTime    @updatedAt @map("updated_at")

  // Relations
  owner                User                   @relation("ClubOwner", fields: [ownerId], references: [id])
  members              ClubMember[]
  subscriptionPlans    SubscriptionPlan[]
  whiskies             Whiskey[]
  events               Event[]
  notifications        Notification[]

  @@map("clubs")
}

enum UserRole {
  super_admin
  club_owner
  club_admin
  sommelier
  member
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String?   @map("password_hash")
  name          String
  avatarUrl     String?   @map("avatar_url")
  birthDate     DateTime? @map("birth_date")
  phone         String?
  emailVerified Boolean   @default(false) @map("email_verified")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  // Relations
  ownedClubs    Club[]       @relation("ClubOwner")
  clubMemberships ClubMember[]

  @@map("users")
}

enum MemberRole {
  owner
  admin
  sommelier
  premium_member
  free_member
}

enum MemberStatus {
  active
  inactive
  suspended
}

model ClubMember {
  id        String       @id @default(uuid())
  clubId    String       @map("club_id")
  userId    String       @map("user_id")
  role      MemberRole   @default(free_member)
  status    MemberStatus @default(active)
  joinedAt  DateTime     @default(now()) @map("joined_at")

  club              Club                    @relation(fields: [clubId], references: [id])
  user              User                    @relation(fields: [userId], references: [id])
  subscriptions     Subscription[]
  reviews           WhiskeyReview[]
  eventRegistrations EventRegistration[]
  pointsHistory     MemberPoint[]
  tastedWhiskies    MemberTastedWhisky[]
  notifications     Notification[]
  notificationPrefs NotificationPreference?
  fcmTokens         MemberFcmToken[]

  @@unique([clubId, userId])
  @@map("club_members")
}

model Whiskey {
  id              String         @id @default(uuid())
  clubId          String         @map("club_id")
  distilleryId    String?        @map("distillery_id")
  name            String
  fullName        String         @map("full_name")
  type            WhiskeyType
  country         String
  region          String?
  ageYears        Int?           @map("age_years")
  abv             Decimal        @db.Decimal(4, 1)
  vintageYear     Int?           @map("vintage_year")
  seriesEdition   String?        @map("series_edition")
  tastingColor    String?        @map("tasting_color")
  tastingNose     String?        @map("tasting_nose")
  tastingPalate   String?        @map("tasting_palate")
  tastingFinish   String?        @map("tasting_finish")
  sommelierScore  Decimal?       @db.Decimal(3, 1) @map("sommelier_score")
  marketPriceCents Int?          @map("market_price_cents")
  clubPriceCents  Int?           @map("club_price_cents")
  inStock         Boolean        @default(true) @map("in_stock")
  description     String?
  status          WhiskeyStatus  @default(draft)
  createdAt       DateTime       @default(now()) @map("created_at")
  updatedAt       DateTime       @updatedAt @map("updated_at")

  club            Club               @relation(fields: [clubId], references: [id])
  distillery      Distillery?        @relation(fields: [distilleryId], references: [id])
  images          WhiskeyImage[]
  reviews         WhiskeyReview[]
  eventLineup     EventLineupItem[]
  tastedBy        MemberTastedWhisky[]

  @@map("whiskies")
}

enum WhiskeyType {
  single_malt
  blended_malt
  blended
  bourbon
  rye
  irish
  japanese
  other
}

enum WhiskeyStatus {
  active
  draft
  archived
}

model Event {
  id              String      @id @default(uuid())
  clubId          String      @map("club_id")
  title           String
  description     String?
  eventType       EventType   @map("event_type")
  status          EventStatus @default(draft)
  startsAt        DateTime    @map("starts_at")
  endsAt          DateTime?   @map("ends_at")
  locationName    String?     @map("location_name")
  locationAddress String?     @map("location_address")
  onlineUrl       String?     @map("online_url")
  maxCapacity     Int?        @map("max_capacity")
  isWaitlistEnabled Boolean   @default(false) @map("is_waitlist_enabled")
  priceCents      Int         @default(0) @map("price_cents")
  coverImageUrl   String?     @map("cover_image_url")
  createdById     String      @map("created_by")
  createdAt       DateTime    @default(now()) @map("created_at")
  updatedAt       DateTime    @updatedAt @map("updated_at")

  club            Club                  @relation(fields: [clubId], references: [id])
  lineup          EventLineupItem[]
  registrations   EventRegistration[]

  @@map("events")
}

enum EventType {
  in_person
  online
  hybrid
}

enum EventStatus {
  draft
  published
  cancelled
  completed
}
```

---

## 3. Índices Críticos de Performance

```sql
-- Full text search para whiskies
CREATE INDEX idx_whiskies_search ON whiskies USING GIN(search_vector);

-- Trigger para atualizar search_vector automaticamente
CREATE TRIGGER tsvector_update BEFORE INSERT OR UPDATE
  ON whiskies FOR EACH ROW EXECUTE PROCEDURE
  tsvector_update_trigger(search_vector, 'pg_catalog.portuguese',
    name, full_name, tasting_nose, tasting_palate, tasting_finish, description);

-- Índices para queries frequentes
CREATE INDEX idx_club_members_club ON club_members(club_id, status);
CREATE INDEX idx_whiskies_club_status ON whiskies(club_id, status);
CREATE INDEX idx_events_club_starts ON events(club_id, starts_at) WHERE status = 'published';
CREATE INDEX idx_subscriptions_member ON subscriptions(member_id, status);
CREATE INDEX idx_payments_subscription ON payments(subscription_id, created_at DESC);
CREATE INDEX idx_notifications_member_unread ON notifications(member_id, created_at DESC) WHERE read_at IS NULL;
```

---

## 4. Row Level Security (Multi-tenant)

```sql
-- Função helper para pegar o clube atual da sessão
CREATE OR REPLACE FUNCTION current_club_id() RETURNS UUID AS $$
  SELECT current_setting('app.current_club_id', true)::UUID;
$$ LANGUAGE sql STABLE;

-- Aplicar RLS em todas as tabelas de dados
ALTER TABLE whiskies ENABLE ROW LEVEL SECURITY;
CREATE POLICY club_isolation ON whiskies
  FOR ALL USING (club_id = current_club_id());

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY club_isolation ON events
  FOR ALL USING (club_id = current_club_id());

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY club_isolation ON subscriptions
  FOR ALL USING (club_id = current_club_id());

-- Super admin bypassa o RLS
CREATE ROLE app_super_admin;
ALTER TABLE whiskies FORCE ROW LEVEL SECURITY;
-- app_super_admin tem BYPASSRLS

-- No código do backend, antes de qualquer query:
await prisma.$executeRaw`SET app.current_club_id = ${clubId}`;
```

---

## 5. Views Úteis

```sql
-- Saldo de pontos por membro
CREATE VIEW member_points_balance AS
  SELECT
    club_id,
    member_id,
    SUM(points) AS balance,
    COUNT(*) AS total_transactions
  FROM member_points
  GROUP BY club_id, member_id;

-- Estatísticas do clube (para dashboard)
CREATE VIEW club_stats AS
  SELECT
    c.id AS club_id,
    COUNT(DISTINCT cm.id) FILTER (WHERE cm.status = 'active') AS active_members,
    COUNT(DISTINCT s.id) FILTER (WHERE s.status = 'active') AS active_subscriptions,
    SUM(sp.price_cents) FILTER (WHERE s.status = 'active') AS mrr_cents,
    COUNT(DISTINCT w.id) FILTER (WHERE w.status = 'active') AS active_whiskies,
    COUNT(DISTINCT e.id) FILTER (WHERE e.starts_at > NOW() AND e.status = 'published') AS upcoming_events
  FROM clubs c
  LEFT JOIN club_members cm ON cm.club_id = c.id
  LEFT JOIN subscriptions s ON s.club_id = c.id
  LEFT JOIN subscription_plans sp ON sp.id = s.plan_id
  LEFT JOIN whiskies w ON w.club_id = c.id
  LEFT JOIN events e ON e.club_id = c.id
  GROUP BY c.id;
```

---

*Documento mantido pelo DBA (agent-dba). Versão 1.0.*
