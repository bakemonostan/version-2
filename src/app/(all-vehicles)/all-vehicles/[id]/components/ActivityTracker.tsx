"use client";
import { useBookingStore } from "@/store/bookingStore";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export const ActivityTracker = () => {
  const pathname = usePathname();
  const router = useRouter();
  const lastActivityTimestamp = useBookingStore(
    (state) => state.lastActivityTimestamp
  );
  const updateActivityTimestamp = useBookingStore(
    (state) => state.updateActivityTimestamp
  );
  const clearStorage = useBookingStore((state) => state.clearStorage);

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const CheckActivityOnBookingPageOnly = () => {
    const isBookingPage = pathname.includes("/all-vehicles/") && pathname.split("/").length > 2;
    return isBookingPage;
  };

  const relevantData = useBookingStore((state) => state.bookingId);

  useEffect(() => {
    console.log(relevantData);
    if (!relevantData && CheckActivityOnBookingPageOnly()) {
      router.push("/all-vehicles");
      return;
    }

    if (!relevantData) {
      return;
    }

    const handleActivity = () => {
      console.log("[ActivityTracker] Detected user activity");
      updateActivityTimestamp();
    };

    if (CheckActivityOnBookingPageOnly()) {
      const events = ["mousedown", "keydown"];
      events.forEach((event) => {
        window.addEventListener(event, handleActivity);
      });
    }

    timeoutRef.current = setInterval(() => {
      console.log(
        "[ActivityTracker] Checking activity status - runs every 4 minutes"
      );
      const inactiveMs = Date.now() - lastActivityTimestamp;
      console.log(
        `[ActivityTracker] Inactive for ${Math.floor(
          inactiveMs / 1000
        )} seconds`
      );

      //  8 minutes
      if (inactiveMs > 8 * 60 * 1000) {
        console.log("[ActivityTracker] Clearing store due to inactivity");
        console.log(relevantData);
        clearStorage(); // Uses store's built-in clear method
      }
    }, 4 * 60 * 1000);

    return () => {
      clearInterval(timeoutRef.current);
      if (CheckActivityOnBookingPageOnly()) {
        const events = ["mousedown", "keydown"];
        events.forEach((event) => {
          window.removeEventListener(event, handleActivity);
        });
      }
    };
  }, [
    lastActivityTimestamp,
    updateActivityTimestamp,
    clearStorage,
    relevantData,
    router,
  ]);

  return null;
};
