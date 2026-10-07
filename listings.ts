import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// GET /api/listings?minPrice=&maxPrice=&bedrooms=&propertyType=&city=&page=&limit=
router.get("/", async (req, res) => {
  try {
    const { minPrice, maxPrice, bedrooms, propertyType, city, page = "1", limit = "12" } = req.query;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Number(limit));

    const where: any = { status: "active" };
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }
    if (bedrooms) where.bedrooms = { gte: Number(bedrooms) };
    if (propertyType) where.propertyType = String(propertyType);
    if (city) where.city = { contains: String(city), mode: "insensitive" };

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: { images: { orderBy: { order: "asc" } } },
        orderBy: { createdAt: "desc" },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.listing.count({ where }),
    ]);

    res.json({ listings, total, page: pageNum, totalPages: Math.ceil(total / limitNum) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: req.params.id },
      include: {
        images: { orderBy: { order: "asc" } },
        agent: { select: { id: true, name: true, email: true } },
      },
    });
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch listing" });
  }
});

// Agents only
router.post("/", authenticate, requireRole("AGENT", "ADMIN"), async (req: AuthRequest, res) => {
  try {
    const {
      title, description, price, address, city, lat, lng,
      bedrooms, bathrooms, sqft, propertyType, images = [],
    } = req.body;

    if (!title || !price || !address) {
      return res.status(400).json({ error: "title, price, and address are required" });
    }

    const listing = await prisma.listing.create({
      data: {
        title, description, price, address, city, lat, lng,
        bedrooms, bathrooms, sqft, propertyType,
        agentId: req.userId!,
        images: {
          create: images.map((url: string, i: number) => ({ url, order: i })),
        },
      },
      include: { images: true },
    });

    res.status(201).json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create listing" });
  }
});

router.put("/:id", authenticate, requireRole("AGENT", "ADMIN"), async (req: AuthRequest, res) => {
  try {
    const listing = await prisma.listing.findUnique({ where: { id: req.params.id } });
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    if (listing.agentId !== req.userId && req.userRole !== "ADMIN") {
      return res.status(403).json({ error: "Not your listing" });
    }

    const updated = await prisma.listing.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update listing" });
  }
});

router.delete("/:id", authenticate, requireRole("AGENT", "ADMIN"), async (req: AuthRequest, res) => {
  try {
    const listing = await prisma.listing.findUnique({ where: { id: req.params.id } });
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    if (listing.agentId !== req.userId && req.userRole !== "ADMIN") {
      return res.status(403).json({ error: "Not your listing" });
    }

    await prisma.listing.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete listing" });
  }
});

// Agent's own listings
router.get("/agent/mine", authenticate, requireRole("AGENT", "ADMIN"), async (req: AuthRequest, res) => {
  const listings = await prisma.listing.findMany({
    where: { agentId: req.userId! },
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(listings);
});

export default router;
