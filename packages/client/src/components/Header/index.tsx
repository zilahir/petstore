import React, { ReactElement } from 'react'

import styles from './Header.module.scss'

const Header = (): ReactElement => (
	<header className={styles.headerRoot}>
		<div className={styles.logo}>
			<p role="img" aria-label="dog">
				🐶
				<span>PetStore</span>
			</p>
		</div>
	</header>
)

export default Header
