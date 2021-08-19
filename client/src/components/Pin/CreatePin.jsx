import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
//import LandscapeIcon from '@material-ui/icons/LandscapeOutlined';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/SaveTwoTone';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import Context from '../../context';

const CreatePin = ({ classes }) => {
	const { dispatch } = useContext(Context);

	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [content, setContent] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();

		console.log({ title, image, content });
	};

	const discardHandler = (e) => {
		e.preventDefault();
		setTitle('');
		setImage('');
		setContent('');
    dispatch({type: 'DELETE_DRAFT'})
	};

	return (
		<form className={classes.form}>
			<Typography
				className={classes.alignCenter}
				component="h2"
				variant="h4"
				color="secondary">
				<RateReviewIcon className={classes.iconLarge} /> Pin Location
			</Typography>

			<div>
				<TextField
					name="title"
					label="Title"
					placeholder="Insert pin title"
					onChange={(e) => setTitle(e.target.value)}
				/>

				<input
					accept="image/*"
					id="image"
					type="file"
					className={classes.input}
					onChange={(e) => setImage(e.target.files[0])}
				/>
				<label htmlFor="image">
					<Button component="span" size="small" className={classes.button}>
						{image ? <DoneAllIcon /> : <AddAPhotoIcon />}
					</Button>
				</label>
			</div>

			<div>
				<TextField
					name="content"
					label="content"
					multiline
					rows="8"
					margin="normal"
					fullWidth
					variant="outlined"
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>
			<div>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={discardHandler}>
					Discard
					<ClearIcon className={classes.leftIcon} />
				</Button>
				<Button
					type="submit"
					className={classes.button}
					variant="contained"
					color="secondary"
					disabled={!title.trim() || !content.trim() || !image}
					onClick={submitHandler}>
					Submit
					<SaveIcon className={classes.rightIcon} />
				</Button>
			</div>
		</form>
	);
};

const styles = (theme) => ({
	form: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		paddingBottom: theme.spacing.unit,
	},
	contentField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '95%',
	},
	input: {
		display: 'none',
	},
	alignCenter: {
		display: 'flex',
		alignItems: 'center',
	},
	iconLarge: {
		fontSize: 40,
		marginRight: theme.spacing.unit,
	},
	leftIcon: {
		fontSize: 20,
		marginRight: theme.spacing.unit,
	},
	rightIcon: {
		fontSize: 20,
		marginLeft: theme.spacing.unit,
	},
	button: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit,
		marginLeft: 0,
	},
});

export default withStyles(styles)(CreatePin);
