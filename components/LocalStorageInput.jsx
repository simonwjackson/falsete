import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export default ({ name, ...props }) => {
  const [val, setVal] = useLocalStorage(name)
  const onChange = e => setVal(e.target.value)

  return <input
    placeholder={name}
    {...props}
    value={val}
    onChange={onChange}
  />
}
