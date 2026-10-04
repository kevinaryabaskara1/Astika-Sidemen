import { useState, useEffect } from "react";
import "../styles/ActivitiesDetail.css";
import Slider from "react-slick";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DateRange } from "react-date-range";
import {
  activities,
  getVariantPrice,
} from "../data/staticData";

const ActivitiesDetail = () => {
  const [variant, setVariant] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [activityData, setActivityData] = useState(null);
  const [additionals, setAdditionals] = useState([]);
  const [selectedAdditionals, setSelectedAdditionals] = useState({}); // { [id]: { ...additional, qty: 1 } }

  const handleAdditionalSelection = (additionalId) => {
    const selected = additionals.find((add) => add.id === additionalId);
    if (!selected) return;
    setSelectedAdditionals((prev) => {
      if (prev[additionalId]) {
        // already selected, remove it
        setTotal((t) => t - selected.price * prev[additionalId].qty);
        const next = { ...prev };
        delete next[additionalId];
        return next;
      }
      // add it
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
    const selectedActivity = activityData?.find((a) => a.id === item.id);
    if (!selectedActivity) {
      alert("Harga untuk tipe aktivitas ini tidak ditemukan!");
      return;
    }
    const price = getVariantPrice(selectedActivity, selectionRange.startDate);
    setVariant({ ...item, price });
    setQuantity(1);
    setTotal(price);
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
    if (activity.variants && activity.variants.length > 0) {
      setActivityData(activity.variants);
      setAdditionals(activity.additionals || []);
    } else {
      alert("Aktivitas kosong untuk tanggal yang dipilih.");
      setActivityData(null);
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
  const activity = activities.find((a) => a.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!activity) {
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
        <p>Activity not found.</p>
      </div>
    );
  }

  const lowPrice = activity.variants?.length
    ? Math.min(
        ...activity.variants.map((v) => v.pricing?.low ?? v.price ?? 0),
      )
    : 0;
  const highPrice = activity.variants?.length
    ? Math.max(
        ...activity.variants.map((v) => v.pricing?.high ?? v.price ?? 0),
      )
    : 0;

  const sliderSettings = {
    dots: true,
    infinite: activity?.images?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: activity?.images?.length > 1,
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
      alert("Please choose the activity to booking");
      return;
    }

    const recipient = "6285832366265";
    const subject = "Booking Activity";
    const body = `
      Booking Details:

      - Product: ${activity.name}

      - Inclusion:
      ${formatList(activity.inclusion)}

      - Date: ${confirmedDates ? formatDateShort(confirmedDates.startDate) : ""}${
        confirmedDates &&
        confirmedDates.startDate.toDateString() !==
          confirmedDates.endDate.toDateString()
          ? ` - ${formatDateShort(confirmedDates.endDate)}`
          : ""
      }

      - Activity Type: ${variant?.name || ""}
      - Activity Quantity: ${quantity} /pax
      `;

    const message = `${subject}\n${body}`;
    const whatsappLink = `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="standard-activity-detail" style={{ paddingTop: 90, background: "#F8F6F0" }}>
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
      {activity?.images?.length > 0 && (
        <div className="slider-activity">
          <Slider {...sliderSettings}>
            {activity.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.image_path}
                  alt={`Slide ${index}`}
                  className="sliders-activity"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Content */}
      <div className="activity-detail-container">
        {/* Header with badge */}
        <div
          className="activity-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1 style={{ color: "#1F4D3A" }}>{activity.name}</h1>
            {lowPrice > 0 && (
              <p style={{ fontSize: "0.95rem", color: "#666", marginTop: 4 }}>
                {lowPrice === highPrice
                  ? `Rp ${lowPrice.toLocaleString("id-ID")}/pax`
                  : `Rp ${lowPrice.toLocaleString("id-ID")} - Rp ${highPrice.toLocaleString("id-ID")}/pax`}
              </p>
            )}
          </div>
          <span
            style={{
              background: "#eff6ff",
              color: "#2563eb",
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: "0.8rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            <i className="fa-solid fa-water" style={{ marginRight: 6 }} />
            Activity
          </span>
        </div>

        {/* Description */}
        <div className="activity-description" style={{ background: "none"}}>
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
          <p style={{ color: "#66736B" }}>{activity.description}</p>
        </div>

        {/* Inclusion / Exclusion */}
        <div className="activity-details">
          <div className="detail-section-activity" style={{ background: "none"}}>
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
                __html: activity.inclusion || "",
              }}
            />
          </div>

          {/* <div className="inclusion-section-activity">
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
                __html: activity.exclusion || "",
              }}
            />
          </div> */}
        </div>

        {/* Booking Options */}
        <div className="booking-options-activity">
          <div className="left-options-activity" style={{ background: "#fff"}}>
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
                <i className="fa-solid fa-calendar-days" style={{ color: "#02928B" }}/>
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

            {activityData ? (
              <div className="available-activities">
                <h3>Activity Available</h3>
                {activityData.map((act) => (
                  <div
                    key={act.id}
                    className="activity-info"
                    onClick={() => addToCart(act)}
                    style={{
                      cursor: "pointer",
                      border:
                        variant?.id === act.id
                          ? "2px solid #142536"
                          : "1px solid #e5e7eb",
                      background:
                        variant?.id === act.id ? "#f0f4f8" : "#fff",
                      transition: "all 0.2s",
                    }}
                  >
                    <h4>{act.name}</h4>
                    <p style={{
                        color: "#666",
                        fontSize: "0.85rem",
                      }}>
                      <span
                        style={{
                          color: "#999",
                          fontSize: "0.75rem",
                          marginLeft: 4,
                        }}
                      >
                        Contact us for pricing
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#999", fontStyle: "italic" }}>
                Select a date to check activity availability
              </p>
            )}

            {/* Additional */}
            {/* <div className="activity-type-activity">
              <p>Additional</p>
              {additionals && additionals.length > 0 ? (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {additionals.map((additional) => (
                    <button
                      className={`activity-type-box-standard ${selectedAdditionals[additional.id] ? "active" : ""}`}
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
            </div> */}

            {/* Additional Quantities */}
            {/* {Object.values(selectedAdditionals).map((add) => (
              <div key={add.id} className="quantity-section-standard">
                <div className="quantity-label-top-standard">{add.name}</div>
                <div className="quantity-section-inner-standard">
                  <div className="quantity-label-standard">Qty</div>
                  <div className="quantity-control-standard">
                    <span className="price-standard">
                      Rp {(add.price * add.qty).toLocaleString("id-ID")}
                    </span>
                    <button
                      className="quantity-btn-standard"
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
                      className="quantity-btn-standard"
                      onClick={() => increaseAdditionalQty(add.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))} */}

            {/* Quantity */}
            <div className="quantity-section-standard">
              <div className="quantity-label-top-standard">Quantity</div>
              <div className="quantity-section-inner-standard">
                <div className="quantity-label-standard">Pax</div>
                <div className="quantity-control-standard">
                  <button
                    className="quantity-btn-standard"
                    onClick={decreaseQuantity}
                    disabled={quantity === 0}
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
                    className="quantity-btn-standard"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="right-summary-activity">
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
                        {quantity}x /pax {variant.name}
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
                  Contact us for pricing
                </span>
              </div>
            </div>

            <button className="login-btn-standard" onClick={handleWhatsAppClick} style={{ backgroundColor: "#02928B" }}>
              <i className="fa-solid fa-whatsapp" style={{ marginRight: 8 }} />
              Send Booking via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesDetail;
