import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import Context from '../context';
import NoContent from './Pin/NoContent';
import CreatePin from './Pin/CreatePin';

const Blog = ({ classes }) => {
	const { state } = useContext(Context);
	const { draft } = state;

	let BlogContent;
	if (!draft) {
		BlogContent = NoContent;
	} else if (draft) {
		BlogContent = CreatePin;
	}

	return (
		<Paper className={classes.root}>
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
