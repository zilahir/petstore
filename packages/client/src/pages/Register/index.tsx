import React, { ReactElement, useState } from 'react'
import Layout from '../../components/common/Layout'

import dogImage from '../../assets/images/pet.svg'
import styles from './Register.module.scss'
import Input from '../../components/common/Input'

const Register = (): ReactElement => {
	const [userName, setUserName] = useState('')
	return (
		<Layout hasHeader={false}>
			<div className={styles.rootContainer}>
				<div className={styles.loginContainer}>
					<div className={styles.loginInner}>
						<Input
							label="Username"
							placeHolder="Username"
							onChange={event => setUserName(event.target.value)}
							value={userName}
						/>
					</div>
				</div>
				<div className={styles.graphicContainer}>
					<img src={dogImage} alt="pet" />
				</div>
			</div>
		</Layout>
	)
}

export default Register
