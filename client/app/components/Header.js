import React from "react";
import {Link} from "react-router";

export default class Header extends React.Component {
	render() {
		return (
			<nav id="mainNav">
				<div className="container-fluid">
					<Link className="btn" activeClassName="active" to="buckets">Buckets</Link>
					<Link className="btn" activeClassName="active" to="items">Items</Link>
				</div>
			</nav>
		);
	}
}