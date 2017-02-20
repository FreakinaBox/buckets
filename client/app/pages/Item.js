import React from "react";
import socket from "../components/socket";
import Text from "../components/Text";
import TextArea from "../components/TextArea";
import StatusSelector from "../components/StatusSelector";

export default class Item extends React.Component {
	constructor(...params) {
		super(...params);

		this.id = +this.props.params.item;
		this.state = {};
		this.sendUpdate = this.sendUpdate.bind(this);

		//load item and subscribe to its updates
		socket.emit('getItem', this.id, item => this.setState(item || {}));

		//link socket events to their function
		socket.on('updateItem', (...args) => this.updateItem(...args));

	}

	sendUpdate(field, value) {
		this.setState({[field]: value});
		socket.emit('updateItem', this.state.id, {[field]: value});
	}

	updateItem(id, data) {
		if (this.id == id) {
			this.setState(data);
		}
	}

	componentWillUnmount() {
		//unsubscribe to item updates
		socket.emit('leave', `i${this.props.params.item}`);
	}

	render() {
		return (
			<div id="item">
				<form>
					<Text label="Order Number" value={this.state.id}/>
					<div className="form-group">
						<label className="form-control-label">Status</label>
						<StatusSelector value={this.state.status} onChange={e => this.sendUpdate('status', e.target.value)}/>
					</div>
					<Text label="Bucket" field="bucket" value={this.state.bucket} onChange={this.sendUpdate}/>
					<Text label="Assigned To" field="assignedTo" value={this.state.assignedTo} onChange={this.sendUpdate}/>
					<Text label="Client" field="client" value={this.state.client} onChange={this.sendUpdate}/>
					<TextArea label="Details" field="details" value={this.state.details} onChange={this.sendUpdate}/>
					<TextArea label="Notes" field="notes" value={this.state.notes} onChange={this.sendUpdate}/>
				</form>
			</div>
		);
	}
}