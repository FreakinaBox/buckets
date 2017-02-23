'use strict';

import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRedirect, browserHistory} from "react-router";
import "./app.scss";
import Layout from "./Layout";
import Buckets from "./pages/Buckets";
import Bucket from "./pages/Bucket";
import Orders from "./pages/Orders";
import Order from "./pages/Order";

const app = document.getElementById('app');

ReactDom.render(
	<Router history={browserHistory}>
		<Route path="/" component={Layout}>
			<IndexRedirect to="orders"/>
			<Route path="buckets" component={Buckets}/>
			<Route path="buckets/:bucket" component={Bucket}/>
			<Route path="orders" component={Orders}/>
			<Route path="orders/:item" component={Order}/>
		</Route>
	</Router>,
	app
);
