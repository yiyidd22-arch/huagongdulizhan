"use client";

import PageBanner from "@/components/PageBanner";
import { company } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner title={t.nav.contact} subtitle={t.contact.subtitle} />

      <section className="page-section py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white">{t.company.name}</h2>
              <div className="tech-glow-line mt-4 w-16" />

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">{t.contact.address}</h3>
                    <p className="mt-1 text-slate-400">{t.company.address}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">{t.contact.phone}</h3>
                    <p className="mt-1 text-slate-400">
                      <span className="text-slate-300">{t.contact.internationalDept}:</span>{" "}
                      {company.phones.international.join(" / ")}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-slate-300">{t.contact.domesticDept}:</span>{" "}
                      {company.phones.domestic.join(" / ")}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-slate-300">{t.contact.serviceDept}:</span>{" "}
                      {company.phones.service}
                    </p>
                    <p className="text-slate-400">
                      {t.footer.fax}: {company.fax}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">{t.company.emailWeb}</h3>
                    <p className="mt-1">
                      <a href={`mailto:${company.email}`} className="text-cyan-400 hover:text-cyan-300">
                        {company.email}
                      </a>
                    </p>
                    <p className="mt-1">
                      <a href={`https://${company.website}`} className="text-cyan-400 hover:text-cyan-300">
                        {company.website}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white">{t.contact.formTitle}</h2>
              <p className="mt-1 text-sm text-slate-500">{t.contact.formDesc}</p>
              <form className="mt-6 space-y-4" action={`mailto:${company.email}`} method="post" encType="text/plain">
                {[
                  { id: "name", label: t.contact.name, type: "text", required: true },
                  { id: "email", label: t.contact.email, type: "email", required: true },
                  { id: "company-field", label: t.contact.company, type: "text", required: false },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-slate-300">
                      {field.label} {field.required && "*"}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id.replace("-field", "")}
                      required={field.required}
                      className="mt-1 w-full rounded-lg border border-cyan-500/15 bg-white/5 px-4 py-2.5 text-slate-200 outline-none focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/30"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-slate-300">
                    {t.contact.productInterest}
                  </label>
                  <select
                    id="product"
                    name="product"
                    className="mt-1 w-full rounded-lg border border-cyan-500/15 bg-white/5 px-4 py-2.5 text-slate-200 outline-none focus:border-cyan-400/40"
                  >
                    <option value="sodium-chlorite">{t.contact.productOptions.chlorite}</option>
                    <option value="sodium-chlorate">{t.contact.productOptions.chlorate}</option>
                    <option value="other">{t.contact.productOptions.other}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                    {t.contact.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-1 w-full resize-none rounded-lg border border-cyan-500/15 bg-white/5 px-4 py-2.5 text-slate-200 outline-none focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/30"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-cyan-500/90 py-3 font-semibold text-[#070d18] transition-colors hover:bg-cyan-400"
                >
                  {t.common.sendMessage}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
