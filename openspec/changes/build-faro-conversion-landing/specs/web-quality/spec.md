## ADDED Requirements

### Requirement: Metadata indexável e compartilhável
A rota principal SHALL fornecer título, descrição, canonical configurável, Open Graph, Twitter card, favicon, sitemap e robots coerentes.

#### Scenario: Crawler acessa a página
- **WHEN** o HTML inicial é analisado
- **THEN** metadata essencial e conteúdo principal estão presentes sem depender de hidratação

### Requirement: Dados estruturados válidos
A página SHALL emitir JSON-LD compatível com conteúdo visível e SHALL NOT declarar avaliações, endereço ou identidade legal inexistentes.

#### Scenario: Validador analisa JSON-LD
- **WHEN** os dados estruturados são extraídos
- **THEN** os objetos são sintaticamente válidos, usam URLs canônicas e correspondem ao conteúdo renderizado

### Requirement: Semântica e acessibilidade
A interface SHALL atender WCAG 2.2 AA, incluir landmarks, hierarquia de títulos, foco visível, nomes acessíveis, contraste suficiente e alvo de toque adequado.

#### Scenario: Auditoria automatizada e navegação manual
- **WHEN** a página é testada com axe, checklist WCAG manual e somente teclado
- **THEN** axe reporta zero violações e todos os critérios aplicáveis do checklist passam

### Requirement: Imagens e fontes otimizadas
Imagens SHALL ter dimensões conhecidas, formato moderno, tamanhos responsivos e alternativas adequadas; fontes SHALL usar carregamento otimizado e poucos pesos. No projeto Playwright mobile, a imagem LCP, ou maior imagem raster acima da dobra quando o LCP for texto, SHALL ter no máximo 180 KB transferidos.

#### Scenario: Página carrega em perfil móvel
- **WHEN** mídia e fontes são baixadas
- **THEN** não causam mudança de layout perceptível e a imagem LCP não excede 180 KB

### Requirement: Orçamento de JavaScript
A rota principal SHALL limitar JavaScript cliente a 170 KB transferidos e SHALL manter conteúdo estático em Server Components. A medição SHALL somar `encodedDataLength` de scripts de mesma origem em navegação inicial com cache desativado contra build de produção.

#### Scenario: Bundle de produção é analisado
- **WHEN** a build otimizada termina
- **THEN** apenas ilhas interativas são hidratadas e o orçamento da rota é respeitado

### Requirement: Metas Lighthouse e Core Web Vitals
A aplicação SHALL atingir Performance >= 95 e 100 em Accessibility, Best Practices e SEO no Lighthouse mobile controlado, além de LCP <= 2,5 s, TBT <= 200 ms e CLS <= 0,1. INP SHALL ser tratado como meta de campo <= 200 ms somente quando houver telemetria real suficiente, não como gate de laboratório.

#### Scenario: Auditoria de produção é executada
- **WHEN** Lighthouse CI testa a build servida localmente com configuração versionada
- **THEN** todas as categorias e métricas atingem os limites definidos

### Requirement: Headers de segurança
Respostas SHALL incluir CSP testada, proteção contra MIME sniffing e framing, política de referência e política mínima de permissões.

#### Scenario: Headers da rota são inspecionados
- **WHEN** o servidor responde pela página principal
- **THEN** os headers definidos estão presentes e não liberam origens desnecessárias

### Requirement: Serialização segura
Conteúdo controlável e JSON-LD SHALL ser renderizados sem permitir fechamento de tag ou execução de script injetado.

#### Scenario: Conteúdo contém caracteres especiais
- **WHEN** valores são serializados para JSON-LD ou HTML
- **THEN** caracteres perigosos são escapados e nenhum novo elemento executável é criado

### Requirement: Verificação automatizada
O projeto SHALL oferecer scripts reproduzíveis para lint, typecheck, testes unitários, testes de componentes, teste de fluxo e Lighthouse.

#### Scenario: Desenvolvedor valida uma etapa
- **WHEN** executa os scripts documentados em ambiente limpo
- **THEN** recebe resultado determinístico e falha explícita quando um limite é violado

### Requirement: Inspeção visual com Playwright
A entrega SHALL ser inspecionada em navegador real com Playwright nos viewports mobile e desktop, incluindo screenshots da página completa e dos estados interativos principais.

#### Scenario: Implementação visual é revisada
- **WHEN** a build de produção é aberta pelo Playwright
- **THEN** screenshots permitem verificar composição, responsividade, overflow, foco, formulário, simulador e ausência de erros no console

### Requirement: Conteúdo essencial sem JavaScript
Proposta de valor, benefícios, processo, projetos, garantias, FAQ e informações de contato SHALL permanecer presentes e legíveis no HTML quando JavaScript estiver desativado.

#### Scenario: Navegador bloqueia JavaScript
- **WHEN** a rota principal é aberta em contexto Playwright com JavaScript desativado
- **THEN** todo conteúdo essencial permanece visível e a página não apresenta área vazia causada por animação

### Requirement: Dependências mínimas e auditadas
Cada dependência de runtime SHALL possuir função visível na landing e o projeto SHALL executar auditoria de vulnerabilidades antes da entrega.

#### Scenario: Dependências são revisadas
- **WHEN** manifesto e bundle são inspecionados
- **THEN** não há biblioteca de gráficos, store global ou pacote sem uso justificável
