import React from 'react'
import { ToastProvider } from 'react-toast-notifications'

const NotificationDecorator = storyFn => (
  <ToastProvider autoDismiss placement="bottom-right">
    {storyFn()}
  </ToastProvider>
)

export default NotificationDecorator