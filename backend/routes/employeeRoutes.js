const express = require("express");

const {
    createEmployee,
    getEmployees,
    searchEmployees,
    updateEmployee,
    deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.get("/search", searchEmployees);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router