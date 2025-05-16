import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../service/FirebaseConfig';
import MyTripCard from './MyTripCard';

const MyTrips = () => {

    const navigate = useNavigate()

    const [userTrips, setUserTrips] = useState([])

    const getTripData = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        if (!user) {
            navigate('/')
            return
        }

        try {
            setUserTrips([]);
            const q = query(collection(db, 'AITrips'), where("userEmail", "==", user.email));
            const querySnapshot = await getDocs(q);
            const trips = querySnapshot.docs.map(doc => doc.data());
            setUserTrips(trips);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }

    }

    useEffect(() => {
        getTripData()
    }, [])

    return (
        <div className='  p-4'>
            <h2 className=' text-center text-3xl p-[30px] font-bold'>My Trips</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                {userTrips.length>0?userTrips.map((trip,idx)=>(
                    <MyTripCard key={idx} trip={trip}/>
                )):[1,2,3,4,5,6].map((item,index)=>(
                    <div key={index} className='h-[400px] w-[400px] bg-gray-300 rounded-xl animate-pulse'>
                        
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default MyTrips