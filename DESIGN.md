# DESIGN — Empadas da Simone

Manifesto do sistema de design. Lê-se em conjunto com `AGENT.md` (regras do
agente) e `README.md` (setup do projeto).

---

## 1. Direção estética — "Cozinha noturna, plana, objetiva"

A estética atual é a **Catppuccin Mocha**: fundo escuro liso (tom
`base` `#1e1e2e`), texto claro e quente (`text` `#cdd6f4`), e a cor de
marca é o **Pink** da paleta (`#f5c2e7`). Dark-mode nativo, sem
gradientes decorativos — a atmosfera vem das sombras, bordas e
hierarquia tipográfica, não de pintura de fundo.

Três referências que sustentam a escolha:

- **Pastelaria iluminada por luz de LED quente** — pastéis saturados
  sobre fundo escuro profundo.
- **Aplicativos noturnos bem-feitos** (Things, Bear) — UI plana, limpa,
  séria, com toques de cor onde importa.
- **Catppuccin original** — a paleta que originou o tema; seguimos as
  regras da comunidade (acentuar Pink sem depender só dele).

> A estética é **plana e objetiva**. Sem gradientes de fundo. Sem
> texturas decorativas. Pink entra como acento, não como banho.

---

## 2. Princípios

1. **Mocha é a tela, Pink é o pincel.** A base escura é o padrão; o
   rosa-pastel é a cor que **faz alguma coisa** (CTA, preço, hover, foco).
2. **Tipografia com opinião.** Display serif com curva (Fraunces) e
   body humanist (Sora). Nunca Inter/Roboto/Arial.
3. **Catppuccin é fonte da verdade.** Todos os valores de cor vêm
   diretamente do `@catppuccin/tailwindcss/mocha.css` (instalado em
   `node_modules/`). Trocar de flavor (Latte, Frappé, Macchiato) é
   trocar o `@import` em `tokens.css`.
4. **Hierarquia pelo tamanho, não pelo brilho.** Título grande respira
   mais do que título pequeno + bold.
5. **Espaço é ingrediente.** `gap-6` no mínimo entre cards. `py-16`
   no mínimo entre seções.
6. **Animação conta história.** Stagger no carregamento, micro-feedback
   em hover. Nada de parallax ou spin.
7. **Acessibilidade não é apêndice.** Foco visível, contraste AA, sem
   dependência de cor para indicar estado.

---

## 3. Paleta de cores — Catppuccin Mocha + Pink (acento)

A paleta raw é carregada via `@import "@catppuccin/tailwindcss/mocha.css"`
em `src/styles/tokens.css`. Isso expõe os utilitários `bg-ctp-*` e `text-ctp-*`
no markup. Em paralelo, o `@theme` define **tokens semânticos** que
apontam para os valores do Mocha.

### 3.1. Cores de superfície (Mocha)

| Token                  | Hex        | Origem Mocha     | Uso                                |
| ---------------------- | ---------- | ---------------- | ---------------------------------- |
| `--color-bg`           | `#1e1e2e`  | `base`           | Fundo da página                    |
| `--color-bg-elev`      | `#181825`  | `mantle`         | Faixas elevadas (nav, doces)       |
| `--color-surface`      | `#313244`  | `surface0`       | Cartão padrão                      |
| `--color-surface-warm` | `#45475a`  | `surface1`       | Cartão "quentinho"                 |

### 3.2. Cores de texto (Mocha)

| Token              | Hex        | Origem Mocha | Uso                                |
| ------------------ | ---------- | ------------ | ---------------------------------- |
| `--color-fg`       | `#cdd6f4`  | `text`       | Texto principal                    |
| `--color-muted`    | `#bac2de`  | `subtext1`   | Texto secundário                   |
| `--color-subtle`   | `#a6adc8`  | `subtext0`   | Texto terciário (rótulos, micro)   |

### 3.3. Pink — cor de marca (acento)

| Token                    | Hex        | Origem     | Uso                                  |
| ------------------------ | ---------- | ---------- | ------------------------------------ |
| `--color-primary`        | `#f5c2e7`  | `ctp-pink` | CTAs, links, preços, hover forte     |
| `--color-primary-soft`   | `#4a3a4f`  | dimmer     | Fundo de tag primária, fundo de chip |
| `--color-primary-fg`     | `#1e1e2e`  | `base`     | Texto sobre `--color-primary`       |

### 3.4. Peach — seção "Doces" (acento secundário)

| Token                  | Hex        | Origem      | Uso                                  |
| ---------------------- | ---------- | ----------- | ------------------------------------ |
| `--color-sweet`        | `#fab387`  | `ctp-peach` | Bullet "Doces", destaques de mel     |
| `--color-sweet-soft`   | `#4a3a2a`  | dimmer      | Fundo de cartão doce (sutil)         |
| `--color-sweet-fg`     | `#1e1e2e`  | `base`      | Texto sobre `--color-sweet`          |

### 3.5. Estados, bordas e foco

| Token                    | Hex        | Origem          | Uso                                  |
| ------------------------ | ---------- | --------------- | ------------------------------------ |
| `--color-success`        | `#a6e3a1`  | `ctp-green`     | Confirmação (botão "Copiado!")       |
| `--color-success-fg`     | `#1e1e2e`  | `base`          | Texto sobre `--color-success`        |
| `--color-danger`         | `#f38ba8`  | `ctp-red`       | Erro                                 |
| `--color-danger-fg`      | `#1e1e2e`  | `base`          | Texto sobre `--color-danger`         |
| `--color-border`         | `#45475a`  | `ctp-surface1`  | Borda padrão                         |
| `--color-border-strong`  | `#585b70`  | `ctp-surface2`  | Borda em hover/ativo                 |
| `--color-ring`           | `#f5c2e7`  | `ctp-pink`      | Anel de foco (= pink)                |

### 3.6. Como reaproveitar Catppuccin direto no markup

Quando quiser usar uma cor crua do Mocha sem passar pelos tokens
semânticos (ex.: um gradiente decorativo), use a utility `ctp-*`:

```html
<span class="text-ctp-peach">mel</span>
<div class="bg-ctp-mantle">...</div>
```

Lista resumida dos sufixos Catppuccin disponíveis:
`rosewater`, `flamingo`, `pink`, `mauve`, `red`, `maroon`, `peach`,
`yellow`, `green`, `teal`, `sky`, `sapphire`, `blue`, `lavender`,
`text`, `subtext1`, `subtext0`, `overlay2`, `overlay1`, `overlay0`,
`surface2`, `surface1`, `surface0`, `base`, `mantle`, `crust`.

> **Regra:** prefira os tokens semânticos (`text-primary`,
> `bg-accent-soft`). Use `ctp-*` só para decoração crua (gradientes
> multicolor, ilustrações inline).

---

## 4. Tipografia

| Função     | Família                                  | Pesos                 | Token CSS          |
| ---------- | ---------------------------------------- | --------------------- | ------------------ |
| Display    | **Fraunces** (serif variável)            | 400–700, ital, opsz 9–144 | `--font-display` |
| Body       | **Inter** (humanist sans)                | 300–700               | `--font-body`      |
| Numérico   | body + `.num` (tabular-nums)             | —                     | classe utilitária  |

Ambas vêm do Google Fonts. O link fica em `Base.astro`.

### 4.1. Escala de tamanho

| Token       | Valor         | Uso típico                |
| ----------- | ------------- | ------------------------- |
| `text-xs`   | `0.75rem`     | Rótulos, micro-copy       |
| `text-sm`   | `0.875rem`    | Corpo secundário          |
| `text-base` | `1rem`        | Corpo padrão              |
| `text-lg`   | `1.125rem`    | Lead / subtítulo          |
| `text-xl`   | `1.25rem`     | Nome de sabor em card     |
| `text-2xl`  | `1.5rem`      | H3 de subseção            |
| `text-3xl`  | `1.875rem`    | H2 de categoria           |
| `text-4xl`  | `2.25rem`     | H1 / nome de marca        |
| `text-5xl`  | `3rem`        | Hero título               |
| `text-7xl`  | `4.5rem`      | Hero dramático (≥ sm)     |

### 4.2. Boas práticas

- **H1 só um por página.** "Empadas da Simone" é a exceção autorizada a
  quebrar a regra das 3 linhas.
- **Italic de display** só no subtítulo da marca (`da Simone` em itálico).
- **Sora italic** não existe; se precisar de itálico no corpo, use `<em>`
  com classe `text-fg`.
- **Preços** sempre em `.num` (tabular-nums) para alinhar colunas.

---

## 5. Espaçamento

Grid de 4px. Use os utilitários padrão do Tailwind:

`1 · 2 · 3 · 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64`

Receita:

- `gap-3` (12px) dentro de card.
- `gap-6` (24px) entre cards de uma grade.
- `py-12` a `py-16` em seções.
- `mt-20` a `mt-28` entre seções principais.

---

## 6. Raio e elevação

### 6.1. Raio

| Token             | Valor      | Uso                                     |
| ----------------- | ---------- | --------------------------------------- |
| `--radius-sm`     | `0.5rem`   | Botão, badge pequeno                    |
| `--radius-md`     | `0.875rem` | Input, tag                              |
| `--radius-lg`     | `1.25rem`  | **Card padrão**                         |
| `--radius-xl`     | `1.75rem`  | Card grande / hero                      |
| `--radius-2xl`    | `2.5rem`   | Cartão "manta" (subseção)               |
| `--radius-pill`   | `9999px`   | CTA, badge                              |

### 6.2. Sombras

| Token             | Uso                                  |
| ----------------- | ------------------------------------ |
| `--shadow-xs`     | Sombra de "encostado"                |
| `--shadow-sm`     | Card em repouso                      |
| `--shadow-md`     | Card em hover                        |
| `--shadow-lg`     | Modal, menu suspenso                 |
| `--shadow-paper`  | Hero / primeira dobra                |

Todas as sombras são **tintadas** com `--color-fg` para nunca parecerem
soltas do papel — no Mocha isso significa sombra preta bem diluída
sobre o fundo escuro, simulando "luz lateral".

---

## 7. Movimento

Princípio: **uma cena de entrada orquestada** vale mais que vinte
microinterações espalhadas.

- **Carregamento da home:** stagger de 60ms entre seções, usando
  `--animate-fade-up`.
- **Hover em card:** sombra cresce + `translate-y-[-2px]` em 200ms.
- **CTA principal (WhatsApp):** permanece estático (Catppuccin Green já
  é vibrante o suficiente).
- **Botão "Copiar":** troca para `bg-success` por 2.2s, depois volta.
- **Sem** parallax, **sem** rotate3d, **sem** confetti.

Respeitar `prefers-reduced-motion`: desativar `--animate-*` quando o user
pediu menos movimento.

---

## 8. Componentes — esqueleto

Especificações de alto nível. Cada componente tem detalhes no próprio
arquivo `.astro`.

### 8.1. `MenuCard`

- Fundo: `bg-surface`
- Borda: `border border-border`, vira `border-border-strong` em hover
- Raio: `rounded-2xl` (`--radius-lg`)
- Sombra: `shadow-sm`, vira `shadow-md` em hover
- Padding: `p-5 sm:p-6`
- Top accent bar: `h-1 bg-gradient-to-r from-primary-soft via-primary to-primary` (única deixa rosa)
- Nome: `font-display text-xl text-fg`
- Preço: `font-display text-primary num`
- Tamanho: `text-muted`, rótulo em `text-fg font-semibold`

### 8.2. `CategorySection`

- H2: `font-display text-3xl sm:text-4xl text-fg`
- Subtítulo: `text-muted text-base sm:text-lg max-w-2xl`
- Tamanhos (chips): `bg-primary-soft text-primary border border-primary-soft rounded-pill`
- Bullet "Salgadas": `bg-primary` (círculo pink)
- Bullet "Doces": `bg-sweet` (círculo peach)
- Doces wrapper: `bg-bg-elev/40 rounded-2xl` (sutil)

### 8.3. `CategoryNav` (sticky)

- Fundo: `bg-bg-elev/85 backdrop-blur`
- Borda: `border border-border`
- Links: `text-fg hover:text-primary hover:bg-primary-soft rounded-xl`

### 8.4. `ShareBar`

- Container: `bg-surface border-border rounded-2xl`
- Ícone badge: `bg-primary-soft text-primary rounded-full`
- H2: `text-fg`
- WhatsApp: `bg-success text-success-fg rounded-pill`
- Copiar: `bg-primary text-primary-fg rounded-pill`
- QR Code: `bg-primary-soft text-primary rounded-pill`
- QR container expandido: `bg-bg-elev border-border`

### 8.5. Botão fantasma (secundário)

- `border border-border-strong text-fg rounded-pill px-4 py-2`
- Hover: `bg-bg-elev`

---

## 9. Tom de voz (copy)

- **Pessoa, não marca.** "Feito com ♥ por Simone", nunca "© Empadas
  da Simone 2026".
- **Frase curta, vírgula no lugar certo.** "Massa amanteigada. Recheio
  generoso. Perfeito pra família toda."
- **Pt-BR, com sotaque.** "torteletes", "cento", "empadinha", "meio
  cento". Sem "cookie", "delivery", "best-seller".
- **Sem exclamações em série.** Uma por copy, no máximo.
- **Preço como identidade.** "R$ 6,00" é tão parte do cardápio quanto o
  nome do sabor. Sempre visível em `text-primary`.

---

## 10. Acessibilidade

- Contraste mínimo AA (4.5:1) para texto normal, 3:1 para grande.
  Pares verificados:
  - `text-fg` (#cdd6f4) sobre `bg-bg` (#1e1e2e) → 13.6:1 ✓
  - `text-muted` (#bac2de) sobre `bg-bg` → 10.8:1 ✓
  - `text-primary` (#f5c2e7) sobre `bg-bg` → 12.1:1 ✓
  - `text-primary-fg` (#1e1e2e) sobre `bg-primary` (#f5c2e7) → 12.1:1 ✓
- Foco sempre visível (regra em `tokens.css`).
- Hierarquia semântica: `<h1>` único, `<h2>` por categoria, `<h3>` por
  subgrupo (salgadas/doces).
- Imagens com `alt`.
- Âncoras da nav com `aria-current="location"` quando a seção está
  visível.
- Formatação monetária: `R$ 6,00` literal na tela, com `aria-label="seis
  reais"` para leitores de tela.

---

## 11. Migração a partir do estado anterior

| Antes (rosa-bolha)                 | Depois (Mocha + Pink)                              |
| ---------------------------------- | -------------------------------------------------- |
| `bg-pink-50`                       | `bg-bg` (vem do body em tokens.css)                |
| `bg-white` (em card)               | `bg-surface`                                       |
| `text-pink-900`                    | `text-fg`                                          |
| `text-pink-800`                    | `text-muted`                                       |
| `text-pink-600` (títulos)          | `text-primary` (pink) ou `text-fg`                 |
| `bg-pink-100` (chips)              | `bg-primary-soft text-primary`                     |
| `bg-pink-600` (CTA)                | `bg-primary text-primary-fg`                       |
| `bg-green-500` (WhatsApp)          | `bg-success text-success-fg`                       |
| `font-display` (Playfair Display)  | `font-display` (agora Fraunces)                    |
| `font-body` (Lato)                 | `font-body` (agora Sora)                           |
| `rounded-full` (em card grande)    | `rounded-2xl`                                      |
| `meta theme-color="#db2777"`       | `meta theme-color="#1e1e2e"`                       |

A migração está completa em todos os componentes. O que sobra
documental é esta nota, para que futuras edições saibam o porquê.

---

## 12. Como estender

1. **Trocar o flavor Catppuccin** (Latte, Frappé, Macchiato, Mocha):
   troque o `@import` em `src/styles/tokens.css` (linha 2). Os tokens
   semânticos continuam os mesmos — só a cor por trás muda.
2. **Mudar a cor de acento:** altere `--color-primary` em `tokens.css`
   para outra cor `ctp-*` (ex.: `var(--catppuccin-color-mauve)`).
3. **Novo token de cor:** adicione em `@theme` em `tokens.css` no grupo
   semântico certo (superfície, marca, seção, estado).
4. **Nova animação:** declare `--animate-*` + `@keyframes` no mesmo
   `@theme`.
5. **Novo tamanho de fonte:** use os utilitários padrão do Tailwind
   (`text-base`, `text-2xl`...). Para um novo degrau, ajuste `--text-*`
   no `@theme`.
6. **Novo componente:** siga as convenções em
   `src/components/CategorySection.astro` (`Tamanho`, `Sabor`,
   `Categoria`) e os tokens desta página.
7. **Dúvida?** Abra o `AGENT.md` na seção 5 (mapa de pedidos) e na 6
   (convenções de código).
