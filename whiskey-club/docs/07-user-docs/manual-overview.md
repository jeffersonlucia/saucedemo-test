# Documentação de Usuário — Overview

Duas trilhas:

## 1. Manual do operador (B2B — dono, gerente, curador)

Estrutura proposta (hospedado em `help.whiskeyclub.app`, brandável por clube):

- **Começando**
  - Login e 2FA
  - Convidar equipe
  - Configurar planos
  - Configurar identidade visual (flavor)
- **Sócios**
  - Cadastrar e importar
  - Editar e suspender
  - Comunicar (e-mail, push, WhatsApp)
- **Eventos**
  - Criar, publicar, segmentar
  - Confirmar presença / lista de espera
  - Operar no PDV (tablet)
  - Encerrar e gerar relatório
- **Cellar**
  - Cadastrar garrafa
  - Notas do curador (markdown)
  - Compor flights
- **Financeiro**
  - Conciliar
  - Tratar cobrança falhada
- **Multi-unidade**
  - Adicionar unidade
  - Trocar entre unidades
- **Suporte**
  - Canais
  - SLA por plano

Formato: artigos curtos com prints + vídeos de 30–60s (criados via Loom).
Pesquisável (Algolia DocSearch).

## 2. Ajuda do sócio (B2C — dentro do app)

In-app help (sheet), sem precisar abrir browser:

- "Como uso minha carteirinha"
- "Confirmei presença e quero cancelar"
- "Esqueci minha senha"
- "Não recebi o boleto/pix"
- "Como atualizo meus dados"
- "Como saio do clube" (sim, importante ter este artigo)

E uma central de suporte por clube (e-mail + WhatsApp configurados pelo dono).

## Princípios de redação

- **Direto**: 1 problema = 1 página.
- **Mostrar**: prints e gifs, não muralhas de texto.
- **Cuidar do tom**: o sócio é premium; nada de "clica no botão verde".
- **i18n preparado** desde a estrutura.

## Quem mantém

- Agente **Tech Writer** mantém base ativa, consumindo:
  - Release notes (Conventional Commits → CHANGELOG → posts).
  - Tickets recorrentes do suporte.
  - Feedbacks dos agentes Cliente-Sim.
