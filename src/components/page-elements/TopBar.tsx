import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/FormElements/Button';
import Dropdown from '../../shared/components/UIElements/Dropdown';

import classes from './TopBar.module.css';

const TopBar: React.FC = (props: {}) => {
	const auth = useContext(AuthContext);
	const location = useLocation();

	return (
		<div className={classes['top-bar']}>
			<div className={classes['container']}>
				<ul className={classes['top-bar__items']}>
					<li className={classes['top-bar__item']}>
						{!auth.isLoggedIn && (
							<Link
								to={`/login`}
								state={{ from: location, replace: true }}>
								Account Login
							</Link>
						)}
						{auth.isLoggedIn && (
							<Dropdown user={auth.firstName!}>
								<Link to={'/user/profile'}>Profile</Link>
								<Link to={'/user/change-password'}>
									Change password
								</Link>
								<Button
									override={classes['button--default']}
									size='small'
									type='button'
									onClick={auth.logout}>
									LOGOUT
								</Button>
							</Dropdown>
						)}
					</li>
					<li className={classes['top-bar__item']}>
						<a href='#'>Company</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default TopBar;
