import React, { ReactElement } from 'react'

import styles from './Header.module.scss'

const Header = (): ReactElement => (
	<header className={styles.headerRoot}>
		<div className={styles.logo}>
			<h1 role="img" aria-label="dog">
				🐶
				<span>PetStore</span>
			</h1>
		</div>
	</header>
)

export default Header
