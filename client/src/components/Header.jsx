import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import LoyaltyIcon from '@material-ui/icons/Loyalty';
import CameraIcon from '@material-ui/icons/Camera';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Context from '../context';
import Logout from './Auth/Logout';

const Header = ({ classes }) => {
	const mobileSize = useMediaQuery('(max-width: 650px)');
	const { state } = useContext(Context);
	const { currentUser } = state;

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					{/* Title & Logo */}
					<div className={classes.grow}>
						<CameraIcon className={classes.icon} style={{ color: 'lime' }} />
						<Typography
							className={mobileSize ? classes.mobile : ''}
							component="h1"
							variant="h6"
							color="inherit"
							noWrap>
							GeoShares
						</Typography>
					</div>

					{/* Current User Info */}
					{currentUser && (
						<div className={classes.grow}>
							<img
								className={classes.picture}
								src={currentUser.picture}
								alt={currentUser.name}
							/>

							<Typography
								className={mobileSize ? classes.mobile : ''}
								variant="h5"
								color="inherit"
								noWrap>
								{currentUser.name}
							</Typography>
						</div>
					)}

					{/* Logout Button */}
					<Logout />
				</Toolbar>
			</AppBar>
		</div>
	);
};

const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
	},
	icon: {
		marginRight: theme.spacing(1),
		color: 'green',
		fontSize: 45,
	},
	mobile: {
		display: 'none',
	},
	picture: {
		height: '50px',
		borderRadius: '90%',
		marginRight: theme.spacing(2),
	},
});

export default withStyles(styles)(Header);
