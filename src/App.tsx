/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useRef, useState } from "react";
import "./App.scss";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import { CartProvider } from "./contexts/CartContext";
import ControlTray from "./components/control-tray/ControlTray";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header';
import { NavAssistant } from './components/nav-assistant/NavAssistant';
import { BabyBootJean } from './pages/BabyBootJean';
import { Cart } from './pages/Cart';
import { OrderPaymentConfirmation } from './pages/OrderPaymentConfirmation';
import All from './pages/All';
import Dog from './pages/Dog';
import TV from './pages/TV';
import ComputersAndTablets from './pages/ComputersAndTablets';
import CellPhones from './pages/CellPhones';
import Gaming from './pages/Gaming';
import Cameras from './pages/Cameras';
import SmartHome from './pages/SmartHome';
import { Auth0ProviderWithNavigate } from './auth/Auth0ProviderWithNavigate';
import { ProtectedRoute } from './auth/ProtectedRoute';
import PersonalizedPage from './pages/PersonalizedPage';
import ModernRibPullover from './pages/ModernRibPullover';
import StrawPanamaHat from './pages/StrawPanamaHat';
import GapLogoTote from './pages/GapLogoTote';
import ProductDetail from "./pages/ProductDetail";
import PersonalizedProductDetail from './pages/PersonalizedProductDetail';
import InStore from "./pages/InStore";
import Womens from './pages/Womens';
import { Search } from './pages/Search';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <CartProvider>
          <div className="App">
            <LiveAPIProvider url={uri} apiKey={API_KEY}>
              <Header />
              <NavAssistant />
              <Routes>
                <Route path="/" element={<All />} />
                <Route path="/all" element={<All />} />
                <Route path="/search" element={<Search />} />
                <Route path="/womens" element={<Womens />} />
                <Route path="/womens/new-arrivals" element={<Womens />} />
                <Route path="/womens/jeans" element={<BabyBootJean />} />
                <Route path="/womens/tops" element={<ModernRibPullover />} />
                <Route path="/womens/dresses" element={<Womens />} />
                <Route path="/womens/activewear" element={<Womens />} />
                <Route path="/womens/sweaters" element={<Womens />} />
                <Route path="/womens/denim-guide" element={<Womens />} />
                <Route path="/womens/spring-lookbook" element={<Womens />} />
                <Route path="/dog" element={<Dog />} />
                <Route path="/tv" element={<TV />} />
                <Route path="/computers-tablets" element={<ComputersAndTablets />} />
                <Route path="/cell-phones" element={<CellPhones />} />
                <Route path="/gaming" element={<Gaming />} />
                <Route path="/cameras" element={<Cameras />} />
                <Route path="/smart-home" element={<SmartHome />} />
                <Route path="/instore" element={<InStore />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/baby-boot-jean" element={<BabyBootJean />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-payment-confirmation" element={<OrderPaymentConfirmation />} />
                <Route path="/personalized" element={
                  <ProtectedRoute>
                    <PersonalizedPage />
                  </ProtectedRoute>
                } />
                <Route path="/personalized-items/:id" element={<PersonalizedPage />} />
                <Route path="/modern-rib-pullover" element={<ModernRibPullover />} />
                <Route path="/straw-panama-hat" element={<StrawPanamaHat />} />
                <Route path="/gap-logo-tote" element={<GapLogoTote />} />
                <Route path="/personalized/:id" element={<PersonalizedProductDetail />} />
              </Routes>
              <div className="video-container">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  style={{ display: videoStream ? 'block' : 'none' }}
                />
                <ControlTray
                  videoRef={videoRef}
                  onVideoStreamChange={setVideoStream}
                  supportsVideo={true}
                />
              </div>
            </LiveAPIProvider>
          </div>
        </CartProvider>
      </Auth0ProviderWithNavigate>
    </Router>
  );
}

export default App;
