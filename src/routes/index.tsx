import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  animate,
  AnimatePresence,
} from "motion/react";
import {
  MapPin,
  Search,
  Megaphone,
  Share2,
  Target,
  Users,
  Briefcase,
  FileText,
  Check,
  X,
  Phone,
  Star,
  ArrowRight,
  MessageCircle,
  TrendingUp,
  Sparkles,
  Zap,
  Shield,
  Award,
  ChevronDown,
  Menu,
  PhoneCall,
  BarChart3,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IDM Smart Tech — Grow With Google Business Profile & Local SEO" },
      {
        name: "description",
        content:
          "Boost local visibility, rank higher on Google Maps, generate more calls and grow revenue with IDM Smart Tech — your digital growth partner.",
      },
    ],
  }),
  component: Index,
});

/* ---------- Reusable ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, mv]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- Page ---------- */

function Index() {
  return (
    <div className="bg-white text-[#0f172a] overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      <WhoWeAre />
      <Services />
      <WhyUs />
      <Process />
      <Packages />
      <Results />
      <Testimonials />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------- Navbar ---------- */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-navy py-3" : "bg-[#071B4D]/90 py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 flex items-center justify-between gap-6">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-yellow-gradient grid place-items-center shadow-yellow group-hover:scale-110 transition-transform">
              <span className="font-display font-extrabold text-[#071B4D] text-lg">I</span>
            </div>
          </div>
          <div className="leading-tight">
            <div className="font-display font-extrabold text-white text-base tracking-tight">
              IDM Smart Tech
            </div>
            <div className="text-[10px] text-white/60 font-medium tracking-wider uppercase">
              Digital Growth Partner
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-3.5 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors group"
            >
              {l.label}
              <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-[#FFC400] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <a
            href="https://wa.me/919999999999"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-sm font-semibold hover:bg-[#22C55E]/25 transition-all"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-gradient text-[#071B4D] text-sm font-bold shadow-yellow hover:scale-[1.03] transition-transform"
          >
            Get Free Consultation <ArrowRight size={16} />
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden text-white p-2"
          aria-label="Menu"
        >
          <Menu />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#071B4D] border-t border-white/10"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-white/80 hover:text-[#FFC400] text-sm font-medium"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 text-center px-5 py-3 rounded-full bg-yellow-gradient text-[#071B4D] font-bold"
              >
                Get Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-primary-gradient overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute inset-0 radial-glow" />
      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
                <Sparkles size={14} className="text-[#FFC400]" />
                <span className="text-[11px] font-bold text-white/90 tracking-[0.18em]">
                  LOCAL SEO • GOOGLE BUSINESS PROFILE • GROWTH
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05]">
                GROW YOUR BUSINESS WITH{" "}
                <span className="text-yellow-gradient">GOOGLE BUSINESS PROFILE</span> & LOCAL SEO
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">
                Boost your local visibility, rank higher on Google Maps, generate more calls,
                attract more customers, and grow your revenue with proven local SEO strategies.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
                {[
                  { icon: TrendingUp, label: "Higher Rankings" },
                  { icon: PhoneCall, label: "More Calls" },
                  { icon: Users, label: "More Customers" },
                  { icon: BarChart3, label: "More Growth" },
                ].map((f) => (
                  <motion.div
                    key={f.label}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur"
                  >
                    <div className="h-7 w-7 rounded-lg bg-yellow-gradient grid place-items-center">
                      <f.icon size={14} className="text-[#071B4D]" />
                    </div>
                    <span className="text-white text-sm font-semibold">{f.label}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap gap-3">
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-yellow-gradient text-[#071B4D] font-bold text-sm tracking-wide shadow-yellow"
                >
                  GET STARTED <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://wa.me/919999999999"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 border border-white/20 backdrop-blur text-white font-bold text-sm tracking-wide hover:bg-white/10"
                >
                  <MessageCircle size={16} className="text-[#22C55E]" /> CHAT ON WHATSAPP
                </motion.a>
              </div>
            </Reveal>
          </div>

          {/* Right: device mockup */}
          <Reveal delay={0.2}>
            <HeroMockup />
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative mx-auto max-w-[420px]">
      {/* floating badges */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-8 top-16 z-20 hidden sm:block"
      >
        <div className="bg-white rounded-2xl shadow-premium px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#22C55E]/15 grid place-items-center">
            <PhoneCall size={16} className="text-[#22C55E]" />
          </div>
          <div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Calls
            </div>
            <div className="text-sm font-extrabold text-[#071B4D]">+220% this month</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-6 top-1/3 z-20 hidden sm:block"
      >
        <div className="bg-white rounded-2xl shadow-premium px-4 py-3">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Profile Strength
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "94%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.4 }}
                className="h-full bg-yellow-gradient"
              />
            </div>
            <span className="text-xs font-bold text-[#071B4D]">94%</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 bottom-20 z-20 hidden sm:block"
      >
        <div className="bg-[#071B4D] rounded-2xl shadow-premium px-4 py-3 flex items-center gap-2 border border-white/10">
          <Award size={16} className="text-[#FFC400]" />
          <div>
            <div className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">
              Local Rank
            </div>
            <div className="text-sm font-extrabold text-white">#1 in Area</div>
          </div>
        </div>
      </motion.div>

      {/* phone */}
      <motion.div
        initial={{ rotateY: -15, rotateX: 8, scale: 0.9, opacity: 0 }}
        whileInView={{ rotateY: -6, rotateX: 4, scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        className="relative"
      >
        <div className="relative rounded-[3rem] bg-[#0a0a0a] p-3 shadow-premium border border-white/10">
          <div className="relative rounded-[2.5rem] bg-white overflow-hidden aspect-[9/19]">
            {/* notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 h-6 w-28 rounded-full bg-[#0a0a0a]" />
            {/* GBP UI */}
            <div className="px-4 pt-10 pb-4 h-full bg-gradient-to-b from-white to-[#F8FAFC]">
              {/* business header */}
              <div className="mt-4 flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-primary-gradient grid place-items-center shadow-premium">
                  <span className="text-white font-display font-extrabold text-xl">I</span>
                </div>
                <div>
                  <div className="font-display font-extrabold text-[#071B4D] text-[15px] leading-tight">
                    IDM Smart Tech
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Digital Marketing Agency</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={10} className="fill-[#FFC400] text-[#FFC400]" />
                    ))}
                    <span className="text-[10px] font-bold text-[#071B4D] ml-1">4.9</span>
                    <span className="text-[9px] text-slate-400">(312)</span>
                  </div>
                </div>
              </div>

              {/* action chips */}
              <div className="mt-4 grid grid-cols-4 gap-1.5">
                {[
                  { icon: PhoneCall, l: "Call" },
                  { icon: MapPin, l: "Route" },
                  { icon: Share2, l: "Share" },
                  { icon: Search, l: "Site" },
                ].map((a) => (
                  <div
                    key={a.l}
                    className="flex flex-col items-center gap-1 py-2 rounded-xl bg-[#071B4D]/5 border border-[#071B4D]/10"
                  >
                    <a.icon size={14} className="text-[#0B2A75]" />
                    <span className="text-[9px] font-semibold text-[#071B4D]">{a.l}</span>
                  </div>
                ))}
              </div>

              {/* metric cards */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white border border-slate-100 p-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-slate-500 font-semibold uppercase">Views</span>
                    <TrendingUp size={10} className="text-[#22C55E]" />
                  </div>
                  <div className="mt-1 font-display font-extrabold text-[#071B4D] text-lg">
                    12.4K
                  </div>
                  <div className="text-[9px] text-[#22C55E] font-bold">+38% MoM</div>
                </div>
                <div className="rounded-xl bg-white border border-slate-100 p-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-slate-500 font-semibold uppercase">Calls</span>
                    <PhoneCall size={10} className="text-[#22C55E]" />
                  </div>
                  <div className="mt-1 font-display font-extrabold text-[#071B4D] text-lg">847</div>
                  <div className="text-[9px] text-[#22C55E] font-bold">+220% MoM</div>
                </div>
              </div>

              {/* rank pill */}
              <div className="mt-3 rounded-xl bg-primary-gradient p-3 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider opacity-70 font-semibold">
                      Local Rank
                    </div>
                    <div className="font-display font-extrabold text-lg leading-none mt-1">
                      #1 of 47
                    </div>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-yellow-gradient grid place-items-center">
                    <Award size={16} className="text-[#071B4D]" />
                  </div>
                </div>
              </div>

              {/* mini chart */}
              <div className="mt-3 rounded-xl bg-white border border-slate-100 p-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold text-slate-500 uppercase">
                    Customer Actions
                  </span>
                  <span className="text-[9px] font-bold text-[#22C55E]">+180%</span>
                </div>
                <div className="mt-2 flex items-end gap-1 h-12">
                  {[40, 55, 38, 70, 60, 88, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.07 }}
                      className="flex-1 bg-yellow-gradient rounded-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Trust Bar ---------- */

function TrustBar() {
  const items = [
    { icon: Users, label: "500+ Businesses Supported" },
    { icon: Star, label: "4.9 / 5 Client Rating" },
    { icon: Target, label: "100% Result Oriented" },
    { icon: BarChart3, label: "Transparent Reporting" },
    { icon: Shield, label: "No Long-Term Contracts" },
  ];
  return (
    <section className="py-10 bg-[#F8FAFC] border-y border-slate-200/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 border border-slate-100 hover:shadow-premium transition-all h-full"
              >
                <div className="h-11 w-11 rounded-xl bg-yellow-gradient grid place-items-center shrink-0">
                  <it.icon size={18} className="text-[#071B4D]" />
                </div>
                <span className="text-sm font-bold text-[#071B4D] leading-tight">{it.label}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Who We Are ---------- */

function WhoWeAre() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#0B2A75] uppercase">
              <span className="h-px w-8 bg-[#FFC400]" /> Who We Are
            </span>
            <h2 className="mt-4 font-display font-extrabold text-[#071B4D] text-4xl lg:text-5xl leading-tight">
              Your <span className="text-yellow-gradient">Growth Partner</span> In The Digital
              World
            </h2>
            <p className="mt-6 text-slate-600 text-lg leading-relaxed">
              We don't just offer services — we build partnerships. At IDM Smart Tech, we step in as
              your dedicated digital growth partner, aligning every campaign, every optimization,
              and every report with one outcome: measurable business growth.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Dedicated growth strategist for every client",
                "Local SEO and Google Business Profile specialists",
                "Transparent reporting with real KPIs, not vanity metrics",
              ].map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#22C55E]/15 grid place-items-center mt-0.5 shrink-0">
                    <Check size={13} className="text-[#22C55E]" strokeWidth={3} />
                  </div>
                  <span className="text-slate-700 font-medium">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-6 bg-yellow-gradient opacity-20 blur-3xl rounded-full" />
            <div className="relative rounded-3xl bg-primary-gradient p-8 shadow-premium overflow-hidden">
              <div className="absolute inset-0 grid-pattern opacity-40" />
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  { v: "500+", l: "Active Clients", icon: Users },
                  { v: "8+ Yrs", l: "Experience", icon: Award },
                  { v: "32+", l: "Industries Served", icon: Briefcase },
                  { v: "₹2Cr+", l: "Ad Spend Managed", icon: BarChart3 },
                ].map((s, i) => (
                  <motion.div
                    key={s.l}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur p-5"
                  >
                    <s.icon className="text-[#FFC400]" size={22} />
                    <div className="mt-3 font-display font-extrabold text-white text-3xl">
                      {s.v}
                    </div>
                    <div className="text-white/60 text-xs font-semibold mt-1 uppercase tracking-wider">
                      {s.l}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="relative mt-6 p-5 rounded-2xl bg-yellow-gradient">
                <p className="text-[#071B4D] font-display font-extrabold text-lg leading-snug">
                  "We don't just build your presence. We build your growth."
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

const SERVICES = [
  {
    icon: MapPin,
    title: "Google Business Profile Optimization",
    desc: "Rank in the Map Pack, fully optimized listings, posts, photos, and review management.",
  },
  {
    icon: Search,
    title: "Local SEO",
    desc: "Geo-targeted SEO that brings high-intent local customers straight to your business.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "End-to-end strategy across SEO, content, email, and performance marketing.",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "On-brand content, community growth, and engagement that converts followers to buyers.",
  },
  {
    icon: Target,
    title: "Paid Advertising",
    desc: "High-ROAS Google and Meta ads, optimized weekly for cost-per-lead and revenue.",
  },
  {
    icon: Users,
    title: "Lead Generation",
    desc: "Predictable inbound and outbound lead systems built around your sales process.",
  },
  {
    icon: Briefcase,
    title: "Business Consulting",
    desc: "Growth roadmaps, pricing, positioning, and operations advice from senior strategists.",
  },
  {
    icon: FileText,
    title: "Taxation & Registration",
    desc: "GST, MSME, company registration, and compliance — handled end-to-end by experts.",
  },
];

function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC400]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0B2A75]/10 rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#0B2A75] uppercase">
            <span className="h-px w-8 bg-[#FFC400]" /> What We Do
          </span>
          <h2 className="mt-4 font-display font-extrabold text-[#071B4D] text-4xl lg:text-5xl">
            Premium Services Built For <span className="text-yellow-gradient">Real Growth</span>
          </h2>
          <p className="mt-5 text-slate-600 text-lg">
            Eight focused services, one growth engine — built around the way local businesses
            actually win customers.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl bg-white p-6 border border-slate-100 hover:border-[#FFC400]/40 hover:shadow-premium transition-all"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-yellow-gradient rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <div className="h-12 w-12 rounded-2xl bg-yellow-gradient grid place-items-center shadow-yellow group-hover:rotate-6 transition-transform">
                <s.icon size={20} className="text-[#071B4D]" />
              </div>
              <h3 className="mt-5 font-display font-extrabold text-[#071B4D] text-base leading-snug">
                {s.title}
              </h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-[#0B2A75] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Us ---------- */

const WHY_ROWS = [
  { label: "One-stop digital + business solution", us: true, them: false },
  { label: "Specialized Local SEO & GBP expertise", us: true, them: false },
  { label: "Business support: taxation, registration, consulting", us: true, them: false },
  { label: "In-house training programs for your team", us: true, them: false },
  { label: "Growth-focused KPIs, not vanity metrics", us: true, them: false },
  { label: "Transparent weekly communication", us: true, them: false },
  { label: "Long lock-in contracts", us: false, them: true },
  { label: "Generic, template-driven strategies", us: false, them: true },
];

function WhyUs() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#0B2A75] uppercase">
            <span className="h-px w-8 bg-[#FFC400]" /> Why IDM Smart Tech
          </span>
          <h2 className="mt-4 font-display font-extrabold text-[#071B4D] text-4xl lg:text-5xl">
            IDM Smart Tech vs <span className="text-slate-400">Traditional Agencies</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-3xl overflow-hidden border border-slate-200 shadow-premium bg-white">
            <div className="grid grid-cols-[1.6fr_1fr_1fr] bg-primary-gradient text-white text-sm font-bold">
              <div className="px-5 py-5">Capability</div>
              <div className="px-5 py-5 text-center bg-yellow-gradient text-[#071B4D] flex items-center justify-center gap-2">
                <Zap size={16} /> IDM Smart Tech
              </div>
              <div className="px-5 py-5 text-center opacity-80">Traditional Agencies</div>
            </div>
            {WHY_ROWS.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`grid grid-cols-[1.6fr_1fr_1fr] items-center text-sm ${
                  i % 2 ? "bg-[#F8FAFC]" : "bg-white"
                }`}
              >
                <div className="px-5 py-4 font-semibold text-[#071B4D]">{r.label}</div>
                <div className="px-5 py-4 text-center">
                  {r.us ? (
                    <span className="inline-flex h-8 w-8 rounded-full bg-[#22C55E]/15 items-center justify-center">
                      <Check size={16} className="text-[#22C55E]" strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="inline-flex h-8 w-8 rounded-full bg-slate-100 items-center justify-center">
                      <X size={16} className="text-slate-400" />
                    </span>
                  )}
                </div>
                <div className="px-5 py-4 text-center">
                  {r.them ? (
                    <span className="inline-flex h-8 w-8 rounded-full bg-slate-100 items-center justify-center">
                      <Check size={16} className="text-slate-500" />
                    </span>
                  ) : (
                    <span className="inline-flex h-8 w-8 rounded-full bg-slate-100 items-center justify-center">
                      <X size={16} className="text-slate-400" />
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

const STEPS = [
  {
    n: "01",
    title: "Business Analysis",
    desc: "We audit your business, market, competitors, and current digital footprint to find real opportunities.",
  },
  {
    n: "02",
    title: "Strategy Planning",
    desc: "A clear, milestone-based growth plan with KPIs, timelines, channels, and a transparent budget.",
  },
  {
    n: "03",
    title: "Implementation",
    desc: "Our specialists execute SEO, GBP, ads, content, and lead systems — built for compounding returns.",
  },
  {
    n: "04",
    title: "Growth & Optimization",
    desc: "Weekly reviews, monthly reporting, continuous testing — we scale what works and cut what doesn't.",
  },
];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" className="py-24 lg:py-32 bg-[#071B4D] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#FFC400] uppercase">
            <span className="h-px w-8 bg-[#FFC400]" /> Our Process
          </span>
          <h2 className="mt-4 font-display font-extrabold text-white text-4xl lg:text-5xl">
            A 4-Step <span className="text-yellow-gradient">Growth Framework</span>
          </h2>
          <p className="mt-5 text-white/70 text-lg">
            Repeatable, measurable, and proven across 500+ businesses.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-16 max-w-3xl mx-auto">
          {/* timeline line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-yellow-gradient"
          />

          <div className="space-y-12">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${
                  i % 2 ? "md:[&>:first-child]:order-2" : ""
                }`}
              >
                <div className={`pl-16 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                  <div className="text-yellow-gradient font-display font-extrabold text-5xl">
                    {s.n}
                  </div>
                  <h3 className="mt-2 font-display font-extrabold text-white text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-white/70 leading-relaxed">{s.desc}</p>
                </div>
                {/* node */}
                <div className="absolute left-6 md:left-1/2 top-2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="h-6 w-6 rounded-full bg-yellow-gradient ring-4 ring-[#071B4D] shadow-yellow"
                  />
                </div>
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Packages ---------- */

const PACKAGES = [
  {
    name: "Starter Growth",
    price: "₹9,999",
    period: "/ month",
    badge: null as string | null,
    desc: "Perfect for new local businesses ready to claim their online presence.",
    features: [
      "Google Business Profile setup & optimization",
      "Local SEO foundations (5 keywords)",
      "Monthly performance report",
      "Review response management",
      "WhatsApp support",
    ],
  },
  {
    name: "Growth",
    price: "₹19,999",
    period: "/ month",
    badge: "MOST POPULAR",
    desc: "Built for growing businesses that need a steady stream of local leads.",
    features: [
      "Everything in Starter, plus:",
      "Local SEO (15 keywords + citations)",
      "Weekly GBP posts & content",
      "Social media management (2 platforms)",
      "Dedicated growth strategist",
      "Bi-weekly strategy calls",
    ],
  },
  {
    name: "Ultimate Growth",
    price: "₹39,999",
    period: "/ month",
    badge: "BEST VALUE",
    desc: "Full-stack growth engine for ambitious businesses serious about scale.",
    features: [
      "Everything in Growth, plus:",
      "Aggressive local + national SEO",
      "Paid ads management (Google + Meta)",
      "Landing pages & CRO",
      "Full social + content calendar",
      "Lead generation system",
    ],
  },
  {
    name: "Pro Growth & Leads",
    price: "Custom",
    period: "",
    badge: null,
    desc: "Tailored lead-generation programs with guaranteed pipeline targets.",
    features: [
      "Custom lead targets & SLAs",
      "Dedicated paid-ads strategist",
      "CRM integration & automation",
      "Sales enablement support",
      "Quarterly business reviews",
    ],
  },
];

function Packages() {
  return (
    <section id="packages" className="py-24 lg:py-32 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#0B2A75] uppercase">
            <span className="h-px w-8 bg-[#FFC400]" /> Packages
          </span>
          <h2 className="mt-4 font-display font-extrabold text-[#071B4D] text-4xl lg:text-5xl">
            Pricing Built For <span className="text-yellow-gradient">Every Stage</span>
          </h2>
          <p className="mt-5 text-slate-600 text-lg">
            Transparent monthly pricing. No long-term contracts. Cancel anytime.
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          {PACKAGES.map((p, i) => {
            const popular = p.badge === "MOST POPULAR";
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -10 }}
                className={`relative rounded-3xl p-7 border transition-all ${
                  popular
                    ? "bg-primary-gradient text-white border-[#FFC400]/40 shadow-premium scale-[1.02]"
                    : "bg-white text-[#071B4D] border-slate-200 hover:shadow-premium"
                }`}
              >
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-yellow-gradient text-[#071B4D] text-[10px] font-extrabold tracking-wider shadow-yellow">
                    {p.badge}
                  </div>
                )}
                <h3 className="font-display font-extrabold text-xl">{p.name}</h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    popular ? "text-white/70" : "text-slate-500"
                  }`}
                >
                  {p.desc}
                </p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span
                    className={`font-display font-extrabold text-4xl ${
                      popular ? "text-yellow-gradient" : "text-yellow-gradient"
                    }`}
                  >
                    {p.price}
                  </span>
                  <span className={`text-sm ${popular ? "text-white/60" : "text-slate-500"}`}>
                    {p.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        size={14}
                        strokeWidth={3}
                        className={popular ? "text-[#FFC400] mt-1 shrink-0" : "text-[#22C55E] mt-1 shrink-0"}
                      />
                      <span className={popular ? "text-white/90" : "text-slate-700"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-7 inline-flex w-full justify-center items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all ${
                    popular
                      ? "bg-yellow-gradient text-[#071B4D] shadow-yellow hover:scale-[1.02]"
                      : "bg-[#071B4D] text-white hover:bg-[#0B2A75]"
                  }`}
                >
                  Get Started <ArrowRight size={14} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Results ---------- */

function Results() {
  const stats = [
    { v: 220, suffix: "%", label: "More Calls", icon: PhoneCall },
    { v: 180, suffix: "%", label: "Higher Visibility", icon: TrendingUp },
    { v: 300, suffix: "%", label: "More Engagement", icon: Share2 },
    { v: 150, suffix: "%", label: "Quality Leads", icon: Target },
  ];
  return (
    <section className="py-24 lg:py-32 bg-primary-gradient relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFC400]/10 rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#FFC400] uppercase">
            <span className="h-px w-8 bg-[#FFC400]" /> Real Results
          </span>
          <h2 className="mt-4 font-display font-extrabold text-white text-4xl lg:text-5xl">
            Growth You Can <span className="text-yellow-gradient">Measure</span>
          </h2>
          <p className="mt-5 text-white/70 text-lg">
            Averages across our active clients in the last 12 months.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur p-7 text-center"
            >
              <div className="mx-auto h-12 w-12 rounded-2xl bg-yellow-gradient grid place-items-center shadow-yellow">
                <s.icon size={20} className="text-[#071B4D]" />
              </div>
              <div className="mt-5 font-display font-extrabold text-white text-5xl lg:text-6xl tracking-tight">
                +<Counter to={s.v} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-white/70 font-semibold text-sm tracking-wide uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

const TESTIMONIALS = [
  {
    name: "Rohan Mehta",
    business: "Mehta Dental Clinic, Pune",
    img: "https://i.pravatar.cc/120?img=12",
    quote:
      "Calls from Google Maps tripled in 90 days. Our chairs are booked two weeks out and the team is finally focused on patients, not marketing.",
  },
  {
    name: "Sneha Kapoor",
    business: "Bloom Boutique, Delhi",
    img: "https://i.pravatar.cc/120?img=47",
    quote:
      "IDM took our boutique from invisible to the #1 local result for our category. Walk-ins doubled and Instagram orders are now our biggest revenue channel.",
  },
  {
    name: "Vikram Iyer",
    business: "Iyer & Associates CA Firm",
    img: "https://i.pravatar.cc/120?img=33",
    quote:
      "Professional, transparent, and obsessed with results. Our inbound consultations from Google grew 4x — and they handled our GST registrations too.",
  },
  {
    name: "Anjali Verma",
    business: "Verma Wellness Studio",
    img: "https://i.pravatar.cc/120?img=45",
    quote:
      "Weekly reports, clear KPIs, and a team that actually picks up the phone. We've never had this level of clarity with any agency before.",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]" />
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#0B2A75] uppercase">
            <span className="h-px w-8 bg-[#FFC400]" /> Loved By Founders
          </span>
          <h2 className="mt-4 font-display font-extrabold text-[#071B4D] text-4xl lg:text-5xl">
            Stories From <span className="text-yellow-gradient">Real Growth</span>
          </h2>
        </Reveal>

        <div className="mt-14 relative h-[380px] sm:h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <div className="h-full rounded-3xl bg-primary-gradient p-10 lg:p-14 shadow-premium relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="relative">
                  <div className="flex items-center gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={18} className="fill-[#FFC400] text-[#FFC400]" />
                    ))}
                  </div>
                  <p className="text-white text-xl lg:text-2xl font-display font-semibold leading-snug">
                    "{TESTIMONIALS[i].quote}"
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <img
                      src={TESTIMONIALS[i].img}
                      alt={TESTIMONIALS[i].name}
                      className="h-14 w-14 rounded-full border-2 border-[#FFC400] object-cover"
                    />
                    <div>
                      <div className="font-display font-extrabold text-white">
                        {TESTIMONIALS[i].name}
                      </div>
                      <div className="text-white/60 text-sm">{TESTIMONIALS[i].business}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                idx === i ? "w-8 bg-yellow-gradient" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const FAQS = [
  {
    q: "How long does it take to see results from Local SEO?",
    a: "Most clients see meaningful movement in their Google Map Pack rankings within 30–60 days, with calls and leads compounding from month 3 onward. Some industries move faster — we'll set realistic expectations after the audit.",
  },
  {
    q: "Do you guarantee #1 rankings on Google?",
    a: "No serious agency can guarantee a specific position — anyone who does is misleading you. What we guarantee is a senior team, transparent reporting, proven methodology, and continuous optimization until the numbers move.",
  },
  {
    q: "What's the difference between Local SEO and Google Business Profile?",
    a: "Your Google Business Profile is the listing that appears on Maps and Search. Local SEO is the broader strategy — citations, reviews, on-site SEO, content, and authority — that makes your profile rank above competitors.",
  },
  {
    q: "Do you lock clients into long-term contracts?",
    a: "Never. All our packages are month-to-month. We earn the renewal every single month by delivering measurable growth.",
  },
  {
    q: "How is pricing decided for custom projects?",
    a: "Pricing is based on your industry competitiveness, target geography, and the depth of work required. After a 30-minute consultation we'll send a clear, itemized proposal — no hidden fees.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Yes. We currently serve clients across India, UAE, UK, USA, and Australia — primarily in service-based and local-presence industries.",
  },
];

function FAQSection() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#0B2A75] uppercase">
            <span className="h-px w-8 bg-[#FFC400]" /> FAQ
          </span>
          <h2 className="mt-4 font-display font-extrabold text-[#071B4D] text-4xl lg:text-5xl">
            Questions, <span className="text-yellow-gradient">Answered</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-slate-200 bg-white hover:bg-[#F8FAFC] data-[state=open]:bg-[#F8FAFC] data-[state=open]:border-[#FFC400]/40 transition-all px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-display font-extrabold text-[#071B4D] text-base hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */

function FinalCTA() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <div className="relative rounded-[2.5rem] bg-primary-gradient overflow-hidden p-10 lg:p-16 shadow-premium">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFC400]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#0B2A75] rounded-full blur-3xl opacity-50" />
            <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
              <div>
                <Sparkles className="text-[#FFC400]" size={26} />
                <h2 className="mt-4 font-display font-extrabold text-white text-4xl lg:text-6xl leading-[1.05]">
                  Ready To <span className="text-yellow-gradient">Grow</span> Your Business?
                </h2>
                <p className="mt-5 text-white/75 text-lg max-w-xl">
                  Let's build your digital presence, generate qualified leads, and grow your
                  revenue — starting with a free 30-minute strategy call.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href="mailto:hello@idmsmarttech.com"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-yellow-gradient text-[#071B4D] font-bold text-sm tracking-wide shadow-yellow"
                  >
                    Get Free Consultation <ArrowRight size={16} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://wa.me/919999999999"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 border border-white/20 backdrop-blur text-white font-bold text-sm tracking-wide hover:bg-white/15"
                  >
                    <MessageCircle size={16} className="text-[#22C55E]" /> WhatsApp Now
                  </motion.a>
                </div>
              </div>
              <div className="grid gap-3">
                {[
                  { icon: Phone, l: "Call us", v: "+91 99999 99999" },
                  { icon: MessageCircle, l: "WhatsApp", v: "+91 99999 99999" },
                  { icon: MapPin, l: "Visit", v: "Mumbai • Pune • Delhi NCR" },
                ].map((c) => (
                  <div
                    key={c.l}
                    className="flex items-center gap-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur p-4"
                  >
                    <div className="h-11 w-11 rounded-xl bg-yellow-gradient grid place-items-center shrink-0">
                      <c.icon size={18} className="text-[#071B4D]" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                        {c.l}
                      </div>
                      <div className="text-white font-bold">{c.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="bg-[#071B4D] text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-yellow-gradient grid place-items-center shadow-yellow">
                <span className="font-display font-extrabold text-[#071B4D] text-lg">I</span>
              </div>
              <div className="font-display font-extrabold text-lg">IDM Smart Tech</div>
            </div>
            <p className="mt-5 text-white/60 max-w-xs leading-relaxed">
              Your one-stop destination for all things digital. We don't just build your presence —
              we build your growth.
            </p>
            <div className="mt-5 flex gap-2">
              {["IG", "FB", "IN", "YT", "X"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-white/70 text-xs font-bold hover:bg-yellow-gradient hover:text-[#071B4D] transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          {[
            { h: "Company", items: ["About", "Process", "Careers", "Contact"] },
            {
              h: "Services",
              items: ["Local SEO", "Google Business Profile", "Paid Ads", "Lead Generation"],
            },
            { h: "Packages", items: ["Starter Growth", "Growth", "Ultimate Growth", "Pro Leads"] },
          ].map((col) => (
            <div key={col.h}>
              <div className="font-display font-extrabold text-sm tracking-wider uppercase text-[#FFC400]">
                {col.h}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-white/50 text-xs">
            © {new Date().getFullYear()} IDM Smart Tech. All rights reserved.
          </div>
          <div className="text-white/50 text-xs">
            Your One-Stop Destination For All Things Digital.
          </div>
        </div>
      </div>
    </footer>
  );
}
