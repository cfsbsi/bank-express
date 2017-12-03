import React, {Component} from 'react';
import './App.css';
import Menu from './menu/MenuComponent'
import Account from './account/AccountComponent'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Menu/>
                <Account/>
            </div>
        );
    }
}

export default App;
