const BaseController = require("./baseController");

const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

class ChatGptController extends BaseController {
  constructor(model) {
    super(model);
  }

  prompt = async (req, res) => {
    try {
      const { conversation } = req.body;

      const { data } = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: conversation,
      });

      return res.json(data.choices[0].message.content);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = ChatGptController;
