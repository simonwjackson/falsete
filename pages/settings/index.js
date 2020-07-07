import React from 'react'
import LocalStorageInput from '../../components/LocalStorageInput'

const Settings = () => { 
  return <>
    <LocalStorageInput name='host' />
    <LocalStorageInput name='user' />
    <LocalStorageInput name='pass' type="password" />
  </>
}

export default Settings

