const getSum = (n1, n2) => {
  if (n1 && n2) return n1 + n2;
  else throw new Error("Invalid arguments");
};

try {
  const result = getSum(5);
  console.log(result);
} catch (error) {
  console.log("An error occurred");
}

console.log("This code runs after try...catch...block");
