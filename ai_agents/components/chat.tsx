"use client";

import type { UIMessage } from "ai";

export function Chat({ messages }: { messages: UIMessage[] }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <div className="text-center text-zinc-500 mt-20">
          <h2 className="text-xl font-semibold mb-2">Research Agent</h2>
          <p>Ask me anything. I&apos;ll search, analyze, and summarize.</p>
        </div>
      )}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-100"
            }`}
          >
            {message.parts.map((part, i) => {
              if (part.type === "text") {
                return (
                  <p key={i} className="whitespace-pre-wrap">
                    {part.text}
                  </p>
                );
              }
              if (part.type.startsWith("tool-")) {
                return (
                  <div
                    key={i}
                    className="mt-2 text-xs bg-zinc-900 rounded p-2 font-mono"
                  >
                    <span className="text-zinc-400">Tool: </span>
                    <span className="text-green-400">
                      {part.type.replace("tool-", "")}
                    </span>
                    {"output" in part && (
                      <pre className="mt-1 text-zinc-300 overflow-x-auto">
                        {JSON.stringify(part.output, null, 2)}
                      </pre>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
