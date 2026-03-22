import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="footer" className="bg-background border-t border-primary/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-primary/25 bg-white/60 shadow-neumorphic">
                <Image src="/images/app-icon.png" alt="Prominder logo" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">Prominder</span>
            </Link>
            <p className="text-text-description text-sm max-w-xs leading-relaxed">
              The AI-powered study planner that helps you organize exam prep, adapt your timetable, and stay
              consistent all semester.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">Product</h4>
            <ul className="space-y-3 text-sm text-text-description">
              <li>
                <a href="#features" className="hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-primary transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-primary transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">Pricing</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3 text-sm text-text-description">
              <li>
                <button className="hover:text-primary transition-colors">About Us</button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">Terms of Service</button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">Contact</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-description">
          <p>© {new Date().getFullYear()} Prominder Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-primary transition-colors">Twitter</button>
            <button className="hover:text-primary transition-colors">Instagram</button>
            <button className="hover:text-primary transition-colors">Discord</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
