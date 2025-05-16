import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_PHOTO_URL, GetPlaceDetails } from './GlobalAPI'
const HotelCard = ({info}) => {

    const [photoUrl, setPhotoUrl] = useState("")
     
  const GetPhotos = async () => {
    const textQuery = info?.hotelName

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
    if (info?.hotelName) {
      GetPhotos()
    }
  }, [info])

  return (
     <Link to={'https://www.google.com/maps/search/?api=1&query='+info?.hotelAddress} target='_blank'>
            
            <div  className='hotel-card rounded-lg p-4 transition-all hover:scale-110'>
                
                <img src={photoUrl} alt=""className='rounded-lg h-[300px] w-full  object-cover' referrerPolicy="no-referrer"/>
                  <div className='mt-2 flex flex-col gap-2 h-fit '>
                    <h2 className='text-xl font-medium'>{info?.hotelName}</h2>
                    <h2 className='text-sm text-gray-600'>📍 {info?.hotelAddress}</h2>
                    <h2 className='font-semibold'>💰 {info?.price}</h2>
                    <h2 className='font-semibold'>⭐ {info?.rating}</h2>
                  </div>
                </div>
        </Link>
  )
}

export default HotelCard