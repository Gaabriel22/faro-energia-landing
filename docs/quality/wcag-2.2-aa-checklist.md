# Checklist manual WCAG 2.2 AA

Este checklist complementa o gate automatizado do axe. Os itens permanecem pendentes até a revisão da landing final em desktop e mobile.

## Estrutura e leitores de tela

- [ ] Landmarks, título da página e hierarquia de headings descrevem corretamente a interface.
- [ ] Conteúdo e controles mantêm nome, função, valor e estado compreensíveis em NVDA.
- [ ] Imagens informativas têm alternativa equivalente; imagens decorativas são ignoradas.
- [ ] A ordem de leitura continua lógica sem CSS e sem JavaScript.

## Teclado e foco

- [ ] Toda interação funciona apenas com teclado, sem armadilhas.
- [ ] O foco é sempre visível e não fica encoberto por elementos fixos.
- [ ] A ordem de foco segue a ordem visual e retorna ao acionador após overlays.
- [ ] Skip link leva ao conteúdo principal.

## Reflow, zoom e orientação

- [ ] A página funciona entre 320 px e 2560 px sem rolagem horizontal.
- [ ] Zoom de texto a 200% não corta nem sobrepõe conteúdo.
- [ ] Reflow equivalente a 400% mantém leitura e interação.
- [ ] Retrato, paisagem e conteúdo ampliado não perdem funcionalidade.

## Cor, contraste e movimento

- [ ] Texto normal atinge contraste 4,5:1 e texto grande atinge 3:1.
- [ ] Componentes, foco e estados gráficos essenciais atingem contraste 3:1.
- [ ] Informação não depende apenas de cor, posição, forma ou animação.
- [ ] `prefers-reduced-motion` remove movimento não essencial e não oculta conteúdo.

## Interação e formulários

- [ ] Alvos de toque atendem 24 × 24 CSS px ou possuem espaçamento equivalente.
- [ ] Labels, instruções e `autocomplete` são adequados ao propósito de cada campo.
- [ ] Erros identificam o campo, explicam a correção e são anunciados.
- [ ] Estados ocupado, sucesso e falha são perceptíveis sem mudança inesperada de foco.
- [ ] Conteúdo acionado por hover ou foco pode ser dispensado e permanece persistente.

## Conteúdo e revisão

- [ ] Links e CTAs possuem nomes claros fora de contexto.
- [ ] Português, moeda, números e mensagens são consistentes e compreensíveis.
- [ ] Nenhum componente pisca mais de três vezes por segundo.
- [ ] A revisão automatizada do axe retorna zero violações.
