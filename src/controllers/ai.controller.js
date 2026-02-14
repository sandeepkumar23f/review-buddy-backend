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
You are a senior software engineer and strict code reviewer with 15+ years experience.

User pasted a code snippet.

Your job:
- Carefully analyze the code.
- If the code is already correct and optimized, DO NOT create fake issues.
- Only report real problems if they truly exist.
- If code is perfect, clearly say: "No major issues found. Code is clean and optimized."

Also provide:
- Time Complexity
- Space Complexity
- Improvements only if genuinely needed
- Corrected code only if required

Respond strictly in this format:

REVIEW:
Write 1 short message about overall code quality.

ISSUES:
- Only real issues (if none, write: No major issues found)

COMPLEXITY:
Time Complexity: 
Space Complexity:

IMPROVEMENTS:
- Only real improvements (if none, write: Code is already well optimized)

FIXED CODE:
(If code already perfect, return same code)
\`\`\`
<final code>
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
