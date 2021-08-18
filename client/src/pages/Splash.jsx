import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import bgp from '../bgp.png';
import Login from '../components/Auth/Login';
import Context from '../context';

const Splash = () => {
	const { state } = useContext(Context);

	return state.isAuth ? (
		<Redirect to="/" />
	) : (
		<div style={{ backgroundImage: `url(${bgp})`,  backgroundSize: 'cover' }}>
			<Login />
		</div>
	);
};

export default Splash;
