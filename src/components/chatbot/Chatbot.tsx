"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Chatbot() {
  const chatbotUrl = "/chatbot";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        asChild
        size="icon"
        className="h-14 w-14 rounded-full bg-primary shadow-lg transition-transform hover:scale-110 hover:bg-primary/90"
        aria-label="Abrir chat"
      >
        <Link href={chatbotUrl} target="_blank" rel="noopener noreferrer">
          <MessageSquare className="h-7 w-7" />
        </Link>
      </Button>
    </div>
  );
}
