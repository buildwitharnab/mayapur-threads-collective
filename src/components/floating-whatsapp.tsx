import { motion } from "framer-motion";
import { whatsappLink } from "@/data/site";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-luxe ring-2 ring-gold ring-offset-2 ring-offset-background sm:h-16 sm:w-16">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-white sm:h-8 sm:w-8">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.04c-.24.68-1.42 1.31-1.96 1.36-.5.05-1.14.07-1.84-.12-.42-.13-.97-.31-1.67-.61-2.94-1.27-4.86-4.23-5-4.43-.15-.2-1.2-1.59-1.2-3.03s.76-2.15 1.03-2.45c.27-.29.59-.37.79-.37.2 0 .39.002.56.01.18.008.42-.07.66.5.24.58.82 2.01.89 2.16.07.15.12.32.02.51-.09.2-.14.32-.27.49-.14.17-.29.38-.41.51-.14.15-.28.31-.12.6.16.29.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.27.15.43.12.59-.07.16-.2.68-.79.86-1.06.18-.27.36-.22.61-.13.24.09 1.55.73 1.82.86.27.13.45.2.51.31.07.11.07.65-.17 1.33Z" />
        </svg>
      </span>
      <span className="hidden rounded-full bg-maroon px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-ivory shadow-luxe transition-opacity lg:inline-block">
        Chat With Us
      </span>
    </motion.a>
  );
}
