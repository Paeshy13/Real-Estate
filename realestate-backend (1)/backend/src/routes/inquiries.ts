import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// Buyer sends an inquiry about a listing
router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const { listingId, message } = req.body;
    if (!listingId || !message) {
      return res.status(400).json({ error: "listingId and message are required" });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        listingId,
        message,
        buyerId: req.userId!,
      },
    });

    res.status(201).json(inquiry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send inquiry" });
  }
});

// Agent views inquiries for one of their listings
router.get("/listing/:listingId", authenticate, async (req: AuthRequest, res) => {
  try {
    const listing = await prisma.listing.findUnique({ where: { id: req.params.listingId } });
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    if (listing.agentId !== req.userId && req.userRole !== "ADMIN") {
      return res.status(403).json({ error: "Not your listing" });
    }

    const inquiries = await prisma.inquiry.findMany({
      where: { listingId: req.params.listingId },
      include: { buyer: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });

    res.json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

export default router;
