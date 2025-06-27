import React, { useEffect, useState } from 'react'
import { BASE_PHOTO_URL, GetPlaceDetails } from './GlobalAPI'




const VechileCard = ({ vechileInfo,tripData }) => {

  

    const [photoUrl, setPhotoUrl] = useState("")

    const GetPhotos = async () => {
        const textQuery =   `Show me  real-looking images of rented ${vechileInfo?.name} available in ${tripData?.userSelection?.location?.label}. 
These should be vehicles commonly rented in this location.`;

    
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


            setPhotoUrl(fullPhotoUrl)
        } catch (error) {
            console.error("❌ Google API error:", error?.response?.data || error.message)
        }
    }

    useEffect(() => {
        if (vechileInfo?.name){
            GetPhotos()
        }
    }, [vechileInfo])

    return (
        <div className='h-full w-full mt-5 mb-5 border-[1px] p-2 rounded-xl ' >
            <img src={photoUrl} alt="No Photo Availabel" referrerPolicy="no-referrer" className='h-[300px] w-[400px] object-cover rounded-xl' />
            <div>

                <p className='text-xl font-bold text-gray-600'>{vechileInfo?.name}</p>
                <p className='text-lg font-bold text-gray-600'>{vechileInfo?.estimatedDailyCost}</p>
                <p className='text-gray-700'>{vechileInfo?.notes}</p>
            </div>
        </div>
    )
}

export default VechileCard