import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [file, setFile] = useState();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get("/api/order");
      setOrderList(result.data);
    };
    fetch();
  }, []);

  const OrderList = () => {
    if (orderList.length > 0) {
      return orderList.map((order, index) => {
        return (
          <tr key={index}>
            <td>
              <Link to={`/order/${order.nomor_po}`}>{order.nomor_po}</Link>
            </td>
            <td>
              <Link to={`/order/${order.nomor_po}`}>
                {new Date(order.tanggal).toLocaleDateString()}
              </Link>
            </td>
            <td>
              <Link to={`/order/${order.nomor_po}`}>{order.perusahaan}</Link>
            </td>
            <td>
              <Link to={`/order/${order.nomor_po}`}>{order.cabang}</Link>
            </td>
          </tr>
        );
      });
    }
  };

  const SubmitHandler = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const result = await axios.post("/api/order/add-data", formData);
    alert("Uploaded");
    window.location.reload();
  };
  return (
    <div>
      <h1>Home</h1>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={() => SubmitHandler()}>Submit</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>No PO</th>
            <th>Tanggal</th>
            <th>Perusahaan</th>
            <th>Cabang</th>
          </tr>
        </thead>
        <tbody>
          <OrderList />
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
