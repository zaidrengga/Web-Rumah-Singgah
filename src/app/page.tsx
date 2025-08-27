"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { orderSteps, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFadeAnimations } from "@/lib/animation";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {

  useFadeAnimations();
  return (
    <div className="min-h-screen">
      <div className="absolute top-20 left-0 w-1/2 h-96 rounded-full blur-3xl opacity-10 bg-amber-600"></div>

      {/* Hero Section */}
      <section className="relative  px-4 sm:px-6 h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="fade-up text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to{" "}
            <span className="text-amber-600">Rumah Singgah</span>
          </h1>
          <p className="fade-up text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the perfect blend of tradition and innovation in every cup.
            Our coffee shop offers a warm, inviting atmosphere where every visit feels like coming home.
          </p>
          <div className="fade-up flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/order">
                Order Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/menu">
                View Menu
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 bg-muted/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 fade-up">Featured Products</h2>
            <p className="text-muted-foreground fade-up">
              Discover our most popular coffee and beverage selections
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard className="fade-item" key={product.id} product={product} onAdd={() => { }} />
            ))}
          </div>
          <Button asChild className="flex items-center mx-auto mt-12 fade-up w-fit">
            <Link href="/menu">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 fade-left">Our Story</h2>
              <p className="text-muted-foreground mb-6 fade-left">
                Rumah Singgah began as a simple dream - to create a space where people could
                gather, connect, and enjoy exceptional coffee in a warm, welcoming environment.
                Our name, which means resting place in Indonesian, reflects our commitment
                to being more than just a coffee shop.
              </p>
              <p className="text-muted-foreground mb-8 fade-left">
                We source the finest beans from local and international growers, ensuring every
                cup tells a story of quality and craftsmanship. From our signature espresso
                blends to our innovative seasonal drinks, every beverage is crafted with care
                and passion.
              </p>
              <Button asChild className="fade-left">
                <Link href="/menu">
                  Explore Our Menu
                </Link>
              </Button>
            </div>
            <Card className="p-8 fade-center">
              <CardContent className="p-0">
                <div className="aspect-square bg-muted rounded-lg" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Order Section */}
      <section className="py-16 px-4 sm:px-6 bg-muted/30">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-12">
            Cara Memesan di <span className="text-amber-600 fade-up">Rumah Singgah</span>
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 stagger-grid">
            {orderSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="fade-item flex flex-col items-center bg-black/20 dark:bg-white/20 shadow-lg rounded-2xl p-6 hover:shadow-xl transition"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-amber-600 text-white mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* contact section */}
      <section className="py-16 px-4 sm:px-6 relative">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-amber-600 rounded-full blur-3xl opacity-20 z-[-1]"></div>

        <div className="mx-auto max-w-6xl rounded-2xl backdrop-blur-2xl bg-black/10 dark:bg-white/10 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold fade-up">
              Let&#39;s <span className="text-amber-600">Connect</span>
            </h2>
            <p className="fade-up">
              We&#39;d love to hear from you! Whether you have a question, feedback, or just want to
              say hello, we&#39;re here to listen.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 fade-up">
                <MapPin className="w-4 h-4" />
                <p >Jl. Raya Kebon Jeruk, Jakarta Timur</p>
              </div>
              <div className="flex items-center gap-2 fade-up">
                <Phone className="w-4 h-4" />
                <p >+62 123-456-7890</p>
              </div>
              <div className="flex items-center gap-2 fade-up">
                <Mail className="w-4 h-4" />
                <p >T9e0I@example.com</p>
              </div>
            </div>
          </div>
          <div className="fade-up">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
