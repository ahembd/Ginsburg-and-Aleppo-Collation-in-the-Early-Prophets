/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RefreshCw, ArrowLeftRight, CheckCircle2, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { tokenizeHebrewVerse, compareHebrewWords, decomposeHebrewWord } from '../utils/hebrewDiacritics';

const SAMPLE_PRESETS = [
  {
    label: 'Joshua 1:1 (וַיְהִי vs וַֽיְהִי & מוֹת)',
    textA: 'וַיְהִ֗י אַחֲרֵ֛י מוֹת מֹשֶׁ֖ה עֶ֣בֶד יְהוָ֑ה',
    textB: 'וַֽיְהִ֗י אַחֲרֵ֛י מ֥וֹת מֹשֶׁ֖ה עֶ֣בֶד יְהוָ֑ה',
    note: 'Demonstrates Ga\'ya peshuta and Merkha on construct noun'
  },
  {
    label: 'Judges 5:12 (עוּרִי֙ vs עוּרִ֨י - Pashta vs Qadma)',
    textA: 'עוּרִ֤י עוּרִי֙ דְּבוֹרָ֔ה עוּרִ֥י עוּרִ֖י דַּבְּרִי־שִׁ֑יר',
    textB: 'עוּרִ֤י עוּרִ֨י דְּבוֹרָ֔ה עוּרִ֥י עוּרִ֖י דַּבְּרִי־שִׁ֑יר',
    note: 'Pashta disjunctive in Ginsburg vs Qadma conjunctive in Aleppo'
  },
  {
    label: '1 Samuel 2:1 (רָ֥ם vs רָ֤ם - Merkha vs Mahpakh)',
    textA: 'רָ֥ם קַרְנִ֖י בַּֽיהוָ֑ה רָ֤חַב פִּי֙ עַל־א֣וֹיְבַ֔י',
    textB: 'רָ֤ם קַרְנִ֖י בַּֽיהוָ֑ה רָ֤חַב פִּי֙ עַל־א֣וֹיְבַ֔י',
    note: 'Conjunctive servant profiling preceding pre-pausal disjunctive'
  },
  {
    label: '1 Kings 8:23 (Paseq after אֱלֹהִים֙)',
    textA: 'אֵין־כָּמ֤וֹךָ אֱלֹהִים֙ בַּשָּׁמַ֣יִם מִמַּ֔עַל',
    textB: 'אֵין־כָּמ֤וֹךָ אֱלֹהִים֙ ׀ בַּשָּׁמַ֣יִם מִמַּ֔עַל',
    note: 'Aleppo inserts Paseq to prevent elision of final mem before bet'
  },
  {
    label: '2 Kings 2:11 (בַּֽסְּעָרָ֥ה vs בַּֽסְעָרָ֖ה - Dagesh & Rafe)',
    textA: 'וַיַּ֥עַל אֵלִיָּ֖הוּ בַּֽסְּעָרָ֥ה הַשָּׁמָֽיִם׃',
    textB: 'וַיַּ֥עַל אֵלִיָּ֖הוּ בַּֽסְעָרָ֖ה הַשָּׁמָֽיִם׃',
    note: 'Aleppo degeminates sibilant samekh with Rafe after article ga\'ya'
  }
];

export const CustomComparator: React.FC = () => {
  const [textA, setTextA] = useState<string>(SAMPLE_PRESETS[0].textA);
  const [textB, setTextB] = useState<string>(SAMPLE_PRESETS[0].textB);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);

  const wordsA = tokenizeHebrewVerse(textA);
  const wordsB = tokenizeHebrewVerse(textB);
  const maxWords = Math.max(wordsA.length, wordsB.length);

  // Compare word pairs
  const wordComparisons = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < maxWords; i++) {
      const wA = wordsA[i] || '';
      const wB = wordsB[i] || '';
      const comp = compareHebrewWords(wA, wB);
      list.push({ index: i, wA, wB, ...comp });
    }
    return list;
  }, [wordsA, wordsB, maxWords]);

  const discrepancyCount = wordComparisons.filter(w => !w.isIdentical).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Intro Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-editorial font-bold text-stone-900">
          Interactive Hebrew Diacritics Comparator
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-serif-prose max-w-3xl leading-relaxed">
          Paste any Hebrew biblical verse or phrase with vocalization (Niqqud) and cantillation (Te&apos;amim) to 
          run a live character-level alignment and identify every vocalic, accentual, and meteg divergence.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-stone-500 font-sans font-medium whitespace-nowrap">Load Preset:</span>
        {SAMPLE_PRESETS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setTextA(p.textA);
              setTextB(p.textB);
              setSelectedWordIndex(null);
            }}
            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded whitespace-nowrap transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Dual Input Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Source A Input */}
        <div className="p-4 bg-white border border-stone-200 rounded-lg space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-600 font-sans">
            <span className="font-semibold text-stone-800">Text Witness A (e.g. C.D. Ginsburg / Venice 1525)</span>
            <span className="text-[11px] text-stone-400">{wordsA.length} words</span>
          </div>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            rows={3}
            dir="rtl"
            className="w-full p-3 font-hebrew text-2xl text-stone-900 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 leading-relaxed"
            placeholder="הזן טקסט עברי עם ניקוד וטעמים..."
          />
        </div>

        {/* Source B Input */}
        <div className="p-4 bg-amber-50/40 border border-amber-200/80 rounded-lg space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs text-amber-900 font-sans">
            <span className="font-semibold text-amber-950">Text Witness B (e.g. Aleppo Codex / Keter)</span>
            <span className="text-[11px] text-amber-700">{wordsB.length} words</span>
          </div>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            rows={3}
            dir="rtl"
            className="w-full p-3 font-hebrew text-2xl text-amber-950 bg-white border border-amber-200 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed"
            placeholder="הזן טקסט עברי עם ניקוד וטעמים..."
          />
        </div>
      </div>

      {/* Comparison Results Card */}
      <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-sans font-bold text-stone-900">
              Alignment Analysis
            </span>
            <span className="text-xs text-stone-500 font-sans tabular-nums">
              {discrepancyCount === 0 ? (
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Identical in Niqqud and Te&apos;amim
                </span>
              ) : (
                <span className="text-amber-800 font-medium">
                  {discrepancyCount} word discrepancy{discrepancyCount > 1 ? 'ies' : ''} detected
                </span>
              )}
            </span>
          </div>

          <div className="text-xs text-stone-500 font-serif-prose">
            Click any word below to inspect decomposed Unicode codepoints
          </div>
        </div>

        {/* Word-by-Word Alignment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {wordComparisons.map((item) => {
            const isSelected = selectedWordIndex === item.index;
            return (
              <div
                key={item.index}
                onClick={() => setSelectedWordIndex(item.index)}
                className={`p-3 rounded-md border text-center cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-2 ring-stone-800 border-stone-800 bg-stone-100/70'
                    : item.isIdentical
                    ? 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                    : 'border-amber-300 bg-amber-50/60 hover:bg-amber-100/70'
                }`}
              >
                <div className="text-[10px] text-stone-400 font-sans uppercase mb-1">
                  Word #{item.index + 1}
                </div>

                {/* Hebrew words */}
                <div className="space-y-1 py-1">
                  <div className="font-hebrew text-xl text-stone-700" title="Text A">
                    {item.wA || '—'}
                  </div>
                  <div className="font-hebrew text-xl font-bold text-amber-950" title="Text B">
                    {item.wB || '—'}
                  </div>
                </div>

                {/* Status tag */}
                <div className="mt-2 text-[11px] font-sans">
                  {item.isIdentical ? (
                    <span className="text-emerald-700">Identical</span>
                  ) : (
                    <span className="text-amber-800 font-medium">
                      {item.diffs.length} discrepancy{item.diffs.length > 1 ? 'ies' : ''}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Word Detail Drawer */}
        {selectedWordIndex !== null && wordComparisons[selectedWordIndex] && (
          <div className="p-5 bg-stone-50 border border-stone-200 rounded-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-sans uppercase tracking-wider text-stone-700 font-semibold">
                Word #{selectedWordIndex + 1} Philological Analysis
              </h3>
              <button
                onClick={() => setSelectedWordIndex(null)}
                className="text-xs text-stone-500 hover:text-stone-900"
              >
                Dismiss
              </button>
            </div>

            {wordComparisons[selectedWordIndex].diffs.length === 0 ? (
              <p className="text-xs text-emerald-700 font-serif-prose">
                Both text witnesses exhibit exact equivalence in consonantal skeleton, vowels, cantillation accents, and secondary marks.
              </p>
            ) : (
              <div className="space-y-2">
                {wordComparisons[selectedWordIndex].diffs.map((diff, dIdx) => (
                  <div key={dIdx} className="text-xs text-stone-800 bg-white p-2.5 rounded border border-stone-200 font-serif-prose">
                    <strong className="text-stone-900 font-sans block mb-0.5">{diff.context}:</strong>
                    <span>{diff.description}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Unicode Glyphs Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Text A Breakdown */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-stone-700 font-sans">
                  Text A Decomposition ({wordComparisons[selectedWordIndex].wA})
                </div>
                <div className="bg-white p-2.5 rounded border border-stone-200 text-xs font-mono divide-y divide-stone-100">
                  {decomposeHebrewWord(wordComparisons[selectedWordIndex].wA).chars.map((c, i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <span className="font-hebrew text-lg w-5 text-center text-stone-900">{c.char}</span>
                        <span className="font-sans text-stone-800">{c.nameEn}</span>
                      </div>
                      <span className="text-stone-400 text-[11px]">{c.codePoint}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text B Breakdown */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-amber-950 font-sans">
                  Text B Decomposition ({wordComparisons[selectedWordIndex].wB})
                </div>
                <div className="bg-white p-2.5 rounded border border-amber-200 text-xs font-mono divide-y divide-stone-100">
                  {decomposeHebrewWord(wordComparisons[selectedWordIndex].wB).chars.map((c, i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <span className="font-hebrew text-lg w-5 text-center text-amber-950">{c.char}</span>
                        <span className="font-sans text-stone-800">{c.nameEn}</span>
                      </div>
                      <span className="text-stone-400 text-[11px]">{c.codePoint}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
