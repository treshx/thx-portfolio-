# THX Portfólio

Projeto estático completo do THX Portfólio, pronto para abrir no VS Code, versionar no GitHub e publicar como site estático.

## Estrutura

| Caminho | Finalidade |
|---|---|
| `index.html` | Estrutura semântica da página e carregamento de estilos e scripts. |
| `assets/css/styles.css` | Design system, layout responsivo, tipografia e microinterações. |
| `assets/js/portfolio.config.js` | Fonte única de marca, conteúdo, projetos, SEO e WhatsApp. |
| `assets/js/app.js` | Renderização da configuração, menu móvel e links de contato. |
| `assets/images/cases/` | Previews locais dos dois projetos demonstrativos. |

## Executar localmente

Abra a pasta no VS Code. Para testar com um servidor estático local, execute no terminal integrado:

```bash
python3 -m http.server 8080
```

Depois, abra `http://localhost:8080` no navegador. Também é possível usar uma extensão de servidor estático do VS Code.

## Configuração do WhatsApp

O número de WhatsApp existe somente em `assets/js/portfolio.config.js`, no objeto `contact`.

```js
contact: {
  whatsappNumber: "5522992195843",
  whatsappDisplay: "(22) 99219-5843",
  whatsappMessage: "Olá! Gostaria de solicitar uma prévia para o meu negócio.",
}
```

Não coloque o número no HTML. O arquivo `assets/js/app.js` monta o endereço do WhatsApp e o aplica aos CTAs de contato.

## Publicar na Vercel

O projeto é estático e não exige processo de build. Após enviá-lo para um repositório GitHub, importe o repositório na Vercel e mantenha a raiz do projeto como diretório de publicação. Não é necessário instalar dependências ou definir comando de build.

Antes de publicar em domínio definitivo, atualize `seo.canonical` e `seo.robots` em `assets/js/portfolio.config.js` de acordo com o domínio e a política de indexação desejados.
