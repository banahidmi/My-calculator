const display_var=document.getElementById('display');
const numbers= document.querySelectorAll('.number');
const operators= document.querySelectorAll('.operator');
const reset = document.querySelector(".reset")
const del = document.querySelector(".delete")
const equal = document.querySelector(".equal")
const digitsLenght = 10;
const object = {
  display: [],
  storedNumber: 0,
  end: false,
  operator: null,
  get screenNumber() {
  if (this.display.length) {
    return +this.display.join('');
  } 
  else {
    return 0;
  }
  },
  ondisplay() {
    display_var.textContent = this.display.length ? this.display.join('') : 0;
  }
  }
function multiply(p1, p2) {
  return p1 * p2;
  }
function add(p1, p2) {
  return p1 + p2;
  }
function divide(p1, p2) {
  if (p2== 0) {
    display_var.textContent="Can't divide by 0";
    return null;
  }
  return p1 / p2;
  }
function substract(p1, p2) {
  return p1 - p2;
  }
function operate (operator,firstNum,secondNum) {
  let result=0;
  switch(operator){
    case '+':
      result=add(firstNum,secondNum);
      break;
    case '-':
      result=substract(firstNum,secondNum);
      break;
    case '*':
      result=multiply(firstNum,secondNum);
      break;
    case '/': 
      result=divide(firstNum,secondNum);
      break;
      }
  return result;
  }
const handleReset=()=>{
  object.display=[];
  object.storedNumber=0;
  object.end=false;
  object.operator=null;
  object.ondisplay();
  console.log("In reset")
}
reset.addEventListener('click', handleReset);
const handleDelete=()=>{
  object.display.pop();
  object.ondisplay();
  console.log("In delete")
}
del.addEventListener('click', handleDelete);
const handleEnteredNumbers = (e) => {
  if (object.end) {
    object.end = false;
    object.display= [];
    }
  if (object.display.length<digitsLenght) {
    if (e) {
      if (e.target.id === '.' && object.display.includes('.')){
        return
      }
      if (e.target.id === '0' && object.display[0] == '0' && object.display[1] != '.'){
        return
      }
      object.display.push(e.target.id);
    }
    object.ondisplay();
    }
  }
numbers.forEach((button) => button.addEventListener('click', handleEnteredNumbers));
const handleCalculation = () => {
  let firstResut;
  if (object.storedNumber && object.operator) {
    firstResut=operate(object.operator,object.storedNumber, object.screenNumber);
    if (typeof(firstResut) == 'number') {
      object.display= (Number.isInteger(firstResut) ? firstResut.toString() : firstResut.toFixed(6)).split('')
      }
    object.operator= null;
    object.storedNumber= 0;
    object.end= true;
    if (firstResut !== null){
      object.ondisplay();
    }
    }
  }
equal.addEventListener('click',handleCalculation);
const handleOperators = (e) => {
  if (object.display.length) {
    handleCalculation();
    object.storedNumber= object.screenNumber;
    object.display = [];
    }
  if (e) {
    object.operator = e.target.id;
      }
    console.log(object.operator);
    console.log(object.storedNumber);
}
operators.forEach((button) => button.addEventListener('click', handleOperators));
