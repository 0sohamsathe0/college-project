import React, { useEffect } from 'react'

const AcceptReject = () => {
    
    const requestQueue = async()=>{
        const response = await fetch("http://localhost:3500/admin/reqest-queue");
        const data = await response.json()

    }

    useEffect(()=>{

    },[])

  return (
    <div>
      
    </div>
  )
}

export default AcceptReject
