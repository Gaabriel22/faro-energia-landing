## Why

O portfólio precisa de uma landing page convincente que demonstre domínio de conversão, direção visual e engenharia frontend de produção. A Faro Energia será uma marca fictícia de energia solar para pequenos negócios, apresentada como uma operação real na interface e identificada como projeto conceitual apenas na documentação do repositório.

## What Changes

- Criar uma landing page responsiva, mobile-first e orientada à solicitação de orçamento.
- Construir uma narrativa de conversão com hero, prova social, benefícios, processo, projetos, depoimentos, garantias, FAQ e CTA final.
- Incluir um simulador simples de economia que conduz ao formulário de orçamento, sem gráficos ou dependência de dados externos.
- Implementar formulário demonstrativo com validação, estados acessíveis, proteção básica contra abuso e tratamento seguro dos dados.
- Criar identidade visual original para a Faro Energia, evitando aparência genérica de template.
- Adicionar SEO técnico, metadados sociais, dados estruturados e conteúdo semanticamente correto.
- Estabelecer metas verificáveis de acessibilidade, desempenho, segurança e Lighthouse.
- Documentar no README que empresa, números, projetos e depoimentos são fictícios.

## Capabilities

### New Capabilities

- `conversion-experience`: Jornada visual e textual completa da landing, incluindo navegação, seções de persuasão, CTAs e responsividade.
- `savings-and-lead-capture`: Simulação de economia e formulário demonstrativo de orçamento com validação, feedback e proteções contra abuso.
- `web-quality`: Requisitos de SEO, dados estruturados, acessibilidade, desempenho, segurança, testes e métricas Lighthouse.

### Modified Capabilities

Nenhuma.

## Impact

- Novo projeto Next.js com App Router, React, TypeScript e Tailwind CSS.
- Componentes shadcn/ui usados de forma seletiva e adaptados ao sistema visual.
- Motion for React/Framer Motion será adotado apenas se microinterações e revelações justificarem o custo, sempre com suporte a redução de movimento.
- Zod para validação compartilhada do formulário.
- Testes unitários/de componentes, testes de fluxo e auditoria automatizada de qualidade.
- Nenhuma API comercial, banco de dados, autenticação ou integração externa na primeira versão.
