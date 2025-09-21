// src/utils/invoiceGenerator.ts

interface InvoiceData {
  _id: string;
  packageId: {
    title: string;
    destination: string;
    duration: number;
  };
  bookingReference: string;
  bookingDate: string;
  startDate: string;
  endDate: string;
  numberOfTravelers: number;
  totalAmount: number;
  paidAmount: number;
  status: string;
  contactDetails?: {
    primaryContact: {
      name: string;
      phone: string;
      email: string;
    };
  };
  createdAt: string;
}

export const generateInvoicePDF = (booking: InvoiceData) => {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Create invoice HTML
  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice - ${booking.bookingReference}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
          line-height: 1.6;
        }
        .invoice-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border: 1px solid #ddd;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid #f97316;
        }
        .logo-section {
          flex: 1;
        }
        .company-name {
          font-size: 28px;
          font-weight: bold;
          color: #f97316;
          margin: 0;
        }
        .company-tagline {
          color: #666;
          margin: 5px 0 0 0;
        }
        .invoice-details {
          text-align: right;
          flex: 1;
        }
        .invoice-title {
          font-size: 24px;
          font-weight: bold;
          margin: 0 0 10px 0;
        }
        .invoice-number {
          color: #666;
          margin: 0;
        }
        .invoice-date {
          color: #666;
          margin: 5px 0 0 0;
        }
        .billing-section {
          display: flex;
          justify-content: space-between;
          margin: 40px 0;
        }
        .billing-info {
          flex: 1;
          margin-right: 40px;
        }
        .company-info {
          flex: 1;
        }
        .section-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #333;
        }
        .info-line {
          margin: 8px 0;
          color: #666;
        }
        .package-details {
          margin: 40px 0;
          padding: 25px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #f97316;
        }
        .package-title {
          font-size: 20px;
          font-weight: bold;
          margin: 0 0 15px 0;
          color: #333;
        }
        .package-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .info-label {
          font-weight: 600;
          color: #555;
        }
        .info-value {
          color: #333;
        }
        .amount-breakdown {
          margin: 40px 0;
        }
        .amount-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .amount-table th,
        .amount-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .amount-table th {
          background: #f8f9fa;
          font-weight: 600;
          color: #333;
        }
        .amount-table .amount-cell {
          text-align: right;
          font-weight: 600;
        }
        .total-row {
          background: #f97316;
          color: white;
          font-weight: bold;
        }
        .total-row td {
          border: none;
          font-size: 16px;
        }
        .status-section {
          margin: 40px 0;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        .status-paid {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }
        .status-pending {
          background: #fef3c7;
          color: #92400e;
          border: 1px solid #fde68a;
        }
        .footer {
          margin-top: 60px;
          padding-top: 30px;
          border-top: 1px solid #ddd;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .footer-note {
          margin: 10px 0;
        }
        @media print {
          body {
            padding: 0;
          }
          .invoice-container {
            border: none;
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <!-- Header -->
        <div class="header">
          <div class="logo-section">
            <h1 class="company-name">Travel Quench</h1>
            <p class="company-tagline">Your Gateway to Amazing Destinations</p>
          </div>
          <div class="invoice-details">
            <h2 class="invoice-title">INVOICE</h2>
            <p class="invoice-number">#${booking.bookingReference}</p>
            <p class="invoice-date">Date: ${formatDate(booking.createdAt)}</p>
          </div>
        </div>

        <!-- Billing Information -->
        <div class="billing-section">
          <div class="billing-info">
            <h3 class="section-title">Bill To:</h3>
            <div class="info-line"><strong>${booking.contactDetails?.primaryContact?.name || 'N/A'}</strong></div>
            <div class="info-line">${booking.contactDetails?.primaryContact?.email || 'N/A'}</div>
            <div class="info-line">${booking.contactDetails?.primaryContact?.phone || 'N/A'}</div>
          </div>
          <div class="company-info">
            <h3 class="section-title">From:</h3>
            <div class="info-line"><strong>Travel Quench Pvt. Ltd.</strong></div>
            <div class="info-line">Bengaluru, Karnataka, India</div>
            <div class="info-line">Email: info@travelquench.com</div>
            <div class="info-line">Phone: +91-XXXXXXXXXX</div>
          </div>
        </div>

        <!-- Package Details -->
        <div class="package-details">
          <h3 class="package-title">${booking.packageId.title}</h3>
          <div class="package-info">
            <div class="info-item">
              <span class="info-label">Destination:</span>
              <span class="info-value">${booking.packageId.destination}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Duration:</span>
              <span class="info-value">${booking.packageId.duration} days</span>
            </div>
            <div class="info-item">
              <span class="info-label">Travel Date:</span>
              <span class="info-value">${formatDate(booking.startDate)} - ${formatDate(booking.endDate)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Travelers:</span>
              <span class="info-value">${booking.numberOfTravelers} persons</span>
            </div>
            <div class="info-item">
              <span class="info-label">Booking Date:</span>
              <span class="info-value">${formatDate(booking.bookingDate)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Status:</span>
              <span class="info-value" style="text-transform: capitalize; font-weight: 600;">${booking.status}</span>
            </div>
          </div>
        </div>

        <!-- Amount Breakdown -->
        <div class="amount-breakdown">
          <h3 class="section-title">Payment Details</h3>
          <table class="amount-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th class="amount-cell">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${booking.packageId.title} - ${booking.packageId.destination}</td>
                <td>${booking.numberOfTravelers} travelers</td>
                <td>${formatCurrency(Math.round(booking.totalAmount / booking.numberOfTravelers))}</td>
                <td class="amount-cell">${formatCurrency(booking.totalAmount)}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3">Total Amount</td>
                <td class="amount-cell">${formatCurrency(booking.totalAmount)}</td>
              </tr>
              <tr>
                <td colspan="3"><strong>Amount Paid</strong></td>
                <td class="amount-cell"><strong>${formatCurrency(booking.paidAmount)}</strong></td>
              </tr>
              <tr>
                <td colspan="3"><strong>Pending Amount</strong></td>
                <td class="amount-cell"><strong>${formatCurrency(booking.totalAmount - booking.paidAmount)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Payment Status -->
        <div class="status-section ${booking.paidAmount >= booking.totalAmount ? 'status-paid' : 'status-pending'}">
          <h3>Payment Status: ${booking.paidAmount >= booking.totalAmount ? 'FULLY PAID' : 'PAYMENT PENDING'}</h3>
          ${booking.paidAmount >= booking.totalAmount 
            ? '<p>Thank you for your payment. Your booking is confirmed.</p>' 
            : `<p>Pending amount: ${formatCurrency(booking.totalAmount - booking.paidAmount)}</p>`
          }
        </div>

        <!-- Footer -->
        <div class="footer">
          <p class="footer-note"><strong>Thank you for choosing Travel Quench!</strong></p>
          <p class="footer-note">For any queries, please contact us at info@travelquench.com or +91-XXXXXXXXXX</p>
          <p class="footer-note">Terms & Conditions apply. Visit our website for more details.</p>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            This is a computer-generated invoice. No signature required.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    };
  }
};

// Alternative: Generate invoice as downloadable PDF (requires additional library)
export const downloadInvoicePDF = async (booking: InvoiceData) => {
  try {
    // For now, we'll use the print method
    generateInvoicePDF(booking);
    
    // TODO: Implement actual PDF generation using libraries like:
    // - jsPDF with html2canvas
    // - Puppeteer (server-side)
    // - PDFKit
    
  } catch (error) {
    console.error('Error generating invoice:', error);
    alert('Error generating invoice. Please try again.');
  }
};