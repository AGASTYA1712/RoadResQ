const db = require("../config/db");

// ADD VEHICLE
exports.addVehicle = (req, res) => {
  const { vehicle_number, vehicle_type, brand, model, fuel_type } = req.body;
  const user_id = req.user.id;

  const sql = `
    INSERT INTO vehicles (user_id, vehicle_number, vehicle_type, brand, model, fuel_type)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [user_id, vehicle_number, vehicle_type, brand, model, fuel_type], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Vehicle added successfully" });
  });
};

// GET USER VEHICLES
exports.getVehicles = (req, res) => {
  db.query("SELECT * FROM vehicles WHERE user_id = ?", [req.user.id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};