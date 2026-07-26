# Faro Energia Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a fundação Next.js da landing Faro Energia na raiz existente, com shadcn/ui, Zod, estrutura de domínio e build limpo.

**Architecture:** A aplicação usará Next.js App Router com Server Components por padrão. O scaffold será gerado em diretório temporário porque a raiz já contém OpenSpec; somente arquivos conhecidos serão movidos para a raiz. shadcn/ui fornecerá primitivas acessíveis, enquanto seções e features permanecerão separadas por domínio.

**Tech Stack:** Next.js 16.2.12, React 19.2.4 (versão fixada pelo scaffold), TypeScript, Tailwind CSS 4.3.3, shadcn/ui, Zod 4.4.3, npm, Node.js >= 20.9.

---

### Task 1: Gerar scaffold Next.js sem sobrescrever OpenSpec

**Files:**

- Create: `package.json`
- Create: `package-lock.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `postcss.config.mjs`
- Create: `next-env.d.ts`
- Create: `.gitignore`
- Create: `AGENTS.md`
- Create: `CLAUDE.md`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `public/*`
- Preserve: `openspec/**`

- [x] **Step 1: Confirmar que destinos do scaffold não existem**

Run:

```powershell
'package.json','package-lock.json','next.config.ts','tsconfig.json','eslint.config.mjs','postcss.config.mjs','next-env.d.ts','.gitignore','README.md','AGENTS.md','CLAUDE.md','src','public' |
  ForEach-Object { [pscustomobject]@{ Path = $_; Exists = Test-Path -LiteralPath $_ } }
```

Expected: todos os destinos retornam `Exists: False`.

- [x] **Step 2: Gerar template sem instalar ou criar Git interno**

Run:

```powershell
npx.cmd create-next-app@latest faro-energia-scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --empty --skip-install --disable-git --yes
```

Expected: diretório `faro-energia-scaffold` criado com template Next.js.

- [x] **Step 3: Validar caminhos absolutos antes da movimentação**

Run:

```powershell
$scaffoldRoot = (Resolve-Path -LiteralPath '.\faro-energia-scaffold').Path
$projectRoot = (Resolve-Path -LiteralPath '.').Path
$scaffoldRoot.StartsWith($projectRoot, [System.StringComparison]::OrdinalIgnoreCase)
```

Expected: `True`.

- [x] **Step 4: Mover somente arquivos conhecidos para a raiz**

Run:

```powershell
$fileAllowlist = @(
  '.gitignore',
  'AGENTS.md',
  'CLAUDE.md',
  'README.md',
  'eslint.config.mjs',
  'next-env.d.ts',
  'next.config.ts',
  'package.json',
  'postcss.config.mjs',
  'tsconfig.json'
)
$directoryAllowlist = @('src')

foreach ($name in $fileAllowlist + $directoryAllowlist) {
  $source = Join-Path $scaffoldRoot $name
  $target = Join-Path $projectRoot $name

  if (-not (Test-Path -LiteralPath $source)) {
    throw "Scaffold source missing: $source"
  }

  if (Test-Path -LiteralPath $target) {
    throw "Destination already exists: $target"
  }

  Move-Item -LiteralPath $source -Destination $target
}

$remaining = Get-ChildItem -LiteralPath $scaffoldRoot -Force
if ($remaining.Count -gt 0) {
  throw "Unexpected scaffold files remain: $($remaining.Name -join ', ')"
}

Remove-Item -LiteralPath $scaffoldRoot
```

Não mover ou remover `openspec/`, `.codex/`, `.git/` ou `docs/`.

Expected: diretório temporário vazio e estrutura OpenSpec intacta.

### Task 2: Fixar identidade do pacote e instalar dependências

**Files:**

- Modify: `package.json`
- Create: `package-lock.json`

- [x] **Step 1: Alterar nome e engine**

Aplicar:

```json
{
  "name": "faro-energia-landing",
  "engines": {
    "node": ">=20.9.0"
  }
}
```

Preservar scripts e versões gerados pelo CLI.

- [x] **Step 2: Instalar dependências do scaffold**

Run:

```powershell
npm.cmd install
```

Expected: lockfile criado e instalação sem erro.

- [x] **Step 3: Instalar Zod**

Run:

```powershell
npm.cmd install zod
```

Expected: `zod` em `dependencies`.

- [x] **Step 4: Confirmar versões**

Run:

```powershell
npm.cmd ls next react react-dom tailwindcss zod --depth=0
node --version
npm.cmd --version
```

Expected: Next.js 16.2.12, React/React DOM 19.2.4, Tailwind CSS 4.3.3, Zod 4.4.3, Node.js 24.18.0 e npm 12.0.1, sem pacote inválido ou ausente.

### Task 3: Inicializar shadcn/ui com conjunto mínimo

**Files:**

- Create: `components.json`
- Create: `src/lib/utils.ts`
- Modify: `src/app/globals.css`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/accordion.tsx`
- Create: `src/components/ui/field.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/select.tsx`
- Create: `src/components/ui/sheet.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`

- [x] **Step 1: Inicializar configuração padrão Nova**

Run:

```powershell
npx.cmd shadcn@latest init --defaults
```

Expected: `components.json`, tokens CSS e `src/lib/utils.ts` criados.

- [x] **Step 2: Consultar contexto e documentação da versão instalada**

Run:

```powershell
npx.cmd shadcn@latest info
$components = @('button', 'accordion', 'field', 'input', 'select', 'sheet')
foreach ($component in $components) {
  npx.cmd shadcn@latest docs $component
}
```

Expected: framework Next.js, Tailwind v4, RSC ativo e URLs oficiais dos componentes.

- [x] **Step 3: Adicionar apenas primitivas previstas**

Run:

```powershell
npx.cmd shadcn@latest add button accordion field input select sheet
```

Expected: seis componentes em `src/components/ui/`.

- [x] **Step 4: Ler arquivos adicionados**

Verificar composição, imports, base selecionada, biblioteca de ícones, `"use client"` e ausência de componentes extras sem uso previsto.

### Task 4: Criar fronteiras de domínio

**Files:**

- Create: `src/components/sections/.gitkeep`
- Create: `src/features/savings-estimator/.gitkeep`
- Create: `src/features/lead-form/.gitkeep`
- Create: `src/content/.gitkeep`
- Create: `public/.gitkeep`
- Create: `docs/architecture/foundation.md`

- [x] **Step 1: Criar diretórios previstos no design**

Criar os quatro diretórios de domínio e `public/` com `.gitkeep`. O template `--empty` atual não gera `public/`. `src/components/ui/` e `src/lib/` já serão mantidos por arquivos reais.

- [x] **Step 2: Documentar dependências e fronteiras Server/Client**

Criar `docs/architecture/foundation.md` com:

- Server Components como padrão em `app/` e `components/sections/`.
- `"use client"` permitido somente em folhas interativas de `features/` ou componentes shadcn que exigem browser APIs/eventos.
- Proibição de importar módulos cliente em conteúdo/configuração estática.
- `content/` contendo somente dados serializáveis e tipados.
- `lib/` contendo utilitários puros ou server-only claramente nomeados.
- Função e motivo de `next`, `react`, `react-dom`, `zod` e dependências introduzidas pelo shadcn/ui.
- Registro de que Motion não foi instalado nesta etapa.

### Task 5: Verificar e registrar checkpoint OpenSpec

**Files:**

- Modify: `openspec/changes/build-faro-conversion-landing/tasks.md`

- [x] **Step 1: Rodar lint**

Run:

```powershell
npm.cmd run lint
```

Expected: exit code 0.

- [x] **Step 2: Rodar build**

Run:

```powershell
npm.cmd run build
```

Expected: exit code 0 e rota `/` gerada.

- [x] **Step 3: Confirmar worktree**

Run:

```powershell
git status --short
git diff --check
```

Expected: somente scaffold, plano e atualizações OpenSpec pretendidas; sem erro de whitespace.

- [x] **Step 4: Marcar tarefas 1.1–1.6 concluídas**

Alterar os seis checkboxes iniciais do OpenSpec para `[x]`.

- [x] **Step 5: Parar para commit do usuário**

Não criar commit. Sugerir:

```bash
git add .
git commit -m "chore: scaffold Faro landing foundation"
```
