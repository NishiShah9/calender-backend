const CalenderController = require("../controller/calender");

module.exports = function (app) {
  app.get("/calender", CalenderController.findAll);
  app.post("/calender", CalenderController.create);
  app.put("/calender/:id", CalenderController.update);
  app.delete("/calender/:id", CalenderController.delete);
  app.get("/calender/:id", CalenderController.findById);
};
