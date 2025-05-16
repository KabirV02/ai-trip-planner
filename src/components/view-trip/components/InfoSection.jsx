import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { IoIosSend } from "react-icons/io"
import { BASE_PHOTO_URL, GetPlaceDetails } from './GlobalAPI'
import { Link } from 'react-router-dom'

// Note: We'll construct the full image URL dynamically
//const BASE_PHOTO_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("")
  
  const GetPhotos = async () => {
    const textQuery = trip?.userSelection?.location?.label?.trim()

    if (!textQuery) {
      console.warn("🚫 No location label found. Skipping API call.")
      return
    }

    try {
      const response = await GetPlaceDetails({ textQuery })
      const place = response?.data?.places?.[0]

      if (!place || !place.photos?.length) {
        console.warn("🚫 No photos found for place.")
        return
      }

      // Use the first photo for reliability
      const photoName = place.photos[3].name
      const fullPhotoUrl = BASE_PHOTO_URL.replace('{NAME}', photoName)
      

      setPhotoUrl(fullPhotoUrl)
    } catch (error) {
      console.error("❌ Google API error:", error?.response?.data || error.message)
    }
  }

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPhotos()
    }
  }, [trip])
      
    
    return (
        <div>
            <img src={photoUrl} className='h-[340px] w-[950px] object-cover rounded-lg'  referrerPolicy="no-referrer" alt="" />
            <div className='flex flex-col md:flex-row  md:justify-between items-center p-2'>
                <div className='my-3 w-full flex flex-col  gap-2'>
                    <h2 className='font-bold text-xl md:text-3xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full md:text-lg text-gray-500'>🗓️ {trip?.userSelection?.noOfDays} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full md:text-lg text-gray-500'>💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='md:p-1 px-3 bg-gray-200 rounded-full md:text-lg text-gray-500'>🍷 No of Travelers: {trip?.userSelection?.traveler} </h2>
                    </div>


                </div>
                        <div >
                            <Link to={'https://www.google.com/maps/search/?api=1&query='+trip?.tripData?.travelPlan?.location } target='_blank'>
                            <Button className='h-12 w-40 md:w-12  text-2xl hover:bg-orange-400 hover:scale-105 transition-all'><IoIosSend/></Button>
                            </Link>
                        </div>
            </div>

        </div>
    )
}

export default InfoSection