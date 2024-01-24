document.getElementById('mathselector').onchange = function () {
  process()
}
document.getElementById('firstNumber').onchange = function () {
  process()
}

document.getElementById('secondNumber').onchange = function () {
  process()
}

const process = function () {
  const mathProcess = document.getElementById('mathselector').value
  const firstNumber = Number(document.getElementById('firstNumber').value)
  const secondNumber = Number(document.getElementById('secondNumber').value)
  let result

  switch (mathProcess) {
    case 'add':
      result = window.math.add(firstNumber, secondNumber)
      break
    case 'subtract':
      result = window.math.subtract(firstNumber, secondNumber)
      break
    case 'multiply':
      result = window.math.multiply(firstNumber, secondNumber)
      break
    case 'divide':
      result = window.math.divide(firstNumber, secondNumber)
      break
    default:
      console.log('No calculation done')
  }
  document.getElementById('resultNumber').innerText = result
}
