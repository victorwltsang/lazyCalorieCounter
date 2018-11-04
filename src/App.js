import React, { Component } from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './components/Main/Main';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class App extends Component {
	render() {
		return (
			<Router>
				<React.Fragment>
					<CssBaseline />
					<AppHeader />
					<Main />
				</React.Fragment>
			</Router>
		);
	}
}
