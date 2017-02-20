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
				<Header/>
				<div className="container-fluid">
					{this.props.children}
				</div>
			</div>
		);
	}
}