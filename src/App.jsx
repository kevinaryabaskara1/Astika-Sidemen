import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Impor Font Awe
import "./App.css";

import Header from "./components/Header";
import NativeHTMLPage from "./pages/NativeHTMLPage";
import SecondaryNavigation from "./components/SecondaryNavigation";
import Accommodation from "./pages/Accommodation";
import AccommodationDetail from "./pages/AccommodationDetail";
import Activities from "./pages/Activities";
import ActivitiesDetail from "./pages/ActivitiesDetail";
import Packages from "./pages/Packages";
import PackagesDetail from "./pages/PackagesDetail";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import TransactionPaymentPage from "./pages/TransactionPaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="body">
              <Header />
              <NativeHTMLPage />
            </div>
          }
        />

        <Route path="/book/customer-detail" element={<Payment />} />

        <Route path="/book/payment-success" element={<PaymentSuccess />} />

        <Route path="/order/payment/:id" element={<TransactionPaymentPage />} />

        <Route
          path="/book/accommodations"
          element={
            <div className="container">
              <Header isAlwaysScroll={true} />
              <SecondaryNavigation />
              <Accommodation />
            </div>
          }
        />
        <Route
          path="/book/activities"
          element={
            <div className="container">
              <Header isAlwaysScroll={true} />
              <SecondaryNavigation />
              <Activities />
            </div>
          }
        />
        <Route
          path="/book/packages"
          element={
            <div className="container">
              <Header isAlwaysScroll={true} />
              <SecondaryNavigation />
              <Packages />
            </div>
          }
        />

        {/* Routes dengan hanya Header */}
        <Route
          path="/book/accommodations/:id"
          element={
            <>
              <Header isAlwaysScroll={true} />
              <AccommodationDetail />
            </>
          }
        />
        <Route
          path="/book/activities/:id"
          element={
            <>
              <Header isAlwaysScroll={true} />
              <ActivitiesDetail />
            </>
          }
        />
        <Route
          path="/book/packages/:id"
          element={
            <>
              <Header isAlwaysScroll={true} />
              <PackagesDetail />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
