import { create, all } from "mathjs";

const config = {
  epsilon: 1e-12,
  precision: 128,
};

const answer = ref(null as number | null);

export const useAnswer = () => {
  return answer;
};

export const setAnswer = (value: number | null) => {
  answer.value = value;
};

const math = create(all, config);

export const useMath = () => {
  return math;
};

export const filterExpression = (expression: string) => {
  if (answer.value !== null) {
    expression = expression.replace("ans", (answer.value as number).toString());
  } else {
    expression = expression.replace("ans", "0");
  }
  return expression;
};

export const useCalculate = (expression: string) => {
  const parser = math.parser();
  expression = filterExpression(expression);
  const result = parser.evaluate(expression);
  return math.format(result, { precision: 14 });
};
