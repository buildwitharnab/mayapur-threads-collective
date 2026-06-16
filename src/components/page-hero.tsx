import { motion } from "framer-motion";
import eyes from "@/assets/jagannath-eyes.png";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[62vh] items-center justify-center overflow-hidden pt-20">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep/70 via-maroon-deep/55 to-maroon-deep/80" />
      <img
        src={eyes}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[60vw] max-w-[640px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-ivory">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow text-gold-soft"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/80"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
