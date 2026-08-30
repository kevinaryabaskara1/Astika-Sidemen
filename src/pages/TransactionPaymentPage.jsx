import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Clock,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  Copy,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Upload,
  X,
  FileImage,
  File,
  Bed,
  Waves,
  Plus,
  Shield,
  Facebook,
  Instagram,
  Twitter,
  House,
} from "lucide-react";

// --- Halaman Utama ---
const TransactionPaymentPage = () => {
  const { id: orderId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ts = searchParams.get("ts");
  const token = searchParams.get("token");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const env = import.meta.env;
        const apiUrl = `${env.VITE_API_URL}/api/v1/order/payment/${orderId}?ts=${ts}&token=${token}`;
        const response = await fetch(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": env.VITE_API_KEY,
          },
        });
        const result = await response.json();
        if (result.status === "success") {
          setOrderData(result.data);
        } else {
          setOrderData(null);
        }
      } catch (err) {
        setOrderData(null);
      }
      setLoading(false);
    };

    if (orderId && ts && token) {
      fetchOrder();
    }
  }, [orderId, ts, token]);

  if (loading) return <div>Loading...</div>;
  if (!orderData) return <div>Data transaksi tidak ditemukan.</div>;

  // Mapping orderData ke struktur yang dibutuhkan komponen
  const mappedItems = Array.isArray(orderData.order_products)
    ? orderData.order_products.map((item) => ({
        id: item.id,
        type: "room", // atau sesuaikan jika ada tipe lain
        name: item.variant?.name || "Room",
        description: item.variant?.description || "",
        checkIn: item.order_start_date,
        checkOut: item.order_end_date,
        nights: item.nights || 1,
        guests: item.variant?.qty || 1,
        unitPrice: item.price_amount,
        quantity: item.order_qty,
        total: item.total,
        icon: Bed, // atau tentukan sesuai tipe
      }))
    : [];

  const mappedCustomer = {
    name: orderData.cust_name || "-",
    email: orderData.cust_email || "-",
    phone: orderData.cust_phone || "-",
  };

  const mappedPricing = {
    subtotal: orderData.total_amount || 0,
    tax: 0,
    serviceFee: 0,
    total: orderData.total_amount || 0,
  };

  const mappedPayment = {
    bankName: orderData.payment_channel || "BCA",
    accountNumber: orderData.payment_card_number || "8270 3666 44",
    accountName: "Gede Juli Adnyana", 
    amount: orderData.total_amount || 0,
  };

  // Setelah fetch API dan setOrderData(result.data)
  const mappedBookingId = orderData.booking_id || orderData.bookingId || "-";

  return (
    <div className="min-h-screen bg-gray-50">
      <TransactionHeader />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Transaction Information
          </h1>
          <p className="text-gray-600">
            Please make a payment according to the instructions below
          </p>
        </div>
        <TransactionStatusAlert
          expiresAt={orderData.ExpiresAt ? orderData.ExpiresAt * 1000 : undefined}
          status={orderData.status}
        />
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="flex-1 space-y-6">
            <TransactionInfo transaction={orderData} />
            <TransactionItems items={mappedItems} />
            <CustomerInfo customer={mappedCustomer} />
          </div>
          <div className="w-full lg:w-96 lg:sticky lg:top-6 lg:h-fit space-y-6">
            <PaymentSummary
              pricing={mappedPricing}
              items={mappedItems}
            />
            <PaymentInstructions
              payment={mappedPayment}
              transactionId={orderData.id}
              onPaymentSubmit={() => setShowPaymentDialog(true)}
            />
          </div>
        </div>
        <Card className="bg-gray-100 mt-6">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3">Payment Steps:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Open your mobile banking or internet banking application</li>
              <li>Select the transfer menu to another bank account</li>
              <li>Enter the account number and recipient name as above</li>
              <li>
                Enter the exact transfer amount according to the total payment
              </li>
              <li>Confirm and save the transfer receipt</li>
              <li>
                Click the "I Have Transferred" button after successfully making the payment
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
      <PaymentProofDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        transactionId={orderData.id}
        paymentAmount={orderData.total_amount || 0}
        orderData={orderData}
      />
      <TransactionFooter />
    </div>
  );
};

// --- Sub-komponen (Header, Status, dll) ---
const TransactionHeader = () => (
  <div className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">W</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Doubleyou Homestay</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-green-600" />
        <span className="text-sm text-gray-600">Secure Payment</span>
      </div>
    </div>
  </div>
);

const TransactionStatusAlert = ({ expiresAt, status }) => {
  const timeRemaining = () => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires - now;
    if (diff <= 0) return "Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours ${minutes} minutes`;
  };

  // Always show alert, any status
  return (
    <Alert className="border-orange-200 bg-orange-50">
      <AlertCircle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <strong>
          {status && status.toLowerCase() === "pending"
            ? `Remaining payment time: ${timeRemaining()}`
            : "Payment deadline:"}
        </strong>
        <br />
        Payment must be made before{" "}
        {expiresAt
          ? new Date(expiresAt).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-"}
      </AlertDescription>
    </Alert>
  );
};

const TransactionInfo = ({ transaction }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending_payment: { label: "Waiting for Payment", variant: "default" },
      paid: { label: "Paid", variant: "success" },
      expired: { label: "Expired", variant: "destructive" },
    };
    const config = statusConfig[status] || statusConfig.pending_payment;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Transaction Details</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Transaction ID: {transaction.id}
            </p>
          </div>
          {getStatusBadge(transaction.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Booking ID</p>
            <p className="text-lg">{transaction.id || transaction.bookingId || "-"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              Transaction Date
            </p>
            <p className="text-lg">
              {transaction.created_at
                ? new Date(transaction.created_at * 1000).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TransactionItems = ({ items }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
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
          <MapPin className="h-5 w-5" />
          Booking Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id}>
              {index > 0 && <Separator className="my-4" />}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      {formatCurrency(item.total)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-sm text-gray-500">
                        {formatCurrency(item.unitPrice)} × {item.quantity}
                        {item.nights && ` × ${item.nights} nights`}
                      </p>
                    )}
                  </div>
                </div>
                {item.type === "room" && (
                  <div className="ml-13 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Check-in
                        </p>
                        <p className="text-sm">{formatDate(item.checkIn)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Check-out
                        </p>
                        <p className="text-sm">{formatDate(item.checkOut)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <House className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Room
                        </p>
                        <p className="text-sm">{item.quantity} Room</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

const CustomerInfo = ({ customer }) => (
  <Card>
    <CardHeader>
      <CardTitle>Customer Information</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-700">Name</p>
          <p className="text-lg">{customer.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-700">Email</p>
            <p>{customer.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-700">Phone</p>
            <p>{customer.phone}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const PaymentSummary = ({ pricing, items }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span>{formatCurrency(item.total)}</span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(pricing.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>{formatCurrency(pricing.tax)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Fee</span>
          <span>{formatCurrency(pricing.serviceFee)}</span>
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatCurrency(pricing.total)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentInstructions = ({ payment, transactionId, onPaymentSubmit }) => {
  const [copiedField, setCopiedField] = useState("");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <CreditCard className="h-5 w-5" />
          Payment Instructions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-900 mb-3">Bank Transfer</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Bank Name</p>
              <p className="text-lg font-semibold">{payment.bankName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Account Number
              </p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-mono font-bold">
                  {payment.accountNumber}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(payment.accountNumber, "account")
                  }
                >
                  {copiedField === "account" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Account Name</p>
              <p className="text-lg font-semibold">{payment.accountName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Transfer Amount
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(payment.amount)}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(payment.amount.toString(), "amount")
                  }
                >
                  {copiedField === "amount" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            <strong>Important!</strong> The transfer must be made with the exact amount as above. Payment will be verified automatically within 1-24 hours.
          </AlertDescription>
        </Alert>
        <div className="space-y-2">
          <Button className="w-full" size="lg" onClick={onPaymentSubmit}>
            I Have Transferred
          </Button>
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <a
              href="https://wa.me/6281338427000?text=Hello%20I%20want%20to%20ask%20about%20booking%20payment"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Customer Service
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentProofDialog = ({
  open,
  onOpenChange,
  transactionId,
  paymentAmount,
  orderData,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Ambil ts dan token dari URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ts = searchParams.get("ts");
  const token = searchParams.get("token");

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  //API uplodad bukti pembayaran
  const handleSubmitPaymentProof = async () => {
    setIsSubmitting(true);
    try {
      const env = import.meta.env;
      const formData = new FormData();
      uploadedFiles.forEach((fileObj) => {
        formData.append("proof_files", fileObj.file);
      });
      formData.append("order_id", transactionId);
      formData.append("ts", ts);
      formData.append("token", token);
      if (notes) formData.append("notes", notes);

      const response = await fetch(
        `${env.VITE_API_URL}/api/v1/order/payment/upload`,
        {
          method: "POST",
          headers: {
            "X-Api-Key": env.VITE_API_KEY,
          },
          body: formData,
        }
      );
      const resultText = await response.text();
      let result;
      try {
        result = JSON.parse(resultText);
      } catch {
        console.error("Response bukan JSON:", resultText);
        alert("Server error: " + resultText);
        setIsSubmitting(false);
        return;
      }
      if (result.status === "success") {
        // Simpan data yang ingin ditampilkan di halaman sukses
        localStorage.setItem("paymentSubmissionData", JSON.stringify({
          submissionId: result.data?.submissionId || "",
          transactionId: transactionId,
          bookingId: orderData.booking_id || orderData.id || "",
          submittedAt: new Date().toISOString(),
          estimatedVerification: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), 
          customer: {
            name: orderData?.cust_name || "",
            email: orderData?.cust_email || "",
            phone: orderData?.cust_phone || "",
          },
          booking: {
            checkIn: orderData?.order_products?.[0]?.order_start_date || "",
            checkOut: orderData?.order_products?.[0]?.order_end_date || "",
            roomName: orderData?.order_products?.[0]?.variant?.name || "",
            qty: orderData?.order_products?.[0]?.order_qty || 1,
            nights: orderData?.order_products?.[0]?.nights || 1,
            bookingId: orderData?.id || "",
          },
          uploadedFiles: uploadedFiles.map(f => ({
            name: f.name,
            size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
            uploadedAt: new Date().toISOString(),
          })),
          totalAmount: orderData?.total_amount || 0,
          hotel: {
            name: "Doubleyou Homestay Pemuteran",
            phone: "+62 813 3842 7000",
            email: "doubleyoupemuteran@gmail.com",
            whatsapp: "+62 813 3842 7000",
          },
        }));

        setUploadedFiles([]);
        setNotes("");
        onOpenChange(false);
        navigate("/book/payment-success");
      } else {
        alert(result.message || "Gagal upload bukti pembayaran.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        "Terjadi kesalahan saat mengirim bukti pembayaran. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Payment
          </DialogTitle>
          <DialogDescription>
            Please upload your transfer. Accepted files: JPG, PNG, PDF (Max. 5MB)
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700">
                Click to upload file
              </p>
              <p className="text-xs text-gray-500 mt-1">
                or drag & drop files here
              </p>
            </label>
          </div>
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Uploaded files:</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                  >
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt="Preview"
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                        {file.type.includes("pdf") ? (
                          <File className="h-5 w-5 text-red-500" />
                        ) : (
                          <FileImage className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Add additional notes if needed..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Transaction ID:</strong> {transactionId}
              <br />
              <strong>Amount:</strong> {formatCurrency(paymentAmount)}
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitPaymentProof}
            disabled={uploadedFiles.length === 0 || isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              "Submit Payment"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TransactionFooter = () => (
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
        </div>
        </div>
    </div>
    <Separator className="my-6 bg-gray-700" />
    </div>
</footer>
);
export default TransactionPaymentPage;
