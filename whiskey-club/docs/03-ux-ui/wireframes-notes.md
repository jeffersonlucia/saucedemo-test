# Notas para Wireframes / Mocks

Os mocks visuais ficam no Figma (link a ser criado pelo agente UI). Aqui registramos as decisões de layout que precedem os mocks.

## Convenções

- Frames: iPhone 15 (393×852), Android Pixel 7 (412×915), Web 1440.
- Grid: 4pt, 8 colunas no mobile, 12 colunas no web.
- Safe area sempre respeitada (notch, gesture bar).

## Telas críticas a desenhar primeiro (Fase 1)

1. **Splash** com logo do flavor.
2. **Onboarding** (3 telas swipeable, skipable).
3. **Login** + **Esqueci senha**.
4. **Home** do sócio.
5. **Carteirinha** (fullscreen, com QR rotativo).
6. **Eventos — lista**.
7. **Eventos — detalhe**.
8. **Confirmação de presença** (sucesso + ticket QR).
9. **Cellar do clube — lista** e **detalhe da garrafa**.
10. **Perfil** + **Preferências**.
11. **Backoffice — Sócios (lista)** e **detalhe do sócio**.
12. **Backoffice — Eventos (lista + calendário) e criação**.
13. **PDV — Modo evento** (lista de check-in + scan).
14. **Landing pública** + **Checkout guest**.

## Erros e estados vazios — não esquecer

Pra cada tela com dados: **loading skeleton**, **vazio**, **erro com retry**, **offline**.

## Animações-chave

- Splash → Home: cross-fade com leve scale.
- Carteirinha: QR rotaciona com easing suave a cada 60s.
- Confirmação de presença: micro-interação com whisky enchendo o copo (lottie pequena, opcional).

## Mock HTML como referência

Existe um `mocks/index.html` que serve como **referência visual estática** para o time alinhar identidade e layout antes do Figma. Não é o produto.
