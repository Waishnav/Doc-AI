import "./Dashboard.css"
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.js";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const { user } = useAuth();
  const history = useHistory();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:3001/documents", {
          params: {
            userId: user.id,
          },
        });
        setDocuments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  const handleCreateNewDocument = async () => {
    try {
      // const response = await axios.post("https://localhost:3001/documents/create", {
      //   userId: user.id,
      // });
      history.push(`/documents/`);
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
            <a href={`/document/${document.id}`}>{document.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
