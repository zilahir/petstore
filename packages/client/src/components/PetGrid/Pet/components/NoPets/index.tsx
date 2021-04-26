import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import styles from './NoPets.module.scss'

const NoPets = (): ReactElement => (
	<div className={styles.noPetsConainer}>
		<div className={styles.innerContainer}>
			<h1>This store is empty 😭</h1>
			<div className={styles.actionContainer}>
				<p>
					Go ahead, <Link to="/register">create an account</Link>, or{' '}
					<Link to="/login">Login</Link>, to get started! 🐶
				</p>
			</div>
		</div>
	</div>
)

export default NoPets
