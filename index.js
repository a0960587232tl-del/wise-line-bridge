import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const LINE_TOKEN = process.env.LINE_TOKEN;

app.post("/wise/alert", async (req, res) => {
  const msg =
    `【WISE 警報】\n` +
    `設備：${req.body.device}\n` +
    `事件：${req.body.event}\n` +
    `數值：${req.body.value}\n` +
    `時間：${req.body.time}`;

  await fetch("https://api.line.me/v2/bot/message/broadcast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${LINE_TOKEN}`
    },
    body: JSON.stringify({
      messages: [{ type: "text", text: msg }]
    })
  });

  res.send("OK");
});

app.listen(process.env.PORT || 3000);
