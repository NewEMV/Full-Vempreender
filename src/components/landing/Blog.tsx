"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPosts } from "@/services/posts";
import type { Post } from "@/types/post";
import { Skeleton } from "@/components/ui/skeleton";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts(3);
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-10 md:py-16">
      <div className="container mx-auto px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Blog Vempreender: Dicas e Estratégias para sua Empresa Crescer
          </h2>
          <p className="mt-10 text-lg font-normal text-muted-foreground sm:text-xl">
            Quer mais clientes e aumentar suas vendas? No Blog Vempreender você
            encontra dicas práticas de marketing, vendas e como usar seu
            chatbot, que é seu Agente IA personalizado, para crescer.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden flex flex-col">
                  <Skeleton className="w-full h-48" />
                  <CardHeader className="flex-1">
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                </Card>
              ))
            : posts.map((post) => (
                <Link
                  href={`/blog/${post.id}`}
                  key={post.id}
                  className="flex"
                >
                  <Card className="overflow-hidden flex flex-col w-full h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative w-full h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint={post.aiHint}
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="flex-1">
                      <CardTitle className="text-lg font-bold">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild className="text-base font-bold">
            <Link href="/blog">Ver Todas as Dicas no Blog</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
