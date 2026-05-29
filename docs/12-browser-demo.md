# 12 - Demo navegavel no browser

## Objetivo

Transformar o `index.html` em uma demo viva do MVP Bar do Jao, usando apenas recursos de navegador.

## Como abrir

Abra `index.html` diretamente no navegador.

Opcionalmente, sirva localmente:

```bash
python3 -m http.server 8080
```

Depois acesse:

```text
http://localhost:8080
```

## O que a demo faz

- Roda sem backend.
- Persiste estado em `localStorage`.
- Permite resetar o seed demo.
- Permite exportar o estado atual em JSON.
- Simula endpoints principais em um painel "API fake".
- Mostra o produto em tres modos:
  - Admin.
  - Staff.
  - Membro.

## Modo Admin

Funcionalidades:

- Dashboard com membros ativos, receita mensal, eventos e no-show.
- Lista de membros.
- Cadastro de novo membro.
- Detalhe de membro.
- Alternar status de membro.
- Registrar uso de beneficio.
- Planos Silver, Gold e Black.
- Agenda administrativa.
- Criacao de evento.
- Lista de reservas.
- Produto Lab com feedback simulado do Jao e go/no-go demo.

## Modo Staff

Funcionalidades:

- Check-in por token QR demo.
- Bloqueio de check-in duplicado.
- Lista da porta.
- Busca rapida por membro.

Tokens demo:

- `BDJ-R1-BRUNO`
- `BDJ-R2-ANA`
- `BDJ-R3-BRUNO`

## Modo Membro

Funcionalidades:

- Home mobile simulada.
- Carteirinha Black.
- QR visual.
- Lista de eventos.
- Reserva de evento.
- Beneficios do plano.

## Fluxo recomendado para testar

1. Abrir `index.html`.
2. No modo Admin, cadastrar um novo membro.
3. Criar um evento.
4. Ir para o modo Membro e reservar um evento.
5. Ir para o modo Staff e fazer check-in usando o token QR.
6. Voltar para Admin e ver dashboard/reservas atualizados.
7. Exportar JSON para ver o estado atual.

## Limites conhecidos

- Nao ha autenticacao real.
- Nao ha API real conectada.
- Nao ha leitura real de camera para QR.
- Nao ha validacao Flutter.
- Os dados sao demo e ficam apenas no navegador.

## Por que isso importa

Esta demo permite validar experiencia e fluxo antes de terminar backend e Flutter:

- O dono entende o valor operacional.
- O staff testa check-in rapido.
- O membro entende carteira, beneficios e eventos.
- Produto e engenharia conseguem discutir contratos com base em comportamento visivel.
