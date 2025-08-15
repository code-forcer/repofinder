import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Quick as a flash",
      description: "Type a repo name and boom — results in seconds."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Fresh data, always",
      description: "Pulls directly from GitHub, so you’re never looking at stale info."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "No manual needed",
      description: "Just type `username/repo` and you’re off."
    }
  ];

  return (
    <main className="relative min-h-screen">
      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ease-out ${isScrolled
            ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/50"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Repo Finder
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" text="Home" />
            <NavLink to="/about" text="About" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t border-gray-200">
            <NavLink to="/" text="Home" />
            <NavLink to="/about" text="About" />
          </div>
        )}
      </nav>


      {/* Hero */}
      <section className={`px-4 py-20 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
          About Repo Finder
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-8">
          Born from one developer’s frustration of endlessly clicking through GitHub search results — Repo Finder is a simple, fast way to get what you need without the noise.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 mb-20">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-6 border border-gray-200 hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.description}</p>
          </div>
        ))}
      </section>

      {/* Closing */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Give it a try</h2>
        <p className="text-lg text-gray-600 mb-6">No accounts, no setup — just search and go.</p>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-md transition-transform hover:-translate-y-1">
          Start Searching
        </button>
      </section>
    </main>
  );
}

function NavLink({ to, text }: { to: string; text: string }) {
  return (
    <Link
      to={to}
      className="relative px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
    >
      {text}
    </Link>
  );
}
