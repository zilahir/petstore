import React, { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import WarningIcon from '@material-ui/icons/Warning'

import { AnimatePresence } from 'framer-motion'
import Input from '../../components/common/Input'
import Layout from '../../components/common/Layout'
import doggy from '../../assets/images/doggy.svg'
import styles from '../Register/Register.module.scss'
import { post } from '../../api/cloudFunctions'
import { apiEndPoints } from '../../api/apiEndpoints'
import { AuthError } from '../../types/types'

const Login = (): ReactElement => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [requestErrors, setRequestErrors] = useState([])

	interface ILogin {
		username: string
		password: string
	}

	const schema = yup.object().shape({
		username: yup.string().required().min(5),
		password: yup.string().required(),
	})

	const { register, handleSubmit } = useForm<ILogin>({
		resolver: yupResolver(schema),
	})

	const onSubmit = (): void =>
		post({
			url: apiEndPoints.loginUser,
			data: {
				username,
				password,
			},
		})
			.then((result: any) => {
				console.debug('result', result)
				// TODO log the user in
			})
			.catch((error: any) => {
				setRequestErrors(error.errors)
			})

	return (
		<Layout hasHeader={false}>
			<div className={styles.rootContainer}>
				<div className={styles.loginContainer}>
					<AnimatePresence>
						{requestErrors.length > 0 && (
							<div className={styles.errorContainer}>
								{requestErrors.map((error: AuthError) => (
									<div className={styles.oneError}>
										<WarningIcon htmlColor="#ffffff" />
										<p>{error.msg}</p>
									</div>
								))}
							</div>
						)}
					</AnimatePresence>
					<h1>Sign in</h1>
					<div className={styles.loginInner}>
						<div className={styles.group}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Input
									value={username}
									label="Usename"
									onChange={event => setUsername(event.target.value)}
									required
									id="username"
									register={register}
								/>
								<Input
									value={password}
									onChange={event => setPassword(event.target.value)}
									label="Passwordd"
									type="password"
									id="password"
									register={register}
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
