import React from "react";

export default class StatusSelector extends React.Component {
	render() {
		return (
			<select className="form-control" value={this.props.value || 'New'} onChange={this.props.onChange}>
				<option>New</option>
				<option>In Progress</option>
				<option>Finished</option>
			</select>
		)
	}
}