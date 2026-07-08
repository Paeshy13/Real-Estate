"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");

  function applyFilters(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (city) params.set("city", city);
    router.push(`/listings?${params.toString()}`);
  }

  return (
    <form
      onSubmit={applyFilters}
      className="flex flex-wrap gap-3 items-end bg-white border border-gray-200 rounded-xl p-4 mb-6"
    >
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">City</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g. Nairobi"
          className="border rounded-md px-3 py-2 text-sm w-40"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Min Price</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-32"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-32"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Bedrooms</label>
        <select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-28"
        >
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-5 py-2 rounded-md"
      >
        Search
      </button>
    </form>
  );
}
