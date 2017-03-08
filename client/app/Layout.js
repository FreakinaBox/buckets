import React from "react";
import Header from "./components/Header";

export default class Layout extends React.Component {
	constructor() {
		super();

		this.state = {data: []};
	}

	render() {
		return (
			<div>
				<Header router={this.props.router}/>
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
}