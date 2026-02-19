"use client";
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      
      {/* Top CTA Strip */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="mt-4 text-lg text-green-100">
            Explore verified homes, trusted agents, and expert guidance.
          </p>

          <button className="mt-8 bg-white text-green-700 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition">
            Explore Properties
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-14 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900">
              Matru<span className="text-green-600">Bhumi</span>
            </h3>
            <p className="mt-5 text-gray-500 leading-relaxed">
              Real estate simplified. Helping buyers, sellers, and investors
              make smarter property decisions with trust and transparency.
            </p>
          </div>

          {/* Buy */}
          <FooterCol title="Buy">
            <FooterLink text="Apartments" />
            <FooterLink text="Villas" />
            <FooterLink text="Luxury Homes" />
            <FooterLink text="Commercial" />
          </FooterCol>

          {/* Company */}
          <FooterCol title="Company">
            <FooterLink text="About Us" />
            <FooterLink text="Careers" />
            <FooterLink text="Blogs" />
            <FooterLink text="Contact" />
          </FooterCol>

          {/* Support */}
          <FooterCol title="Support">
            <FooterLink text="Help Center" />
            <FooterLink text="Legal & Compliance" />
            <FooterLink text="Privacy Policy" />
            <FooterLink text="Terms of Use" />
          </FooterCol>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Matrubhumi. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-green-600 cursor-pointer transition">Instagram</span>
            <span className="hover:text-green-600 cursor-pointer transition">LinkedIn</span>
            <span className="hover:text-green-600 cursor-pointer transition">Twitter</span>
          </div>
        </div>
      </div>

    </footer>
  );
}

/* Reusable components */

function FooterCol({ title, children }) {
  return (
    <div>
      <h4 className="text-lg font-bold text-gray-900 mb-6">
        {title}
      </h4>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ text }) {
  return (
    <p className="text-gray-500 hover:text-green-600 cursor-pointer transition">
      {text}
    </p>
  );
}