import { Link } from "react-router-dom";
import { packages, getMinPrice } from "../data/staticData";
import { Tag } from "lucide-react";

const Packages = () => {
  return (
    <div
      className="max-w-6xl mx-auto px-4 w-full"
      style={{ paddingTop: 90, paddingBottom: 40 }}
    >
      <div className="text-center mb-12">
        <span
          style={{
            display: "inline-block",
            background: "#eff6ff",
            color: "#0369a1",
            padding: "6px 16px",
            borderRadius: 20,
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          Best Value Deals
        </span>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#142536",
            marginBottom: 8,
          }}
        >
          Holiday Packages
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666" }}>
          Get the best value with our curated packages combining accommodation,
          activities, and more.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 380px))",
          gap: 24,
          justifyContent: "center",
        }}
      >
        {packages.map((pkg) => {
          const low = getMinPrice(pkg, new Date("2025-02-01"));
          const high = getMinPrice(pkg, new Date("2025-07-15"));
          const hasSeasonal = low !== high;
          const minPrice = low
            ? hasSeasonal
              ? `Rp ${low.toLocaleString("id-ID")} - Rp ${high.toLocaleString("id-ID")}`
              : `Rp ${low.toLocaleString("id-ID")}`
            : "";

          return (
            <div
              key={pkg.id}
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
                  height: 220,
                }}
              >
                <img
                  src={pkg.product_thumbnail}
                  alt={pkg.name}
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
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    background: "#f86f6f",
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Tag size={12} />
                  Package Deal
                </div>
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
                      fontSize: "0.85rem",
                      color: "#142536",
                    }}
                  >
                    Start from {minPrice}
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

                {pkg.variants?.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    {pkg.variants.slice(0, 2).map((v) => (
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
                        {v.pricing ? (
                          <span
                            style={{
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#142536",
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                            }}
                          >
                            Rp {v.pricing.low.toLocaleString("id-ID")} - Rp {v.pricing.high.toLocaleString("id-ID")}
                          </span>
                        ) : v.price ? (
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
                        ) : null}
                      </div>
                    ))}
                    {pkg.variants.length > 2 && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#0369a1",
                          fontWeight: 600,
                          textAlign: "center",
                          display: "block",
                        }}
                      >
                        +{pkg.variants.length - 2} more options
                      </span>
                    )}
                  </div>
                )}

                <Link
                  to={`/book/packages/${pkg.id}`}
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
                    View Package
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

export default Packages;
