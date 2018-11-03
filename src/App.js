import React, { Component } from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './components/Main/Main';
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
