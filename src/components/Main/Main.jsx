import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import AddEntry from '../AddEntry/AddEntry';

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
			<AddEntry />
		</div>
	);
};

export default withStyles(styles)(Main);
