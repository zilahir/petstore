import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TopLevelState } from '../../store/configureStore'

import NavLink from './components/NavLink'
import styles from './Header.module.scss'

const Header = (): ReactElement => {
	const { user } = useSelector((store: TopLevelState) => store)
	return (
		<header className={styles.headerRoot}>
			<div className={styles.logo}>
				<Link to="/">
					<h1 role="img" aria-label="dog">
						🐶
						<span>PetStore</span>
					</h1>
				</Link>
			</div>
			<div className={styles.navContainer}>
				<nav>
					{!user.token ? (
						<>
							<NavLink isActive={false} target="/login" label="Login" />
							<NavLink isActive={false} target="/register" label="Register" />
						</>
					) : (
						<>
							<NavLink isActive={false} target="/dashboard" label="dashboard" />
							<NavLink isActive={false} target="/logout" label="logout" />
						</>
					)}
				</nav>
			</div>
		</header>
	)
}

export default Header
