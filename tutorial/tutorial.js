"use strict";

// let answer = prompt('What is the "official" name of Javascript?', "");
// if (answer === "ECMAScript") {
//   alert("Right");
// } else {
//   alert("Didn't you know? ECMAScript!");
// }
//
// let value = prompt("Please enter a number", "");
// if (value > 0) {
//   alert(1);
// } else if (value < 0) {
//   alert(1);
// } else {
//   alert(0);
// }
//
// let userName = prompt("Please enter your User Name", "");
// if (userName == "Admin") {
//   let password = "";
//   password = prompt("Please enter your password", "");
//   if (password == "TheMaster") {
//     alert("Welcome");
//   } else if (!password) {
//     alert("Canceled");
//   } else {
//     alert("Wrong Password");
//   }
// } else if (!userName) {
//   alert("Canceled");
// } else {
//   alert("I don't know you");
// }
//
// if ((age >= 14) && (age <= 90))
// if ((age < 14) || (age > 90))

function listPrimes() {
  let n = prompt('Enter any integer  "n" above 2', "");
  let result = "";
  if (n > 2) {
    result += "2, 3, ";
  }
  for (let i = 4; i < n; i++) {
    if (i % 2 == 0 || i % 3 == 0) continue;
    for (let j = 5; j * j <= i; j += 6) {
      if (i % j == 0 || i % (j + 2) == 0) continue;
    }
    result += `${i}, `;
  }
  console.log(`prime numbers in the interval from 2 to n are /n ${result}`);
}

listPrimes();
