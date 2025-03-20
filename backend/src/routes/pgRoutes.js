import express from "express";
import PG from "../models/PG.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, address, rent, contact, college } = req.body;
    if (!name || !address || !rent || !contact || !college) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //if pg exists
    const existingPG = await PG.findOne({
      name,
      address,
      rent,
      contact,
      college,
    });
    if (existingPG) {
      return res.status(400).json({ message: "PG already exists" });
    }

    const newPG = new PG({
      name: name,
      address: address,
      rent: rent,
      contact: contact,
      college: college,
    });
    await newPG.save();

    res.status(201).json({ message: "PG added successfully", pg: newPG });
  } catch (error) {
    res.status(500).json({ message: "Error adding PG", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const pg = await PG.find();
    res.status(200).json(pg);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting PGs", error: error.message });
  }
});

router.get("/:college", async (req, res) => {
  const { college } = req.params;
  try {
    if (!college) {
      return res.status(400).json({ message: "College name is required" });
    }

    const pgs = await PG.find({ college });

    if (pgs.length === 0) {
      return res.status(404).json({ message: "No PGs found for this college" });
    }

    res.status(200).json(pgs);
  } catch (error) {
    res.status(500).json({ message: "Error getting PG near College", error: error.message });
  }
});


router.post("/confirm-residence", async (req, res) => {
  try {
    const { userId, pgId } = req.body;

    if (!userId || !pgId) {
      return res
        .status(400)
        .json({ message: "User ID and PG ID are required" });
    }

    // Find PG by ID
    const pg = await PG.findById(pgId);
    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    // Check if the user already resides in this PG
    if (pg.residents.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User is already a resident of this PG" });
    }

    // Add user to PG's residents list
    pg.residents.push(userId);
    await pg.save();

    res.status(200).json({ message: "Residence confirmed successfully", pg });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error confirming residence", error: error.message });
  }
});

router.get("/:pgId/residents", async (req, res) => {
  try {
    const {pgId} = req.params;
    const pg = await PG.findById(req.params.pgId).populate(
      "residents",
      "fullName email"
    );

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }
    res.status(200).json({ residents: pg.residents });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting residents", error: error.message });
  }
});

router.get("/getConfirmedPG/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user || !user.confirmedPg) {
      return res.json({ confirmedPg: null });
    }

    res.json({ confirmedPg: user.confirmedPg });
  } catch (error) {
    console.error("Error fetching confirmed PG:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
