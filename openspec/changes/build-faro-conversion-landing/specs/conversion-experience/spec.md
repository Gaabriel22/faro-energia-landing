## ADDED Requirements

### Requirement: Proposta de valor imediata
A página SHALL comunicar no primeiro viewport o serviço, o público atendido, o benefício principal e uma ação primária.

#### Scenario: Visitante acessa a página em dispositivo móvel
- **WHEN** a rota principal termina de renderizar
- **THEN** o visitante vê marca, título principal, apoio, CTA primário e sinal de confiança sem precisar interagir

### Requirement: Narrativa completa de conversão
A página SHALL ordenar suas seções para conduzir o visitante de problema e benefício até prova, redução de objeções e solicitação de orçamento.

#### Scenario: Visitante percorre a página
- **WHEN** o visitante navega do hero ao rodapé
- **THEN** encontra benefícios, estimativa, processo, projetos, depoimentos, garantias, FAQ e CTA final em ordem coerente

### Requirement: CTAs consistentes
Todos os CTAs primários SHALL usar linguagem e destino consistentes, oferecer estados de foco visíveis e funcionar por teclado.

#### Scenario: Visitante ativa CTA primário
- **WHEN** o visitante clica ou pressiona Enter no CTA
- **THEN** o foco ou viewport é levado ao próximo passo de conversão sem perda de contexto

### Requirement: Experiência responsiva
A página SHALL permanecer legível e funcional entre 320 px e 2560 px, sem rolagem horizontal ou sobreposição de conteúdo.

#### Scenario: Página é aberta em viewport estreito
- **WHEN** a largura disponível é 320 px
- **THEN** conteúdo, navegação, controles e CTAs permanecem acessíveis sem corte

### Requirement: Navegação compreensível
A página SHALL oferecer navegação por landmarks e links âncora com compensação para cabeçalho fixo.

#### Scenario: Usuário navega por teclado
- **WHEN** o usuário usa Tab e ativa um link de seção
- **THEN** o foco segue ordem lógica e a seção alvo não fica oculta sob o cabeçalho

### Requirement: Movimento opcional
Animações SHALL reforçar hierarquia ou feedback sem ocultar conteúdo, bloquear interação ou depender de movimento para transmitir informação.

#### Scenario: Usuário prefere movimento reduzido
- **WHEN** `prefers-reduced-motion: reduce` está ativo
- **THEN** movimentos não essenciais são removidos e toda funcionalidade permanece disponível

### Requirement: Conteúdo fictício consistente
Nome, números, projetos, garantias e depoimentos SHALL ser internamente coerentes e SHALL ser identificados como fictícios no README.

#### Scenario: Recrutador consulta documentação
- **WHEN** o recrutador abre o README
- **THEN** encontra aviso explícito de que empresa e conteúdo comercial foram criados para portfólio
