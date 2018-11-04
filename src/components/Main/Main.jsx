import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import AddEntry from '../AddEntry/AddEntry';
import ListDiary from '../ListDiary/ListDiary';
import { Route } from 'react-router-dom';
const styles = theme => ({
	root: {
		flexGrow: 1,
		width: '80%',
		margin: '50px auto'
	}
});

const Main = props => {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<Route exact path="/" component={AddEntry} />
			<Route path="/add" component={AddEntry} />
			<Route path="/diary" component={ListDiary} />
			{/* <AddEntry />
			<ListDiary /> */}
		</div>
	);
};

export default withStyles(styles)(Main);
