import { redirect } from "next/navigation";

import type { AppLocale } from "@/config/enums";

/**
 * L'index de la comprehension orale a ete fusionne avec la page des tests
 * (« Series d'entrainement »). L'ancienne URL redirige vers elle ; le choix
 * de la serie se fait desormais depuis la colonne « Comprehension orale ».
 */
export default function ComprehensionOraleIndexPage({
  params,
}: {
  params: { locale: AppLocale };
}): React.JSX.Element {
  redirect(`/${params.locale}/tests`);
}