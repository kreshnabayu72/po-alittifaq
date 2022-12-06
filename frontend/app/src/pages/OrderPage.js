import React, { useState } from "react";

function OrderPage() {
  const [file, setFile] = useState();
  return (
    <div>
      <h1>Order id</h1>
      <h2>Tanggal</h2>
      <h4>LSI KOPO</h4>
      <div>
        <input type="file" />
        <button>Submit</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>PLU</th>
            <th>Nama Barang</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Harga</th>
            <th>Total</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default OrderPage;
