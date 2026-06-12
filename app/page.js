"use client";
import { useState, useEffect } from "react";

const voices = [
  { id: "robot", name: "🤖 Robot Voice" },
  { id: "deep", name: "🔥 Deep Voice" },
  { id: "female", name: "👧 Female Voice" },
  { id: "male", name: "👦 Male Voice" },
];

export default function Home() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("robot");
  const [count, setCount] = useState(6);
  const [audioUrl, setAudioUrl] = useState(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("voice_count");
    if (saved) setCount(parseInt(saved));
  }, []);

  const generateVoice = () => {
    if (count <= 0) {
      setBlocked(true);
      return;
    }

    // fake audio (later connect AI API like ElevenLabs)
    const fakeAudio =
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    setAudioUrl(fakeAudio);

    const newCount = count - 1;
    setCount(newCount);
    localStorage.setItem("voice_count", newCount);

    setBlocked(false);
  };

  const watchAd = () => {
    const newCount = count + 3;
    setCount(newCount);
    localStorage.setItem("voice_count", newCount);
    setBlocked(false);
  };

  return (
    <div style={{ padding: 30, textAlign: "center", fontFamily: "Arial" }}>
      <h1>🎤 VoiceNova AI</h1>
      <p>Text to Voice & Voice Changer</p>

      <p>🆓 Uses left today: {count}</p>

      <textarea
        rows={5}
        cols={40}
        placeholder="Write your text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <select value={voice} onChange={(e) => setVoice(e.target.value)}>
        {voices.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={generateVoice}>🎤 Generate Voice</button>

      {blocked && (
        <div style={{ marginTop: 20 }}>
          <p>⚠️ No free uses left</p>
          <button onClick={watchAd}>📺 Watch Ad +3 uses</button>
        </div>
      )}

      {audioUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>🔊 Result</h3>

          <audio controls src={audioUrl}></audio>

          <br /><br />

          <a href={audioUrl} download="voice.mp3">
            📥 Download MP3
          </a>
        </div>
      )}
    </div>
  );
}
