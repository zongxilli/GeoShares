import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, {
	NavigationControl,
	GeolocateControl,
	ScaleControl,
	Marker,
} from 'react-map-gl';
import { withStyles } from '@material-ui/core/styles';
import differenceInMinutes from 'date-fns/difference_in_minutes';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import TrafficRoundedIcon from '@material-ui/icons/TrafficRounded';
import DirectionsBikeOutlinedIcon from '@material-ui/icons/DirectionsBikeOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import NightsStayIcon from '@material-ui/icons/NightsStay';

import { useClient } from '../client';
import { GET_PINS_QUERY } from '../graphql/queries';
import PinIcon from './PinIcon';
import Blog from './Blog';
import Context from '../context';

// --------------------------------------------------------------------
//                                                     Helper Functions
//= Kenny Edition
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

//= Kenny Edition
const MAP_LIST = [
	'mapbox://styles/mapbox/streets-v11',
	'mapbox://styles/mapbox/navigation-night-v1',
	'mapbox://styles/mapbox/navigation-day-v1',
	'mapbox://styles/mapbox/outdoors-v11',
	'mapbox://styles/mapbox/satellite-streets-v11',
];

// --------------------------------------------------------------------

// --------------------------------------------------------------------
//=                                                      Map Icon Style

//= Kenny Edition
const geolocateControlStyle = {
	right: 50,
	bottom: 40,
};

//= Kenny Edition
const navControlStyle = {
	right: 50,
	bottom: 100,
};

//= Kenny Edition
const scaleControlStyle = {
	right: 110,
	bottom: 40,
};

//? --------------------------------------------------------------------

const Map = ({ classes }) => {
	const client = useClient();

	//= Kenny Edition
	const [currMapIndex, setCurrMapIndex] = useState(0);
	const [isOnThemeIcon, setIsOnThemeIcon] = useState(false);

	const { state, dispatch } = useContext(Context);

	const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
	const [userPosition, setUserPosition] = useState(null);

	useEffect(() => {
		getUserPosition();
	}, []);

	useEffect(() => {
		getPins();
		//! I think we can put state.pins
		//! down in the box in order to avoid CREATE_PINS reducer
	}, []);

	//== Kenny Edition
	useEffect(
		() => {
			setTimeout(() => {
				setIsOnThemeIcon(false);
			}, 1000);
		},
		[currMapIndex]
	);

	const getUserPosition = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				setViewport({ ...viewport, latitude, longitude });
				setUserPosition({ latitude, longitude });
			});
		}
	};

	//== Kenny Edition
	const onClickHandler = (e) => {
		e.preventDefault();

		setIsOnThemeIcon(true);
		setCurrMapIndex(indexPlusOne(currMapIndex));
		// setTimeout(() => {
		// 	setIsOnThemeIcon(false);
		// }, 2000);
	};

	const getPins = async () => {
		const { getPins } = await client.request(GET_PINS_QUERY);
		dispatch({ type: 'GET_PINS', payload: getPins });
	};

	const onMapClickHandler = ({ lngLat, leftButton }) => {
		if (!leftButton || isOnThemeIcon) return;

		if (!state.draft) {
			dispatch({ type: 'CREATE_DRAFT' });
		}

		const [longitude, latitude] = lngLat;
		dispatch({
			type: 'UPDATE_DRAFT_LOCATION',
			payload: { latitude, longitude },
		});
	};

	const highlightNewPin = (pin) => {
		const isNewPin =
			differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30;

		return isNewPin ? 'limegreen' : 'darkblue';
	};

	return (
		<div className={classes.root}>
			<ReactMapGL
				width="100vw"
				height="calc(100vh - 64px)"
				mapStyle={MAP_LIST[currMapIndex]}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}
				onViewportChange={(currViewport) => setViewport(currViewport)}
				onClick={(e) => onMapClickHandler(e)}
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
				{/* //= -------------------- Kenny Edition -------------------- */}

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
				{/* //= -------------------- Kenny Edition -------------------- */}

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

				{/* Draft Pin */}
				{state.draft && (
					<Marker
						latitude={state.draft.latitude}
						longitude={state.draft.longitude}
						offsetLeft={-19}
						offsetTop={-37}>
						<PinIcon size={40} color="hotpink" />
					</Marker>
				)}

				{/* Created Pins */}
				{state.pins.map((pin) => (
					<Marker
						key={pin._id}
						latitude={pin.latitude}
						longitude={pin.longitude}
						offsetLeft={-19}
						offsetTop={-37}>
						<PinIcon
							//onClick={() => handleSelectPin(pin)}
							size={40}
							color={highlightNewPin(pin)}
						/>
					</Marker>
				))}
			</ReactMapGL>

			{/* Blog Area to add Pin Content */}
			<Blog />
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
