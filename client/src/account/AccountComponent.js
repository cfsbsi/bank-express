import React from 'react'
import {Panel, Col} from 'react-bootstrap';

class AccountComponent extends React.Component {
    render() {
        return (
            <div>
                <Col md={2} mdOffset={1}>
                    <div>
                        <Panel header="Account" bsStyle="primary">
                            id:
                            <br/>
                            balance:
                        </Panel>
                    </div>
                </Col>
            </div>
        )
    }
}

export default AccountComponent