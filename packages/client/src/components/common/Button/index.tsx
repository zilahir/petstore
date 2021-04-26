import React, { ReactElement, ReactNode } from 'react'
import classnames from 'classnames'

import { motion } from 'framer-motion'
import styles from './Button.module.scss'

interface IButton {
	label: string
	disabled?: boolean
	className?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	type?: 'button' | 'submit'
	icon?: ReactNode | ReactNode[]
}

const defaultProps = {
	className: '',
	disabled: false,
	onClick: undefined,
	icon: null,
	type: 'button',
}

const Button = ({
	label,
	disabled,
	onClick,
	className,
	type,
	icon,
}: IButton): ReactElement => (
	<div
		className={classnames(
			styles.buttonContainer,
			icon && styles.hasIcon,
			className,
		)}
	>
		<motion.button
			whileHover={{ scale: 1.05 }}
			type={type}
			onClick={onClick && onClick}
			disabled={disabled}
		>
			{icon && <div className={styles.iconContainer}>{icon}</div>}
			{label}
		</motion.button>
	</div>
)

Button.defaultProps = defaultProps

export default Button
