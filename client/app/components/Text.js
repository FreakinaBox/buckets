import React from "react";

export default class Text extends React.Component {
	constructor(p) {
		super(p);

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.props.onChange && this.props.onChange(this.props.field, e.target.value);
	}

	render() {
		return (
			<div className="form-group">
				<label className="form-control-label">{this.props.label}</label>
				<input className="form-control" value={this.props.value || ''} onChange={this.onChange}/>
			</div>
		);
	}
}