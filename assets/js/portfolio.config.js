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
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Sobre", href: "#sobre" },
    { label: "FAQ", href: "#faq" },
  ],
  contact: {
    whatsappNumber: "5522992195843",
    whatsappDisplay: "(22) 99219-5843",
    whatsappMessage: "Olá! Gostaria de solicitar uma prévia para o meu negócio.",
    primaryHref: "",
    note: "Fale com a THX pelo WhatsApp para solicitar uma prévia do seu projeto.",
  },
  hero: {
    eyebrow: "Websites & experiências digitais",
    title: "Seu negócio merece uma presença digital à altura.",
    copy: "A THX cria sites personalizados para negócios que querem apresentar seus serviços com mais clareza, transmitir profissionalismo e facilitar o contato pelo celular.",
    primaryCta: "Ver projetos",
    secondaryCta: "Quero uma prévia",
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
  benefits: [
    { title: "Site personalizado", text: "Uma estrutura visual alinhada ao que o seu negócio precisa comunicar, sem começar de um tema genérico." },
    { title: "Pronto para o celular", text: "Leitura, toque e navegação confortáveis para quem chega pelo WhatsApp, redes sociais ou busca." },
    { title: "Serviços, contato e localização", text: "As informações importantes ficam organizadas para que o visitante entenda e encontre o que precisa." },
    { title: "WhatsApp e caminhos de conversão", text: "O contato aparece nos pontos certos, com CTAs claros para iniciar uma conversa com facilidade." },
    { title: "Ajustes e publicação", text: "Você revisa a proposta antes da aprovação. Depois, a THX prepara o site para a publicação." },
  ],
  process: [
    { number: "01", title: "Conversamos", text: "Entendemos seu negócio, público e objetivo." },
    { number: "02", title: "Criamos", text: "Adaptamos a experiência visual para a identidade do seu negócio." },
    { number: "03", title: "Publicamos", text: "Depois da aprovação, colocamos seu novo site no ar." },
  ],
  difference: {
    title: "Não é só sobre ter um site bonito.",
    text: "É sobre criar uma presença digital que ajude o seu negócio a transmitir confiança, explicar seus serviços com clareza e tornar o próximo contato mais simples.",
  },
  faq: [
    { question: "Preciso ter fotos profissionais?", answer: "Não necessariamente. Avaliamos o que você já tem e indicamos o melhor caminho visual para apresentar o seu negócio com coerência." },
    { question: "Vocês criam o conteúdo do site?", answer: "Ajudamos a organizar os textos e as informações para que a mensagem fique clara, objetiva e adequada ao seu público." },
    { question: "Funciona no celular?", answer: "Sim. A experiência é pensada primeiro para telas menores e depois adaptada para tablets, notebooks e monitores maiores." },
    { question: "Posso colocar meu WhatsApp?", answer: "Sim. O botão de contato é configurado com o canal que você usa para atender seus clientes." },
    { question: "Posso pedir alterações?", answer: "Sim. A etapa de aprovação existe justamente para refinar detalhes e alinhar a entrega à sua necessidade." },
    { question: "Quanto custa um site?", answer: "O investimento depende da estrutura e das necessidades de cada projeto. Depois de entendermos o que você precisa, apresentamos uma proposta." },
  ],
  footer: {
    note: "Websites e experiências digitais para negócios que querem comunicar com mais clareza.",
    copyright: "© 2026 THX Portfólio. Apresentação comercial.",
  },
};
