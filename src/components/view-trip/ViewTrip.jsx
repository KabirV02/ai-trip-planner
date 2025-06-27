import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/components/service/FirebaseConfig'
import { useState } from 'react'
import InfoSection from './components/InfoSection'
import HotelInfo from './components/HotelInfo'
import PlaceToVisit from './components/PlaceToVisit'
import VechilesInfo from './components/VechilesInfo'
const ViewTrip = () => {

  const {tripId} = useParams()
  const [tripData,setTripData] = useState([])

  const getDocData = async()=>{

    const docRef = doc(db,'AITrips',tripId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
     
      setTripData(docSnap.data())
    }else{
      console.log("No such document!"); 
    }

  }
  useEffect(()=>{
    tripId && getDocData()
  },[tripId])

  return (
    <div className='md:w-fit p-5 md:p-10  md:px-20 lg:px-42 xl:px-[280px]'>
      {/* Infromation  */}
      <InfoSection trip={tripData}/>
      {/* Recommendation of Hotels */}
      <HotelInfo trip={tripData}/>
      {/* Days Plans or Itinary */}
      <PlaceToVisit trip={tripData}/>
      {/* Vechiles info */}
      <VechilesInfo trip={tripData}/>
       {/* Footer */}
    </div>
  )
}

export default ViewTrip