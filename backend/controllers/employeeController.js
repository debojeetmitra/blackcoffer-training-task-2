const client = require("../config/elasticsearch");

const createEmployee = async (req, res) => {
    try {
        const employee = req.body;

        const response = await client.index({
            index: "employees",
            document: employee,
        });

        res.status(201).json({
            message: "Employee created successfully",
            id: response._id,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create employee"
        });
    }
};

module.exports = {
    createEmployee,
}