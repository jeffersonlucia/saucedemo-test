# Sistema Multi-agente — Whiskey Club

Esta pasta define **quem são os agentes**, **como se coordenam**, **o que cada um pode/deve fazer** e **como fazem hand-off entre si**.

## Arquivos

- [`orchestration.md`](orchestration.md) — modelo de orquestração (quem dispara quem, como).
- [`workflows.md`](workflows.md) — fluxos canônicos por tipo de trabalho.
- [`personas/*.md`](personas/) — uma persona por agente, com chapéu, prompt-base, ferramentas, entregáveis e contratos.

## Princípios

1. **Um chapéu por agente, sempre**. Nada de "agente faz tudo". Sobrecarga de chapéus = entrega ruim.
2. **Contratos > conversas**. Hand-off é um artefato (PR, ticket, doc), não uma conversa.
3. **Humano é o A da matriz RACI nas decisões irreversíveis**.
4. **Paralelizável por construção**: se duas tasks não dependem, dois agentes do mesmo papel rodam em paralelo.
5. **Cliente-Sim é cidadão de primeira classe**: valida antes de marcar Done, e dá feedback estruturado.
6. **Tudo loga**: cada agente registra ação, artefato gerado e próximos passos no quadro Notion.

## Como começar

Para iniciar a Fase 0 com agentes:

1. Provisionar o repo real (extrair `whiskey-club/`).
2. Importar `planning/notion-import/` no Notion.
3. Rodar o **agente PM** com prompt-base de `personas/pm.md` e contexto = este repo.
4. O PM dispara, na ordem do roadmap, **BA → UX/UI → Tech Lead → DBA → DevOps**.
5. Em paralelo, **Tech Writer** começa a estruturar a base de docs.
6. **Cliente-Sim Dono** já participa do refinamento; **Cliente-Sim Sócio** entra na primeira história "ponta-a-ponta".

## Convenções de comunicação entre agentes

- **Issue/ticket** no Notion para cada unidade de trabalho.
- **PR no GitHub** para cada entregável de código/doc, com descrição padronizada.
- **Comentários em PRs** seguem template (`@papel-do-revisor`: pedido / questionamento / aprovação).
- **Hand-off explícito**: cada PR/ticket termina com seção `Next steps for: <papel>`.

## Anti-padrões a evitar

- Agente fazendo design e implementação ao mesmo tempo na mesma feature.
- Tech Lead bypassando o PM em priorização.
- Cliente-Sim sendo consultado depois do código pronto.
- Mais de 1 Tech Lead simultâneo (rachadura arquitetural).
- QA escrevendo testes só do happy path.
