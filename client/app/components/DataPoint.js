import React from "react";
import {FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import ReactDatePicker from "react-bootstrap-date-picker";
import Select from "react-select";

export default class DataPoint extends React.Component {

	getComponent(componentClass) {
		switch (componentClass) {
			case 'datePicker':
				return <ReactDatePicker id={this.props.controlId} {...this.props} showTodayButton/>;
			case 'reactSelect':
				return <Select {...this.props}/>;
			default:
				return <FormControl {...this.props}/>;
		}
	}

	render() {
		let {label, controlId, componentClass} = this.props;

		return (
			<FormGroup {...controlId}>
				{label && <ControlLabel>{label}</ControlLabel>}
				{this.getComponent(componentClass)}
			</FormGroup>
		);
	}
};

DataPoint.defaultProps = {
	componentClass: 'input'
};