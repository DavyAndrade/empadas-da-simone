# Empadas da Simone

Cardápio digital das empadas artesanais da Simone, com link de pedido via WhatsApp
e QR Code para divulgação.

## Stack

- **Astro 5** (modo estático)
- **Tailwind CSS v4** (configuração CSS-first com `@theme`)
- **Bun** como runtime e gerenciador de pacotes
- **@astrojs/vercel** para deploy na Vercel
- **qrcodejs** via CDN (sem dependência instalada)

## Comandos

```bash
bun install        # instala as dependências
bun run dev        # servidor de desenvolvimento em http://localhost:4321
bun run build      # gera o site estático em ./dist
bun run preview    # serve o build localmente para inspeção
```

## Variáveis de ambiente

| Variável   | Descrição                                                              | Fallback                                  |
| ---------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| `SITE_URL` | URL pública do site (usada nos links de WhatsApp, copiar e QR Code).  | `https://empadas-da-simone.vercel.app`    |

Na Vercel, defina `SITE_URL` em **Project Settings → Environment Variables** com o
endereço definitivo do projeto (por exemplo, `https://empadasdasimone.com.br`).

## Estrutura

```
empadas-da-simone/
├── public/
│   └── favicon.svg
├── src/
│   ├── styles/
│   │   └── tokens.css        # @theme do Tailwind v4 (paleta, fontes, raio, sombra, animação)
│   ├── components/
│   │   ├── CategoryNav.astro      # sticky nav com âncoras
│   │   ├── CategorySection.astro  # seção de categoria (salgadas/doces)
│   │   ├── MenuCard.astro         # card com 1 ou vários preços
│   │   ├── MenuGrid.astro         # grade responsiva
│   │   └── ShareBar.astro
│   ├── data/
│   │   └── cardapio.json
│   ├── layouts/
│   │   └── Base.astro
│   └── pages/
│       ├── index.astro          # cardápio
│       └── compartilhar.astro   # QR Code grande + download
├── astro.config.mjs
├── package.json
├── README.md
├── docs/
│   ├── AGENT.md      # guia do agente de IA que atende Simone
│   └── DESIGN.md     # manifesto do design system (paleta, tipografia, componentes, tom de voz)
└── skills/           # skills carregadas sob demanda pelo agente
    ├── frontend-design/
    ├── tailwind-design-system/
    └── ui-design-system/
```

## Categorias do cardápio

| Categoria     | Tamanhos                                              | Sabores                                                                  |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------------------ |
| Empadões      | P (500g) · M (750g) · G (1kg) · GG (1,5kg)            | Salgados                                                                 |
| Empadas       | P (50ml) · M (100ml) · G (150ml)                      | Salgadas e doces                                                         |
| Empadinhas    | Festa — cento (100 un.)                               | Salgadas e doces                                                         |
| Torteletes    | Festa — cento (100 un.) · P (50ml)                    | Doces                                                                    |

### Modelo de dados (`src/data/cardapio.json`)

```jsonc
{
  "categorias": [
    {
      "id": "empoes",                  // usado em #ancora
      "titulo": "Empadões",
      "subtitulo": "...",
      "tamanhos": [                    // legenda + ordenação dos preços
        { "id": "P", "rotulo": "Pequena", "detalhe": "500g" }
      ],
      "sabores": [                     // categoria simples (apenas salgada)
        { "nome": "Frango", "precos": { "P": 38, "M": 55, "G": 72, "GG": 95 } }
      ]
    },
    {
      "id": "empadas",
      "tamanhos": [ ... ],
      "salgadas": [ { "nome": "...", "precos": { ... } } ],
      "doces":    [ { "nome": "...", "precos": { ... } } ]
    },
    {
      "id": "empadinhas",
      "unidade": "Cento (100 un.)",    // para itens com preço único
      "salgadas": [ { "nome": "Frango", "preco": 65 } ],
      "doces":    [ { "nome": "Doce de Leite", "preco": 65 } ]
    }
  ]
}
```

Regras:
- Para itens com **múltiplos preços**: use `precos: { "P": 10, "M": 15, ... }` e defina `tamanhos` no nível da categoria.
- Para itens com **preço único** (ex.: empadinhas, festas): use `preco: 65` e defina `unidade` no nível da categoria.
- Categoria com sub-grupos: use `salgadas` e/ou `doces`. Categoria única: use `sabores`.

## Páginas

- `/` — cardápio completo com a grade de sabores e a barra de compartilhamento.
- `/compartilhar` — página com QR Code grande (256×256) pronto para imprimir, baixar
  como PNG ou simplesmente exibir no celular da cliente.

## Personalização

- **Sabores e preços:** edite `src/data/cardapio.json`. Cada item aceita `nome` (string)
  e `preco` (number em reais). A formatação em `R$ 6,50` é feita automaticamente via
  `toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })`.
- **Cores, tipografia, raio, sombra, animação:** vivem em `src/styles/tokens.css`
  como tokens semânticos do Tailwind v4 (`@theme`). Para re-tematizar, altere
  as variáveis OKLCH naquele arquivo. Detalhes e rationale em
  [`docs/DESIGN.md`](docs/DESIGN.md).
- **Fontes:** Fraunces (títulos) e Sora (corpo) são carregadas do Google Fonts
  em `src/layouts/Base.astro`. Para trocar, ajuste o `<link>` e os tokens
  `--font-display` / `--font-body` em `tokens.css`.

## Deploy na Vercel

1. Suba o repositório para o GitHub.
2. Importe na Vercel como novo projeto (framework **Astro** detectado automaticamente).
3. Defina a variável `SITE_URL` nas configurações do projeto.
4. Deploy. O adapter `@astrojs/vercel` cuida do output estático.

## Atendimento por IA

O projeto inclui um agente de IA configurado para atender Simone (e
desenvolvedores) em tarefas do dia-a-dia: trocar preços, adicionar sabores,
revisar copy, ajustar visual, etc. As regras, convenções e mapa de pedidos
frequentes ficam em [`docs/AGENT.md`](docs/AGENT.md).

Skills carregadas sob demanda (em `skills/`):

- **frontend-design** — criação/refatoração de UI com estética intencional.
- **tailwind-design-system** — tokens `@theme`, variantes, responsivo, a11y.
- **ui-design-system** — geração e manutenção de tokens de design.

> Ao pedir mudanças de cardápio, o agente sempre lê `src/data/cardapio.json`
> primeiro e roda `bun run build` ao final para garantir que nada quebrou.
