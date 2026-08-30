import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Download,
  Home as HomeIcon,
  Calendar,
  Users,
  MapPin,
  CreditCard,
  FileText,
  Shield,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Copy,
} from "lucide-react";
import jsPDF from "jspdf";
import "../styles/PaymentSuccess.css";

// Header Component
const SuccessHeader = () => (
  <div className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Doubleyou Homestay Pemuteran</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span className="text-sm text-gray-600">Secure Payment</span>
        </div>
      </div>
    </div>
  </div>
);

// Success Hero Section
const SuccessHero = ({ submissionData }) => (
  <div className="text-center py-12 bg-gradient-to-br from-green-50 to-blue-50">
    <div className="max-w-4xl mx-auto px-4">
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <div className="absolute inset-0 w-24 h-24 bg-green-200 rounded-full mx-auto animate-ping opacity-25"></div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Payment Proof Successfully Sent! 🎉
      </h1>
      <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
        Thank you! Our team will verify your payment within 1-24 hours. Confirmation will be sent via email and WhatsApp.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">
            Verification Time
          </h3>
          <p className="text-sm text-gray-600">1-24 hours after submission</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <Mail className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">
            Email Notification
          </h3>
          <p className="text-sm text-gray-600">
            Confirmation will be sent to your email
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <Phone className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Chat via WhatsApp</h3>
          <p className="text-sm text-gray-600">+62 813 3842 7000</p>
        </div>
      </div>
    </div>
  </div>
);

// Submission Details Component
const SubmissionDetails = ({ submissionData }) => {
  const [copiedId, setCopiedId] = useState(false);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Payment Proof Submission Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Transaction ID</p>
              <p className="text-lg">{submissionData.transactionId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Booking ID</p>
              <p className="text-lg">{submissionData.bookingId}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Submission Time
              </p>
              <p className="text-lg">
                {formatDateTime(submissionData.submittedAt)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Verification Estimate
              </p>
              <p className="text-lg text-green-600 font-semibold">
                {formatDateTime(submissionData.estimatedVerification)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Uploaded Files
              </p>
              {submissionData.uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>
                    {file.name} ({file.size})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Booking Summary Component
const BookingSummary = ({ booking, totalAmount }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {booking.roomName}
              </h3>
              <p className="text-gray-600">Booking ID: {booking.bookingId}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(totalAmount)}
              </p>
              <p className="text-sm text-gray-500">Total Payment</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Check-in</p>
                <p className="font-semibold">{formatDate(booking.checkIn)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Check-out</p>
                <p className="font-semibold">{formatDate(booking.checkOut)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Guests</p>
                <p className="font-semibold">
                  {booking.qty} room(s), {booking.nights} night(s)
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Next Steps Component
const NextSteps = ({ hotel }) => (
  <Card className="bg-blue-50 border-blue-200">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-blue-900">
        <ArrowRight className="h-5 w-5" />
        Next Steps
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            1
          </div>
          <div>
            <p className="font-medium">Awaiting Verification</p>
            <p className="text-sm text-gray-600">
              Our team will verify your payment proof within 1-24 hours
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            2
          </div>
          <div>
            <p className="font-medium">Payment Confirmation</p>
            <p className="text-sm text-gray-600">
              You will receive a confirmation email and WhatsApp after successful verification
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            3
          </div>
          <div>
            <p className="font-medium">Reservation E-Voucher</p>
            <p className="text-sm text-gray-600">
              An electronic voucher will be sent which you can show at check-in
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            4
          </div>
          <div>
            <p className="font-medium">Check-in at Hotel</p>
            <p className="text-sm text-gray-600">
              Arrive at the hotel as scheduled with your voucher and ID
            </p>
          </div>
        </div>
      </div>
      <Alert>
        <Clock className="h-4 w-4" />
        <AlertDescription>
          <strong>Important!</strong> If you do not receive confirmation within 24 hours, please contact our customer service.
        </AlertDescription>
      </Alert>
    </CardContent>
  </Card>
);

// Contact Support Component
const ContactSupport = ({ hotel }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Phone className="h-5 w-5" />
        Need Help?
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <p className="font-medium">Phone</p>
          <p className="text-sm text-gray-600 mb-3">{hotel.phone}</p>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            asChild
          >
            <a href={`tel:${hotel.phone.replace(/[^+\d]/g, "")}`}>
              Call Now
            </a>
          </Button>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="font-medium">Email</p>
          <p className="text-sm text-gray-600 mb-3">{hotel.email}</p>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            asChild
          >
            <a href={`mailto:${hotel.email}`}>
              Send Email
            </a>
          </Button>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-white text-sm font-bold">W</span>
          </div>
          <p className="font-medium">WhatsApp</p>
          <p className="text-sm text-gray-600 mb-3">{hotel.whatsapp}</p>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            asChild
          >
            <a
              href={`https://wa.me/${hotel.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Action Buttons Component
const ActionButtons = ({ submissionData }) => {
  const navigate = useNavigate();

  const handleDownloadProof = () => {
    if (!submissionData) return;

    // Format content for PDF
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("==== Payment Submission Proof ====", 10, 15);

    doc.setFontSize(12);
    let y = 30;
    const lineHeight = 9;
    const content = [
      `Transaction ID: ${submissionData.transactionId}`,
      `Booking ID: ${submissionData.bookingId}`,
      `Customer Name: ${submissionData.customer?.name || "-"}`,
      `Customer Email: ${submissionData.customer?.email || "-"}`,
      `Customer Phone: ${submissionData.customer?.phone || "-"}`,
      `Room: ${submissionData.booking?.roomName || "-"}`,
      `Check-in: ${submissionData.booking?.checkIn || "-"}`,
      `Check-out: ${submissionData.booking?.checkOut || "-"}`,
      `Total Amount: ${submissionData.totalAmount}`,
      `Submitted At: ${submissionData.submittedAt}`,
      `Estimated Verification: ${submissionData.estimatedVerification}`,
      "",
      "Thank you for your payment!",
      "",
      "Doubleyou Homestay Pemuteran",
      "Jl. Singaraja-Gilimanuk, Pemuteran, Kec. Gerokgak",
      "Buleleng Regency, Bali 81155",
    ];
    content.forEach((line) => {
      doc.text(line, 10, y);
      y += lineHeight;
    });

    doc.save(`submission-proof-${submissionData.customer?.name || "booking"}.pdf`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button size="lg" className="flex items-center gap-2" onClick={handleDownloadProof}>
        <Download className="h-5 w-5" />
        Download Submission Proof
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
        onClick={() => navigate("/")}
      >
        <HomeIcon className="h-5 w-5" />
        Back to Home
      </Button>
    </div>
  );
};

// Footer Component
const SuccessFooter = () => (
  <footer className="bg-gray-900 text-white mt-12">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">Doubleyou Homestay Pemuteran</h3>
              <p className="text-gray-400 text-sm">Homestay located in Pemuteran, Bali</p>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            This homestay offers accommodation with a natural atmosphere, 
            close to Pemuteran Beach. Doubleyou Homestay Pemuteran features 
            a swimming pool, terrace, and other facilities such as WiFi and parking.
          </p>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Facebook className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Instagram className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Twitter className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <p>Jl. Singaraja-Gilimanuk, Pemuteran, Kec. Gerokgak</p>
            <p>Buleleng Regency, Bali 81155</p>
            <p>+62 813 3842 7000</p>
            <p>doubleyoupemuteran@gmail.com</p>
            <p>doubleyoubali@gmail.com</p>
          </div>
        </div>
      </div>
      <Separator className="my-6 bg-gray-700" />
    </div>
  </footer>
);

// Main Success Page Component
const PaymentSuccess = () => {
  const [paymentSubmissionData, setPaymentSubmissionData] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Get data from localStorage
    const data = localStorage.getItem("paymentSubmissionData");
    if (data) {
      setPaymentSubmissionData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (!paymentSubmissionData) return;
    const calculateTimeLeft = () => {
      const now = new Date();
      const estimated = new Date(paymentSubmissionData.estimatedVerification);
      const diff = estimated - now;
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours} hours ${minutes} minutes`);
      } else {
        setTimeLeft("Soon");
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [paymentSubmissionData]);

  if (!paymentSubmissionData) {
    return <div className="text-center py-20">Loading payment data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SuccessHeader />
      <SuccessHero submissionData={paymentSubmissionData} />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <SubmissionDetails submissionData={paymentSubmissionData} />
            <ContactSupport hotel={paymentSubmissionData.hotel} />
          </div>
          <div className="space-y-6">
            <BookingSummary
              booking={paymentSubmissionData.booking}
              totalAmount={paymentSubmissionData.totalAmount}
            />
            <NextSteps hotel={paymentSubmissionData.hotel} />
          </div>
        </div>
        <ActionButtons submissionData={paymentSubmissionData} />
      </div>
      <SuccessFooter />
    </div>
  );
};

export default PaymentSuccess;
