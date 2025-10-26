import { BrowserRouter, Routes,Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import MainHome from "./pages/mainHome";
import AboutUs from "./pages/AboutUs";
import CourageMap from "./pages/CourageMap";
import Press from "./pages/Press";
import Dashboard from "./backend/Dashboard";
import InternetPlans from "./pages/InternetPlans";
import SpeedTest from "./pages/SpeedTest";
import Reliability from "./pages/Reliability";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Testimonials from "./pages/Testimonials";
import Support from "./pages/Support";
import Career from "./pages/Career";
import OurStory from "./pages/OurStory";
import GetFreeSurvey from "./pages/GetFreeSurvey";

import Team from "./pages/Team";

import Billing from "./backend/Billing";
import Settings from "./backend/Settings"
import UserSupport from "./backend/UserSupport"
import Usage from "./backend/Usage"


import LandingPage from "./pages/LandingPage";



// In App.js
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';


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
          <Route path="/team" element={<Team />}></Route>
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
          <Route path="/free-survey" element={<GetFreeSurvey />}></Route>
          <Route path="/ads" element={<LandingPage />}></Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App



