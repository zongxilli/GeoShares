import React, { useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Context from '../../context';
import { ME_QUERY } from '../../graphql/queries';

const Login = ({ classes }) => {
	const { dispatch } = useContext(Context);

	const onSuccessHandler = async (googleUser) => {
		try {
			const idToken = googleUser.getAuthResponse().id_token;

			const client = new GraphQLClient('http://localhost:4000/graphql', {
				headers: { authorization: idToken },
			});

			const me = await client.request(ME_QUERY);

			dispatch({ type: 'LOGIN_USER', payload: me });
			dispatch({ type: 'IS_LOGGED_IN', payload: googleUser.isSignedIn() });
		} catch (err) {
			onFailureHandler(err);
		}
	};

	const onFailureHandler = (err) => {
		console.error('Error logging in', err);
	};

	return (
		<div className={classes.root}>
			<Typography
				component="h1"
				variant="h3"
				gutterBottom
				noWrap
				style={{ color: 'rgb(215, 6, 255, 1)' }}>
				welcome
			</Typography>
			<GoogleLogin
				clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
				onFailure={onFailureHandler}
				onSuccess={onSuccessHandler}
				isSignedIn={true}
				theme="light"
			/>
		</div>
	);
};

const styles = {
	root: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
};

export default withStyles(styles)(Login);
