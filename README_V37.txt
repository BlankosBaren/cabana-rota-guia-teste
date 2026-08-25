V37 - Estrutura preparada para Cloudflare Workers Assets

Estrutura:
public/index.html
public/assets/...
wrangler.jsonc -> assets.directory = ./public

O Cloudflare deve publicar somente a pasta public e ignorar .git, READMEs e demais arquivos do repositório.
