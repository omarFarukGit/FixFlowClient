import { MessageCircle, Send } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-primary/5">
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 size-80 rounded-full bg-green-400/10 blur-3xl" />

      <div className="container relative mx-auto px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <MessageCircle className="size-4" />
            Get in Touch
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            We&apos;re Here to <span className="text-primary">Help</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Have a question, need help with a service, or want to learn more
            about FixFlow? Send us a message and our team will be happy to help.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Send className="size-4 text-primary" />
            We&apos;ll get back to you as soon as possible.
          </div>
        </div>
      </div>
    </section>
  );
}
