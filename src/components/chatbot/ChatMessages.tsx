"use client";

import { type LegacyRef, forwardRef } from 'react';
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Message = {
  role: "user" | "bot";
  content: string;
};

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
};

const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(({ messages, isLoading }, ref) => {
  return (
    <div ref={ref} className="space-y-6 pr-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex items-start gap-3",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          {message.role === "bot" && (
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          )}
          <div
            className={cn(
              "max-w-xs rounded-lg p-3 text-sm md:max-w-md lg:max-w-lg",
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            )}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          {message.role === "user" && (
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="max-w-xs rounded-lg bg-secondary p-3 text-sm md:max-w-md lg:max-w-lg">
            <div className="flex items-center justify-center space-x-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-0"></span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-150"></span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-300"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

ChatMessages.displayName = "ChatMessages";

export default ChatMessages;
