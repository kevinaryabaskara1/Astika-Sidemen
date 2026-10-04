import { useState, useEffect } from "react";
import "../styles/PackagesDetail.css";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "react-slick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import {
  packages,
  getVariantPrice,
  getSeasonForDate,
  seasonConfig,
} from "../data/staticData";

const PackagesDetail = () => {
  const [variant, setVariant] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [pacakagesData, setpacakagesData] = useState(null);
  const [additionals, setAdditionals] = useState([]);
  const [selectedAdditionals, setSelectedAdditionals] = useState({}); // { [id]: { ...additional, qty: 1 } }

  const handleAdditionalSelection = (additionalId) => {
    const selected = additionals.find((add) => add.id === additionalId);
    if (!selected) return;
    setSelectedAdditionals((prev) => {
      if (prev[additionalId]) {
        setTotal((t) => t - selected.price * prev[additionalId].qty);
        const next = { ...prev };
        delete next[additionalId];
        return next;
      }
      setTotal((t) => t + selected.price);
      return { ...prev, [additionalId]: { ...selected, qty: 1 } };
    });
  };

  const increaseAdditionalQty = (additionalId) => {
    setSelectedAdditionals((prev) => {
      const item = prev[additionalId];
      if (!item) return prev;
      setTotal((t) => t + item.price);
      return { ...prev, [additionalId]: { ...item, qty: item.qty + 1 } };
    });
  };

  const decreaseAdditionalQty = (additionalId) => {
    setSelectedAdditionals((prev) => {
      const item = prev[additionalId];
      if (!item || item.qty <= 1) return prev;
      setTotal((t) => t - item.price);
      return { ...prev, [additionalId]: { ...item, qty: item.qty - 1 } };
    });
  };

  const additionalsTotal = Object.values(selectedAdditionals).reduce(
    (sum, a) => sum + a.price * a.qty,
    0,
  );

  const addToCart = (item) => {
    const selectedPacakage = pacakagesData?.find((p) => p.id === item.id);
    if (!selectedPacakage) {
      alert("Harga untuk tipe package ini tidak ditemukan!");
      return;
    }
    const price = getVariantPrice(selectedPacakage, selectionRange.startDate);
    const selectedQuantity = isFixedPackageQuantity ? getVariantPax(item) : 1;
    setVariant({ ...item, price });
    setQuantity(selectedQuantity);
    setTotal(price * selectedQuantity);
  };

  const increaseQuantity = () => {
    setQuantity((prevCount) => prevCount + 1);
    setTotal((prevTotal) => prevTotal + (variant?.price ?? 0));
  };

  const decreaseQuantity = () => {
    setQuantity((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    setTotal((prevTotal) => prevTotal - (variant?.price ?? 0));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState(null);

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const [confirmedDates, setConfirmedDates] = useState(null);

  const confirmDates = () => {
    setConfirmedDates(selectionRange);
    setIsOpen(false);
    checkAvailability();
  };

  const checkAvailability = () => {
    if (!selectionRange?.startDate || !selectionRange?.endDate) {
      alert("Silakan pilih tanggal terlebih dahulu.");
      return;
    }
    // Static: use variants and additionals from product data
    if (pacakage.variants && pacakage.variants.length > 0) {
      setpacakagesData(pacakage.variants);
      setAdditionals(pacakage.additionals || []);
    } else {
      alert("Package tidak tersedia untuk tanggal yang dipilih.");
      setpacakagesData(null);
    }
  };

  const navigate = useNavigate();

  const formatDateShort = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const { id } = useParams();
  const pacakage = packages.find((p) => p.id === Number(id));

  const isFixedPackageQuantity =
    pacakage?.name !== "Single Package" && pacakage?.variants?.length > 1;

  const getVariantPax = (packageVariant) => {
    const paxMatch = packageVariant.name?.match(/(\d+)\s*persons?/i);
    return paxMatch ? Number(paxMatch[1]) : 1;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!pacakage) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          color: "#666",
          fontSize: "1.1rem",
        }}
      >
        <p>Package not found.</p>
      </div>
    );
  }

  const lowPrice = pacakage.variants?.length
    ? Math.min(
        ...pacakage.variants.map((v) => v.pricing?.low ?? v.price ?? 0),
      )
    : 0;
  const highPrice = pacakage.variants?.length
    ? Math.max(
        ...pacakage.variants.map((v) => v.pricing?.high ?? v.price ?? 0),
      )
    : 0;

  const sliderSettings = {
    dots: true,
    infinite: pacakage?.images?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: pacakage?.images?.length > 1,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const formatList = (html) => {
    if (!html) return "-";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    const li = tmp.querySelectorAll("li");
    if (li.length > 0) {
      return Array.from(li)
        .map((item) => `  - ${item.textContent.trim()}`)
        .join("\n");
    }
    let text = tmp.innerHTML
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<[^>]+>/g, "");
    return text
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map((item) => `  - ${item}`)
      .join("\n");
  };

  const handleWhatsAppClick = () => {
    if (!confirmedDates?.startDate || !confirmedDates?.endDate) {
      alert("Please choose the date to booking");
      return;
    }

    if (!variant) {
      alert("Please choose the package to booking");
      return;
    }

    const recipient = "6285832366265";
    const subject = "Booking Package";
    const body = `
      Booking Details:

      - Product: ${pacakage.name}

      - Inclusion:
      ${formatList(pacakage.inclusion)}

      - Date: ${confirmedDates ? formatDateShort(confirmedDates.startDate) : ""}${
        confirmedDates &&
        confirmedDates.startDate.toDateString() !==
          confirmedDates.endDate.toDateString()
          ? ` - ${formatDateShort(confirmedDates.endDate)}`
          : ""
      }

      - Package Type: ${variant?.name || ""}
      - Package Quantity: ${quantity}

      - Additional:${
        Object.values(selectedAdditionals).length > 0
          ? Object.values(selectedAdditionals)
              .map(
                (a) =>
                  `\n        ${a.qty}x ${a.name} (Rp ${(a.qty * a.price).toLocaleString("id-ID")})`,
              )
              .join("")
          : "-"
      }

      - Total: Rp ${(
        quantity * (variant?.price ?? 0) +
        additionalsTotal
      ).toLocaleString("id-ID")}
      `;

    const message = `${subject}\n${body}`;
    const whatsappLink = `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="package-detail" style={{ paddingTop: 90 }}>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          color: "#666",
          fontSize: "0.9rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 16,
          padding: 0,
        }}
      >
        <i className="fa-solid fa-arrow-left" />
        Back
      </button>

      {/* Slider Image */}
      {pacakage?.images?.length > 0 && (
        <div className="slider-package">
          <Slider {...sliderSettings}>
            {pacakage.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.image_path}
                  alt={`Slide ${index}`}
                  className="sliders-images"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Content */}
      <div className="package-detail-container">
        {/* Header with badge */}
        <div
          className="package-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1 style={{ color: "#1F4D3A" }}>{pacakage.name}</h1>
          </div>
          <span
            style={{
              background: "#fefce8",
              color: "#ca8a04",
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: "0.8rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            <i className="fa-solid fa-box-open" style={{ marginRight: 6 }} />
            Package
          </span>
        </div>

        {/* Description */}
        <div className="package-description" style={{ background: "none" }}>
          <span
            style={{
              display: "inline-block",
              background: "#02928B",
              color: "#fff",
              padding: "4px 14px",
              borderRadius: 8,
              fontSize: "0.8rem",
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Description
          </span>
          <p style={{ color: "#66736B "}}>{pacakage.description}</p>
        </div>

        {/* Inclusion / Exclusion */}
        <div className="package-details">
          <div className="detail-section" style={{ background: "none" }}>
            <span
              style={{
                display: "inline-block",
                background: "#02928B",
                color: "#fff",
                padding: "4px 14px",
                borderRadius: 8,
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              <i className="fa-solid fa-check" style={{ marginRight: 6 }} />
              Inclusion
            </span>
            <div
              className="detail-grid grid-3-col"
              dangerouslySetInnerHTML={{
                __html: pacakage.inclusion || "",
              }}
            />
          </div>

          {/* <div className="inclusion-section">
            <span
              style={{
                display: "inline-block",
                background: "#142536",
                color: "#fff",
                padding: "4px 14px",
                borderRadius: 8,
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              <i className="fa-solid fa-xmark" style={{ marginRight: 6 }} />
              Exclusion
            </span>
            <div
              className="detail-grid grid-3-col grid-exclusion"
              dangerouslySetInnerHTML={{
                __html: pacakage.exclusion || "",
              }}
            />
          </div> */}
        </div>

        {/* Booking Options */}
        <div className="booking-options">
          <div className="left-options" style={{ background: "#fff" }}>
            <h3>
              <i
                className="fa-solid fa-sliders"
                style={{ marginRight: 8, color: "#02928B" }}
              />
              Booking Options
            </h3>
            <p>Specify the date and quantity</p>

            <div className="choose-date-container">
              <div className="search-bar" onClick={() => setIsOpen(!isOpen)}>
                <i className="fa-solid fa-calendar-days" style={{ color: "#02928B" }} />
                <span>
                  {selectionRange
                    ? selectionRange.startDate.toDateString() ===
                      selectionRange.endDate.toDateString()
                      ? formatDateShort(selectionRange.startDate)
                      : `${formatDateShort(selectionRange.startDate)} - ${formatDateShort(selectionRange.endDate)}`
                    : "Pilih tanggal"}
                </span>
              </div>
              {isOpen && (
                <div className="date-picker-dropdown">
                  <DateRange
                    ranges={[
                      selectionRange || {
                        startDate: new Date(),
                        endDate: new Date(),
                        key: "selection",
                      },
                    ]}
                    onChange={handleSelect}
                    minDate={new Date()}
                  />
                  <button className="button-date-picker" onClick={confirmDates}>
                    Selesai
                  </button>
                </div>
              )}
            </div>

            {pacakagesData ? (
              <div className="available-rooms">
                <h3>Package Available</h3>
                {pacakagesData.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="room-info"
                    onClick={() => addToCart(pkg)}
                    style={{
                      cursor: "pointer",
                      border:
                        variant?.id === pkg.id
                          ? "2px solid #142536"
                          : "1px solid #e5e7eb",
                      background:
                        variant?.id === pkg.id ? "#f0f4f8" : "#fff",
                      transition: "all 0.2s",
                    }}
                  >
                    <h4>{pkg.name}</h4>
                    <p>
                      Rp{" "}
                      {getVariantPrice(
                        pkg,
                        selectionRange.startDate,
                      ).toLocaleString("id-ID")}
                      <span
                        style={{
                          color: "#999",
                          fontSize: "0.75rem",
                          marginLeft: 4,
                        }}
                      >
                        /pax
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#999", fontStyle: "italic" }}>
                Select a date to check package availability
              </p>
            )}

            {/* Additional */}
            <div className="package-type">
              <p>Additional</p>
              {additionals && additionals.length > 0 ? (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {additionals.map((additional) => (
                    <button
                      className={`package-type-box ${selectedAdditionals[additional.id] ? "active" : ""}`}
                      key={additional.id}
                      onClick={() => handleAdditionalSelection(additional.id)}
                    >
                      {additional.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    color: "#999",
                    fontStyle: "italic",
                    fontSize: "0.85rem",
                  }}
                >
                  No additional services available.
                </p>
              )}
            </div>

            {/* Additional Quantities */}
            {Object.values(selectedAdditionals).map((add) => (
              <div key={add.id} className="quantity-section-package">
                <div className="quantity-label-top-package">{add.name}</div>
                <div className="quantity-section-inner-package">
                  <div className="quantity-label-package">Hour</div>
                  <div className="quantity-control-package">
                    <span className="price-package">
                      Rp {(add.price * add.qty).toLocaleString("id-ID")}
                    </span>
                    <button
                      className="quantity-btn-package"
                      onClick={() => decreaseAdditionalQty(add.id)}
                      disabled={add.qty <= 1}
                    >
                      -
                    </button>
                    <span
                      style={{
                        minWidth: 24,
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      {add.qty}
                    </span>
                    <button
                      className="quantity-btn-package"
                      onClick={() => increaseAdditionalQty(add.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="quantity-section-package">
              <div className="quantity-label-top-package">Quantity</div>
              <div className="quantity-section-inner-package">
                <div className="quantity-label-package">Pax</div>
                <div className="quantity-control-package">
                  <span className="price-package">
                    Rp{" "}
                    {variant?.price
                      ? variant.price.toLocaleString("id-ID")
                      : "0"}
                    <span
                      style={{
                        color: "#999",
                        fontSize: "0.75rem",
                        marginLeft: 2,
                      }}
                    >
                      /pax
                    </span>
                  </span>
                  <button
                    className="quantity-btn-package"
                    onClick={decreaseQuantity}
                    disabled={isFixedPackageQuantity || quantity === 0}
                  >
                    -
                  </button>
                  <span
                    style={{
                      minWidth: 24,
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    className="quantity-btn-package"
                    onClick={increaseQuantity}
                    disabled={isFixedPackageQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="right-summary">
            <h3 style={{ fontSize: "1.1rem", marginBottom: 16 }}>
              <i className="fa-solid fa-receipt" style={{ marginRight: 8 }} />
              Booking Summary
            </h3>

            {confirmedDates ? (
              <>
                <div style={{ marginBottom: 16 }}>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.8rem",
                      marginBottom: 4,
                    }}
                  >
                    Date
                  </p>
                  <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    {confirmedDates.startDate.toDateString() ===
                    confirmedDates.endDate.toDateString()
                      ? formatDateShort(confirmedDates.startDate)
                      : `${formatDateShort(confirmedDates.startDate)} - ${formatDateShort(confirmedDates.endDate)}`}
                  </p>
                </div>

                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    paddingTop: 12,
                    marginBottom: 12,
                  }}
                >
                  {variant && quantity > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ fontSize: "0.85rem" }}>
                        {quantity}x {variant.name}
                      </span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        Rp{" "}
                        {(quantity * variant.price).toLocaleString("id-ID")}
                      </span>
                    </div>
                  )}
                  {Object.values(selectedAdditionals).map((add) => (
                    <div
                      key={add.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ fontSize: "0.85rem" }}>
                        {add.qty}x {add.name}
                      </span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        Rp {(add.qty * add.price).toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontStyle: "italic",
                  marginBottom: 16,
                }}
              >
                Please select your dates to see the summary.
              </p>
            )}

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.15)",
                paddingTop: 12,
                marginTop: 8,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  Total
                </span>
                <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  Rp{" "}
                  {(
                    quantity * (variant?.price ?? 0) +
                    additionalsTotal
                  ).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <button
              className="login-button"
              onClick={handleWhatsAppClick}
              style={{ backgroundColor: "#02928B" }}
            >
              <i className="fa-brands fa-whatsapp" style={{ marginRight: 8 }} />
              Send Booking via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesDetail;
