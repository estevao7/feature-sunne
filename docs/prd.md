# PRD — Calculadora de Economia Sunne

## 1. Visão geral
Criar uma funcionalidade (seção/componente) para o site da Sunne que mostra ao visitante **quanto ele pode economizar na conta de energia** se contratar a Sunne, de forma **mensal** e **anual**, como um atrativo para o botão "Quero economizar".

Analogia: é como uma "máquina de simulação" — o visitante coloca quanto paga hoje e a tela devolve, na hora, quanto ele deixaria de gastar.

## 2. Objetivo
- Atrair o visitante mostrando a economia de forma clara e rápida.
- Converter para o CTA "Quero economizar".

## 3. Stack (obrigatória)
- Vite + React + TypeScript
- Tailwind CSS (instalado via plugin do Vite: `tailwindcss` + `@tailwindcss/vite`)
- Node.js apenas para build/ferramentas (NÃO há backend)
- Deploy: GitHub Actions + GitHub Pages

## 3.1 Regras de código
- Tudo tipado, sem `any`.
- Componentes funcionais com `useState`; usar `useEffect` apenas se realmente necessário (valores derivados devem ser calculados no render, sem `useEffect`).
- Mobile-first: estilos base para celular, depois `sm:`, `md:`, `lg:`.
- Lógica de cálculo em função pura, separada dos componentes.

## 4. Identidade visual (cores extraídas do site da Sunne)
Definir como tokens no Tailwind (`@theme` em `src/index.css`):

| Token | Hex | Uso |
|---|---|---|
| `sunne-plum` | `#33001A` | fundo escuro, títulos |
| `sunne-plum-soft` | `#4A1D34` | textos secundários |
| `sunne-orange` | `#FF6B1A` | botões/CTA, destaques |
| `sunne-orange-soft` | `#FFA16E` | hover, detalhes |
| `sunne-peach` | `#F2C7A3` | seções de apoio |
| `sunne-mist` | `#F5FAFA` | fundo claro da seção |
| `sunne-border` | `#DBDDDD` | bordas de cards |

- Fonte: Poppins (Google Fonts), pesos 400, 500, 600, 700.
- Estilo: cards com borda fina e cantos arredondados; botão CTA em formato "pílula" laranja com texto branco.

## 5. Requisitos funcionais
1. O usuário informa o **valor médio da conta de luz mensal** (R$).
2. O usuário escolhe o perfil: **Casa** ou **Negócio**.
3. O sistema mostra, em tempo real:
   - Economia **mensal** estimada (R$)
   - Economia **anual** estimada (R$)
   - (Opcional) "Sua conta poderia ir de R$ X para R$ Y"
4. Exibir **aviso visível** perto do resultado:
   > "O desconto é uma **média** e os valores são uma **estimativa**. A economia real pode variar conforme seu consumo e sua distribuidora."
5. Botão CTA "Quero economizar" (link configurável em constante).
6. Validação: valor vazio, zero ou negativo não calcula (mostra estado vazio); limite máximo de R$ 100.000.

## 6. Regra de cálculo
```ts
// src/lib/savings.ts
export type Profile = 'home' | 'business'

export const AVERAGE_DISCOUNT_RATE: Record<Profile, number> = {
  home: 0.20,      
  business: 0.20,  
}

export type SavingsResult = {
  monthlySavings: number
  annualSavings: number
  newMonthlyBill: number
}

export function calculateSavings(monthlyBill: number, profile: Profile): SavingsResult {
  const rate = AVERAGE_DISCOUNT_RATE[profile]
  const monthlySavings = monthlyBill * rate
  return {
    monthlySavings,
    annualSavings: monthlySavings * 12,
    newMonthlyBill: monthlyBill - monthlySavings,
  }
}
```
- Formatar moeda com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })` em `src/lib/format.ts`.

## 7. Componentes
```
src/
  components/
    SavingsCalculator.tsx   // container: guarda os estados (useState)
    BillInput.tsx           // campo de valor (inputMode="numeric", label, erro)
    ProfileToggle.tsx       // alternância Casa | Negócio
    SavingsResult.tsx       // área de resultado
    ResultCard.tsx          // card reutilizável (título + valor)
    AverageDisclaimer.tsx   // aviso "desconto é uma média"
    CtaButton.tsx           // botão "Quero economizar"
  lib/
    savings.ts
    format.ts
  types/
    index.ts
  App.tsx
  main.tsx
  index.css                 // @import "tailwindcss"; @theme { cores + fonte }
```
Todas as props devem ser definidas com `type` próprio.

## 8. Layout (mobile-first)
- **Mobile (base):** uma coluna — título, campo, toggle, 2 cards empilhados (Mensal, Anual), aviso, CTA em largura total.
- **md (≥768px):** cards Mensal e Anual lado a lado.
- **lg (≥1024px):** formulário à esquerda e resultados à direita, container `max-w-5xl` centralizado.
- Fundo da seção: `sunne-mist`; card principal branco com borda `sunne-border`; resultado em destaque com fundo `sunne-plum` e valores em `sunne-orange`.
- Alvos de toque ≥ 44px, contraste adequado, `label` ligado ao input, `aria-live="polite"` na área de resultado.

## 9. Textos (pt-BR)
- Título: "Quanto você pode economizar com a Sunne?"
- Label: "Quanto você paga de energia por mês?"
- Cards: "Economia mensal estimada" / "Economia anual estimada"
- CTA: "Quero economizar"

## 10. Deploy (GitHub Actions + GitHub Pages)
- `vite.config.ts`: `base: '/NOME-DO-REPOSITORIO/'`.
- Workflow `.github/workflows/deploy.yml`, disparado em `push` na `main`, com:
  - `actions/checkout`, `actions/setup-node` (Node 20+), `npm ci`, `npm run build`
  - `actions/configure-pages`, `actions/upload-pages-artifact` (pasta `dist`), `actions/deploy-pages`
  - `permissions`: `contents: read`, `pages: write`, `id-token: write`
- No GitHub: Settings → Pages → Source: **GitHub Actions**.

## 11. Critérios de aceite
- [ ] Digitar R$ 300 em "Casa" mostra economia mensal R$ 60,00 e anual R$ 720,00 (com 20%).
- [ ] Digitar R$ 300 em "Negócio" mostra economia mensal R$ 60,00 e anual R$ 720,00 (com 20%); trocar o perfil recalcula na hora.
- [ ] O aviso de "média/estimativa" sempre aparece junto do resultado.
- [ ] Funciona bem em 360px de largura, sem rolagem horizontal.
- [ ] Sem erros de TypeScript (`npm run build` passa) e sem `any`.
- [ ] Deploy automático funcionando no GitHub Pages.

## 12. Fora de escopo
Backend, login, integração com API da Sunne, cálculo por distribuidora/tarifa.

## 13. Ordem de implementação (um passo por vez)
1. Criar o projeto Vite (react-ts) e instalar o Tailwind via plugin do Vite.
2. Configurar tokens de cor e fonte em `index.css`.
3. Criar `types`, `lib/savings.ts` e `lib/format.ts`.
4. Criar os componentes pequenos (`ResultCard`, `AverageDisclaimer`, `CtaButton`).
5. Criar `BillInput` e `ProfileToggle`.
6. Montar `SavingsCalculator` com `useState` e `SavingsResult`.
7. Ajustar responsividade (`md:` e `lg:`) e acessibilidade.
8. Configurar `base` do Vite e o workflow de deploy.

## 14. Commits (inglês + tradução em português)
Seguir este padrão: `mensagem em inglês (tradução em português)`
- `chore: setup vite react ts with tailwind (configura vite, react, ts e tailwind)`
- `feat: add sunne theme tokens (adiciona cores e fonte da sunne)`
- `feat: add savings calculation logic (adiciona lógica de cálculo da economia)`
- `feat: add savings calculator components (adiciona componentes da calculadora)`
- `style: make layout responsive mobile-first (deixa o layout responsivo mobile-first)`
- `ci: add github pages deploy workflow (adiciona workflow de deploy no github pages)`