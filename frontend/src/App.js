import './App.css';
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login"
// import DocumentEditor from "./components/DocumentEditor/DocumentEditor"
import Dashboard from "./pages/Dashboard/Dashboard"
import Home from "./pages/Home/Home.jsx" 
import DocumentPage from './pages/DocumentPage/DocumentPage';
import PrivateRoutes from './PrivateRoutes';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
// import {Fragment} from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<PrivateRoutes/>}>
          <Route element={<Dashboard/>} path="/dashboard" exact></Route>
          {/* <Route element={<DocumentEditor/>} path="/documents/:id"></Route> */}
          <Route element={<DocumentPage/>} path="/documents/:id" exact></Route>
        </Route>
        <Route path="/" element={<Home />} />
      </Routes> 
    </BrowserRouter>
  );
}


export default App;
