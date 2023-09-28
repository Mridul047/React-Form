import React, { useState } from "react";
import axios from "axios";
import QRCodeComponent from "./QRCodeComponent"; // Import the new component

function FormComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [qrCodeData, setQRCodeData] = useState(null); // Initialize to null

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the XML payload
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE paymentService PUBLIC "-//Worldpay//DTD Worldpay PaymentService v1//EN" "http://dtd.worldpay.com/paymentService_v1.dtd">
      <paymentService version="1.4" merchantCode="YOUR_MERCHANT_CODE">
         <submit>
            <order orderCode="YOUR_ORDER_CODE" installationId="1234567">
               <description>YOUR_DESCRIPTION</description>
               <amount currencyCode="GBP" exponent="2" value="5000" />
               <orderContent><![CDATA[AMOREDETAILEDDESCRIPTIONOFYOURORDERCONTENTCANGOHERE]]></orderContent>
               <paymentMethodMask>
                  <include code="ALL" />
               </paymentMethodMask>
               <shopper>
                  <shopperEmailAddress>jshopper@myprovider.com</shopperEmailAddress>
               </shopper>
               <shippingAddress>
                  <address>
                     <address1>47A</address1>
                     <address2>Queensbridge Road</address2>
                     <address3>Suburbia</address3>
                     <postalCode>CB94BQ</postalCode>
                     <city>Cambridge</city>
                     <state>Cambridgeshire</state>
                     <countryCode>GB</countryCode>
                  </address>
               </shippingAddress>
               <billingAddress>
                  <address>
                     <address1>47A</address1>
                     <address2>Queensbridge Road</address2>
                     <address3>Suburbia</address3>
                     <postalCode>CB94BQ</postalCode>
                     <city>Cambridge</city>
                     <state>Cambridgeshire</state>
                     <countryCode>GB</countryCode>
                  </address>
               </billingAddress>
            </order>
         </submit>
      </paymentService>`;

    // Your API endpoint URL
    const apiUrl = "place_static_url_here";

    // Prepare the payload
    const payload = {
      request: xmlString,
      url: apiUrl,
    };

    try {
      // Send the POST request to the API
      const response = await axios.post(
        "http://localhost:8080/v1/img",
        payload
      );
      console.log("API Response:", response.data);

      setQRCodeData(response.data.imageUrl); // Set the URL received from the API
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>XML Post Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {qrCodeData && <QRCodeComponent qrCodeData={qrCodeData} />}{" "}
      {/* Render the QRCodeComponent when data is available */}
    </div>
  );
}

export default FormComponent;
