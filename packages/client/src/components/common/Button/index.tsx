import React, { ReactElement } from 'react'
import classnames from 'classnames'

import { motion } from 'framer-motion'
import styles from './Button.module.scss'

interface IButton {
	label: string
	disabled?: boolean
	className?: string
	onClick: React.MouseEventHandler<HTMLButtonElement>
	type: 'button' | 'submit'
}

const defaultProps = {
	className: '',
	disabled: false,
}

const Button = ({
	label,
	disabled,
	onClick,
	className,
	type,
}: IButton): ReactElement => (
	<div className={classnames(styles.buttonContainer, className)}>
		<motion.button
			whileHover={{ scale: 1.05 }}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</motion.button>
	</div>
)

Button.defaultProps = defaultProps

export default Button
