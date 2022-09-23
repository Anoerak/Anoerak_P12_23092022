import React from 'react';
import { Link } from 'react-router-dom';

import yogaImg from '../../assets/icons/yoga.svg';
import swimmingImg from '../../assets/icons/swimming.svg';
import weightImg from '../../assets/icons/weight.svg';
import cyclingImg from '../../assets/icons/cycling.svg';

import './VerticalMenu.css';

const VerticalMenu = () => {
	return (
		<div className="vertical__menu">
			<div className="icons">
				<Link to="/yoga">
					<button className="yoga__button">
						<img src={yogaImg} alt="icon_yoga" />{' '}
					</button>
				</Link>
				<Link to="/swimming">
					<button className="swimming__button">
						<img src={swimmingImg} alt="icon_swimming" />{' '}
					</button>
				</Link>
				<Link to="/cycling">
					<button className="cycling__button">
						<img src={weightImg} alt="icon_weight" />{' '}
					</button>
				</Link>
				<Link to="/weight">
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
