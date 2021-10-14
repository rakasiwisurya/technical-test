function squarePattern(input) {
  let string = "";
  for (let i = 0; i < input; i++) {
    let mid = Math.floor(input / 2);

    for (let j = 0; j < input; j++) {
      if (
        (j === 0 && i === 0) ||
        (j === input - 1 && i === 0) ||
        (j === 0 && i === input - 1) ||
        (j === input - 1 && i === input - 1) ||
        j === mid ||
        i === mid
      ) {
        if (j === mid && i === mid) {
          string += "#";
        } else {
          string += "*";
        }
      } else {
        string += "#";
      }
    }

    string += "\n";
  }

  console.log(string);
}

squarePattern(5);
