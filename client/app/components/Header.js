import React from "react";
import socket from "../components/socket";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

export default class Header extends React.Component {

	createItem() {
		socket.emit('createItem', item => this.props.router.push(`orders/${item.id}`));
	}

	render() {
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/">Oregon Burls Order Manager</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<LinkContainer to="orders"><NavItem>Search</NavItem></LinkContainer>
						<NavItem onClick={() => this.createItem()}>New Order</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}