import React, { useEffect } from 'react'

const Alert = ({type,msg,removeAlert,people}) => {
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      removeAlert()
    },3000)
    return () => clearTimeout(timeout)
  },[people,removeAlert])
  return (
    <p className={`alert alert-${type}`}>
      {msg}
    </p>
  );
}

export default Alert
