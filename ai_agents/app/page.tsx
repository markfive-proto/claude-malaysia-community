"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useState, useEffect, useRef, useMemo } from "react";
import { Chat } from "@/components/chat";
import { ChatInput } from "@/components/chat-input";
import { ModelSelector } from "@/components/model-selector";
import { SkillsPanel } from "@/components/skills-panel";

interface SkillInfo {
  name: string;
  description: string;
  mode: string;
}

export default function Page() {
  const [model, setModel] = useState("google/gemini-2.5-flash");
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  const [skills, setSkills] = useState<SkillInfo[]>([]);

  // Use refs so the transport body closure always reads latest values
  const modelRef = useRef(model);
  const activeSkillsRef = useRef(activeSkills);
  modelRef.current = model;
  activeSkillsRef.current = activeSkills;

  const transport = useMemo(
    () =>
      new DefaultChatTransport<UIMessage>({
        api: "/api/chat",
        body: () => ({
          model: modelRef.current,
          activeSkills: activeSkillsRef.current,
        }),
      }),
    []
  );

  const { messages, sendMessage, status } = useChat({ transport });

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then(setSkills);
  }, []);

  const toggleSkill = (name: string) => {
    setActiveSkills((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  return (
    <div className="flex h-screen bg-zinc-900 text-zinc-100">
      {/* Sidebar */}
      <div className="w-64 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <h1 className="text-lg font-bold">Research Agent</h1>
        </div>
        <div className="p-4 border-b border-zinc-800">
          <label className="text-sm text-zinc-400 block mb-2">Model</label>
          <ModelSelector value={model} onChange={setModel} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <SkillsPanel
            skills={skills}
            activeSkills={activeSkills}
            onToggle={toggleSkill}
          />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <Chat messages={messages} />
        <ChatInput
          onSend={(text) => sendMessage({ text })}
          disabled={status !== "ready"}
        />
      </div>
    </div>
  );
}
