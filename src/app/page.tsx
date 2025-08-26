
"use client";

import Hero from "@/components/landing/Hero";
import Solucoes from "@/components/landing/Solucoes";
import ComoFunciona from "@/components/landing/ComoFunciona";
import AtraiaClientes from "@/components/landing/AtraiaClientes";
import NossoPlano from "@/components/landing/NossoPlano";
import Depoimentos from "@/components/landing/Faq";
import Blog from "@/components/landing/Blog";
import Afiliados from "@/components/landing/Afiliados";
import NewFaq from "@/components/landing/NewFaq";
import { getPosts } from "@/services/posts";
import type { Post } from "@/types/post";
import { useEffect, useState } from "react";
import Chatbot from "@/components/chatbot/Chatbot";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import ReferralHandler from "@/components/landing/ReferralHandler";
import { Suspense } from "react";

function LandingPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts(3);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={null}>
        <ReferralHandler />
      </Suspense>
      <Header />
      <main className="flex-1">
        <Hero />
        <Solucoes />
        <ComoFunciona />
        <AtraiaClientes />
        <NossoPlano />
        <Depoimentos />
        <Blog posts={posts} />
        <Afiliados />
        <NewFaq />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}


export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LandingPage />
        </Suspense>
    )
}
