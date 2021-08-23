import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import AccessTimeIcon from '@material-ui/icons/AccessTime';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import TimelineIcon from '@material-ui/icons/Timeline';
import format from 'date-fns/format';

import Avatar from '@material-ui/core/Avatar';

import Context from '../../context';
import Comments from '../Comment/Comments';
import CreateComment from '../Comment/CreateComment';

const PinContent = ({ classes }) => {
	const { state } = useContext(Context);
	const { title, content, author, createdAt, comments } = state.currentPin;

	console.log({ state });
	return (
		<div className={classes.root}>
			<Typography component="h2" variant="h4" color="secondary" gutterBottom>
				{title}
			</Typography>
			<Typography
				className={classes.text}
				component="h3"
				variant="h6"
				color="inherit"
				gutterBottom>
				<RecordVoiceOverIcon className={classes.icon} color="secondary" />{' '}
				{author.name}
			</Typography>

			<Typography
				className={classes.text}
				variant="subtitle2"
				color="inherit"
				gutterBottom>
				<TimelineIcon className={classes.icon} color="secondary" />
				{format(Number(createdAt), 'MMM DD, YYYY')}
			</Typography>
			<Typography variant="subtitle1" gutterBottom>
				{content}
			</Typography>

			{/* Pin Comments */}
			<CreateComment />
			<Comments comments={comments} />
		</div>
	);
};

const styles = (theme) => ({
	root: {
		padding: '1em 0.5em',
		textAlign: 'center',
		width: '100%',
	},
	icon: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	text: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default withStyles(styles)(PinContent);
