const fetch = require('node-fetch'); // You can also use native fetch in newer Node versions

exports.handler = async () => {
  const deployHookURL = "https://api.netlify.com/build_hooks/687c1870e81937c2e94d9c35";

  try {
    const response = await fetch(deployHookURL, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Failed to trigger deploy: ${response.statusText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "✅ Weekly rebuild triggered successfully!" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "🚨 Rebuild failed", details: err.message }),
    };
  }
};
