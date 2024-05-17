import { create, all } from "mathjs";

const config = {
  epsilon: 1e-12,
  precision: 128,
};

const answer = ref(0);

export const useAnswer = () => {
  return answer;
};

export const setAnswer = (value: number) => {
  answer.value = value;
};

const math = create(all, config);

export const useMath = () => {
  return math;
};

export const filterExpression = (expression: string) => {
  expression = expression.replace("ans", answer.value.toString());
  return expression;
};

export const useCalculate = (expression: string) => {
  const parser = math.parser();
  expression = filterExpression(expression);
  const result = parser.evaluate(expression);
  setAnswer(result);
  return math.format(result, { precision: 14 });
};
