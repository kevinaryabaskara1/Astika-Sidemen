import { Link } from "react-router-dom";
import { accommodations, getMinPrice } from "../data/staticData";
import { Wifi, Wind, Droplets } from "lucide-react";

const facilityIcons = [
  { icon: Wind, label: "AC" },
  { icon: Droplets, label: "Hot Shower" },
  { icon: Wifi, label: "Free Wi-Fi" },
];

const Accommodation = () => {
  return (
    <div
      className="max-w-6xl mx-auto px-4 w-full"
      style={{ paddingTop: 90, paddingBottom: 40 }}
    >
      <div className="text-center mb-12">
        <span
          style={{
            display: "inline-block",
            background: "#fef2f2",
            color: "#f86f6f",
            padding: "6px 16px",
            borderRadius: 20,
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          Stay With Us
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#142536] mb-3">
          Our Rooms
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Choose from our comfortable rooms designed for your perfect stay in
          Pemuteran, Bali.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 32,
        }}
      >
        {accommodations.map((room) => {
          const low = getMinPrice(room, new Date("2025-02-01"));
          const high = getMinPrice(room, new Date("2025-07-15"));
          const hasSeasonal = low !== high;
          const minPrice = low
            ? hasSeasonal
              ? `Rp ${low.toLocaleString("id-ID")} - Rp ${high.toLocaleString("id-ID")}/night`
              : `Rp ${low.toLocaleString("id-ID")}/night`
            : "";

          return (
            <div
              key={room.id}
              style={{
                background: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
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
                  height: 240,
                }}
              >
                <img
                  src={room.product_thumbnail}
                  alt={room.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                {minPrice && (
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
                      color: "#142536",
                    }}
                  >
                    {minPrice}
                  </div>
                )}
              </div>

              <div
                style={{
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#142536",
                    marginBottom: 8,
                  }}
                >
                  {room.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    marginBottom: 16,
                    lineHeight: 1.5,
                  }}
                >
                  {room.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    marginBottom: 16,
                    flexWrap: "wrap",
                  }}
                >
                  {facilityIcons.map((f) => (
                    <div
                      key={f.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.8rem",
                        color: "#666",
                        background: "#f9fafb",
                        padding: "4px 10px",
                        borderRadius: 8,
                      }}
                    >
                      <f.icon size={14} style={{ color: "#f86f6f" }} />
                      <span>{f.label}</span>
                    </div>
                  ))}
                </div>

                {room.variants?.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    {room.variants.slice(0, 2).map((v) => (
                      <div
                        key={v.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 12px",
                          background: "#f9fafb",
                          borderRadius: 8,
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            color: "#333",
                          }}
                        >
                          {v.name}
                        </span>
                        {(() => {
                          const vPrice = v.pricing
                            ? `Rp ${v.pricing.low.toLocaleString("id-ID")} - Rp ${v.pricing.high.toLocaleString("id-ID")}`
                            : v.price
                              ? `Rp ${v.price.toLocaleString("id-ID")}`
                              : null;
                          return vPrice ? (
                            <span
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                color: "#142536",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {vPrice}
                            </span>
                          ) : null;
                        })()}
                      </div>
                    ))}
                    {room.variants.length > 2 && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#0369a1",
                          fontWeight: 600,
                        }}
                      >
                        +{room.variants.length - 2} more options
                      </span>
                    )}
                  </div>
                )}

                <Link
                  to={`/book/accommodations/${room.id}`}
                  style={{ marginTop: "auto" }}
                >
                  <button
                    style={{
                      width: "100%",
                      padding: "10px 0",
                      background: "#142536",
                      color: "#fff",
                      border: "none",
                      borderRadius: 12,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1e3a5f";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#142536";
                    }}
                  >
                    View Details
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

export default Accommodation;
