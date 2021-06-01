const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const reqLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", reqLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 200,
      currency: "PLN",
      description: "2 zł for 1 credit",
      source: req.body.id,
    });
    req.user.credits += 2;
    const user = await req.user.save();
    res.send(user);
  });
};
