import React from "react";
import socket from "../components/socket";
import {Form, FormGroup, FormControl, ControlLabel, Grid, Row, Col} from "react-bootstrap";
import DataPoint from "../components/DataPoint";
import ProductList from "../components/ProductList";


export default class Order extends React.Component {
	constructor(...params) {
		super(...params);

		this.id = this.props.params.item;
		this.state = {products: []};
		this.sendUpdate = this.sendUpdate.bind(this);

		//load item and subscribe to its updates
		socket.emit('getItem', this.id, (item = {}) => {
			this.setState(item);
		});

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
				<Form>
					<Grid>
						<Row>
							<Col sm={6}>
								<FormGroup>
									<ControlLabel>Order Number</ControlLabel>
									<FormControl.Static>{this.state.id}</FormControl.Static>
								</FormGroup>
								<DataPoint
									label="Status"
									componentClass="select"
									value={this.state.status}
									onChange={e => this.sendUpdate('status', e.target.value)}
								>
									<option>New</option>
									<option>In Progress</option>
									<option>Finished</option>
									<option>Canceled</option>
								</DataPoint>
								<DataPoint
									label="Order Date"
									componentClass="datePicker"
									value={this.state.orderDate}
									onChange={value => this.sendUpdate('orderDate', value)}
								/>
								<DataPoint
									label="Due Date"
									componentClass="datePicker"
									value={this.state.dueDate}
									onChange={value => this.sendUpdate('dueDate', value)}
								/>
							</Col>
							<Col sm={6}>
								<DataPoint
									label="Client"
									value={this.state.client}
									onChange={e => this.sendUpdate('client', e.target.value)}
								/>
								<DataPoint
									label="Email"
									value={this.state.email}
									onChange={e => this.sendUpdate('email', e.target.value)}
								/>
								<DataPoint
									label="Phone"
									value={this.state.phone}
									onChange={e => this.sendUpdate('phone', e.target.value)}
								/>
								<DataPoint
									label="Assigned To"
									value={this.state.assignedTo}
									onChange={e => this.sendUpdate('assignedTo', e.target.value)}
								/>
							</Col>
						</Row>
						<ProductList
							products={this.state.products}
							onChange={products => this.sendUpdate('products', products)}
						/>
						<Row>
							<Col sm={12}>
								<DataPoint
									label="Details"
									componentClass="textarea"
									rows="8"
									value={this.state.details}
									onChange={e => this.sendUpdate('details', e.target.value)}
								/>
								<DataPoint
									label="Notes"
									componentClass="textarea"
									rows="8"
									value={this.state.notes}
									onChange={e => this.sendUpdate('notes', e.target.value)}
								/>
							</Col>
						</Row>
					</Grid>

				</Form>
			</div>
		);
	}
}