## ADDED Requirements

### Requirement: Estimativa simples de economia
O simulador SHALL aceitar conta mensal entre R$ 300 e R$ 100.000 e calcular economia mensal como 80% do valor e economia anual como doze vezes esse resultado, arredondadas para o real mais próximo. O resultado SHALL ser identificado como estimativa ilustrativa sem valor contratual e SHALL NOT usar gráficos ou chamadas externas.

#### Scenario: Usuário informa consumo válido
- **WHEN** o usuário informa uma conta mensal de R$ 1.000
- **THEN** o sistema apresenta R$ 800 mensais, R$ 9.600 anuais, premissa de 80% e CTA para solicitar avaliação

#### Scenario: Usuário informa valor inválido
- **WHEN** o valor está vazio, fora da faixa ou em formato inválido
- **THEN** o sistema preserva o dado digitado e exibe erro associado ao campo

### Requirement: Formulário com minimização de dados
O formulário SHALL solicitar nome, e-mail, empresa e faixa de conta mensal como obrigatórios, telefone como opcional e SHALL marcar obrigatoriedade de forma perceptível.

#### Scenario: Usuário revisa formulário
- **WHEN** o formulário recebe foco
- **THEN** cada controle possui rótulo persistente, instrução adequada, autocomplete e indicação acessível de obrigatoriedade

### Requirement: Validação em duas fronteiras
Dados do lead SHALL ser validados e normalizados no cliente e novamente no servidor pelo mesmo schema Zod: nome com trim e 2–80 caracteres; e-mail com trim, lowercase e 3–254 caracteres em formato válido; telefone vazio ou com 10–11 dígitos após remover pontuação; empresa com trim e 2–100 caracteres; faixa de conta limitada a `300-999`, `1000-2999`, `3000-9999`, `10000-29999` ou `30000+`.

#### Scenario: Requisição contorna validação cliente
- **WHEN** a Server Action recebe payload inválido ou acima dos limites
- **THEN** a requisição é rejeitada sem persistir, transmitir ou registrar os dados pessoais

### Requirement: Proteção básica contra abuso
O fluxo SHALL incluir honeypot `website` obrigatoriamente vazio, limites de tamanho e rejeição segura de entradas inesperadas.

#### Scenario: Bot preenche campo invisível
- **WHEN** o honeypot chega preenchido
- **THEN** a submissão não é processada e a resposta não revela a regra de detecção

### Requirement: Nenhuma persistência de PII
A versão conceitual SHALL descartar os dados após validação e SHALL NOT enviar PII a banco, analytics, logs ou serviço externo.

#### Scenario: Submissão válida termina
- **WHEN** o servidor valida o payload
- **THEN** retorna sucesso demonstrativo sem armazenar ou encaminhar os valores

### Requirement: Feedback acessível
Estados de carregamento, sucesso e erro SHALL ser anunciados a tecnologias assistivas e SHALL impedir submissões duplicadas durante processamento.

#### Scenario: Usuário envia formulário válido
- **WHEN** a submissão está em andamento e termina
- **THEN** o botão reflete estado ocupado e a confirmação recebe anúncio não intrusivo

### Requirement: Funcionalidade sem movimento
O resultado do simulador e o formulário SHALL permanecer utilizáveis quando animações estiverem desativadas ou JavaScript de movimento falhar.

#### Scenario: Biblioteca de movimento não carrega
- **WHEN** a camada de animação está indisponível
- **THEN** cálculo, validação, submissão e feedback continuam funcionando
