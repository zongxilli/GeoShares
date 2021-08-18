import React, { useState } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import Brightness6Icon from '@material-ui/icons/Brightness6';

const INITIAL_VIEWPORT = {
	latitude: 43.6532,
	longitude: -79.3832,
	zoom: 13,
};

// Kenny Addition
const INITIAL_MAP = 'mapbox://styles/mapbox/navigation-night-v1';

const Map = ({ classes }) => {
	// Kenny Addition
	const [currMap, setCurrMap] = useState(INITIAL_MAP);

	const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

	return (
		<div className={classes.root}>
			<ReactMapGL
				width="100vw"
				height="calc(100vh - 64px)"
				mapStyle={currMap}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}
				onViewportChange={(currViewport) => setViewport(currViewport)}
				{...viewport}>
				{/* Navigation Control tool bar */}
				<div className={classes.navigationControl}>
					<NavigationControl
						onViewportChange={(currViewport) => setViewport(currViewport)}
					/>
				</div>
			</ReactMapGL>
		</div>
	);
};

const styles = {
	root: {
		display: 'flex',
	},
	rootMobile: {
		display: 'flex',
		flexDirection: 'column-reverse',
	},
	navigationControl: {
		position: 'absolute',
		top: 0,
		left: 0,
		margin: '1em',
	},
	deleteIcon: {
		color: 'red',
	},
	popupImage: {
		padding: '0.4em',
		height: 200,
		width: 200,
		objectFit: 'cover',
	},
	popupTab: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
};

export default withStyles(styles)(Map);
