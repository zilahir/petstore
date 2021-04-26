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
	variant?: 'danger' | 'normal'
}

const defaultProps = {
	className: '',
	disabled: false,
	onClick: undefined,
	icon: null,
	type: 'button',
	variant: 'normal',
}

const Button = ({
	label,
	disabled,
	onClick,
	className,
	type,
	icon,
	variant,
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
			className={variant && styles[variant]}
		>
			{icon && <div className={styles.iconContainer}>{icon}</div>}
			{label}
		</motion.button>
	</div>
)

Button.defaultProps = defaultProps

export default Button
