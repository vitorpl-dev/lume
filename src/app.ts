import express from "express";

const app = express();

app.get("/", function (req, res) {
	res.send("Olá mundo!");
});

app.listen(3000, () => {
	console.log("Server running in http://localhost:3000");
});
