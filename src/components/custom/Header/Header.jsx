import React, { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc"
import { HiMenuAlt3 } from "react-icons/hi"
import { IoClose } from "react-icons/io5"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const Header = () => {
  const [dialog, setDialog] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => getProfileData(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  })

  const getProfileData = async (tokenInfo) => {
    try {
      const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json',
        },
      })
      localStorage.setItem('user', JSON.stringify(res?.data))
      setDialog(false)
      toast.success("SignUp Success")
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(user)
  }, [])

  const mobileMenu = (
    <div className='absolute top-16 right-4 bg-white shadow-xl border p-4 flex flex-col items-center gap-3 md:hidden z-50 rounded-lg'>
      {user ? (
        <>
          <img src={user?.picture} alt="profile" className='h-[45px] w-[45px] rounded-full' />
          <h2 className='font-bold'>{user?.name}</h2>
          <Link to={'/create-trip'}>
            <Button className='w-full' onClick={() => setMenuOpen(false)}>Create Trips</Button>
          </Link>
          <Link to={'/mytrips'}>
            <Button variant="outline" className='w-full' onClick={() => setMenuOpen(false)}>My Trips</Button>
          </Link>
          <Button
            variant="outline"
            className='w-full'
            onClick={() => {
              googleLogout()
              localStorage.clear()
              setMenuOpen(false)
              navigate('/')
            }}>
            Logout
          </Button>
        </>
      ) : (
        <Button onClick={() => {
          setDialog(true)
          setMenuOpen(false)
        }} className='w-full'>Sign Up</Button>
      )}
    </div>
  )

  return (
    <div>
      <div className='px-3 flex justify-between items-center ml-2 mr-2 mt-3'>
        <Link to={'/'}>
          <div className='hero text-xl md:text-3xl font-extrabold md:m-3'>
            <h2><span className='text-orange-400'>TRIP</span> PLANNER</h2>
          </div>
        </Link>

        <div className='md:hidden'>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IoClose size={30} /> : <HiMenuAlt3 size={30} />}
          </button>
          {menuOpen && mobileMenu}
        </div>

        <div className='hidden md:flex items-center gap-3'>
          {user ? (
            <>
              <Link to={'/create-trip'}>
                <Button className='header-card hover:bg-orange-400 hover:scale-105 transition-all'>
                  <span className='text-2xl'>+</span> Create Trips
                </Button>
              </Link>
              <Link to={'/mytrips'}>
                <Button variant="outline" className='header-card hover:bg-orange-400 hover:scale-105 transition-all'>My Trips</Button>
              </Link>
              <Popover>
                <PopoverTrigger>
                  <img src={user?.picture} alt="profile" className='h-[45px] w-[45px] rounded-full' />
                  
                </PopoverTrigger>
                <PopoverContent>
                  <div
                    onClick={() => {
                      googleLogout()
                      localStorage.clear()
                      navigate('/')
                    }}
                    className='cursor-pointer font-bold text-center'>
                    Logout
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button onClick={() => setDialog(true)} className='hover:bg-orange-400 hover:scale-105 transition-all'>Sign Up</Button>
          )}
        </div>
      </div>

      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className='hero text-2xl md:text-3xl font-extrabold'>
                <h2 className='text-black'><span className='text-orange-400'>TRIP</span> PLANNER</h2>
              </div>
              <h2 className="font-semibold text-xl md:text-2xl mt-2">Sign In with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </div>
  )
}

export default Header
