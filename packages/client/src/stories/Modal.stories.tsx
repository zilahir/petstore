import React, { useState } from 'react'

import { Meta } from '@storybook/react'
import Modal from '../components/common/Modal'
import Button from '../components/common/Button'

export default {
	title: 'Modal',
	component: Modal,
} as Meta

export const ModalExample = () => {
	const [isModalOpen, toggleModalOpen] = useState(false)
	return (
		<>
			<div
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Button label="hit me 🎯" onClick={() => toggleModalOpen(true)} />
			</div>
			<Modal onClose={() => toggleModalOpen(false)} isVisible={isModalOpen}>
				<div
					style={{
						padding: 50,
						color: '#ffffff',
					}}
				>
					YO! I am a modal!
				</div>
			</Modal>
		</>
	)
}
