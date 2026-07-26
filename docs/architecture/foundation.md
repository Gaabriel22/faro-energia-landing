# Fundação da aplicação

## Fronteiras Server e Client

- `src/app/` e `src/components/sections/` usam Server Components por padrão.
- `"use client"` fica restrito às folhas interativas em `src/features/` e às primitivas shadcn/ui que dependem de eventos, estado ou APIs do navegador.
- Componentes cliente não importam configuração estática, conteúdo inteiro ou módulos exclusivos do servidor. Recebem somente props serializáveis necessárias.
- `src/content/` contém dados estáticos, tipados e serializáveis; não contém estado, efeitos ou acesso ao navegador.
- `src/lib/` contém utilitários puros. Módulos exclusivos do servidor devem ter nome explícito e importar `server-only` quando forem criados.
- Não haverá store global. Estado permanece próximo da interação que o utiliza.

Essa divisão mantém a maior parte da landing renderizada no servidor e reduz JavaScript enviado ao navegador.

## Dependências de runtime

| Dependência | Função | Justificativa |
| --- | --- | --- |
| `next` | Framework, App Router, renderização, metadata e otimização de assets | Base arquitetural escolhida para a landing |
| `react` / `react-dom` | Modelo de componentes e renderização | Dependências obrigatórias do Next.js |
| `zod` | Validação compartilhada do simulador e formulário | Mantém contrato único no cliente e no servidor |
| `@base-ui/react` | Primitivas acessíveis usadas pelo preset shadcn Base Nova | Evita reimplementar comportamento complexo de accordion, select e sheet |
| `class-variance-authority` | Variantes tipadas de componentes | Usado pelos componentes shadcn instalados |
| `clsx` / `tailwind-merge` | Composição e resolução de classes | Implementam o helper `cn` do shadcn |
| `lucide-react` | Ícones SVG tree-shakeable | Biblioteca selecionada pelo preset |
| `@fontsource-variable/instrument-sans` | Arquivo WOFF2 variável para interface e corpo | Fonte local usada por `next/font/local`, sem requisição externa |
| `@fontsource/instrument-serif` | Arquivo WOFF2 estático para títulos editoriais | Fonte local usada por `next/font/local`, com um único peso |
| `shadcn` | Folha base importada por `shadcn/tailwind.css` durante o build | Requisito de desenvolvimento do preset Base Nova atual |
| `tw-animate-css` | Keyframes processados durante o build | Dependência de desenvolvimento instalada pelo preset |

Motion não foi instalado nesta etapa. Primeiro serão avaliadas animações CSS; a dependência só entra se trouxer ganho visual mensurável sem romper o orçamento de JavaScript.

## Baseline de segurança

O scaffold foi criado com as versões mais recentes disponíveis em 26 de julho de 2026. Após adicionar a infraestrutura de qualidade, a auditoria completa reportou 23 achados em ferramentas e runtime. `npm audit --omit=dev` reporta três vulnerabilidades altas: `next`, seu PostCSS interno e `sharp`. Os demais achados estão em CLIs de desenvolvimento, principalmente nas árvores de LHCI, shadcn e ESLint.

O npm sugere downgrade incompatível para Next.js 9.3.3, não uma correção segura, então nenhuma alteração automática foi aplicada. A auditoria será repetida na etapa de segurança e acompanhada até existir atualização compatível, sem usar `--force`.

## Build reproduzível

O scaffold deixou de usar `next/font/google` porque o download durante o build tornava CI e validações locais dependentes de rede. Instrument Sans variável e Instrument Serif 400 são carregadas de pacotes locais por `next/font/local`, gerando WOFF2 auto-hospedado sem requisição externa.
