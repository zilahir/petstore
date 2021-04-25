import React, { useState } from 'react'
import { Meta } from '@storybook/react'

import CustomInput from '../components/common/Input'

export default {
	title: 'Input',
	componen: CustomInput,
} as Meta

export const Input = () => {
	const [value, setValue] = useState<any>({})

	function handleInputValueChange(key: string, newValue: string) {
		setValue({
			...value,
			[key]: newValue,
		})
	}
	return (
		<div
			style={{
				maxWidth: 900,
				margin: '0 auto',
			}}
		>
			{Array.from(new Array(10)).map((_, index) => (
				<CustomInput
					label={`demo input ${index + 1}`}
					placeHolder="Type someting here"
					onChange={event =>
						handleInputValueChange(
							`input-${index.toString()}`,
							event.target.value,
						)
					}
					value={value[`input-${index.toString()}`]}
				/>
			))}
		</div>
	)
}
