import React, { ReactElement, useState } from 'react'
import Input from '../../components/common/Input'
import Layout from '../../components/common/Layout'

import doggy from '../../assets/images/doggy.svg'
import styles from '../Register/Register.module.scss'

const Login = (): ReactElement => {
	const [username, setUsername] = useState<string>('')
	const [passwod, setPassword] = useState<string>('')
	return (
		<Layout hasHeader={false}>
			<div className={styles.rootContainer}>
				<div className={styles.loginContainer}>
					<h1>Sign in</h1>
					<div className={styles.loginInner}>
						<div className={styles.group}>
							<form>
								<Input
									value={username}
									label="Usename"
									onChange={event => setUsername(event.target.value)}
								/>
								<Input
									value={passwod}
									onChange={event => setPassword(event.target.value)}
									label="Passwordd"
									type="password"
								/>
								<div className={styles.btnContainer}>
									<input className={styles.submitBtn} type="submit" />
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className={styles.graphicContainer}>
					<img src={doggy} alt="pet" />
				</div>
			</div>
		</Layout>
	)
}

export default Login
