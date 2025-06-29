"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, MessageSquare, X } from "lucide-react";

import { chatbotQualifyLeads } from "@/ai/flows/chatbot-qualify-leads";
import { chatbotInitialPrompt } from "@/ai/flows/chatbot-initial-prompt";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInput from "./ChatInput";
import ChatMessages, { type Message } from "./ChatMessages";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
       const scrollableViewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
       if (scrollableViewport) {
         scrollableViewport.scrollTop = scrollableViewport.scrollHeight;
       }
    }, 0);
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      chatbotInitialPrompt({ userName: "there" })
        .then((response) => {
          setMessages([
            { role: "bot", content: response.greeting },
          ]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length === 0 || isLoading) return;

    const newUserMessage: Message = { role: "user", content: inputValue };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const conversationHistory = newMessages.slice(0, -1).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await chatbotQualifyLeads({
        userInput: inputValue,
        conversationHistory,
      });

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: response.chatbotResponse },
      ]);

      if (response.isLeadQualified) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: `Great news! Based on our conversation, you seem like a qualified lead. Reason: ${response.qualificationReason}` },
        ]);
      }
    } catch (error) {
      console.error("Error calling chatbot AI:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I'm having trouble connecting. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-primary shadow-lg transition-transform hover:scale-110 hover:bg-primary/90"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <MessageSquare className="h-7 w-7" />
          )}
        </Button>
      </div>

      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 transition-all duration-300 ease-in-out",
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <Card className="h-[60vh] w-[90vw] max-w-sm flex flex-col bg-background/80 backdrop-blur-lg border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot className="text-primary" /> Vempreender AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea ref={scrollAreaRef} className="h-full">
              <ChatMessages messages={messages} isLoading={isLoading} />
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <ChatInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSubmit={handleSendMessage}
              isLoading={isLoading}
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
