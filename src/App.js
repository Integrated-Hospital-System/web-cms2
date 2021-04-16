import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import { Login, Home, Doctors, Medicines, AddDoctor, AddMedicine, Appointments, AddOrders} from './pages'

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
          <div>
            <Switch>
              <Route path="/addOrders">
                <AddOrders />
              </Route>
              <Route path="/appointments">
                <Appointments />
              </Route>
              <Route path="/addMedicine">
                <AddMedicine />
              </Route>
              <Route path="/addDoctor">
                <AddDoctor />
              </Route>
              <Route path="/medicines">
                <Medicines />
              </Route>
              <Route path="/doctors">
                <Doctors />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
