'use strict';

import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRedirect, browserHistory} from "react-router";
import "./app.scss";
import Layout from "./Layout";
import Buckets from "./pages/Buckets";
import Bucket from "./pages/Bucket";
import Items from "./pages/Items";
import Item from "./pages/Item";

const app = document.getElementById('app');

ReactDom.render(
	<Router history={browserHistory}>
		<Route path="/" component={Layout}>
			<IndexRedirect to="items"/>
			<Route path="buckets" component={Buckets}/>
			<Route path="buckets/:bucket" component={Bucket}/>
			<Route path="items" component={Items}/>
			<Route path="items/:item" component={Item}/>
		</Route>
	</Router>,
	app
);
