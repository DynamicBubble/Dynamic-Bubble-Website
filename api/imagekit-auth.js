const crypto = require("crypto");

module.exports = (req, res) => {
    if (req.method !== "GET") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey) {
        res.status(500).json({ error: "Missing IMAGEKIT_PRIVATE_KEY" });
        return;
    }

    const token = crypto.randomUUID
        ? crypto.randomUUID()
        : crypto.randomBytes(16).toString("hex");
    const expire = Math.floor(Date.now() / 1000) + 60 * 30; // 30 minutes
    const signature = crypto
        .createHmac("sha1", privateKey)
        .update(token + expire)
        .digest("hex");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ token, expire, signature });
};
