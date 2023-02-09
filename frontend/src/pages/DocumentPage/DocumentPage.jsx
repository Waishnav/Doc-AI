import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';
// import { Navigate } from 'react-router-dom';
import api from "../../api"

const DocumentPage = (props) => {
    const { id } = useParams();
    const [isDocExist, setIsDocExist] = useState()
    console.log(id)
    useEffect(()=>{
      // if docID exist render the change the state isDocExist to true
      api.get(`/documents/isexist/${id}`)
        .then((res) => {
          // handle success
          res.data.document.isExist ? setIsDocExist(true) : setIsDocExist(false)
        })
        .catch(function (err) {
          console.log(err);
        })
      //   .then(function () {
      //   // always executed
      // });

    }, [])
    return (
        <div>
          {isDocExist ? <DocumentEditor/> : <>Document Doesn't exist in Databases</>}
        </div>
    );
}

export default DocumentPage;

