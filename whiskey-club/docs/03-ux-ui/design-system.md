# Design System — "Cask"

> Codinome interno: **Cask DS**. É a base de UI compartilhada por todos os flavors. Cada flavor sobrescreve **tokens**, não componentes.

## Filosofia

- **Premium, escuro, com toque artesanal**. Whiskey é maturação, paciência, madeira, cobre.
- **Tipografia conta a história**: serifa elegante para títulos, sans neutra para corpo.
- **Densidade média**: somos um app de consumo, não um SaaS.
- **Acessibilidade desde o token**: contraste ≥ 4.5:1 sempre validado.

## Tokens (base, overridáveis por flavor)

### Cores (default flavor `clube_demo`)

| Token | Default | Uso |
|---|---|---|
| `color.bg.base` | `#0E0E10` | Fundo de tela |
| `color.bg.surface` | `#17171B` | Cards |
| `color.bg.surfaceAlt` | `#1F1F25` | Inputs, hover |
| `color.fg.primary` | `#F4F1EA` | Texto principal |
| `color.fg.secondary` | `#A7A39A` | Texto secundário |
| `color.fg.muted` | `#6D6A63` | Texto desabilitado |
| `color.accent` | `#C0A062` | Marca (whisky gold) |
| `color.accent.alt` | `#8A6A2E` | Hover/pressed |
| `color.success` | `#5BB572` | OK |
| `color.warning` | `#E2B341` | Aviso |
| `color.danger` | `#D85959` | Erro |
| `color.divider` | `#2A2A30` | Bordas |

### Tipografia

| Token | Família | Tamanho/Peso/Line |
|---|---|---|
| `type.display` | Playfair Display | 32 / 700 / 1.1 |
| `type.h1` | Playfair Display | 24 / 700 / 1.2 |
| `type.h2` | Playfair Display | 20 / 600 / 1.25 |
| `type.body` | Inter | 16 / 400 / 1.5 |
| `type.bodyStrong` | Inter | 16 / 600 / 1.5 |
| `type.caption` | Inter | 13 / 400 / 1.4 |
| `type.overline` | Inter | 11 / 600 / 1.6, tracking 0.08em, uppercase |

### Espaçamento (escala 4pt)

`space.0=0, space.1=4, space.2=8, space.3=12, space.4=16, space.5=24, space.6=32, space.7=48, space.8=64`

### Raio

`radius.sm=6, radius.md=12, radius.lg=20, radius.pill=999`

### Elevação

Sombras sutis (estamos no escuro):
`elev.1` (cards), `elev.2` (modais), `elev.3` (popovers).

### Motion

- `motion.snap`: 120ms ease-out (toggles)
- `motion.smooth`: 240ms ease-in-out (transições)
- `motion.epic`: 480ms easeOutCubic (entrada de tela)

## Primitivos

- **Button**: `primary | secondary | ghost | danger` × `sm | md | lg`. Estados: idle, hover, pressed, loading, disabled.
- **Input**: text, password, search, code (OTP), select, date.
- **Card**: surface com slot de header/body/footer.
- **Tag / Chip**: para filtros e atributos (região, idade).
- **Avatar**: foto + iniciais fallback.
- **Toast / Banner / Modal / Sheet**.
- **EmptyState**, **Skeleton**, **ErrorState**.

## Patterns (componentes de produto)

- **MembershipBadge**: carteirinha — foto, plano, QR rotativo.
- **EventCard**: data, título, tipo, vagas, CTA.
- **BottleCard**: foto, distillery, idade, tags de região/estilo, "provei" toggle.
- **FlightStrip**: sequência horizontal de garrafas do evento.
- **TastingNoteEditor**: editor com sliders (aroma, paladar, retrogosto) + texto.
- **OnboardingHero**: full-bleed com logo do flavor.

## Iconografia

- Lucide (com substituições temáticas: whisky tumbler, barrel, dropper).
- Sempre stroke 1.5, line cap round.

## Microcopy guidelines

- Tom: **respeitoso, informado, sem esnobismo**. Nunca tutorial demais, nunca cool-de-mais.
- Verbos no infinitivo nos CTAs ("Confirmar presença", "Adicionar ao cellar").
- Erros: o que aconteceu + o que fazer.

## Acessibilidade

- Todo componente tem semântica (Semantics widget) com label.
- Tamanho mínimo de toque: 44pt.
- Estados visíveis também por forma/ícone (não só cor).
- Suporte a Dynamic Type / Font Scale até 130%.

## Implementação Flutter

- Pacote interno `package:cask_ds`.
- `ThemeData` é gerada por uma função `buildTheme(FlavorConfig flavor)`.
- Storybook via `storybook_flutter` publicado em GH Pages por PR.
