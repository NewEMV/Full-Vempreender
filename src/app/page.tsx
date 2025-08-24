
import { Suspense } from "react";

import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Solucoes from "@/components/landing/Solucoes";
import ComoFunciona from "@/components/landing/ComoFunciona";
import AtraiaClientes from "@/components/landing/AtraiaClientes";
import NossoPlano from "@/components/landing/NossoPlano";
import Depoimentos from "@/components/landing/Faq";
import Blog from "@/components/landing/Blog";
import Afiliados from "@/components/landing/Afiliados";
import NewFaq from "@/components/landing/NewFaq";
import Footer from "@/components/landing/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import ReferralHandler from "@/components/landing/ReferralHandler";
import { getPosts } from "@/services/posts";
import type { Post } from "@/types/post";

export default async function Home() {
  const posts: Post[] = await getPosts(3);

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
      <Footer />
      <Chatbot />
    </div>
  );
}
