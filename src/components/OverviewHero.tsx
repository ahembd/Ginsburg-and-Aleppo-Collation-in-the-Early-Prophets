/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Scroll, Compass, BookOpenCheck, BookmarkCheck } from 'lucide-react';

interface OverviewHeroProps {
  totalVerses: number;
  totalDiscrepancies: number;
  onJumpToComparator: () => void;
  onFilterByCategory: (category: string) => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({
  totalVerses,
  totalDiscrepancies,
  onJumpToComparator,
  onFilterByCategory,
}) => {
  return (
    <section className="bg-gradient-to-b from-[#fbf9f5] via-[#f7f4ee] to-[#fcfbf8] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-14">
        {/* Editorial Eyebrow & Kicker - Zero pill */}
        <div className="flex items-center gap-2 text-xs font-serif tracking-widest text-stone-500 uppercase mb-3">
          <span>Critical Masoretic Apparatus</span>
          <span aria-hidden="true">·</span>
          <span>Early Prophets / נְבִיאִים רִאשׁוֹנִים</span>
          <span aria-hidden="true">·</span>
          <span>10th–20th Century Textual Transmission</span>
        </div>

        {/* Hero Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-stone-900 tracking-tight leading-tight [text-wrap:balance]">
              Collation of C. D. Ginsburg and the Aleppo Codex
            </h1>
            <p className="text-base sm:text-lg text-stone-700 font-serif-prose leading-relaxed max-w-3xl">
              A comprehensive textual criticism engine analyzing masoretic vocalization (
              <span className="font-hebrew font-bold">נִקּוּד</span>), cantillation accents (
              <span className="font-hebrew font-bold">טְעָמִים</span>), euphonic Ga&apos;ya (<span className="font-hebrew font-bold">מֶתֶג</span>), 
              and the Paseq stroke (<span className="font-hebrew font-bold">פָּסֵק</span>) across Joshua, Judges, 1–2 Samuel, and 1–2 Kings.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onJumpToComparator}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors shadow-sm whitespace-nowrap"
              >
                Launch Custom Verse Comparator
              </button>
              <button
                onClick={() => onFilterByCategory('meteg_gaya')}
                className="px-3.5 py-2 text-xs font-medium text-stone-800 bg-stone-200/90 hover:bg-stone-300/80 rounded-md transition-colors whitespace-nowrap"
              >
                Inspect Meteg / Ga&apos;ya Omissions (46%)
              </button>
              <button
                onClick={() => onFilterByCategory('cantillation')}
                className="px-3.5 py-2 text-xs font-medium text-stone-800 bg-stone-200/90 hover:bg-stone-300/80 rounded-md transition-colors whitespace-nowrap"
              >
                Inspect Accent Shifts (25%)
              </button>
            </div>
          </div>

          {/* Curatorial Manuscript Note Card */}
          <div className="lg:col-span-4 bg-white/70 border border-stone-200/80 rounded-lg p-5 shadow-xs text-sm font-serif-prose text-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-900 font-sans font-semibold">
              <Scroll className="w-4 h-4 text-amber-800" />
              <span>Manuscript Provenance</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong className="text-stone-900 font-sans">Aleppo Codex (Keter Aram Tzova):</strong> Written c. 930 CE, corrected and pointed by Aaron ben Moses ben Asher. 
              The Early Prophets survived 100% complete and undamaged in the subterranean crypt in Syria.
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong className="text-stone-900 font-sans">C. D. Ginsburg Edition (1894/1926):</strong> Monumental British collation of over 70 British Museum manuscripts based on Jacob ben Chayyim&apos;s 1525 Venice Rabbinic Bible.
            </p>
          </div>
        </div>

        {/* 4-Column Quantitative Strip with Tabular Figures */}
        <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-white/60 p-3.5 rounded-md border border-stone-200/70">
            <div className="text-xs text-stone-500 font-sans uppercase tracking-wider">Early Prophets Books</div>
            <div className="text-2xl font-bold font-sans text-stone-900 tabular-nums mt-0.5">6 Books</div>
            <div className="text-xs text-stone-600 font-serif-prose mt-1">Joshua · Judges · 1–2 Sam · 1–2 Kgs</div>
          </div>

          <div className="bg-white/60 p-3.5 rounded-md border border-stone-200/70">
            <div className="text-xs text-stone-500 font-sans uppercase tracking-wider">Aleppo Codex State</div>
            <div className="text-2xl font-bold font-sans text-emerald-800 tabular-nums mt-0.5">100% Intact</div>
            <div className="text-xs text-stone-600 font-serif-prose mt-1">Full Ben Asher vocalization preserved</div>
          </div>

          <div className="bg-white/60 p-3.5 rounded-md border border-stone-200/70">
            <div className="text-xs text-stone-500 font-sans uppercase tracking-wider">Primary Divergence</div>
            <div className="text-2xl font-bold font-sans text-amber-800 tabular-nums mt-0.5">~46% Ga&apos;ya</div>
            <div className="text-xs text-stone-600 font-serif-prose mt-1">Meteg omitted in Venice/Ginsburg</div>
          </div>

          <div className="bg-white/60 p-3.5 rounded-md border border-stone-200/70">
            <div className="text-xs text-stone-500 font-sans uppercase tracking-wider">MSS Collated by Ginsburg</div>
            <div className="text-2xl font-bold font-sans text-stone-900 tabular-nums mt-0.5">70+ MSS</div>
            <div className="text-xs text-stone-600 font-serif-prose mt-1">British Library Oriental Codices</div>
          </div>
        </div>
      </div>
    </section>
  );
};
