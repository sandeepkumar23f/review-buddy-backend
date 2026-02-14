import generateContent from "../services/ai.service.js";

export const reviewCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required"
      });
    }

    const prompt = `
You are a senior software engineer and expert code reviewer.

User pasted some code.

Your tasks:
1. First detect which programming language it is.
2. Then review the code deeply.
3. Find bugs, bad practices, performance issues.
4. Suggest improvements.
5. Provide fully corrected and optimized code.

Respond strictly in this format:

LANGUAGE DETECTED:
<language name>

ISSUES:
- list issues

IMPROVEMENTS:
- suggestions

FIXED CODE:
\`\`\`
<corrected code>
\`\`\`

Here is the user's code:
${code}
`;

    const aiResponse = await generateContent(prompt);

    res.json({
      success: true,
      review: aiResponse
    });

  } catch (error) {
    console.log("Controller error:", error.message);
    res.status(500).json({
      success: false,
      message: "AI review failed"
    });
  }
};
