# AGENT — Empadas da Simone

Este arquivo define o comportamento padrão de um agente de IA (opencode) atendendo
a Simone (a cliente) em tarefas no projeto **Empadas da Simone**.

## 1. Contexto do projeto

- **Produto:** cardápio digital das empadas artesanais da Simone, com link de
  pedido via WhatsApp e QR Code para divulgação.
- **Público:** clientes finais (no `/`) e a própria Simone (edição de dados).
- **Stack:** Astro 5 (estático) · Tailwind CSS v4 (`@theme` em CSS) · Bun · deploy
  Vercel via `@astrojs/vercel`. QR Code via `qrcodejs` carregado por CDN.
- **Idioma:** pt-BR em todo o conteúdo visível (cardápio, copy, metadados).
- **Identidade visual:** **Catppuccin Mocha + Pink (acento)**, definida em
  `docs/DESIGN.md` e materializada em `src/styles/tokens.css` (Tailwind v4
  `@theme` + `@import "@catppuccin/tailwindcss/mocha.css"`). Tipografia:
  Fraunces (display) + Inter (body). Dark-mode nativo, fundo `base`
  `#1e1e2e` com gradiente radial sutil (glow pink no topo-esquerda,
  glow mauve no rodapé-direita, vinheta ao centro).

## 2. Skills disponíveis em `skills/`

Antes de mexer em qualquer coisa, carregue as skills relevantes ao pedido:

| Skill                    | Quando usar                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `frontend-design`        | Criar/refatorar página, componente, layout ou qualquer UI. Sempre que o pedido envolver HTML/CSS/JS/Astro. |
| `tailwind-design-system` | Trabalhar com tokens, `@theme`, variantes, padrões responsivos ou acessibilidade.              |
| `ui-design-system`       | Definir/ajustar tokens de design (cores, tipografia, espaçamento, sombras).                    |

> Regra: se o pedido envolver visual, sempre abra `frontend-design` primeiro.
> Se envolver tokens/tema, combine com `tailwind-design-system`.

## 3. Estrutura essencial

```
empadas-da-simone/
├── src/
│   ├── data/cardapio.json       # ÚNICA fonte de verdade do cardápio
│   ├── layouts/Base.astro       # <html>, fontes, importa tokens.css
│   ├── styles/
│   │   └── tokens.css           # @theme do Tailwind v4 + Catppuccin Mocha (cores, fontes, raio, sombra, animação)
│   ├── components/
│   │   ├── CategoryNav.astro    # nav sticky com âncoras
│   │   ├── CategorySection.astro# seção (renderiza sabores / salgadas / doces)
│   │   ├── MenuCard.astro       # 1 ou vários preços
│   │   ├── MenuGrid.astro       # grade responsiva
│   │   └── ShareBar.astro       # WhatsApp, copiar, QR Code
│   └── pages/
│       ├── index.astro          # cardápio
│       └── compartilhar.astro   # QR Code grande
├── astro.config.mjs
├── package.json
└── docs/
    ├── AGENT.md                 # este arquivo (regras do agente)
    └── DESIGN.md                # manifesto do design system (paleta, tipografia, componentes)
```

## 4. Modelo de dados (`src/data/cardapio.json`)

```jsonc
{
  "categorias": [
    {
      "id": "empadoes",                 // vira #ancora (kebab-case)
      "titulo": "Empadões",
      "subtitulo": "...",
      "tamanhos": [                   // legenda + ordenação dos preços
        { "id": "P", "rotulo": "Pequena", "detalhe": "500g" }
      ],
      "sabores": [                    // categoria única (sem sub-grupo)
        { "nome": "Frango", "precos": { "P": 50, "M": 58, "G": 85, "GG": 120 } }
      ]
    },
    {
      "id": "empadas",
      "tamanhos": [ ... ],
      "salgadas": [ { "nome": "...", "precos": { "P": 6.5, "M": 9, "G": 12 } } ],
      "doces":    [ { "nome": "...", "precos": { "P": 6.5, "M": 9, "G": 12 } } ]
    },
    {
      "id": "empadinhas",
      "unidade": "Cento (100 un.)",   // itens de preço único
      "salgadas": [ { "nome": "Frango", "preco": 65 } ],
      "doces":    [ { "nome": "Doce de Leite", "preco": 65 } ]
    }
  ]
}
```

Regras:

- **Múltiplos preços** → `precos: { "P": 10, "M": 15, "G": 20 }` e `tamanhos[]`
  no nível da categoria (a chave do `precos` casa com `tamanhos[].id`).
- **Preço único** (cento, festa) → `preco: 65` (singular) e `unidade` no nível
  da categoria.
- **Sub-grupos** (salgada/doce) → use `salgadas` e/ou `doces`. Sem sub-grupo
  → use `sabores`.
- Preços são `number` em reais. A formatação `R$ 6,50` é feita com
  `toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })`.

## 5. Mapa de pedidos frequentes → como atender

| Pedido da Simone                                  | Onde mexer                                              | Skill sugerida |
| ------------------------------------------------- | ------------------------------------------------------- | -------------- |
| "Muda o preço do Frango G para R$X"               | `src/data/cardapio.json`                                | —              |
| "Tira o sabor X / adiciona o sabor Y"            | `src/data/cardapio.json` (entrada em `sabores`/`salgadas`/`doces`) | —              |
| "Adiciona uma categoria nova (ex.: Beijinhos)"    | `src/data/cardapio.json` (entrada em `categorias[]`)    | —              |
| "Muda o número do WhatsApp"                       | `src/components/ShareBar.astro` (link `wa.me/...`)      | —              |
| "Muda a cor rosa para outro tom"                  | `src/styles/tokens.css` (`--color-primary`, `--color-accent`) e migrar componentes para `text-primary`/`bg-accent` | `frontend-design` + `tailwind-design-system` |
| "Troca a fonte dos títulos"                       | `Base.astro` (`<link>` Google Fonts + `--font-display`)| `frontend-design` |
| "Reescreve o subtítulo da seção X"                | `src/data/cardapio.json` (`subtitulo` da categoria)      | —              |
| "Adiciona uma página nova"                        | `src/pages/<nome>.astro` reaproveitando `Base.astro`     | `frontend-design` |
| "Faz o cardápio ficar mais bonito/revisado"       | Componentes em `src/components/`                        | `frontend-design` + `tailwind-design-system` |

## 6. Convenções de código

- **Astro** com frontmatter `---` + JSX-like. Sem frameworks reativos.
- **Tailwind v4**: classes utilitárias direto no markup, **sem**
  `tailwind.config.js`. Tokens de tema ficam em `src/styles/tokens.css`
  dentro de `@theme`. Para adicionar token novo, edite lá.
- **Cores**: usar os tokens semânticos (`text-primary`, `bg-accent-soft`,
  `border-border`, etc.). Nada de `pink-*`/`rose-*`/`red-*` em markup novo.
  A escala antiga só pode ser tocada durante a migração documentada em
  `docs/DESIGN.md` §11.
- **Background do `body`**: `var(--color-bg)` + gradiente radial sutil
  (glow pink + glow mauve + vinheta central). Implementado em
  `src/styles/tokens.css`. Se for remover, mantenha apenas o glow
  pink — a vinheta é opcional.
- **Sem comentários no código** (regra do projeto). Exceção: este `AGENT.md`,
  `README.md` e arquivos de docs.
- **Sem emojis** em código nem em UI (a menos que Simone peça).
- **Preços** sempre como `number`. Nenhuma string tipo `"R$ 50,00"` no JSON.
- **Imagens**: hoje o projeto é só tipografia + cor. Se Simone pedir foto,
  usar `public/` e `<Image>`/`<img>` com `loading="lazy"`.
- **Acessibilidade**: contraste AA mínimo, foco visível (`focus-visible:ring`),
  `alt` em toda imagem, âncoras de nav com `aria-current` quando ativo.

## 7. Comportamento esperado do agente

### Antes de agir

1. **Ler o pedido inteiro** e listar mentalmente os arquivos afetados.
2. **Ler os arquivos** que serão editados (nunca editar no escuro — `Read` antes
   de `Edit`/`Write`).
3. Quando o pedido for vago (ex.: "deixa mais bonito"), **carregar
   `frontend-design`** antes de propor mudanças.

### Ao editar

- **JSON do cardápio:** preserve a ordem lógica das categorias (Empadões →
  Empadas → Empadinhas → Torteletes) e a ordem de preços (P → M → G → GG).
- **Componentes:** preserve os tipos TypeScript em frontmatter. Se criar
  interface nova, siga o padrão existente (`Tamanho`, `Sabor`, `Categoria`).
- **NÃO introduza dependência nova** sem avisar e justificar.
- **NÃO troque o runtime/packager** (Bun é mandatório).
- **NÃO remova** o adapter `@astrojs/vercel`.

### Ao terminar

1. Rodar `bun run build` para garantir que o build estático passa.
2. Resumir em **pt-BR**, em 1–4 linhas, o que mudou e em quais arquivos
   (`path:linha`).
3. Se o pedido for cosmético, sugerir abrir `/` no navegador para
   pré-visualizar (`bun run dev`).

## 8. Fronteiras (não fazer sem pedir)

- Não commitar nem dar push. Simone decide.
- Não criar branch nova. Trabalhar na branch atual.
- Não instalar pacotes (`bun add ...`) sem aprovação.
- Não tocar em `.env`, `.vercel/`, `node_modules/`, `dist/`, `bun.lock`
  manualmente.
- Não publicar/enviar mensagem no WhatsApp. O link é só `wa.me/...`.

## 9. Checklist de qualidade (auto-aplicar)

- [ ] `src/data/cardapio.json` é JSON válido (sem vírgula sobrando).
- [ ] Toda `categoria.id` é única e kebab-case.
- [ ] Toda chave em `precos{}` existe em `tamanhos[].id` da mesma categoria.
- [ ] Toda categoria com `sabores`/`salgadas`/`doces` tem ao menos 1 item.
- [ ] `bun run build` finaliza sem erro nem warning novo.
- [ ] Nenhuma string hardcoded de WhatsApp fora de `ShareBar.astro`.
- [ ] Copy em pt-BR, sem mistura com inglês.
- [ ] Sem comentários deixados no código.

## 10. Comando rápido de verificação

```bash
bun install
bun run build
bun run dev      # abre http://localhost:4321
```

> Em caso de erro de build, leia o stack, corrija a causa raiz e rode de novo.
> Não desabilite typecheck/lint para "destravar" o build.

## 11. Troubleshooting

### `ENOENT: .../dist/favicon.svg` no `bun run dev`

Causa: Vite/Astro guardou referência ao `dist/` da build anterior (que foi
apagado). O dev server tenta resolver `/favicon.svg` e mapeia para
`dist/favicon.svg`, que não existe mais.

Solução (rode nesta ordem):

```bash
pkill -9 -f "astro dev" 2>/dev/null
pkill -9 -f "vite" 2>/dev/null
rm -rf node_modules/.vite node_modules/.astro .astro .vercel dist
bun run dev
```

Se o `dist/` precisar existir para inspeção, rode `bun run build` antes de
`bun run dev` — ou use `bun run preview` em vez de `dev` para servir a build.

### `Port 4321 is in use`

Algum processo zombie segurando a porta. Identifique e mate:

```bash
ss -ltnp | grep 4321
kill <PID>
```
