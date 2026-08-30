import React, { useState, useEffect } from "react";
import "../styles/Payment.css";
import { v4 as uuidv4 } from "uuid";
import { Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [idempotencyKey, setIdempotencyKey] = useState("");
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [errorAlert, setErrorAlert] = useState("");
  const [userData, setUserData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [errorDialog, setErrorDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Tidak perlu lagi load script Midtrans Snap
    // Hapus kode terkait Snap di sini
  }, []);

  useEffect(() => {
    const details = localStorage.getItem("transactionDetails");
    if (details) {
      setTransactionDetails(JSON.parse(details));
      setIdempotencyKey(uuidv4());
    }
  }, []);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setErrorAlert("");
  };

  const handlePayment = async () => {
    const env = import.meta.env;
    if (
      !userData.fullName.trim() ||
      !userData.phone.trim() ||
      !userData.email.trim()
    ) {
      setErrorDialog(true);
      return;
    }
    localStorage.setItem("userData", JSON.stringify(userData));
    setSuccessDialog(true);
  };

  // Fungsi untuk lanjutkan pembayaran (POST ke API)
  const handleContinuePayment = async () => {
    setSuccessDialog(false);

    const env = import.meta.env;
    const orderPayload = {
      total_amount: transactionDetails.total,
      paid_amount: transactionDetails.total,
      voucher_amount: 0,
      voucher_id: null,
      cust_name: userData.fullName,
      cust_phone: userData.phone,
      cust_email: userData.email,
      order_products: [
        {
          product_id: transactionDetails.productId,
          variant_id: transactionDetails.variantId,
          price_amount: transactionDetails.total / transactionDetails.quantity,
          unit_price: "fix",
          order_qty: transactionDetails.quantity,
          total: transactionDetails.total,
          order_start_date: new Date(transactionDetails.checkIn).toISOString(),
          order_end_date: new Date(transactionDetails.checkOut).toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(env.VITE_API_URL + "/api/v1/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": env.VITE_API_KEY,
          "X-Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();
      console.log("API Order Response:", result);

      if (response.ok && result.status === "success" && result.data && result.data.payment_url) {
        // Ambil path dan query dari payment_url
        const url = new URL(result.data.payment_url);
        
        let internalPath = url.pathname + url.search;
        if (internalPath.startsWith("/book/order/")) {
          internalPath = internalPath.replace("/book/order/", "/order/");
        }
        navigate(internalPath);
      } else {
        setErrorAlert(result.message || "Failed to process payment.");
        setErrorDialog(true);
      }
    } catch (error) {
      console.error("Order API Error:", error);
      setErrorAlert("Terjadi kesalahan saat memproses pembayaran.");
      setErrorDialog(true);
    }
  };

  const processHtmlString = (htmlString) => {
    return htmlString
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "")
      .replace(/&nbsp;/g, " ")
      .split(/<br\s*\/?>/g)
      .map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
  };

  if (!transactionDetails) {
    return <p>No transaction details found.</p>;
  }

  return (
    <div className="payment-page">
      <div className="payment-header">
        <h1>Customer Details</h1>
        <p>Please fill in your details to continue</p>
      </div>

      <div className="payment-container">
        {/* Transaction Summary Section */}
        {/* <div className="transaction-summary">
          <h3>Transaction Summary</h3>
          {transactionDetails ? (
            <div className="summary-details">
              <div className="summary-item">
                <h4>Product:  {transactionDetails.product}</h4>

                <div><br />
                  <span>Description: </span>
                  <span>{processHtmlString(transactionDetails.description)}</span>
                </div>

                <div><br />
                  <span>Inclusion: </span><br />
                  <span>{processHtmlString(transactionDetails.inclusion)}</span>
                </div>

                <div><br />
                  <span>Exclusion: </span>
                  <span>{processHtmlString(transactionDetails.exclusion)}</span>
                </div><br />

                <div>
                  <span>Quantity: </span>
                  <span>
                    {transactionDetails.quantity} Room{transactionDetails.quantity > 1 ? "s" : ""}
                  </span>
                  <br />
                  <span>Quantity Total: </span>
                  <span>Rp {transactionDetails.totalRoomOnly?.toLocaleString("id-ID")}</span>
                </div><br />

                {transactionDetails.additional && transactionDetails.additionalQty > 0 && (
                  <div>
                    <span>Additional: </span>
                    <span>
                      {transactionDetails.additionalQty} {transactionDetails.additional}
                      {transactionDetails.additionalQty > 1 ? "s" : ""}
                    </span>
                    <br />
                    <span>Additional Total: </span>
                    <span>Rp {transactionDetails.additionalTotal?.toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div><br />
                  <span>Check-in: </span>
                  <span>{transactionDetails.checkIn}</span>
                </div><br />
                <div>
                  <span>Check-out: </span>
                  <span>{transactionDetails.checkOut}</span>
                </div><br />
                <div>
                  <span>Total Amount: </span>
                  <span>Rp {transactionDetails.total}</span>
                </div>
              </div>
            </div>
          ) : (
            <p>No transaction details available.</p>
          )}
        </div> */}

        {/* Customer Details Section */}
        <div className="customer-details">
          <label>
            Full Name
            <input
              type="text"
              placeholder="Your full name"
              value={userData.fullName}
              onChange={(e) =>
                setUserData({ ...userData, fullName: e.target.value })
              }
            />
          </label>

          <label>
            Phone
            <input
              type="number"
              placeholder="Your phone number"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              placeholder="youremail@email.com"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </label>
        </div>

        <button className="next-button" onClick={handlePayment}>
          Book Now
        </button>

        {/* Snackbar Alert */}
        <Snackbar
          open={!!errorAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorAlert}
          </Alert>
        </Snackbar>

        {/* Dialog Error */}
        <Dialog open={errorDialog} onClose={() => setErrorDialog(false)}>
          <DialogTitle>Data Diri Belum Lengkap</DialogTitle>
          <DialogContent>
            <p>{errorAlert || "Harap isi data diri Anda sebelum melanjutkan pemesanan."}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setErrorDialog(false)} variant="contained" color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Success */}
        <Dialog open={successDialog} onClose={() => setSuccessDialog(false)}>
          <DialogTitle>TRANSACTION SUCCESSFULL</DialogTitle>
          <DialogContent>
            <p>Transaksi Anda berhasil! Silakan lanjutkan untuk pembayaran.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleContinuePayment} variant="contained" color="primary">
              Lanjutkan Pembayaran
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Payment;