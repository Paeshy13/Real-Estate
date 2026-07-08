"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createListing } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    lat: "",
    lng: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    propertyType: "house",
    imageUrl: "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    setStatus("saving");
    try {
      await createListing(
        {
          title: form.title,
          description: form.description,
          price: Number(form.price),
          address: form.address,
          city: form.city,
          lat: Number(form.lat) || 0,
          lng: Number(form.lng) || 0,
          bedrooms: Number(form.bedrooms),
          bathrooms: Number(form.bathrooms),
          sqft: Number(form.sqft),
          propertyType: form.propertyType,
          images: form.imageUrl ? [form.imageUrl] : [],
        } as any,
        token
      );
      setStatus("saved");
      setForm({ ...form, title: "", description: "", price: "", imageUrl: "" });
    } catch {
      setStatus("error");
    }
  }

  if (!user) return null;

  if (user.role !== "AGENT" && user.role !== "ADMIN") {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-600">
          Only agent accounts can post listings. Sign up as an agent to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Post a New Listing</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border rounded-md px-3 py-2 md:col-span-2"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded-md px-3 py-2 md:col-span-2 h-24"
        />
        <input
          placeholder="Price (USD)"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border rounded-md px-3 py-2"
          required
        />
        <input
          placeholder="Property type (house, apartment, land)"
          value={form.propertyType}
          onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
          className="border rounded-md px-3 py-2"
        />
        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="border rounded-md px-3 py-2 md:col-span-2"
          required
        />
        <input
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="border rounded-md px-3 py-2"
        />
        <input
          placeholder="Image URL (Cloudinary link)"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="border rounded-md px-3 py-2"
        />
        <input
          placeholder="Bedrooms"
          type="number"
          value={form.bedrooms}
          onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
          className="border rounded-md px-3 py-2"
        />
        <input
          placeholder="Bathrooms"
          type="number"
          value={form.bathrooms}
          onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
          className="border rounded-md px-3 py-2"
        />
        <input
          placeholder="Square feet"
          type="number"
          value={form.sqft}
          onChange={(e) => setForm({ ...form, sqft: e.target.value })}
          className="border rounded-md px-3 py-2"
        />

        {status === "error" && (
          <p className="text-red-500 text-sm md:col-span-2">Something went wrong. Try again.</p>
        )}
        {status === "saved" && (
          <p className="text-green-600 text-sm md:col-span-2">Listing posted!</p>
        )}

        <button
          type="submit"
          disabled={status === "saving"}
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 rounded-md md:col-span-2 disabled:opacity-50"
        >
          {status === "saving" ? "Posting..." : "Post Listing"}
        </button>
      </form>
    </div>
  );
}
