const db = require("../db/models/index");

const BaseController = require("./baseController");

class ContentController extends BaseController {
  constructor(model, userModel, categoryModel, likeModel, commentModel) {
    super(model);
    this.userModel = userModel;
    this.categoryModel = categoryModel;
    this.likeModel = likeModel;
    this.commentModel = commentModel;
  }

  getAll = async (req, res) => {
    try {
      const { title, sort } = req.query;
      const data = await this.model.findAll({
        include: [this.categoryModel, this.userModel],
        order: [["id", "DESC"]],
      });

      let filteredData = data;

      if (title) {
        filteredData = data.filter((item) =>
          item.title.toLowerCase().includes(title)
        );
      }

      if (sort === "asc") {
        filteredData = filteredData.sort((a, b) => a.createdAt - b.createdAt);
      }

      if (sort === "desc") {
        filteredData = filteredData.sort((a, b) => b.createdAt - a.createdAt);
      }

      return res.json(filteredData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  getAllByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
      const content = await this.model.findAll({
        where: {
          categoryId,
        },
        include: this.userModel,
        order: [["id", "DESC"]],
      });
      return res.json(content);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOne = async (req, res) => {
    const { contentId } = req.params;
    try {
      const content = await this.model.findByPk(contentId, {
        include: [this.categoryModel, this.userModel],
      });
      return res.json(content);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addContent = async (req, res) => {
    try {
      const {
        title,
        description,
        videoUrl,
        photoUrl,
        externalReferenceUrl,
        categoryId,
        email,
      } = req.body;

      const [user] = await this.userModel.findOrCreate({
        where: {
          email,
        },
      });

      const newContent = await this.model.create({
        title,
        description,
        videoUrl,
        photoUrl,
        externalReferenceUrl: externalReferenceUrl || null,
        categoryId,
        userId: user.id,
      });

      const selectedCategory = await this.categoryModel.findByPk(categoryId);
      await newContent.setCategory(selectedCategory);

      return res.json(newContent);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getLikeStatus = async (req, res) => {
    const { contentId } = req.params;
    const { email } = req.query;

    try {
      const user = await this.userModel.findOne({
        where: {
          email,
        },
      });

      const like = await this.likeModel.findOne({
        where: {
          userId: user.id,
          contentId,
        },
      });

      if (!like) {
        return res.json({ likeStatus: false });
      }

      return res.json({ likeStatus: like.likeStatus });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  getLikeCount = async (req, res) => {
    const { contentId } = req.params;
    try {
      const likes = await this.likeModel.findAll({
        where: {
          contentId,
          likeStatus: true,
        },
      });
      return res.json(likes.length);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  toggleLike = async (req, res) => {
    const { contentId } = req.params;
    const { email } = req.body;
    try {
      const user = await this.userModel.findOne({
        where: {
          email,
        },
      });

      let existingLike = await this.likeModel.findOne({
        where: {
          contentId,
          userId: user.id,
        },
      });

      if (!existingLike) {
        // If the like doesn't exist, create a new one with likeStatus true
        const newLike = await this.likeModel.create({
          likeStatus: true,
          contentId,
          userId: user.id,
        });
        return res.json(newLike);
      } else {
        // If the like exists, toggle its likeStatus
        await existingLike.update({
          likeStatus: !existingLike.likeStatus,
        });
        return res.json(existingLike);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllComments = async (req, res) => {
    const { contentId } = req.params;
    try {
      const allComments = await this.commentModel.findAll({
        where: {
          contentId,
        },
        order: [["id", "DESC"]],
        include: this.userModel,
      });
      return res.json(allComments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addComment = async (req, res) => {
    const { contentId } = req.params;
    const { text, email } = req.body;
    try {
      const [user] = await this.userModel.findOrCreate({
        where: {
          email,
        },
      });

      const newComment = await this.commentModel.create({
        text,
        contentId,
        userId: user.id,
      });

      // Associate comment with user and return the comment with user so both the comment & user details may be rendered immediately in the frontend
      const commentWithUser = await this.commentModel.findByPk(newComment.id, {
        include: this.userModel,
      });

      return res.json(commentWithUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  editContent = async (req, res) => {
    const { contentId } = req.params;
    try {
      const contentToEdit = await this.model.findByPk(contentId);
      await contentToEdit.update({
        ...req.body,
      });
      const selectedCategory = await this.categoryModel.findByPk(
        req.body.categoryId
      );
      await contentToEdit.setCategory(selectedCategory);

      const editedContents = await this.model.findAll({
        include: this.categoryModel,
        order: [["id", "ASC"]],
      });
      return res.json(editedContents);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  editComment = async (req, res) => {
    const { contentId, commentId } = req.params;
    const { text } = req.body;
    try {
      const commentToEdit = await this.commentModel.findOne({
        where: {
          contentId,
          id: commentId,
        },
      });
      const updatedComment = await commentToEdit.update({ text });
      const commentWithUser = await this.commentModel.findByPk(
        updatedComment.id,
        {
          include: this.userModel,
        }
      );
      return res.json(commentWithUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  deleteComment = async (req, res) => {
    const { contentId, commentId } = req.params;
    try {
      await this.commentModel.destroy({
        where: {
          id: commentId,
          contentId,
        },
      });
      return res.json("deleted");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  deleteContent = async (req, res) => {
    const { contentId } = req.params;
    try {
      // Delete like and comment associated 1st only then the content can be deleted
      await this.likeModel.destroy({
        where: {
          contentId,
        },
      });

      await this.commentModel.destroy({
        where: {
          contentId,
        },
      });

      await this.model.destroy({
        where: {
          id: contentId,
        },
      });
      return res.json("deleted");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getTop5Liked = async (req, res) => {
    try {
      const contentsWithLikes = await this.model.findAll({
        include: [
          {
            model: this.likeModel,
            where: { likeStatus: true },
          },
        ],
      });

      // Calculate the like count for each content
      const contentsWithLikeCounts = contentsWithLikes.map((content) => ({
        ...content.toJSON(),
        likeCount: content.likes.length,
      }));

      contentsWithLikeCounts.sort((a, b) => b.likeCount - a.likeCount);

      const top5LikedContents = contentsWithLikeCounts.slice(0, 5);

      return res.json(top5LikedContents);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = ContentController;
