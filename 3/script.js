function drawImage(input) {
  let string = "";

  for (let i = 1; i <= input; i++) {
    // * (column)
    let mid = Math.floor((input + 1) / 2);

    for (let j = 1; j <= input; j++) {
      // * (row)
      if (
        (j === 1 && i === 1) || // * kiri(j) atas(i)
        (j === input && i === 1) || // * kanan(j) atas(i)
        (j === 1 && i === input) || // * kiri(j) bawah(i)
        (j === input && i === input) || // * kanan(j) bawah(i)
        j === mid || // * vertical
        i === mid // * horizontal
      ) {
        if (j === mid && i === mid) {
          // * center point
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

drawImage(5);
