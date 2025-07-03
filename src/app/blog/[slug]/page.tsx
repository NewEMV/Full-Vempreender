import { getPost } from "@/services/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 md:px-24">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o Blog
            </Link>
          </Button>

          <h1 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-5xl mb-4">
            {post.title}
          </h1>
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                data-ai-hint={post.aiHint}
                priority
              />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </div>
          <div className="max-w-none text-lg leading-relaxed text-foreground/90">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
