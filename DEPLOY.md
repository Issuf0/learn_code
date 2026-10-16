# Deploy — Learn Code (site)

O site é uma aplicação estática (Vite) publicada no **Vercel**.

## Vercel

1. Importar o repositório `Issuf0/learn_code` em vercel.com → Add New → Project.
2. **Root Directory:** `site`. O preset Vite é detectado automaticamente (`npm run build`, output `dist`).
3. Não são necessárias variáveis de ambiente.
4. `site/vercel.json` reencaminha todas as rotas para `index.html` (SPA).

URL actual: `https://learncode.vercel.app`.

## Mudar a URL de produção

A URL está centralizada em `site/src/config/site.ts` (`SITE_URL`). É usada no `canonical`, nas etiquetas Open Graph, no `robots.txt` e no `sitemap.xml` gerados no build. Quando existir domínio próprio (ex.: `learncode.co.mz`):

1. Adicionar o domínio ao projecto Vercel.
2. Alterar `SITE_URL` e fazer novo deploy.

## Verificação após deploy

- [ ] As 6 páginas abrem (`/`, `/sobre`, `/servicos`, `/projectos`, `/cursos`, `/contacto`) e uma rota inexistente mostra a página 404.
- [ ] `/robots.txt`, `/sitemap.xml` e `/og-image.png` respondem.
- [ ] Partilha no WhatsApp/Facebook mostra título, descrição e imagem (testar em https://developers.facebook.com/tools/debug/).
- [ ] Botões de WhatsApp abrem a conversa com o número +258 82 837 6317.
