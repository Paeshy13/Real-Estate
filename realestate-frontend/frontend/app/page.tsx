import Link from "next/link";
import { getListings } from "@/lib/api";
import ListingCard from "@/components/ListingCard";
import GridMotion from "@/components/GridMotion";

const heroItems = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
  "Luxury living",
  "Smart investments",
  "Find your forever home",
  "<div key=\"custom\">Modern spaces</div>",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=900&q=80",
  "Your next chapter starts here"
];

export default async function HomePage() {
  let featured: Awaited<ReturnType<typeof getListings>> | null = null;
  try {
    featured = await getListings({ limit: "3" });
  } catch {
    featured = null;
  }

  return (
    <div className="min-h-screen bg-[#0b0d12] text-white">
      <section className="relative isolate overflow-hidden min-h-[640px] bg-[#0b0d12]">
        <div className="absolute inset-0 z-0 opacity-95">
          <GridMotion
            items={heroItems}
            rows={5}
            aspectRatio={1.2}
            gap={16}
            radius={18}
            angle={-12}
            tilt={0}
            speed={22}
            direction="alternate"
            parallax={0.5}
            spotlight={0.72}
            dim={0.35}
            fade={0.6}
            grayscale={false}
            className="h-[640px] w-full"
            theme="dark"
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.16),_transparent_45%)]" />

        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-6xl items-center px-6 py-20">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 backdrop-blur-sm">
              Curated homes, smarter decisions
            </p>
            <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-white md:text-6xl">
              Find a home that feels like your next chapter.
            </h1>
            <p className="mb-8 max-w-xl text-lg text-slate-200">
              Browse verified listings from trusted agents — including luxury residences, family homes,
              and high-growth investment opportunities across the city.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/listings"
                className="rounded-md bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Browse Listings
              </Link>
              <Link
                href="/dashboard"
                className="rounded-md border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Agent Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">Featured</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Popular Properties</h2>
          </div>
        </div>
        {featured && featured.listings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featured.listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-slate-600">
            No listings yet — once the backend is connected and has data, they'll show up here.
          </p>
        )}
      </section>
    </div>
  );
}
