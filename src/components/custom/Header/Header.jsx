import React, { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import { Link, useNavigate, } from 'react-router-dom'
import Logo from '../../../assets/Logo2.jpeg'
import { FcGoogle } from "react-icons/fc"
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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'



const Header = () => {

  const [dialog, setDialog] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  
  const navigate = useNavigate()
     
  const login = useGoogleLogin({
          onSuccess: (codeResponse) => getProfileData(codeResponse),
  
          onError: (error) => {
              console.log('Login Failed:', error);
          }
      })
  
   const getProfileData = async (tokenInfo) => {

    
          await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
              {
                  headers: {
                      Authorization: `Bearer ${tokenInfo?.access_token}`,
                      Accept: 'application/json',
                  }
              }
          ).then((res) => {
              console.log(res)
              localStorage.setItem('user', JSON.stringify(res?.data))
              setDialog(false)
              toast.success("SignUp Success")
              
          }
          )
      }


  useEffect(() => {
   
    console.log(user)
  })

  return (
    <div>
      <div className='px-3 flex justify-between items-center '>

      <Link to={'/'}>
        <div className='hero text-3xl font-extrabold m-4 '>
         <h2><span className='text-orange-400'>TRIP</span> PLANNER</h2>

        </div>
      </Link>
      <div>
        {
          user ?
            <div className='flex items-center gap-2'>
              <Link to={'/create-trip'}>
              <Button className='header-card flex items-center font-bold tracking-wider  hover:bg-orange-400 transition-all  hover:scale-105'><span className='text-2xl'>+</span> Create Trips</Button>
              </Link>
              <Link to={'/mytrips'}>
              <Button variant={"outline"} className='header-card font-bold border-none  hover:bg-orange-400 transition-all hover:text-white  hover:scale-105'>My Trips</Button>
              </Link>
              <Popover>
                <PopoverTrigger className=''>
                  <img src={user?.picture} alt="" referrerPolicy="no-referrer" className='h-[45px] w-[45px] rounded-full' />
                </PopoverTrigger>
                <PopoverContent className='flex items-center h-[50px] w-[100px] font-bold hover:bg-orange-400 border-none hover:text-white mr-3 hover:scale-105 header-card transition-all'><div
                  onClick={() => {
                    googleLogout()
                    localStorage.clear()
                    navigate('/')
                  }}
                  className='cursor-pointer'
                >Logout</div></PopoverContent>
              </Popover>


            </div> : <Button onClick={()=>{
              setDialog(true)
            }}>Sign Up</Button>

        }


      </div>
             
      </div>
       <Dialog open={dialog} onOpenChange={setDialog}>

                <DialogContent >
                    <DialogHeader>

                        <DialogDescription>
                            <div className='hero text-3xl font-extrabold'>
                                <h2 className='text-black'><span className='text-orange-400'>TRIP</span> PLANNER</h2>
                                </div>
                          
                            <h2 className="font-bold text-2xl mt-2">Sign In with Google</h2>
                            <p>Sign in to the App with Google authentication securely</p>
                            
                            <Button
                                onClick={login}
                                className="w-full mt-5 flex gap-4 items-center">
                                <FcGoogle />
                                Sign In with Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
      <ToastContainer/>
    </div>
  )
}

export default Header
