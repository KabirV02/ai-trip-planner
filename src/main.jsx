import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes ,Navigate } from 'react-router-dom'
import Header from './components/custom/Header/Header'
import CreateTrip from './components/custom/Create-Trip/CreateTrip'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './components/view-trip/ViewTrip'
import MyTrips from './components/My_Trips/MyTrips'



createRoot(document.getElementById('root')).render(
  <>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_ID}>
       <BrowserRouter>
    <Header />
    
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create-trip" element={<CreateTrip />} />
      <Route path="/view-trip/:tripId/*" element={<ViewTrip />} />
      <Route path="/view-trip/*" element={<Navigate to="/" replace />} />
      <Route path="/mytrips" element={<MyTrips />} />
       <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
  </GoogleOAuthProvider>
    </>
)
