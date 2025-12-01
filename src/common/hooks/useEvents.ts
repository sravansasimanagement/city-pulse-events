import { useState } from "react";

import { searchEvents } from "../api";

export function useEvents() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<any[]>([]);

  async function fetchEvents(keyword: string, city: string) {
    setLoading(true);
    try {
      const res = await searchEvents(keyword, city);
      setEvents(res.events);
    } finally {
      setLoading(false);
    }
  }

  return { events, loading, fetchEvents };
}
