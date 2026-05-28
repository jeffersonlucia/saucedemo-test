# ADR 0002 - App Flutter unico com shells por persona

## Status

Aceita para o MVP.

## Contexto

O produto precisa atender dono, gerente, staff e membro final. O usuario escolheu um app Flutter unico para admin, cliente final e web. A alternativa seria separar app admin, app membro e painel web, mas isso aumentaria custo e orquestracao no MVP.

## Decisao

Implementar um unico app Flutter com shells por persona:

- Shell admin: dashboard, membros, planos, eventos, reservas, configuracoes.
- Shell staff: check-in, reservas do evento, busca de membro.
- Shell membro: home, eventos, carteirinha, beneficios e perfil.
- Web responsivo priorizando admin/gerente.
- Mobile priorizando membro e staff.

O app decide o shell por:

1. Config local do flavor.
2. Config remota do tenant.
3. Usuario autenticado.
4. Roles e unidades retornadas por `/v1/auth/me`.
5. Feature flags.

## Regras

- Flavor representa ambiente/cliente, nao persona.
- Usuario com multiplos papeis deve ter troca explicita de modo.
- A navegacao de admin e membro nao deve se misturar.
- Feature flag deve ser validada no front, guard de rota e backend.
- O app deve ter fallback visual caso config remota falhe.

## Consequencias positivas

- Menos repos/apps para manter.
- Design system unico.
- Publicacao inicial mais simples.
- Web e mobile compartilham dominio e contratos.

## Consequencias negativas

- Risco de navegacao confusa se o switch de modo for mal desenhado.
- Flutter web deve ser testado com cuidado em telas densas de administracao.
- Permissoes precisam estar muito bem refletidas na UI.

## Como validar

- Testar owner que tambem e membro.
- Testar staff fazendo check-in em mobile.
- Testar manager criando evento em web/tablet.
- Testar membro reservando evento em mobile.
- Testar feature flag escondendo e bloqueando modulo.
