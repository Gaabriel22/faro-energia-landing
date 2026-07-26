# Imagens originais da Faro

As quatro fotografias desta landing page foram criadas especificamente para a
marca fictícia Faro Energia com o gerador de imagens nativo do Codex, em
2026-07-26. Nenhuma fotografia de banco de imagens ou identidade de empresa real
foi usada.

## Direção e seleção

| Asset | Papel | Direção do prompt selecionado |
| --- | --- | --- |
| `faro-hero` | Hero e LCP | Dona de padaria brasileira à direita do quadro, luz de fim de tarde, painéis no telhado e espaço negativo limpo à esquerda |
| `padaria-aurora` | Projeto | Padaria de bairro com telhado de terracota e instalação solar realista |
| `clinica-vereda` | Projeto | Clínica de pequeno porte, cobertura clara e inspeção técnica discreta |
| `centro-auto-nova-linha` | Projeto | Oficina brasileira com cobertura metálica solar e atividade cotidiana |

O conjunto usa fotografia documental editorial, luz natural quente, arquitetura
comercial brasileira e tons compatíveis com a paleta verde, areia e terracota
da Faro. Todos os prompts vetaram texto legível, logotipos, marcas d'água,
infográficos e estética publicitária artificial.

Os masters têm 1536 × 1024 px e ficam, durante o desenvolvimento, em
`artifacts/imagegen-source/`, que não é versionado. O Git recebe apenas os
derivados necessários para a aplicação.

## Pipeline

Cada master gera variantes locais de 640, 960 e 1440 px, na proporção 3:2:

- AVIF com qualidade 58;
- WebP com qualidade 76 e smart subsampling;
- enquadramento automático por atenção;
- metadados removidos na codificação;
- limite automatizado de 180 KB para a variante mobile do hero e 350 KB para
  qualquer derivado.

Para repetir a otimização:

```bash
npm run assets:optimize -- artifacts/imagegen-source/faro-hero.png faro-hero
```

O manifesto tipado em `src/content/media.ts` centraliza dimensões, formatos,
caminhos e textos alternativos. Isso evita strings duplicadas e permite que as
seções futuras montem `<picture>` responsivo sem descobrir arquivos em runtime.
