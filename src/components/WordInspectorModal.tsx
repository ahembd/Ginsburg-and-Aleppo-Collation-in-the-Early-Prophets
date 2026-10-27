/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Copy, Check, Info, BookOpen } from 'lucide-react';
import { DiscrepancyItem } from '../types/masorah';
import { decomposeHebrewWord, compareHebrewWords } from '../utils/hebrewDiacritics';

interface WordInspectorModalProps {
  discrepancy: DiscrepancyItem | null;
  onClose: () => void;
}

export const WordInspectorModal: React.FC<WordInspectorModalProps> = ({ discrepancy, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!discrepancy) return null;

  const decG = decomposeHebrewWord(discrepancy.wordGinsburg);
  const decA = decomposeHebrewWord(discrepancy.wordAleppo);
  const comparison = compareHebrewWords(discrepancy.wordGinsburg, discrepancy.wordAleppo);

  const handleCopy = () => {
    const textToCopy = `Collation for ${discrepancy.verseRef} (${discrepancy.masoreticFeature}):\nGinsburg: ${discrepancy.wordGinsburg}\nAleppo Codex: ${discrepancy.wordAleppo}\nCategory: ${discrepancy.categoryLabel}\nSignificance: ${discrepancy.grammaticalSignificance}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div 
        className="bg-[#fcfbf8] border border-stone-300 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-100/70">
          <div>
            <div className="text-xs font-sans text-stone-500 uppercase tracking-wider">
              Masoretic Diacritic Inspector · {discrepancy.verseRef}
            </div>
            <h2 className="text-lg font-editorial font-bold text-stone-900">
              {discrepancy.masoreticFeature}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-200/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Large Dual-Word Hebrew Comparative Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* C.D. Ginsburg Reading */}
            <div className="p-5 bg-stone-50 border border-stone-200/90 rounded-md">
              <div className="flex items-center justify-between text-xs text-stone-500 font-sans mb-2">
                <span className="font-semibold text-stone-700">C. D. Ginsburg (1894/1926)</span>
                <span>British Library Consensus</span>
              </div>
              <div className="text-center py-4 bg-white rounded border border-stone-200">
                <span className="font-hebrew text-4xl text-stone-900 leading-normal inline-block">
                  {discrepancy.wordGinsburg}
                </span>
              </div>
              <p className="text-xs text-stone-600 font-serif-prose mt-3 leading-relaxed">
                {discrepancy.ginsburgReading}
              </p>
            </div>

            {/* Aleppo Codex Reading */}
            <div className="p-5 bg-amber-50/50 border border-amber-200/80 rounded-md">
              <div className="flex items-center justify-between text-xs text-amber-900 font-sans mb-2">
                <span className="font-semibold text-amber-950">Aleppo Codex (כתר ארם צובה)</span>
                <span>Aaron ben Moses ben Asher</span>
              </div>
              <div className="text-center py-4 bg-white rounded border border-amber-200">
                <span className="font-hebrew text-4xl text-amber-950 leading-normal inline-block">
                  {discrepancy.wordAleppo}
                </span>
              </div>
              <p className="text-xs text-stone-700 font-serif-prose mt-3 leading-relaxed">
                {discrepancy.aleppoReading}
              </p>
            </div>
          </div>

          {/* Diacritic Breakdown Comparison Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-sans uppercase tracking-wider text-stone-600 font-semibold">
              Grapheme &amp; Unicode Decomposition
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ginsburg Glyphs */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-stone-700">Ginsburg Glyphs ({decG.chars.length} atomic points)</div>
                <div className="divide-y divide-stone-200 border border-stone-200 rounded-md bg-white text-xs">
                  {decG.chars.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-2">
                        <span className="font-hebrew text-xl w-6 text-center text-stone-900 bg-stone-50 rounded">
                          {c.char}
                        </span>
                        <div>
                          <div className="font-medium text-stone-900">{c.nameEn}</div>
                          <div className="text-[11px] text-stone-500">{c.category}</div>
                        </div>
                      </div>
                      <span className="font-mono text-stone-400 text-[11px] tabular-nums">
                        {c.codePoint}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aleppo Glyphs */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-amber-950">Aleppo Glyphs ({decA.chars.length} atomic points)</div>
                <div className="divide-y divide-amber-200/60 border border-amber-200 rounded-md bg-white text-xs">
                  {decA.chars.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-2">
                        <span className="font-hebrew text-xl w-6 text-center text-amber-950 bg-amber-50/50 rounded">
                          {c.char}
                        </span>
                        <div>
                          <div className="font-medium text-stone-900">{c.nameEn}</div>
                          <div className="text-[11px] text-stone-500">{c.category}</div>
                        </div>
                      </div>
                      <span className="font-mono text-stone-400 text-[11px] tabular-nums">
                        {c.codePoint}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grammatical and Masoretic Commentary */}
          <div className="p-4 bg-stone-100/80 rounded-md border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-800 font-sans font-semibold">
              <Info className="w-4 h-4 text-stone-700" />
              <span>Philological &amp; Liturgical Analysis</span>
            </div>
            <p className="text-xs text-stone-800 font-serif-prose leading-relaxed">
              {discrepancy.grammaticalSignificance}
            </p>

            {discrepancy.benAsherRule && (
              <div className="pt-2 border-t border-stone-200 text-xs text-stone-700">
                <strong className="text-stone-900 font-sans">Ben Asher Rule (Diqduqe ha-Te&apos;amim):</strong>{' '}
                <span className="font-serif-prose italic">{discrepancy.benAsherRule}</span>
              </div>
            )}

            <div className="pt-2 border-t border-stone-200 text-xs text-stone-600">
              <strong className="text-stone-900 font-sans">Manuscript Witnesses:</strong>{' '}
              <span className="font-serif-prose">{discrepancy.historicalWitnesses}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-stone-200 bg-stone-50">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-200/80 rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Collation Note'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
