import React, { useState, useEffect } from 'react';
import ReactMapGL, {
	NavigationControl,
	GeolocateControl,
	ScaleControl,
	Marker,
} from 'react-map-gl';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import TrafficRoundedIcon from '@material-ui/icons/TrafficRounded';
import DirectionsBikeOutlinedIcon from '@material-ui/icons/DirectionsBikeOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import NightsStayIcon from '@material-ui/icons/NightsStay';

import PinIcon from './PinIcon';

// --------------------------------------------------------------------
//                                                     Helper Functions
const indexPlusOne = (num) => {
	if (num + 1 >= MAP_LIST.length) {
		return 0;
	} else {
		return num + 1;
	}
};

// --------------------------------------------------------------------

// --------------------------------------------------------------------
//                                                       Initial State
const INITIAL_VIEWPORT = {
	latitude: 43.6532,
	longitude: -79.3832,
	zoom: 12,
};

// Kenny Edition
const MAP_LIST = [
	'mapbox://styles/mapbox/streets-v11',
	'mapbox://styles/mapbox/navigation-night-v1',
	'mapbox://styles/mapbox/navigation-day-v1',
	'mapbox://styles/mapbox/outdoors-v11',
	'mapbox://styles/mapbox/satellite-streets-v11',
];

// --------------------------------------------------------------------

//? --------------------------------------------------------------------
//?                                                      Map Icon Style

const geolocateControlStyle = {
	right: 50,
	bottom: 40,
};

const navControlStyle = {
	right: 50,
	bottom: 100,
};

const scaleControlStyle = {
	right: 110,
	bottom: 40,
};

//? --------------------------------------------------------------------

const Map = ({ classes }) => {
	// Kenny Edition
	const [currMapIndex, setCurrMapIndex] = useState(0);

	const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
	const [userPosition, setUserPosition] = useState(null);

	useEffect(() => {
		getUserPosition();
	}, []);

	const getUserPosition = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				setViewport({ ...viewport, latitude, longitude });
				setUserPosition({ latitude, longitude });
			});
		}
	};

	// Kenny Edition
	const onClickHandler = (e) => {
		e.preventDefault();

		setCurrMapIndex(indexPlusOne(currMapIndex));
	};

	return (
		<div className={classes.root}>
			<ReactMapGL
				width="100vw"
				height="calc(100vh - 64px)"
				mapStyle={MAP_LIST[currMapIndex]}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}
				onViewportChange={(currViewport) => setViewport(currViewport)}
				{...viewport}>
				{/* Geo locate Control  */}
				<div className={classes.geolocationControl}>
					<GeolocateControl
						style={geolocateControlStyle}
						positionOptions={{ enableHighAccuracy: true }}
						trackUserLocation={true}
						auto
					/>
				</div>
				{/* -------------------- Kenny Edition -------------------- */}

				<ScaleControl style={scaleControlStyle} />
				<NavigationControl style={navControlStyle} />

				<div
					onClick={(e) => onClickHandler(e)}
					style={{ float: 'right', margin: '2.9rem 2.9rem' }}>
					{currMapIndex === 0 && (
						<Brightness5Icon fontSize="large" style={{ color: 'black' }} />
					)}
					{currMapIndex === 1 && (
						<NightsStayIcon fontSize="large" style={{ color: 'white' }} />
					)}
					{currMapIndex === 2 && (
						<TrafficRoundedIcon fontSize="large" style={{ color: 'black' }} />
					)}
					{currMapIndex === 3 && (
						<DirectionsBikeOutlinedIcon
							fontSize="large"
							style={{ color: 'black' }}
						/>
					)}
					{currMapIndex === 4 && (
						<PublicOutlinedIcon fontSize="large" style={{ color: 'white' }} />
					)}
				</div>
				{/* -------------------- Kenny Edition -------------------- */}

				{/* Pin for User's Current Position */}
				{/* {userPosition && (
					<Marker
						latitude={userPosition.latitude}
						longitude={userPosition.longitude}
						offsetLeft={-19}
						offsetTop={-37}>
						<PinIcon size={40} color="red" />
					</Marker>
				)} */}
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
