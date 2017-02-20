import React from "react";
import ReactTable from "react-table";
import StatusSelector from "../components/StatusSelector";
import socket from "../components/socket";

export default class Items extends React.Component {
	constructor(...props) {
		super(...props);

		this.searchItems = this.searchItems.bind(this);
		this.rowSetup = this.rowSetup.bind(this);

		this.state = {items: []};
		this.filters = {};
		this.columns = [
			{header: 'ID', accessor: 'id'},
			{header: 'Status', accessor: 'status'},
			{header: 'Client', accessor: 'client'},
		];

		this.searchItems();
	}

	createItem() {
		socket.emit('createItem', item => this.props.router.push(`items/${item.id}`));
	}

	searchItems() {
		socket.emit('searchItems', this.filters, items => this.setState({items}));
	}

	rowSetup(state, rowInfo) {
		return rowInfo ? {
				onClick: () => {
					this.props.router.push(`items/${rowInfo.row.id}`);
				}
			} : {};
	}

	render() {
		return (
			<div>
				<div className="d-flex">
					<button className='btn btn-primary' onClick={() => this.createItem()}>Create</button>
					<StatusSelector onChange={e => this.filters.status = e.target.value}/>
					<button className="btn btn-primary" onClick={this.searchItems}>Search</button>
				</div>
				<ReactTable data={this.state.items} columns={this.columns} defaultPageSize="10" getTdProps={this.rowSetup}/>
			</div>
		);
	}
}