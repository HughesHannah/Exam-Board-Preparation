import React from "react";
import { Link } from "react-router-dom";
import './table.scss';

const SearchTable = ({ data }) => {

  return (
    <div className="searchTable">
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="idColumn">
                <Link
                  to={"/students/" + item.matriculationNumber}
                  style={{ textDecoration: "none" }}
                >
                  {item.matriculationNumber}
                </Link>
              </td>
              <td className="nameColumn">
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
