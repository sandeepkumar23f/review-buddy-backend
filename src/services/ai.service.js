import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const generateContent = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are an expert code reviewer and senior developer."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.log("OpenRouter error:", error.response?.data || error.message);
    throw new Error("AI error");
  }
};

export default generateContent;
