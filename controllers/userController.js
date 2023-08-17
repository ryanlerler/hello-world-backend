const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(model) {
    super(model);
  }

  getOne = async (req, res) => {
    const { email } = req.query;
    try {
      const user = await this.model.findOne({
        where: {
          email,
        },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  signUp = async (req, res) => {
    const { email, nickname, profilePicUrl } = req.body;
    try {
      const [user] = await this.model.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          nickname,
          profilePicUrl,
        },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  updateProfile = async (req, res) => {
    try {
      const userToEdit = await this.model.findOne({
        where: {
          email: req.body.email,
        },
      });

      const { nickname, profilePicUrl, country } = req.body;
      const updatedUser = await userToEdit.update({
        nickname,
        profilePicUrl,
        country,
      });
      return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = UserController;
