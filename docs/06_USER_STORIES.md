# 06 — Histórias de Usuário: WhiskeyCLUB

**Responsável**: PO (agent-po)  
**Framework**: User Story Mapping  
**Formato**: Como [persona], quero [ação], para [benefício]

---

## Épico 1 — Autenticação e Onboarding

### US-001 — Cadastro de Membro
**Como** visitante do app,  
**Quero** me cadastrar com e-mail e senha,  
**Para** acessar os benefícios do clube.

**Critérios de Aceite:**
- [ ] O formulário valida e-mail (formato) e senha (mínimo 8 caracteres, 1 maiúscula, 1 número)
- [ ] O sistema envia e-mail de confirmação após cadastro
- [ ] O usuário não pode fazer login antes de confirmar o e-mail
- [ ] O cadastro falha com erro amigável se e-mail já existe
- [ ] O campo senha tem opção de mostrar/esconder
- [ ] O cadastro inclui aceite obrigatório dos Termos de Uso e Política de Privacidade (LGPD)

**Tamanho**: 5 pontos  
**Sprint**: 1

---

### US-002 — Login Social (Google)
**Como** membro,  
**Quero** entrar com minha conta Google,  
**Para** não precisar criar uma senha separada.

**Critérios de Aceite:**
- [ ] Botão "Entrar com Google" visível na tela de login
- [ ] Fluxo OAuth completo funciona no iOS e Android
- [ ] Ao usar login social pela primeira vez, perfil é criado automaticamente
- [ ] Login social e login por senha podem coexistir para o mesmo e-mail
- [ ] Se conta Google não tem foto, exibe avatar padrão

**Tamanho**: 5 pontos  
**Sprint**: 2

---

### US-003 — Redefinição de Senha
**Como** membro que esqueceu a senha,  
**Quero** redefinir minha senha via e-mail,  
**Para** recuperar acesso à minha conta.

**Critérios de Aceite:**
- [ ] Link "Esqueci minha senha" visível na tela de login
- [ ] E-mail de redefinição enviado em menos de 60 segundos
- [ ] Link de redefinição expira em 1 hora
- [ ] Após redefinição, usuário é redirecionado para login
- [ ] Senhas usadas recentemente não podem ser reutilizadas (últimas 3)

**Tamanho**: 3 pontos  
**Sprint**: 1

---

### US-004 — Onboarding do Novo Membro
**Como** novo membro,  
**Quero** passar por um onboarding guiado,  
**Para** entender os benefícios do clube e configurar meu perfil.

**Critérios de Aceite:**
- [ ] Onboarding de 3-5 telas apresenta funcionalidades principais
- [ ] Usuário pode pular o onboarding
- [ ] Onboarding coleta preferências de whiskey (tipo, região, intensidade)
- [ ] Foto de perfil pode ser adicionada no onboarding
- [ ] Onboarding só aparece uma vez (primeira sessão)
- [ ] Progresso do onboarding é salvo se usuário sair no meio

**Tamanho**: 8 pontos  
**Sprint**: 2

---

## Épico 2 — Catálogo de Whiskies

### US-010 — Navegar o Catálogo
**Como** membro,  
**Quero** navegar o catálogo de whiskies do clube,  
**Para** descobrir novas opções para degustar.

**Critérios de Aceite:**
- [ ] Catálogo exibe cards com foto, nome, destilaria e nota média
- [ ] Lista ordena por: mais recentes, melhor avaliados, ordem alfabética
- [ ] Catálogo funciona offline (dados em cache)
- [ ] Scroll infinito ou paginação com lazy loading
- [ ] Estado vazio exibe mensagem encorajadora

**Tamanho**: 8 pontos  
**Sprint**: 3

---

### US-011 — Filtrar e Buscar Whiskies
**Como** membro,  
**Quero** filtrar e buscar no catálogo,  
**Para** encontrar exatamente o whiskey que procuro.

**Critérios de Aceite:**
- [ ] Busca por nome, destilaria e notas de degustação
- [ ] Filtros: tipo (Single Malt, Blend, Bourbon...), país, faixa de preço, idade
- [ ] Filtros aplicados são exibidos como chips removíveis
- [ ] Resultados aparecem em tempo real (mínimo 300ms debounce)
- [ ] Número de resultados exibido
- [ ] "Limpar filtros" reseta todos os filtros

**Tamanho**: 8 pontos  
**Sprint**: 3

---

### US-012 — Ver Detalhe do Whiskey
**Como** membro,  
**Quero** ver a ficha técnica completa de um whiskey,  
**Para** aprender mais antes de uma degustação.

**Critérios de Aceite:**
- [ ] Tela exibe: foto em alta res, nome, destilaria, país, tipo, graduação, idade
- [ ] Notas de degustação do sommelier (cor, nariz, paladar, final)
- [ ] Pontuação média dos membros (estrelas + número de avaliações)
- [ ] Histórico: "Você provou isso em [evento]" (se aplicável)
- [ ] Botão "Adicionar aos Favoritos"
- [ ] Compartilhar whiskey (link ou screenshot)

**Tamanho**: 8 pontos  
**Sprint**: 3

---

### US-013 — Cadastrar Whiskey no Catálogo (Sommelier)
**Como** sommelier,  
**Quero** cadastrar um novo whiskey no catálogo,  
**Para** disponibilizá-lo para os membros.

**Critérios de Aceite:**
- [ ] Formulário com todos os campos da ficha técnica
- [ ] Upload de até 5 fotos por whiskey
- [ ] Validação de campos obrigatórios (nome, destilaria, tipo)
- [ ] Preview do card antes de publicar
- [ ] Possibilidade de salvar como rascunho
- [ ] Whiskey pode ser editado ou arquivado depois de criado

**Tamanho**: 8 pontos  
**Sprint**: 3

---

### US-014 — Avaliar Whiskey
**Como** membro,  
**Quero** avaliar e comentar um whiskey que provei,  
**Para** compartilhar minha experiência com o clube.

**Critérios de Aceite:**
- [ ] Avaliação de 1 a 5 estrelas
- [ ] Campo de texto para comentário (máx. 500 caracteres)
- [ ] Avaliação só disponível para whiskies que o membro já provou (ou evento que participou)
- [ ] Pode editar a própria avaliação
- [ ] Avaliações de outros membros visíveis em ordem de data
- [ ] Avaliação publicada adiciona pontos ao membro

**Tamanho**: 5 pontos  
**Sprint**: 6

---

## Épico 3 — Eventos e Degustações

### US-020 — Ver Eventos Disponíveis
**Como** membro,  
**Quero** ver os próximos eventos do clube,  
**Para** planejar minha participação.

**Critérios de Aceite:**
- [ ] Lista de eventos com data, hora, local, tipo (presencial/online)
- [ ] Cards mostram foto do evento, nome e vagas disponíveis
- [ ] Filtro por: próximos, passados, inscritos, abertos
- [ ] Eventos com lista de espera exibem "Lista de Espera"
- [ ] Eventos expirados não aparecem na lista padrão

**Tamanho**: 5 pontos  
**Sprint**: 4

---

### US-021 — Se Inscrever em Evento
**Como** membro,  
**Quero** me inscrever em um evento de degustação,  
**Para** garantir minha vaga.

**Critérios de Aceite:**
- [ ] Botão "Inscrever-se" na tela do evento
- [ ] Se evento é pago, redireciona para checkout antes de confirmar
- [ ] Se evento gratuito, inscrição imediata com confirmação
- [ ] E-mail de confirmação enviado após inscrição
- [ ] Vaga decrementada do total disponível
- [ ] Se sem vagas, botão vira "Entrar na lista de espera"
- [ ] Lembrete push enviado 24h antes do evento

**Tamanho**: 8 pontos  
**Sprint**: 4

---

### US-022 — Criar Evento (Admin)
**Como** administrador do clube,  
**Quero** criar um evento de degustação,  
**Para** convidar os membros.

**Critérios de Aceite:**
- [ ] Formulário: nome, descrição, data/hora, local, tipo, capacidade, valor (0 para grátis)
- [ ] Roteiro de degustação: selecionar whiskies do catálogo em ordem
- [ ] Preview do evento antes de publicar
- [ ] Evento pode ser publicado ou salvo como rascunho
- [ ] Após publicar, push notification enviada para todos os membros
- [ ] Evento pode ser editado antes de começar
- [ ] Cancelar evento notifica inscritos e reembolsa automaticamente

**Tamanho**: 13 pontos  
**Sprint**: 4

---

### US-023 — Check-in no Evento
**Como** membro presente em um evento,  
**Quero** fazer check-in via QR Code,  
**Para** registrar minha presença e acumular pontos.

**Critérios de Aceite:**
- [ ] App exibe QR Code único do membro na tela de "Meu Ingresso"
- [ ] Admin escaneia o QR Code com câmera do app ou dispositivo externo
- [ ] Check-in registra presença com timestamp
- [ ] Check-in bem-sucedido adiciona pontos ao membro
- [ ] Admin vê lista em tempo real de quem fez check-in
- [ ] Duplo check-in bloqueado com aviso

**Tamanho**: 8 pontos  
**Sprint**: 4

---

## Épico 4 — Assinaturas

### US-030 — Assinar Plano do Clube
**Como** visitante ou membro free,  
**Quero** assinar um plano do clube,  
**Para** ter acesso aos benefícios premium.

**Critérios de Aceite:**
- [ ] Tela compara planos com benefícios listados lado a lado
- [ ] Seleção do plano leva ao checkout
- [ ] Checkout aceita cartão de crédito e PIX
- [ ] Resumo do pedido antes de confirmar
- [ ] Após pagamento bem-sucedido: acesso imediato + e-mail de boas-vindas
- [ ] Cobrança recorrente automática na data de aniversário
- [ ] Trial de 7 dias disponível (se habilitado pelo clube)

**Tamanho**: 13 pontos  
**Sprint**: 5

---

### US-031 — Gerenciar Assinatura
**Como** membro com assinatura ativa,  
**Quero** visualizar e gerenciar minha assinatura,  
**Para** ter controle sobre meu plano e pagamentos.

**Critérios de Aceite:**
- [ ] Tela exibe: plano atual, próximo vencimento, histórico de pagamentos
- [ ] Opção de mudar de plano (upgrade/downgrade)
- [ ] Opção de cancelar assinatura (com confirmação e explicação do que perde)
- [ ] Cancelamento mantém acesso até fim do período pago
- [ ] Download de nota fiscal/recibo por período
- [ ] Opção de atualizar método de pagamento

**Tamanho**: 8 pontos  
**Sprint**: 5

---

## Épico 5 — Dashboard do Dono do Clube

### US-040 — Ver Dashboard de KPIs
**Como** dono do clube,  
**Quero** ver um dashboard com os principais indicadores do meu clube,  
**Para** tomar decisões de negócio com dados.

**Critérios de Aceite:**
- [ ] Dashboard exibe: membros ativos, MRR, novos membros no mês, churn
- [ ] Gráficos de evolução de membros e receita (últimos 3/6/12 meses)
- [ ] Lista dos próximos eventos com número de inscritos
- [ ] Top 5 whiskies mais populares do catálogo
- [ ] Alertas de inadimplência (membros com pagamento atrasado)
- [ ] Dashboard atualizado em tempo real (ou com botão de atualizar)

**Tamanho**: 13 pontos  
**Sprint**: 2

---

### US-041 — Gerenciar Membros (Admin)
**Como** administrador do clube,  
**Quero** gerenciar a lista de membros,  
**Para** ter controle sobre quem está no clube.

**Critérios de Aceite:**
- [ ] Lista de membros com foto, nome, plano, data de entrada, status
- [ ] Filtros: plano, status (ativo, inadimplente, cancelado), data de entrada
- [ ] Busca por nome ou e-mail
- [ ] Ação: enviar mensagem individual
- [ ] Ação: mudar plano manualmente
- [ ] Ação: bloquear/desbloquear acesso
- [ ] Exportar lista em CSV
- [ ] Perfil completo do membro ao clicar (histórico de pagamentos, eventos, avaliações)

**Tamanho**: 8 pontos  
**Sprint**: 2

---

## Épico 6 — Gamificação e Engajamento

### US-050 — Acumular e Ver Pontos
**Como** membro,  
**Quero** acumular pontos por minhas atividades no clube,  
**Para** ser recompensado pelo meu engajamento.

**Critérios de Aceite:**
- [ ] Saldo de pontos visível na home e no perfil
- [ ] Ações que geram pontos: avaliação (+10), check-in em evento (+20), indicação (+50)
- [ ] Histórico de pontos ganhos e redimidos
- [ ] Extrato de pontos com descrição de cada movimentação
- [ ] Notificação push ao ganhar pontos

**Tamanho**: 8 pontos  
**Sprint**: 6

---

### US-051 — Passaporte de Whiskies
**Como** membro,  
**Quero** ter um "passaporte" dos whiskies que já provei,  
**Para** acompanhar minha jornada e mostrar para os amigos.

**Critérios de Aceite:**
- [ ] Seção "Minha Coleção" com grid de whiskies provados
- [ ] Badge de conquista ao provar X whiskies (5, 10, 25, 50, 100)
- [ ] Estatísticas: países, regiões, tipos mais provados
- [ ] Possibilidade de compartilhar coleção em redes sociais (imagem gerada)
- [ ] Contagem de whiskies únicos provados

**Tamanho**: 8 pontos  
**Sprint**: 6

---

## Épico 7 — Notificações e Comunicação

### US-060 — Receber Notificações do Clube
**Como** membro,  
**Quero** receber notificações sobre eventos e novidades do clube,  
**Para** não perder nenhuma oportunidade.

**Critérios de Aceite:**
- [ ] Push notifications ativadas no onboarding (com permissão explícita)
- [ ] Tipos: novo evento, lembrete de evento, novo whiskey, promoção, pagamento
- [ ] Notificação tem deep link para o conteúdo relevante
- [ ] Centro de notificações in-app com histórico
- [ ] Badge no ícone do app para notificações não lidas

**Tamanho**: 8 pontos  
**Sprint**: 7

---

### US-061 — Configurar Preferências de Notificação
**Como** membro,  
**Quero** configurar quais notificações recebo,  
**Para** não ser incomodado com mensagens irrelevantes.

**Critérios de Aceite:**
- [ ] Tela de preferências com toggles por tipo de notificação
- [ ] Opção de desativar todas as notificações (manter push do SO ativo)
- [ ] Configuração de "não perturbe" por horário
- [ ] Preferências salvas e sincronizadas entre dispositivos

**Tamanho**: 3 pontos  
**Sprint**: 7

---

## Backlog de Features Futuras (Épicos Fase 2+)

| US-ID | História | Épico | Fase |
|-------|---------|-------|------|
| US-070 | Como membro, quero comprar kits na loja do clube | Loja | 2 |
| US-071 | Como admin, quero gerenciar estoque da loja | Loja | 2 |
| US-072 | Como membro, quero rastrear meu pedido | Loja | 2 |
| US-080 | Como dono, quero ver relatório de receita mensal | Analytics | 2 |
| US-081 | Como dono, quero exportar dados dos membros | Analytics | 2 |
| US-090 | Como membro, quero ver o app em inglês | I18n | 2 |
| US-100 | Como dono, quero personalizar as cores do app | Flavors Avançado | 2 |
| US-110 | Como membro, quero ver recomendações personalizadas | ML/IA | 3 |
| US-120 | Como membro, quero participar de degustações online | Streaming | 3 |

---

## Story Map Visual

```
ATIVIDADE:   Descobrir    Provar      Colecionar   Socializar    Pagar
             Whiskies     Juntos      Experiências  no Clube     pelo Clube
               │             │             │            │             │
JORNADA:     Catálogo     Eventos      Passaporte   Feed/Reviews  Assinatura
               │             │             │            │             │
RELEASES:
  MVP:       ✅ Cat.       ✅ Eventos   ✅ Coleção   ✅ Reviews   ✅ Pagto
  Fase 2:    🔧 Recom.    🔧 Online    🔧 Partilhar  🔧 Comunid.  🔧 Loja
  Fase 3:    🚀 IA        🚀 Stream    🚀 Mercado   🚀 Afiliados  🚀 Fiscal
```

---

*Documento mantido pelo PO (agent-po). Versão 1.0 — Sprint 0.*
