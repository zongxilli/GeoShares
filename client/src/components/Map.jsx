import React, { useState } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import Brightness6Icon from '@material-ui/icons/Brightness6';

// --------------------------------------------------------------------
//                                                        Initial State
const INITIAL_VIEWPORT = {
	latitude: 43.6532,
	longitude: -79.3832,
	zoom: 13,
};

// Kenny Edition
const INITIAL_MAP = 'mapbox://styles/mapbox/navigation-night-v1';
// --------------------------------------------------------------------

const Map = ({ classes }) => {
	// Kenny Edition
	const [currMap, setCurrMap] = useState(INITIAL_MAP);

	const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

	// Kenny Edition
	const onClickHandler = (e) => {
		e.preventDefault();

		if (currMap === 'mapbox://styles/mapbox/navigation-night-v1') {
			setCurrMap('mapbox://styles/mapbox/navigation-day-v1');
		} else {
			setCurrMap('mapbox://styles/mapbox/navigation-night-v1');
		}
	};

	return (
		<div className={classes.root}>
			<ReactMapGL
				width="100vw"
				height="calc(100vh - 65px)"
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
				{/* ---------- Kenny Edition ---------- */}
				<div
					onClick={(e) => onClickHandler(e)}
					style={{ float: 'right', margin: '1.25rem' }}>
					{currMap === 'mapbox://styles/mapbox/navigation-night-v1' ? (
						<Brightness6Icon
							className={classes.icon}
							style={{ color: 'white' }}
						/>
					) : (
						<Brightness6Icon
							className={classes.icon}
							style={{ color: 'black' }}
						/>
					)}
				</div>
				{/* ---------- Kenny Edition ---------- */}
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
