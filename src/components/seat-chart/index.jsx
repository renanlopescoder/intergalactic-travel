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
        <div className="seat-chart">
            <h3> {seat ? `Seat selected ${seat}` : "Select your seat"}</h3>
            {starshipSeats.map((im, index) => <img
                key={index+1}
                src={require("../../assets/icons/seat.svg")}
                className={`seat-icon ${seat === index + 1 ? "selected" : ""}`}
                alt="Seat icon"
                title="Seat icon"
                onClick={() => selectSeat(index + 1)}
                />)}
        </div>
    )
}
