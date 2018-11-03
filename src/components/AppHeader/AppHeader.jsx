import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Fastfood from '@material-ui/icons/Fastfood';

const styles = {
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	wrapper: {
		width: '83%',
		margin: '0 auto'
	},
	buttonGroup: {
		marginLeft: 'auto'
	}
};

function AppHeader(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<div className={classes.wrapper}>
					<Toolbar>
						<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
							<Fastfood />
						</IconButton>
						<div className={classes.buttonGroup}>
							<Button color="inherit">Add New</Button>
							<Button color="inherit">View Diary</Button>
						</div>
					</Toolbar>
				</div>
			</AppBar>
		</div>
	);
}

AppHeader.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppHeader);
