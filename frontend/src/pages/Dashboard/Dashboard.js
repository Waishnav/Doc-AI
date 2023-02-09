import "./Dashboard.css"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"

function Dashboard() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/documents", {
          // params: {
          //   userId: user.id,
          // },
        });
        setDocuments(response.data.documents);
        console.log(response.data.documents)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCreateNewDocument = async () => {
      try {
        const res = await api.post("/documents");
        console.log(res.data.document)
        navigate(`/documents/${res.data.document._id}`)
        
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={handleCreateNewDocument}>Create New Document</button>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <a href={`/documents/${document._id}`}>{document.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
