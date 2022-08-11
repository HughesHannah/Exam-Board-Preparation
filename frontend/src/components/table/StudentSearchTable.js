import React from "react";
import { Link } from "react-router-dom";

const SearchTable = ({ data }) => {

  return (
    <div>
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <Link
                  to={"/students/" + item.matriculationNumber}
                  style={{ textDecoration: "none" }}
                >
                  {item.matriculationNumber}
                </Link>
              </td>
              <td>
                <Link
                  to={"/students/" + item.matriculationNumber}
                  style={{ textDecoration: "none" }}
                >
                  {item.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchTable;
