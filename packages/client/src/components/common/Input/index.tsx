import React, { ReactElement } from 'react'
import classnames from 'classnames'

import styles from './Input.module.scss'

interface IInput {
	label: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	className?: string
	placeHolder?: string
	type?: string
	ref?: React.RefObject<any>
	value: string
	register?: any
	required?: boolean
	error?: string
	id?: string
}

const defaultProps = {
	className: '',
	placeHolder: '',
	type: 'text',
	ref: null,
	register: null,
	required: false,
	error: null,
	id: '',
}

const Input = ({
	label,
	onChange,
	className,
	placeHolder,
	type,
	ref,
	value,
	register,
	required,
	error,
	id,
}: IInput): ReactElement => (
	<div className={classnames(styles.inputContainer, error ? styles.error : '')}>
		<label>
			{label}
			{error && <span className={styles.error}>{error}</span>}
			{register ? (
				<input
					{...register(id, { required })}
					value={value}
					ref={ref}
					className={classnames(styles.input, className)}
					onChange={onChange}
					placeholder={placeHolder}
					type={type}
					required={required}
				/>
			) : (
				<input
					value={value}
					ref={ref}
					className={classnames(styles.input, className)}
					onChange={onChange}
					placeholder={placeHolder}
					type={type}
					required={required}
				/>
			)}
		</label>
	</div>
)

Input.defaultProps = defaultProps

export default Input
