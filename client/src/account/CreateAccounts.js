import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {createAccount} from './Action'

class CreateAccounts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.createAccount(this.state)

        this.props.history.push('/');
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    createAccount= (account) => {
        this.props.postAccount(account)
    }


    render() {
        return (
            <div>
                <h1>Create Account</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Balance:
                        <input type="number" name="balance" value={this.state.balance} onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <input type="submit" value="Create"/>
                    <button onClick={this.props.history.goBack}>Back</button>
                </form>
            </div>
        )
    }

}


function mapStateToProps({accounts}) {
    return {accounts}
}

function mapDispatchToProps(dispatch) {
    return {
        postAccount: (comment) => dispatch(createAccount(comment)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateAccounts));