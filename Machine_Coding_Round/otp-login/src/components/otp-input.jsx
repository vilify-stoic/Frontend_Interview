import React, { useEffect, useRef } from "react";
import { useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOTP] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChangeOTP = (index, e) => {
    const otpData = e.target.value;

    if (isNaN(otpData)) return;
    const newOtp = [...otp];
    newOtp[index] = otpData.substring(otpData.length - 1);
    setOTP(newOtp);

    if (otpData && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
    const combinedOtp = newOtp.join("");
    if (index == length - 1 && combinedOtp.length == 4) {
      onOtpSubmit(combinedOtp);
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !otp[index] &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            type="text"
            value={value}
            onChange={(e) => handleChangeOTP(index, e)}
            className="inputField"
            onKeyDown={(e) => handleKeyDown(index, e)}
            onClick={(e) => handleClick(index, e)}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
