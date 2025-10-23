import { BrowserRouter, Routes,Route } from "react-router-dom"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import MainHome from "./pages/mainHome.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import CourageMap from "./pages/CourageMap.jsx";
import Press from "./pages/Press.jsx";
import Dashboard from "./backend/Dashboard.jsx";
import InternetPlans from "./pages/InternetPlans.jsx";
import SpeedTest from "./pages/SpeedTest.jsx";
import Reliability from "./pages/Reliability.jsx";
import Services from "./pages/Services.jsx";
import Pricing from "./pages/Pricing.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Support from "./pages/Support.jsx";
import Career from "./pages/Career.jsx";
import OurStory from "./pages/OurStory.jsx";
import GetFreeSurvey from "./pages/GetFreeSurvey.jsx";

import Support1 from "./pages/Support1.jsx";

import Billing from "./backend/Billing.jsx";
import Settings from "./backend/Settings.jsx"
import UserSupport from "./backend/UserSupport.jsx"
import Usage from "./backend/Usage.jsx"


import LandingPage from "./pages/LandingPage.jsx";



// In App.js
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop.jsx';


function App() {

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <ScrollToTop />
        <Routes>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<MainHome />}></Route>
          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route path="/our-story" element={<OurStory />}></Route>
          <Route path="/coverage" element={<CourageMap />}></Route>
          <Route path="/careers" element={<Career />}></Route>
          <Route path="/press" element={<Press />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/billing" element={<Billing />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/support" element={<Support />}></Route>
          <Route path="/user-support" element={<UserSupport />}></Route>
          <Route path="/usage" element={<Usage />}></Route>
          <Route path="/plans" element={<InternetPlans />}></Route>
          <Route path="/speedtest" element={<SpeedTest />}></Route>
          <Route path="/reliability" element={<Reliability />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/pricing" element={<Pricing />}></Route>
          <Route path="/testimonials" element={<Testimonials />}></Route>
          <Route path="/free" element={<Support1 />}></Route>
          <Route path="/free-survey" element={<GetFreeSurvey />}></Route>
          <Route path="/ads" element={<LandingPage />}></Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App



