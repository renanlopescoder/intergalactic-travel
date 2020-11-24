import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Ticket from "../../src/components/ticket";
import {
  selectCurrentUser,
} from "../../src/redux/user/user.selectors";

export default function HistoryPage() {
  const user = useSelector((state) => selectCurrentUser(state));
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
        router.push("/signin");
    } else if (user.history.length === 0) {
      router.push("/");
    }
    
  }, [user]);

  return (
    <div className="history-page">
      <link rel="canonical" href="https://infinity-travel.app/history" />
      {user?.history.map((trip) => {
        const key = trip.date.seconds + trip.date.nanoseconds;
        return (
          <Ticket
            key={key}
            trip={trip}
          />
        );
      })}
    </div>
  );
}
