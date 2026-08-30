import { useState, useEffect } from "react";
import "../styles/AccommodationDetail.css";
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
  accommodations,
  getVariantPrice,
  getSeasonForDate,
  seasonConfig,
} from "../data/staticData";

const AccommodationDetail = () => {
  const [variant, setVariant] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [roomData, setRoomData] = useState(null);
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
    const selectedRoom = roomData?.find((room) => room.id === item.id);
    if (!selectedRoom) {
      alert("Harga untuk tipe kamar ini tidak ditemukan!");
      return;
    }
    const price = getVariantPrice(selectedRoom, selectionRange.startDate);
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
    if (!selectionRange) {
      setSelectionRange(ranges.selection);
    } else {
      setSelectionRange(ranges.selection);
    }
  };

  const [confirmedDates, setConfirmedDates] = useState(null);

  const confirmDates = () => {
    setConfirmedDates(selectionRange);
    setIsOpen(false);
    checkAvailability();
  };

  const checkAvailability = () => {
    if (!selectionRange.startDate || !selectionRange.endDate) {
      alert("Silakan pilih tanggal check-in dan check-out terlebih dahulu.");
      return;
    }
    // Static: use variants and additionals from product data
    if (accommodation.variants && accommodation.variants.length > 0) {
      setRoomData(accommodation.variants);
      setAdditionals(accommodation.additionals || []);
    } else {
      alert("Kamar kosong untuk tanggal yang dipilih.");
      setRoomData(null);
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

  const getNightCount = () => {
    if (!confirmedDates) return 0;
    const diff = confirmedDates.endDate - confirmedDates.startDate;
    return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
  };

  const { id } = useParams();
  const accommodation = accommodations.find((acc) => acc.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!accommodation) {
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
        <p>Accommodation not found.</p>
      </div>
    );
  }

  const lowPrice = accommodation.variants?.length
    ? Math.min(
        ...accommodation.variants.map((v) => v.pricing?.low ?? v.price ?? 0),
      )
    : 0;
  const highPrice = accommodation.variants?.length
    ? Math.max(
        ...accommodation.variants.map((v) => v.pricing?.high ?? v.price ?? 0),
      )
    : 0;

  const sliderSettings = {
    dots: true,
    infinite: accommodation?.images?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: accommodation?.images?.length > 1,
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

  const handleEmailClick = () => {
    const recipient = "doubleyoupemuteran@gmail.com";
    const subject = "Booking Accommodation";
    const body = `
      Booking Details:

      - Product: ${accommodation.name}

      - Inclusion:
      ${formatList(accommodation.inclusion)}

      - Exclusion:
      ${formatList(accommodation.exclusion)}

      - Check-in: ${confirmedDates ? formatDateShort(confirmedDates.startDate) : ""}
      - Check-out: ${confirmedDates ? formatDateShort(confirmedDates.endDate) : ""}

      - Room Type: ${variant?.name || ""}
      - Room Quantity: ${quantity}

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

      - Total: Rp ${(quantity * (variant?.price ?? 0) + additionalsTotal).toLocaleString("id-ID")}
      `;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    const isMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return /android|iphone|ipad|ipod|blackberry|windows phone|iemobile/i.test(
        userAgent,
      );
    };

    let emailLink;
    if (isMobile()) {
      emailLink = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
    } else {
      emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodedSubject}&body=${encodedBody}`;
    }

    window.open(emailLink, "_blank");
  };

  const nights = getNightCount();

  return (
    <div className="standard-room-detail" style={{ paddingTop: 90 }}>
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
      {accommodation?.images?.length > 0 && (
        <div className="slider-standard">
          <Slider {...sliderSettings}>
            {accommodation.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.image_path}
                  alt={`Slide ${index}`}
                  className="slider-images-standard"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Content */}
      <div className="standard-detail-container">
        {/* Header with price badge */}
        <div
          className="standard-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1>{accommodation.name}</h1>
            {lowPrice > 0 && (
              <p style={{ fontSize: "0.95rem", color: "#666", marginTop: 4 }}>
                {lowPrice === highPrice
                  ? `Rp ${lowPrice.toLocaleString("id-ID")}/night`
                  : `Rp ${lowPrice.toLocaleString("id-ID")} - Rp ${highPrice.toLocaleString("id-ID")}/night`}
              </p>
            )}
          </div>
          <span
            style={{
              background: "#f0fdf4",
              color: "#16a34a",
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: "0.8rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            <i className="fa-solid fa-bed" style={{ marginRight: 6 }} />
            Accommodation
          </span>
        </div>

        {/* Description */}
        <div className="standard-description">
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
            Description
          </span>
          <p>{accommodation.description}</p>
        </div>

        {/* Inclusion / Exclusion */}
        <div className="standard-details">
          <div className="detail-section-standard">
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
              <i className="fa-solid fa-check" style={{ marginRight: 6 }} />
              Inclusion
            </span>
            <div
              className="detail-grid grid-3-col"
              dangerouslySetInnerHTML={{
                __html: accommodation.inclusion || "",
              }}
            />
          </div>

          <div className="inclusion-section-standard">
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
                __html: accommodation.exclusion || "",
              }}
            />
          </div>
        </div>

        {/* Booking Options */}
        <div className="booking-options-standard">
          <div className="left-options-standard">
            <h3>
              <i
                className="fa-solid fa-sliders"
                style={{ marginRight: 8, color: "#f86f6f" }}
              />
              Booking Options
            </h3>
            <p>Specify the check-in and check-out dates</p>

            <div className="choose-date-container">
              <div className="search-bar" onClick={() => setIsOpen(!isOpen)}>
                <i className="fa-solid fa-calendar-days" />
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

            {roomData ? (
              <div className="available-rooms">
                <h3>Room Available</h3>
                {roomData.map((room) => (
                  <div
                    key={room.id}
                    className="room-info"
                    onClick={() => addToCart(room)}
                    style={{
                      cursor: "pointer",
                      border:
                        variant?.id === room.id
                          ? "2px solid #142536"
                          : "1px solid #e5e7eb",
                      background: variant?.id === room.id ? "#f0f4f8" : "#fff",
                      transition: "all 0.2s",
                    }}
                  >
                    <h4>{room.name}</h4>
                    <p>
                      Rp{" "}
                      {getVariantPrice(
                        room,
                        selectionRange.startDate,
                      ).toLocaleString("id-ID")}
                      <span
                        style={{
                          color: "#999",
                          fontSize: "0.75rem",
                          marginLeft: 4,
                        }}
                      >
                        /night
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#999", fontStyle: "italic" }}>
                Select a date to check room availability
              </p>
            )}

            {/* Additional */}
            <div className="room-type-standard">
              <p>Additional</p>
              {additionals && additionals.length > 0 ? (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {additionals.map((additional) => (
                    <button
                      className={`room-type-box-standard ${selectedAdditionals[additional.id] ? "active" : ""}`}
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
            ))}

            {/* Quantity */}
            <div className="quantity-section-standard">
              <div className="quantity-label-top-standard">Quantity</div>
              <div className="quantity-section-inner-standard">
                <div className="quantity-label-standard">Room</div>
                <div className="quantity-control-standard">
                  <span className="price-standard">
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
                      /night
                    </span>
                  </span>
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
          <div className="right-summary-standard">
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
                    Check-in
                  </p>
                  <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    {formatDateShort(confirmedDates.startDate)}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.8rem",
                      marginBottom: 4,
                      marginTop: 10,
                    }}
                  >
                    Check-out
                  </p>
                  <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    {formatDateShort(confirmedDates.endDate)}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.8rem",
                      marginTop: 6,
                    }}
                  >
                    {nights} Night{nights > 1 ? "s" : ""}
                  </p>
                  <p
                    style={{
                      marginTop: 8,
                      padding: "4px 10px",
                      background:
                        getSeasonForDate(confirmedDates.startDate) === "high"
                          ? "rgba(220,38,38,0.15)"
                          : "rgba(22,163,74,0.15)",
                      color:
                        getSeasonForDate(confirmedDates.startDate) === "high"
                          ? "#fca5a5"
                          : "#86efac",
                      borderRadius: 6,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      display: "inline-block",
                    }}
                  >
                    {
                      seasonConfig[getSeasonForDate(confirmedDates.startDate)]
                        .name
                    }
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
                        {(quantity * variant.price * nights).toLocaleString(
                          "id-ID",
                        )}
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
                    quantity * (variant?.price ?? 0) * nights +
                    additionalsTotal
                  ).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <button className="login-btn-standard" onClick={handleEmailClick}>
              <i className="fa-solid fa-envelope" style={{ marginRight: 8 }} />
              Send Booking via Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationDetail;
