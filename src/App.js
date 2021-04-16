import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from './components/Navbar'
import { Login, Home, Doctors, Medicines, AddDoctor, AddMedicine, Appointments, AddOrders} from './pages'

function App() {

  const LoginContainer = () => (
    <div className="container">
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
    </div>
  )

  const DefaultContainer = () => (
    <div>
    <div className="container">
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/addOrders" component={AddOrders} />
      <Route path="/appointments" component={Appointments} />
      <Route path="/addMedicine" component={AddMedicine} />
      <Route path="/addDoctor" component={AddDoctor} />
      <Route path="/medicines" component={Medicines} />
      <Route path="/doctors" component={Doctors} />
    </div>
    </div>
 )

  return (
    <div className="App">
      <Router>       
          <div>
            <Switch>                
              <Route exact path="/(login)" component={LoginContainer}/>
              <Route component={DefaultContainer}/>
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
