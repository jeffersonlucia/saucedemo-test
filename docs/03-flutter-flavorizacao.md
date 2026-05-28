# 03 - Flutter flavorizacao por cliente e unidade

## Objetivo

Permitir que o mesmo codigo Flutter entregue experiencias diferentes por cliente e unidade, sem criar forks do produto.

## Conceitos

| Conceito | Descricao |
| --- | --- |
| Tenant | Cliente contratante, por exemplo "Whiskey House" |
| Unit | Unidade fisica ou operacional do tenant |
| Flavor | Build/configuracao de app, por exemplo `whiskey_house_prod` |
| Brand | Identidade visual aplicada ao app |
| Feature flag | Habilita/desabilita modulo por tenant/unidade |

## Estrategia recomendada

### Camada 1 - Build flavor

Usar flavors para ambientes e clientes que precisam app publicado separado.

Exemplos:

- `dev`
- `staging`
- `prod`
- `whiskey_house_prod`
- `oak_club_prod`

### Camada 2 - Configuracao remota por tenant

Mesmo com flavor, carregar configuracao dinamica do backend:

- Nome do clube.
- Logos.
- Cores.
- Unidades.
- Features habilitadas.
- Textos institucionais.
- Links de suporte e termos.

### Camada 3 - Unidade ativa

Depois do login, o usuario escolhe ou recebe uma unidade ativa. A unidade define:

- Agenda local.
- Estoque local.
- Timezone.
- Endereco.
- Regras de reserva.
- Capacidade de eventos.

## Estrutura sugerida

```text
apps/member_app/
  lib/
    main.dart
    bootstrap/
    core/
    features/
    flavor/
      app_flavor.dart
      app_config.dart
      brand_config.dart
  assets/
    brands/
      default/
      whiskey_house/
      oak_club/
  flavors/
    dev.json
    staging.json
    prod.json
    whiskey_house_prod.json
```

## Exemplo de config JSON

```json
{
  "flavor": "whiskey_house_prod",
  "environment": "production",
  "tenantSlug": "whiskey-house",
  "apiBaseUrl": "https://api.whiskeyclubos.com",
  "brand": {
    "name": "Whiskey House",
    "primaryColor": "#B87935",
    "secondaryColor": "#1D120C",
    "accentColor": "#F4C67A",
    "logoAsset": "assets/brands/whiskey_house/logo.png"
  },
  "features": {
    "events": true,
    "inventoryPreview": true,
    "marketplace": false,
    "guestInvites": true
  }
}
```

## Uso de dart-define

```bash
flutter run \
  --flavor whiskey_house_prod \
  --dart-define=APP_CONFIG=flavors/whiskey_house_prod.json
```

## Padrao de carregamento

1. App inicia com config de build.
2. Busca config remota do tenant.
3. Mescla configs com precedencia:
   - Defaults do app.
   - Config do flavor.
   - Config remota do tenant.
   - Config da unidade ativa.
4. Aplica tema e feature flags.

## Design system

O design system deve aceitar tokens dinamicos:

- Color tokens: primary, secondary, surface, background, success, warning, danger.
- Typography tokens: font family, title scale, body scale.
- Radius tokens: cards, buttons, inputs.
- Spacing tokens: base grid.
- Component tokens: card style, button style, navigation style.

Evitar componentes com cores fixas fora do design system.

## Feature flags

Feature flags devem ser avaliadas em:

- Navegacao: esconder menus indisponiveis.
- Rotas: bloquear acesso direto.
- Backend: negar operacoes desabilitadas.
- Analytics: registrar uso por feature.

## Quando criar app separado

Criar app publicado separado quando:

- Cliente exige marca propria na loja.
- Cliente tem contrato enterprise.
- Politica comercial justifica custo de manutencao.
- Ha necessidade de push, links e termos isolados.

Usar app unico quando:

- Cliente e piloto ou SMB.
- Marca propria no app nao e essencial.
- O clube aceita selecionar/codigo do clube no primeiro acesso.

## Checklist para novo cliente

1. Criar tenant no backend.
2. Cadastrar unidades.
3. Subir assets de marca.
4. Definir cores e textos.
5. Definir features habilitadas.
6. Criar flavor se houver app dedicado.
7. Rodar smoke test visual.
8. Rodar testes de isolamento tenant.
9. Gerar build staging.
10. Validar com cliente simulador/dono.

## Antipadroes a evitar

- Criar branch por cliente.
- Copiar telas para customizar texto/cor.
- Hardcode de tenant_id no app.
- Feature flag apenas no front sem enforcement no backend.
- Assets sem fallback default.
- Publicar app cliente sem pipeline automatizado.
