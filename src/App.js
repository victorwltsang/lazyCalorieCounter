<<<<<<< HEAD
import React, { Component } from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./components/Main/Main";
import api from "./utils/api";
import sortByDate from "./utils/sortByDate";
import isLocalHost from "./utils/isLocalHost";
import { Router, Link } from "@reach/router";
=======
import React, { Component } from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './components/Main/Main';
>>>>>>> 5fe0ef3fa16c1f5b340e8185380be76345a5e697

export default class App extends Component {
	render() {
		return (
			<React.Fragment>
				<CssBaseline />
				<AppHeader />
				<Main />
			</React.Fragment>
		);
	}
}
