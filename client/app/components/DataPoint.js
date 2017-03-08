import React from "react";
import {FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import ReactDatePicker from "react-bootstrap-date-picker";

export default class DataPoint extends React.Component {

	render() {
		let {label, controlId, componentClass} = this.props;

		let control = componentClass === 'datePicker' ? <ReactDatePicker id={controlId} {...this.props} showTodayButton/> :
			<FormControl {...this.props}/>;

		return (
			<FormGroup {...controlId}>
				{label && <ControlLabel>{label}</ControlLabel>}
				{control}
			</FormGroup>
		);
	}
};

DataPoint.defaultProps = {
	componentClass: 'input'
};