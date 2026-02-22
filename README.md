# SauceDemo E2E Cypress Tests

[![CI - Cypress](https://github.com/jeffersonlucia/saucedemo-test/actions/workflows/cypress.yml/badge.svg?branch=main)](https://github.com/jeffersonlucia/saucedemo-test/actions/workflows/cypress.yml)

Automação de testes E2E para o site [SauceDemo](https://www.saucedemo.com/) usando Cypress 14.5.4.

## Testes

### Teste de Login (login.spec.js)
- Valida login como standard_user
- Verifica redirecionamento para /inventory.html
- Confirma exibição da página de produtos

### Teste de Fluxo de Compra (purchase.spec.js)
- Login como standard_user
- Adiciona 3 produtos ao carrinho (Backpack, Bike Light, Bolt T-Shirt)
- Valida badge do carrinho
- Preenche dados de checkout
- Finaliza a compra
- Valida mensagem de sucesso: "Thank you for your order!"

## Execução Local

### Pré-requisitos
- Node.js 20+
- npm 11+

### Instalação
```bash
npm install
```

### Rodar Testes
```bash
# Modo headless (sem UI)
npm run cypress:run

# Com interface interativa
npm run cypress:open
```

### Gerar Relatório
```bash
npx cypress run
npx mochawesome-report-generator cypress/reports/report.json -f report -p mochawesome-report
# Abrir: mochawesome-report/report.html
```

## CI/CD - GitHub Actions

- Trigger: Push para main ou Acessar aba Actions, clicar no workflow CI - Cypress-> Run workflow -> Run workflow dentro da main
- Ambiente: Ubuntu Latest + Node.js 20
- Reporter: Mochawesome (HTML + JSON)
- Artefatos: Salvos por 30 dias

### Acompanhar Execução
1. Acesse Actions no repositório
2. Clique em CI - Cypress (última execução)
3. Veja sumário com resulados dos testes
4. Artifacts: Baixe cypress-reports com relatório HTML completo


## Informações

- Cypress: 14.5.4 (última versão anterior a 15)
- Node: 20.x
- Linguagem: JavaScript
- Reporter: Mochawesome com relatórios HTML automáticos

## Debug

Para debug local:
```bash
npx cypress open
```
