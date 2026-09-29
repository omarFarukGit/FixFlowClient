import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah Ahmed",
    role: "Customer",
    rating: 5,
    review:
      "FixFlow made it incredibly easy to find a reliable technician. The whole process was smooth, from booking to payment.",
  },
  {
    name: "Tanvir Hasan",
    role: "Customer",
    rating: 5,
    review:
      "I was impressed with how quickly my service request was handled. The technician was professional and arrived on time.",
  },
  {
    name: "Nusrat Jahan",
    role: "Customer",
    rating: 5,
    review:
      "The service tracking and secure payment system made everything feel safe and convenient. Highly recommended!",
  },
];

export default function CustomerReviews() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Star className="size-4 fill-current" />
            Customer Reviews
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-muted-foreground sm:text-lg">
            Real experiences from customers who use FixFlow to get their
            services done quickly and reliably.
          </p>
        </div>

        {/* Reviews */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Quote Icon */}
              <div className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Quote className="size-5" />
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`size-4 ${
                      index < review.rating
                        ? "fill-[#FBBF24] text-[#FBBF24]"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mt-5 min-h-[96px] text-sm leading-7 text-muted-foreground">
                “{review.review}”
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {review.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    {review.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {review.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Rating */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="size-5 fill-[#FBBF24] text-[#FBBF24]"
              />
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">4.9/5</span>{" "}
            average customer rating
          </p>
        </div>
      </div>
    </section>
  );
}