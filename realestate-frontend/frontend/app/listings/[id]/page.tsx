import Image from "next/image";
import { getListing } from "@/lib/api";
import InquiryForm from "@/components/InquiryForm";

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id);
  const mainImage = listing.images?.[0]?.url || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800";

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="relative w-full h-96 rounded-xl overflow-hidden mb-6">
        <Image src={mainImage} alt={listing.title} fill className="object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{listing.title}</h1>
          <p className="text-gray-500 mt-1">{listing.address}</p>
          <p className="text-2xl font-bold text-brand-700 mt-4">
            ${listing.price?.toLocaleString()}
          </p>
          <div className="flex gap-6 mt-4 text-gray-600 text-sm">
            <span>{listing.bedrooms} bedrooms</span>
            <span>{listing.bathrooms} bathrooms</span>
            <span>{listing.sqft} sqft</span>
            <span>{listing.propertyType}</span>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">{listing.description}</p>
        </div>

        <div className="border rounded-xl p-5 h-fit bg-white">
          <h2 className="font-semibold mb-2">Listed by</h2>
          <p className="text-gray-700">{listing.agent?.name}</p>
          <p className="text-gray-500 text-sm mb-4">{listing.agent?.email}</p>
          <InquiryForm listingId={listing.id} />
        </div>
      </div>
    </div>
  );
}
