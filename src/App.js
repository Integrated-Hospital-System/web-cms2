import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from './components/Navbar'
import { Login, Home, Doctors, Medicines, AddDoctor, AddMedicine, Appointments, AddOrders, EditMedicine } from './pages'
import EditDoctor from './pages/EditDoctor';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from './axios/axios';
import { useState } from 'react';

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

const requireAdmin = (to, from, next) => {
  if (to.meta.role === 'Admin') {
    next();
  } else {
    next.redirect('/');
  }
}

function App() {
  const dispatch = useDispatch();
  const accountStorage = useSelector(state => state.accountStorage);
  const [role, setRole] = useState('');

  useEffect(() => {
    if (accountStorage !== undefined) {
      setRole(accountStorage.role);
    } else {
      axios(
        {
          url : 'accounts/index',
          headers : {
            access_token : localStorage.getItem('access_token')
          }
        }
      )
        .then(accounts => {
          dispatch({ type : 'accounts/getAccount', payload : accounts.data })
          setRole(accounts.data.role);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [])

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
      <GuardProvider guards = { [requireAdmin] }>
        <GuardedRoute path="/doctors" meta={{ auth : true, role : role }} component={Doctors} />
      </GuardProvider>
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
