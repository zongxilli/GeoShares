import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';

import Context from '../../context';

const Logout = ({ classes }) => {
	const { dispatch } = useContext(Context);

	const onSignout = () => {
		dispatch({ type: 'SIGNOUT_USER' });
		console.log('Signed out user');
	};

	return (
		<GoogleLogout
			onLogoutSuccess={onSignout}
			buttonText="Signout"
			render={({ onClick }) => (
				<span className={classes.root} onClick={onClick}>
					<Typography
						variant="body1"
						className={classes.buttonText}
						style={{ color: '#2596be' }}>
						Signout
					</Typography>
					<ExitToAppIcon
						className={classes.buttonIcon}
						style={{ color: '#2596be' }}
					/>
				</span>
			)}
		/>
	);
};

const styles = {
	root: {
		cursor: 'pointer',
		display: 'flex',
	},
	buttonText: {
		color: 'orange',
	},
	buttonIcon: {
		marginLeft: '5px',
		color: 'orange',
	},
};

export default withStyles(styles)(Logout);
