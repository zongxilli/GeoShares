import React, { useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Context from '../../context';
import { ME_QUERY } from '../../graphql/queries';
import { BASE_URL } from '../../client';

const Login = ({ classes }) => {
	const { dispatch } = useContext(Context);

	const onSuccessHandler = async (googleUser) => {
		try {
			const idToken = googleUser.getAuthResponse().id_token;

			const client = new GraphQLClient(BASE_URL, {
				headers: { authorization: idToken },
				mode :'cors'
			});

			const { me } = await client.request(ME_QUERY);

			dispatch({ type: 'LOGIN_USER', payload: me });
			dispatch({ type: 'IS_LOGGED_IN', payload: googleUser.isSignedIn() });
		} catch (err) {
			onFailureHandler(err);
		}
	};

	const onFailureHandler = (err) => {
		console.error('Error logging in', err);
		dispatch({ type: 'IS_LOGGED_IN', payload: false });
	};

	return (
		<div className={classes.root}>
			<Typography
				component="h1"
				variant="h3"
				gutterBottom
				noWrap
				style={{ color: '#06C7FF' }}>
				Welcome to GeoShares
			</Typography>
			<GoogleLogin
				clientId="542755764696-prhmgcj7nhqs0m1r3ntandrcqquqlroi.apps.googleusercontent.com"
				onFailure={onFailureHandler}
				onSuccess={onSuccessHandler}
				isSignedIn={true}
				// buttonText='Login with Google'
				// theme="dark"
			/>
		</div>
	);
};

const styles = {
	root: {
		height: '98vh',
		width: 'auto',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
};

export default withStyles(styles)(Login);
