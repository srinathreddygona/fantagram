import React from 'react'
import {Outlet,Navigate} from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated=false;
  return (
   <>
   {isAuthenticated ?(
    <Navigate to='/'/>
   ):(
    <>
    <section className="flex flex-1 justify-center items-center flex-col">
      <Outlet/>
    </section>
    <img
    src="/assets/images/tilted_social_posts.svg"
    alt="logo"
    className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
    />
    </>

   )}
   </>
  )
}

export default AuthLayout
