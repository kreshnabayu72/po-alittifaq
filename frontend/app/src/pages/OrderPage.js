import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function OrderPage() {
  const params = useParams();

  const [order, setOrder] = useState();

  useEffect(() => {
    const Fetch = async () => {
      const result = await axios.get(`/api/order/${params.nomor_po}`);
      await setOrder(result.data);
    };

    Fetch();
  }, []);

  const DownloadBTBHandler = (e) => {
    axios
      .get(`/api/order/${params.nomor_po}/btb`, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };
  const DownloadFakturHandler = (e) => {
    axios
      .get(`/api/order/${params.nomor_po}/faktur`, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  const OrderHeader = () => {
    if (order)
      return (
        <>
          <div>
            <h1>{params.nomor_po}</h1>
            <h2>{order.date}</h2>
            <h4>{order.cabang}</h4>
            <h4>{new Date(order.tanggal).toLocaleDateString()}</h4>
          </div>
          <div>
            <button onClick={(e) => DownloadBTBHandler(e)}>Download BTB</button>
            <button onClick={(e) => DownloadFakturHandler(e)}>
              Download Faktur
            </button>
          </div>
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
    if (order)
      return (
        <tr>
          <td colSpan={6}>Total</td>
          <td>{order.total_order}</td>
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
