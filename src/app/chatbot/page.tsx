
"use client";

import { useState, FormEvent, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { chatbotQualifyLeads } from "@/ai/flows/chatbot-qualify-leads";
import ChatInput from "@/components/chatbot/ChatInput";
import ChatMessages, { Message } from "@/components/chatbot/ChatMessages";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/components/icons/Logo";

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting from the bot
    setMessages([
      {
        role: "bot",
        content: "Olá! Sou o assistente virtual da Vempreender. Como posso te ajudar hoje?",
      },
    ]);
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput("");

    try {
      const conversationHistory = messages.map(m => ({
        role: m.role as 'user' | 'bot',
        content: m.content
      }));

      const response = await chatbotQualifyLeads({ 
        userInput: input,
        conversationHistory 
      });
      
      const botMessage: Message = {
        role: "bot",
        content: response.chatbotResponse,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      const errorMessage: Message = {
        role: "bot",
        content: "Desculpe, estou com problemas para me conectar. Tente novamente mais tarde.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex items-center justify-center p-4 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <Logo />
      </header>
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
           <div className="container mx-auto max-w-3xl py-6 px-4">
              <ChatMessages messages={messages} isLoading={isLoading} />
           </div>
        </ScrollArea>
      </main>
      <footer className="p-4 border-t border-border/50 bg-background/80 backdrop-blur-lg">
         <div className="container mx-auto max-w-3xl">
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </footer>
    </div>
  );
}

// Helper component to use useSearchParams
export default function ChatbotPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ChatPage />
      </Suspense>
    );
}