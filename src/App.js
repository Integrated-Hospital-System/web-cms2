import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from './components/Navbar'
import { Login, Home, Doctors, Medicines, AddDoctor, AddMedicine, Appointments, AddOrders, EditMedicine } from './pages'
import EditDoctor from './pages/EditDoctor';
import { GuardProvider, GuardedRoute } from 'react-router-guards';

const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (localStorage.getItem('access_token')) {
      next();
    }
    next.redirect('/login');
  } else {
    next();
  }
}

function App() {

  const LoginContainer = () => (
    <div className="container">
      <Route exact path="/" render={ () => <Redirect to="/login" /> } />
      <Route path="/login" component={ Login } />
    </div>
  )

  const DefaultContainer = () => (
    <div>
    <div className="container">
      <Navbar />
      <GuardedRoute exact path="/" meta={{ auth : true }} component={Home} />
      <GuardedRoute path="/addOrders/:id" meta={{ auth : true }} component={AddOrders} />
      <GuardedRoute path="/appointments" meta={{ auth : true }} component={Appointments} />
      <GuardedRoute path="/addMedicine" meta={{ auth : true }} component={AddMedicine} />
      <GuardedRoute path="/editMedicine/:id" meta={{ auth : true }} component={EditMedicine} />
      <GuardedRoute path="/addDoctor" meta={{ auth : true }} component={AddDoctor} />
      <GuardedRoute path="/editDoctor/:id" meta={{ auth : true }} component={EditDoctor} />
      <GuardedRoute path="/medicines" meta={{ auth : true }} component={Medicines} />
      <GuardedRoute path="/doctors" meta={{ auth : true }} component={Doctors} />
    </div>
    </div>
 )

  return (
    <div className="App">
      <Router>
        <GuardProvider guards = { [requireLogin] }>      
          <Switch>                
            <Route exact path="/(login)" component={LoginContainer}/>
            <Route component={DefaultContainer}/>
          </Switch>
        </GuardProvider> 
      </Router>
    </div>
  );
}

export default App;
