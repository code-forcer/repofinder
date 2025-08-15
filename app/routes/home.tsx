import { Link, Outlet } from "react-router";
import { useState, useEffect } from "react";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [repo, setRepo] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setRepo([]);

    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          query
        )}&sort=stars&order=desc`
      );
      if (!res.ok) throw new Error("Error fetching repositories");
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        setRepo(data.items);
      } else {
        setError("No repositories found");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
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

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-teal-200/30 to-blue-200/30 blur-3xl" />
        </div>

        {/* Search */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            <input
              type="text"
              placeholder="Search repositories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>

          {loading && <p className="text-blue-500">Searching...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {repo.length > 0 && (
            <>
              <p className="mb-4 text-gray-700">
                Found <span className="font-semibold">{repo.length}</span>{" "}
                repositories
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {repo.map((r) => (
                  <div
                    key={r.id}
                    className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
                  >
                    <h2 className="text-lg font-semibold mb-2 truncate">
                      {r.full_name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {r.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-yellow-500 font-medium">
                        ⭐ {r.stargazers_count}
                      </span>
                      <a
                        href={r.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-300 text-sm">
          © {new Date().getFullYear()} Repo Finder by codeforcer — Built for developers ❤️
        </div>
      </footer>
    </div>
  );
}

type NavLinkProps = {
  to: string;
  text: string;
};

function NavLink({ to, text }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
    >
      {text}
    </Link>
  );
}
