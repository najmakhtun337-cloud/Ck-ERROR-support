const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Home
app.get("/", (req, res) => {
    res.send("🚀 CK-ERROR Support Portal API Running");
});

// Server Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
