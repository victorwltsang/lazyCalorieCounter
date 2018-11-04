import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Typography, Button, Divider } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Clarifai from 'clarifai';
import IngredientButton from './IngredientButton/IngredientButton';
import api from '../../utils/api';
const clarifaiApp = new Clarifai.App({
	apiKey: 'aa6af86e8861469684d627709efaaa25'
});
console.log('hi', process.env.FAUNADB_SECRET);
const styles = theme => ({
	root: {
		padding: '25px 50px'
	},
	paper: {
		padding: theme.spacing.unit * 1,
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	formWrapper: {
		marginTop: '10px'
	},
	iconSmall: {
		marginRight: 5
	},
	button: {
		width: '100%',
		fontSize: '20px',
		margin: 'auto',
		padding: '15px'
	},
	ingredientsWrapper: {
		marginTop: '14px',
		padding: 20,
		backgroundColor: 'transparent',
		border: '1px solid #b7b7b7',
		borderRadius: '5px',
		display: 'flex',
		flexWrap: 'wrap'
	},
	img: {
		marginTop: '10px',
		borderRadius: '5px',
		width: '100%'
	}
});

class AddEntry extends Component {
	state = {
		title: '',
		date: '',
		files: [],
		ingredients: []
	};

	componentDidMount() {
		console.log('loaded');
		let today = moment(new Date()).format('YYYY-MM-DD');
		this.setState({
			date: today
		});
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	saveEntry = () => {
		let entry = {
			title: this.state.title,
			date: this.state.date,
			fileName: this.state.files.name,
			fileBase: this.state.files.base64
		};

		console.log(entry);

		api.create(entry).then(response => {
			console.log(response);
			// got back to list page
		});
	};

	async getFiles(files) {
		this.setState({ files: files });
		// clarifaiApp here

		var base64Img = this.state.files.base64.split(',')[1];

		let clarifaiResponse = await clarifaiApp.models
			.predict(Clarifai.FOOD_MODEL, { base64: base64Img })
			.then(response => {
				return response.rawData.outputs[0].data.concepts.map(concept => {
					return concept.name;
				});
			});

		console.log(clarifaiResponse);
		this.setState({
			ingredients: clarifaiResponse
		});
	}

	// save entry

	// saveTodo = e => {
	//     e.preventDefault();
	//     const { todos } = this.state;
	//     const todoValue = this.inputElement.value;

	//     if (!todoValue) {
	//       alert("Please add Todo title");
	//       this.inputElement.focus();
	//       return false;
	//     }

	//     // reset input to empty
	//     this.inputElement.value = "";

	//     const todoInfo = {
	//       title: todoValue,
	//       completed: false
	//     };
	//     // Optimistically add todo to UI
	//     const newTodoArray = [
	//       {
	//         data: todoInfo,
	//         ts: new Date().getTime() * 10000
	//       }
	//     ];

	//     const optimisticTodoState = newTodoArray.concat(todos);

	//     this.setState({
	//       todos: optimisticTodoState
	//     });
	//     // Make API request to create new todo
	//     api
	//       .create(todoInfo)
	//       .then(response => {
	//         console.log(response);
	//         // remove temporaryValue from state and persist API response
	//         const persistedState = removeOptimisticTodo(todos).concat(response);
	//         // Set persisted value to state
	//         this.setState({
	//           todos: persistedState
	//         });
	//       })
	//       .catch(e => {
	//         console.log("An API error occurred", e);
	//         const revertedState = removeOptimisticTodo(todos);
	//         // Reset to original state
	//         this.setState({
	//           todos: revertedState
	//         });
	//       });
	//   };

	//

	render() {
		const { classes } = this.props;
		console.log(this.state);
		console.log(this.state.ingredients);
		let ingredientsButtons = this.state.ingredients.map(ing => {
			return <IngredientButton key={ing} name={ing} />;
		});
		return (
			<Paper className={classes.root}>
				<Typography align="center" variant="h5">
					Add New Entry
				</Typography>
				<Grid container spacing={24} className={classes.formWrapper}>
					<Grid item xs={12}>
						<form className={classes.container} noValidate autoComplete="off">
							<TextField
								id="title"
								label="Title"
								value={this.state.title}
								onChange={this.handleChange('title')}
								placeholder="Title/Description"
								fullWidth
								margin="normal"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
							<TextField
								id="date"
								label="Date"
								type="date"
								value={this.state.date}
								onChange={this.handleChange('date')}
								fullWidth
								margin="normal"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						</form>
					</Grid>
					<Grid item xs={12}>
						{/* <FilePond allowFileEncod="true" /> */}
					</Grid>

					<Grid item xs={12}>
						<Grid container spacing={24}>
							<Grid item xs={12} md={6}>
								<FileBase64 onDone={this.getFiles.bind(this)} />
								<img src={this.state.files.base64} className={classes.img} />
							</Grid>
							<Grid item xs={12} md={6}>
								<Typography variant="caption">Ingredients</Typography>
								<div className={classes.ingredientsWrapper}>{ingredientsButtons}</div>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12}>
						<Grid container spacing={24}>
							<Grid item xs={12} sm={6}>
								<Button
									variant="contained"
									size="large"
									color="primary"
									className={classes.button}
									onClick={this.saveEntry}
									disabled={this.state.files.length === 0 ? true : false}
								>
									Save
								</Button>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Button variant="contained" size="large" color="secondary" className={classes.button}>
									Cancel
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

export default withStyles(styles)(AddEntry);
