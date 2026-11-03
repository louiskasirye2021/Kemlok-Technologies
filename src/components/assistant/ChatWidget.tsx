import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle, SendHorizontal, X } from 'lucide-react';
import { whatsappLink } from '../../site';
import { ease } from '../motion';
import { MAIN_CHIPS, bookingSummary, greeting, initialState, respond, type AssistantState, type Booking, type Reply } from './brain';

type Message = { id: number; from: 'bot' | 'user'; text: string; link?: Reply['link'] };

const OPEN_EVENT = 'kemlok:open-assistant';

/** Opens the assistant from anywhere on the site, optionally sending a first message. */
export function openAssistant(message?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { message } }));
}

const NUDGE_KEY = 'kemlok-assistant-nudged';

function readFlag(key: string) {
  try {
    return sessionStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function setFlag(key: string) {
  try {
    sessionStorage.setItem(key, '1');
  } catch {
    // Storage can be unavailable (private mode); the nudge just shows again.
  }
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chips, setChips] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [nudge, setNudge] = useState(false);

  const state = useRef<AssistantState>(initialState);
  const nextId = useRef(1);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const add = useCallback((from: Message['from'], replies: Reply[]) => {
    setMessages((prev) => [...prev, ...replies.map((r) => ({ id: nextId.current++, from, text: r.text, link: r.link }))]);
  }, []);

  /** Shows bot replies after a short "typing" pause, so the conversation feels natural. */
  const botSays = useCallback(
    async (replies: Reply[], nextChips: string[]) => {
      setTyping(true);
      const length = replies.reduce((n, r) => n + r.text.length, 0);
      await wait(450 + Math.min(900, length * 4));
      setTyping(false);
      add('bot', replies);
      setChips(nextChips);
    },
    [add],
  );

  const submitBooking = useCallback(
    async (booking: Booking) => {
      const summary = bookingSummary(booking);
      // Same setting as the contact form: set VITE_FORM_ENDPOINT (e.g. Formspree) to receive bookings by email.
      const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
      const whatsappBooking = { label: 'Send on WhatsApp', href: `${whatsappLink}?text=${encodeURIComponent(summary)}` };

      if (endpoint) {
        setTyping(true);
        try {
          const resp = await fetch(endpoint, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ source: 'website assistant', ...booking, message: summary }),
          });
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          setTyping(false);
          add('bot', [
            {
              text: `Done! Your request has been sent. We'll confirm the time with you on ${booking.phone} within 24 hours.`,
            },
          ]);
        } catch {
          setTyping(false);
          add('bot', [
            { text: "Sorry, I couldn't send that just now. Tap below to send the same request on WhatsApp instead.", link: whatsappBooking },
          ]);
        }
        setChips(MAIN_CHIPS);
        return;
      }

      await botSays(
        [
          {
            text: "Almost done! Tap below to send your request to our team on WhatsApp. It's already filled in. We'll confirm the time with you within 24 hours.",
            link: whatsappBooking,
          },
        ],
        MAIN_CHIPS,
      );
    },
    [add, botSays],
  );

  const send = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message) return;
      add('user', [{ text: message }]);
      setInput('');
      setChips([]);

      const turn = respond(state.current, message);
      state.current = turn.state;
      if (turn.replies.length) await botSays(turn.replies, turn.chips);
      if (turn.submit) await submitBooking(turn.submit);
    },
    [add, botSays, submitBooking],
  );

  const greeted = useRef(false);
  const ensureGreeting = useCallback(() => {
    if (greeted.current) return;
    greeted.current = true;
    const hello = greeting();
    add('bot', hello.replies);
    setChips(hello.chips);
  }, [add]);

  const show = useCallback(() => {
    ensureGreeting();
    setOpen(true);
    setNudge(false);
    setFlag(NUDGE_KEY);
  }, [ensureGreeting]);

  const hide = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  // Let other parts of the site open the assistant (e.g. "Book via our assistant").
  useEffect(() => {
    const onOpen = (e: Event) => {
      show();
      const message = (e as CustomEvent<{ message?: string }>).detail?.message;
      if (message) void send(message);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [show, send]);

  // A gentle prompt after a few seconds, once per visit. It hides itself again so it
  // doesn't sit over the page content on small screens.
  useEffect(() => {
    if (readFlag(NUDGE_KEY)) return;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    const showTimer = setTimeout(() => {
      setNudge(true);
      setFlag(NUDGE_KEY);
      hideTimer = setTimeout(() => setNudge(false), 8000);
    }, 6000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Keep the newest message in view.
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, chips]);

  // Focus the message box on open, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && hide();
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, hide]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!typing) void send(input);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with the Kemlok assistant"
            className="fixed right-4 bottom-24 z-60 flex h-[min(620px,calc(100dvh-8rem))] w-[min(400px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-line-strong bg-ink-raised shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:right-6"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.3, ease }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-fg font-display font-bold text-ink">
                K
                <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-ink-raised bg-[#4ade80]" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-display font-semibold">Kemlok Assistant</span>
                <span className="truncate text-xs text-faint">Demo assistant · automated answers</span>
              </span>
              <button
                type="button"
                onClick={hide}
                aria-label="Close chat"
                className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-muted hover:bg-panel hover:text-fg"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Conversation */}
            <div ref={scroller} aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-5">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease }}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed whitespace-pre-line ${
                    m.from === 'user' ? 'self-end rounded-br-md bg-fg text-ink' : 'self-start rounded-bl-md bg-panel text-fg'
                  }`}
                >
                  {m.text}
                  {m.link && <MessageLink link={m.link} onNavigate={hide} />}
                </motion.div>
              ))}

              <AnimatePresence>
                {typing && (
                  <motion.div
                    key="typing"
                    aria-label="Assistant is typing"
                    className="flex gap-1.5 self-start rounded-2xl rounded-bl-md bg-panel px-4 py-4"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="size-2 rounded-full bg-muted"
                        animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick replies */}
            {chips.length > 0 && !typing && (
              <motion.div
                className="flex flex-wrap gap-2 px-4 pb-3"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              >
                {chips.map((c) => (
                  <motion.button
                    key={c}
                    type="button"
                    onClick={() => void send(c)}
                    variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer rounded-full border border-field bg-transparent px-3.5 py-1.5 font-sans text-sm text-fg transition-colors hover:border-fg hover:bg-panel"
                  >
                    {c}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Input */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-3 py-3">
              <label htmlFor="assistant-input" className="sr-only">
                Message
              </label>
              <input
                ref={inputRef}
                id="assistant-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question or type 'book'…"
                autoComplete="off"
                maxLength={500}
                className="field min-h-11 rounded-full px-4"
              />
              <motion.button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || typing}
                whileTap={{ scale: 0.9 }}
                className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-fg text-ink transition-opacity disabled:cursor-default disabled:opacity-40"
              >
                <SendHorizontal size={18} aria-hidden="true" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prompt bubble */}
      <AnimatePresence>
        {nudge && !open && (
          <motion.div
            className="fixed right-4 bottom-24 z-60 flex max-w-[16rem] items-start gap-2 rounded-2xl rounded-br-md border border-line-strong bg-ink-raised py-3 pr-2 pl-4 text-sm shadow-xl sm:right-6"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <button type="button" onClick={show} className="cursor-pointer border-0 bg-transparent p-0 text-left font-sans text-sm text-fg">
              Questions? I can answer them, or book you a free consultation.
            </button>
            <button
              type="button"
              onClick={() => {
                setNudge(false);
                setFlag(NUDGE_KEY);
              }}
              aria-label="Dismiss"
              className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded border-0 bg-transparent text-faint hover:text-fg"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? hide() : show())}
        aria-label={open ? 'Close chat' : 'Chat with our assistant'}
        aria-expanded={open}
        className="fixed right-4 bottom-4 z-60 inline-flex size-14 cursor-pointer items-center justify-center rounded-full border-0 bg-fg text-ink shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6)] sm:right-6 sm:bottom-6"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        {!open && messages.length === 0 && (
          <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-fg/30 motion-reduce:hidden" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'chat'}
            className="inline-flex"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
          >
            {open ? <X size={24} aria-hidden="true" /> : <MessageCircle size={24} aria-hidden="true" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}

/** The call-to-action under a message: an in-site link closes the chat, others open in a new tab. */
function MessageLink({ link, onNavigate }: { link: NonNullable<Reply['link']>; onNavigate: () => void }) {
  const cls =
    'mt-3 flex w-fit items-center gap-1.5 rounded-full bg-fg px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap text-ink no-underline transition-transform hover:scale-105';
  if (link.href.startsWith('/')) {
    return (
      <Link to={link.href} onClick={onNavigate} className={cls}>
        {link.label}
        <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    );
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {link.label}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}
