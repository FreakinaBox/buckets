import React from "react";
import ReactTable from "react-table";
import moment from "moment";
import DataPoint from "../components/DataPoint";
import socket from "../components/socket";

export default class Orders extends React.Component {
	constructor(...props) {
		super(...props);

		this.rowSetup = this.rowSetup.bind(this);

		this.state = {items: []};
		this.filters = {};
		this.rawFilters = {};
		this.columns = [
			{header: 'ID', accessor: 'id'},
			{header: 'Client', accessor: 'client'},
			{header: 'Assigned To', accessor: 'assignedTo'},
			{header: 'Status', accessor: 'status'},
			{header: 'Order Date', accessor: 'orderDate', render: this.formatDate},
			{header: 'Due Date', accessor: 'dueDate', render: this.formatDate},
		];

		this.searchItems();
	}

	formatDate(rowInfo) {
		var date = moment(rowInfo.value);
		return date.format('LL');
	}

	updateFilter(key, value, regex = false) {
		this.rawFilters[key] = value || '';
		if (!value) {
			delete this.filters[key];
		}
		else {
			this.filters[key] = regex ? {$regex: `^${value}`, $options: 'i'} : value;
		}
		this.searchItems();
	}

	searchItems() {
		socket.emit('searchItems', this.filters, items => this.setState({items}));
	}

	rowSetup(state, rowInfo) {
		return rowInfo ? {
				onClick: () => {
					this.props.router.push(`orders/${rowInfo.row.id}`);
				}
			} : {};
	}

	render() {
		return (
			<div>
				<div className="row">

					<div className="col-sm-4">
						<DataPoint
							label="ID"
							type="number"
							onChange={e => this.updateFilter('id', e.target.value, true)}
						/>
					</div>

					<div className="col-sm-4">
						<DataPoint
							label="Client"
							onChange={e => this.updateFilter('client', e.target.value, true)}
						/>
					</div>

					<div className="col-sm-4">
						<DataPoint
							label="Assigned To"
							onChange={e => this.updateFilter('assignedTo', e.target.value, true)}
						/>
					</div>

					<div className="col-sm-4">
						<DataPoint
							label="Status"
							componentClass="select"
							onChange={e => this.updateFilter('status', e.target.value)}
						>
							<option></option>
							<option>New</option>
							<option>In Progress</option>
							<option>Finished</option>
							<option>Canceled</option>
						</DataPoint>
					</div>

					<div className="col-sm-4">
						<DataPoint
							label="Order Date"
							componentClass="datePicker"
							value={this.rawFilters.orderDate}
							onChange={value => this.updateFilter('orderDate', value)}
						/>
					</div>

					<div className="col-sm-4">
						<DataPoint
							label="Due Date"
							componentClass="datePicker"
							value={this.rawFilters.dueDate}
							onChange={value => this.updateFilter('dueDate', value)}
						/>
					</div>

				</div>

				<ReactTable data={this.state.items} columns={this.columns} defaultPageSize="10" getTdProps={this.rowSetup}/>

			</div>
		);
	}
}