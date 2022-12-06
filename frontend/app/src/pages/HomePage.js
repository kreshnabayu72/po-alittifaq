import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Waktu</th>
          </tr>
        </thead>
        <tr>
          <td>
            <Link to="/order/1">Alfreds Futterkiste</Link>
          </td>
          <td>
            <Link to="/order/1">Alfreds Futterkiste</Link>
          </td>
        </tr>
      </table>
      <button>Add New</button>
    </div>
  );
}

export default HomePage;
