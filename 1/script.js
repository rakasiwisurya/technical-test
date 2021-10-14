function calcPrice(quality, quantity) {
  let price = 0;
  let discount = 0;
  let total = 0;
  let string = "";

  if (quality === "A") {
    price = 4550;

    if (quantity > 13) {
      discount = quantity * 231;
    }

    total = price * quantity - discount;

    string += `-Total harga barang : ${price} \n`;
    string += `-Potongan : ${discount} \n`;
    string += `-Total yang harus dibayar : ${total}`;

    console.log(string);
  }

  if (quality === "B") {
    price = 5330;

    if (quantity > 7) {
      discount = (price * 23) / 100;
    }

    total = price * quantity - discount;

    string += `-Total harga barang : ${price} \n`;
    string += `-Potongan : ${discount} \n`;
    string += `-Total yang harus dibayar : ${total}`;

    console.log(string);
  }

  if (quality === "C") {
    price = 8653;

    total = price * quantity - discount;

    string += `-Total harga barang : ${price} \n`;
    string += `-Potongan : ${discount} \n`;
    string += `-Total yang harus dibayar : ${total}`;

    console.log(string);
  }
}

calcPrice("C", 14);
