import { getPosts } from "@/services/posts";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section id="blog" className="py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-24">
            <div className="mb-8">
                <Button variant="ghost" asChild>
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para o Início
                    </Link>
                </Button>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Blog Vempreender
              </h1>
              <p className="mt-6 text-lg font-normal text-muted-foreground sm:text-xl">
                Dicas e Estratégias para sua Empresa Crescer.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  href={`/blog/${post.id}`}
                  key={post.id}
                  className="flex"
                >
                  <Card className="overflow-hidden flex flex-col w-full h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                     <div className="relative w-full h-48">
                        {post.image ? (
                          <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              data-ai-hint={post.aiHint}
                              className="object-cover"
                          />
                        ) : (
                          <Skeleton className="h-full w-full" />
                        )}
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
