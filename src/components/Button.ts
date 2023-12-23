type ExpressionCallback = (
  expression: HTMLSpanElement,
  index: number
) => HTMLSpanElement;

function insert(
  expression: HTMLSpanElement,
  index: number,
  value: string,
  className = 'keys'
): HTMLSpanElement {
  const elements = expression.querySelectorAll('span');
  const elementArray = Array.from(elements);
  const newElement = document.createElement('span');
  newElement.classList.add(className);
  newElement.innerText = value;
  if (elementArray.length === 0) {
    elementArray.push(newElement);
  } else {
    elementArray.splice(index, 0, newElement);
  }
  elements.forEach((element) => element.remove());
  elementArray.forEach((element) => expression.appendChild(element));
  return expression;
}

abstract class Button {
  protected abstract callback: ExpressionCallback;
  protected abstract value: HTMLSpanElement;
  constructor(protected symbol: string, protected className: string) {}

  getSymbol(): string {
    return this.symbol;
  }

  getClassName(): string {
    return this.className;
  }

  getValue(): HTMLSpanElement {
    return this.value;
  }

  setValue(value: HTMLSpanElement): void {
    this.value = value;
  }

  setAction(callback: ExpressionCallback): void {
    this.callback = callback;
  }

  onClick(expression: HTMLSpanElement, index: number): HTMLSpanElement {
    return this.callback(expression, index);
  }
}

class BasicButton extends Button {
  protected value = document.createElement('span');
  protected callback: ExpressionCallback = (
    expression: HTMLSpanElement,
    index: number
  ): HTMLSpanElement => {
    // insert the symbol in the expression by the index
    return insert(expression, index, this.symbol, this.className);
  };
  constructor(symbol: string, className = 'basic-keys') {
    super(symbol, className);
    this.value.innerText = symbol;
  }
}

class SpecialButton extends Button {
  protected value = document.createElement('span');
  protected callback: ExpressionCallback;
  protected displayedSymbol = '';
  constructor(
    symbol: string,
    callback: ExpressionCallback,
    displayedSymbol = '',
    className = 'special-keys'
  ) {
    super(symbol, className);
    this.callback = callback;
    if (displayedSymbol === '') {
      this.displayedSymbol = symbol;
    } else {
      this.displayedSymbol = displayedSymbol;
    }
  }
}

export { Button, BasicButton, SpecialButton };
