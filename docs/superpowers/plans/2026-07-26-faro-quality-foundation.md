# Faro Energia Quality Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma fundação reproduzível de testes, acessibilidade e performance para a landing Faro Energia antes da implementação visual.

**Architecture:** Vitest e Testing Library cobrirão unidades e componentes em JSDOM. Playwright executará o build de produção em projetos desktop, mobile, sem JavaScript e performance mobile; uma fixture automática transformará erros de console e página em falhas. Lighthouse CI e budgets CDP aplicarão os limites definidos no OpenSpec.

**Tech Stack:** Vitest 4, Testing Library, JSDOM, Playwright 1.62, axe-core, Lighthouse CI 0.15, Next.js 16.

---

### Task 1: Registrar scripts e dependências de qualidade

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `.gitignore`

- [x] **Step 1: Instalar ferramentas somente como dependências de desenvolvimento**

Run:

```powershell
npm.cmd install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test @axe-core/playwright @lhci/cli
```

Expected: instalação concluída e nenhuma ferramenta de teste adicionada a `dependencies`.

- [x] **Step 2: Adicionar scripts independentes**

Adicionar exatamente:

```json
{
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "test:e2e:smoke": "playwright test tests/e2e/foundation.spec.ts",
  "test:lighthouse": "npm run build && lhci autorun",
  "test:quality": "npm run lint && npm run typecheck && npm run test && npm run build"
}
```

Playwright controlará seu próprio servidor de produção; o script Lighthouse gerará o build antes da auditoria.

- [x] **Step 3: Ignorar artefatos locais**

Adicionar `coverage/`, `playwright-report/`, `test-results/`, `artifacts/` e `.lighthouseci/` ao `.gitignore`.

### Task 2: Configurar testes unitários e de componentes

**Files:**

- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `tests/unit/button.test.tsx`

- [x] **Step 1: Configurar JSDOM e alias TypeScript**

Usar `resolve.tsconfigPaths` nativo do Vite, ambiente `jsdom`, setup file e padrões restritos a `tests/unit/**/*.test.{ts,tsx}`.

- [x] **Step 2: Criar setup do DOM**

Importar os matchers de `@testing-library/jest-dom/vitest`.

- [x] **Step 3: Escrever smoke test acessível**

Renderizar `Button` e localizar a ação por role e nome acessível.

- [x] **Step 4: Executar o teste**

Run:

```powershell
npm.cmd run test
```

Expected: teste do botão aprovado.

### Task 3: Configurar Playwright contra produção

**Files:**

- Create: `playwright.config.ts`
- Create: `tests/e2e/fixtures.ts`
- Create: `tests/e2e/foundation.spec.ts`
- Create: `tests/e2e/no-javascript.spec.ts`

- [x] **Step 1: Configurar projetos isolados**

Criar projetos `desktop-chromium`, `mobile-chromium`, `no-javascript` e `performance-mobile`. Os dois primeiros executam a suíte funcional; os demais selecionam somente seus arquivos. Usar `baseURL: "http://127.0.0.1:3100"`, trace em retry e o servidor `npm run build && npm run start -- --hostname 127.0.0.1 --port 3100`, aguardando a mesma URL.

- [x] **Step 2: Criar fixture de console**

Coletar eventos `console` de nível `error` e `pageerror`; após cada teste, falhar com a lista completa se houver qualquer item.

Todos os specs E2E deverão importar `test` e `expect` dessa fixture estendida, nunca diretamente de `@playwright/test`.

- [x] **Step 3: Criar smoke test sem espera arbitrária**

Navegar para `/`, verificar `main`, conteúdo inicial não vazio e ausência de overflow horizontal.

- [x] **Step 4: Criar gate sem JavaScript**

No projeto com `javaScriptEnabled: false`, verificar que o landmark principal e seu conteúdo textual continuam disponíveis.

### Task 4: Integrar acessibilidade e budgets

**Files:**

- Create: `tests/e2e/accessibility.spec.ts`
- Create: `tests/e2e/performance-budgets.ts`
- Create: `tests/e2e/performance-budget.spec.ts`
- Create: `docs/quality/wcag-2.2-aa-checklist.md`
- Create: `lighthouserc.js`

- [x] **Step 1: Criar gate axe**

Executar `AxeBuilder` na página inteira e exigir lista vazia de violações, com relatório legível em caso de falha.

- [x] **Step 2: Versionar checklist manual WCAG 2.2 AA**

Cobrir teclado, foco, zoom, reflow, contraste, movimento, alvos de toque, mensagens, leitores de tela e conteúdo não automatizável. Marcar itens como pendentes até a landing final.

- [x] **Step 3: Medir bytes transferidos via CDP**

Com cache desativado, somar `encodedDataLength` de scripts de mesma origem e medir a maior imagem raster visível acima da dobra. Aplicar limites de 170 KB e 180 KB, respectivamente. O limite de JavaScript foi calibrado após o build vazio do Next.js 16.2.12 medir 147.657 bytes.

- [x] **Step 4: Configurar Lighthouse CI mobile**

Configurar:

- `url: ["http://127.0.0.1:3100"]`
- `chromePath: chromium.executablePath()` usando o Chromium versionado pelo Playwright
- `startServerCommand: "npm run start -- --hostname 127.0.0.1 --port 3100"`
- `startServerReadyPattern: "Ready"`
- `startServerReadyTimeout: 120000`
- `numberOfRuns: 3`
- `upload.target: "filesystem"`
- `upload.outputDir: "./artifacts/lighthouse"`

Exigir Performance >= 0,95; Accessibility, Best Practices e SEO = 1; LCP <= 2500 ms; TBT <= 200 ms; CLS <= 0,1.

### Task 5: Verificar o checkpoint

**Files:**

- Modify: `openspec/changes/build-faro-conversion-landing/tasks.md`
- Modify: `docs/superpowers/plans/2026-07-26-faro-quality-foundation.md`

- [x] **Step 1: Instalar Chromium do Playwright**

Run:

```powershell
npx.cmd playwright install chromium
```

Expected: navegador disponível para a suíte.

- [x] **Step 2: Executar verificações rápidas**

Run:

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run test
npm.cmd run build
```

Expected: todos os comandos com exit code 0.

- [x] **Step 3: Executar Playwright**

Run:

```powershell
npm.cmd run test:e2e
```

Expected: projetos desktop, mobile, sem JavaScript e performance aprovados, sem erros de console.

- [x] **Step 4: Executar Lighthouse CI**

Run:

```powershell
npm.cmd run test:lighthouse
```

Expected: todas as categorias e métricas dentro dos gates.

- [x] **Step 5: Validar OpenSpec e worktree**

Run:

```powershell
npx.cmd openspec validate build-faro-conversion-landing --strict
git diff --check
git status --short
```

Expected: OpenSpec válido e apenas alterações deste checkpoint.

- [x] **Step 6: Atualizar rastreamento**

Marcar tarefas OpenSpec 2.1–2.7 e todos os passos deste plano como concluídos somente após as verificações correspondentes.

- [x] **Step 7: Parar para commit do usuário**

Não criar commit. Sugerir:

```bash
git add .
git commit -m "test: establish Faro quality gates"
```
