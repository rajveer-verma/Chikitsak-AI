import { useState, useEffect } from "react";

export const useTextToSpeech = () => {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      setSupported(true);
    }
  }, []);

  const speak = (text: string) => {
    if (!supported) return;

    stop(); // cancel any current speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (!supported) return;

    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return { speak, stop, speaking, supported };
};
