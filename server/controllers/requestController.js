const db = require("../config/db");

// CREATE SERVICE REQUEST
exports.createRequest = (req, res) => {
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
        console.log("Create Request Error:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "Service request created successfully" });
    }
  );
};

// GET USER REQUESTS
exports.getMyRequests = (req, res) => {
  const sql = `
    SELECT sr.*, v.vehicle_number, v.brand, v.model
    FROM service_requests sr
    JOIN vehicles v ON sr.vehicle_id = v.id
    WHERE sr.user_id = ?
    ORDER BY sr.created_at DESC
  `;

  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      console.log("Get Requests Error:", err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
};