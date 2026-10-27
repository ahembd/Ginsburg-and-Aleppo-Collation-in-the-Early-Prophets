/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Scroll, Award, HelpCircle, Layers } from 'lucide-react';
import { MASORETIC_ACCENT_SYSTEM, HISTORICAL_ESSAY } from '../data/masoreticGuide';

export const MasoreticKnowledgeBase: React.FC = () => {
  const [subTab, setSubTab] = useState<'accents' | 'gaya_rules' | 'history'>('accents');

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="space-y-2">
        <div className="text-xs font-serif tracking-widest text-stone-500 uppercase">
          Masoretic Lexicon &amp; Historical Context
        </div>
        <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-stone-900">
          The Tiberian Masorah: Ben Asher &amp; Ginsburg Apparatus
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-serif-prose max-w-3xl leading-relaxed">
          Comprehensive reference guide to the 21 prosaic accents (טעמי כ״א ספרים), the Tiberian Ga&apos;ya system, 
          Paseq demarcation rules, and the 19th-century textual campaign of Christian David Ginsburg.
        </p>
      </div>

      {/* Segmented Sub-tab Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-md border border-stone-200/80 w-fit">
        <button
          onClick={() => setSubTab('accents')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors ${
            subTab === 'accents'
              ? 'bg-white text-stone-900 shadow-2xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          21 Prosaic Accents (טעמים)
        </button>
        <button
          onClick={() => setSubTab('gaya_rules')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors ${
            subTab === 'gaya_rules'
              ? 'bg-white text-stone-900 shadow-2xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Meteg &amp; Paseq System
        </button>
        <button
          onClick={() => setSubTab('history')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors ${
            subTab === 'history'
              ? 'bg-white text-stone-900 shadow-2xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Historical Treatise: Ginsburg vs Aleppo
        </button>
      </div>

      {/* Subtab 1: Tiberian Accent System Table */}
      {subTab === 'accents' && (
        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-xs space-y-4 p-6">
          <div className="border-b border-stone-200 pb-3">
            <h3 className="text-base font-editorial font-bold text-stone-900">
              The Hierarchy of Prosaic Accents in the Early Prophets
            </h3>
            <p className="text-xs text-stone-500 font-serif-prose mt-1">
              Classified according to the classical Tiberian hierarchy (Emperors, Kings, Dukes, Counts, and Servants).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-stone-600 font-sans">
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Accent Name</th>
                  <th className="py-2.5 px-3 text-center">Symbol</th>
                  <th className="py-2.5 px-3">Unicode</th>
                  <th className="py-2.5 px-3">Syntactic Role</th>
                  <th className="py-2.5 px-3">Aleppo vs. Ginsburg Trajectory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-serif-prose">
                {MASORETIC_ACCENT_SYSTEM.map((acc, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-3 font-sans font-medium text-stone-700 whitespace-nowrap">
                      {acc.rank}
                    </td>
                    <td className="py-3 px-3 font-sans">
                      <div className="font-semibold text-stone-900">{acc.nameEn}</div>
                      <div className="font-hebrew text-stone-500 text-sm">{acc.nameHe}</div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-hebrew text-2xl text-stone-900 bg-stone-50 px-2 py-0.5 rounded border border-stone-200 inline-block min-w-8">
                        ב{acc.symbol}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-stone-400 text-[11px] whitespace-nowrap">
                      {acc.codePoint}
                    </td>
                    <td className="py-3 px-3 text-stone-700 leading-relaxed">
                      {acc.function}
                    </td>
                    <td className="py-3 px-3 text-stone-600 leading-relaxed text-[11px]">
                      {acc.aleppoVsGinsburgNote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 2: Ga'ya & Paseq Rules */}
      {subTab === 'gaya_rules' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ga'ya Rules */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
              <Scroll className="w-4 h-4 text-amber-800" />
              <h3 className="text-base font-editorial font-bold text-stone-900">
                The Tiberian Ga&apos;ya System (Diqduqe ha-Te&apos;amim)
              </h3>
            </div>

            <p className="text-xs text-stone-700 font-serif-prose leading-relaxed">
              Ga&apos;ya (literally &ldquo;roaring/raising the voice&rdquo;) or Meteg (a small vertical stroke ֽ placed under the consonant) 
              is one of the most prolific loci of variation between Ginsburg and the Aleppo Codex.
            </p>

            <div className="space-y-3 text-xs font-serif-prose">
              <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
                <strong className="text-stone-900 font-sans block">1. Ga&apos;ya Peshuta (פְּשׁוּטָה - Regular Ga&apos;ya):</strong>
                <p className="text-stone-600">
                  Marked on a short vowel in an open syllable preceding a vocal sheva (e.g. <span className="font-hebrew font-bold">וַֽיְהִי</span>, <span className="font-hebrew font-bold">יַֽעַמְדוּ</span>). 
                  Its purpose is to prevent the vocal sheva from collapsing into a silent sheva.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
                <strong className="text-stone-900 font-sans block">2. Ga&apos;ya Medabberet (מְדַבֶּרֶת - Musical Prolongation):</strong>
                <p className="text-stone-600">
                  Placed on prefixes (<span className="font-hebrew">בְּ, כְּ, לְ, מִ</span>) or syllables separated by two or more vowels from the primary tone accent to sustain rhythm.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
                <strong className="text-stone-900 font-sans block">3. Ga&apos;ya Chatafa (חֲטוּפָה - Before Reduced Vowels):</strong>
                <p className="text-stone-600">
                  Placed under a prefix before a guttural bearing chataf-vowels (e.g. <span className="font-hebrew font-bold">וֶֽאֱמַץ</span>, <span className="font-hebrew font-bold">בֶּֽאֱמֶת</span>) 
                  to ensure the prefix vowel is given independent phonological weight.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
                <strong className="text-stone-900 font-sans block">4. Shishit (שִׁשִּׁית - Sixth Syllable Rule):</strong>
                <p className="text-stone-600">
                  In long words or phrases where the tonic accent falls on the final syllable, a ga&apos;ya is placed on the third or fifth syllable prior to balance voice cadence.
                </p>
              </div>
            </div>
          </div>

          {/* Paseq Rules */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
              <Award className="w-4 h-4 text-emerald-800" />
              <h3 className="text-base font-editorial font-bold text-stone-900">
                The 5 Classes of Masoretic Paseq (פָּסֵק ׀)
              </h3>
            </div>

            <p className="text-xs text-stone-700 font-serif-prose leading-relaxed">
              The Paseq is a vertical dividing stroke between words. While looking identical to Legarmeh, Paseq has no independent accent melody. 
              The Aleppo Codex preserves precise Paseq counts recorded in the Masorah Magna lists that Ginsburg&apos;s late European sources often dropped.
            </p>

            <div className="space-y-3 text-xs font-serif-prose">
              <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
                <strong className="text-stone-900 font-sans block">1. Phonetic Separation of Identical Letters:</strong>
                <p className="text-stone-600">
                  When the final letter of a word is identical to the first letter of the subsequent word (e.g. <span className="font-hebrew font-bold">אֲבָנִים ׀ מִן־הַנַּחַל</span> in 1 Sam 17:40), 
                  Paseq prevents phonetic blending (elision) of the two consonants.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
                <strong className="text-stone-900 font-sans block">2. Reverential Separation for Divine Names:</strong>
                <p className="text-stone-600">
                  Separating the Tetragrammaton (<span className="font-hebrew">יהוה</span>) or Elohim (<span className="font-hebrew">אלהים</span>) from adjoining words that might be 
                  misinterpreted as negative or unbefitting (e.g. Judges 6:24, 1 Kings 8:23).
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
                <strong className="text-stone-900 font-sans block">3. Syntactic Ambiguity Resolution:</strong>
                <p className="text-stone-600">
                  Paseq inserted between two nouns to clarify whether they form a construct chain or stand in apposition.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
                <strong className="text-stone-900 font-sans block">4. Pre-Pausal Suspension:</strong>
                <p className="text-stone-600">
                  Marking an unexpected rhetorical pause before a crucial imperative or historical pronouncement (e.g. 1 Kings 18:21).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Historical Treatise */}
      {subTab === 'history' && (
        <div className="bg-white border border-stone-200 rounded-lg p-8 shadow-xs max-w-4xl mx-auto space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <div className="text-xs font-serif tracking-widest text-stone-500 uppercase">
              Monograph in Biblical Textual Criticism
            </div>
            <h3 className="text-2xl font-editorial font-bold text-stone-900 mt-1">
              {HISTORICAL_ESSAY.title}
            </h3>
            <p className="text-xs text-stone-500 font-serif-prose mt-1">
              {HISTORICAL_ESSAY.subtitle}
            </p>
          </div>

          <div className="space-y-6 text-stone-800 font-serif-prose text-sm leading-relaxed">
            {HISTORICAL_ESSAY.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-2">
                <h4 className="text-base font-editorial font-bold text-stone-900">
                  {section.heading}
                </h4>
                <p className="text-stone-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
