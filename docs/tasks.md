# Tarefas de implementação

Este arquivo divide a implementação em tarefas sequenciais para agentes de IA. Consulte sempre o [PRD](./prd.md) para os requisitos, textos, regras visuais e detalhes técnicos; este arquivo registra apenas o escopo de cada etapa e como validá-la.

## Instruções para os agentes

- Execute somente a próxima tarefa pendente, na ordem abaixo (QUANDO TERMINAR DE EXECUTAR UMA TAREFA, PARE E ESPERE O COMANDO PARA EXECUTAR A PRÓXIMA ou siga a regra de executar 2 ou 3 tarefas juntas).
- Antes de começar, leia as seções do PRD indicadas na tarefa e confira o estado atual do projeto.
- Preserve o trabalho existente e não antecipe tarefas posteriores.
- Ao concluir, rode as validações indicadas, marque a tarefa como concluída e registre eventuais decisões ou bloqueios.
- Se houver conflito no PRD ou faltar uma decisão necessária, não invente um requisito: solicite a definição e atualize o PRD antes de prosseguir.

## Tarefas

### 1. Confirmar configurações de publicação e CTA

**Referências:** PRD §§ 5, 6, 10 e 11.

**Escopo:** Confirmar a taxa única de desconto de 20% e os valores concretos necessários para o link do CTA e para o `base` do GitHub Pages, se não puderem ser determinados pelo repositório.

**Status:** Concluída.

**Decisões registradas:**
- Desconto confirmado como taxa única de 20%; como Casa e Negócio têm o mesmo desconto, não haverá seleção de perfil na interface.
- O repositório remoto é `estevao7/feature-sunne`; o caminho base esperado para o GitHub Pages é `/feature-sunne/`.
- Destino do CTA confirmado: `https://sunne.economia.sunne.com.br/?_gl=1*1lvyhli*_gcl_au*MzM0MDQ1MTU2LjE3OTQ2MjU3ODY.*_ga*NjU3MzM3MTIuMTc5NDYyNTc4Nw..*_ga_47BBPVJZY0*czE3OTQ2NzA5MzYkbzIkZzAkdDE3OTQ2NzA5MzYkajYwJGwwJGgw`.

**Critério de aceitação:**
- [x] O destino do CTA e o caminho de publicação estão definidos.
- [x] A taxa única de 20% está confirmada e a seleção redundante de perfil foi retirada dos requisitos.

### 2. Configurar Tailwind e identidade visual

**Referências:** PRD §§ 3, 4 e 13, passo 2.

**Escopo:** Integrar o Tailwind CSS pelo plugin Vite e configurar os tokens de cores e a fonte conforme o PRD.

**Status:** Concluída.

**Resumo:** Tailwind integrado pelo plugin existente do Vite; tokens de cor Sunne e fonte Poppins disponíveis globalmente e emitidos no CSS de produção.

**Critério de aceitação:**
- [x] O Tailwind é processado pelo Vite sem erros e está importado na folha de estilos da aplicação.
- [x] Os tokens visuais e a fonte especificados no PRD estão disponíveis para uso.
- [x] `npm run build` passa.

### 3. Criar tipos e utilitários de cálculo e formatação

**Referências:** PRD §§ 3.1, 6 e 13, passo 3.

**Escopo:** Criar os tipos do domínio e implementar a função pura de cálculo e o formatador de moeda.

**Status:** Concluída.

**Resumo:** Criado o tipo `SavingsResult`, cálculo com taxa única de 20%, validação do valor entre R$ 0,01 e R$ 100.000, e formatação BRL em `pt-BR`. A função retorna `null` para valores inválidos. Incluídos testes automatizados com `node:test` e o script `npm test`.

**Critério de aceitação:**
- [x] Os tipos usam `type`, sem `interface` ou `any`.
- [x] A função de cálculo aplica a taxa única de 20% e retorna os valores previstos pelo PRD.
- [x] A formatação apresenta valores como moeda BRL em `pt-BR`.
- [x] Há validação automatizada para os casos válidos e inválidos relevantes, e ela passa.

### 4. Criar componentes de apresentação reutilizáveis

**Referências:** PRD §§ 7, 8, 9 e 13, passo 4.

**Escopo:** Implementar os componentes de card de resultado, aviso de estimativa e botão CTA.

**Status:** Concluída.

**Resumo:** Criados `ResultCard`, `AverageDisclaimer` e `CtaButton`, com props tipadas, estilos da identidade Sunne, valores formatados em BRL e CTA apontando para o destino confirmado na tarefa 1.

**Critério de aceitação:**
- [x] Cada componente recebe props descritas por um `type` próprio.
- [x] Os componentes exibem os textos e a apresentação definidos no PRD.
- [x] O CTA usa o destino definido ou registrado na tarefa 1.
- [x] A verificação de TypeScript passa.

### 5. Criar entrada da conta

**Referências:** PRD §§ 5, 7 e 13, passo 5.

**Escopo:** Implementar o campo de valor mensal. Não há seleção de perfil porque Casa e Negócio usam a mesma taxa de desconto.

**Status:** Concluída.

**Resumo:** Criado `BillInput`, com rótulo associado, entrada numérica, limites e mensagens acessíveis de validação. A seleção de perfil foi removida por ser redundante.

**Critério de aceitação:**
- [x] O campo tem `label` associado, aceita entrada numérica e respeita os limites e estados de validação do PRD.
- [x] A interface não exibe uma seleção de perfil redundante.
- [x] As props são definidas com `type`, sem `any`.
- [x] A verificação de TypeScript passa.

### 6. Montar a calculadora e conectar os resultados

**Referências:** PRD §§ 5, 6, 7, 8, 9 e 13, passo 6.

**Escopo:** Compor os componentes na calculadora, manter o estado necessário com `useState` e conectar a entrada à função de cálculo.

**Status:** Concluída.

**Resumo:** Montado o componente `SavingsCalculator` com estado para o valor da conta, resultados mensais e anuais atualizados durante a edição, aviso junto aos resultados, região `aria-live="polite"` e CTA configurado. Valores inválidos ou vazios mantêm os resultados ocultos.

**Critério de aceitação:**
- [x] Entradas válidas atualizam os resultados mensal e anual imediatamente.
- [x] Entrada vazia, zero, negativa ou acima do limite não apresenta cálculo.
- [x] O aviso de estimativa permanece visível junto ao resultado, e a região de resultado anuncia atualizações com `aria-live="polite"`.
- [x] O CTA é exibido e usa o destino configurado.
- [x] `npm run build` passa.

### 7. Ajustar responsividade e acessibilidade

**Referências:** PRD §§ 4, 8, 9 e 13, passo 7.

**Escopo:** Finalizar o layout mobile-first, comportamento em telas maiores e requisitos de acessibilidade.

**Status:** Concluída.

**Resumo:** Implementado layout mobile-first com cards lado a lado a partir de `md` e formulário/resultados em colunas em `lg`. Ajustados contraste do CTA e indicadores de foco; rótulos, alvos de toque e anúncio acessível dos resultados foram preservados.

**Critério de aceitação:**
- [x] A tela funciona em 360px sem rolagem horizontal.
- [x] Cards, formulário e resultados seguem a disposição indicada para os breakpoints do PRD.
- [x] Alvos de toque, contraste, associação de rótulos e anúncio acessível dos resultados atendem aos requisitos do PRD.

### 8. Configurar publicação no GitHub Pages

**Referências:** PRD §§ 10 e 13, passo 8.

**Escopo:** Configurar o caminho base do Vite e o workflow de publicação automatizada.

**Status:** Concluída.

**Resumo:** Confirmado o `base` `/feature-sunne/` e completado o workflow com `configure-pages`, build e publicação do artefato `dist`, Node 22 e permissões mínimas necessárias. O último deploy automático registrado no GitHub concluiu com sucesso.

**Critério de aceitação:**
- [x] O `base` corresponde ao caminho confirmado na tarefa 1.
- [x] O workflow executa build e publicação no GitHub Pages com as etapas e permissões especificadas no PRD.
- [x] O build de produção termina sem erros.

### 9. Validar a entrega completa

**Referências:** PRD §§ 5, 8, 10, 11 e 13.

**Escopo:** Fazer a verificação final integrada, cobrindo critérios funcionais, responsivos, de build e deploy.

**Status:** Concluída.

**Resumo:** Confirmados os resultados de R$ 60,00 mensais e R$ 720,00 anuais para uma conta de R$ 300; a seleção Casa/Negócio foi omitida porque não altera o desconto de 20%. Valores vazio, zero, negativo e acima do limite não calculam. Testados o aviso, a responsividade a 360/768/1024 px, o build, os testes, o lint, a ausência de `any` e o deploy automático previamente concluído com sucesso.

**Critério de aceitação:**
- [x] Todos os critérios aplicáveis da seção 11 do PRD foram verificados e atendidos.
- [x] `npm run build` passa, sem erros de TypeScript e sem uso de `any`.
- [x] As tarefas anteriores estão concluídas ou qualquer bloqueio restante está documentado sem ser apresentado como resolvido.
