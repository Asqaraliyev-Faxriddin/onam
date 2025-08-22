import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music2, PauseCircle, PlayCircle, Sparkles } from "lucide-react";

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef(null);
  const [showBlessing, setShowBlessing] = useState(true);
  const [spark, setSpark] = useState(false);

  // Playlist
  const tracks = useMemo(
    () => [
      { title: "Onajonim", src: "/onajonim.mp3" }, // yangi qo'shiq
      { title: "Mehr ohangi", src: "/onam_ohang1.mp3" },
      { title: "Duo", src: "/onam_duo2.mp3" },
    ],
    []
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play().catch(() => {});
    else audio.pause();
  }, [playing, trackIndex]);

  function togglePlay() {
    setPlaying((p) => !p);
  }

  function nextTrack() {
    setTrackIndex((i) => (i + 1) % tracks.length);
    setPlaying(true);
  }

  function burstHearts() {
    setSpark(true);
    setTimeout(() => setSpark(false), 1200);
  }

  const momsQuotes = [
    "Onaning duosi – farzandning qalqoni.",
    "Onaning mehri – shifobaxsh yomg'ir.",
    "Onaning labidagi tabassum – uyimiz quyoshi.",
    "Onadan kechirim so'rasang, osmon ham yorishadi.",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Dinamik gradient fon */}
      <div
        className={`animated-gradient pointer-events-none ${
          playing ? "playing-glow" : ""
        }`}
      />

      {/* Uchi-uchi yuraklar */}
      <FloatingHearts />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-10 sm:py-16">
        {/* Hero */}
        <section className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid items-center gap-8 md:grid-cols-2"
          >
            <div className="order-2 md:order-1">
              <motion.h1
                className="text-balance text-4xl font-extrabold leading-tight drop-shadow-sm sm:text-5xl"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Onajon, kechiring…
              </motion.h1>
              <motion.p
                className="mt-4 text-pretty text-lg/7 text-white/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                Men sizning oldingizda bosh egaman. Ba'zan so'zlarim yoki jimligim
                ko'nglingizni og'ritgan bo'lsa, kechiring. Sizning tinimsiz
                mehnatingiz, duolaringiz va mehringiz tufayli bugun men shundayman.
                Siz – mening eng katta baxtim, ustozim va qalbimdagi doimiy quyoshimsiz.
              </motion.p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowBlessing((s) => !s)}
                  className="btn-soft"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Duolarim
                </button>
                <button onClick={burstHearts} className="btn-soft">
                  <Heart className="mr-2 h-5 w-5" />
                  Mehr yomg'iri
                </button>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="group relative mx-auto aspect-square w-64 overflow-hidden rounded-3xl shadow-xl sm:w-80"
              >
                <img
                  src="/onam.jpg"
                  alt="Onajonim"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />
                <motion.div
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
                  animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Audio pleer */}
        <section className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <Music2 className="h-6 w-6" />
              <p className="text-sm uppercase tracking-wider text-white/80">
                Ruhlantiruvchi ohanglar
              </p>
            </div>

            <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-base font-semibold">
                  {tracks[trackIndex].title}
                </p>
                <p className="text-xs text-white/70">
                  Onalar uchun sokin musiqalar
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="btn-circle"
                  aria-label={playing ? "Pauza" : "Ijro etish"}
                >
                  {playing ? (
                    <PauseCircle className="h-7 w-7" />
                  ) : (
                    <PlayCircle className="h-7 w-7" />
                  )}
                </button>
                <button
                  onClick={nextTrack}
                  className="btn-circle"
                  aria-label="Keyingi qo'shiq"
                >
                  ▶▶
                </button>
              </div>
            </div>

            <audio
              ref={audioRef}
              src={tracks[trackIndex].src}
              loop
              preload="auto"
            />
          </motion.div>

          {/* Lyrics chiqishi faqat Onajonim qo'shig'i bo'lsa */}
          {playing && trackIndex === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-lg text-pink-200"
            >
              “Onajonim, mehribonim... qalbimdagi eng go‘zal qo‘shig‘imsiz.”
            </motion.div>
          )}
        </section>

        {/* Ta'sirli so'zlar karuseli */}
        <section className="w-full">
          <QuoteCarousel quotes={momsQuotes} />
        </section>

        {/* Duolar bo‘limi */}
        <section className="w-full">
          <AnimatePresence mode="wait">
            {showBlessing && (
              <motion.div
                key="blessing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-2xl bg-white/10 p-6 text-pretty shadow-lg backdrop-blur-md"
              >
                <p className="text-lg leading-8">
                  Onajon, sizning oldingizda bosh egib, chin dildan{" "}
                  <span className="font-semibold">kechirim so'rayman</span>.
                  Meni tarbiyalab, har qadamimda duo qilib yurganingiz uchun
                  behad rahmat. Men sizni{" "}
                  <span className="font-semibold">
                    dunyodagi hamma narsadan ko'proq
                  </span>{" "}
                  yaxshi ko'raman. Har kuni sizni quvontiradigan farzand bo'lib
                  yashashga so'z beraman.
                </p>
                <p className="mt-4 text-white/90">
                  Agar biror gapim yoki ishlarim sizni xafa qilgan bo'lsa,
                  iltimos, yuragingizdek keng kechiring. Menga yana bir imkon
                  bering – men sizni yana va yana baxtli qilaman.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Tugmalar paneli */}
        <section className="w-full">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <ActionCard
              title="Mehr yomg'iri"
              desc="Ekranga mehrli yuraklar yog'adi."
              onClick={burstHearts}
            />
            <ActionCard
              title="Ovozli o'qish"
              desc="Matnni ovozda o'qib beradi."
              onClick={() =>
                speakUzbek(
                  "Onajonim kechiring. endi hava qilib qoydim Sizni juda yaxshi ko'raman. Hurmat illa Faxriddin Kechira qoling endi"
                )
              }
            />
            <ActionCard
              title="Musiqa"
              desc="Ohangni ijro etish/pauza."
              onClick={togglePlay}
            />
            <ActionCard
              title="Onajonim qo‘shig‘i"
              desc="Mashhur qo‘shiqni ijro etadi."
              onClick={() => {
                setTrackIndex(0);
                setPlaying(true);
              }}
            />
          </div>
        </section>

        {/* Pastki kichik e'tirof */}
        <footer className="mt-8 text-center text-sm text-white/70">
          Farzandingizdan – qalbimdagi eng go'zal so'zlar Siz uchundir. ❤️
        </footer>
      </main>

      {/* Emojili chaqnash effekti */}
      <AnimatePresence>{spark && <EmojiBurst />}</AnimatePresence>

      <ParallaxDecor />
      <style>{css}</style>
    </div>
  );
}

// === Kichik komponentlar ===
function ActionCard({ title, desc, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="rounded-2xl bg-white/10 p-5 text-left shadow-lg backdrop-blur-md transition-colors hover:bg-white/15"
    >
      <p className="text-base font-semibold">{title}</p>
      <p className="mt-1 text-sm text-white/80">{desc}</p>
    </motion.button>
  );
}

function FloatingHearts() {
  const hearts = new Array(16).fill(0);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%` }}
          initial={{ y: 0, opacity: 0.2, rotate: 0 }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 8 + (i % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}

function QuoteCarousel({ quotes }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % quotes.length),
      3500
    );
    return () => clearInterval(id);
  }, [quotes.length]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/10 p-6 backdrop-blur-md">
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg sm:text-xl"
        >
          “{quotes[idx]}”
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function EmojiBurst() {
  const emojis = ["💖", "🌷", "✨", "🌸", "💐", "🕊️", "💞"];
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 grid place-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative h-40 w-40">
        {new Array(20).fill(0).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            style={{ left: "50%", top: "50%" }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              opacity: 0,
              scale: 0.6,
              rotate: Math.random() * 180,
            }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            {emojis[i % emojis.length]}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function ParallaxDecor() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="decor decor-1" />
      <div className="decor decor-2" />
      <div className="decor decor-3" />
    </div>
  );
}

function speakUzbek(text) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "uz-UZ";
    utter.rate = 1;
    utter.pitch = 1;
    synth.cancel();
    synth.speak(utter);
  } catch {}
}

// === CSS ===
const css = `
:root { color-scheme: dark; }
body { margin: 0; }

.animated-gradient {
  position: fixed; inset: 0; z-index: 0;
  background: radial-gradient(1200px 1200px at 10% 10%, #ff78b9 0%, transparent 50%),
              radial-gradient(1000px 1000px at 90% 30%, #8b5cf6 0%, transparent 50%),
              radial-gradient(900px 900px at 30% 80%, #22d3ee 0%, transparent 50%),
              linear-gradient(135deg, #1f2937, #0b1020);
  filter: saturate(1.1) brightness(0.95);
  animation: hue 18s linear infinite;
}
.playing-glow {
  animation: pulseGlow 3s ease-in-out infinite;
}
@keyframes pulseGlow {
  0%, 100% { filter: brightness(1) saturate(1.1); }
  50% { filter: brightness(1.3) saturate(1.4); }
}
@keyframes hue {
  from { filter: hue-rotate(0deg) saturate(1.1) brightness(0.95); }
  to { filter: hue-rotate(360deg) saturate(1.1) brightness(0.95); }
}

.btn-soft {
  display: inline-flex; align-items: center; border-radius: 9999px;
  padding: 0.6rem 1rem; background: rgba(255,255,255,0.12);
  backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.18);
  transition: transform .2s ease, background .2s ease;
}
.btn-soft:hover {
  transform: translateY(-2px); background: rgba(255,255,255,0.18);
}

.btn-circle {
  display: grid; place-items: center;
  width: 42px; height: 42px; border-radius: 9999px;
  background: rgba(255,255,255,0.12); backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.18);
  transition: background .2s ease, transform .2s ease;
}

.btn-circle:hover {
  background: linear-gradient(45deg, #f472b6, #ec4899);
  transform: scale(1.05);
}

/* Audio Player Container */
.audio-player {
  margin-top: 2rem;
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.audio-player h3 {
  text-align: center;
  color: #ffe4e6;
  margin-bottom: 1rem;
}

.audio-player p {
  text-align: center;
  color: #fbcfe8;
  margin-bottom: 1rem;
}

.audio-player .controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.audio-player button {
  background: #ec4899;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.audio-player button:hover {
  background: #db2777;
  transform: scale(1.1);
}

/* Lyrics */
.lyrics {
  margin-top: 1rem;
  text-align: center;
  color: #fbcfe8;
  font-size: 1.1rem;
  animation: fadeIn 3s ease-in-out infinite alternate;
}

/* Cards */
.cards {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 700px;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 1.2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.card:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.2);
}

.card h4 {
  color: #fff;
  margin-bottom: 0.5rem;
}

.card p {
  color: #f9a8d4;
  font-size: 0.9rem;
}

/* Animations */
@keyframes fadeIn {
  0% { opacity: 0.7; }
  100% { opacity: 1; }
}

/* Responsive */
@media (max-width: 600px) {
  .title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .audio-player {
    padding: 1rem;
  }

  .cards {
    grid-template-columns: 1fr;
  }
}


`