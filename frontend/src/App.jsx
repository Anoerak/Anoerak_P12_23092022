import { Route, Routes } from 'react-router';

import { UserProvider } from './utils/context/userContext';

import Login from './components/Login/Login';

import Home from './pages/Home/Home';

import './utils/styles/App.css';

function App() {
	return (
		<UserProvider>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/user/:id/" element={<Home />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</UserProvider>
	);
}

export default App;
