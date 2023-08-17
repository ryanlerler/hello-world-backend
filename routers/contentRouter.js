const express = require("express");
const router = express.Router();

class ContentRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes = () => {
    router.get("/", this.controller.getAll);
    router.get("/top5", this.controller.getTop5Liked);
    router.get("/category/:categoryId", this.controller.getAllByCategory);
    router.get("/:contentId", this.controller.getOne);
    router.get("/:contentId/likeStatus", this.controller.getLikeStatus);
    router.get("/:contentId/likes", this.controller.getLikeCount);
    router.get("/:contentId/comments", this.controller.getAllComments);

    // router.use(this.checkJwt);

    router.post("/", this.controller.addContent);
    router.post("/:contentId/comments", this.controller.addComment);
    router.post("/:contentId/likes", this.controller.toggleLike);
    router.put("/:contentId", this.controller.editContent);
    router.put("/:contentId/comments/:commentId", this.controller.editComment);
    router.delete(
      "/:contentId/comments/:commentId",
      this.controller.deleteComment
    );
    router.delete("/:contentId", this.controller.deleteContent);
    return router;
  };
}

module.exports = ContentRouter;
