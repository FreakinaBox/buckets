import React from "react";
import ReactTable from "react-table";
import moment from "moment";
import debounce from "debounce";
import DataPoint from "../components/DataPoint";
import socket from "../components/socket";

export default class Orders extends React.Component {
	constructor(...props) {
		super(...props);

		this.rowSetup = this.rowSetup.bind(this);
		this.searchItems = debounce(this._searchItems.bind(this), 500);

		this.state = {
			items: [],
			status: [
				{label: 'New', value: 'New'},
				{label: 'In Progress', value: 'In Progress'}
			]
		};
		this.filters = {status: {$in: ['New', 'In Progress']}};
		this.rawFilters = {};
		this.columns = [
			{header: 'ID', accessor: 'id'},
			{header: 'Client', accessor: 'client'},
			{header: 'Assigned To', accessor: 'assignedTo'},
			{header: 'Status', accessor: 'status'},
			{header: 'Order Date', accessor: 'orderDate', render: Orders.formatDate},
			{header: 'Due Date', accessor: 'dueDate', render: Orders.formatDate},
		];

		this.searchItems();
	}

	static formatDate(rowInfo) {
		let date = moment(rowInfo.value);
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

	setStatusFilter(values) {
		this.setState({status: values});

		let filters = values.map(o => {
			return o.value;
		});

		this.filters.status = {$in: filters};

		this.searchItems();
	}

	_searchItems() {
		socket.emit('searchItems', this.filters, items => this.setState({items}));
	}

	rowSetup(state, rowInfo) {
		return rowInfo ? {onClick: () => this.props.router.push(`orders/${rowInfo.row.id}`)} : {};
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
							componentClass="reactSelect"
							multi={true}
							options={[
								{label: 'New', value: 'New'},
								{label: 'In Progress', value: 'In Progress'},
								{label: 'Finished', value: 'Finished'},
								{label: 'Canceled', value: 'Canceled'}
							]}
							value={this.state.status}
							onChange={v => this.setStatusFilter(v)}
						/>
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