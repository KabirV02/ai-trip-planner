import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { BASE_PHOTO_URL, GetPlaceDetails } from './GlobalAPI';
import viewbg from '@/assets/viewTripBg.png'

const PlacesInfo = ({plans}) => {

     const [photoUrl, setPhotoUrl] = useState("")
      
    const GetPhotos = async () => {
      const textQuery = plans?.placeName
  
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
        const photoName = place.photos[0].name
        const fullPhotoUrl = BASE_PHOTO_URL.replace('{NAME}', photoName)
        console.log("✅ Google Photo URL:", fullPhotoUrl)
  
        setPhotoUrl(fullPhotoUrl)
      } catch (error) {
        console.error("❌ Google API error:", error?.response?.data || error.message)
      }
    }
  
    useEffect(() => {
      if (plans?.placeName) {
        GetPhotos()
      }
    }, [plans])

   
  return (
    <div className='hotel-card p-3 border rounded-lg flex gap-3'>
      <div>
        <img src={photoUrl?photoUrl:viewbg} className='h-[200px] w-[400px]  object-cover rounded-lg' referrerPolicy="no-referrer" />
      </div>
      <div>
        <h2 className='font-bold text-lg'>{plans?.placeName}</h2>
        <p className='font-sm'>{plans?.placeDetails}</p>
        <p className='text-orange-500 font-semibold'>🕙 {plans?.timeToTravel ? plans?.timeToTravel : null}</p>
      
        
      </div>
        <div className='flex flex-col justify-end'>
      <Button className='hover:bg-orange-400'><FaLocationDot/></Button>
      </div>
    </div>
  )
}

export default PlacesInfo