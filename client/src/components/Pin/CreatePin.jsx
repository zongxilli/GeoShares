import React, { useContext, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import axios from 'axios';
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
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';

const CreatePin = ({ classes }) => {
	const { state, dispatch } = useContext(Context);

	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [content, setContent] = useState('');

	const [submitting, setSubmitting] = useState(false);

	const discardHandler = () => {
		setTitle('');
		setImage('');
		setContent('');
		dispatch({ type: 'DELETE_DRAFT' });
	};

	const imageUploadHandler = async () => {
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'geoshares');
		data.append('cloud_name', 'zongxi-kenny');

		const res = await axios.post(
			'https://api.cloudinary.com/v1_1/zongxi-kenny/image/upload',
			data
		);
		return res.data.url;
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			setSubmitting(true);

			const idToken = window.gapi.auth2
				.getAuthInstance()
				.currentUser.get()
				.getAuthResponse().id_token;
			const client = new GraphQLClient('http://localhost:4000/graphql', {
				headers: { authorization: idToken },
			});

			const url = await imageUploadHandler();
			const { latitude, longitude } = state.draft;
			const variables = { title, image: url, content, latitude, longitude };

			const { createPin } = await client.request(
				CREATE_PIN_MUTATION,
				variables
			);

			console.log('Pin created', { createPin });
			discardHandler();
		} catch (err) {
			setSubmitting(false);
			console.error('Error creating pin', err);
		}
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
					disabled={!title.trim() || !content.trim() || !image || submitting}
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
