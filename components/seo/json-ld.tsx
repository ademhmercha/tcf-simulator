/**
 * Injecte un bloc de donnees structurees (JSON-LD) dans la page.
 * Rend un `<script type="application/ld+json">`, format attendu par Google.
 */
export function JsonLd({ data }: { data: unknown }): React.JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
