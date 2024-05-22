// pages/api/sendMessageToUserInGroup.js

export default async function handler(req, res) {
  const { message, userId } = req.body;

  const CALLMEBOT_API_URL = `https://api.callmebot.com/telegram/group.php`;
  const CALLMEBOT_API_KEY = `LTQyMDIyNjczNDQ`;

  try {
    const response = await fetch(
      `${CALLMEBOT_API_URL}?apikey=${CALLMEBOT_API_KEY}&text=${encodeURIComponent(
        `@${userId} ${message}`
      )}&version=v2`,
      {
        method: "GET",
      }
    );

    const data = await response.text();
    res.status(200).json({ result: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
