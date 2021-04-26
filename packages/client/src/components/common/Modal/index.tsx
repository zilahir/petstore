/* eslint-disable jsx-a11y/control-has-associated-label */
import { motion } from 'framer-motion'
import React, { ReactElement, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import genericAnimaion from '../../../utils/animations'

import styles from './Modal.module.scss'

interface IModal {
	children: ReactNode | ReactNode[]
	onClose: () => void
	isVisible: boolean
}

const Modal = ({ children, onClose, isVisible }: IModal): ReactElement => {
	const portal = document.querySelector('#root')
	return (
		<>
			{isVisible &&
				portal &&
				ReactDOM.createPortal(
					<>
						<div
							tabIndex={-1}
							onKeyDown={undefined}
							role="button"
							className={styles.overlay}
							onClick={onClose}
						/>
						<motion.div
							animate={isVisible ? 'visible' : 'hidden'}
							exit="exit"
							variants={genericAnimaion}
							initial="hidden"
						>
							<div className={styles.wrapper}>{children}</div>
						</motion.div>
					</>,
					portal,
				)}
		</>
	)
}

export default Modal
