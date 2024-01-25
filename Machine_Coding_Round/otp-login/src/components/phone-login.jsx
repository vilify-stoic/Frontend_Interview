import React, { useState } from "react";
import OtpInput from "./otp-input";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    //phone validations

    const regrex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regrex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    //call the api
    setShowOtpInput(true);
    console.log("ss", phoneNumber);
  };

  const onOtpSubmit = (otp) => {
    console.log("Login Successfull", otp);
  };

  return (
    <div>
      {" "}
      {showOtpInput === false ? (
        <div>
          <form onSubmit={handlePhoneSubmit}>
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumber}
              placeholder="Enter Phone Number"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <p>Enter the OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}{" "}
    </div>
  );
};

export default PhoneOtpForm;
