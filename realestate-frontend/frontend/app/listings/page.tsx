import { getListings } from "@/lib/api";
import ListingCard from "@/components/ListingCard";
import SearchFilters from "@/components/SearchFilters";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  let data: Awaited<ReturnType<typeof getListings>> | null = null;
  let error = false;

  try {
    data = await getListings(searchParams);
  } catch {
    error = true;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Browse Properties</h1>
      <SearchFilters />

      {error && (
        <p className="text-red-500">
          Couldn't reach the backend API. Make sure NEXT_PUBLIC_API_URL is set correctly.
        </p>
      )}

      {data && data.listings.length === 0 && !error && (
        <p className="text-gray-500">No listings match your search.</p>
      )}

      {data && data.listings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
