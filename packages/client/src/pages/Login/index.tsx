import React, { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import WarningIcon from '@material-ui/icons/Warning'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { AnimatePresence, motion } from 'framer-motion'
import Input from '../../components/common/Input'
import Layout from '../../components/common/Layout'
import doggy from '../../assets/images/doggy.svg'
import styles from '../Register/Register.module.scss'
import { post } from '../../api/cloudFunctions'
import { apiEndPoints } from '../../api/apiEndpoints'
import { AuthError } from '../../types/types'
import genericAnimaion, { loadingVariants } from '../../utils/animations'
import Spinner from '../../components/common/Spinner'
import { IUSer } from '../../store/configureStore'
import { authUser } from '../../store/actions/user'

const Login = (): ReactElement => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLoading, toggleLoading] = useState<boolean>(false)
	const [requestErrors, setRequestErrors] = useState([])
	const dispatch = useDispatch()
	const history = useHistory()

	interface ILogin {
		username: string
		password: string
	}

	const schema = yup.object().shape({
		username: yup.string().required().min(1),
		password: yup.string().required(),
	})

	const { register, handleSubmit } = useForm<ILogin>({
		resolver: yupResolver(schema),
	})

	function onSubmit(): void {
		toggleLoading(true)
		setRequestErrors([])
		post({
			url: apiEndPoints.loginUser,
			data: {
				username,
				password,
			},
		})
			.then((result: IUSer) => {
				dispatch(authUser(result))
				history.push('/dashboard')
			})
			.catch((error: any) => {
				setRequestErrors(error.errors)
			})
			.finally(() => {
				toggleLoading(false)
			})
	}

	return (
		<Layout hasHeader={false}>
			<div className={styles.rootContainer}>
				<div className={styles.loginContainer}>
					<AnimatePresence>
						{requestErrors.length > 0 && (
							<motion.div
								className={styles.errorContainer}
								variants={genericAnimaion}
								animate="visible"
								exit="exit"
								initial="hidden"
							>
								{requestErrors.map((error: AuthError) => (
									<div className={styles.oneError}>
										<WarningIcon htmlColor="#ffffff" />
										<p>{error.msg}</p>
									</div>
								))}
							</motion.div>
						)}
					</AnimatePresence>
					<h1>Sign in</h1>
					<motion.div
						className={styles.loginInner}
						variants={loadingVariants}
						animate={isLoading ? 'isLoading' : 'notLoading'}
						initial={false}
					>
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
					</motion.div>
					<AnimatePresence>
						{isLoading && (
							<motion.div
								layout
								className={styles.loadingContainer}
								variants={loadingVariants}
								animate="notLoading"
								initial={false}
								transition={{
									delay: 0.5,
								}}
							>
								<Spinner />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
				<div className={styles.graphicContainer}>
					<img src={doggy} alt="pet" />
				</div>
			</div>
		</Layout>
	)
}

export default Login
