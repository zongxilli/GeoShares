import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import Typography from '@material-ui/core/Typography';

const NoContent = ({ classes }) => (
	<div className={classes.root}>
		<EditLocationIcon className={classes.icon} style={{ color: 'hotpink' }} />
		<Typography
			noWrap
			component="h2"
			variant="h6"
			align="center"
			color="textPrimary"
			gutterBottom>
			Click on map to pin
		</Typography>
	</div>
);

const styles = (theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	icon: {
		margin: theme.spacing(1),
		fontSize: '80px',
	},
});

export default withStyles(styles)(NoContent);
