import React, { useEffect } from 'react'

const Drives = () => {

  const loginType = localStorage.getItem("loginType");
  const host = "http://localhost:5000";
  const url = (loginType==="student")? "/api/student/scheduledDrives" : "/api/company/viewScheduledDrives";

  let drives;

  const getDrives = async ()=>{
    const response = await fetch(`${host}${url}`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem("token")
      }
    });
    const json = await response.json();
    console.log(json);
                          //CONTINUE
  }

  const showDrives = ()=>{

  }

  useEffect(()=>{
    getDrives()
  }, []);

  return (
    <>
    <div className='displayContainer'>

    </div>
    </>
  )
}

export default Drives