import React from "react";
import Head from "next/head";

import TravelForm from "../src/components/travel-form";
import SeatChart from "../src/components/seat-chart";

function Home() {
  return (
    <div className="container">
      <Head>
        <title>Intergalactic Travel</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Book now your intergalactic travel with us."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://infinity-travel.app" />
        <meta
          name="og:title"
          property="og:title"
          content="Intergalactic Travel"
        />
        <meta
          name="og:description"
          property="og:description"
          content="Book now your intergalactic trip with us."
        />
        <meta property="og:image" content="https://infinity-travel.app/" />
        <meta property="og:site_name" content="Infinity Travel" />
        <link rel="canonical" href="https://infinity-travel.app" />
      </Head>

      <main className="homepage">
        <link rel="canonical" href="https://infinity-travel.app/signin" />
        <img
          className="starship-img"
          src={require("../src/assets/images/starship.gif")}
          alt="Starship"
        />
        <SeatChart />
        <TravelForm />
      </main>
    </div>
  );
}

export default Home;
