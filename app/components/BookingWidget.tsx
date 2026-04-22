"use client";

import { useState, useMemo } from "react";
import type { Session } from "../../lib/sessions";

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
];

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function formatLong(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

type Step = 1 | 2 | 3;
type SubmitState = "idle" | "loading" | "error";

export default function BookingWidget({ session }: { session: Session }) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [step, setStep] = useState<Step>(1);
  const [calBase, setCalBase] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", message: "",
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const year = calBase.getFullYear();
  const month = calBase.getMonth();

  const cells = useMemo<(Date | null)[]>(() => {
    const days: (Date | null)[] = [];
    for (let i = 0; i < getFirstDayOfMonth(year, month); i++) days.push(null);
    for (let d = 1; d <= getDaysInMonth(year, month); d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  }, [year, month]);

  const canGoBack = useMemo(
    () => new Date(year, month, 1) > new Date(today.getFullYear(), today.getMonth(), 1),
    [year, month, today]
  );

  function isDisabled(d: Date) {
    return d < today || d.getDay() === 0;
  }
  function isSelected(d: Date) {
    return selectedDate?.toDateString() === d.toDateString();
  }

  function handleDayClick(d: Date) {
    if (isDisabled(d)) return;
    setSelectedDate(d);
    setSelectedTime(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionType: session.name,
          date: selectedDate ? formatLong(selectedDate) : "",
          time: selectedTime,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone || null,
          message: form.message || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSubmitState("idle");
      setStep(3);
    } catch (err) {
      setSubmitState("idle");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  function reset() {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    setSubmitState("idle");
    setErrorMsg("");
  }

  // ── STEP 1: Calendar + Time ────────────────────────────────────
  if (step === 1) {
    return (
      <div>
        <p className="text-terracotta text-[0.65rem] tracking-[0.22em] uppercase mb-3">
          Step 1 of 2
        </p>
        <h2 className="font-serif font-black text-cream text-2xl md:text-3xl mb-10">
          Select a Date &amp; Time
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* Calendar */}
          <div
            className="w-full lg:w-auto"
            style={{ backgroundColor: "#151412", padding: "1.75rem", minWidth: 320 }}
          >
            {/* Month nav */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCalBase(new Date(year, month - 1, 1))}
                disabled={!canGoBack}
                className="text-cream/30 hover:text-terracotta disabled:opacity-20 transition-colors duration-150 px-1 text-lg leading-none"
                aria-label="Previous month"
              >
                ‹
              </button>
              <span className="font-serif text-cream text-sm tracking-wide">
                {MONTH_NAMES[month]} {year}
              </span>
              <button
                onClick={() => setCalBase(new Date(year, month + 1, 1))}
                className="text-cream/30 hover:text-terracotta transition-colors duration-150 px-1 text-lg leading-none"
                aria-label="Next month"
              >
                ›
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map((d) => (
                <div
                  key={d}
                  className="text-center text-[0.6rem] tracking-widest uppercase text-cream/25 pb-2"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-1">
              {cells.map((d, i) => {
                if (!d) return <div key={`empty-${i}`} />;
                const disabled = isDisabled(d);
                const selected = isSelected(d);
                return (
                  <button
                    key={d.toISOString()}
                    onClick={() => handleDayClick(d)}
                    disabled={disabled}
                    className={[
                      "aspect-square flex items-center justify-center text-xs rounded-sm transition-colors duration-150",
                      disabled
                        ? "text-cream/15 cursor-not-allowed"
                        : selected
                        ? "bg-terracotta text-bg font-semibold"
                        : "text-cream/70 hover:bg-terracotta/20 hover:text-cream cursor-pointer",
                    ].join(" ")}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div className="flex-1">
            {!selectedDate ? (
              <p className="text-cream/25 text-sm italic mt-2">
                Select a date to see available times.
              </p>
            ) : (
              <>
                <p className="text-cream/50 text-xs tracking-wide mb-6">
                  {formatLong(selectedDate)}, Phoenix, AZ
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={[
                        "py-3 px-4 text-xs tracking-[0.1em] border transition-colors duration-150",
                        selectedTime === t
                          ? "border-terracotta bg-terracotta text-bg"
                          : "border-cream/10 text-cream/60 hover:border-terracotta/50 hover:text-cream",
                      ].join(" ")}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedTime}
                  className={[
                    "mt-10 px-8 py-3.5 text-xs tracking-[0.18em] uppercase transition-colors duration-200",
                    selectedTime
                      ? "bg-terracotta text-bg hover:bg-terracotta/80 cursor-pointer"
                      : "bg-cream/10 text-cream/25 cursor-not-allowed",
                  ].join(" ")}
                >
                  Continue →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 2: Contact Form ───────────────────────────────────────
  if (step === 2) {
    return (
      <div>
        <p className="text-terracotta text-[0.65rem] tracking-[0.22em] uppercase mb-3">
          Step 2 of 2
        </p>
        <h2 className="font-serif font-black text-cream text-2xl md:text-3xl mb-10">
          Complete Your Booking
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.12em] uppercase text-cream/40">
                  First Name <span className="text-terracotta">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter first name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="bg-transparent border border-cream/10 focus:border-terracotta/60 outline-none px-4 py-3 text-sm text-cream placeholder:text-cream/20 transition-colors duration-150"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.12em] uppercase text-cream/40">
                  Last Name <span className="text-terracotta">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter last name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="bg-transparent border border-cream/10 focus:border-terracotta/60 outline-none px-4 py-3 text-sm text-cream placeholder:text-cream/20 transition-colors duration-150"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.12em] uppercase text-cream/40">
                Email <span className="text-terracotta">*</span>
              </label>
              <input
                required
                type="email"
                placeholder="example@domain.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-transparent border border-cream/10 focus:border-terracotta/60 outline-none px-4 py-3 text-sm text-cream placeholder:text-cream/20 transition-colors duration-150"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.12em] uppercase text-cream/40">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="602-123-4567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="bg-transparent border border-cream/10 focus:border-terracotta/60 outline-none px-4 py-3 text-sm text-cream placeholder:text-cream/20 transition-colors duration-150"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.12em] uppercase text-cream/40">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Optional. Tell me a little about what you're looking for."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-transparent border border-cream/10 focus:border-terracotta/60 outline-none px-4 py-3 text-sm text-cream placeholder:text-cream/20 transition-colors duration-150 resize-none"
              />
            </div>

            {errorMsg && (
              <p className="text-sm text-terracotta/80 border border-terracotta/20 px-4 py-3">
                {errorMsg}
              </p>
            )}

            <div className="flex items-center gap-6 mt-2">
              <button
                type="submit"
                disabled={submitState === "loading"}
                className={[
                  "px-8 py-3.5 text-xs tracking-[0.18em] uppercase transition-colors duration-200",
                  submitState === "loading"
                    ? "bg-terracotta/50 text-bg cursor-wait"
                    : "bg-terracotta text-bg hover:bg-terracotta/80 cursor-pointer",
                ].join(" ")}
              >
                {submitState === "loading" ? "Sending…" : "Send Booking Request →"}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={submitState === "loading"}
                className="text-xs tracking-[0.12em] uppercase text-cream/25 hover:text-cream/50 transition-colors duration-150 disabled:opacity-40"
              >
                ← Back
              </button>
            </div>
          </form>

          {/* Summary card */}
          <div
            className="w-full lg:w-72 shrink-0"
            style={{ backgroundColor: "#151412", padding: "1.5rem" }}
          >
            {/* Placeholder image */}
            <div
              className="w-full bg-surface-2 mb-5"
              style={{ aspectRatio: session.aspectRatio === "wide" ? "16/9" : "3/4", maxHeight: 180, overflow: "hidden" }}
            />
            <h3 className="font-serif font-black text-cream text-lg mb-4">
              {session.name}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-sm text-cream/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-cream/30">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {selectedDate ? formatLong(selectedDate) : "—"}
              </div>
              <div className="flex items-start gap-3 text-sm text-cream/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-cream/30">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {selectedTime} (America/Phoenix)
              </div>
            </div>
            <div className="w-full h-px bg-terracotta/20 my-5" />
            <p className="text-[0.6rem] tracking-[0.18em] uppercase text-cream/25 mb-3">
              What&rsquo;s included
            </p>
            <ul className="flex flex-col gap-2">
              {session.includes.map((item) => (
                <li key={item} className="flex gap-2 text-xs text-cream/35 leading-relaxed">
                  <span className="text-terracotta/30 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-terracotta text-sm font-semibold mt-5">
              {session.price}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 3: Confirmation ───────────────────────────────────────
  return (
    <div className="flex flex-col items-start gap-6 py-4">
      <div className="w-10 h-px bg-terracotta/50" />
      <h2 className="font-serif font-black text-cream text-2xl md:text-3xl">
        Request sent.
      </h2>
      <p className="text-cream/50 text-base leading-relaxed max-w-lg">
        Check your inbox — a confirmation is on its way to {form.email}.
        I&rsquo;ll follow up within 48 hours to confirm availability and next steps.
      </p>
      <div className="text-sm text-cream/30 leading-relaxed">
        <span className="text-cream/50">{session.name}</span>
        {" · "}
        {selectedDate ? formatLong(selectedDate) : ""}
        {" · "}
        {selectedTime} (Phoenix)
      </div>
      <button
        onClick={reset}
        className="mt-2 text-xs tracking-[0.15em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200"
      >
        ← Start over
      </button>
    </div>
  );
}
