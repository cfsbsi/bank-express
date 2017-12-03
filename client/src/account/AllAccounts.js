import React from 'react'
import {Panel, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {loadAccounts} from './Action'

class AllAccounts extends React.Component {

    componentDidMount() {
        this.props.getAccounts();
    }

    render() {
        return this.props.accounts&&this.props.accounts.length>0?(
            <div>
                {this.props.accounts.map((account) => (
                    <div key={account.id}>
                        <Col md={2} mdOffset={1}>
                            <Panel header="Account" bsStyle="primary">
                                id: {account.id}
                                <br/>
                                balance: {account.balance}
                            </Panel>
                        </Col>
                    </div>
                ))}
            </div>
        ):(<div>Accounts not found, please create an account!</div>);
    }
}

function mapStateToProps({accounts}) {
    return {accounts};
}

function mapDispatchToProps(dispatch) {
    return {
        getAccounts: () => dispatch(loadAccounts()),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllAccounts));