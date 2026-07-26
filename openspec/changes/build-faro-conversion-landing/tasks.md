## 1. Scaffold e fundação

- [x] 1.1 Criar o projeto Next.js na raiz com App Router, TypeScript, Tailwind CSS, ESLint, `src/` e alias `@/*`, preservando `openspec/`
- [x] 1.2 Definir o pacote como `faro-energia-landing` e confirmar versões e requisitos de runtime
- [x] 1.3 Inicializar shadcn/ui e adicionar somente as primitivas necessárias
- [x] 1.4 Instalar Zod e justificar cada dependência de runtime
- [x] 1.5 Criar a estrutura `components/sections`, `features`, `content` e `lib` com fronteiras Server/Client explícitas
- [x] 1.6 Rodar lint e build do scaffold antes do primeiro checkpoint de commit

## 2. Qualidade e testes

- [x] 2.1 Configurar scripts separados para lint, typecheck, testes, Playwright e Lighthouse
- [x] 2.2 Configurar Vitest e Testing Library para lógica e componentes
- [x] 2.3 Configurar Playwright com projetos mobile e desktop, servidor de produção e falha em console error
- [x] 2.4 Integrar axe com gate de zero violações e criar checklist manual WCAG 2.2 AA
- [x] 2.5 Configurar Lighthouse CI com Performance 95, demais categorias 100, LCP 2,5 s, TBT 200 ms e CLS 0,1
- [x] 2.6 Criar medição CDP do JavaScript transferido e asset visual acima da dobra nos projetos definidos
- [x] 2.7 Criar teste Playwright sem JavaScript para conteúdo essencial

## 3. Marca, conteúdo e sistema visual

- [x] 3.1 Criar conteúdo tipado da Faro Energia com proposta, benefícios, projetos, depoimentos, garantias e FAQ coerentes
- [x] 3.2 Definir tokens semânticos em OKLCH, escalas tipográficas, espaçamento, raios, sombras e estados de foco
- [x] 3.3 Configurar fontes otimizadas com `next/font`, poucos pesos e fallbacks ajustados
- [x] 3.4 Criar logo, ícones e motivo geométrico do raio solar em SVG acessível e enxuto
- [x] 3.5 Gerar, selecionar e otimizar assets visuais originais locais em AVIF/WebP com variantes responsivas
- [x] 3.6 Implementar primitivas de layout e seção reutilizáveis sem criar abstrações prematuras

## 4. Jornada de conversão

- [x] 4.1 Implementar cabeçalho semântico, skip link, navegação por âncoras e menu móvel acessível
- [x] 4.2 Implementar hero com proposta de valor, CTA, prova curta e asset LCP estável
- [x] 4.3 Implementar faixa de confiança, problema e benefícios econômicos
- [x] 4.4 Implementar processo de contratação e seção de garantias
- [ ] 4.5 Implementar projetos e depoimentos fictícios com mídia responsiva
- [ ] 4.6 Implementar FAQ, CTA final, rodapé e CTA móvel sem cobrir conteúdo
- [ ] 4.7 Verificar hierarquia de títulos, landmarks, links e ordem de foco

## 5. Simulador e captura demonstrativa

- [ ] 5.1 Implementar e testar fórmula de economia de 80%, faixa de R$ 300–100.000 e arredondamento
- [ ] 5.2 Construir simulador acessível sem gráficos e conectar resultado ao CTA de orçamento
- [ ] 5.3 Criar schema Zod compartilhado com campos, enums, normalização e limites definidos no design
- [ ] 5.4 Implementar Server Action demonstrativa sem persistência, transmissão ou log de PII
- [ ] 5.5 Adicionar honeypot, rejeição segura e mensagens genéricas de erro
- [ ] 5.6 Implementar formulário com labels, autocomplete, erros associados, estado ocupado e anúncio de resultado
- [ ] 5.7 Cobrir cálculo, validação, honeypot e estados do formulário com testes

## 6. Movimento, responsividade e refinamento

- [ ] 6.1 Implementar efeitos simples em CSS e comparar resultado/custo antes de decidir por Motion
- [ ] 6.2 Se justificado, instalar Motion, configurar carregamento mínimo e manter fallback completo sem animação
- [ ] 6.3 Respeitar `prefers-reduced-motion` em todas as transições e revelações
- [ ] 6.4 Revisar layout entre 320 px e 2560 px, orientação paisagem e zoom de 200%
- [ ] 6.5 Eliminar overflow horizontal, mudanças de layout e áreas de toque inadequadas

## 7. SEO e segurança

- [ ] 7.1 Gerar e implementar favicon, metadata, canonical via `SITE_URL`, Open Graph, Twitter card, robots e sitemap
- [ ] 7.2 Gerar imagem social original local otimizada e validar preview compartilhável
- [ ] 7.3 Implementar JSON-LD seguro para WebSite, Organization, Service e FAQ compatível com conteúdo visível
- [ ] 7.4 Configurar CSP, `X-Content-Type-Options`, proteção de framing, `Referrer-Policy` e `Permissions-Policy`
- [ ] 7.5 Verificar ausência de segredos, PII em logs, HTML inseguro e origens desnecessárias
- [ ] 7.6 Executar auditoria de dependências e corrigir vulnerabilidades aplicáveis

## 8. Inspeção e entrega

- [ ] 8.1 Executar lint, typecheck, testes unitários/de componentes e build de produção
- [ ] 8.2 Executar fluxo Playwright do CTA, simulador, FAQ e formulário em mobile e desktop
- [ ] 8.3 Capturar screenshots Playwright da página inteira e dos estados interativos em mobile e desktop
- [ ] 8.4 Inspecionar screenshots visualmente e corrigir composição, cortes, overflow, contraste e inconsistências
- [ ] 8.5 Executar axe, Lighthouse CI e verificação dos headers contra build de produção
- [ ] 8.6 Confirmar orçamento de JavaScript, asset visual, métricas Lighthouse e documentar INP como meta de campo futura
- [ ] 8.7 Escrever README de portfólio com arquitetura, scripts, decisões, métricas e aviso explícito de conteúdo fictício
- [ ] 8.8 Fazer revisão final dos requisitos OpenSpec e registrar resultados verificáveis
