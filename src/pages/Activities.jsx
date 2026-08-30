import { Link } from "react-router-dom";
import { activities, getMinPrice } from "../data/staticData";
import { Clock } from "lucide-react";

const Activities = () => {
  return (
    <div
      className="max-w-6xl mx-auto px-4 w-full"
      style={{ paddingTop: 90, paddingBottom: 40 }}
    >
      <div className="text-center mb-12">
        <span
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
        </span>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#142536",
            marginBottom: 8,
          }}
        >
          Explore Activities
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666" }}>
          Discover exciting activities and experiences around Pemuteran, Bali.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {activities.map((activity) => {
          const low = getMinPrice(activity, new Date("2025-02-01"));
          const high = getMinPrice(activity, new Date("2025-07-15"));
          const hasSeasonal = low !== high;
          const minPrice = low
            ? hasSeasonal
              ? `Rp ${low.toLocaleString("id-ID")} - Rp ${high.toLocaleString("id-ID")}`
              : `Rp ${low.toLocaleString("id-ID")}`
            : "";

          return (
            <div
              key={activity.id}
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
                  height: 200,
                }}
              >
                <img
                  src={activity.product_thumbnail}
                  alt={activity.name}
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
                      top: 12,
                      right: 12,
                      background: "#16a34a",
                      color: "#fff",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    }}
                  >
                    {minPrice}
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
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#142536",
                    marginBottom: 8,
                  }}
                >
                  {activity.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    marginBottom: 16,
                    lineHeight: 1.5,
                  }}
                >
                  {activity.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <div
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
                    <Clock size={14} style={{ color: "#f86f6f" }} />
                    <span>Full Day</span>
                  </div>
                </div>

                {activity.variants?.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    {activity.variants.slice(0, 2).map((v) => (
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
                    {activity.variants.length > 2 && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#0369a1",
                          fontWeight: 600,
                        }}
                      >
                        +{activity.variants.length - 2} more options
                      </span>
                    )}
                  </div>
                )}

                <Link
                  to={`/book/activities/${activity.id}`}
                  style={{ marginTop: "auto" }}
                >
                  <button
                    style={{
                      width: "100%",
                      padding: "10px 0",
                      background: "#142536",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
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

export default Activities;
