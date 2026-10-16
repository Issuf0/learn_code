# Learn Code — Site público

Site institucional da **Learn Code** (Marracuene, Maputo, Moçambique): desenvolvimento de software, inteligência artificial e formação em programação.

## Stack

- React 19 + TypeScript, Vite 6, Tailwind CSS 4, react-router 7, lucide-react.
- Sem backend: os formulários de contacto abrem o WhatsApp da Learn Code com a mensagem preenchida e oferecem email como alternativa.

## Desenvolvimento

```bash
cd site
npm install
npm run dev        # http://localhost:3000
npm run lint       # tsc --noEmit
npm run build      # gera dist/ (inclui robots.txt e sitemap.xml)
npm run preview    # serve dist/
```

## Conteúdo

- Textos, serviços, projectos e cursos: `site/src/data/mockData.ts`.
- URL de produção, contactos e metadados por página: `site/src/config/site.ts`.
- Imagem de partilha nas redes sociais: `site/public/og-image.png` (1200×630).

## Deploy

Ver [DEPLOY.md](DEPLOY.md).

---

*“Dignidade, compromisso e humildade em cada linha.”*
