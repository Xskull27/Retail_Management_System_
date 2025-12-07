import { fetchSales } from "../services/salesService.js";

export const getSales = async (req, res) => {
 

  try {
    const result = await fetchSales(req.query);

    res.json(result);
  } catch (err) {
    console.error("🔥 ERROR INSIDE CONTROLLER:", err); 
    res.status(500).json({ message: "Internal Server Error" });
  }
};

