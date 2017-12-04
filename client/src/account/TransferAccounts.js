import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {transferAccount} from './Action'

class TransferAccounts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            source_account_id: undefined,
            destination_account_id: undefined,
            amount: undefined
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

    createAccount= (transfer) => {
        this.props.transferMoney(transfer)
    }


    render() {
        return (
            <div>
                <h1>Transfer</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Source Account:
                        <input type="number" name="source_account_id" onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <label>Destination Account:
                        <input type="number" name="destination_account_id" onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <label>Balance:
                        <input type="number" name="amount" onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <input type="submit" value="Transfer"/>
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
        transferMoney: (transfer) => dispatch(transferAccount(transfer)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransferAccounts));