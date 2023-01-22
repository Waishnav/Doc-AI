import './App.css';
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login"
import DocumentEditor from "./components/Document/Document.js"
import Dashboard from "./components/Dashboard/Dashboard"
import Home from "./components/Home/Home"
import { useAuth } from "./context/auth";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { v4 as uuidV4 } from "uuid"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Registration />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/documents" exact>
          <Redirect to={`/documents/${uuidV4()}`} />
        </Route>
        <Route path="/documents/:id">
          <DocumentEditor />
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
