# Calculadora de Economia · Sugestão de funcionalidade para a Sunne

> **Protótipo independente, feito por iniciativa própria.**
 Não é um projeto oficial e não tem vínculo com a Sunne. Os valores são estimativas baseadas em um desconto médio de 20% [fonte do 20%: ...] e não uma promessa de economia.

## Por que fiz isso (STAR)

**Situação**
A página inicial da Sunne convida o visitante a economizar na conta de
energia, com o botão "Quero economizar". Quem chega ali tem uma dúvida
natural antes de se cadastrar: *"quanto eu economizaria, de verdade?"*

**Tarefa**
Me interessei pelo setor de energia e pela vaga de desenvolvimento, então
decidi transformar essa dúvida em algo concreto: um protótipo que mostra
ao visitante a sua economia estimada em segundos, antes de ele decidir.

**Ação**
- Criei uma calculadora em que a pessoa digita o valor da conta de luz.
- Ela mostra a economia **mensal** e **anual** estimadas.
- Tratei os casos inválidos (campo vazio, zero, negativo ou valor absurdo)
  com uma mensagem amigável em vez de um resultado errado.
- Incluí um aviso de que o valor é uma média, para ser transparente.
- Cuidei da acessibilidade (a região do resultado avisa leitores de tela
  quando o valor muda).
- Simplifiquei o código: a primeira versão tinha dois perfis (casa e
  negócio), mas ambos tinham o mesmo desconto. Removi a opção redundante
  para a tela ficar mais direta.
- Usei IA como ferramenta de apoio e revisei o código para entender
  cada parte.

**Resultado**
- Um protótipo funcional que mostra o benefício em números, no momento
  em que o visitante está interessado.
- Aprendi a modelar regras de negócio em TypeScript, validar entradas e
  pensar na experiência de quem usa.
- Se fosse testar de verdade, eu mediria se quem usa a calculadora clica
  mais no "Quero economizar". Essa é uma **hipótese**, ainda não medi.

## O que eu não sei (e gostaria de aprender)

Não conheço as regras reais de desconto da Sunne, que podem variar por
distribuidora, região e consumo. Por isso o cálculo usa uma média simples.
Eu adoraria ouvir o time sobre como evoluir isso com dados reais.

## Como funciona

```javascript
economiaMensal = conta * 0.2
economiaAnual  = economiaMensal * 12
```

Resultados inválidos devolvem `null`, e a tela pede o valor da conta.

## Tecnologias

React · TypeScript · Tailwind CSS · [...]

## Como rodar

```bash
git clone https://github.com/estevao7/[nome-do-repositorio].git
cd [nome-do-repositorio]
npm install
npm run dev
```

## Próximos passos (ideias)

- Usar tarifas reais por distribuidora
- Testes automatizados da função `calculateSavings`
- Medir o impacto no clique do botão "Quero economizar"

## Autor

Estêvão · [GitHub](https://github.com/estevao7) ·
[LinkedIn](https://linkedin.com/in/estevãoperez-508ba1229)