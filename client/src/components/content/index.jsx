import React from "react";
import "./index.css";

const Content = ({ results, loading }) => {
  return (
    <div className="content">
      <div className="wrapper">
        <table className="content-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Название</th>
              <th>Количество</th>
              <th>Расстояние</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <td colspan={4}>
                <img
                  className="loading-img"
                  src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                  alt="loading"
                />
              </td>
            ) : Array.isArray(results) && results?.length > 0 ? (
              results.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.distance}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="content__notFound">
                {" "}
                <td>не найдено</td>{" "}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Content;
