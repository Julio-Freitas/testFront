import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import NewUser from './components/NewUser';
import {isAuthenticated } from './auth';
import firebase from './firebase';



const PrivateRouter = ( {component: Component, ...rest} )=>(

    <Route {...rest} render={ props => 
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname:'/', state: {from: props.location}}} />
        )
    }
    />
)
class  Routes  extends Component  {

    state = {
        // saber se existe alguma conexão ao firebase 
        firebaseInitialized: false
      }

      componentDidMount(){
        firebase.isInitialized().then(results=>{
          this.setState({firebaseInitialized: results});
        })
      }

    render () {
        return this.state.firebaseInitialized !== false ? (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <PrivateRouter exact path='/registro/:user' component={Registro} />
                    <Route exact path='/novo-usuario' component={NewUser} />
                </Switch>
            </BrowserRouter>
        )  : <h1>Carregando</h1>
    }
}


export default Routes;
