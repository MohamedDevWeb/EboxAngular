const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 4242;

app.use(cors());
app.use(express.json());

const OPENROUTER_KEY = "sk-or-8f7b4d6f-5b80-42a9-940e-52f8e4b7a83c";
const url = "https://openrouter.ai/api/v1/chat/completions";

app.post('/api/ia', async (req, res) => {
  try {
    const userText = req.body.userText || "";
    const body = {
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Tu es l'assistant officiel d'une plateforme médicale belge. Sois clair, bienveillant, jamais alarmiste. Ne donne aucun diagnostic, uniquement des conseils ou oriente vers le médecin." },
        { role: "user", content: userText }
      ]
    };
    const apiRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "HTTP-Referer": "https://ebox-demo",
        "X-Title": "eBox Santé+"
      },
      body: JSON.stringify(body)
    });
    if (!apiRes.ok) throw new Error(await apiRes.text());
    const data = await apiRes.json();
    res.json({ text: data.choices[0].message.content.trim() });
  } catch (err) {
    res.json({ text: "L’IA est temporairement indisponible, veuillez réessayer plus tard." });
  }
});

app.listen(PORT, () => {
  console.log('Serveur IA prêt sur http://localhost:' + PORT);
});
