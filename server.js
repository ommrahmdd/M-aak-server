let express = require("express");
let dotenv = require("dotenv");
let cors = require("cors");
dotenv.config({ path: "./config.env" });
let stripe = require("stripe")(process.env.STRIPE_KEY);
let app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/payment", async (req, res) => {
  let { amount } = req.body;
  try {
    let paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    console.log(paymentIntent.client_secret);
    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server Listen");
});
