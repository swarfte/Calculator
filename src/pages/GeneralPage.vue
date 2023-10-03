<template>
  <MainLayout>
    <q-page class="container-fluid">
      <q-responsive :ratio=16/9>
        <div class="GeneralBlock">
        <div class="col-md-12 displayBlock">
          <div>
            <q-input
              v-for="(item, index) in displayBlock"
              :key="index"
              v-model="item.value"
              :for="item.id"
              :debounce="100"
              :ref="item.id"
              borderless
              readonly
            />
          </div>
        </div>
        <div class="col-md-12 keyboardBlock">
          <div v-for="row in calculatorButtons" :key="row" class="row">
            <q-btn
              v-for="button in row"
              :key="button"
              :color="button.getColor()"
              :label="button.getName()"
              @click="button.action()"
              :ripple="true"
              :no-caps="true"
              :fab="true"
              class="col calculatorButtons"
            />
          </div>
        </div>
      </div>
      </q-responsive>
    </q-page>
  </MainLayout>
</template>

<script>
import { defineComponent } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import { QInput, QBtn, QResponsive} from "quasar";

export default defineComponent({
  name: "GeneralPage",
  components: {
    MainLayout,
    QInput,
    QBtn,
    QResponsive,
  },
  data() {
    return {
      rawValue: "",
      calculatedValue: "",
      historyExpression: "",
      historyValue: "",
      buttons: [
        ["sin", "cos", "tan", "log", "sys"],
        ["nPr", "nCr", "!", "C", "del"],
        ["+", "-", "x", "÷", "%"],
        ["(", "7", "8", "9", ")"],
        ["x^y", "4", "5", "6", "S<=>D"],
        ["E", "1", "2", "3", "ans"],
        ["π", ",", "0", ".", "="],
      ],
    };
  },
  methods: {
    /**
     * used to set color for button
     * @param {string[]} colorButtons
     * @param {Button} button
     * @param {string} color
     * @returns {Button}
    */
    colorButtonsHandler(colorButtons, button, color) {
      if (colorButtons.includes(button.getName())) {
        button.setColor(color);
      }
      return button;
    },

    /**
     * used to set static action(add the name to the input bar) for button
     * @param {Button} btn
     * @returns {Button}
    */
    staticButtonsHandler(btn) {
      this.staticButtons.forEach((staticButton) => {
        if (staticButton.includes(btn.getName())) {
          btn.setAction(() => {
            this.rawValue += btn.getName();
          });
        }
      });
      return btn;
    },
    /**
     * used to set dynamic action for button
      * @param {Button} button
      * @param {string} buttonName
      * @param {function} action
      * @returns {Button}
      *
     */
    dynamicButtonHandler(button, buttonName, action) {
      if (button.getName() === buttonName) {
        button.setAction(action);
      }
      return button;
    },

    /**
     * used to filter raw value
     * @returns {string}
     */
    filterRawValue() {
      let result = this.rawValue;
      this.filterList.forEach((filter) => {
        result = result.replace(filter.source, filter.target);
      });
      return result;
    },
    /**
     * used to calculate factorial
     * @param {number} target
     * @returns {number}
     */
    factorial(target) {
      let result = 1;
      for (let stack = 1; stack <= target; stack++) {
        result *= stack;
      }
      return result;
    },
    /**
     * used to calculate permutation
     * @param {number} total
     * @param {number} target
     * @returns {number}
     */
    permutation(total, target) {
      return this.factorial(total) / this.factorial(total - target);
    },

    /**
     * used to calculate combination
     * @param {number} total
     * @param {number} target
     * @returns {number}
    */
    combination(total, target) {
      return this.permutation(total, target) / this.factorial(target);
    },
    /**
     * used to pre calculate the raw value
     * @returns {void}
    */
    preCalculate() {
      this.calculatedValue = eval(this.filterRawValue());
      this.calculatedValue = this.calculatedValue.toString();
    },
    /**
     * used to calculate the raw value and set into history
     * @returns {void}
     *
    */
    calculate() {
      this.historyExpression = this.rawValue;
      this.historyValue = this.calculatedValue;
      this.rawValue = "";
    },
    /**
     * used to transform the calculated value (decimal to fraction or fraction to decimal)
     * @returns {string}
    */
    transform() {
      if (this.calculatedValue.includes("/")) {
        return this.fractionToDecimal(this.calculatedValue);
      } else {
        return this.decimalToFraction(this.calculatedValue);
      }
    },
    /**
     * used to transform fraction to decimal
     * @param {string} fraction
     * @returns {string}
    */
    fractionToDecimal(fraction) {
      if (!fraction.includes("/")) {
        return fraction;
      }

      if (fraction.includes("+")){
        const [whole, remainder] = fraction.split("+");
        const [numerator, denominator] = remainder.split("/");
        return `${Number(whole) + Number(numerator) / Number(denominator)}`;
      } else {
        const [numerator, denominator] = fraction.split("/");
        return `${Number(numerator) / Number(denominator)}`;
      }
    },
    /**
     * used to transform decimal to fraction
     * @param {string} decimal
     * @returns {string}
     */
    decimalToFraction(decimal) {
      if(!decimal.includes(".")){
        return decimal;
      }
      const tolerance = 1.0E-6;
      let numerator = 1;
      let denominator = 1;
      let x = decimal;

      while (Math.abs(decimal - numerator / denominator) > tolerance) {
          if (x < decimal) {
              numerator++;
          } else {
              denominator++;
          }
          x = numerator / denominator;
      }

      const divisor = this.gcd(numerator, denominator);
      numerator /= divisor;
      denominator /= divisor;

      // convert to mixed fraction
      if (numerator > denominator) {
          const whole = Math.floor(numerator / denominator);
          const remainder = numerator % denominator;
          return whole + "+" + remainder + "/" + denominator;
      }

      return numerator + "/" + denominator;
    },
    /**
       * used to find the greatest common divisor
       * @param {number} a
       * @param {number} b
       * @returns {number}
       */
    gcd(a,b){
      if (b < 0.0000001) return a;
      return this.gcd(b, Math.floor(a % b));
    },
    /**
    * used to convert degree to radian
    * @param {number} radian
    * @returns {number}
    */
    degreeToRadian(radian) {
      return radian * (Math.PI / 180);
    },
    /**
     * used to calculate sin with degree
     * @param {number} degree
     * @return {number}
     */
    sinWithDegree(degree){
      return Math.sin(this.degreeToRadian(degree));
    },
    /**
     * used to calculate cos with degree
     * @param {number} degree
     * @return {number}
    */
    cosWithDegree(degree){
      return Math.cos(this.degreeToRadian(degree));
    },
    /**
     * used to calculate tan with degree
     * @param {number} degree
     * @return {number}
     */
    tanWithDegree(degree){
      return Math.tan(this.degreeToRadian(degree));
    },
    /**
     *  used to calculate log with base and value
     * @param {number} base
     * @param {number} value
     * @return {number}
     */
    log(base, value) {
      return Math.log(value) / Math.log(base);
    },
    /**
     * used to convert number from one base to another base
     * @param {number} fromBase
     * @param {number} toBase
     * @param {number} number
     * @returns {string}
    */
    convertNumber(fromBase, toBase,number) {
      const decimalNumber = parseInt(number, fromBase);
      return decimalNumber.toString(toBase);
    },
    /**
     * used to fix decimal issus
     * @param {function} func
     * @param {number} value
     * @returns {number}
    */
    fixDecimalIssus(func,...value){
      let result = func(...value).toString();
      result = this.decimalToFraction(result);
      result = this.fractionToDecimal(result);
      return Number(result);
    },
    /**
     * used to set dynamic font size for the raw value
     * @param {string} str
     * @returns {number}
    */
    dynamicFontSize(str){
      if (str.length > 25){
        return 15;
      } else if (str.length > 20){
        return 20;
      }else if (str.length > 15){
        return 25;
      }else if (str.length > 10){
        return 30;
      }else if (str.length > 5){
        return 35;
      }
      return 40
    }
  },
  computed: {
    /**
     * used to filter raw value
     * @returns {object[]}
     * @property {RegExp} source
     * @property {string|function} target
    */
    filterList(){
      return [
        {
          source:/\^/g,
          target:"**"
        },
        {
          source:/x/g,
          target:"*"
        },
        {
          source:/÷/g,
          target:"/"
        },
        {
          source:/π/g,
          target:Math.PI
        },
        {
          source:/E/g,
          target:Math.E
        },
        {
          source:/ans/g,
          target:this.historyValue
        },
        {
          source:/log\(/g,
          target:"this.fixDecimalIssus(this.log,"
        },
        {
          source:/P/g,
          target:"this.permutation"
        },
        {
          source:/C/g,
          target:"this.combination"
        },
        {
          source:/(\d+|\(.+\))!/g,
          target:(match) => `this.factorial(${match.replace("!", "")})`
        },
        {
          source:/sin\(/g,
          target:"this.fixDecimalIssus(this.sinWithDegree,"
        },
        {
          source:/cos\(/g,
          target:"this.fixDecimalIssus(this.cosWithDegree,"
        },
        {
          source:/tan\(/g,
          target:"this.fixDecimalIssus(this.tanWithDegree,"
        },
        {
          source:/sys/g,
          target:"this.convertNumber"
        }
      ]
    },
    /**
     * used to set dynamic action for button
     * @returns {object[]}
     * @property {string} name
     * @property {function} action
    */
    dynamicButton() {
      return [
        {
          name: "sin",
          action: () => {
            this.rawValue += "sin(";
          },
        },
        {
          name: "cos",
          action: () => {
            this.rawValue += "cos(";
          },
        },
        {
          name: "tan",
          action: () => {
            this.rawValue += "tan(";
          },
        },
        {
          name: "log",
          action: () => {
            this.rawValue += "log(";
          },
        },
        {
          name: "sys",
          action: () => {
            this.rawValue += "sys(";
          },
        },
        {
          name: "=",
          action: () => {
            this.calculate();
          },
        },
        {
          name: "ans",
          action: () => {
            this.rawValue += "ans";
          },
        },
        {
          name: "S<=>D",
          action: () => {
            this.calculatedValue = this.transform(this.calculatedValue);
          },
        },
        {
          name: "x^y",
          action: () => {
            this.rawValue += "^";
          },
        },
        {
          name: "del",
          action: () => {
            this.rawValue = this.rawValue.slice(0, -1);
          },
        },
        {
          name: "C",
          action: () => {
            if (this.rawValue.length > 0) {
              this.rawValue = "";
            } else {
              this.historyExpression = "";
              this.historyValue = "";
            }
          },
        },
        {
          name: "nPr",
          action: () => {
            this.rawValue += "P(";
          },
        },
        {
          name: "nCr",
          action: () => {
            this.rawValue += "C(";
          },
        },
      ];
    },
    /**
     * the order of the buttons in the calculator
     * @returns {string[]}
     * @property {string[]} value
     * @property {string} id
    */
    displayBlock() {
      return [
        { value: this.historyExpression, id: "historyExpression" },
        { value: this.historyValue, id: "historyValue" },
        { value: this.rawValue, id: "rawValue" },
        { value: this.calculatedValue, id: "calculatedValue" },
      ];
    },
    /**
     * set the blue color for the buttons which are in the blueButtons
     * @returns {string[]}
     * @property {string[]} buttons
     */
    blueButtons() {
      return ["!", "+", "-", "x", "÷", "%", "x^y"];
    },
    /**
     * set the green color for the buttons which are in the greenButtons
     * @returns {string[]}
     * @property {string[]} buttons
    */
    greenButtons() {
      return ["sin", "cos", "tan", "log", "sys", "nPr", "nCr"];
    },
    /**
     * set the red color for the buttons which are in the redButtons
     * @returns {string[]}
     * @property {string[]} buttons
    */
    redButtons() {
      return ["C", "del"];
    },
    /**
     * set the purple color for the buttons which are in the purpleButtons
     * @returns {string[]}
     * @property {string[]} buttons
    */
    purpleButtons() {
      return ["ans", "=", "S<=>D"];
    },
    /**
     * set the cyan color for the buttons which are in the cyanButtons
     * @returns {string[]}
     * @property {string[]} buttons
    */
    cyanButtons() {
      return ["(", ")"];
    },
    /**
     * set the grey color for the buttons which are in the greyButtons
     * @returns {string[]}
     * @property {string[]} buttons
    */
    greyButtons() {
      return [
        "π",
        "E",
        "0",
        ".",
        ",",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ];
    },
    /**
     * set the css color for the buttons
     * @returns {object[]}
     * @property {string} color
     * @property {string[]} buttons
    */
    colorButtons() {
      return [
        { color: "primary", buttons: this.blueButtons },
        { color: "secondary", buttons: this.greenButtons },
        { color: "deep-orange", buttons: this.redButtons },
        { color: "purple", buttons: this.purpleButtons },
        { color: "cyan", buttons: this.cyanButtons },
        { color: "grey", buttons: this.greyButtons },
      ];
    },
    /**
     * set the static action for the buttons by the specify color
     * @returns {string[][]}
     *
    */
    staticButtons() {
      return [this.greyButtons, this.blueButtons, this.cyanButtons];
    },
    /**
     * create the button instance from the keyboard
     * @returns {Button[][]}
     * @property {Button[][]} result
     * @property {Button[]} row
     * @property {Button} col
     * @property {Button} btn
     * @property {object} colorButton
     *
    */
    calculatorButtons() {
      const result = this.buttons.map((row) =>
        row.map((col) => {
          // create the button instance from the keyboard
          let btn = new Button(col);

          // set the color for the button
          this.colorButtons.forEach((colorButton) => {
            btn = this.colorButtonsHandler(
              colorButton.buttons,
              btn,
              colorButton.color
            );
          });

          // set the static action for the button
          btn = this.staticButtonsHandler(btn);

          // set the dynamic action for the button
          this.dynamicButton.forEach((dynamicButton) => {
            btn = this.dynamicButtonHandler(
              btn,
              dynamicButton.name,
              dynamicButton.action
            );
          });
          return btn;
        })
      );

      return result;
    },
  },
  watch: {
    /**
     * monitor the raw value and calculate the value when the raw value is changed
     * @returns {void}
    */
    rawValue() {
      try {
        // scroll to the end of the raw value
        const rawValueElement = document.getElementById("rawValue");
        rawValueElement.scrollLeft = rawValueElement.scrollWidth;
        rawValueElement.style.fontSize = this.dynamicFontSize(this.rawValue) + "px";
        this.preCalculate();
      } catch (e) {

      }
    },
  },
});

class Button {
  constructor(name) {
    this.name = name;
    this.color = "black";
  }

  getName() {
    return this.name;
  }

  action() {
    return this.getName();
  }

  setAction(action) {
    this.action = action;
  }

  setColor(label) {
    this.color = label;
  }

  getColor() {
    return this.color;
  }
}
</script>

<style>
.GeneralBlock {
  font-family: "Fira Code", sans-serif, ;
}

.displayBlock {
  margin-top: 10%;
  padding-bottom: 5%;
}

.displayBlock input {
  text-align: right;
  font-size: 40px;
  padding: 20px 10px;
}
.calculatorButtons {
  margin: 1%;
  padding: 1%;
  font-style: bold;
}
#historyExpression {
  color: grey;
  font-size: 25px;
}

#historyValue {
  color: grey;
  font-size: 25px;
}

#rawValue {
  overflow: hidden;
}

#calculatedValue {
  color: blue;
  border-bottom: 1px solid grey;
}
</style>
