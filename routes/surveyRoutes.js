const mongoose = require("mongoose");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const reqLogin = require("../middlewares/requireLogin");
const reqCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys"); // prevent issue with calling mongoose several times

module.exports = (app) => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thank you for your feedback!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match)
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice,
          };
      })
      .compact() // remove undefined responses
      .uniqBy("email", "surveyId") // remove doubled responses, prevent user for counting his choices several times
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value(); // return a value

    res.send();
  });

  app.post("/api/surveys", reqLogin, reqCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((el) => ({ email: el.trim() })), // return object
      _user: req.user.id,
      dateSent: Date().now,
    });
    //send an email
    const mail = new Mailer(survey, surveyTemplate(survey));

    try {
      await mail.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get("/api/surveys", reqLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(surveys);
  });

  app.post("/api/surveys/delete/:surveyId", async (req, res) => {
    const surveyId = req.params.surveyId;
    await Survey.findByIdAndDelete({ _id: surveyId });
    res.send();
  });
};
