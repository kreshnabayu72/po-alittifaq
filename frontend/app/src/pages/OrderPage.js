import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function OrderPage() {
  const params = useParams();

  const [order, setOrder] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const Fetch = async () => {
      const result = await axios.get(`/api/order/${params.nomor_po}`);
      await setOrder(result.data);
    };

    Fetch();
  }, []);

  useEffect(() => {
    if (order)
      setTotal(order.list_item.map((i) => i.total).reduce((a, b) => a + b));
  }, [order]);

  const OrderHeader = () => {
    if (order)
      return (
        <>
          <h1>{params.nomor_po}</h1>
          <h2>{order.date}</h2>
          <h4>{order.cabang}</h4>
          <h4>{new Date(order.tanggal).toLocaleDateString()}</h4>
        </>
      );
    else {
      <h1>Loading...</h1>;
    }
  };

  const ListItem = () => {
    if (order)
      return order.list_item.map((item, index) => {
        return (
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{item.plu}</td>
            <td>{item.nama}</td>
            <td>{item.unit}</td>
            <td>{item.qty}</td>
            <td>{item.price}</td>
            <td>{item.total}</td>
          </tr>
        );
      });
    else {
      return (
        <tr>
          <td>
            <h1>Loading </h1>
          </td>
        </tr>
      );
    }
  };

  const TotalRow = () => {
    if (total)
      return (
        <tr>
          <td colSpan={6}>Total</td>
          <td>{total}</td>
        </tr>
      );
    else {
      return (
        <tr>
          <td colSpan={6}>Total</td>
          <td>loading...</td>
        </tr>
      );
    }
  };

  return (
    <div>
      <OrderHeader />

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
        <tbody>
          <ListItem />
          <TotalRow />
        </tbody>
      </table>
    </div>
  );
}

export default OrderPage;
