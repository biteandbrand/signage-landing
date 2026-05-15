import { useState, useEffect, useRef, ReactNode } from 'react';
import {
  Monitor,
  Wifi,
  MapPin,
  Calendar,
  Zap,
  QrCode,
  Headphones,
  ChevronDown,
  Sun,
  Moon,
  Star,
  Upload,
  ListVideo,
  RefreshCw,
  Menu,
  X,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

// ─── Scroll animation hook ────────────────────────────────────────────────────
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function AnimateIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 select-none">
      <img src="/amazon_icon_114x114_new.png" alt="SignagePanel logo" className="h-9 w-9 rounded-md" />
      <span className="text-xl font-bold tracking-tight dark:text-white text-neutral-900">
        Signage<span className="text-crimson-700">Panel</span>
      </span>
    </a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm shadow-sm border-b border-neutral-100 dark:border-neutral-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-crimson-700 dark:hover:text-crimson-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="https://app.signagepanel.app"
            className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-crimson-700 transition-colors"
          >
            Sign In
          </a>
          <a
            href="https://app.signagepanel.app"
            className="inline-flex items-center gap-1.5 bg-crimson-700 hover:bg-crimson-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleDark} aria-label="Toggle dark mode" className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" className="p-2 text-neutral-700 dark:text-neutral-300">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 px-4 pb-5 pt-3 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-crimson-700 dark:hover:text-crimson-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a href="https://app.signagepanel.app" className="text-sm font-medium text-center text-neutral-700 dark:text-neutral-300 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              Sign In
            </a>
            <a href="https://app.signagepanel.app" className="text-sm font-semibold text-center bg-crimson-700 hover:bg-crimson-800 text-white py-2.5 rounded-lg transition-colors">
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <AnimateIn>
            <div className="inline-flex items-center gap-2 bg-crimson-50 dark:bg-crimson-950/50 border border-crimson-200 dark:border-crimson-900 text-crimson-700 dark:text-crimson-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson-600 animate-pulse"></span>
              Digital Signage Made Simple
            </div>
          </AnimateIn>

          <AnimateIn delay={80}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 dark:text-white mb-6">
              Control Your Screens.<br />
              <span className="text-crimson-700">From Anywhere.</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={160}>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 max-w-2xl">
              SignagePanel lets you manage digital menu boards and signage displays across all your locations — directly from your phone or browser. No technical expertise required.
            </p>
          </AnimateIn>

          <AnimateIn delay={240}>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="https://signagepanel.app/register"
                className="inline-flex items-center justify-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors text-sm"
              >
                Get Started
                <ArrowRight size={16} />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 font-semibold px-6 py-3.5 rounded-lg transition-colors text-sm"
              >
                See How It Works
              </a>
            </div>
          </AnimateIn>

          <AnimateIn delay={320}>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3.5 py-2">
                <Monitor size={16} className="text-neutral-500 dark:text-neutral-400" />
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Works on Android TV</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3.5 py-2">
                <img src="/amazon_icon_114x114_new.png" alt="Fire Stick" className="h-4 w-4 rounded-sm" />
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Works on Fire Stick</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3.5 py-2">
                <Wifi size={16} className="text-neutral-500 dark:text-neutral-400" />
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Remote Management</span>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Dashboard mockup */}
        <AnimateIn delay={400} className="mt-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-neutral-800 border-b border-neutral-700">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              <div className="ml-3 flex-1 max-w-xs bg-neutral-700 rounded-md px-3 py-1 text-xs text-neutral-400">
                signagepanel.app/dashboard
              </div>
            </div>

            {/* Mock dashboard UI */}
            <div className="bg-neutral-950 p-5 min-h-[320px] sm:min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="h-5 w-36 bg-neutral-800 rounded mb-1.5"></div>
                  <div className="h-3 w-24 bg-neutral-800/60 rounded"></div>
                </div>
                <div className="h-9 w-28 bg-crimson-800/80 rounded-lg"></div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {['Screens Online', 'Playlists', 'Locations'].map((label, i) => (
                  <div key={i} className="bg-neutral-800/60 rounded-xl p-4">
                    <div className="h-7 w-12 bg-neutral-700 rounded mb-2"></div>
                    <div className="h-3 w-20 bg-neutral-700/60 rounded"></div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-3 bg-neutral-800/40 rounded-xl p-4 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-700 flex-shrink-0"></div>
                      <div className="flex-1 space-y-1.5">
                        <div className="h-2.5 bg-neutral-700 rounded w-3/4"></div>
                        <div className="h-2 bg-neutral-700/60 rounded w-1/2"></div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500/70 flex-shrink-0"></div>
                    </div>
                  ))}
                </div>
                <div className="col-span-2 bg-neutral-800/40 rounded-xl p-4">
                  <div className="h-3 w-20 bg-neutral-700 rounded mb-4"></div>
                  <div className="space-y-2">
                    {[80, 60, 90, 45].map((w, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-2 bg-crimson-800/70 rounded" style={{ width: `${w}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Upload,
      title: 'Upload your content',
      description:
        'Add images, videos, or menu boards directly from your device. Supported formats include JPG, PNG, MP4, and more.',
    },
    {
      number: '02',
      icon: ListVideo,
      title: 'Create playlists and assign to screens',
      description:
        'Group content into playlists, set display durations, and schedule them for specific days or times across any of your locations.',
    },
    {
      number: '03',
      icon: RefreshCw,
      title: 'Your screens update instantly',
      description:
        'Changes push to your screens in real time. No USB sticks. No manual refreshing. Your displays stay in sync automatically.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimateIn>
          <span className="text-xs font-semibold uppercase tracking-widest text-crimson-700 dark:text-crimson-500 mb-3 block">
            Simple process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Up and running in minutes
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mb-14">
            Three straightforward steps stand between you and a fully managed digital signage network.
          </p>
        </AnimateIn>

        <div className="space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <AnimateIn key={i} delay={i * 120}>
                <div className="flex gap-6 sm:gap-10 pb-12 relative">
                  {/* Vertical connector */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-[28px] top-14 bottom-0 w-px bg-neutral-200 dark:bg-neutral-700 sm:left-[36px]" />
                  )}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-card dark:shadow-card-dark flex items-center justify-center">
                      <Icon size={24} className="text-crimson-700 dark:text-crimson-500" />
                    </div>
                  </div>
                  <div className="pt-2 sm:pt-3">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold tabular-nums text-neutral-400 dark:text-neutral-500 tracking-widest">
                        {step.number}
                      </span>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{step.title}</h3>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const secondary = [
    {
      icon: Zap,
      title: 'Real-time screen control',
      description: 'Push changes to any screen instantly. No waiting, no manual updates — it just works.',
    },
    {
      icon: Monitor,
      title: 'Standard hardware',
      description: 'Works on affordable Android TV boxes and Amazon Fire Sticks. No proprietary screens needed.',
    },
    {
      icon: QrCode,
      title: 'QR code screen activation',
      description: 'Pair a new screen to your account by scanning a QR code. Setup takes under a minute.',
    },
    {
      icon: Headphones,
      title: '24/7 technical support',
      description: "Stuck? Our support team is on call around the clock. You're never on your own.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimateIn>
          <span className="text-xs font-semibold uppercase tracking-widest text-crimson-700 dark:text-crimson-500 mb-3 block">
            What you get
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Everything you need. Nothing you don't.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mb-14">
            Built specifically for café, restaurant, and retail owners who want reliable digital signage without the complexity.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Large feature card */}
          <AnimateIn className="lg:col-span-3">
            <div className="h-full rounded-2xl bg-neutral-950 dark:bg-neutral-900 border border-neutral-800 p-8 flex flex-col shadow-card-dark">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-crimson-900/60 mb-5">
                  <MapPin size={22} className="text-crimson-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Multi-location management</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Manage screens across all your venues from a single dashboard. Whether you have one café or twenty restaurants, you get one login, one interface, and complete control.
                </p>
              </div>

              {/* Decorative location grid */}
              <div className="mt-auto grid grid-cols-3 gap-2.5">
                {['Main Street', 'City Centre', 'Westfield', 'Airport', 'Victoria', 'Online'].map((name, i) => (
                  <div key={i} className="bg-neutral-800/60 rounded-lg px-3 py-2.5 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${i < 4 ? 'bg-green-500' : 'bg-neutral-600'}`}></span>
                    <span className="text-xs text-neutral-400 truncate">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Secondary feature cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {secondary.slice(0, 2).map((f, i) => {
              const Icon = f.icon;
              return (
                <AnimateIn key={i} delay={i * 100}>
                  <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-6 shadow-card dark:shadow-card-dark h-full">
                    <Icon size={20} className="text-crimson-700 dark:text-crimson-500 mb-3" />
                    <h4 className="font-bold text-neutral-900 dark:text-white mb-1.5 text-[15px]">{f.title}</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.description}</p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>

          {/* Bottom row of 3 cards */}
          {secondary.slice(2).map((f, i) => {
            const Icon = f.icon;
            return (
              <AnimateIn key={i} delay={i * 100} className="lg:col-span-1" style={{ gridColumn: `span 1 / span 1` }}>
                <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-6 shadow-card dark:shadow-card-dark h-full">
                  <Icon size={20} className="text-crimson-700 dark:text-crimson-500 mb-3" />
                  <h4 className="font-bold text-neutral-900 dark:text-white mb-1.5 text-[15px]">{f.title}</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.description}</p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
  const [annual, setAnnual] = useState(true);

  const softwareFeatures = [
    'Unlimited playlists and content',
    'Multi-location dashboard',
    'Real-time screen control',
    'QR code screen pairing',
    'Automation',
    '24/7 technical support',
    'Works on Android TV & Fire Stick',
  ];

  const managedFeatures = [
    'Everything in Software Plan',
    'Hardware supply & setup',
    'Professional content creation',
    'Dedicated account manager',
    'On-site installation (UK)',
    'Monthly content updates',
    'Priority 24/7 support',
  ];

  return (
    <section id="pricing" className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimateIn>
          <span className="text-xs font-semibold uppercase tracking-widest text-crimson-700 dark:text-crimson-500 mb-3 block">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Straightforward pricing
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mb-8">
            No hidden fees. No long-term lock-ins. Pick the plan that fits how you work.
          </p>
        </AnimateIn>

        {/* Billing toggle */}
        <AnimateIn delay={100}>
          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={() => setAnnual(false)}
              className={`text-sm font-medium transition-colors ${!annual ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-crimson-700' : 'bg-neutral-300 dark:bg-neutral-600'}`}
              aria-label="Toggle annual billing"
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${annual ? 'translate-x-6' : ''}`}
              />
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`text-sm font-medium transition-colors ${annual ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}
            >
              Annual
            </button>
            <span className="text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full">
              Save 17%
            </span>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Software Plan */}
          <AnimateIn delay={100}>
            <div className="relative rounded-2xl bg-neutral-950 border-2 border-crimson-700 p-8 shadow-card-dark flex flex-col h-full">
              <div className="absolute -top-3.5 left-6">
                <span className="bg-crimson-700 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">Software Plan</h3>
                <p className="text-sm text-neutral-400">Self-managed. Full control.</p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1.5">
                  <span className="text-4xl font-extrabold text-white">
                    {annual ? '£50' : '£5'}
                  </span>
                  <span className="text-neutral-400 text-sm mb-1.5">
                    / screen / {annual ? 'year' : 'month'}
                  </span>
                </div>
                {annual && (
                  <p className="text-xs text-green-400 mt-1 font-medium">Best value — save 17% vs monthly</p>
                )}
                {!annual && (
                  <p className="text-xs text-neutral-500 mt-1">or £50/screen/year (save 17%)</p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {softwareFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-300">
                    <CheckCircle2 size={16} className="text-crimson-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://signagepanel.app/register"
                className="block text-center bg-crimson-700 hover:bg-crimson-600 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
              >
                Get Started
              </a>
              <p className="text-xs text-neutral-500 text-center mt-3">Sign up and start managing your screens today.</p>
            </div>
          </AnimateIn>

          {/* Managed Service */}
          <AnimateIn delay={200}>
            <div className="rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-8 shadow-card dark:shadow-card-dark flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">Managed Service</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Done-for-you solution.</p>
                </div>
                <span className="bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-600 flex-shrink-0 ml-3">
                  UK Only
                </span>
              </div>

              <div className="mb-6">
                <span className="text-2xl font-bold text-neutral-900 dark:text-white">Custom pricing</span>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Tailored to your business needs</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {managedFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 size={16} className="text-neutral-400 dark:text-neutral-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block text-center border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 font-semibold py-3.5 rounded-xl transition-colors text-sm"
              >
                Get a Quote
              </a>
              <p className="text-xs text-neutral-400 text-center mt-3">Available for UK businesses only.</p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const items = [
    {
      name: 'Sarah Mitchell',
      role: 'Owner, The Corner Café — Bristol',
      body: "We've replaced three printed menu boards with digital screens and haven't looked back. Updating prices or adding daily specials takes less than a minute now.",
      initials: 'SM',
    },
    {
      name: 'James Thornton',
      role: "Operations Manager, Thornton's Bakery — Manchester",
      body: 'Managing screens across five locations used to be a nightmare. With SignagePanel I do it from my phone while having my morning coffee.',
      initials: 'JT',
    },
    {
      name: 'Priya Patel',
      role: 'Director, Spice Route Restaurants — London',
      body: "The QR code setup was surprisingly easy. Our staff can activate a new screen without calling IT. It just works, which is all I needed.",
      initials: 'PP',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimateIn>
          <span className="text-xs font-semibold uppercase tracking-widest text-crimson-700 dark:text-crimson-500 mb-3 block">
            Customer stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-14">
            Trusted by UK hospitality businesses
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <AnimateIn key={i} delay={i * 120}>
              <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-6 shadow-card dark:shadow-card-dark h-full flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed flex-1 mb-5">
                  "{t.body}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="w-9 h-9 rounded-full bg-crimson-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900 dark:text-white">{t.name}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{t.role}</div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What devices does SignagePanel work on?',
      a: 'SignagePanel works on any Android TV device (Android 7.0+) and Amazon Fire Stick (2nd generation or newer). You can use existing TVs with a cheap Android box or Fire Stick — no proprietary hardware required.',
    },
    {
      q: 'Do I need technical knowledge to set it up?',
      a: "No. If you can install an app and scan a QR code, you can set up SignagePanel. The entire process — from creating an account to your first screen showing content — takes around 10 minutes.",
    },
    {
      q: 'Can I manage multiple locations from one account?',
      a: 'Yes. Your account supports unlimited locations. Each location can have its own screens, playlists, and schedules. You can push different content to different venues or keep them all in sync — your choice.',
    },
    {
      q: 'What happens after I subscribe?',
      a: "After subscribing, you'll get instant access to the full dashboard. You can start uploading content, creating playlists, and pairing screens straight away. There's no waiting for activation.",
    },
    {
      q: 'Is there a free trial?',
      a: "We don't currently offer a free trial. You can sign up for the Software Plan and start managing your screens straight away with a monthly or annual subscription.",
    },
    {
      q: 'Is the Managed Service available outside the UK?',
      a: 'The Managed Service — which includes hardware supply, on-site installation, and content creation — is currently available for UK-based businesses only. The Software Plan (self-managed) is available worldwide.',
    },
  ];

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimateIn>
          <span className="text-xs font-semibold uppercase tracking-widest text-crimson-700 dark:text-crimson-500 mb-3 block">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-14">
            Common questions
          </h2>
        </AnimateIn>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <AnimateIn key={i} delay={i * 60}>
              <div className="rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 overflow-hidden shadow-card dark:shadow-card-dark">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={open === i}
                >
                  <span className="font-semibold text-neutral-900 dark:text-white text-[15px]">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact / CTA Banner ─────────────────────────────────────────────────────
function ContactCTA() {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimateIn>
          <div className="rounded-2xl bg-neutral-950 border border-neutral-800 px-8 py-14 md:px-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500 mb-3 block">
              Get in touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to upgrade your signage?
            </h2>
            <p className="text-neutral-400 max-w-lg mx-auto mb-8 leading-relaxed">
              Sign up for the Software Plan and start managing your screens today, or get in touch to discuss the Managed Service for your UK business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://signagepanel.app/register"
                className="inline-flex items-center justify-center gap-2 bg-crimson-700 hover:bg-crimson-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm"
              >
                Get Started
                <ArrowRight size={16} />
              </a>
              <a
                href="https://wa.me/447311799407"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-neutral-700 hover:border-green-500 text-neutral-300 hover:text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-400"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <a href="#" className="flex items-center gap-2 mb-2">
              <img src="/amazon_icon_114x114_new.png" alt="SignagePanel" className="h-8 w-8 rounded-md" />
              <span className="text-lg font-bold text-white">
                Signage<span className="text-crimson-500">Panel</span>
              </span>
            </a>
            <p className="text-sm text-neutral-500">Manage your screens from anywhere.</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: 'Privacy Policy', href: 'https://signagepanel.app/privacy' },
              { label: 'Contact', href: 'https://wa.me/447311799407' },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800">
          <p className="text-xs text-neutral-600">© 2025 SignagePanel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <Navbar dark={dark} toggleDark={() => setDark((d) => !d)} />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
