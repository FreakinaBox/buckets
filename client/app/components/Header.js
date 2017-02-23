import React from "react";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

export default class Header extends React.Component {
	render() {
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/">Buckets</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<LinkContainer to="buckets"><NavItem>Buckets</NavItem></LinkContainer>
						<LinkContainer to="orders"><NavItem>Orders</NavItem></LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}