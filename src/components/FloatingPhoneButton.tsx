import { company } from "@/lib/data";

const PHONE = company.phones.international[0];
const PHONE_TEL = `tel:${PHONE.replace(/[^\d+]/g, "").replace(/^00/, "+")}`;

export default function FloatingPhoneButton() {
  return (
    <a
      href={PHONE_TEL}
      aria-label={PHONE}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/90 text-[#070d18] shadow-[0_0_24px_rgba(34,211,238,0.35)] transition-all hover:scale-105 hover:border-cyan-400 hover:bg-cyan-400 hover:shadow-[0_0_32px_rgba(34,211,238,0.5)] md:bottom-8 md:right-8 md:h-16 md:w-16"
    >
      <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    </a>
  );
}
