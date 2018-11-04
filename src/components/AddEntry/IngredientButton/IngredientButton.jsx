import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		position: 'relative',
		fontSize: 10,
		padding: '0px 5px'
		// [theme.breakpoints.down('sm')]: {
		// 	width: '100%'
		// }
	}
});

function IngredientButton(props) {
	const { classes } = props;
	return (
		<div>
			<Button key={props.key} variant="contained" className={classes.button}>
				{props.name}
			</Button>
		</div>
	);
}

export default withStyles(styles)(IngredientButton);
