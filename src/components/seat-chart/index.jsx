import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import { registerSeat } from "../../redux/travel/travel.actions";

export default function SeatChart({ seats = 20 }) {
    const dispatch = useDispatch();

    const starshipSeats = new Array(seats).fill();
    const [seat, setSeat] = useState(null);

    const selectSeat = (seatNumber) => {
        setSeat(seatNumber);
        dispatch(registerSeat(seatNumber));
    }

    return (
        <div style={{ maxWidth: "10%"}}>
            <h3> {seat ? `Seat selected ${seat}` : "Select your seat"}</h3>
            {starshipSeats.map((im, index) => <img
                key={index+1}
                src={require("../../assets/icons/seat.svg")}
                style={{ borderRadius: "10px", height: "30px", margin: "5px", backgroundColor: `${seat === index + 1 ? "#C0B9AC" : "white"}`}}
                className="seat-icon"
                alt="Seat icon"
                title="Seat icon"
                onClick={() => selectSeat(index + 1)}
                />)}
        </div>
    )
}
