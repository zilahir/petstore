import React, { ReactElement } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import styles from './NavLink.module.scss'

interface INavLink {
	label: string
	isActive: boolean
	target: string
}

const NavLink = ({ label, isActive, target }: INavLink): ReactElement => (
	<Link
		to={target}
		className={classnames(styles.navItem, isActive ? styles.active : '')}
	>
		{label}
	</Link>
)

export default NavLink
