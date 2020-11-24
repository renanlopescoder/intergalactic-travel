import React from "react";

export default function Ticket({trip}) {
  const formatDate = (createdAt) => {
    const date = new Date(
      (createdAt.seconds + createdAt.nanoseconds * 10 ** -9) * 1000,
    );
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatPlanetShortName = (name) => {
    return name.toUpperCase().slice(0, 3);
  }

  return (
    <div className="ticket" >
      <div className="container">
        <header>
          <div className="company-name">
            Intergalactic Travel
          </div>
          <div className="gate">
            <div>
              Gate
            </div>
            <div>
              B4
            </div>
          </div>
        </header>
        <section className="platforms">
          <div className="platform">
            <div className="platform-name">
              {trip.departurePlanet.name}
            </div>
            <div className="platform-code">
              {formatPlanetShortName(trip.departurePlanet.name)}
            </div>
            <div className="dep-arr-label">
              Departing
            </div>
            <div className="time">
              {formatDate(trip.date)}
            </div>
          </div>
          <div className="platform">
            <div className="platform-name">
              {trip.destinationPlanet.name}
            </div>
            <div className="platform-code">
            {formatPlanetShortName(trip.destinationPlanet.name)}
            </div>
            <div className="dep-arr-label">
              Arriving
            </div>
            <div className="time">
              {formatDate(trip.date)}
            </div>
          </div>
        </section>
        <section className="place">
          <div className="place-block">
            <div className="place-label">
              Starship
            </div>
            <div className="place-value">
              {trip.starship}
            </div>
          </div>
          <div className="place-block">
            <div className="place-label">
              Name
            </div>
            <div className="place-value">
              {trip.name}
            </div>
          </div>
          <div className="place-block">
            <div className="place-label">
              Species
            </div>
            <div className="place-value">
              {trip.specie}
            </div>
          </div>
          <div className="place-block">
            <div className="place-label">
              Seat
            </div>
            <div className="place-value">
              {trip.seat}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
