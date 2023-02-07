import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { v4 as uuidV4 } from "uuid"

const DocumentPage = (props) => {
    const [newId, setNewId] = useState(null);
    useEffect(() => {
        setNewId(uuidV4());
    }, []);
    return (
        <div>
        { newId && <Navigate to={`/documents/${newId}`} /> }
        ...
        </div>
    );
}

export default DocumentPage;

