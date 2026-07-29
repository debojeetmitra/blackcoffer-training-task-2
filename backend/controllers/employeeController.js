const client = require("../config/elasticsearch");

const createEmployee = async (req, res) => {
    try {
        const employee = req.body;

        const response = await client.index({
            index: "employees",
            document: employee,
            refresh: true,
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

const getEmployees = async (req, res) => {
    try {
        const response = await client.search({
            index: "employees",
        });

        const employees = response.hits.hits.map((employee) => ({
            id: employee._id,
            ...employee._source,
        }));

        res.status(200).json(employees);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch employees",
        });
    }
}

const searchEmployees = async (req, res) => {
    try {
        const { name } = req.query;

        const response = await client.search({
            index: "employees",
            query: {
                match: {
                    name: name,
                },
            },
        });

        const employees = response.hits.hits.map((employee) => ({
            id: employee._id,
            ...employee._source,
        }));

        res.status(200).json(employees);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to search employees",
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        await client.update({
            index: "employees",
            id: id,
            doc: updatedData,
        });

        res.status(200).json({
            message: "Employee updated successfully",
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update employee"
        })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        await client.delete({
            index: "employees",
            id: id,
            refresh: true,
        });

        res.status(200).json({
            message: "Employee deleted successfully",
        })

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete employee",
        });
    }
}

module.exports = {
    createEmployee,
    getEmployees,
    searchEmployees,
    updateEmployee,
    deleteEmployee
}