<template>
  <div class="calculator">
    <span class="logo">GITHUB</span>
    <span class="model">TS-V2</span>
    <span class="svpam">S.W.A.R.F.T.E</span>

    <div class="screen">
      <div class="input">
        <span class="expression" ref="calcExpression"> </span>
      </div>
      <div class="main-display">
        <span class="output"> {{ output }} </span>
      </div>
    </div>

    <div class="modifiers">
      <button class="shift center-shift" tabindex="1"></button>
      <button class="alpha center-alpha" tabindex="2"></button>
      <button
        class="on center-shift CLS"
        tabindex="3"
        @click="calcExpression.innerHTML = ''"
      ></button>
      <button class="mode center-shift DEL" tabindex="4"></button>
    </div>

    <table class="function-keys">
      <tr v-for="row in specialKey" :key="row[0].getSymbol()">
        <td v-for="button in row" :key="button.getSymbol()">
          <button
            :class="button.getClassName()"
            @click="
              button.onClick(
                (calcExpression = calcExpression),
                calcExpression.querySelectorAll('span').length
              )
            "
            v-html="button.getSymbol()"
          ></button>
        </td>
      </tr>
    </table>

    <table class="basic-keys">
      <tr v-for="row in basicKey" :key="row[0].getSymbol()">
        <td v-for="button in row" :key="button.getSymbol()">
          <button
            :class="button.getClassName()"
            @click="
              calcExpression = button.onClick(
                calcExpression,
                calcExpression.querySelectorAll('span').length
              )
            "
          >
            {{ button.getSymbol() }}
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Button, BasicButton, SpecialButton } from 'src/components/Button';
import nerdamer from "nerdamer/all.min.js"

const calcExpression = ref<HTMLSpanElement>(document.createElement('span'));
let output = ref(0);
setInterval(() => {
  const oldResult = output.value;
  try {
    output.value = nerdamer(parseExpression(calcExpression.value)).evaluate();
  } catch (error) {
    console.log(error);
    output.value = oldResult;
  }
}, 100);

function supSymbol(symbol: string) {
  return `<span class="sup">${symbol}</span>`;
}

function xxsSymbol(symbol: string) {
  return `<span class="xxs">${symbol}</span>`;
}

function parseExpression(expression: HTMLSpanElement): string {
  const elements = expression.querySelectorAll('span');
  const arrays = Array.from(elements);
  const exp = arrays.map((element) => element.textContent).join('');
  const escapedExpression = escapeExpression(exp);
  return escapedExpression;
}

const buttons = {
  '1': new BasicButton('1'),
  '2': new BasicButton('2'),
  '3': new BasicButton('3'),
  '4': new BasicButton('4'),
  '5': new BasicButton('5'),
  '6': new BasicButton('6'),
  '7': new BasicButton('7'),
  '8': new BasicButton('8'),
  '9': new BasicButton('9'),
  '0': new BasicButton('0'),
  '.': new BasicButton('.'),
  Ans: new BasicButton('Ans'),
  '%': new BasicButton('%'),
  '=': new BasicButton('='),
  '+': new BasicButton('+'),
  '-': new BasicButton('-'),
  x: new BasicButton('x'),
  '÷': new BasicButton('÷'),
  E: new BasicButton('E'),
  π: new BasicButton('π'),
  sin: new BasicButton('sin'),
  cos: new BasicButton('cos'),
  tan: new BasicButton('tan'),
  asin: new BasicButton('sin' + supSymbol('-1')),
  acos: new BasicButton('cos' + supSymbol('-1')),
  atan: new BasicButton('tan' + supSymbol('-1')),
  sqrt: new BasicButton('&radic;'),
  square: new BasicButton('x' + supSymbol('2')),
  exponent: new BasicButton('x' + supSymbol('y')),
  log: new BasicButton('log'),
  ln: new BasicButton('ln'),
  fraction: new BasicButton(`a${supSymbol('b')}/${xxsSymbol('c')}`),
  ENG: new BasicButton('ENG'),
  reciprocal: new BasicButton('x' + supSymbol('-1')),
  '(': new BasicButton('('),
  ')': new BasicButton(')'),
  SD: new BasicButton('S<>D'),
  '(-)': new BasicButton('(-)'),
  left: new BasicButton('<-'),
  right: new BasicButton('->'),
  nPr: new BasicButton('nPr'),
  nCr: new BasicButton('nCr'),
  '!': new BasicButton('!'),
  '/%': new BasicButton('/%'),
};

const basicKey: Button[][] = [
  ['7', '8', '9', 'E', 'π'],
  ['4', '5', '6', 'x', '÷'],
  ['1', '2', '3', '+', '-'],
  ['0', '.', 'Ans', '%', '='],
].map((row: string[]): BasicButton[] =>
  row.map(
    (symbol: string): BasicButton => buttons[symbol as keyof typeof buttons]
  )
);

const specialKey: Button[][] = [
  ['nPr', 'nCr', 'left', 'right', '!', '/%'],
  ['reciprocal', 'sqrt', 'square', 'exponent', 'log', 'ln'],
  ['asin', 'acos', 'atan', 'sin', 'cos', 'tan'],
  ['fraction', 'ENG', '(', ')', 'SD', '(-)'],
].map((row: string[]): BasicButton[] =>
  row.map(
    (symbol: string): BasicButton => buttons[symbol as keyof typeof buttons]
  )
);

const escapeDict: { [key: string]: string } = {
  x: '*',
  '÷': '/',
};

function escapeExpression(expression: string): string {
  for (const [key, value] of Object.entries(escapeDict)) {
    expression = expression.replaceAll(String(key), value);
  }
  return expression;
}
</script>
