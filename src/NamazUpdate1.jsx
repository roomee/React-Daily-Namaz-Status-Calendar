import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import axios from "axios";

const NamazUpdate1 = ({ date }) => {
  const Namaz = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const formattedDate = date.toISOString().split("T")[0];

  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/prayers?date=${formattedDate}`)
      .then((res) => {
        const data = res.data;
        const state = {};
        Namaz.forEach((name) => {
          const entry = data.find((d) => d.name === name);
          state[name] = entry ? entry.status : "missed";
        });
        setStatuses(state);
      });
  }, [formattedDate]);

  const handleClick = async (name) => {
    const newStatus = statuses[name] === "offered" ? "missed" : "offered";
    const response = await axios.get(
      `http://localhost:3000/prayers?date=${formattedDate}&name=${name}`
    );
    if (response.data.length > 0) {
      const id = response.data[0].id;
      await axios.put(`http://localhost:3000/prayers/${id}`, {
        ...response.data[0],
        status: newStatus,
      });
    } else {
      await axios.post(`http://localhost:3000/prayers`, {
        date: formattedDate,
        name,
        status: newStatus,
      });
    }
    setStatuses((prev) => ({ ...prev, [name]: newStatus }));
  };

  const renderTooltip = (props, name, status) => (
    <Tooltip id={`button-tooltip-${name}`} {...props}>
      {status === "offered" ? "Offered" : "Missed"} {name} - {formattedDate}
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
            renderTooltip(props, name, statuses[name] || "missed")
          }
        >
          <Button
            variant={statuses[name] === "offered" ? "success" : "danger"}
            onClick={() => handleClick(name)}
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
};

export default NamazUpdate1;
