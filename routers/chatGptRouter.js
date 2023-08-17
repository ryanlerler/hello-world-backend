const express = require("express");
const router = express.Router();

class CategoryRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes = () => {
    router.post("/", this.controller.prompt);
    return router;
  };
}

module.exports = CategoryRouter;
