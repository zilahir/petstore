import React, { ReactElement, useState } from 'react'
import Layout from '../../components/common/Layout'

import dogImage from '../../assets/images/pet.svg'
import styles from './Register.module.scss'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const Register = (): ReactElement => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [userName, setUserName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phone, setPhone] = useState('')
	return (
		<Layout hasHeader={false}>
			<div className={styles.rootContainer}>
				<div className={styles.loginContainer}>
					<h1>Sign Up</h1>
					<div className={styles.loginInner}>
						<Input
							label="Username"
							placeHolder="dolphin99"
							onChange={event => setUserName(event.target.value)}
							value={userName}
						/>
						<Input
							label="Email"
							placeHolder="demo@demo.fi"
							onChange={event => setEmail(event.target.value)}
							value={email}
						/>
						<div className={styles.group}>
							<Input
								label="Password"
								onChange={event => setPassword(event.target.value)}
								value={password}
							/>
							<Input
								label="Confirm Password"
								onChange={event => setPasswordConfirm(event.target.value)}
								value={passwordConfirm}
							/>
						</div>
						<div className={styles.group}>
							<Input
								label="Firstname"
								placeHolder="John"
								onChange={event => setFirstName(event.target.value)}
								value={firstName}
							/>
							<Input
								label="Lastname"
								placeHolder="Smith"
								onChange={event => setLastName(event.target.value)}
								value={lastName}
							/>
						</div>
						<Input
							label="Phone"
							placeHolder="0406678965"
							onChange={event => setPhone(event.target.value)}
							value={phone}
						/>
						<div className={styles.btnContainer}>
							<Button label="Sign up" onClick={() => alert('pressed')} />
						</div>
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
