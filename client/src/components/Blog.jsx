import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Context from '../context';
import NoContent from './Pin/NoContent';
import CreatePin from './Pin/CreatePin';
import PinContent from './Pin/PinContent';

const Blog = ({ classes }) => {
	const mobileSize = useMediaQuery("(max-width: 650px)");
	const { state } = useContext(Context);
	const { draft, currentPin } = state;

	let BlogContent;
	if (!draft && !currentPin) {
		BlogContent = NoContent;
	} else if (draft && !currentPin) {
		BlogContent = CreatePin;
	} else if (!draft && currentPin) {
		BlogContent = PinContent;
	}

	return (
		<Paper className={mobileSize ? classes.rootMobile : classes.root}>
			<BlogContent />
		</Paper>
	);
};

const styles = {
	root: {
		//minWidth: 350,
		//maxWidth: 400,
		width: '19vw',
		maxHeight: 'calc(100vh - 64px)',
		overflowY: 'scroll',
		display: 'flex',
		justifyContent: 'center',
		background: '#c5cae9',
	},
	rootMobile: {
		maxWidth: '100%',
		maxHeight: 300,
		overflowX: 'hidden',
		overflowY: 'scroll',
	},
};

export default withStyles(styles)(Blog);
