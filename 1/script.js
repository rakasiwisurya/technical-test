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
  }
  if (quality === "B") {
    price = 5330;

    if (quantity > 7) {
      discount = price * (23 / 100);
    }
  }
  if (quality === "C") {
    price = 8653;
  }

  total = price * quantity - discount;
  string = `-Total harga barang : ${price} \n-Potongan : ${discount} \n-Total yang harus dibayar : ${total}`;
  console.log(string);
}

calcPrice("A", 14);
