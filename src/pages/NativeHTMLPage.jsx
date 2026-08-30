import "../assets/styles/styles.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  accommodations,
  activities,
  packages as staticPackages,
  transport as staticTransport,
  rental as staticRental,
} from "../data/staticData";

import unnamed from "../assets/image-landing/review/unnamed_1.png";
import avatar from "../assets/image-landing/review/unnamed_2.png";
import micel from "../assets/image-landing/review/unnamed_3.png";
import mabel from "../assets/image-landing/review/unnamed_4.png";
import kaspar from "../assets/image-landing/review/unnamed_5.png";
import galery1 from "../assets/astika-image/1_1.jpeg";
import galery2 from "../assets/astika-image/1_3.jpeg";
import galery3 from "../assets/astika-image/1_7.jpeg";
import galery4 from "../assets/astika-image/1_13.jpeg";
import galery5 from "../assets/astika-image/1_19.jpeg";
import galery6 from "../assets/astika-image/1_22.jpeg";
import galery7 from "../assets/astika-image/1_25.jpeg";
import galery8 from "../assets/astika-image/1_28.jpeg";
import galery9 from "../assets/astika-image/1_38.jpeg";
import galery10 from "../assets/astika-image/1_31.jpeg";
import { MapPin, Phone, Mail, Facebook, Instagram, Star } from "lucide-react";
import { Users, Clock } from "lucide-react";

const galleryImages = [
  galery1,
  galery2,
  galery3,
  galery4,
  galery5,
  galery6,
  galery7,
  galery8,
  galery9,
  galery10,
];

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Marie Laubie",
      image: unnamed,
      rating: 5,
      text: '"Wayan is a wonderful tour guide. So knowledgeable and his English is so good. We loved hearing not only about the rice paddies, subak and farming but also about the Balinese culture and way of life. Thank you Wayan for an unforgettable experience. Highly recommend!"',
    },
    {
      id: 2,
      name: "Genevieve",
      image: avatar,
      rating: 5,
      text: '"This is a MUST-DO if you are in Sidemen. A superb walking tour thats nothing like what we had experienced in Ubud. Astika also known as Wayan, gave us a wonderful personal 2hour tour of the beautiful rice terrance in a village within Sidemen. He spoke superb English and because he is a local from the village, he was very knowledgeable of the Balinese culture and traditions. We were given an insight to his world, it was a privilege. We even had the chance to taste fruits and smelled different vegetables and herbs. Be ready with water, walking shoes and hat."',
    },
    {
      id: 3,
      name: "Roma Zumbrink",
      image: micel,
      rating: 4,
      text: '"Wayan was a really good tour guide! He can speak proper English, tells a lot about the Balinese cultures and the ricefields. I could anything to him and he could explain it. The trekking tour was beautiful and peaceful. I would recommend it to everyone! We also went to the waterfall and he makes me feel safe and happy!"',
    },
    {
      id: 4,
      name: "mabel burgers",
      image: mabel,
      rating: 4,
      text: '"What a increadable day with Astika. We walked through the Rice fields and had amazing sights. Our guide was very friendly and has so much knowledge of all the things you encounter. We paid our respect in a local temple and the guide made a offering to there Gods. We hade a drink on a vieuwpoint that overlooked the fields…amazing and for Sure a must do when visiting Sidemen. I would for sure do this with Astika."',
    },
    {
      id: 5,
      name: "Kaspar Koet",
      image: kaspar,
      rating: 5,
      text: '"Astika is such a nice host, lovely tour through the amazing rice field valleys of Sidemen. Very educational too and most of all a very welcoming feeling."',
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Don’t just take our word for it — hear from our happy guests 
            about their experiences exploring Bali with Astika Sidemen Bali 
            Tour and Driver. From scenic adventures to comfortable journeys, 
            discover why our guests choose to travel with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {testimonial.name}
                  </h3>
                  <div className="flex text-amber-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MapSection = () => {
  return (
    <div className="w-full">
      <div className="h-96 w-full">
        <iframe
          src="https://www.google.com/maps?q=-8.4726596,115.4343305&z=17&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Astika Sidemen Bali Tour and Driver"
        />
      </div>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Doubleyou Homestay */}
            <div className="flex flex-col items-start">
              <h3 className="text-xl font-bold mb-4">Astika Sidemen Bali Tour and Driver</h3>
              <p className="text-gray-400 mb-6">
                Astika Sidemen Bali Tour and Driver is a local private tour and transportation service 
                based in Sidemen, Karangasem, Bali. We are here to help you explore the beauty of Bali 
                with comfortable transportation, local experiences, and personalized service.

              </p>
            </div>

            {/* Column 2: Quick Links */}
            {/* <div className="flex flex-col items-start lg:items-center">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 lg:text-center">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Accommodation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Activities
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Package
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div> */}

            {/* Column 3: Contact Info */}
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-400 text-start">
                    Sidemen, Sangkan Gunung, street, Karangasem Regency, Bali 80864
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <a
                    href="tel:+6285735862032"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +62 857 3586 2032
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <a
                    href="tel:+6285737335460"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +62 857 3733 5460
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <a
                    href="mailto:iwayanastika89@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    iwayanastika89@gmail.com
                  </a>
                </li>
              </ul>
              {/* <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex flex-col gap-4">
                  <li className="flex items-center">
                    <a
                      href="https://www.facebook.com/astikasidemen"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                    >
                      <Facebook className="h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-400 hover:text-white transition-colors">
                        Facebook
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center">
                    <a
                      href="https://www.instagram.com/astikasidemen"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="text-gray-400 hover:text-white transition-colors">
                        Instagram
                      </span>
                    </a>
                  </li>
                </div>
              </div> */}
            </div>
          </div>

          <div className="py-6 border-t border-gray-800">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Astika Sidemen Bali Tour and Driver All Rights
              Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// const ContactUs = () => {
//   return (
//     <section style={{ padding: "80px 0", background: "#fff" }}>
//       <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
//         <div style={{ textAlign: "center", marginBottom: 48 }}>
//           <h2
//             style={{
//               fontSize: "2.2rem",
//               fontWeight: 700,
//               color: "#142536",
//               marginBottom: 8,
//             }}
//           >
//             Get in Touch
//           </h2>
//           <p
//             style={{
//               fontSize: "1rem",
//               color: "#666",
//               maxWidth: 480,
//               margin: "0 auto",
//             }}
//           >
//             Have questions or need assistance? We're here to help you plan your
//             perfect stay.
//           </p>
//         </div>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//             gap: 24,
//           }}
//         >
//           {/* Address */}
//           <div
//             style={{
//               background: "#f8f9fa",
//               borderRadius: 16,
//               padding: "24px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               textAlign: "center",
//               gap: 12,
//             }}
//           >
//             <div
//               style={{
//                 width: 48,
//                 height: 48,
//                 borderRadius: 12,
//                 background: "#fff",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//               }}
//             >
//               <MapPin size={22} className="text-rose-500" />
//             </div>
//             <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#142536" }}>
//               Address
//             </h3>
//             <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.6 }}>
//               Jl. Singaraja-Gilimanuk, Pemuteran, Kec. Gerokgak, Kabupaten
//               Buleleng, Bali 81155
//             </p>
//           </div>

//           {/* Phone */}
//           <div
//             style={{
//               background: "#f8f9fa",
//               borderRadius: 16,
//               padding: "24px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               textAlign: "center",
//               gap: 12,
//             }}
//           >
//             <div
//               style={{
//                 width: 48,
//                 height: 48,
//                 borderRadius: 12,
//                 background: "#fff",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//               }}
//             >
//               <Phone size={22} className="text-emerald-500" />
//             </div>
//             <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#142536" }}>
//               Phone / WhatsApp
//             </h3>
//             <a
//               href="tel:+6281338427000"
//               style={{
//                 fontSize: "0.85rem",
//                 color: "#142536",
//                 textDecoration: "none",
//                 fontWeight: 500,
//               }}
//             >
//               +62 813-3842-7000
//             </a>
//           </div>

//           {/* Email */}
//           <div
//             style={{
//               background: "#f8f9fa",
//               borderRadius: 16,
//               padding: "24px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               textAlign: "center",
//               gap: 12,
//             }}
//           >
//             <div
//               style={{
//                 width: 48,
//                 height: 48,
//                 borderRadius: 12,
//                 background: "#fff",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//               }}
//             >
//               <Mail size={22} className="text-blue-500" />
//             </div>
//             <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#142536" }}>
//               Email
//             </h3>
//             <a
//               href="mailto:doubleyoupemuteran@gmail.com"
//               style={{
//                 fontSize: "0.85rem",
//                 color: "#142536",
//                 textDecoration: "none",
//                 fontWeight: 500,
//               }}
//             >
//               doubleyoupemuteran@gmail.com
//             </a>
//           </div>
//         </div>

//         {/* Social Media */}
//         <div style={{ textAlign: "center", marginTop: 40 }}>
//           <h3
//             style={{
//               fontWeight: 600,
//               fontSize: "1rem",
//               color: "#142536",
//               marginBottom: 16,
//             }}
//           >
//             Follow Us
//           </h3>
//           <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
//             <a
//               href="https://www.facebook.com/doubleyou.pemuteran.98"
//               style={{
//                 width: 44,
//                 height: 44,
//                 borderRadius: 12,
//                 background: "#f0f0f0",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 textDecoration: "none",
//                 color: "#333",
//                 transition: "background 0.2s",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#142536";
//                 e.currentTarget.style.color = "#fff";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "#f0f0f0";
//                 e.currentTarget.style.color = "#333";
//               }}
//               target="_blank"
//             >
//               <Facebook size={20} />
//             </a>
//             <a
//               href="#"
//               style={{
//                 width: 44,
//                 height: 44,
//                 borderRadius: 12,
//                 background: "#f0f0f0",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 textDecoration: "none",
//                 color: "#333",
//                 transition: "background 0.2s",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#142536";
//                 e.currentTarget.style.color = "#fff";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "#f0f0f0";
//                 e.currentTarget.style.color = "#333";
//               }}
//               target="_blank"
//             >
//               <Instagram size={20} />
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

const HolidayPackage = ({ packages }) => {
  const [activePackage, setActivePackage] = useState(0);

  if (!packages || packages.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Loading packages...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
        padding: "0 24px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#1F4D3A",
            marginBottom: 8,
          }}
        >
          Rice Field Tracking Packages
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#66736B",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          Explore the beautiful rice fields of Sidemen and experience 
          the peaceful countryside, lush landscapes, and traditional Balinese way of life.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 380px))",
          gap: 24,
          justifyContent: "center",
        }}
      >
        {packages.map((pkg, idx) => {
          const minPrice = pkg.variants?.[0]?.price;
          return (
            <div
              key={pkg.id}
              style={{
                background: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border:
                  activePackage === idx
                    ? "2px solid #f86f6f"
                    : "2px solid transparent",
                transition: "all 0.3s",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
              }}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: 200,
                }}
              >
                <img
                  src={pkg.images?.[0]?.image_path || pkg.product_thumbnail}
                  alt={pkg.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {minPrice && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(4px)",
                      padding: "4px 12px",
                      borderRadius: 8,
                      fontWeight: 600,
                      fontSize: "0.85rem",
                    }}
                  >
                    Rp {minPrice.toLocaleString("id-ID")}
                  </div>
                )}
              </div>
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#142536",
                    marginBottom: 8,
                  }}
                >
                  {pkg.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    marginBottom: 16,
                    lineHeight: 1.5,
                  }}
                >
                  {pkg.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    marginBottom: 16,
                  }}
                >
                  {pkg.variants?.slice(0, 1).map((v) => (
                    <div
                      key={v.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        background: "#f9fafb",
                        borderRadius: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          color: "#333",
                          flex: 1,
                          minWidth: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          marginRight: 8,
                        }}
                      >
                        {v.name}
                      </span>
                      {v.price && (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "#142536",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          Rp {v.price.toLocaleString("id-ID")}
                        </span>
                      )}
                    </div>
                  ))}
                  {pkg.variants?.length > 1 && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#0369a1",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      +{pkg.variants.length - 1} more options
                    </span>
                  )}
                </div>
                <Link
                  to={`/book/packages/${pkg.id}`}
                  style={{ marginTop: "auto" }}
                >
                  <button
                    onClick={() => setActivePackage(idx)}
                    style={{
                      width: "100%",
                      background: "#02928B",
                      color: "#fff",
                      border: "none",
                      padding: "10px 0",
                      borderRadius: 10,
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ServiceFacilities = () => {
  const facilities = [
    {
      icon: Users,
      color: "blue",
      title: "Reception & Assistance",
      desc: "Friendly staff available until 20:00 and WhatsApp support after hours.",
    },
    {
      icon: Clock,
      color: "emerald",
      title: "Flexible Check In/Out",
      desc: "Check-in at 14:00, check-out at 12:00. Late check-out available.",
    },
    {
      icon: Star,
      color: "amber",
      title: "Housekeeping",
      desc: "Daily service from 10:00 to 16:00. Request specific times as needed.",
    },
    {
      icon: MapPin,
      color: "purple",
      title: "Laundry Service",
      desc: "Collected before 10:00 AM, returned next day 17:00-19:00. IDR 25K/kg.",
    },
    {
      icon: Star,
      color: "rose",
      title: "Air Conditioning",
      desc: "All rooms have individual AC with remote control for your comfort.",
    },
    {
      icon: Star,
      color: "teal",
      title: "Guest Amenities",
      desc: "Basic amenities provided. Additional items available at nearby shops.",
    },
    {
      icon: MapPin,
      color: "sky",
      title: "Drinking Water",
      desc: "2 bottles of mineral water provided daily. Tap water not for drinking.",
    },
    {
      icon: Star,
      color: "orange",
      title: "Restaurant",
      desc: "Breakfast served at front office. Many restaurants within walking distance.",
    },
    {
      icon: MapPin,
      color: "indigo",
      title: "Transportation",
      desc: "Contact reception for transportation or car rental arrangements.",
    },
    {
      icon: Star,
      color: "gray",
      title: "Payment",
      desc: "We accept cash and credit card (3% additional bank fee).",
    },
  ];

  const colorMap = {
    blue: { bg: "bg-blue-50", icon: "text-blue-600", dot: "bg-blue-400" },
    emerald: {
      bg: "bg-emerald-50",
      icon: "text-emerald-600",
      dot: "bg-emerald-400",
    },
    amber: { bg: "bg-amber-50", icon: "text-amber-600", dot: "bg-amber-400" },
    purple: {
      bg: "bg-purple-50",
      icon: "text-purple-600",
      dot: "bg-purple-400",
    },
    rose: { bg: "bg-rose-50", icon: "text-rose-600", dot: "bg-rose-400" },
    teal: { bg: "bg-teal-50", icon: "text-teal-600", dot: "bg-teal-400" },
    sky: { bg: "bg-sky-50", icon: "text-sky-600", dot: "bg-sky-400" },
    orange: {
      bg: "bg-orange-50",
      icon: "text-orange-600",
      dot: "bg-orange-400",
    },
    indigo: {
      bg: "bg-indigo-50",
      icon: "text-indigo-600",
      dot: "bg-indigo-400",
    },
    gray: { bg: "bg-gray-50", icon: "text-gray-600", dot: "bg-gray-400" },
  };

  // return (
  //   <section style={{ padding: "80px 0", background: "#fff" }}>
  //     <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
  //       <div style={{ textAlign: "center", marginBottom: 48 }}>
  //         <h2
  //           style={{
  //             fontSize: "2.2rem",
  //             fontWeight: 700,
  //             color: "#142536",
  //             marginBottom: 8,
  //           }}
  //         >
  //           Service & Facilities
  //         </h2>
  //         <p
  //           style={{
  //             fontSize: "1rem",
  //             color: "#666",
  //             maxWidth: 560,
  //             margin: "0 auto",
  //           }}
  //         >
  //           Everything you need for a comfortable and relaxing stay at Doubleyou
  //           Homestay.
  //         </p>
  //       </div>
  //       <div
  //         style={{
  //           display: "grid",
  //           gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  //           gap: 16,
  //         }}
  //       >
  //         {facilities.map((f, i) => {
  //           const c = colorMap[f.color];
  //           return (
  //             <div
  //               key={i}
  //               style={{
  //                 display: "flex",
  //                 alignItems: "flex-start",
  //                 gap: 14,
  //                 background: "#fff",
  //                 padding: "16px 18px",
  //                 borderRadius: 14,
  //                 border: "1px solid #f0f0f0",
  //                 transition: "all 0.2s",
  //               }}
  //               onMouseEnter={(e) => {
  //                 e.currentTarget.style.boxShadow =
  //                   "0 4px 16px rgba(0,0,0,0.06)";
  //                 e.currentTarget.style.borderColor = "#ddd";
  //               }}
  //               onMouseLeave={(e) => {
  //                 e.currentTarget.style.boxShadow = "none";
  //                 e.currentTarget.style.borderColor = "#f0f0f0";
  //               }}
  //             >
  //               <div
  //                 style={{
  //                   flexShrink: 0,
  //                   width: 40,
  //                   height: 40,
  //                   borderRadius: 10,
  //                   display: "flex",
  //                   alignItems: "center",
  //                   justifyContent: "center",
  //                   background: c.dot.replace("bg-", "").includes("blue")
  //                     ? "#eff6ff"
  //                     : c.dot.replace("bg-", "").includes("emerald")
  //                       ? "#ecfdf5"
  //                       : c.dot.replace("bg-", "").includes("amber")
  //                         ? "#fffbeb"
  //                         : c.dot.replace("bg-", "").includes("purple")
  //                           ? "#faf5ff"
  //                           : c.dot.replace("bg-", "").includes("rose")
  //                             ? "#fff1f2"
  //                             : c.dot.replace("bg-", "").includes("teal")
  //                               ? "#f0fdfa"
  //                               : c.dot.replace("bg-", "").includes("sky")
  //                                 ? "#f0f9ff"
  //                                 : c.dot.replace("bg-", "").includes("orange")
  //                                   ? "#fff7ed"
  //                                   : c.dot
  //                                         .replace("bg-", "")
  //                                         .includes("indigo")
  //                                     ? "#eef2ff"
  //                                     : "#f9fafb",
  //                 }}
  //               >
  //                 <f.icon size={20} className={c.icon} />
  //               </div>
  //               <div>
  //                 <div
  //                   style={{
  //                     fontWeight: 600,
  //                     fontSize: "0.9rem",
  //                     color: "#142536",
  //                     marginBottom: 4,
  //                   }}
  //                 >
  //                   {f.title}
  //                 </div>
  //                 <div
  //                   style={{
  //                     fontSize: "0.8rem",
  //                     color: "#666",
  //                     lineHeight: 1.5,
  //                   }}
  //                 >
  //                   {f.desc}
  //                 </div>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </section>
  // );
};

const TransportRentalSection = ({ transport, rental }) => {
  const [showTransportModal, setShowTransportModal] = useState(false);
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedRental, setSelectedRental] = useState(null);

  const buildWhatsAppLink = (message) => {
    const recipient = "6285735862032";
    return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
  };

  const handleBookTransport = () => {
    if (!selectedTransport) {
      alert("Please select a transport option first.");
      return;
    }
    const body = `Booking Details:\n- Transport: ${selectedTransport.name}\n- Price: Discuss via WhatsApp\n- Description: ${selectedTransport.description || "-"}`;
    window.open(
      buildWhatsAppLink(`Booking Transport: ${selectedTransport.name}\n${body}`),
      "_blank",
    );
  };

  const handleBookRental = () => {
    if (!selectedRental) {
      alert("Please select a rental option first.");
      return;
    }
    const body = `Booking Details:\n- Rental: ${selectedRental.name}\n- Price: Discuss via WhatsApp\n- Description: ${selectedRental.description || "-"}`;
    window.open(
      buildWhatsAppLink(`Booking Rental: ${selectedRental.name}\n${body}`),
      "_blank",
    );
  };

  return (
    <section
      id="transport-rental"
      style={{ padding: "10px 0", background: "#F8F6F0" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#1F4D3A",
              marginBottom: 8,
            }}
          >
            Driver pick up and drop
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#66736B",
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            Travel around Bali comfortably and conveniently with our private driver pick-up and drop-off service.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {/* Transport Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 28,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              border: "1px solid #f0f0f0",
            }}
          >
            <div className="transport-feature-layout">
              <div className="transport-feature-copy">
                <div className="transport-feature-heading">
                  <div className="transport-feature-icon">
                    <MapPin size={22} className="text-blue-600" />
                  </div>
                  <h3>Transport Service</h3>
                </div>
                <p>
                  Choose a convenient airport or harbor transfer with our
                  private driver service.
                </p>
                <button
                  onClick={() => setShowTransportModal(true)}
                  className="transport-show-more"
                  style={{ background: "#02928B"}}
                >
                  Show More
                </button>
              </div>

              <div className="transport-options-scroll">
                {transport && transport.length > 0 ? (
                  transport.map((item) => (
                    <button
                      key={item.id}
                      className={`transport-option-card ${selectedTransport?.id === item.id ? "selected" : ""}`}
                      onClick={() => setSelectedTransport(item)}
                    >
                      <span className="transport-option-name">{item.name}</span>
                      <span className="transport-option-price">
                        Contact us for pricing
                      </span>
                    </button>
                  ))
                ) : (
                  <p style={{ color: "#999", fontSize: "0.9rem" }}>
                    No transport available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transport Modal */}
      {showTransportModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setShowTransportModal(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              maxWidth: 440,
              width: "90%",
              padding: "28px 24px",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#142536",
                }}
              >
                Choose Transport
              </h3>
              <button
                onClick={() => setShowTransportModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                &times;
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 20,
              }}
            >
              {transport.map((item) => (
                <label
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 14px",
                    borderRadius: 12,
                    cursor: "pointer",
                    border:
                      selectedTransport?.id === item.id
                        ? "2px solid #142536"
                        : "2px solid #e5e7eb",
                    background:
                      selectedTransport?.id === item.id ? "#f0f7ff" : "#fff",
                  }}
                >
                  <input
                    type="radio"
                    name="transport"
                    value={item.id}
                    checked={selectedTransport?.id === item.id}
                    onChange={() => setSelectedTransport(item)}
                    style={{ accentColor: "#142536" }}
                  />
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: "#142536",
                      }}
                    >
                      {item.name}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>
                      {item.description}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "#142536",
                        marginTop: 4,
                      }}
                    >
                      Contact us for pricing
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <button
              onClick={handleBookTransport}
              style={{
                width: "100%",
                padding: "12px 0",
                background: "#142536",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const NativeHTMLPage = () => {
  const accommodation = accommodations;
  const activityList = activities;
  const packages = staticPackages;
  const transport = staticTransport;
  const rental = staticRental;

  // Gallery logic
  const [lightboxImg, setLightboxImg] = useState(null);
  const [showMoreModal, setShowMoreModal] = useState(false);

  const openLightbox = (img) => setLightboxImg(img);
  const closeLightbox = () => setLightboxImg(null);
  const handleSeeMore = () => setShowMoreModal(true);
  const closeSeeMoreModal = () => setShowMoreModal(false);

  // --- Slider/Animation logic tetap seperti sebelumnya jika diperlukan ---

  // Galeri utama menampilkan dua baris dengan tiga gambar per baris.
  const mainGallery = galleryImages.slice(0, 6);
  // Galeri tambahan ditampilkan melalui tombol View More.
  const moreGallery = galleryImages.slice(6);

  return (
    <>
      <section id="home" className="home">
        <div className="home-content">
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(248,111,111,0.2)",
                border: "1px solid rgba(248,111,111,0.4)",
                color: "#f86f6f",
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              Bali, Indonesia
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 20,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Discover the
            <br />
            <span style={{ color: "#f86f6f" }}>Beauty</span> of Sidemen
          </h1>
          <p
            style={{
              color: "#c8d6e5",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              fontWeight: 300,
              maxWidth: "480px",
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            From peaceful rice terraces and hidden waterfalls to local 
            traditions and breathtaking landscapes, Sidemen offers an 
            unforgettable way to experience Bali. Join us on a journey 
            through some of the islands most beautiful and authentic 
            places, where every tour brings a new story, a new discovery,
            and a deeper connection with Bali
          </p>
        </div>
      </section>

      <ServiceFacilities />

      {/* Best Deal Offers for You */}
      {/* <section
        id="accommodation"
        style={{ padding: "80px 0", background: "#f8f9fa" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#142536",
                marginBottom: 8,
              }}
            >
              Best Deal Offers
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#666" }}>
              Comfortable rooms for your perfect stay
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 32,
            }}
          >
            {accommodation.slice(0, 2).map((room) => (
              <div
                key={room.id}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    height: 260,
                  }}
                >
                  <img
                    src={room.product_thumbnail}
                    alt={room.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {room.variants?.[0]?.price && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 12,
                        right: 12,
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(4px)",
                        padding: "6px 14px",
                        borderRadius: 10,
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      Rp {room.variants[0].price.toLocaleString("id-ID")}/night
                    </div>
                  )}
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "#142536",
                      marginBottom: 8,
                    }}
                  >
                    {room.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      marginBottom: 16,
                      lineHeight: 1.5,
                    }}
                  >
                    {room.description}
                  </p>
                  <Link to={`/book/accommodations/${room.id}`}>
                    <button
                      style={{
                        width: "100%",
                        padding: "10px 0",
                        background: "#142536",
                        color: "#fff",
                        border: "none",
                        borderRadius: 12,
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        cursor: "pointer",
                      }}
                    >
                      View Room
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Explore Activities */}
      <section
        id="activities"
        style={{ padding: "80px 0"}}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            {/* <span
              style={{
                display: "inline-block",
                background: "#f0fdf4",
                color: "#16a34a",
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: "0.85rem",
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              Explore the pleasure!
            </span> */}
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#1F4D3A",
                marginBottom: 8,
              }}
            >
              Discover Your Sidemen Experience
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#66736B" }}>
              Explore unique tours, local traditions, and unforgettable experiences in the heart of Bali.
            </p>
          </div>
          <div className="discover-activities-grid">
            {activityList.map((activity) => (
              <div
                key={activity.id}
                className="discover-activity-item"
                style={{ textAlign: "center" }}
              >
                <Link
                  to={`/book/activities/${activity.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 170,
                      height: 170,
                      margin: "0 auto 12px",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 170 170"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <path
                        d="M85 3Q88 3 91 6L164 79Q170 85 164 91L91 164Q85 170 79 164L6 91Q0 85 6 79L79 6Q82 3 85 3Z"
                        fill="#fafafa"
                      />
                      <path
                        d="M85 18Q88 18 91 21L149 79Q155 85 149 91L91 149Q85 155 79 149L21 91Q15 85 21 79L79 21Q82 18 85 18Z"
                        fill="#DDEDE2"
                      />
                    </svg>
                    <div
                      style={{
                        position: "absolute",
                        inset: "12px 12px 10px",
                        overflow: "hidden",
                        clipPath:
                          "path('M73 0Q76 0 79 3L143 67Q148 72 143 77L78 142Q73 147 68 142L3 77Q-2 72 3 67L67 3Q70 0 73 0Z')",
                        boxShadow: "0 4px 16px rgba(31,77,58,0.18)",
                        background: "#DDEDE2",
                      }}
                    >
                    <img
                      src={activity.images?.[0]?.image_path || activity.product_thumbnail}
                      alt={activity.name}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    </div>
                  </div>
                </Link>
                <span
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#333",
                  }}
                >
                  {activity.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Package */}
      <section
        id="package"
        style={{ padding: "80px 0", background: "#F8F6F0" }}
      >
        <HolidayPackage packages={packages} />
      </section>

      {/* Transport & Rental Section */}
      <TransportRentalSection transport={transport} rental={rental} />

      {/* Gallery Section */}
      <section id="about-us" style={{ padding: "80px 0", background: "#F8F6F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 700,
                color: "#1F4D3A",
                marginBottom: 8,
              }}
            >
              Our Gallery
            </h2>
            <p style={{ fontSize: "1rem", color: "#455A64" }}>
              Take a glimpse into the beauty of Bali through our gallery. Discover scenic landscapes, memorable journeys, local experiences, and the places we explore with our guests.
            </p>
          </div>
          <div className="gallery-main-grid">
            {mainGallery.map((img, idx) => (
              <div
                className="gallery-main-card"
                key={idx}
                onClick={() => openLightbox(img)}
                style={{
                  borderRadius: 14,
                  overflow: "hidden",
                  cursor: "pointer",
                  aspectRatio: "4/3",
                  position: "relative",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
          {moreGallery.length > 0 && (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button
                onClick={handleSeeMore}
                style={{
                  padding: "10px 24px",
                  background: "#f0f0f0",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "#142536",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e0e0e0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f0f0f0";
                }}
              >
                View More (+{moreGallery.length} photos)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          <img
            src={lightboxImg}
            alt="Large"
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      )}

      {/* Modal See More */}
      {showMoreModal && (
        <div
          onClick={closeSeeMoreModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 20,
              maxWidth: 900,
              width: "90vw",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "32px 24px",
              position: "relative",
            }}
          >
            <button
              onClick={closeSeeMoreModal}
              style={{
                position: "absolute",
                top: 16,
                right: 24,
                background: "transparent",
                border: "none",
                fontSize: "2rem",
                color: "#666",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: 12,
              }}
            >
              {moreGallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery More ${idx + 7}`}
                  onClick={() => openLightbox(img)}
                  loading="lazy"
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Map & Footer Section */}
      <MapSection />
    </>
  );
};

export default NativeHTMLPage;
