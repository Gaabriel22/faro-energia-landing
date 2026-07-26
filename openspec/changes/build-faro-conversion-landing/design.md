## Context

O repositório contém apenas a configuração inicial do OpenSpec. A primeira entrega será uma landing page conceitual para a Faro Energia, instaladora solar fictícia voltada a pequenos negócios brasileiros. A página precisa parecer comercialmente plausível, mas continuar pequena, rápida e fácil de entender como projeto de portfólio.

Os principais stakeholders são visitantes interessados em solicitar orçamento e recrutadores avaliando qualidade visual e técnica. O conteúdo será em português brasileiro. A aplicação não terá autenticação, painel, pagamentos, banco de dados ou integração comercial real.

## Goals / Non-Goals

**Goals:**

- Maximizar clareza da proposta de valor e progressão até o CTA.
- Entregar identidade visual autoral, responsiva e consistente.
- Manter HTML inicial útil sem JavaScript e limitar componentes cliente às interações.
- Atingir Lighthouse mobile de Performance >= 95 e 100 em Accessibility, Best Practices e SEO em ambiente de produção controlado.
- Atender WCAG 2.2 AA; usar LCP <= 2,5 s, TBT <= 200 ms e CLS <= 0,1 como gates de laboratório, mantendo INP <= 200 ms como meta futura de campo.
- Demonstrar SEO técnico, dados estruturados, segurança por padrão e testes automatizados.
- Permitir que cada etapa de implementação seja revisada e commitada separadamente.

**Non-Goals:**

- Construir dashboard, gráficos, área autenticada ou produto SaaS.
- Persistir ou encaminhar leads para CRM, e-mail ou banco de dados.
- Criar CMS, painel administrativo ou internacionalização.
- Representar a Faro Energia como empresa real fora do contexto do projeto.
- Adicionar dependências sem uso claro na landing page.

## Decisions

### 1. Base técnica enxuta e atual

O projeto usará Next.js App Router, React, TypeScript, Tailwind CSS e npm. O scaffold será criado na raiz existente com `create-next-app`, preservando `openspec/`. O pacote e o repositório usarão o nome `faro-energia-landing`.

shadcn/ui fornecerá apenas primitivas úteis, como Button, Accordion, Dialog, Field e Input. Componentes de seção e identidade visual permanecerão no domínio da aplicação. Isso reduz reinvenção de comportamento acessível sem transformar a página em um catálogo genérico.

Alternativa considerada: HTML estático com Vite. Foi rejeitada porque Next.js demonstra melhor metadata, imagens, fontes, Server Components, headers e práticas esperadas no portfólio.

### 2. Arquitetura orientada por domínio e fronteiras cliente pequenas

A rota principal será Server Component. Conteúdo estático e configuração da marca ficarão tipados e separados da apresentação. Componentes serão organizados por responsabilidade:

```text
src/
  app/                 rota, metadata, JSON-LD e arquivos especiais
  components/
    sections/          blocos narrativos da landing
    ui/                primitivas shadcn/ui
  features/
    savings-estimator/ simulador e regras de cálculo
    lead-form/         schema, ação e estados do formulário
  content/             copy e dados fictícios tipados
  lib/                 utilitários, SEO e segurança
```

Somente simulador, formulário, FAQ quando necessário e controles móveis receberão fronteira cliente. Não haverá store global.

Alternativa considerada: uma única página cliente. Foi rejeitada por aumentar JavaScript, hidratação e acoplamento.

### 3. Direção visual “engenharia solar editorial”

A identidade combinará fundo marfim, verde floresta, amarelo solar e grafite. Tipografia editorial expressiva será pareada com fonte funcional para corpo e dados. Grades técnicas, recortes solares e fotografia local otimizada formarão a linguagem visual.

A composição evitará gradiente roxo, cards excessivos, glassmorphism genérico e layouts de template SaaS. A assinatura memorável será um “raio solar” geométrico atravessando hero e transições de seção.

Os assets principais serão gerados originalmente para o projeto, mantidos localmente, responsivos e servidos por `next/image`. Não haverá dependência de banco de imagens remoto. Ícones serão SVG enxuto. Conteúdo visual decorativo terá texto alternativo vazio; imagens informativas terão alternativas específicas.

### 4. Conversão sem funcionalidade artificial

A jornada seguirá esta ordem:

1. Hero com promessa, prova curta e CTA primário.
2. Faixa de confiança com garantias verificáveis dentro da narrativa fictícia.
3. Problema e benefícios econômicos.
4. Simulador de economia com resultado estimado e CTA contextual.
5. Processo de contratação em etapas claras.
6. Projetos e depoimentos fictícios.
7. Garantias e objeções.
8. FAQ.
9. Formulário e CTA final.

CTAs compartilharão linguagem consistente e destino previsível. O simulador pedirá apenas o valor médio da conta mensal de energia em reais, entre R$ 300 e R$ 100.000. A economia estimada mensal será `conta * 0,8`; a anual será `conta * 0,8 * 12`. Resultados serão arredondados para o real mais próximo e rotulados como estimativa ilustrativa baseada em redução de 80%, sem valor contratual. Não haverá gráfico.

### 5. Movimento como reforço, não requisito

Motion for React/Framer Motion será avaliado depois que a versão CSS estiver funcional. A dependência só será instalada se produzir ganho visual perceptível em revelações suaves, feedback do simulador ou microinterações de CTA sem romper o orçamento de JavaScript. Se instalada, usará carregamento mínimo por `LazyMotion` ou estratégia equivalente da versão atual.

Todo conteúdo permanecerá disponível sem animação. `prefers-reduced-motion` removerá deslocamentos e movimentos não essenciais. Nenhuma animação poderá atrasar LCP, causar CLS ou bloquear interação.

Alternativa considerada: animações somente em CSS. Continua válida para efeitos simples e terá preferência quando produzir o mesmo resultado com menor custo.

**Resultado da avaliação:** a versão CSS cobre a assinatura de entrada do raio solar, assentamento do hero, feedback do simulador e formulário, abertura de FAQ/menu e microinterações de CTA e projetos usando apenas `transform`, `opacity` e `clip-path`. O gate de JavaScript da rota permanece dentro de 170 KB sem nova dependência de runtime. Motion não se justifica nesta versão e não será instalado; `prefers-reduced-motion` reduz animações e transições a duração praticamente instantânea e remove transformações de hover não essenciais.

### 6. Lead demonstrativo com minimização de dados

O formulário pedirá nome obrigatório (2–80 caracteres após trim), e-mail obrigatório (3–254 caracteres, trim e lowercase), telefone opcional (10 ou 11 dígitos após remover pontuação), empresa obrigatória (2–100 caracteres após trim) e faixa de conta mensal obrigatória (`300-999`, `1000-2999`, `3000-9999`, `10000-29999` ou `30000+`). Um schema Zod único aplicará essas regras no cliente e no servidor. O honeypot `website` deverá permanecer vazio e não receberá autocomplete nem foco.

A Server Action não persistirá nem transmitirá dados na versão conceitual. Ela validará novamente, rejeitará honeypot preenchido, não registrará PII e retornará estado genérico de sucesso ou erro. O README explicará essa limitação.

Alternativa considerada: integração com serviço de e-mail. Foi rejeitada por adicionar segredos, coleta real de dados e operação fora do escopo.

### 7. SEO e dados estruturados coerentes

A página terá metadata completa, canonical configurável, Open Graph, Twitter card, sitemap, robots, favicon e imagem social original gerados para a marca. Haverá um único `h1`, hierarquia semântica, links descritivos e conteúdo rastreável no HTML inicial.

JSON-LD usará tipos compatíveis com o conteúdo visível, como `Organization`, `Service`, `WebSite` e `FAQPage`, sem inventar avaliações agregadas, endereço ou identificadores legais. Dados estruturados serão serializados com segurança e testados. O nome fictício não será misturado com entidades reais.

### 8. Segurança por padrão

Headers incluirão Content Security Policy compatível com Next.js, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e proteção de framing. Conteúdo dinâmico não usará `dangerouslySetInnerHTML`, exceto JSON-LD serializado por helper seguro que escape caracteres problemáticos.

Entradas terão allowlists de formato, limites de tamanho e mensagens que não expõem detalhes internos. Dependências serão mínimas e auditadas. Nenhuma chave ou segredo será incluído no cliente ou repositório.

### 9. Orçamento de performance e verificação

O LCP será texto ou imagem local otimizada com dimensões conhecidas. Fontes usarão `next/font`, poucos pesos e fallback ajustado. Seções abaixo da dobra poderão usar `content-visibility`; mídia respeitará `sizes`.

O orçamento inicial será:

- JavaScript cliente da rota principal <= 170 KB transferidos na medição CDP definida abaixo. O build vazio do Next.js 16.2.12 mediu 147.657 bytes; o limite preserva cerca de 26 KB para código interativo da aplicação.
- Imagem responsável pelo LCP <= 180 KB.
- Nenhuma dependência de terceiros bloqueante.
- Zero mudanças de layout causadas por mídia, fontes ou animação.

Validação incluirá lint, typecheck, testes unitários, testes de componentes, fluxo Playwright, axe e Lighthouse CI contra build de produção. Axe deverá reportar zero violações; critérios WCAG 2.2 AA não automatizáveis terão checklist manual versionado. A revisão visual usará screenshots Playwright de página completa em mobile e desktop, além de capturas dos estados do simulador e formulário; console errors, overflow horizontal e elementos cortados serão tratados como falhas.

No laboratório, Lighthouse medirá Performance, Accessibility, Best Practices, SEO, LCP, CLS e TBT. INP é métrica de campo e não será usado como gate local; permanecerá meta de produção de <= 200 ms caso uma implantação futura tenha telemetria Web Vitals suficiente. O gate reproduzível será LCP <= 2,5 s, CLS <= 0,1 e TBT <= 200 ms.

O orçamento de JavaScript será medido por Playwright/Chrome DevTools Protocol em navegação limpa, cache desativado e build de produção, somando `encodedDataLength` de todos os scripts de mesma origem requisitados pela rota inicial. O limite será 170 KB transferidos. A mídia LCP, ou a maior imagem raster acima da dobra quando o LCP for texto, terá no máximo 180 KB transferidos no projeto mobile.

## Risks / Trade-offs

- [Motion aumentar o bundle] -> Só instalar após comparação com CSS; usar carregamento mínimo e remover a biblioteca se o orçamento não for cumprido.
- [Assets gerados comprometerem LCP] -> Selecionar a composição final, gerar variantes locais, converter para AVIF/WebP, definir dimensões e auditar em mobile.
- [Página parecer template genérico] -> Sustentar direção editorial própria, composição assimétrica e assets coerentes.
- [Conteúdo fictício ser confundido com operação real] -> Documentar claramente no README e evitar dados legais, endereços e avaliações estruturadas.
- [Server Action demonstrativa criar falsa expectativa] -> Não persistir dados, não registrar PII e documentar comportamento.
- [Metas Lighthouse variarem por ambiente] -> Medir build de produção em perfil móvel controlado e registrar configuração usada.
- [CSP quebrar recursos do framework] -> Começar restritiva, testar produção e liberar somente origens realmente necessárias.

## Migration Plan

1. Criar e aprovar os artefatos OpenSpec.
2. Gerar scaffold Next.js na raiz sem apagar `openspec/`.
3. Configurar shadcn/ui, tokens, fontes, qualidade e testes.
4. Implementar estrutura semântica, conteúdo e identidade.
5. Adicionar ilustrações, simulador, formulário e movimento.
6. Finalizar SEO, headers e arquivos especiais.
7. Executar testes, auditorias Lighthouse e revisão responsiva.

Rollback será feito por etapa/commit. Não há migração de dados.

## Open Questions

Nenhuma para iniciar. O canonical usará `SITE_URL` validada no servidor, com fallback `http://localhost:3000`; o deploy deverá definir a URL pública.
