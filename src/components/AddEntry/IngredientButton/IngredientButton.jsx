import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		position: 'relative',
		padding: '20px 30px'
	},
	remove: {
		position: 'absolute',
		top: 0,
		right: 0
	}
});

function IngredientButton(props) {
	const { classes } = props;
	return (
		<div>
			<Button key={props.key} variant="contained" className={classes.button}>
				<div className={classes.remove}>X</div>
				{props.name}
			</Button>
		</div>
	);
}

export default withStyles(styles)(IngredientButton);
