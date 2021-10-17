function odd(value) {
  let string = "";
  const odds = [];

  for (let i = 0; i <= value; i++) {
    if (i % 2 == 1) {
      odds.push(i);
      string = odds.join(" ");
    }
  }

  console.log(string);
}

odd(9);
