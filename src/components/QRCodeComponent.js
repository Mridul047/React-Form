import React from "react";

function QRCodeComponent({ qrCodeData }) {
  return (
    <div>
      <h2>QR Code</h2>
      <img src={qrCodeData} alt="QR Code" />
    </div>
  );
}

export default QRCodeComponent;
