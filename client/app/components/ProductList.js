import React from "react";
import {Button, Table, FormControl} from "react-bootstrap";


export default class ProductList extends React.Component {
	constructor(...props) {
		super(...props);
	}

	addProduct() {
		let products = this.props.products.concat([{}]);
		this.props.onChange(products);
	}

	updateProduct(product, field, newValue) {
		const products = this.props.products.map(p => {
			return p === product ? {...p, [field]: newValue} : p;
		});
		this.props.onChange(products);
	}

	deleteProduct(product) {
		let products = this.props.products.filter(p => {
			return p !== product
		});
		this.props.onChange(products);
	}

	render() {
		return (
			<Table responsive striped>
				<thead>
				<tr>
					<th>Species</th>
					<th>Dried</th>
					<th>Cut</th>
					<th>Dimensions Green</th>
					<th>Dimensions Dry</th>
					<th>Color</th>
					<th>Quantity</th>
					<th className="text-right">
						<Button bsStyle="success" bsSize="xsmall" onClick={() => this.addProduct()}>Add</Button>
					</th>
				</tr>
				</thead>
				<tbody>
				{this.props.products.map((product, i) => this.renderRow(i, product, this))}
				</tbody>
			</Table>
		);
	}

	renderRow(i, product) {
		return (
			<tr key={i}>
				<td>
					<FormControl
						value={product.species || ''}
						onChange={e => this.updateProduct(product, 'species', e.target.value)}
					/>
				</td>
				<td>
					<FormControl
						value={product.dried || ''}
						onChange={e => this.updateProduct(product, 'dried', e.target.value)}
					/>
				</td>
				<td>
					<FormControl
						value={product.cut || ''}
						onChange={e => this.updateProduct(product, 'cut', e.target.value)}
					/>
				</td>
				<td>
					<FormControl
						value={product.dimensionsGreen || ''}
						onChange={e => this.updateProduct(product, 'dimensionsGreen', e.target.value)}
					/>
				</td>
				<td>
					<FormControl
						value={product.dimensionsDry || ''}
						onChange={e => this.updateProduct(product, 'dimensionsDry', e.target.value)}
					/>
				</td>
				<td>
					<FormControl
						value={product.color || ''}
						onChange={e => this.updateProduct(product, 'color', e.target.value)}
					/>
				</td>
				<td>
					<FormControl
						type="number"
						value={product.quantity || 0}
						onChange={e => this.updateProduct(product, 'quantity', e.target.value)}
					/>
				</td>
				<td><Button bsStyle="danger" onClick={() => this.deleteProduct(product)}>X</Button></td>
			</tr>
		);
	}
}
