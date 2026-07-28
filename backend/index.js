const express = require('express');
const cors = require('cors');
require("dotenv").config();

const client = require("./config/elasticsearch")
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        message: "Backend is running sucessfully",
    });
});

async function connectElasticsearch() {
    try {
        await client.info();
        console.log("Connected to Elastic Search");

    } catch (error) {
        console.error("Elastic search connection failed");
        console.error(error.message)
    }
}

async function createEmployeeIndex() {
    try {
        const indexExists = await client.indices.exists({
            index: "employees",
        })

        if (!indexExists) {
            await client.indices.create({
                index: "employees",
            });

            console.log("Employees index created");
        } else {
            console.log("Employees index already exists");
        }
    } catch (error) {
        console.error("Error creating employees index");
        console.error(error.message);
    }
}

app.listen(PORT, async () => {
    console.log(`Server is running on PORT ${PORT}`);

    await connectElasticsearch();
    await createEmployeeIndex();
});