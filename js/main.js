
// Getting elements from the document

const inputs = document.querySelectorAll("input:not(.choice-custom)");
const tipPercentSpans = document.querySelectorAll(".choice:not(.choice--custom)");

const tipPercentSpan = document.querySelector("span.tip-amount");
const totalPaymentSpan = document.querySelector("span.total");

const resetBtn = document.querySelector("button.calc__screen__reset");

// Initializing global variables


let calcData = {
  bill: null,
  tipPercent: null,
  numberOfPeople: null,
  totalPayment: null,
  tipAmount: null
}


// When the document loads...

document.addEventListener("DOMContentLoaded", () => {
  inputs.forEach(input => {
    input.addEventListener("input", (event) => manageInputs(event.target))
  });

  tipPercentSpans.forEach(span => {
    span.addEventListener("click", (event) => manageTipAmount(event.target))
  });

  resetBtn.addEventListener("click", () => reset())
});






function manageInputs(input) {

  let isValid = input.checkValidity();
  let inputMessage = input.closest(".calc__sec").querySelector("span.invalid__input__message");


  if (!isValid) {

    if (inputMessage) {
      if (+input.value > 1) {
        inputMessage.textContent = "Only three numbers after the decimal point";
      } else {
        inputMessage.textContent = "Can't be less than one";
      }
      inputMessage.classList.add("apparent");
    }

  } else {

    if (inputMessage) inputMessage.classList.remove("apparent")
    let type = input.dataset.type;

    switch (type) {

      case "bill": {
        calcData.bill = input.value;
        break;
      }

      case "people-number": {
        calcData.numberOfPeople = input.value;
        break;
      }

      case "custom-tip": {
        calcData.tipPercent = input.value / 100;

        tipPercentSpans.forEach(span => span.classList.remove("active"))

        break;
      }

      default: {
        return;
      }
    }


    setValues();
  }
}


function manageTipAmount(targeted) {

  tipPercentSpans.forEach(span => {
    span.classList.remove("active");
    if (span.isSameNode(targeted)) targeted.classList.add("active");
  });

  calcData.tipPercent = targeted.children[0].dataset.percent / 100;

  setValues()
}


function setValues() {

  if (calcData.tipPercent && calcData.bill && calcData.numberOfPeople) {

    calcData.tipAmount = calcData.tipPercent * calcData.bill / calcData.numberOfPeople;
    calcData.totalPayment = (calcData.tipPercent + 1) * calcData.bill / calcData.numberOfPeople


    tipPercentSpan.textContent = calcData.tipAmount.toFixed(2)
    totalPaymentSpan.textContent = calcData.totalPayment.toFixed(2)

  } else return;

}

function reset() {
  for (let i in calcData) {
    calcData[i] = null;
  }

  for (let i of inputs) {
    i.value = "";
  }

  tipPercentSpan.textContent = "00"
  totalPaymentSpan.textContent = "00"
}