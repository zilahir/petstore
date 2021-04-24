import React, { ReactElement } from 'react'

import styles from './Ribbon.module.scss'

interface IRibbon {
	label: string
}

const Ribbon = ({ label }: IRibbon): ReactElement => (
	<div className={styles.ribbonContainer}>
		<span>{label}</span>
	</div>
)

export default Ribbon
