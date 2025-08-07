import React, { useState } from "react";
import { Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function NamazUpdate1() {
  const Namaz = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const [buttonVariants, setButtonVariants] = useState(
    Namaz.reduce((acc, name) => ({ ...acc, [name]: "danger" }), {})
  );

  const handleButtonClick = (name) => {
    setButtonVariants((prevVariants) => ({
      ...prevVariants,
      [name]: prevVariants[name] === "success" ? "danger" : "success",
    }));
  };

  const renderTooltip = (props, name, status) => (
    <Tooltip id={`button-tooltip-${name}`} {...props}>
      {status} {name} - {new Date().toLocaleDateString()}
    </Tooltip>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "4px",
      }}
    >
      {Namaz.map((name) => (
        <OverlayTrigger
          key={name}
          placement="bottom"
          delay={{ show: 250, hide: 300 }}
          overlay={(props) =>
            renderTooltip(
              props,
              name,
              buttonVariants[name] === "success" ? "Offered" : "Missed"
            )
          }
        >
          <Button
            variant={buttonVariants[name]}
            onClick={() => handleButtonClick(name)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              padding: "0",
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            size="sm"
          >
            {name.charAt(0)}
          </Button>
        </OverlayTrigger>
      ))}
    </div>
  );
}

export default NamazUpdate1;
