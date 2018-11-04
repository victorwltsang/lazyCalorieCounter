import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Fastfood from '@material-ui/icons/Fastfood';
import { Link } from 'react-router-dom';
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
	},
	white: {
		color: 'white',
		textDecoration: 'none'
	}
};

function AppHeader(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<div className={classes.wrapper}>
					<Toolbar>
						<Link to="/diary">
							<IconButton className={classes.menuButton} className={classes.white} aria-label="Menu">
								<Fastfood />
							</IconButton>
						</Link>

						<div className={classes.buttonGroup}>
							<Link to="/add">
								<Button className={classes.white}>Add New</Button>
							</Link>
							<Link to="/diary">
								<Button className={classes.white}>View Diary</Button>
							</Link>
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
