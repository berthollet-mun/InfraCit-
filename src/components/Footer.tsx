import React from 'react';
import { LegalData } from '../data/mock';

export interface FooterProps {
  data?: Partial<LegalData>;
}

const defaultLegalData: LegalData = {
  companyName: "InfraCité Ingénierie",
  legalForm: "Société par Actions Simplifiée (SAS)",
  capital: "1 000 €",
  siren: "999 744 915",
  rcs: "Nanterre",
  headquarters: "14 rue Camille Saint-Saëns, 92500 Rueil-Malmaison",
  publicationDirector: "Wilfried N.",
  technicalContact: "adfi@infracite-ing.fr",
  standardPhone: "09 61 27 33 58",
  rgpdNotice: "Plateforme conçue et hébergée dans le respect du RGPD.",
  professionalDisclaimer: "Les missions de délimitation foncière et de topographie réglementée sont exclusivement confiées à des professionnels habilités (Géomètres-experts)."
};

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const legal = { ...defaultLegalData, ...data };

  return (
    <footer className="bg-[#10272F] text-slate-300 border-t border-slate-800" data-purpose="footer-and-legal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        {/* Grille principale 4 colonnes aérées (gap-12) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          
          {/* Colonne 1 : Identité & Présentation du cabinet */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#0B6E78]/50 bg-[#0B6E78]/20 shrink-0">
                <span className="h-4 w-4 rounded-full border border-[#D99A0B]/70 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-[#D99A0B] fill-current" viewBox="0 0 100 100">
                    <polygon points="50,15 90,85 10,85" />
                  </svg>
                </span>
              </span>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Infra<span className="text-[#5CC6CC]">Cité</span> Ingénierie
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Bureau d'études indépendant en ingénierie, topographie, géomatique, environnement et aménagement du territoire.
            </p>
          </div>

          {/* Colonne 2 : Identité Légale */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-teal-400 font-semibold mb-5">
              IDENTITÉ LÉGALE
            </h5>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
              <li className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="text-slate-400 font-normal">Raison sociale :</span>
                <span className="text-slate-100 font-medium">{legal.companyName}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="text-slate-400 font-normal">Forme juridique :</span>
                <span className="text-slate-100 font-medium">{legal.legalForm}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="text-slate-400 font-normal">Capital social :</span>
                <span className="text-slate-100 font-medium font-mono">{legal.capital}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="text-slate-400 font-normal">SIREN :</span>
                <span className="text-slate-100 font-medium font-mono tracking-wide">{legal.siren}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="text-slate-400 font-normal">RCS :</span>
                <span className="text-slate-100 font-medium">{legal.rcs}</span>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Siège & Direction */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-teal-400 font-semibold mb-5">
              SIÈGE &amp; DIRECTION
            </h5>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
              <li className="flex flex-col gap-1">
                <span className="text-slate-400 font-normal">Siège social :</span>
                <span className="text-slate-100 font-medium">{legal.headquarters}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="text-slate-400 font-normal">Directeur de publication :</span>
                <span className="text-slate-100 font-medium">{legal.publicationDirector}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="text-slate-400 font-normal">Contact technique :</span>
                <a
                  href={`mailto:${legal.technicalContact}`}
                  className="text-slate-100 hover:text-teal-300 transition-colors font-medium underline underline-offset-4 decoration-slate-600 hover:decoration-teal-300"
                >
                  {legal.technicalContact}
                </a>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="text-slate-400 font-normal">Standard :</span>
                <a
                  href={`tel:${legal.standardPhone.replace(/\s+/g, '')}`}
                  className="text-slate-100 hover:text-teal-300 transition-colors font-mono font-medium"
                >
                  {legal.standardPhone}
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Hébergement & Déontologie (Encadré sobre et élégant) */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-teal-400 font-semibold mb-5">
              HÉBERGEMENT &amp; DÉONTOLOGIE
            </h5>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {legal.rgpdNotice}
            </p>

            {/* Encadré discret déontologie : fond teinté bg-white/5, bordure fine border-white/10 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-xs">
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {legal.professionalDisclaimer}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar : Ligne fine de séparation, copyright & navigation */}
        <div className="pt-10 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <p className="text-center sm:text-left">
            © 2026 {legal.companyName}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <a
              href="#domaines"
              className="hover:text-white transition-colors duration-200"
            >
              Domaines
            </a>
            <a
              href="#missions"
              className="hover:text-white transition-colors duration-200"
            >
              Prestations
            </a>
            <a
              href="#projets"
              className="hover:text-white transition-colors duration-200"
            >
              Applications
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors duration-200 font-medium"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
