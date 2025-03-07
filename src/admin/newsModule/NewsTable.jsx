import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";

const NewsTable = ({ data, handleEdit, handleDelete, setShowModal }) => {
  return (
    <div>
      <div className="row d-flex justify-content-center mt-5">
        <div
          className="table-responsive"
          style={{ width: 95 + "%", fontSize: 80 + "%" }}
        >
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th className="text-center">Id</th>
                <th className="text-center">Titulo Noticia</th>
                <th className="text-center">Contenido Noticia</th>
                <th className="text-center">Imagen Noticia</th>
                <th className="text-center">Editar</th>
                <th className="text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      wordWrap: "break-word",
                      minWidth: 150 + "px",
                      maxWidth: 150 + "px",
                    }}
                  >
                    {item.id}
                  </td>
                  <td>{item.newsTitle}</td>
                  <td>{item.newsContent}</td>
                  <td
                    style={{
                      wordWrap: "break-word",
                      minWidth: 150 + "px",
                      maxWidth: 150 + "px",
                    }}
                  >
                    {item.newsImg}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setShowModal(true);
                        handleEdit(item.id);
                      }}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsTable;
