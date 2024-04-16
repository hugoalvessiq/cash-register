let price = 19.5;
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];

const changeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const cidCash = document.getElementById("cid-cash");
const display = document.querySelector(".display");
display.innerText += `${price}`;

cash.addEventListener("keydown", function (event) {
  // Check if the key pressed was 'Enter'
  if (event.key === "Enter") {
    checkCashRegister(price, cash, cid)
    cash.value = "";
  }
});

window.onload = function () {
  let buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log(this.textContent.includes("C"));
      if (this.textContent.includes("C")) {
        return (cash.value = "");
      }
      if (this.textContent === ".") {
        if (!cash.value.includes(".")) {
          cash.value += this.textContent;
        }
      } else {
        cash.value += this.textContent;
      }
    });
  });
};

function checkCashRegister(price, cash, cid) {
  let cashValue = Number(cash.value);
  if (cashValue < price) {
    alert("Customer does not have enough money to purchase the item");
    cash.value = "";
    return;
  }
  if (cashValue === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    cash.value = "";
    return;
  }
  // Declarações e Resultado
  const meuTroco = parseFloat(cashValue - price).toFixed(2);
  const trocoViavel = trocoNaCaixaRegistradora(cid);
  const caixaFechado = semDinheiro(meuTroco, trocoViavel, cid);

  //   Exibe o resultado dos testes
  let caixaRegistradora = {};
  if (caixaFechado === undefined) {
    caixaRegistradora = calculoTrocoCliente(meuTroco, trocoViavel, cid);
  } else {
    caixaRegistradora = semDinheiro(meuTroco, trocoViavel, cid);
  }
  return caixaRegistradora;
}

// Cálculo do total de dinheiro em caixa
function trocoNaCaixaRegistradora(trocoNoCaixa) {
  let totalEmCaixa = 0;
  for (const troco in trocoNoCaixa) {
    let trocoValor = trocoNoCaixa[troco][1];
    totalEmCaixa += trocoValor;
  }
  return (totalEmCaixa = totalEmCaixa.toFixed(2));
}

// Referência dos valores padrão do dinheiro
const valor_referencia = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
];
valor_referencia.reverse();

// Verificar se tem saldo no caixa
function semDinheiro(a, b, c) {
  if (Number(a) > Number(b)) {
    cash.value = "";
    return (changeDue.innerText = "Status: INSUFFICIENT_FUNDS");
  } else if (Number(a) === Number(b)) {
    for (const num of c) {
      if (num[1] > 0) {
        cash.value = "";
        return (changeDue.innerText = `Status: CLOSED ${num[0]}: $${num[1]}`);
      }
    }
  }
}

// Cálculo do troco a retornar para o cliente
function calculoTrocoCliente(a, b, c) {
  //   Realiza testes comparando com o dinheiro do cliente
  let troco = [];
  c.reverse();

  for (let i = 0; i < c.length; i++) {
    const element = [c[i][0], 0];

    while (a >= valor_referencia[i][1] && c[i][1] > 0) {
      element[1] += valor_referencia[i][1];
      c[i][1] -= valor_referencia[i][1];
      a -= valor_referencia[i][1];
      a = parseFloat(a).toFixed(2);
    }
    if (element[1] > 0) {
      troco.push(element);
    }
  }

  if (a > 0) {
    return console.log({ status: "INSUFFICIENT_FUNDS", change: [] });
  }

  let result;
  for (const num of troco) {
    result = changeDue.innerText += ` ${num[0]}: $${num[1]}`;
    cash.value += 0;
  }
  cash.value += 0;
  return (changeDue.innerText = `Status: OPEN  ${result}`);
}
