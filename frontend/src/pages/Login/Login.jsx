import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';

import { UserContext } from '../../utils/context/userContext';

import SportSeeLogo from '../../assets/icons/sportsee_logo.svg';

import './Login.css';

const Login = () => {
	const [toggle, setToggle] = useState(false);

	let datasOrigin = () => {
		!document.getElementById('switch').checked ? setToggle(false) : setToggle(true);
		localStorage.getItem('mockedDatas') === 'true'
			? localStorage.setItem('mockedDatas', false)
			: localStorage.setItem('mockedDatas', true);
		return toggle;
	};

	/**
	 * @param {string} userId
	 */
	const [userId, setUserId] = useContext(UserContext);
	const contextUserId = (id) => {
		setUserId(id);
		return userId;
	};

	return (
		<div className="login">
			<img src={SportSeeLogo} alt="logo_SportSee" className="logo__SportSee" />
			<div className="users">
				<Link
					key={
						'user18'
						// + mockedStatus
					}
					onClick={() => contextUserId(18)}
					to={`/user/18`}
				>
					<img
						src="https://doodleipsum.com/700/avatar?i=3cdf1e1375692dbe37689851492c2957"
						className="user__avatar"
						alt="Avatar by Gustavo Pedrosa"
					/>
					<h2>Cecilia</h2>
				</Link>
				<Link
					key={
						'user12'
						// + mockedStatus
					}
					to="/user/12"
					onClick={() => contextUserId(12)}
				>
					<img
						src="https://doodleipsum.com/700/avatar?i=aaae4ac68a7288537c3192c776e5afab"
						className="user__avatar"
						alt="Avatar by Gustavo Pedrosa"
					/>
					<h2>Karl</h2>
				</Link>
			</div>
			<div className="datas__origin">
				<input
					type="checkbox"
					id="switch"
					className="checkbox"
					defaultChecked={localStorage.getItem('mockedDatas') === 'true' ? true : false}
					onClick={() => datasOrigin()}
				/>
				<label htmlFor="switch" className="toggle"></label>
				<h3> API / Mocked Datas</h3>
			</div>
		</div>
	);
};

export default Login;
