import Link from "next/link";
import { getListings } from "@/lib/api";
import ListingCard from "@/components/ListingCard";

export default async function HomePage() {
  let featured: Awaited<ReturnType<typeof getListings>> | null = null;
  try {
    featured = await getListings({ limit: "3" });
  } catch {
    featured = null;
  }

  return (
    <div>
      <section className="bg-brand-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Find Your Next Home</h1>
        <p className="text-brand-50 mb-8 max-w-xl mx-auto">
          Browse verified listings from trusted agents — houses, apartments, and land for sale or rent.
        </p>
        <Link
          href="/listings"
          className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100"
        >
          Browse Listings
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>
        {featured && featured.listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No listings yet — once the backend is connected and has data, they'll show up here.
          </p>
        )}
      </section>
    </div>
  );
}
