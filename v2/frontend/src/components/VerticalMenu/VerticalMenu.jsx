import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../utils/context/userContext';

import yogaImg from '../../assets/icons/yoga.svg';
import swimmingImg from '../../assets/icons/swimming.svg';
import weightImg from '../../assets/icons/weight.svg';
import cyclingImg from '../../assets/icons/cycling.svg';

import './VerticalMenu.css';

/**
 * Display the VerticalMenu component
 * @returns {React.Component} VerticalMenu component
 */
const VerticalMenu = () => {
	const [user] = useContext(UserContext);

	return (
		<div className="vertical__menu">
			<div className="icons">
				<Link to={`/user/${user}/yoga`}>
					<button className="yoga__button">
						<img src={yogaImg} alt="icon_yoga" />{' '}
					</button>
				</Link>
				<Link to={`/user/${user}/swimming`}>
					<button className="swimming__button">
						<img src={swimmingImg} alt="icon_swimming" />{' '}
					</button>
				</Link>
				<Link to={`/user/${user}/cycling`}>
					<button className="cycling__button">
						<img src={weightImg} alt="icon_weight" />{' '}
					</button>
				</Link>
				<Link to={`/user/${user}/weight`}>
					<button className="weight__button">
						<img src={cyclingImg} alt="icon_cycling" />{' '}
					</button>
				</Link>
			</div>
			<div className="vertical__menu__footer">
				<p>Copyright, SportSee 2020</p>
			</div>
		</div>
	);
};

export default VerticalMenu;
