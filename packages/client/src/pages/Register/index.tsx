import React, { ReactElement } from 'react'
import Layout from '../../components/common/Layout'

import dogImage from '../../assets/images/pet.svg'
import styles from './Register.module.scss'

const Register = (): ReactElement => (
	<Layout hasHeader={false}>
		<div className={styles.rootContainer}>
			<div className={styles.loginContaine}>
				<div className={styles.loginInner}>
					<input type="text" placeholder="hello" />
				</div>
			</div>
			<div className={styles.graphicContainer}>
				<img src={dogImage} alt="pet" />
			</div>
		</div>
	</Layout>
)

export default Register
