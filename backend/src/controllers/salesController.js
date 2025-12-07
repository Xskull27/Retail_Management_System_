import { fetchSales } from "../services/salesService.js";

export const getSales = async (req, res) => {
  console.log("Incoming request received");  // <-- DEBUG LOG

  try {
    console.log("Query params:", req.query);  // <-- DEBUG LOG

    const result = await fetchSales(req.query);

    console.log("Service result OK");  // <-- DEBUG LOG

    res.json(result);
  } catch (err) {
    console.error("🔥 ERROR INSIDE CONTROLLER:", err);  // <-- MUST SHOW ERROR
    res.status(500).json({ message: "Internal Server Error" });
  }
};

