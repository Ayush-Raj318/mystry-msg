'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      <main className="relative flex-grow">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-muted" />
        <section className="container mx-auto px-4 md:px-8 py-16 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Dive into the World of Mystry Messages
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Mystry Message — Where your identity remains a secret.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-8 pb-16">
          <Carousel plugins={[Autoplay({ delay: 2500 })]} className="w-full max-w-2xl mx-auto">
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-2">
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">{message.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-start gap-3">
                      <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="leading-relaxed">{message.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.received}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <footer className="border-t">
          <div className="container mx-auto px-4 md:px-8 py-6 text-center text-sm text-muted-foreground">
            © 2025 Mystry Message. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  );
}
