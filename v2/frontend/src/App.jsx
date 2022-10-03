import { Route, Routes } from 'react-router';

import { UserProvider } from './utils/context/userContext';

import Login from './pages/Login/Login';

import Home from './pages/Home/Home';
import Error from './components/Error/Error';

import './utils/styles/App.css';
import React from 'react';

/**
 * Return a div that will contains the Login / Home / Error components
 * @returns {React.ReactElement}
 */

function App() {
	return (
		<UserProvider>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/user/:id/" element={<Home />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</UserProvider>
	);
}

export default App;
