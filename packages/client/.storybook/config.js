import { configure, addDecorator } from "@storybook/react"

import notificationDecorator from './decorator'

addDecorator(notificationDecorator);