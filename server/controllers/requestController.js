exports.createRequest = (req, res) => {
  console.log("REQ BODY:", req.body); // 🔥 ADD THIS

  const { vehicle_id, issue_type, description, location_text, latitude, longitude } = req.body;
  const user_id = req.user.id;

  const sql = `
    INSERT INTO service_requests
    (user_id, vehicle_id, issue_type, description, location_text, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user_id, vehicle_id, issue_type, description, location_text, latitude, longitude],
    (err, result) => {
      if (err) {
        console.log("SQL ERROR:", err); // 🔥 ADD THIS
        return res.status(500).json(err);
      }

      res.json({ message: "Service request created successfully" });
    }
  );
};