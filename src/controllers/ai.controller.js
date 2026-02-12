import generateContent from "../services/ai.service.js";

export const getResponse = async (req, res) => {
  try {
    const prompt = req.query.prompt || "Explain AI";

    const aiResponse = await generateContent(prompt);

    res.json({
      success: true,
      response: aiResponse
    });

  } catch (error) {
    console.log("Controller error:", error.message);
    res.status(500).json({
      success: false,
      message: "AI failed"
    });
  }
};
