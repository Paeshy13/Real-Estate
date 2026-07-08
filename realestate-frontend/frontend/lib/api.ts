const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  lat: number;
  lng: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  images: { id: string; url: string; order: number }[];
  agent?: { name: string; email: string };
  createdAt: string;
}

export interface ListingsResponse {
  listings: Listing[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getListings(
  params: Record<string, string> = {}
): Promise<ListingsResponse> {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/api/listings?${query}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
}

export async function getListing(id: string): Promise<Listing> {
  const res = await fetch(`${API_URL}/api/listings/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch listing");
  return res.json();
}

export async function createListing(data: Partial<Listing>, token: string) {
  const res = await fetch(`${API_URL}/api/listings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create listing");
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function signup(email: string, password: string, name: string, role: string) {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, role }),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

export async function sendInquiry(listingId: string, message: string, token: string) {
  const res = await fetch(`${API_URL}/api/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ listingId, message }),
  });
  if (!res.ok) throw new Error("Failed to send inquiry");
  return res.json();
}
