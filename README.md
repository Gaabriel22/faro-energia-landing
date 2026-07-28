<div align="center">
  <img src="./src/app/icon.svg" alt="" width="72" height="72" />

# Faro Energia

Landing page de alta conversão para uma marca de energia solar voltada a
pequenos negócios.

**Next.js · React · TypeScript · Tailwind CSS · shadcn/ui**

</div>

> [!IMPORTANT]
> A Faro Energia é uma empresa fictícia criada exclusivamente para este projeto
> de portfólio. Marca, números, projetos, garantias, depoimentos, pessoas e
> imagens apresentados na interface não representam uma operação comercial real.

![Página completa da landing page Faro Energia](./docs/visual-review/desktop-full.jpg)

## Sobre o projeto

O projeto simula uma entrega real de marketing e engenharia frontend: identidade
visual autoral, narrativa de conversão, simulador de economia, captura
demonstrativa de lead, SEO técnico, acessibilidade, segurança e metas
mensuráveis de performance.

A jornada leva o visitante da proposta de valor até a solicitação de avaliação
técnica por meio de prova social, benefícios, estimativa financeira, processo,
projetos, garantias e respostas a objeções.

### Principais entregas

- Landing page responsiva entre 320 px e 2560 px.
- Simulador de economia com cálculo e validação testados.
- Formulário acessível com validação compartilhada e Server Action.
- Assets originais locais em AVIF e WebP, com variantes responsivas.
- Metadata, canonical, Open Graph, Twitter Card, sitemap, robots e JSON-LD.
- CSP e headers contra framing, MIME sniffing e permissões desnecessárias.
- Navegação por teclado, redução de movimento e conteúdo essencial sem JavaScript.
- Testes unitários, de componentes, end-to-end, axe e Lighthouse CI.

## Por que esta stack

| Tecnologia                   | Por que foi escolhida                                                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js App Router**       | Centraliza renderização estática, Server Components, metadata, imagens, fontes, sitemap, robots e headers. Isso mantém conteúdo indexável no HTML inicial e reduz código cliente. |
| **React 19**                 | Permite isolar estado somente no simulador e formulário, mantendo a composição editorial em componentes de servidor.                                                              |
| **TypeScript**               | Torna conteúdo, mídia, estados de formulário e contratos entre cliente e servidor verificáveis durante o build.                                                                   |
| **Tailwind CSS 4**           | Viabiliza um sistema visual próprio com tokens, responsividade e baixo custo de CSS. A saída atômica também favorece o CSS crítico inline no primeiro carregamento.               |
| **shadcn/ui**                | Fornece primitivas acessíveis cujo código permanece no projeto e pode ser adaptado à identidade da marca, sem impor um tema visual externo.                                       |
| **Zod**                      | Mantém uma única regra de validação e normalização para cliente e servidor, evitando contratos divergentes.                                                                       |
| **next/font + Fontsource**   | Entrega fontes auto-hospedadas, sem requisições a serviços externos e sem tornar o build dependente de rede.                                                                      |
| **Vitest + Testing Library** | Oferece feedback rápido para regras de negócio, componentes e estados acessíveis.                                                                                                 |
| **Playwright + axe-core**    | Valida fluxos reais, responsividade, teclado, JavaScript desativado, headers, budgets e acessibilidade em navegador.                                                              |
| **Lighthouse CI**            | Transforma SEO, acessibilidade e Core Web Vitals de intenção em gates reproduzíveis da build de produção.                                                                         |

## Arquitetura

```text
src/
├── app/                         rota, metadata e arquivos especiais
├── components/
│   ├── brand/                   identidade e SVGs
│   ├── layout/                  primitivas estruturais
│   ├── navigation/              header, menu e CTA móvel
│   ├── sections/                narrativa da landing
│   └── ui/                      primitivas shadcn/ui adaptadas
├── content/                     copy e mídia tipadas
├── features/
│   ├── lead-form/               schema, validação e Server Action
│   └── savings-estimator/       cálculo e interface do simulador
├── hooks/                       carregamento próximo à viewport
└── lib/                         SEO, JSON-LD, segurança e utilitários
```

A página principal é um Server Component. JavaScript cliente fica restrito às
interações que precisam de estado. Simulador e formulário são carregados apenas
quando se aproximam da viewport; o menu móvel usa enhancement progressivo
pequeno. Conteúdo estático, SEO e narrativa continuam disponíveis no HTML.

### Fluxo do formulário

```text
Formulário
   ↓
validação e normalização com Zod
   ↓
Server Action valida novamente
   ↓
resposta demonstrativa
   ↓
dados descartados
```

> [!CAUTION]
> O formulário não envia dados para e-mail, CRM, analytics ou banco de dados.
> Nenhuma informação pessoal é persistida ou registrada. Não use dados pessoais
> reais ao testar esta demonstração.

## Qualidade verificada

Resultado da auditoria local de produção em **28 de julho de 2026**, usando
Chromium mobile com throttling do DevTools:

| Métrica                     |            Resultado |      Gate |
| --------------------------- | -------------------: | --------: |
| Lighthouse Performance      |               **97** |      ≥ 95 |
| Lighthouse Accessibility    |              **100** |       100 |
| Lighthouse Best Practices   |              **100** |       100 |
| Lighthouse SEO              |              **100** |       100 |
| LCP                         |           **1,44 s** |   ≤ 2,5 s |
| TBT                         |           **183 ms** |  ≤ 200 ms |
| CLS                         |            **0,013** |     ≤ 0,1 |
| axe-core                    |      **0 violações** |         0 |
| JavaScript da rota inicial  | **dentro do budget** | ≤ 170 KiB |
| Maior imagem acima da dobra | **dentro do budget** | ≤ 180 KiB |

Resultados de laboratório variam conforme máquina e versão do navegador. INP é
mantido como meta de campo de até 200 ms e deverá ser medido com telemetria real
caso o projeto seja publicado com tráfego suficiente.

O checklist manual de WCAG 2.2 AA está em
[`docs/quality/wcag-2.2-aa-checklist.md`](./docs/quality/wcag-2.2-aa-checklist.md).
Capturas mobile, desktop e dos estados interativos estão em
[`docs/visual-review`](./docs/visual-review).

## Executando localmente

Requisitos:

- Node.js 20.9 ou superior.
- npm.

```bash
git clone https://github.com/Gaabriel22/faro-energia-landing.git
cd faro-energia-landing
npm ci
```

Crie `.env.local` para definir a URL canônica:

```bash
SITE_URL=http://localhost:3000
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em
[`http://localhost:3000`](http://localhost:3000).

Para testar a build de produção:

```bash
npm run build
npm run start
```

Em produção, `SITE_URL` deve receber a origem pública completa, por exemplo
`https://exemplo.com`.

## Scripts

| Comando                   | Finalidade                                                                     |
| ------------------------- | ------------------------------------------------------------------------------ |
| `npm run dev`             | Inicia desenvolvimento com Turbopack.                                          |
| `npm run build`           | Gera e valida a build de produção.                                             |
| `npm run lint`            | Executa ESLint.                                                                |
| `npm run typecheck`       | Verifica tipos sem emitir arquivos.                                            |
| `npm run test`            | Executa testes unitários e de componentes.                                     |
| `npm run test:e2e`        | Executa Playwright em desktop, mobile, sem JavaScript e perfil de performance. |
| `npm run test:e2e:smoke`  | Executa o fluxo mínimo de sanidade.                                            |
| `npm run test:lighthouse` | Gera build e aplica os gates do Lighthouse CI.                                 |
| `npm run test:quality`    | Executa lint, tipos, testes e build.                                           |
| `npm run assets:optimize` | Gera variantes AVIF/WebP dos assets locais.                                    |

## Decisões de produto e segurança

- A economia usa premissa ilustrativa de 80% e não possui valor contratual.
- Valores e depoimentos permanecem coerentes dentro da narrativa fictícia.
- O honeypot e limites de tamanho reduzem submissões automatizadas triviais.
- Payloads inesperados são rejeitados e mensagens não expõem detalhes internos.
- JSON-LD é serializado com escape seguro e reflete apenas conteúdo visível.
- Imagens têm dimensões conhecidas, formatos modernos e texto alternativo
  contextual.
- Animações respeitam `prefers-reduced-motion` e não são necessárias para
  entender ou operar a página.

## Processo de desenvolvimento

O escopo foi conduzido com OpenSpec. Proposta, decisões arquiteturais,
requisitos verificáveis e tarefas estão em
[`openspec/changes/build-faro-conversion-landing`](./openspec/changes/build-faro-conversion-landing).
Isso mantém decisões de conversão, acessibilidade, segurança e performance
rastreáveis até os testes.
