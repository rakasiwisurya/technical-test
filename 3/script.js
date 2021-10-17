function drawImage(input) {
  let string = "";

  for (let i = 1; i <= input; i++) {
    // * (column)
    let mid = Math.ceil(input / 2);

    for (let j = 1; j <= input; j++) {
      // * (row)
      if (
        (j === 1 && i === 1) || // * kiri(i) atas(j)
        (j === input && i === 1) || // * kanan(i) atas(j)
        (j === 1 && i === input) || // * kiri(i) bawah(j)
        (j === input && i === input) || // * kanan(i) bawah(j)
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
