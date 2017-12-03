import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap'

const MenuComponent = function () {
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">Bank</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavDropdown eventKey={1} title="Accounts" id="basic-nav-dropdown">
                        <MenuItem eventKey={1.1} href="/">
                            All
                        </MenuItem>
                        <MenuItem eventKey={1.2} href="/create">
                            Create
                        </MenuItem>
                        <MenuItem eventKey={1.3} href="/transfer">
                            Transfer
                        </MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MenuComponent