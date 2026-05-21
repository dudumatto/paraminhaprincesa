const framer = window.framerMotion || window.Motion || {};
const motion = framer.motion || new Proxy({}, {
  get: (_, tag) => function MotionFallback({ children, ...props }) {
    const cleanProps = { ...props };
    delete cleanProps.initial;
    delete cleanProps.animate;
    delete cleanProps.exit;
    delete cleanProps.transition;
    delete cleanProps.whileHover;
    delete cleanProps.whileTap;
    delete cleanProps.variants;
    delete cleanProps.viewport;
    delete cleanProps.custom;
    return React.createElement(tag, cleanProps, children);
  }
});

const HEART_POINTS = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  size: 1.8 + (index % 5) * 0.72,
  left: `${(index * 17 + 11) % 100}%`,
  top: `${(index * 29 + 7) % 100}%`,
  delay: (index % 9) * 0.42,
  duration: 8 + (index % 7) * 0.9,
  opacity: 0.16 + (index % 6) * 0.045,
}));

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080307] text-rose-50 selection:bg-rose-300/30 selection:text-white">
      <DesignStyles />
      <CinematicBackground />
      <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:px-12 xl:px-16">
        <HeroPanel />
        <LoginCard />
      </section>
    </main>
  );
}

function CinematicBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(255,71,126,.22),transparent_30rem),radial-gradient(circle_at_80%_20%,rgba(255,172,203,.12),transparent_28rem),linear-gradient(135deg,#090306_0%,#180712_42%,#090407_100%)]" />
      <div className="absolute inset-0 opacity-[.075] bg-[linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_50%_50%,black,transparent_78%)]" />
      <div className="grain-layer absolute inset-0 opacity-[.16]" />
      <ParticleField />
    </div>
  );
}

function ParticleField() {
  return (
    <div className="absolute inset-0">
      {HEART_POINTS.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-rose-100 blur-[.2px]"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            opacity: particle.opacity,
            boxShadow: "0 0 18px rgba(255,126,166,.55)",
          }}
          initial={{ y: 34, scale: 0.7, opacity: 0 }}
          animate={{ y: [-10, -72, -16], x: [0, particle.id % 2 ? 18 : -14, 0], scale: [0.72, 1, 0.84], opacity: [0, particle.opacity, 0] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: [0.45, 0, 0.2, 1] }}
        />
      ))}
    </div>
  );
}

function HeroPanel() {
  return (
    <div className="relative flex min-h-[620px] flex-col justify-center py-8 lg:min-h-[720px]">
      <motion.div
        className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-rose-100/15 bg-white/[.045] px-4 py-2 text-xs font-semibold uppercase tracking-[.22em] text-rose-100/80 shadow-[0_0_32px_rgba(255,79,126,.08)] backdrop-blur-xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="h-2 w-2 rounded-full bg-rose-300 shadow-[0_0_18px_rgba(255,123,166,.9)]" />
        Heartbeat authentication
      </motion.div>

      <motion.h1
        className="max-w-3xl font-['Cormorant_Garamond'] text-[clamp(4.1rem,9vw,9.6rem)] font-semibold leading-[.82] tracking-[-.07em] text-white"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        Sign in where emotion meets precision.
      </motion.h1>

      <motion.p
        className="mt-7 max-w-2xl text-balance font-['Manrope'] text-lg leading-8 text-rose-100/68 sm:text-xl"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        A premium SaaS access layer with a cinematic heartbeat pulse, soft bloom, and a romantic red spectrum that feels alive without becoming theatrical.
      </motion.p>

      <div className="relative mt-12 grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-[.92fr_1.08fr]">
        <HeartOrb />
        <SignalStrip />
      </div>
    </div>
  );
}

function HeartOrb() {
  return (
    <motion.div
      className="glass-surface relative min-h-[300px] overflow-hidden rounded-[2.1rem] border border-white/12 p-6"
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,75,121,.25),transparent_17rem)]" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_28%,#ffe2ec_0%,#ff7da5_22%,#f72f68_48%,rgba(96,8,35,.7)_72%,transparent_100%)] shadow-[0_0_44px_rgba(255,70,116,.55),0_0_110px_rgba(255,55,105,.25)]"
        animate={{ scale: [1, 1.035, 1.09, 1.02, 1], filter: ["blur(0px)", "blur(0px)", "blur(.3px)", "blur(0px)", "blur(0px)"] }}
        transition={{ duration: 2.18, repeat: Infinity, ease: [0.34, 0, 0.14, 1], times: [0, 0.16, 0.24, 0.34, 1] }}
      />
      <motion.svg
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 overflow-visible drop-shadow-[0_0_26px_rgba(255,184,205,.72)]"
        viewBox="0 0 120 108"
        animate={{ scale: [1, 1.045, 1.15, 1.03, 1], opacity: [0.96, 1, 1, 0.98, 0.96] }}
        transition={{ duration: 2.18, repeat: Infinity, ease: [0.34, 0, 0.14, 1], times: [0, 0.16, 0.24, 0.34, 1] }}
        aria-hidden="true"
      >
        <path d="M60 97C32 73 12 55 12 33C12 16 25 5 41 5C51 5 58 11 60 19C62 11 69 5 79 5C95 5 108 16 108 33C108 55 88 73 60 97Z" fill="url(#heartPremium)" />
        <path d="M28 34C32 20 47 16 56 27" fill="none" stroke="rgba(255,255,255,.72)" strokeWidth="5" strokeLinecap="round" />
        <defs>
          <linearGradient id="heartPremium" x1="22" x2="94" y1="10" y2="92">
            <stop stopColor="#fff0f5" />
            <stop offset=".28" stopColor="#ff8daf" />
            <stop offset=".68" stopColor="#f12963" />
            <stop offset="1" stopColor="#9c113c" />
          </linearGradient>
        </defs>
      </motion.svg>
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.22em] text-rose-100/42">Pulse integrity</p>
          <p className="mt-1 text-2xl font-semibold text-white">98.7%</p>
        </div>
        <span className="rounded-full border border-rose-200/15 bg-rose-200/10 px-3 py-1 text-xs text-rose-50/72">live</span>
      </div>
    </motion.div>
  );
}

function SignalStrip() {
  const beats = [18, 34, 22, 58, 20, 38, 24, 70, 22, 42, 26, 52, 20, 36];
  return (
    <motion.div
      className="glass-surface relative overflow-hidden rounded-[2.1rem] border border-white/12 p-6"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[.22em] text-rose-100/42">Session rhythm</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-.03em] text-white">Breathing access</h2>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-right">
          <p className="text-[10px] uppercase tracking-[.18em] text-rose-100/38">latency</p>
          <p className="text-sm font-semibold text-rose-50">24ms</p>
        </div>
      </div>
      <div className="mt-9 flex h-28 items-end gap-2">
        {beats.map((height, index) => (
          <motion.span
            key={index}
            className="w-full rounded-full bg-gradient-to-t from-rose-950/30 via-rose-400/55 to-rose-100/90 shadow-[0_0_18px_rgba(255,97,139,.22)]"
            style={{ height }}
            animate={{ scaleY: [0.62, 1, 0.76, 1.12, 0.68], opacity: [0.46, 0.88, 0.62, 1, 0.48] }}
            transition={{ duration: 2.18, repeat: Infinity, delay: index * 0.045, ease: [0.34, 0, 0.14, 1] }}
          />
        ))}
      </div>
      <p className="mt-7 text-sm leading-6 text-rose-100/56">Motion uses transform and opacity only, tuned for a soft cardiac cadence and stable 60fps compositing.</p>
    </motion.div>
  );
}

function LoginCard() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [status, setStatus] = React.useState("idle");

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("signing");
    window.setTimeout(() => setStatus("ready"), 950);
  }

  return (
    <motion.aside
      className="relative mx-auto w-full max-w-[500px] lg:mr-0"
      initial={{ opacity: 0, x: 32, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.95, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
      aria-labelledby="login-title"
    >
      <div className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,94,135,.24),transparent_30rem)] blur-2xl" aria-hidden="true" />
      <div className="glass-card relative overflow-hidden rounded-[2.5rem] border border-white/14 p-5 shadow-[0_28px_90px_rgba(0,0,0,.58),0_0_70px_rgba(255,76,124,.13)] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-100/50 to-transparent" />
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.24em] text-rose-200/58">Ola Heart OS</p>
            <h2 id="login-title" className="mt-4 font-['Cormorant_Garamond'] text-5xl font-semibold leading-none tracking-[-.045em] text-white sm:text-6xl">Welcome back.</h2>
          </div>
          <motion.div
            className="grid h-14 w-14 place-items-center rounded-2xl border border-rose-100/15 bg-rose-100/10 shadow-[0_0_32px_rgba(255,91,132,.2)]"
            animate={{ scale: [1, 1.035, 1.1, 1.02, 1] }}
            transition={{ duration: 2.18, repeat: Infinity, ease: [0.34, 0, 0.14, 1] }}
            aria-hidden="true"
          >
            <span className="h-4 w-4 rotate-45 rounded-[.25rem] bg-rose-300 shadow-[0_0_18px_rgba(255,159,185,.8)] before:absolute before:h-4 before:w-4 before:-translate-y-2 before:rounded-full before:bg-rose-300 after:absolute after:h-4 after:w-4 after:-translate-x-2 after:rounded-full after:bg-rose-300" />
          </motion.div>
        </div>

        <form className="mt-9 grid gap-5" onSubmit={handleSubmit}>
          <Field label="Email address" htmlFor="email">
            <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@studio.com" className="input-shell" />
          </Field>
          <Field label="Password" htmlFor="password">
            <div className="relative">
              <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required placeholder="Enter your private key" className="input-shell pr-24" />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-xs font-semibold text-rose-100/68 transition hover:bg-white/8 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </Field>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={() => setRemember((value) => !value)} className="group flex items-center gap-3 text-left text-sm text-rose-100/68 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-200">
              <span className={`grid h-5 w-5 place-items-center rounded-md border transition ${remember ? "border-rose-200/40 bg-rose-300/25" : "border-white/18 bg-white/5"}`}>
                {remember && <span className="h-2 w-2 rounded-sm bg-rose-100" />}
              </span>
              Keep this heart trusted
            </button>
            <button type="button" className="text-sm font-semibold text-rose-100/74 underline decoration-rose-200/25 underline-offset-4 transition hover:text-white hover:decoration-rose-100">Recover access</button>
          </div>

          <motion.button
            type="submit"
            className="mt-2 h-14 rounded-2xl bg-gradient-to-r from-[#ff3f73] via-[#ff789c] to-[#ffd0df] px-6 font-bold text-[#2c0712] shadow-[0_18px_38px_rgba(255,70,111,.26),inset_0_1px_0_rgba(255,255,255,.48)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-100 disabled:cursor-wait disabled:opacity-80"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            disabled={status === "signing"}
          >
            {status === "signing" ? "Opening secure session…" : status === "ready" ? "Session pulse confirmed" : "Sign in securely"}
          </motion.button>
        </form>

        <div className="mt-8 grid gap-3 rounded-[1.6rem] border border-white/10 bg-black/18 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-rose-100/48">SSO providers</span>
            <span className="text-rose-100/62">Encrypted</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['Google', 'Apple', 'SAML'].map((item) => (
              <button key={item} type="button" className="h-11 rounded-xl border border-white/10 bg-white/[.045] text-sm font-semibold text-rose-50/72 transition hover:-translate-y-0.5 hover:border-rose-100/24 hover:bg-white/[.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <label className="grid gap-2" htmlFor={htmlFor}>
      <span className="text-sm font-semibold text-rose-50/78">{label}</span>
      {children}
    </label>
  );
}

function DesignStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; }
      body { margin: 0; font-family: 'Manrope', sans-serif; background: #080307; }
      .grain-layer { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.32'/%3E%3C/svg%3E"); }
      .glass-surface { background: linear-gradient(145deg, rgba(255,255,255,.105), rgba(255,255,255,.035)), radial-gradient(circle at 18% 0%, rgba(255,118,154,.13), transparent 18rem); backdrop-filter: blur(22px); box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 24px 70px rgba(0,0,0,.36); }
      .glass-card { background: linear-gradient(145deg, rgba(255,255,255,.135), rgba(255,255,255,.052)), radial-gradient(circle at 28% 0%, rgba(255,124,157,.18), transparent 18rem), rgba(20,5,12,.54); backdrop-filter: blur(28px) saturate(130%); }
      .input-shell { height: 3.55rem; width: 100%; border-radius: 1rem; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.055); padding: 0 1rem; color: rgba(255,250,252,.94); outline: none; transition: border-color .2s ease, background .2s ease, box-shadow .2s ease; }
      .input-shell::placeholder { color: rgba(255,231,238,.32); }
      .input-shell:hover { border-color: rgba(255,215,225,.2); background: rgba(255,255,255,.072); }
      .input-shell:focus { border-color: rgba(255,198,215,.58); box-shadow: 0 0 0 4px rgba(255,112,150,.14), 0 0 30px rgba(255,80,122,.12); }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .001ms !important; }
      }
    `}</style>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);