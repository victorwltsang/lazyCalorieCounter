import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Typography, Button, Divider } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import TextField from '@material-ui/core/TextField';

import moment from 'moment';

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
		marginTop: '8px',
		padding: 20,
		backgroundColor: 'transparent',
		border: '1px solid #b7b7b7'
	}
});

const ingredients = [''];

class AddEntry extends Component {
	state = {
		title: '',
		date: '',
		files: []
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
	};

	getFiles(files) {
		this.setState({ files: files });
	}

	render() {
		const { classes } = this.props;
		console.log(this.state);
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
						<FileBase64 onDone={this.getFiles.bind(this)} />
					</Grid>
					<Grid item xs={12}>
						<Typography variant="caption">Ingredients</Typography>
						<Paper className={classes.ingredientsWrapper} />
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>

					<Grid item xs={12}>
						<Grid container spacing={24}>
							<Grid item xs={12} sm={6}>
								<Button variant="contained" size="large" color="secondary" className={classes.button}>
									Cancel
								</Button>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Button
									variant="contained"
									size="large"
									color="primary"
									className={classes.button}
									onClick={this.saveEntry}
								>
									Save
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
