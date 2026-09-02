/*
 * THX PORTFÓLIO — CONFIGURAÇÃO CENTRAL DO PORTFÓLIO
 * Direção: Precisão Serena. Todo conteúdo comercial, links e cases ficam aqui.
 */

window.portfolioConfig = {
  mode: "demo",
  brand: {
    name: "THX Portfólio",
    shortName: "THX",
    tagline: "Websites & experiências digitais",
    eyebrow: "Websites & experiências digitais",
    descriptor: "Sites personalizados para negócios que querem presença digital profissional, clareza e caminhos simples de contato.",
    logoMark: "THX",
  },
  theme: {
    canvas: "#F5F2EC",
    surface: "#EAE5DC",
    ink: "#171817",
    muted: "#646660",
    line: "#CFC9BF",
    accent: "#28564D",
    accentSoft: "#DCE6E1",
    inverse: "#F8F6F1",
  },
  seo: {
    title: "THX Portfólio — Websites e experiências digitais",
    description: "A THX cria sites personalizados para negócios que querem transmitir profissionalismo, clareza e facilitar o contato pelo celular.",
    canonical: "https://portfolio-exemplo.local/",
    robots: "noindex, nofollow",
  },
  navigation: [
    { label: "Projetos", href: "#projetos" },
    { label: "Processo", href: "#processo" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ],
  contact: {
    whatsappNumber: "5522992195843",
    whatsappDisplay: "(22) 99219-5843",
    whatsappMessage: "Olá! Gostaria de solicitar uma prévia para o meu negócio.",
    primaryHref: "",
    note: "Fale com a THX pelo WhatsApp para solicitar uma prévia do seu projeto.",
  },
  hero: {
    eyebrow: "THX — Websites & experiências digitais",
    title: "Seu negócio merece mais do que apenas estar online.",
    titleLines: ["Seu negócio merece mais", "do que apenas estar online."],
    titleAccent: "online.",
    copy: "Criamos sites modernos e experiências digitais que transformam atenção em interesse — e interesse em novas oportunidades.",
    primaryCta: "Quero elevar minha presença",
    secondaryCta: "Ver projetos",
  },
  projects: [
    {
      id: "essenza",
      number: "01",
      name: "Estética — agendamento",
      category: "Projeto demonstrativo",
      description: "Uma possibilidade de presença digital para um negócio de estética, com foco em confiança, serviços e caminho claro para agendamento.",
      image: "assets/images/cases/essenza-preview.png",
      imageAlt: "Prévia de projeto demonstrativo para negócio de estética em tela de notebook",
      demoUrl: "https://8900-ivtv5s6winobg7ue7g0ii-06d882e4.us2.manus.computer",
      cta: "Ver demonstração",
      featured: true,
    },
    {
      id: "dona-nathalia",
      number: "02",
      name: "Estética — conteúdo",
      category: "Projeto demonstrativo",
      description: "Uma possibilidade de landing page editorial para apresentar cuidado, informação e contato de forma clara para a visitante.",
      image: "assets/images/cases/dona-nathalia-preview.png",
      imageAlt: "Prévia de projeto demonstrativo de estética com conteúdo editorial em tela de notebook",
      demoUrl: "https://sitedonathalia.vercel.app/",
      cta: "Ver demonstração",
      featured: true,
    },
  ],
  upcoming: ["Barbearia", "Clínica", "Profissional autônomo"],
  difference: {
    title: "Não é só sobre ter um site bonito.",
    text: "É sobre criar uma presença digital que ajude o seu negócio a transmitir confiança, explicar seus serviços com clareza e tornar o próximo contato mais simples.",
  },
  faq: [
    {
      question: "Quanto custa um site?",
      category: "INVESTIMENTO",
      answer: "O investimento varia de acordo com o tipo de projeto, quantidade de páginas, recursos e nível de personalização. Primeiro entendemos o que o seu negócio precisa e, a partir disso, definimos uma proposta clara antes de começar.",
    },
    {
      question: "Quanto tempo leva para ficar pronto?",
      category: "PRAZO",
      answer: "O prazo depende da complexidade e do conteúdo do projeto. Depois de entender sua necessidade, definimos um cronograma para que você saiba como o desenvolvimento será conduzido antes de começarmos.",
    },
    {
      question: "O site funciona bem no celular?",
      category: "RESPONSIVO",
      answer: "Sim. O projeto é pensado para funcionar de forma confortável em diferentes tamanhos de tela, incluindo celulares, tablets e computadores.",
    },
    {
      question: "Preciso já ter domínio e hospedagem?",
      category: "DOMÍNIO",
      answer: "Não. Se você ainda não possui domínio ou estrutura de publicação, podemos definir isso durante o projeto e orientar o caminho mais adequado para colocar o site no ar.",
    },
    {
      question: "Vocês fazem lojas virtuais?",
      category: "E-COMMERCE",
      answer: "Sim. Dependendo da necessidade, podemos desenvolver a presença visual da loja e estruturar a experiência de compra utilizando a solução mais adequada para o projeto.",
    },
    {
      question: "Posso pedir alterações durante o projeto?",
      category: "ALTERAÇÕES",
      answer: "Sim. O projeto passa por etapas de revisão para que possamos ajustar conteúdo, detalhes visuais e pontos importantes antes da publicação, respeitando o escopo definido.",
    },
    {
      question: "Como começamos?",
      category: "PRIMEIRO CONTATO",
      answer: "Começamos com uma conversa para entender o seu negócio, o objetivo do projeto e o que você deseja construir ou melhorar. A partir disso, definimos juntos a direção mais adequada.",
      cta: "CONVERSAR SOBRE MEU PROJETO →",
    },
  ],
  footer: {
    note: "Websites e experiências digitais para negócios que querem comunicar com mais clareza.",
    copyright: "© 2026 THX Portfólio. Apresentação comercial.",
  },
};
