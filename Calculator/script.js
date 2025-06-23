// script.js
const display = document.getElementById('display');

function append(value) {
  if (display.textContent === "0" || display.textContent === "Error") {
    display.textContent = value;
  } else {
    display.textContent += value;
  }
}

function clearDisplay() {
  display.textContent = "0";
}

function backspace() {
  let text = display.textContent;
  display.textContent = text.length > 1 ? text.slice(0, -1) : "0";
}

function calculate() {
  try {
    display.textContent = eval(display.textContent);
  } catch {
    display.textContent = "Error";
  }
}

function calculatePercent() {
  try {
    display.textContent = eval(display.textContent + "/100");
  } catch {
    display.textContent = "Error";
  }
}

function squareRoot() {
  try {
    display.textContent = Math.sqrt(eval(display.textContent)).toString();
  } catch {
    display.textContent = "Error";
  }
}

function square() {
  try {
    let value = eval(display.textContent);
    display.textContent = (value * value).toString();
  } catch {
    display.textContent = "Error";
  }
}

function reciprocal() {
  try {
    let value = eval(display.textContent);
    display.textContent = (1 / value).toString();
  } catch {
    display.textContent = "Error";
  }
}

function negate() {
  try {
    let value = eval(display.textContent);
    display.textContent = (-value).toString();
  } catch {
    display.textContent = "Error";
  }
}

// Keyboard support (optional)
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key) || "+-*/.".includes(key)) {
    append(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
