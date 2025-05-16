import { AI_PROMPT, SelectBudgetOptions, SelectTravelLists } from "@/components/constants/options"
import { generateTravelPlan } from "@/components/service/AIModel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { toast, ToastContainer } from "react-toastify"
import Logo from '../../../assets/Logo2.jpeg'
import { FcGoogle } from "react-icons/fc"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { db } from "@/components/service/FirebaseConfig";
import { LucideLoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";



const CreateTrip = () => {

    const [place, setPlace] = useState()
    const [formData, setFromData] = useState([])
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const dataHandler = (name, value) => {

        setFromData({
            ...formData,
            [name]: value
        })

    }


    useEffect(() => {
        console.log(formData)
    }, [formData])

    const generatripHandler = async () => {

        setLoading(true)
        const user = localStorage.getItem('user')
        if (!user) {
            setDialog(true)
            toast.error("Please Login to Generate Trip")
            return
        }



        if (formData?.noOfDays > 10) {
            toast.error("Please Enter Days less than 5");
            return;
        } else if (!formData?.location || !formData?.budget || !formData?.traveler) {
            toast.error("Please Enter all Details");
            return;
        }

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label || 'Unknown Location')
            .replace('{noOfDays}', formData?.noOfDays || 'Unknown Days')
            .replace('{budget}', formData?.budget || 'Unknown Budget')
            .replace('{traveler}', formData?.traveler || 'Unknown Traveler');

        console.log("Generated Prompt:", FINAL_PROMPT);



        const contents = [
            {
                role: 'user',
                parts: [{ text: FINAL_PROMPT }],
            },
        ];

        try {
            const results = await generateTravelPlan(contents); // Call the function from AIModel.jsx

            console.log(" AI Travel Plan Response:", results); // Log the response to the console
            saveAiTripData(results)
            setLoading(false)

        } catch (error) {
            console.error("Error in generating travel plan:", error);
        }

    };

    const saveAiTripData = async (TripData) => {

        console.log("Raw AI Response:", TripData);
        const user = JSON.parse(localStorage.getItem('user'))
        const docId = Date.now().toString();
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        navigate('/view-trip/' + docId)
    }


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
            toast.success("Login Success")
            generatripHandler()
        }
        )
    }

    return (
        <div className='md:mt-5 p-[20px] md:px-[300px]'>

            {/* Preference Section */}
            <div className='mb-7'>
                <h1 className='text-[20px]  md:text-[40px] md:pt-[30px] font-bold'>Tell us your travel preferences 🏕️🏝️</h1>
                <p className='text-gray-600 mt-2 text-[15px] md:text-[20px]'>
                    Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
                </p>
            </div>

            {/* Destination Choice */}
            <div className="mt-5 flex flex-col gap-6">
                <div>
                    <h2 className='text-black md:text-xl  font-bold mt-[40px]'>What is your destination of choice?</h2>
                    <div className=" md:text-xl">
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                place,
                                onChange: (v) => {
                                    setPlace(v);
                                    dataHandler('location', v)
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Days Planning */}
                <div className='font-bold '>
                    <h2 className='text-black md:text-xl  mt-[40px]'>How many days are you plannig your trip?</h2>
                    <Input placeholder="Enter between 1-10 Days" type="number"
                        onChange={(e) => {
                            dataHandler('noOfDays', e.target.value)
                        }} />
                </div>
            </div>
            {/* Budget Planning */}
            <div>
                <h2 className='text-black text-lg md:text-2xl font-bold mt-[40px]'>What is your Budget?</h2>
                <div className='grid md:grid-cols-3 gap-2  md:gap-6 items-center mt-3'>
                    {SelectBudgetOptions.map((item) => (
                        <div key={item.id}
                            onClick={() => dataHandler('budget', item.title)}
                            className={` w-full h-[100px] md:w-[250px] md:h-[110px]  border rounded-lg p-3 cursor-pointer hover:shadow-lg hover:scale-105  transition-all
                        ${formData?.budget === item.title && 'border-black scale-105'}`}>
                            <h2 className='text-xl md:text-3xl'>{item.icon}</h2>
                            <h2 className='font-bold text-xl'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>

            </div>

            {/* TravelLists */}
            <div>
                <h2 className='text-black text-xl md:text-2xl font-bold mt-[40px]'>Who do you plan on travelling with on your next adevntur?e</h2>
                <div className='grid md:grid-cols-3 gap-6 items-center mt-3'>
                    {SelectTravelLists.map((item) => (
                        <div key={item.id}
                            onClick={() => dataHandler('traveler', item.people)}
                            className={`w-full h-[100px] md:w-[250px] md:h-[110px] border rounded-lg p-3 cursor-pointer hover:shadow-lg hover:scale-105  transition-all
                        ${formData?.traveler === item.people && 'border-black scale-105'}`}>
                            <h2 className=' text-xl md:text-3xl'>{item.icon}</h2>
                            <h2 className='font-bold text-xl'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>

            </div>

            {/* Generate Trip Button */}

            <div className='my-10 flex justify-end'>

                <Button onClick={() => generatripHandler()}
                    className='flex hover:bg-orange-400 transition-all hover:shadow-2xl hover:scale-105'
                    disabled={loading} >
                    {
                        loading ? <p>Please Wait <LucideLoaderCircle className='h-7 w-7 animate-spin cursor-not-allowed' /> </p>  : 'Generate Trip'
                    }

                </Button>
            </div>

            <Dialog open={dialog} onOpenChange={setDialog}>

                <DialogContent >
                    <DialogHeader>

                        <DialogDescription>
                            
                                <h2><span className='text-orange-400'>TRIP</span> PLANNER</h2>

                          
                            <h2 className="font-bold text-2xl mt-2">Sign In with Google</h2>
                            {/* <p>Sign in to the App with Google authentication securely</p> */}
                            
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

            <ToastContainer />
        </div>
    )
}

export default CreateTrip