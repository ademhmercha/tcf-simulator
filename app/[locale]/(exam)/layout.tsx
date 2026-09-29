// Groupe "exam" : l'epreuve occupe tout l'ecran, sans en-tete ni pied de page
// afin de ne distraire ni skilled ni le chronometre.
export default function ExamLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <main id="contenu" className="min-h-dvh bg-background">{children}</main>;
}
