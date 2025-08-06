import React, { useState } from "react";
import { Button } from "react-bootstrap"; // Assuming you are using React-Bootstrap

function NamazUpdate1() {
  const Namaz = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  // Initialize state to hold variants for each Namaz item, default to 'success'
  const [buttonVariants, setButtonVariants] = useState(
    Namaz.reduce((acc, name) => ({ ...acc, [name]: "danger" }), {})
  );

  const handleButtonClick = (name) => {
    setButtonVariants((prevVariants) => ({
      ...prevVariants,
      // Toggle between 'success' and 'danger'
      [name]: prevVariants[name] === "success" ? "danger" : "success",
    }));
  };

  return (
    <div>
      {Namaz.map((name) => (
        <Button
          key={name}
          variant={buttonVariants[name]}
          onClick={() => handleButtonClick(name)}
          style={{ margin: "5px", padding: "5px", width: "100px" }}
          size="lg"
        >
          {name}
        </Button>
      ))}
    </div>
  );
}

export default NamazUpdate1;
