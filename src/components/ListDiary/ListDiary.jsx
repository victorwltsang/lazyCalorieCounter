import React, { Component } from 'react';
import api from '../../utils/api';
import isLocalHost from '../../utils/isLocalHost';
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
		let myList;
		if (this.state.list) {
			console.log('hi', this.state.list);
			myList = this.state.list.map(item => {
				return item.data.title + item.data.date;
			});
		}

		return <div>{myList}</div>;
	}
}

export default ListDiary;
