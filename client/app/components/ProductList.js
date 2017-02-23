import React from "react";
import {Button, Table, FormControl} from "react-bootstrap";

class Product extends React.Component {


	render() {
		return (
			<tr>
				<td><FormControl/></td>
				<td><FormControl/></td>
				<td><FormControl/></td>
				<td><FormControl/></td>
				<td><FormControl/></td>
				<td><FormControl type="number"/></td>
				<td><Button bsStyle="danger" onClick={() => this.props.products.deleteProduct(this.props.data)}>X</Button></td>
			</tr>
		);
	}
}

export default class ProductList extends React.Component {
	constructor(...props) {
		super(...props);
	}

	addProduct() {
		let products = this.props.products.concat([{timestamp: Date.now()}]);
		this.props.onChange(products);
	}

	updateProduct() {

	}

	deleteProduct(product) {
		let products = this.props.products.filter(p => {
			return p !== product
		});
		this.props.onChange(products);
	}

	render() {
		return (
			<Table responsive>
				<thead>
				<tr>
					<th>Species</th>
					<th>Dried</th>
					<th>Cut</th>
					<th>Dimensions Green</th>
					<th>Dimensions Dry</th>
					<th>Quantity</th>
					<th className="text-right">
						<Button bsStyle="success" bsSize="xsmall" onClick={() => this.addProduct()}>Add</Button>
					</th>
				</tr>
				</thead>
				<tbody>
				{this.props.products.map(product => <Product key={product.timestamp} data={product} products={this}/>)}
				</tbody>
			</Table>
		);
	}
}