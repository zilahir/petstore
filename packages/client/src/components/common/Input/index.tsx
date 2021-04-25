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
}

const defaultProps = {
	className: '',
	placeHolder: '',
	type: 'text',
	ref: null,
}

const Input = ({
	label,
	onChange,
	className,
	placeHolder,
	type,
	ref,
	value,
}: IInput): ReactElement => (
	<div className={styles.inputContainer}>
		<label>
			{label}
			<input
				value={value}
				ref={ref}
				className={classnames(styles.input, className)}
				onChange={onChange}
				placeholder={placeHolder}
				type={type}
			/>
		</label>
	</div>
)

Input.defaultProps = defaultProps

export default Input
