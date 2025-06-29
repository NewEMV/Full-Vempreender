"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Faq from "@/components/landing/Faq";
import Footer from "@/components/landing/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

function ReferralHandler() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      toast({
        title: "Referral Applied!",
        description: `Welcome! Your referral code "${ref}" has been successfully applied.`,
        duration: 5000,
      });
    }
  }, [searchParams, toast]);

  return null;
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={null}>
        <ReferralHandler />
      </Suspense>
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Faq />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
