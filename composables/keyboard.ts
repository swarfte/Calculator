export interface Key {
  key: string;
  type: string;
}

export interface NumeralKey extends Key {
  type: "normal";
}

export interface OperatorKey extends Key {
  type: "operator";
}

export interface FunctionKey extends Key {
  type: "function";
}

export interface SpecialKey extends Key {
  type: "special";
  trigger: (
    inputExpression: Ref<string>,
    outputExpression: Ref<string>,
    key: string
  ) => void;
}

export const numeralKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
].map((key) => ({ key, type: "normal" } as NumeralKey));

export const operatorKeys = ["+", "-", "*", "/", "%"].map(
  (key) => ({ key, type: "operator" } as OperatorKey)
);

export const functionKeys = ["(", ")", "sqrt", "log", "ln", "exp"].map(
  (key) => ({ key, type: "function" } as FunctionKey)
);

import { useCalculate } from "./calculate";

const checkNumeralOrOperator = (symbol: string) => {
  return (
    !isNaN(Number(symbol)) || operatorKeys.map((k) => k.key).includes(symbol)
  );
};

export const specialKeys = [
  {
    key: "AC",
    type: "special",
    trigger: (
      inputExpress: Ref<string>,
      outputExpress: Ref<string>,
      key: string
    ) => {
      if (inputExpress.value !== "") {
        inputExpress.value = "";
      } else {
        outputExpress.value = "";
      }
    },
  },
  {
    key: "del",
    type: "special",
    trigger: (express: Ref<string>) => {
      // check if the previous is not a number or operator symbol
      if (!checkNumeralOrOperator(express.value[express.value.length - 1])) {
        // delete the previous word
        let wordLength = 1;
        while (
          !checkNumeralOrOperator(
            express.value[express.value.length - wordLength]
          ) &&
          wordLength < express.value.length
        ) {
          wordLength++;
        }
        express.value = express.value.slice(
          0,
          express.value.length - wordLength
        );
      } else {
        express.value = express.value.slice(0, express.value.length - 1);
      }
    },
  },
  {
    key: "ans",
    type: "special",
    trigger: (express: Ref<string>) => {
      express.value += "ans";
    },
  },
  {
    key: "=",
    type: "special",
    trigger: (
      inputExpress: Ref<string>,
      outputExpress: Ref<string>,
      key: string
    ) => {
      try {
        outputExpress.value = useCalculate(inputExpress.value);
        inputExpress.value = "ans";
      } catch (e) {
        outputExpress.value = "error";
      }
    },
  },
];

export const keyboard = {
  operatorKeys,
  numeralKeys,
  functionKeys,
  specialKeys,
};

export const useSimpleKeyboard = () => {
  const keyboard = ref([
    ["AC", "del", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["ans", "0", ".", "="],
  ]);
  return keyboard;
};

export const checkKeyType = (key: string) => {
  if (numeralKeys.map((k) => k.key).includes(key)) {
    return "normal";
  }
  if (operatorKeys.map((k) => k.key).includes(key)) {
    return "operator";
  }
  if (functionKeys.map((k) => k.key).includes(key)) {
    return "function";
  }
  if (specialKeys.map((k) => k.key).includes(key)) {
    return "special";
  }
  throw new Error("unknown key type");
};

export const useHandleNumeralKey = (
  inputExpression: Ref<string>,
  outputExpression: Ref<string>,
  key: string
) => {
  inputExpression.value += key;
};

export const useHandleOperatorKey = (
  inputExpression: Ref<string>,
  outputExpression: Ref<string>,
  key: string
) => {
  inputExpression.value += key;
};

export const useHandleFunctionKey = (
  inputExpression: Ref<string>,
  outputExpression: Ref<string>,
  key: string
) => {
  //TODO : handle function key
  inputExpression.value += key;
};

export const useHandleSpecialKey = (
  inputExpression: Ref<string>,
  outputExpression: Ref<string>,
  key: string
) => {
  const specialKey = specialKeys.find((k) => k.key === key);
  if (specialKey) {
    return specialKey.trigger(inputExpression, outputExpression, key);
  }
};

export const useHandleClick = (
  inputExpression: Ref<string>,
  outputExpression: Ref<string>,
  key: string
) => {
  const keyType = checkKeyType(key);
  switch (keyType) {
    case "normal":
      return useHandleNumeralKey(inputExpression, outputExpression, key);
    case "operator":
      return useHandleOperatorKey(inputExpression, outputExpression, key);
    case "function":
      return useHandleFunctionKey(inputExpression, outputExpression, key);
    case "special":
      return useHandleSpecialKey(inputExpression, outputExpression, key);
    default:
      return () => {
        console.log("unknown key");
      };
  }
};
