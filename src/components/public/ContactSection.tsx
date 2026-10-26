import React, { useState } from 'react';
import { ContactData } from '../../data/mock';
import { appStore } from '../../lib/store';
import { MapPin, Mail, Phone, Clock, Send, Check } from 'lucide-react';

interface ContactSectionProps {
  data: ContactData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    clientType: 'public' as 'public' | 'private' | 'sem' | 'other'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      appStore.addMessage({
        name: formData.name,
        company: formData.company || 'Non renseigné',
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
        priority: 'normal',
        clientType: formData.clientType,
        domains: ['01 · ÉTUDES PRÉALABLES']
      });

      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        clientType: 'public'
      });
    }, 600);
  };

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_16px_50px_-10px_rgba(16,39,47,0.06)] border border-gray-200">
              <div className="mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#0B6E78] font-semibold">
                  FORMULAIRE DE CONTACT
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#10272F] mt-2">
                  Demande d'études &amp; de conseil
                </h3>
                <p className="text-sm text-[#4B6168] mt-1">
                  Exposez votre problématique d'aménagement, d'ingénierie ou de géomatique.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#E6F3F4] border border-[#0B6E78]/30 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0B6E78] text-white flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-[#10272F]">
                    Votre demande a bien été envoyée
                  </h4>
                  <p className="text-sm text-[#4B6168] max-w-md">
                    L'équipe d'InfraCité Ingénierie prend en charge votre dossier. Un retour technique vous sera formulé sous 24h ouvrées.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-6 py-2.5 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold transition-colors"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-[#10272F] uppercase mb-2 font-medium" htmlFor="name">
                        Nom et Prénom *
                      </label>
                      <input
                        className="w-full rounded-xl border border-gray-200 text-sm focus:border-[#0B6E78] focus:ring-2 focus:ring-[#0B6E78]/20 bg-gray-50/80 px-4 py-3 outline-none transition-colors"
                        id="name"
                        placeholder="ex. Jean Dupont"
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#10272F] uppercase mb-2 font-medium" htmlFor="company">
                        Organisme / Société
                      </label>
                      <input
                        className="w-full rounded-xl border border-gray-200 text-sm focus:border-[#0B6E78] focus:ring-2 focus:ring-[#0B6E78]/20 bg-gray-50/80 px-4 py-3 outline-none transition-colors"
                        id="company"
                        placeholder="ex. Ville ou Aménageur X"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-[#10272F] uppercase mb-2 font-medium" htmlFor="email">
                        Adresse email *
                      </label>
                      <input
                        className="w-full rounded-xl border border-gray-200 text-sm focus:border-[#0B6E78] focus:ring-2 focus:ring-[#0B6E78]/20 bg-gray-50/80 px-4 py-3 outline-none transition-colors"
                        id="email"
                        placeholder="jean.dupont@organisme.fr"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#10272F] uppercase mb-2 font-medium" htmlFor="phone">
                        Téléphone
                      </label>
                      <input
                        className="w-full rounded-xl border border-gray-200 text-sm focus:border-[#0B6E78] focus:ring-2 focus:ring-[#0B6E78]/20 bg-gray-50/80 px-4 py-3 outline-none transition-colors"
                        id="phone"
                        placeholder="01 23 45 67 89"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-[#10272F] uppercase mb-2 font-medium" htmlFor="subject">
                        Objet de la mission *
                      </label>
                      <input
                        className="w-full rounded-xl border border-gray-200 text-sm focus:border-[#0B6E78] focus:ring-2 focus:ring-[#0B6E78]/20 bg-gray-50/80 px-4 py-3 outline-none transition-colors"
                        id="subject"
                        placeholder="Diagnostic foncier, SIG, cartographie..."
                        required
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#10272F] uppercase mb-2 font-medium" htmlFor="clientType">
                        Type d'acteur
                      </label>
                      <select
                        id="clientType"
                        className="w-full rounded-xl border border-gray-200 text-sm focus:border-[#0B6E78] focus:ring-2 focus:ring-[#0B6E78]/20 bg-gray-50/80 px-3 py-3 outline-none transition-colors"
                        value={formData.clientType}
                        onChange={(e) => setFormData({ ...formData, clientType: e.target.value as any })}
                      >
                        <option value="public">Collectivité (Public)</option>
                        <option value="private">Aménageur (Privé)</option>
                        <option value="sem">SEM / SPL</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#10272F] uppercase mb-2 font-medium" htmlFor="message">
                      Description de votre besoin *
                    </label>
                    <textarea
                      className="w-full rounded-xl border border-gray-200 text-sm focus:border-[#0B6E78] focus:ring-2 focus:ring-[#0B6E78]/20 bg-gray-50/80 p-4 outline-none transition-colors"
                      id="message"
                      placeholder="Précisez la localisation, les enjeux techniques et les délais envisagés..."
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-[#4B6168] font-mono">* Champs obligatoires</span>
                    <button
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-white bg-[#0B6E78] hover:bg-[#08555D] shadow-md hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Envoi en cours...</span>
                      ) : (
                        <>
                          <span>Envoyer ma demande</span>
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Contact Information Column with Lucide Icons */}
          <div className="lg:col-span-5 flex flex-col justify-between self-stretch">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#0B6E78] font-semibold">
                CONTACT DIRECT
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#10272F] mt-2 tracking-tight">
                Parlons de votre{' '}
                <span className="font-editorial-italic font-normal text-[#0B6E78]">projet.</span>
              </h2>
              <p className="mt-4 text-[#4B6168] text-base leading-relaxed">
                Vous avez un projet d'aménagement, un besoin d'analyse cartographique ou d'expertise technique territoriale ? Notre équipe se tient à votre entière disposition.
              </p>

              <div className="mt-10 space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F3F4] text-[#0B6E78] flex items-center justify-center shrink-0 shadow-2xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#4B6168] uppercase font-bold">Siège social</span>
                    <p className="text-sm sm:text-base font-semibold text-[#10272F] mt-0.5">
                      {data.address}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F3F4] text-[#0B6E78] flex items-center justify-center shrink-0 shadow-2xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#4B6168] uppercase font-bold">Email professionnel</span>
                    <p className="text-sm sm:text-base font-semibold text-[#10272F] mt-0.5">
                      <a className="hover:text-[#0B6E78] transition-colors" href={`mailto:${data.email}`}>
                        {data.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F3F4] text-[#0B6E78] flex items-center justify-center shrink-0 shadow-2xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#4B6168] uppercase font-bold">Standard technique</span>
                    <p className="text-sm sm:text-base font-semibold text-[#10272F] mt-0.5">
                      <a className="hover:text-[#0B6E78] transition-colors" href={`tel:${data.phone}`}>
                        {data.displayPhone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F3F4] text-[#0B6E78] flex items-center justify-center shrink-0 shadow-2xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#4B6168] uppercase font-bold">Horaires d'accueil</span>
                    <p className="text-sm sm:text-base font-semibold text-[#10272F] mt-0.5">
                      {data.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reassurance pill card */}
            <div className="mt-12 p-6 rounded-3xl bg-[#F9F9F8] border border-gray-200 text-sm text-slate-700 leading-relaxed">
              <span className="font-mono text-[#0B6E78] font-bold block mb-1.5 text-xs tracking-wider uppercase">CONFIDENTIALITÉ &amp; RGPD</span>
              Les données recueillies font l'objet d'un traitement sécurisé strictement réservé à l'évaluation technique de votre demande par nos ingénieurs.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
