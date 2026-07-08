import Link from "next/link";
import Image from "next/image";
import { Listing } from "@/lib/api";

export default function ListingCard({ listing }: { listing: Listing }) {
  const mainImage = listing.images?.[0]?.url || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600";

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="block rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
    >
      <div className="relative w-full h-52">
        <Image src={mainImage} alt={listing.title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
        <p className="text-gray-500 text-sm truncate">{listing.address}</p>
        <p className="font-bold text-brand-700 mt-2">
          ${listing.price?.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {listing.bedrooms} bd · {listing.bathrooms} ba · {listing.sqft} sqft
        </p>
      </div>
    </Link>
  );
}
