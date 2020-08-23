const myArray = [
  { a: 1, b: 2 },
  { a: 3, b: 4 },
  { a: 5, b: 6 },
  // 1,33,44
];

// console.log(myArray)
// for (m of myArray) {
//   console.log(m);
// }
// for (m in myArray) {
//   console.log(m);
// }

const _bool = myArray.includes({ a: 3, b: 4 });
console.log(_bool);
