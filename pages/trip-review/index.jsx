import React from "react";
import { useSelector } from "react-redux";

import Card from "../../src/components/card";
import { selectTravel } from "../../src/redux/travel/travel.selector";

function TripDetail() {
  const travel = useSelector((state) => selectTravel(state));

  const getDateFormat = (date) => {
    const dateFormat = new Date(date);
    return `${dateFormat.getDate()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}`
  }

  return (
    <div className="details">
      <div className="image-column" >
        <img src={require("../../src/assets/images/origin.gif")} alt="Origin Planet" />
        <img src={require("../../src/assets/images/destination.gif")} alt="Destination Planet" />
      </div>
      <div className="item-details">
        <div>
          <b>Name:</b> {travel.name}
        </div>
        <div>
          <b>Specie:</b> {travel.specie}
        </div>
        <div>
          <b>Departure:</b> {travel.departurePlanet?.name}
        </div>
        <div>
          <b>Destination:</b> {travel.destinationPlanet?.name}
        </div>
        <div>
          <b>Starship:</b> {travel.starship}
        </div>
        <div>
          <b>Seat:</b> {travel.seat}
        </div>
        <div>
          <b>Date:</b> {getDateFormat(travel.date)}
        </div>
        <div className="content-title">
          <img
            src={require("../../src/assets/icons/description.svg")}
            className="content-title-icon"
            alt="Description icon"
            title="Description icon"
          />
          Destination Details
        </div>
        <div>Name: {travel.destinationPlanet?.name}</div>
        <div>Gravity: {travel.destinationPlanet?.gravity}</div>
        <div>Terrain: {travel.destinationPlanet?.terrain}</div>
        <div>Climate: {travel.destinationPlanet?.climate}</div>
      </div>
    </div>
  );
}

function TripSummaryPage() {
  return (
    <div className="trip-review-page">
      <Card
        title="Trip Summary"
        icon={
          <img
            src={require("../../src/assets/icons/details.svg")}
            className="content-title-icon"
            alt="icon description"
            title="icon description"
          />
        }
      >
        <TripDetail />
      </Card>
    </div>
  );
}

export default TripSummaryPage;
