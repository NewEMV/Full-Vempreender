"use client";

import { type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
};

export default function ChatInput({ value, onChange, onSubmit, isLoading }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <Textarea
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        className="flex-1 resize-none bg-background/80"
        rows={1}
        disabled={isLoading}
        aria-label="Chat input"
      />
      <Button
        type="submit"
        size="icon"
        className="shrink-0"
        disabled={isLoading || value.trim().length === 0}
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
