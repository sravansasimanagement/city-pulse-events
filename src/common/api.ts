import axios from "axios";

const BASE =
  import.meta.env.VITE_TM_BASE || "https://app.ticketmaster.com/discovery/v2";
const KEY = import.meta.env.VITE_TM_API_KEY;

export async function searchEvents(keyword: string, city: string, page = 0) {
  if (!KEY) {
    return { events: [], page: 0 };
  }

  const params: any = {
    apikey: KEY,
    keyword,
    city,
    size: 20,
    page,
  };

  const resp = await axios.get(`${BASE}/events.json`, { params });
  const data = resp.data;

  const events = (data._embedded?.events || []).map((e: any) => ({
    id: e.id,
    name: e.name,
    url: e.url,
    date: e.dates?.start?.localDate,
    venue: e._embedded?.venues?.[0]?.name,
    city: e._embedded?.venues?.[0]?.city?.name,
    lat: e._embedded?.venues?.[0]?.location?.latitude,
    lon: e._embedded?.venues?.[0]?.location?.longitude,
  }));

  return { events, page: data.page?.number || 0 };
}

export async function getEventById(id: string) {
  if (!KEY) return null;
  const resp = await axios.get(`${BASE}/events/${id}.json`, {
    params: { apikey: KEY },
  });
  return resp.data;
}
