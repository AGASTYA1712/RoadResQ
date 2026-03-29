const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createRequest, getMyRequests } = require("../controllers/requestController");

router.post("/", auth, createRequest);
router.get("/my", auth, getMyRequests);

module.exports = router;