import React, { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import WarningIcon from '@material-ui/icons/Warning'

import { AnimatePresence } from 'framer-motion'
import Layout from '../../components/common/Layout'
import dogImage from '../../assets/images/pet.svg'
import styles from './Register.module.scss'
import Input from '../../components/common/Input'
import { post } from '../../api/cloudFunctions'
import { apiEndPoints } from '../../api/apiEndpoints'

interface RegError {
	msg: string
}

const schema = yup.object().shape({
	userName: yup.string().required().min(5),
	firstName: yup.string().required().min(2),
	lastName: yup.string().required().min(2),
	password: yup.string().required().min(6),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
	phone: yup.string().required().min(6),
	email: yup.string().email().required(),
})

const Register = (): ReactElement => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [userName, setUserName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phone, setPhone] = useState('')
	const [isRegSuccess, toggleIsRegSuccess] = useState(false)
	const [requestErrors, setRequestErrors] = useState([])

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit = (data: any): any =>
		post({
			url: apiEndPoints.registerNewUser,
			data: {
				...data,
			},
		})
			.then(() => {
				toggleIsRegSuccess(true)
			})
			.catch((error: any) => {
				setRequestErrors(error.errors)
			})

	return (
		<Layout hasHeader={false}>
			<div className={styles.rootContainer}>
				<AnimatePresence>
					{!isRegSuccess && (
						<div className={styles.loginContainer}>
							<AnimatePresence>
								{requestErrors.length > 0 && (
									<div className={styles.errorContainer}>
										{requestErrors.map((error: RegError) => (
											<div className={styles.oneError}>
												<WarningIcon htmlColor="#ffffff" />
												<p>{error.msg}</p>
											</div>
										))}
									</div>
								)}
							</AnimatePresence>
							<h1>Sign Up</h1>
							<div className={styles.loginInner}>
								<form onSubmit={handleSubmit(onSubmit)}>
									<Input
										label="Username"
										id="userName"
										placeHolder="dolphin99"
										onChange={event => setUserName(event.target.value)}
										value={userName}
										register={register}
										required
										error={errors && errors.userName && errors.userName.message}
									/>
									<Input
										label="Email"
										placeHolder="demo@demo.fi"
										onChange={event => setEmail(event.target.value)}
										value={email}
										id="email"
										register={register}
										required
										error={errors && errors.email && errors.email.message}
									/>
									<div className={styles.group}>
										<Input
											label="Password"
											onChange={event => setPassword(event.target.value)}
											value={password}
											register={register}
											required
											id="password"
											error={
												errors && errors.password && errors.password.message
											}
										/>
										<Input
											label="Confirm Password"
											onChange={event => setPasswordConfirm(event.target.value)}
											value={passwordConfirm}
											register={register}
											required
											id="passwordConfirm"
											error={
												errors &&
												errors.passwordConfirm &&
												errors.passwordConfirm.message
											}
										/>
									</div>
									<div className={styles.group}>
										<Input
											label="Firstname"
											placeHolder="John"
											onChange={event => setFirstName(event.target.value)}
											value={firstName}
											register={register}
											required
											id="firstName"
											error={
												errors && errors.firstName && errors.firstName.message
											}
										/>
										<Input
											label="Lastname"
											placeHolder="Smith"
											onChange={event => setLastName(event.target.value)}
											value={lastName}
											register={register}
											required
											id="lastName"
											error={
												errors && errors.lastName && errors.lastName.message
											}
										/>
									</div>
									<Input
										label="Phone"
										placeHolder="0406678965"
										onChange={event => setPhone(event.target.value)}
										value={phone}
										register={register}
										required
										id="phone"
										error={errors && errors.phone && errors.phone.message}
									/>
									<div className={styles.btnContainer}>
										<input className={styles.submitBtn} type="submit" />
									</div>
								</form>
							</div>
						</div>
					)}
				</AnimatePresence>
				<div className={styles.graphicContainer}>
					<img src={dogImage} alt="pet" />
				</div>
			</div>
		</Layout>
	)
}

export default Register
