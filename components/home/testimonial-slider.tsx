"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Long-term Investor",
    content:
      "I've been investing in gold for over a decade, and GoldJewelsMy provides the best quality and service I've experienced. Their authentication process gives me complete peace of mind.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "First-time Buyer",
    content:
      "As someone new to gold investment, I appreciated the guidance and education provided by GoldJewelsMy. The product arrived exactly as described, and the unboxing experience was luxurious.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Collector",
    content:
      "The craftsmanship of these gold bars is exceptional. Each piece in my collection from GoldJewelsMy has perfect finishing and comes with detailed certification.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Financial Advisor",
    content:
      "I recommend GoldJewelsMy to all my clients looking to diversify with precious metals. Their product quality is consistent, and their customer service is responsive and knowledgeable.",
    rating: 4,
  },
]

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="border border-zinc-800 bg-black shadow-md">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating ? "text-gold-light fill-gold-light" : "text-zinc-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-lg mb-6 italic text-white/90">"{testimonial.content}"</p>
                    <div className="mt-4">
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${index === current ? "bg-gold-light" : "bg-zinc-700"}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white border border-zinc-800 hidden md:flex"
        onClick={prev}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white border border-zinc-800 hidden md:flex"
        onClick={next}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  )
}

export default TestimonialSlider
