type LinkContent = {
  href: `#${string}`
  label: string
}

type Stat = {
  value: string
  label: string
}

type Benefit = {
  id: string
  title: string
  description: string
}

type ProcessStep = Benefit & {
  step: string
}

type Project = {
  id: string
  business: string
  city: string
  systemSize: string
  previousMonthlyBill: number
  estimatedMonthlySavings: number
  summary: string
}

type Testimonial = {
  id: string
  quote: string
  author: string
  role: string
}

type Guarantee = {
  id: string
  term: string
  title: string
  description: string
}

type FaqItem = {
  id: string
  question: string
  answer: string
}

export type FaroLandingContent = {
  hero: {
    eyebrow: string
    title: string
    description: string
    primaryCta: LinkContent
    secondaryCta: LinkContent
    trustNote: string
  }
  proof: {
    label: string
    stats: readonly Stat[]
  }
  problem: {
    eyebrow: string
    title: string
    description: string
  }
  benefits: readonly Benefit[]
  estimator: {
    eyebrow: string
    title: string
    description: string
    disclaimer: string
  }
  process: {
    eyebrow: string
    title: string
    description: string
    steps: readonly ProcessStep[]
  }
  projects: {
    eyebrow: string
    title: string
    description: string
    items: readonly Project[]
  }
  testimonialsSection: {
    eyebrow: string
    title: string
  }
  testimonials: readonly Testimonial[]
  guarantees: {
    eyebrow: string
    title: string
    items: readonly Guarantee[]
  }
  faq: {
    eyebrow: string
    title: string
    items: readonly FaqItem[]
  }
  finalCta: {
    eyebrow: string
    title: string
    description: string
    action: LinkContent
  }
}

export const faroLandingContent = {
  hero: {
    eyebrow: "Energia solar para pequenos negócios",
    title: "Seu telhado pode pagar parte da operação.",
    description:
      "A Faro projeta e instala energia solar para pequenos negócios, com economia estimada antes da proposta e acompanhamento em cada etapa.",
    primaryCta: {
      href: "#simulador",
      label: "Simular minha economia",
    },
    secondaryCta: {
      href: "#como-funciona",
      label: "Conhecer o processo",
    },
    trustNote: "Diagnóstico técnico sem custo · retorno em 1 dia útil",
  },
  proof: {
    label: "Engenharia que já trabalha para negócios da região",
    stats: [
      { value: "127", label: "projetos em operação" },
      { value: "3,8 MWp", label: "de potência instalada" },
      { value: "até 80%", label: "de redução projetada na conta" },
    ],
  },
  problem: {
    eyebrow: "Custo fixo sob controle",
    title: "A conta sobe. Seu planejamento não precisa subir junto.",
    description:
      "Energia pesa todos os meses no caixa. Um sistema dimensionado para o seu consumo transforma o telhado em ativo e devolve previsibilidade à operação.",
  },
  benefits: [
    {
      id: "previsibilidade",
      title: "Mais previsibilidade de caixa",
      description:
        "Veja a economia estimada antes de decidir e acompanhe a geração depois da ativação.",
    },
    {
      id: "operacao",
      title: "Instalação sem travar a rotina",
      description:
        "O cronograma é combinado com sua equipe para preservar atendimento, estoque e produção.",
    },
    {
      id: "engenharia",
      title: "Projeto feito para o seu consumo",
      description:
        "Histórico da conta, área disponível e perfil de uso orientam cada proposta.",
    },
  ],
  estimator: {
    eyebrow: "Estimativa rápida",
    title: "Descubra quanto da conta pode voltar para o negócio.",
    description:
      "Informe sua média mensal e veja uma projeção simples de economia em poucos segundos.",
    disclaimer:
      "Estimativa ilustrativa baseada em redução de 80%. O resultado não tem valor contratual e depende de análise técnica.",
  },
  process: {
    eyebrow: "Do diagnóstico à primeira geração",
    title: "Um processo claro, sem caixa-preta.",
    description:
      "Você sabe o que está acontecendo, quem está cuidando e qual é o próximo passo.",
    steps: [
      {
        id: "diagnostico",
        step: "01",
        title: "Leitura do consumo",
        description:
          "Analisamos a conta, o perfil de uso e a área disponível para estimar o sistema.",
      },
      {
        id: "projeto",
        step: "02",
        title: "Projeto e proposta",
        description:
          "Você recebe escopo, produção projetada, economia, equipamentos e cronograma.",
      },
      {
        id: "instalacao",
        step: "03",
        title: "Instalação coordenada",
        description:
          "A equipe executa o plano com segurança e mínimo impacto na operação.",
      },
      {
        id: "ativacao",
        step: "04",
        title: "Homologação e acompanhamento",
        description:
          "Cuidamos da conexão e acompanhamos os primeiros ciclos de geração.",
      },
    ],
  },
  projects: {
    eyebrow: "Projetos em operação",
    title: "Economia que aparece no caixa.",
    description:
      "Sistemas dimensionados para diferentes rotinas, telhados e perfis de consumo.",
    items: [
      {
        id: "padaria-aurora",
        business: "Padaria Aurora",
        city: "Campinas, SP",
        systemSize: "30,7 kWp",
        previousMonthlyBill: 6025,
        estimatedMonthlySavings: 4820,
        summary:
          "Instalação dividida em duas etapas para manter produção e atendimento.",
      },
      {
        id: "clinica-vereda",
        business: "Clínica Vereda",
        city: "Sorocaba, SP",
        systemSize: "46,1 kWp",
        previousMonthlyBill: 9063,
        estimatedMonthlySavings: 7250,
        summary:
          "Projeto ajustado ao consumo intenso de climatização durante o dia.",
      },
      {
        id: "auto-nova-linha",
        business: "Centro Auto Nova Linha",
        city: "Jundiaí, SP",
        systemSize: "61,4 kWp",
        previousMonthlyBill: 12100,
        estimatedMonthlySavings: 9680,
        summary:
          "Cobertura aproveitada sem reduzir vagas ou circulação de veículos.",
      },
    ],
  },
  testimonialsSection: {
    eyebrow: "Na rotina de quem opera",
    title: "Clareza antes, durante e depois.",
  },
  testimonials: [
    {
      id: "marina-alves",
      quote:
        "A proposta veio com premissas claras. Conseguimos comparar o investimento com outras prioridades sem adivinhação.",
      author: "Marina Alves",
      role: "Administradora · Clínica Vereda",
    },
    {
      id: "renato-silva",
      quote:
        "A instalação foi planejada ao redor da produção. A padaria continuou funcionando e cada etapa tinha um responsável.",
      author: "Renato Silva",
      role: "Sócio · Padaria Aurora",
    },
  ],
  guarantees: {
    eyebrow: "Compromisso depois da instalação",
    title: "Equipamento protegido. Geração acompanhada.",
    items: [
      {
        id: "modulos",
        term: "25 anos",
        title: "Performance dos módulos",
        description:
          "Garantia do fabricante sobre a capacidade de geração ao longo do tempo.",
      },
      {
        id: "inversores",
        term: "10 anos",
        title: "Equipamentos principais",
        description:
          "Cobertura de fábrica conforme os termos dos componentes especificados.",
      },
      {
        id: "garantia-instalacao",
        term: "2 anos",
        title: "Instalação Faro",
        description:
          "Garantia sobre a execução elétrica e a fixação realizadas pela equipe.",
      },
      {
        id: "acompanhamento",
        term: "12 meses",
        title: "Acompanhamento assistido",
        description:
          "Leitura dos primeiros ciclos e orientação para interpretar a geração.",
      },
    ],
  },
  faq: {
    eyebrow: "Dúvidas antes de decidir",
    title: "O que todo negócio deveria perguntar.",
    items: [
      {
        id: "economia",
        question: "A economia chega mesmo a 80%?",
        answer:
          "Pode chegar, mas varia com consumo, tarifa, área disponível e regras da distribuidora. A proposta apresenta uma projeção baseada no histórico do negócio.",
      },
      {
        id: "imovel-alugado",
        question: "Posso instalar em um imóvel alugado?",
        answer:
          "Sim, desde que haja autorização do proprietário e viabilidade técnica. Também avaliamos se o prazo de permanência faz sentido para o investimento.",
      },
      {
        id: "funcionamento",
        question: "A empresa precisa parar durante a instalação?",
        answer:
          "Na maioria dos projetos, não. Planejamos as intervenções elétricas e os acessos para reduzir impacto na rotina.",
      },
      {
        id: "dias-nublados",
        question: "O sistema gera em dias nublados?",
        answer:
          "Sim, com produção menor. A projeção anual já considera a irradiação e a sazonalidade da região.",
      },
      {
        id: "manutencao",
        question: "Que manutenção os painéis exigem?",
        answer:
          "Inspeção visual, acompanhamento da geração e limpeza quando o acúmulo de sujeira justificar. A frequência depende do local.",
      },
      {
        id: "financiamento",
        question: "É possível financiar o projeto?",
        answer:
          "Sim. A proposta pode ser comparada a linhas de crédito disponíveis, sempre com custos e prazos apresentados pela instituição financeira.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Comece pela sua conta",
    title: "Veja se a energia solar fecha para o seu negócio.",
    description:
      "Uma estimativa agora. Uma proposta técnica só quando os números fizerem sentido.",
    action: {
      href: "#simulador",
      label: "Simular minha economia",
    },
  },
} as const satisfies FaroLandingContent
