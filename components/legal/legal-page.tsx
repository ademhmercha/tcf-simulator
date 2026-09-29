/**
 * Gabarit des pages legales (confidentialite, conditions).
 *
 * Le contenu vient entierement du catalogue i18n (`legal.*`) : aucune chaine
 * en dur dans la page, afin que les deux versions linguistiques restent
 * synchronisees.
 */

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalPageProps {
  title: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps): React.JSX.Element {
  return (
    <div className="container py-14">
      <article className="mx-auto max-w-3xl">
        <header className="animate-fade-up border-b border-border pb-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{updated}</p>
        </header>

        <div className="animate-fade-up mt-8 space-y-4 [animation-delay:80ms]">
          {intro.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        {sections.map((section, index) => (
          <section
            key={section.heading}
            className="animate-fade-up mt-10 scroll-mt-24"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <h2 className="font-display text-xl font-bold">{section.heading}</h2>

            <div className="mt-4 space-y-4">
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            {section.bullets ? (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 leading-relaxed text-muted-foreground">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </article>
    </div>
  );
}
