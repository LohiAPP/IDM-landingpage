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
  Video,
  RefreshCw,
  PlusCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

function Counter({
  to,
  suffix = "",
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
}) {
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
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [formContext, setFormContext] = useState("General Inquiry");
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    address: "",
    serviceAreas: "",
    phoneNumber: "",
    email: "",
    website: "",
    openingDate: "",
    operatingHours: "",
    businessDescription: "",
    hasPhotos: false,
    verificationMethod: "Video Verification",
    currentLocation: "",
  });
  const [locationLoading, setLocationLoading] = useState(false);

  const triggerFormModal = (context: string) => {
    setFormContext(context);
    setIsWhatsAppModalOpen(true);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            currentLocation: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          }));
          setLocationLoading(false);
        },
        (error) => {
          alert("Could not fetch location automatically. Please type it in manually.");
          setLocationLoading(false);
        },
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `*GMB Inquiry Details (${formContext})*

Business Name: ${formData.businessName || "N/A"}
Category: ${formData.category || "N/A"}
Address: ${formData.address || "N/A"}
Service Areas: ${formData.serviceAreas || "N/A"}
Phone Number: ${formData.phoneNumber || "N/A"}
Email: ${formData.email || "N/A"}
Website: ${formData.website || "N/A"}
Opening Date: ${formData.openingDate || "N/A"}
Operating Hours: ${formData.operatingHours || "N/A"}
Business Description: ${formData.businessDescription || "N/A"}
Photos: ${formData.hasPhotos ? "Yes, files ready to attach in chat" : "No"}
Verification Method: ${formData.verificationMethod || "N/A"}
Current Location: ${formData.currentLocation || "N/A"}`;

    const waUrl = `https://wa.me/918519837818?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
    setIsWhatsAppModalOpen(false);
  };

  return (
    <div className="bg-white text-[#0f172a] overflow-x-hidden">
      <Navbar triggerFormModal={triggerFormModal} />
      <Hero triggerFormModal={triggerFormModal} />
      <TrustBar />
      <WhoWeAre />
      <Services triggerFormModal={triggerFormModal} />
      <WhyUs />
      <Process />
      <Packages triggerFormModal={triggerFormModal} />
      <Results />
      <Testimonials />
      <FAQSection />
      <FinalCTA triggerFormModal={triggerFormModal} />
      <Footer />

      <Dialog open={isWhatsAppModalOpen} onOpenChange={setIsWhatsAppModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-display font-extrabold text-[#071B4D] text-2xl">
              GMB New Account Required Details
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-sm">
              Inquiry Context: <strong className="text-[#0B2A75]">{formContext}</strong>. Please
              fill out the details below. Once completed, click the button to send them directly to
              our GMB specialists via WhatsApp.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-5 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#071B4D] uppercase mb-1.5">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corporation"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#0B2A75] bg-slate-50 focus:bg-white transition-all text-[#071B4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#071B4D] uppercase mb-1.5">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dental Clinic"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#0B2A75] bg-slate-50 focus:bg-white transition-all text-[#071B4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#071B4D] uppercase mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#0B2A75] bg-slate-50 focus:bg-white transition-all text-[#071B4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#071B4D] uppercase mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. business@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#0B2A75] bg-slate-50 focus:bg-white transition-all text-[#071B4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#071B4D] uppercase mb-1.5">
                  Website
                </label>
                <input
                  type="text"
                  placeholder="e.g. www.acme.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#0B2A75] bg-slate-50 focus:bg-white transition-all text-[#071B4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#071B4D] uppercase mb-1.5">
                  Opening Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. MM/DD/YYYY or Date"
                  value={formData.openingDate}
                  onChange={(e) => setFormData({ ...formData, openingDate: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#0B2A75] bg-slate-50 focus:bg-white transition-all text-[#071B4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#071B4D] uppercase mb-1.5">
                  Service Areas *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shamshabad, Gachibowli"
                  value={formData.serviceAreas}
                  onChange={(e) => setFormData({ ...formData, serviceAreas: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#0B2A75] bg-slate-50 focus:bg-white transition-all text-[#071B4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#071B4D] uppercase mb-1.5">
                  Operating Hours
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9 AM - 6 PM"
                  value={formData.operatingHours}
                  onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#0B2A75] bg-slate-50 focus:bg-white transition-all text-[#071B4D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#071B4D] uppercase mb-1.5">
                Address *
              </label>
              <textarea
                required
                rows={2}
                placeholder="Full physical street address of your business"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#0B2A75] bg-slate-50 focus:bg-white transition-all text-[#071B4D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#071B4D] uppercase mb-1.5">
                Business Description (750 characters) *
              </label>
              <textarea
                required
                maxLength={750}
                rows={3}
                placeholder="Describe your business services, history, and goals (max 750 chars)..."
                value={formData.businessDescription}
                onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#0B2A75] bg-slate-50 focus:bg-white transition-all text-[#071B4D]"
              />
              <span className="text-[10px] text-slate-400 block mt-1 text-right">
                {formData.businessDescription.length}/750 characters
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#071B4D] uppercase mb-1.5">
                  Verification Method
                </label>
                <select
                  value={formData.verificationMethod}
                  onChange={(e) => setFormData({ ...formData, verificationMethod: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#0B2A75] bg-slate-50 focus:bg-white transition-all text-[#071B4D]"
                >
                  <option value="Video Verification">Video Verification</option>
                  <option value="Phone">Phone</option>
                  <option value="Email">Email</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#071B4D] uppercase mb-1.5">
                  Current Location
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coordinates or Address"
                    value={formData.currentLocation}
                    onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                    className="flex-grow rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#0B2A75] bg-slate-50 focus:bg-white transition-all text-[#071B4D]"
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={locationLoading}
                    className="px-3 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-[#071B4D] text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
                  >
                    {locationLoading ? "Fetching..." : "Get Location"}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start gap-3">
              <input
                type="checkbox"
                id="hasPhotos"
                checked={formData.hasPhotos}
                onChange={(e) => setFormData({ ...formData, hasPhotos: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0B2A75] focus:ring-[#0B2A75] cursor-pointer"
              />
              <label
                htmlFor="hasPhotos"
                className="text-xs text-slate-600 leading-normal cursor-pointer select-none"
              >
                <strong>Photos (Logo, Services, etc.): Attach files.</strong> By checking this box,
                you confirm that you have business photos ready. Due to WhatsApp limits, you will
                attach these photos directly in the WhatsApp chat.
              </label>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="px-5 py-3 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-yellow-gradient text-[#071B4D] text-xs font-extrabold tracking-wider uppercase shadow-yellow hover:scale-[1.02] transition-transform cursor-pointer flex items-center gap-2"
              >
                <MessageCircle size={14} className="text-[#22C55E]" /> SEND VIA WHATSAPP
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
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

function Navbar({ triggerFormModal }: { triggerFormModal: (context: string) => void }) {
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
          <button
            onClick={() => triggerFormModal("General Inquiry (Navbar)")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-sm font-semibold hover:bg-[#22C55E]/25 transition-all cursor-pointer"
          >
            <MessageCircle size={16} /> WhatsApp
          </button>
          <button
            onClick={() => triggerFormModal("Free Consultation Inquiry (Navbar)")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-gradient text-[#071B4D] text-sm font-bold shadow-yellow hover:scale-[1.03] transition-transform cursor-pointer"
          >
            Get Free Consultation <ArrowRight size={16} />
          </button>
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
              <button
                onClick={() => {
                  setOpen(false);
                  triggerFormModal("Free Consultation Inquiry (Navbar Mobile)");
                }}
                className="mt-2 text-center px-5 py-3 rounded-full bg-yellow-gradient text-[#071B4D] font-bold cursor-pointer"
              >
                Get Free Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- Hero ---------- */

function Hero({ triggerFormModal }: { triggerFormModal: (context: string) => void }) {
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
        <div className="grid lg:grid-cols-2 gap-14 items-start">
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
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => triggerFormModal("Free Consultation Inquiry (Hero)")}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-yellow-gradient text-[#071B4D] font-bold text-sm tracking-wide shadow-yellow cursor-pointer"
                >
                  GET STARTED <ArrowRight size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => triggerFormModal("General Inquiry (Hero)")}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 border border-white/20 backdrop-blur text-white font-bold text-sm tracking-wide hover:bg-white/10 cursor-pointer"
                >
                  <MessageCircle size={16} className="text-[#22C55E]" /> CHAT ON WHATSAPP
                </motion.button>
              </div>
            </Reveal>
          </div>

          {/* Right: composite graphic */}
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
    <div className="relative mx-auto lg:ml-auto w-full max-w-[380px] lg:-mt-10">
      {/* Background glow behind card for premium feel */}
      <div className="absolute -inset-4 bg-yellow-gradient opacity-10 blur-3xl rounded-[2.5rem]" />

      <div className="flex flex-col relative z-10">
        {/* Portrait Image */}
        <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-white shadow-premium">
          <img
            src="/assets/Sanvitha.png"
            alt="Bantaram Sanvitha"
            className="w-full aspect-[4/5] object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>

        {/* Details Card under the image */}
        <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm text-left">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-[#FFC400] animate-pulse" />
            <span className="text-[8px] font-extrabold text-[#FFC400] uppercase tracking-[0.2em]">
              GMB Specialist
            </span>
          </div>
          <h4 className="mt-1 font-display font-extrabold text-white text-sm sm:text-base leading-tight">
            Bantaram Sanvitha
          </h4>
          <p className="text-[9px] text-white/50 font-bold uppercase tracking-wider mt-0.5">
            GMB SEO Specialist
          </p>
          <p className="mt-2 text-white/80 text-[10px] leading-relaxed">
            With 5+ years of experience, I have helped 1,500+ business owners improve their Google Business Profiles, generate organic leads, and increase revenue through proven Local SEO strategies.
          </p>
        </div>
      </div>
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
              Your <span className="text-yellow-gradient">Growth Partner</span> In The Digital World
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

/* ---------- Services (Quick GMB Services) ---------- */

const QUICK_SERVICES = [
  {
    icon: Video,
    title: "VIDEO VERIFICATION",
    price: "Starting From ₹2,999",
    features: [
      "Google-Compliant Process",
      "Professional Verification Support",
      "Better Approval Chances",
      "Support Until Verified",
    ],
  },
  {
    icon: RefreshCw,
    title: "GMB PROFILE REINSTATEMENT",
    price: "Starting From ₹2,999",
    features: [
      "Suspension Analysis",
      "Policy Issue Resolution",
      "Appeal Submission",
      "Profile Recovery Assistance",
    ],
  },
  {
    icon: PlusCircle,
    title: "NEW GMB PROFILE CREATION",
    price: "Starting From ₹4,000",
    features: [
      "Complete Profile Setup",
      "Profile Optimization",
      "Category Setup",
      "Ranking Foundation",
    ],
  },
  {
    icon: PhoneCall,
    title: "GMB NUMBER UPDATE",
    price: "Starting From ₹2,999",
    features: [
      "Business Number Update",
      "WhatsApp Catalogue Setup",
      "Business Information Optimization",
      "Better Local Visibility",
    ],
  },
];

function Services({ triggerFormModal }: { triggerFormModal: (context: string) => void }) {
  return (
    <section id="services" className="py-24 lg:py-32 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC400]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0B2A75]/10 rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#0B2A75] uppercase">
            <span className="h-px w-8 bg-[#FFC400]" /> Popular Google Business Profile Services
          </span>
          <h2 className="mt-4 font-display font-extrabold text-[#071B4D] text-4xl lg:text-5xl">
            Popular Google Business Profile Services
          </h2>
          <p className="mt-3 font-display font-extrabold text-[#FFB000] text-xl">
            Everything you need to verify, recover, optimize, and grow your Google Business Profile.
          </p>
          <p className="mt-5 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Fast, reliable, and Google-compliant services designed to help businesses improve
            visibility, verification, and local growth.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {QUICK_SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl bg-white p-6 border border-slate-100 hover:border-[#FFC400]/40 hover:shadow-premium transition-all flex flex-col justify-between h-full"
            >
              <div>
                <div className="h-14 w-14 rounded-full bg-[#071B4D] flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                  <s.icon size={22} className="text-[#FFC400]" />
                </div>
                <h3 className="font-display font-extrabold text-[#071B4D] text-base leading-snug tracking-tight">
                  {s.title}
                </h3>
                <div className="mt-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Starting From{" "}
                  <span className="text-[#071B4D] font-extrabold text-sm normal-case">
                    {s.price.replace("Starting From ", "")}
                  </span>
                </div>
                <ul className="mt-5 space-y-3">
                  {s.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-slate-600 text-xs font-medium"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400] shrink-0 mt-1.5" />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-50">
                <button
                  onClick={() => triggerFormModal(`Quick GMB Service - ${s.title} (Learn More)`)}
                  className="px-3 py-2.5 rounded-full bg-slate-100 text-[#071B4D] hover:bg-slate-200 text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer text-center"
                >
                  Learn More
                </button>
                <button
                  onClick={() => triggerFormModal(`Quick GMB Service - ${s.title} (WhatsApp)`)}
                  className="px-3 py-2.5 rounded-full bg-[#071B4D] text-[#FFC400] hover:bg-[#0B2A75] text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer text-center flex items-center justify-center gap-1"
                >
                  <MessageCircle size={12} className="text-[#22C55E]" /> WhatsApp
                </button>
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
                <div
                  className={`pl-16 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}
                >
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

/* ---------- Packages (Google Business Profile Services) ---------- */

const GROWTH_PACKAGES = [
  {
    id: "starter",
    name: "STARTER GROWTH PACKAGE",
    price: "₹4,999",
    period: "Month",
    bestFor: "Best For: Businesses starting their Google Maps SEO journey.",
    badge: null,
    features: [
      {
        category: "Google Business Profile Optimization",
        items: [
          "Complete Profile Optimization",
          "100% Profile Strength Enhancement",
          "Additional Category Optimization",
          "WhatsApp & Call CTA Setup",
          "Google Q&A Optimization",
          "Product Listings Setup & Optimization",
          "Service Listings Optimization",
          "Business Information Accuracy Audit",
        ],
      },
      {
        category: "Local SEO & Keyword Research",
        items: [
          "Keyword Research",
          "Competitor Analysis",
          "Competitor Monitoring",
          "Local Citation Building",
        ],
      },
      {
        category: "Content Marketing",
        items: [
          "12 SEO Blog Posts",
          "Medium Publishing",
          "Blogger Publishing",
          "LinkedIn Publishing",
          "Quora Promotion",
        ],
      },
      {
        category: "Authority Building",
        items: [
          "24 High Quality Backlinks",
          "Local Brand Mentions",
          "Citation Enhancement",
        ],
      },
      {
        category: "GMB Activity Management",
        items: [
          "Weekly GMB Posts",
          "Weekly Photo Updates",
          "Geo Tagged Uploads",
          "Profile Freshness Optimization",
        ],
      },
      {
        category: "Reputation Management",
        items: [
          "Review Monitoring",
          "Review Response Support",
          "Customer Engagement Recommendations",
        ],
      },
      {
        category: "Reporting",
        items: [
          "Performance Report",
          "Keyword Ranking Report",
          "Maps Visibility Report",
          "Traffic Insights",
        ],
      },
    ],
  },
  {
    id: "growth",
    name: "GROWTH PACKAGE",
    price: "₹6,999",
    period: "Month",
    bestFor: "Best For: Businesses wanting stronger local visibility and ranking improvements.",
    badge: null,
    parentPlus: "Everything in Starter Package PLUS",
    features: [
      {
        category: "Advanced Local SEO",
        items: [
          "In-depth Keyword Research",
          "Competitor Keyword Tracking",
          "Apple Maps Optimization",
          "Bing Maps Optimization",
          "MapMyIndia Optimization",
          "Yellow Pages Submission",
          "Pinterest Local SEO Setup",
        ],
      },
      {
        category: "Social & Local Presence",
        items: [
          "Social Media Integration",
          "Cross Platform Consistency",
          "Local Visibility Enhancement",
        ],
      },
      {
        category: "Protection & Monitoring",
        items: [
          "Spam Listing Identification",
          "Competitor Spam Reporting",
          "Listing Health Monitoring",
        ],
      },
      {
        category: "Platforms Covered",
        items: [
          "Google Business Profile",
          "Apple Maps",
          "Bing Maps",
          "MapMyIndia",
          "Yellow Pages India",
          "Pinterest Local SEO",
        ],
      },
    ],
  },
  {
    id: "ultimate",
    name: "ULTIMATE GROWTH PACKAGE",
    price: "₹9,999",
    period: "Month",
    bestFor: "Best For: Businesses wanting maximum local visibility and multi-platform authority.",
    badge: null,
    parentPlus: "Everything in Growth Package PLUS",
    features: [
      {
        category: "Additional Business Listings",
        items: [
          "Click India",
          "Sulekha",
          "JustDial",
        ],
      },
      {
        category: "Strong Authority Building",
        items: [
          "Enhanced Citation Building",
          "Strong Brand Signals",
          "Higher Local Authority",
        ],
      },
      {
        category: "Social Media Integration",
        items: [
          "Facebook",
          "Instagram",
          "YouTube",
          "Twitter",
        ],
      },
      {
        category: "Additional Benefits",
        items: [
          "Better Ranking Signals",
          "More Trust",
          "Improved Visibility",
          "Increased Customer Reach",
        ],
      },
    ],
  },
  {
    id: "pro",
    name: "PRO PLAN – GROWTH & LEADS GENERATION",
    price: "₹16,999",
    period: "Month",
    bestFor: "Best For: Businesses focused on lead generation and aggressive growth.",
    badge: "MOST POPULAR",
    parentPlus: "Everything in Ultimate Package PLUS",
    features: [
      {
        category: "Social Media Management",
        items: [
          "Facebook Management",
          "Instagram Management",
          "YouTube Management",
          "Twitter/X Management",
          "Content Planning",
          "Regular Posting",
          "Community Engagement",
          "Hashtag Research",
        ],
      },
      {
        category: "Paid Ads & Lead Generation",
        items: [
          "Facebook Ads",
          "Instagram Ads",
          "Lead Generation Campaigns",
          "Audience Research",
          "High Converting Ad Creatives",
          "Lead Forms",
          "WhatsApp Lead Campaigns",
          "Conversion Tracking",
          "Monthly Ads Reports",
        ],
      },
      {
        category: "Additional Business Listings",
        items: [
          "Facebook Business Page",
          "Instagram Business Profile",
          "YouTube Channel Setup",
          "Twitter Profile Optimization",
        ],
      },
      {
        category: "Expected Results",
        items: [
          "Quality Leads",
          "More Enquiries",
          "WhatsApp Leads",
          "More Sales",
          "Better Local Visibility",
          "Higher Rankings",
        ],
      },
    ],
  },
];

const TRUST_ITEMS = [
  "Google Policy-Compliant Methods",
  "Experienced GMB Specialists",
  "Dedicated Account Manager",
  "Transparent Reporting",
  "High Success Rate",
  "Proven Local SEO Strategies",
  "Fast Support",
  "No Hidden Charges",
];

function Packages({ triggerFormModal }: { triggerFormModal: (context: string) => void }) {
  return (
    <section id="packages" className="py-24 lg:py-32 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header Section */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#0B2A75] uppercase">
            <span className="h-px w-8 bg-[#FFC400]" /> Packages
          </span>
          <h2 className="mt-4 font-display font-extrabold text-[#071B4D] text-4xl lg:text-5xl uppercase">
            GOOGLE BUSINESS PROFILE GROWTH PACKAGES
          </h2>
          <p className="mt-3 font-display font-extrabold text-[#FFB000] text-xl">
            Choose the Right Growth Package for Your Business
          </p>
          <p className="mt-5 text-slate-600 text-lg leading-relaxed">
            Whether you're just starting or looking for aggressive lead generation, our Google Business Profile growth packages help you rank higher, get more calls, generate leads, and grow your business.
          </p>
        </Reveal>

        {/* GROWTH PACKAGES GRID */}
        <div className="mt-16">
          <Reveal className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch">
              {GROWTH_PACKAGES.map((plan) => {
                const isPro = plan.id === "pro";
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl p-6 shadow-sm transition-all duration-300 flex flex-col bg-[#071B4D] text-white border hover:border-[#FFC400]/40 ${
                      isPro
                        ? "border-2 border-[#FFC400] shadow-premium xl:scale-[1.03] shadow-yellow"
                        : "border-slate-800 hover:shadow-premium"
                    }`}
                  >
                    {plan.badge && (
                      <span
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FFC400] text-[#071B4D] shadow-yellow"
                      >
                        {plan.badge}
                      </span>
                    )}

                    <div className="mb-4">
                      <span className="text-[10px] font-extrabold tracking-widest uppercase block mb-1 text-[#FFC400]">
                        Growth Package
                      </span>
                      <h4 className="font-display font-extrabold text-xl sm:text-2xl leading-tight min-h-[56px] flex items-center text-white">
                        {plan.name}
                      </h4>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="font-display font-black text-3xl sm:text-4xl text-[#FFC400]">
                          {plan.price}
                        </span>
                        <span className="text-xs font-semibold text-white/60">
                          / {plan.period}
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-normal font-medium min-h-[36px] text-white/80">
                        {plan.bestFor}
                      </p>
                    </div>

                    <div className="border-t pt-4 mb-6 flex-grow flex flex-col border-slate-800">
                      {plan.parentPlus && (
                        <div className="mb-3 flex items-center gap-2 p-2 rounded-lg text-xs font-bold bg-white/5 text-[#FFC400]">
                          <Sparkles size={12} className="shrink-0 animate-pulse" />
                          <span>{plan.parentPlus}</span>
                        </div>
                      )}
                      
                      {/* Features List with custom scrollbar */}
                      <div className="overflow-y-auto max-h-[300px] pr-1.5 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800">
                        {plan.features.map((cat, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <h5 className="text-[9px] font-black uppercase tracking-wider text-[#FFC400]/90 border-b border-white/5 pb-0.5">
                              {cat.category}
                            </h5>
                            <ul className="space-y-1">
                              {cat.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-white/90">
                                  <Check size={11} className="shrink-0 mt-0.5 text-[#FFC400]" strokeWidth={3} />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t flex flex-col gap-2 border-slate-800">
                      <button
                        onClick={() => triggerFormModal(`Growth Package - ${plan.name} (Get Started)`)}
                        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 ${
                          isPro
                            ? "bg-yellow-gradient text-[#071B4D] shadow-yellow hover:scale-[1.03] cursor-pointer"
                            : "bg-white text-[#071B4D] hover:bg-slate-100 hover:scale-[1.02] cursor-pointer"
                        }`}
                      >
                        GET STARTED
                      </button>
                      <button
                        onClick={() => triggerFormModal(`Growth Package - ${plan.name} (WhatsApp Now)`)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer border-white/20 text-white bg-white/5 hover:bg-white/10"
                      >
                        <MessageCircle size={14} className="text-[#22C55E]" /> WHATSAPP NOW
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* TRUST SECTION BELOW PLANS */}
        <div className="mt-28 border-t border-slate-200/60 pt-20">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-display font-extrabold text-[#071B4D] text-3xl">TRUST SECTION</h3>
            <p className="mt-2 text-slate-600 font-medium">
              Why Businesses Choose Our GMB Services
            </p>
          </Reveal>

          <Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRUST_ITEMS.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-premium hover:border-[#FFC400]/40 transition-all group"
                >
                  <div className="h-10 w-10 rounded-xl bg-yellow-gradient grid place-items-center shrink-0 shadow-yellow group-hover:rotate-3 transition-transform">
                    <Check size={18} className="text-[#071B4D]" strokeWidth={3} />
                  </div>
                  <span className="font-display font-bold text-[#071B4D] text-sm leading-tight">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
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

function FinalCTA({ triggerFormModal }: { triggerFormModal: (context: string) => void }) {
  const ctaContacts = [
    { icon: Phone, l: "Call us", v: "8519837818", href: "tel:8519837818" },
    {
      icon: MessageCircle,
      l: "WhatsApp",
      v: "8519837818",
      onClick: () => triggerFormModal("WhatsApp Contact (CTA)"),
    },
    {
      icon: MapPin,
      l: "Visit",
      v: "Villa no-19, MRO Colony, Shamshabad, Hyderabad",
      href: "https://maps.google.com/?q=Villa+no-19,+mro+colony,+H.no-+11-243/2,+railway+station+road,+opposite+ESI+dispensary,+Shamshabad,+Hyderabad,+Telangana+501218",
    },
  ];

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
                  Ready To Improve Your Google Maps Rankings?
                </h2>
                <p className="mt-5 text-white/75 text-lg max-w-xl">
                  Get expert Google Business Profile support and start attracting more local
                  customers.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => triggerFormModal("Book Free Consultation (CTA)")}
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-yellow-gradient text-[#071B4D] font-bold text-sm tracking-wide shadow-yellow cursor-pointer text-left"
                  >
                    BOOK FREE CONSULTATION <ArrowRight size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => triggerFormModal("WhatsApp Inquiry (CTA)")}
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 border border-white/20 backdrop-blur text-white font-bold text-sm tracking-wide hover:bg-white/15 cursor-pointer text-left"
                  >
                    <MessageCircle size={16} className="text-[#22C55E]" /> WHATSAPP NOW
                  </motion.button>
                </div>
              </div>
              <div className="grid gap-3">
                {ctaContacts.map((c) => {
                  const isButton = !!c.onClick;
                  const Component = isButton ? "button" : c.href ? "a" : "div";
                  return (
                    <Component
                      key={c.l}
                      href={!isButton ? c.href || undefined : undefined}
                      onClick={c.onClick}
                      className="flex items-center text-left w-full gap-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur p-4 hover:bg-white/[0.1] transition-all cursor-pointer"
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
                    </Component>
                  );
                })}
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
