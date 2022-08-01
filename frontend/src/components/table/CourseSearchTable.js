import React from "react";
import { Link } from "react-router-dom";

const CourseSearchTable = ({ data }) => {
  return (
    <div>
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <Link
                  to={
                    "/courses/" +
                    item.year.yearStart +
                    "-" +
                    item.year.yearEnd +
                    "/" +
                    item.classCode
                  }
                  style={{ textDecoration: "none" }}
                >
                  {item.classCode}
                </Link>
              </td>
              <td>
                <Link
                  to={
                    "/courses/" +
                    item.year.yearStart +
                    "-" +
                    item.year.yearEnd +
                    "/" +
                    item.classCode
                  }
                  style={{ textDecoration: "none" }}
                >
                  {item.className}
                </Link>
              </td>
              <td>
                <Link
                  to={
                    "/courses/" +
                    item.year.yearStart +
                    "-" +
                    item.year.yearEnd +
                    "/" +
                    item.classCode
                  }
                  style={{ textDecoration: "none" }}
                >
                  {item.year.yearStart}-{item.year.yearEnd}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseSearchTable;
