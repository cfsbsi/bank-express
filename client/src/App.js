import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Menu from './menu/MenuComponent'
import Account from './account/AllAccounts'
import CreateAccounts from './account/CreateAccounts'
import TransferAccounts from './account/TransferAccounts'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Menu/>
                <Switch>
                    <Route exact path="/create" component={CreateAccounts}/>
                    <Route exact path="/transfer" component={TransferAccounts}/>
                    <Route exact path="/" component={Account}/>
                </Switch>
            </div>
        );
    }
}

export default App;
