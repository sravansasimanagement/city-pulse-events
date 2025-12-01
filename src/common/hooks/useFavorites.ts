import { useEffect, useState } from "react";

const KEY = "cp_favs_v1";

export function useFavorites() {
  const [items, setItems] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  function toggle(id: string) {
    setItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function isFav(id: string) {
    return items.includes(id);
  }

  return { items, toggle, isFav };
}
