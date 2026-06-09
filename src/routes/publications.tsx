import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowRight, Search, Clock, Calendar, TrendingUp } from "lucide-react";

const LOGIN = "/login";
const REGISTER = "/register";

export const Route = createFileRoute("/publications")({
  component: Publications,
});

function Publications() {
  const articles = [
    {
      slug: "tech-ipos-2026",
      category: "IPO Watch",
      title: "Top 5 Technology IPOs to Watch This Year",
      excerpt: "From artificial intelligence startups to space exploration companies, these are the most highly anticipated public offerings coming to the market.",
      date: "October 12, 2026",
      readTime: "6 Min Read",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2000&auto=format&fit=crop"
    },
    {
      slug: "interest-rates",
      category: "Economy",
      title: "Why Interest Rates Matter For Your Savings",
      excerpt: "A simple, easy-to-understand breakdown of how the Federal Reserve changes interest rates, and exactly what it means for your personal investments and wealth.",
      date: "October 08, 2026",
      readTime: "5 Min Read",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2000&auto=format&fit=crop"
    },
    {
      slug: "future-of-ai",
      category: "Technology",
      title: "The Future of AI and Your Portfolio",
      excerpt: "Artificial Intelligence is changing the world at a rapid pace. Here is how we are safely investing in the companies building this future to grow your wealth.",
      date: "September 28, 2026",
      readTime: "8 Min Read",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop"
    },
    {
      slug: "winning-companies",
      category: "Investing 101",
      title: "How We Pick Winning Private Companies",
      excerpt: "Take a look behind the scenes at exactly how our experts choose which private businesses to invest your money in, focusing on safety and steady growth.",
      date: "September 15, 2026",
      readTime: "4 Min Read",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2000&auto=format&fit=crop"
    },
    {
      slug: "physical-assets",
      category: "Real Estate",
      title: "Investing in Physical Assets During Inflation",
      excerpt: "Why owning physical things like premium real estate and data centers is one of the best ways to protect your hard-earned money from losing its value.",
      date: "August 30, 2026",
      readTime: "7 Min Read",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
    },
    {
      slug: "private-credit",
      category: "Market Update",
      title: "Private Credit vs. Traditional Bonds",
      excerpt: "Understanding the difference between loaning money to private companies versus buying government bonds, and how it impacts your yearly returns.",
      date: "August 12, 2026",
      readTime: "5 Min Read",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-[#f0f4ff] font-['Inter'] selection:bg-[#c9a84c]/30">
      {/* Ultra-Minimal Institutional Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#070b14]/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 cursor-pointer">
            <div className="w-10 h-10 border border-[#c9a84c]/50 flex items-center justify-center font-bold text-[#e8c96a] font-['Outfit'] text-lg">
              X
            </div>
            <span className="font-light text-2xl tracking-[0.15em] text-white font-['Outfit'] uppercase">XHoldings</span>
          </Link>
          <div className="hidden lg:flex items-center gap-10 text-[13px] font-medium text-gray-300 tracking-wider uppercase">
            <Link to="/publications" className="text-[#e8c96a] transition-colors">Publications</Link>
            <Link to="/" className="hover:text-[#e8c96a] transition-colors">Investments</Link>
            <Link to="/" className="hover:text-[#e8c96a] transition-colors">Our Approach</Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to={LOGIN} className="text-[13px] font-medium text-white hover:text-[#e8c96a] transition-colors hidden sm:block uppercase tracking-wider">
              Log In
            </Link>
            <Link to={REGISTER}>
              <Button className="bg-white/5 hover:bg-white/10 text-white border border-[#c9a84c]/30 rounded-none px-6 py-2 h-auto text-[13px] font-semibold transition-all tracking-wider uppercase">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-40 pb-16 border-b border-white/5 bg-[#0a0f1c]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-[64px] font-light tracking-tight mb-6 font-['Outfit'] text-white leading-tight">
              Market Insights & <br/> <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] to-[#e8c96a]">Publications</span>
            </h1>
            <p className="text-[17px] text-gray-400 font-light leading-relaxed mb-10 max-w-2xl">
              Read our latest research on upcoming IPOs, economic trends, and simple strategies for growing your wealth safely in private markets.
            </p>
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search articles, IPOs, or topics..." 
                className="w-full bg-[#070b14] border border-white/10 rounded-none py-4 pl-12 pr-4 text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a84c] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured IPO Article */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-[12px] text-[#c9a84c] uppercase tracking-[0.2em] mb-8 font-bold flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Featured Pre-IPO Guide
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative h-[400px] lg:h-[500px] w-full overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#c9a84c]/20 to-transparent z-10 opacity-60 mix-blend-overlay" />
              <img 
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=3270&auto=format&fit=crop" 
                alt="Stock Market Display" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            
            <div>
              <div className="flex items-center gap-6 text-[12px] text-gray-500 uppercase tracking-widest mb-6 font-semibold">
                <span className="flex items-center gap-2"><Calendar className="w-3 h-3"/> Oct 15, 2026</span>
                <span className="flex items-center gap-2"><Clock className="w-3 h-3"/> 10 Min Read</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-white font-['Outfit'] leading-tight mb-6 hover:text-[#c9a84c] transition-colors cursor-pointer">
                <Link to="/article/$articleId" params={{ articleId: 'pre-ipo-advantage' }}>The Pre-IPO Advantage: How to Invest Before Companies Go Public</Link>
              </h2>
              <div className="space-y-4 text-[15px] text-gray-400 font-light leading-relaxed mb-8">
                <p>
                  For decades, the biggest investment gains were made exclusively by venture capitalists and Wall Street insiders long before a company ever hit the stock market. When a company finally has an IPO (Initial Public Offering), the average retail investor is often buying at the highest possible price.
                </p>
                <p>
                  At XHoldings, we believe everyday investors deserve access to these same early-stage opportunities. In this guide, we break down exactly how Pre-IPO investing works, the risks involved, and how our platform secures shares in some of the world's fastest-growing private companies so you can benefit from their massive growth before they become household names.
                </p>
              </div>
              <Link to="/article/$articleId" params={{ articleId: 'pre-ipo-advantage' }}>
                <Button className="bg-transparent hover:bg-white/5 text-white border border-[#c9a84c]/50 rounded-none px-8 py-6 text-[13px] font-bold tracking-widest uppercase transition-colors flex items-center gap-3">
                  Read Full Guide <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-24 bg-[#070b14]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <h3 className="text-3xl font-light text-white font-['Outfit'] mb-12">Recent Publications</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {articles.map((article, index) => (
              <Link to="/article/$articleId" params={{ articleId: article.slug }} key={index} className="group cursor-pointer flex flex-col h-full">
                <div className="h-56 w-full border border-white/5 overflow-hidden relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f1c]/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700"
                  />
                </div>
                
                <div className="text-[11px] text-[#c9a84c] uppercase tracking-widest mb-3 font-bold">
                  {article.category}
                </div>
                
                <h4 className="text-2xl font-light text-white mb-4 group-hover:text-[#e8c96a] transition-colors leading-snug font-['Outfit']">
                  {article.title}
                </h4>
                
                <p className="text-[14px] text-gray-400 font-light leading-relaxed mb-6 flex-grow line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-[11px] text-gray-500 uppercase tracking-widest border-t border-white/5 pt-4 mt-auto">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-20 flex justify-center">
            <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-none px-10 py-6 text-[13px] font-bold tracking-widest uppercase transition-colors">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 bg-[#0a0f1c] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 border border-[#c9a84c]/50 flex items-center justify-center font-bold text-[#e8c96a] font-['Outfit'] text-sm">X</div>
                <span className="font-light text-xl tracking-[0.15em] text-white font-['Outfit'] uppercase">XHoldings</span>
              </div>
              <div className="space-y-2 text-[13px] text-gray-500 font-light">
                <p>Global Headquarters</p>
                <p>One World Trade Center</p>
                <p>New York, NY 10007</p>
                <p className="mt-4 pt-4 border-t border-white/5 inline-block">support@xholdings.io</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-6 text-[13px] uppercase tracking-widest">Company</h4>
              <ul className="space-y-4 text-[14px] text-gray-500 font-light">
                <li><Link to="/" className="hover:text-[#c9a84c] transition-colors">About Us</Link></li>
                <li><Link to="/" className="hover:text-[#c9a84c] transition-colors">Our Team</Link></li>
                <li><Link to="/" className="hover:text-[#c9a84c] transition-colors">Help Center</Link></li>
                <li><Link to="/" className="hover:text-[#c9a84c] transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-6 text-[13px] uppercase tracking-widest">Investments</h4>
              <ul className="space-y-4 text-[14px] text-gray-500 font-light">
                <li><Link to="/" className="hover:text-[#c9a84c] transition-colors">Private Companies</Link></li>
                <li><Link to="/" className="hover:text-[#c9a84c] transition-colors">Real Estate</Link></li>
                <li><Link to="/" className="hover:text-[#c9a84c] transition-colors">Technology</Link></li>
                <li><Link to="/" className="hover:text-[#c9a84c] transition-colors">Pricing & Fees</Link></li>
              </ul>
            </div>
            <div className="col-span-2">
              <h4 className="text-white font-medium mb-6 text-[13px] uppercase tracking-widest">Member Area</h4>
              <p className="text-[13px] text-gray-500 font-light leading-relaxed mb-6">
                Log in to view your portfolio, track your daily returns, and read our latest market updates.
              </p>
              <Link to={LOGIN}>
                <Button className="bg-transparent hover:bg-white/5 text-white border border-white/20 rounded-none px-6 py-2 text-[12px] font-bold tracking-widest uppercase transition-colors">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-10 text-[11px] text-gray-600 leading-loose text-justify space-y-4 font-light">
            <p>
              XHoldings makes investing simple, but all investing involves risk. The value of your investments can go down as well as up, and you may get back less than you originally invested. Past performance is not a reliable indicator of future results. We recommend talking to a financial advisor if you are unsure if an investment is right for you.
            </p>
            <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-white/5 text-[12px]">
              <p>© {new Date().getFullYear()} XHoldings Inc. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0 font-medium">
                <Link to="/" className="hover:text-[#c9a84c] transition-colors">Terms of Service</Link>
                <Link to="/" className="hover:text-[#c9a84c] transition-colors">Privacy Policy</Link>
                <Link to="/" className="hover:text-[#c9a84c] transition-colors">Disclosures</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
