import React, { Component } from 'react';
import api from '../../utils/api';
import isLocalHost from '../../utils/isLocalHost';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper
	},
	gridList: {
		width: '100%',
		height: 'auto'
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)'
	}
});

class ListDiary extends Component {
	state = {
		list: []
	};
	async componentDidMount() {
		// Fetch all items
		let listResponse = api.readAll().then(items => {
			if (items.message === 'unauthorized') {
				if (isLocalHost()) {
					alert(
						'FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran npm start. Visit http://bit.ly/set-fauna-key for more info'
					);
				} else {
					alert(
						'FaunaDB key is not unauthorized. Verify the key FAUNADB_SECRET set in Netlify enviroment variables is correct'
					);
				}
				return false;
			}

			console.log('all items', items);
			this.setState({
				list: items
			});
		});
	}
	render() {
		const { classes } = this.props;

		let myList;
		if (this.state.list) {
			console.log('hi', this.state.list);
			myList = this.state.list.map(item => {
				return item.data.title + item.data.date;
			});

			return (
				<div className={classes.root}>
					<GridList cellHeight={180} className={classes.gridList}>
						{this.state.list.reverse().map(item => (
							<GridListTile key={item.ref['@ref'].id}>
								<img src={item.data.fileBase} alt={item.data.title} />
								<GridListTileBar
									title={item.data.title}
									subtitle={<span>Date: {item.data.date}</span>}
									subtitle={<span>Calories: 100</span>}
									actionIcon={
										<IconButton className={classes.icon}>
											<EditIcon />
										</IconButton>
									}
								/>
							</GridListTile>
						))}
					</GridList>
				</div>
			);

			//   return <div>List is empty</div>;
		} else {
			return <div>List is empty</div>;
		}
	}
}

export default withStyles(styles)(ListDiary);
