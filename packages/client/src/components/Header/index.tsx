import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import NavLink from './components/NavLink'
import styles from './Header.module.scss'

const Header = (): ReactElement => (
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
				<NavLink isActive={false} target="/login" label="Login" />
				<NavLink isActive={false} target="/register" label="Register" />
			</nav>
		</div>
	</header>
)

export default Header
