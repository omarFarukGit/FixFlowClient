import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const userLinks = [
  { label: "Customer", href: "/register?role=CUSTOMER" },
  { label: "Technician", href: "/register?role=TECHNICIAN" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const supportLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact Support", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="
                inline-flex items-center
                rounded-xl
                bg-white
                p-1
                shadow-sm
                ring-1 ring-black/5
                transition-shadow
                hover:shadow-md
                dark:ring-white/10
              "
            >
              <Image
                src="/images/fix-flow-logo-main.png"
                alt="FixFlow logo"
                width={64}
                height={64}
                className="h-11 w-11 object-contain"
              />
            </Link>

            <h2 className="mt-5 text-xl font-bold tracking-tight">FixFlow</h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              A simple and reliable field service management platform that
              connects customers with skilled technicians and makes service
              management easier.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <Link
                href="mailto:support@fixflow.com"
                className="
                  flex items-center gap-3
                  text-sm text-muted-foreground
                  transition-colors
                  hover:text-primary
                "
              >
                <Mail className="h-4 w-4 shrink-0" />
                support@fixflow.com
              </Link>

              <Link
                href="tel:+8801234567890"
                className="
                  flex items-center gap-3
                  text-sm text-muted-foreground
                  transition-colors
                  hover:text-primary
                "
              >
                <Phone className="h-4 w-4 shrink-0" />
                +880 1234-567890
              </Link>

              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">Product</h3>

            <ul className="mt-5 space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="
                      text-sm text-muted-foreground
                      transition-colors
                      hover:text-primary
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-sm font-semibold">For Users</h3>

            <ul className="mt-5 space-y-3">
              {userLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="
                      text-sm text-muted-foreground
                      transition-colors
                      hover:text-primary
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold">Support</h3>

            <ul className="mt-5 space-y-3">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="
                      text-sm text-muted-foreground
                      transition-colors
                      hover:text-primary
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-7">
              <h3 className="text-sm font-semibold">Follow Us</h3>

              <div className="mt-4 flex items-center gap-2">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg
                    border border-border
                    bg-background
                    text-muted-foreground
                    transition-all
                    hover:border-primary/40
                    hover:bg-accent
                    hover:text-primary
                  "
                >
                  <Mail className="h-4 w-4" />
                </Link>

                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg
                    border border-border
                    bg-background
                    text-muted-foreground
                    transition-all
                    hover:border-primary/40
                    hover:bg-accent
                    hover:text-primary
                  "
                >
                  <Mail className="h-4 w-4" />
                </Link>

                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg
                    border border-border
                    bg-background
                    text-muted-foreground
                    transition-all
                    hover:border-primary/40
                    hover:bg-accent
                    hover:text-primary
                  "
                >
                  <Mail className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div
          className="
            mx-auto flex max-w-7xl
            flex-col items-center
            justify-between
            gap-4
            px-4 py-5
            text-center
            sm:flex-row
            sm:px-6
            sm:text-left
            lg:px-8
          "
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FixFlow. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="
                text-xs text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="
                text-xs text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
