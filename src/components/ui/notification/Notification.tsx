import React, { FC, PropsWithChildren } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export const notifyError = (text: string) => toast(text, {
  position: 'bottom-right',
  icon: '⛔',
  style: {backgroundColor: '#E32636', color: '#fff', fontWeight: 700}
});

export const notifySuccess = (text: string) => toast(text, {
  position: 'bottom-right',
  icon: '✅',
  style: {backgroundColor: '#0baf21', color: '#fff', fontWeight: 700}
});

const Notification:FC<PropsWithChildren<unknown>> = ({children}) => {
  return (
    <>
      {children}
      <Toaster/>
    </>
  )
}

export default Notification

