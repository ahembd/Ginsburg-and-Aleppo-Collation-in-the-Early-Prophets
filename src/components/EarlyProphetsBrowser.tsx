/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Eye, ZoomIn, ZoomOut, Layers, ExternalLink, HelpCircle } from 'lucide-react';
import { VerseCollation, DiscrepancyItem, EarlyProphetBookId, DiscrepancyCategory } from '../types/masorah';
import { EARLY_PROPHETS_COLLATIONS, BOOKS_METADATA, DISCREPANCY_CATEGORY_STATS } from '../data/earlyProphetsData';
import { tokenizeHebrewVerse, stripToConsonants } from '../utils/hebrewDiacritics';

interface EarlyProphetsBrowserProps {
  onSelectDiscrepancy: (item: DiscrepancyItem) => void;
  initialCategoryFilter?: string | null;
}

export const EarlyProphetsBrowser: React.FC<EarlyProphetsBrowserProps> = ({
  onSelectDiscrepancy,
  initialCategoryFilter,
}) => {
  const [selectedBook, setSelectedBook] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'huge'>('large');
  const [highlightFilter, setHighlightFilter] = useState<'all' | 'accents' | 'vowels' | 'meteg'>('all');
  const [viewMode, setViewMode] = useState<'side-by-side' | 'stacked'>('side-by-side');

  // Filtered collation list
  const filteredVerses = useMemo(() => {
    return EARLY_PROPHETS_COLLATIONS.filter((verse) => {
      // Book filter
      if (selectedBook !== 'all' && verse.bookId !== selectedBook) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        const hasMatchingDiscrepancy = verse.discrepancies.some(
          (d) => d.category === selectedCategory
        );
        if (!hasMatchingDiscrepancy) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const queryConsonants = stripToConsonants(query);

        const inRef = verse.referenceEn.toLowerCase().includes(query) || verse.referenceHe.includes(query);
        const inTitle = verse.contextTitle.toLowerCase().includes(query);
        const inTrans = verse.translationEn.toLowerCase().includes(query);
        const inGinsburg = verse.textGinsburg.includes(query) || stripToConsonants(verse.textGinsburg).includes(queryConsonants);
        const inAleppo = verse.textAleppo.includes(query) || stripToConsonants(verse.textAleppo).includes(queryConsonants);
        const inDiscrepancies = verse.discrepancies.some(
          (d) =>
            d.masoreticFeature.toLowerCase().includes(query) ||
            d.grammaticalSignificance.toLowerCase().includes(query) ||
            d.wordGinsburg.includes(query) ||
            d.wordAleppo.includes(query)
        );

        return inRef || inTitle || inTrans || inGinsburg || inAleppo || inDiscrepancies;
      }

      return true;
    });
  }, [selectedBook, selectedCategory, searchQuery]);

  // Total discrepancies in current filter
  const currentDiscrepancyCount = useMemo(() => {
    return filteredVerses.reduce((acc, v) => acc + v.discrepancies.length, 0);
  }, [filteredVerses]);

  const getTextClass = () => {
    switch (textSize) {
      case 'normal':
        return 'text-xl sm:text-2xl leading-loose';
      case 'huge':
        return 'text-3xl sm:text-4xl leading-[2.5rem] sm:leading-[3.25rem]';
      case 'large':
      default:
        return 'text-2xl sm:text-3xl leading-[2.2rem] sm:leading-[2.75rem]';
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Controls & Filtering Bar */}
      <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs space-y-4">
        {/* Book Selector Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold">
              Select Book of Early Prophets (נְבִיאִים רִאשׁוֹנִים)
            </span>
            <span className="text-xs text-stone-500 font-sans tabular-nums">
              Showing {filteredVerses.length} loci ({currentDiscrepancyCount} discrepancies)
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => setSelectedBook('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedBook === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All 6 Books
            </button>
            {BOOKS_METADATA.map((book) => (
              <button
                key={book.id}
                onClick={() => setSelectedBook(book.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedBook === book.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>{book.nameEn}</span>
                <span className="font-hebrew text-xs opacity-75">({book.nameHe})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Second Row: Category Filter + Search + View Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-3 border-t border-stone-200/80">
          {/* Category Filter */}
          <div className="lg:col-span-6 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All Categories
            </button>
            {DISCREPANCY_CATEGORY_STATS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="lg:col-span-3 relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Hebrew, ref, or keyword..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 transition-colors"
            />
          </div>

          {/* Typography & Layout Controls */}
          <div className="lg:col-span-3 flex items-center justify-end gap-2 text-xs text-stone-600">
            {/* View layout switch */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded border border-stone-200">
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  viewMode === 'side-by-side' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                }`}
                title="Parallel side-by-side columns"
              >
                Columns
              </button>
              <button
                onClick={() => setViewMode('stacked')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  viewMode === 'stacked' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                }`}
                title="Stacked interlinear view"
              >
                Stacked
              </button>
            </div>

            {/* Hebrew Font Size */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded border border-stone-200">
              <button
                onClick={() => setTextSize('normal')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${
                  textSize === 'normal' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'
                }`}
                title="Normal text size"
              >
                A
              </button>
              <button
                onClick={() => setTextSize('large')}
                className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                  textSize === 'large' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'
                }`}
                title="Large biblical text size"
              >
                A+
              </button>
              <button
                onClick={() => setTextSize('huge')}
                className={`px-1.5 py-0.5 rounded text-sm font-bold ${
                  textSize === 'huge' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'
                }`}
                title="Extra large for mark inspection"
              >
                A++
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verses Collation Display */}
      <div className="space-y-8">
        {filteredVerses.length === 0 ? (
          <div className="p-12 text-center bg-white border border-stone-200 rounded-lg space-y-3">
            <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
            <h3 className="text-base font-serif font-bold text-stone-800">No loci match your filter</h3>
            <p className="text-xs text-stone-500 font-serif-prose max-w-md mx-auto">
              Try adjusting the book selection or clearing the search query to view the full Early Prophets collation apparatus.
            </p>
            <button
              onClick={() => {
                setSelectedBook('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredVerses.map((verse) => {
            const ginsburgWords = tokenizeHebrewVerse(verse.textGinsburg);
            const aleppoWords = tokenizeHebrewVerse(verse.textAleppo);

            return (
              <article
                key={verse.id}
                className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-xs hover:border-stone-300 transition-colors"
              >
                {/* Locus Editorial Header */}
                <div className="px-6 py-3.5 bg-stone-50/90 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-editorial font-bold text-base text-stone-900">
                      {verse.referenceEn}
                    </span>
                    <span className="font-hebrew text-stone-600 text-sm">
                      ({verse.referenceHe})
                    </span>
                    <span className="hidden sm:inline text-stone-300">·</span>
                    <span className="text-xs text-stone-600 font-serif-prose">
                      {verse.contextTitle}
                    </span>
                  </div>

                  {verse.aleppoFolio && (
                    <div className="text-xs text-amber-900 font-serif-prose bg-amber-50/80 px-2.5 py-1 rounded border border-amber-200/60">
                      Aleppo Codex: {verse.aleppoFolio}
                    </div>
                  )}
                </div>

                {/* Parallel Hebrew Biblical Text Panel */}
                <div className="p-6 space-y-6">
                  {viewMode === 'side-by-side' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* C.D. Ginsburg Text Column */}
                      <div className="p-5 bg-[#faf9f5] border border-stone-200 rounded-md space-y-3">
                        <div className="flex items-center justify-between text-xs text-stone-500 font-sans border-b border-stone-200/80 pb-2">
                          <span className="font-semibold text-stone-700">C. D. Ginsburg (1894/1926)</span>
                          <span className="text-[11px]">British &amp; Foreign Bible Society</span>
                        </div>
                        <div
                          className={`font-hebrew ${getTextClass()} text-stone-900 text-right select-text`}
                        >
                          {ginsburgWords.map((word, wIdx) => {
                            const disc = verse.discrepancies.find((d) => d.wordIndex === wIdx);
                            return (
                              <React.Fragment key={wIdx}>
                                {disc ? (
                                  <span
                                    onClick={() => onSelectDiscrepancy(disc)}
                                    className="cursor-pointer bg-amber-100/70 hover:bg-amber-200 text-stone-950 px-1 py-0.5 rounded transition-colors underline decoration-amber-600/60 decoration-2 underline-offset-4"
                                    title={`Discrepancy: ${disc.masoreticFeature}. Click to inspect.`}
                                  >
                                    {word}
                                  </span>
                                ) : (
                                  <span>{word}</span>
                                )}
                                {' '}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>

                      {/* Aleppo Codex Text Column */}
                      <div className="p-5 bg-amber-50/40 border border-amber-200/80 rounded-md space-y-3">
                        <div className="flex items-center justify-between text-xs text-amber-900 font-sans border-b border-amber-200/80 pb-2">
                          <span className="font-semibold text-amber-950">Aleppo Codex (כתר ארם צובה)</span>
                          <span className="text-[11px]">Aaron ben Moses ben Asher (~930 CE)</span>
                        </div>
                        <div
                          className={`font-hebrew ${getTextClass()} text-amber-950 text-right select-text`}
                        >
                          {aleppoWords.map((word, wIdx) => {
                            const disc = verse.discrepancies.find((d) => d.wordIndex === wIdx);
                            return (
                              <React.Fragment key={wIdx}>
                                {disc ? (
                                  <span
                                    onClick={() => onSelectDiscrepancy(disc)}
                                    className="cursor-pointer bg-amber-200/80 hover:bg-amber-300 text-amber-950 px-1 py-0.5 rounded transition-colors font-medium underline decoration-amber-700 decoration-2 underline-offset-4"
                                    title={`Discrepancy: ${disc.masoreticFeature}. Click to inspect.`}
                                  >
                                    {word}
                                  </span>
                                ) : (
                                  <span>{word}</span>
                                )}
                                {' '}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Stacked Interlinear View */
                    <div className="space-y-4">
                      <div className="p-4 bg-[#faf9f5] border border-stone-200 rounded-md">
                        <div className="text-xs font-semibold text-stone-600 mb-1.5">
                          C. D. Ginsburg (1894/1926)
                        </div>
                        <div className={`font-hebrew ${getTextClass()} text-stone-900 text-right`}>
                          {ginsburgWords.map((word, wIdx) => {
                            const disc = verse.discrepancies.find((d) => d.wordIndex === wIdx);
                            return (
                              <React.Fragment key={wIdx}>
                                {disc ? (
                                  <span
                                    onClick={() => onSelectDiscrepancy(disc)}
                                    className="cursor-pointer bg-amber-100 hover:bg-amber-200 px-1 py-0.5 rounded underline decoration-amber-600"
                                  >
                                    {word}
                                  </span>
                                ) : (
                                  <span>{word}</span>
                                )}
                                {' '}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>

                      <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-md">
                        <div className="text-xs font-semibold text-amber-950 mb-1.5">
                          Aleppo Codex (כתר ארם צובה)
                        </div>
                        <div className={`font-hebrew ${getTextClass()} text-amber-950 text-right`}>
                          {aleppoWords.map((word, wIdx) => {
                            const disc = verse.discrepancies.find((d) => d.wordIndex === wIdx);
                            return (
                              <React.Fragment key={wIdx}>
                                {disc ? (
                                  <span
                                    onClick={() => onSelectDiscrepancy(disc)}
                                    className="cursor-pointer bg-amber-200 hover:bg-amber-300 px-1 py-0.5 rounded font-medium underline decoration-amber-700"
                                  >
                                    {word}
                                  </span>
                                ) : (
                                  <span>{word}</span>
                                )}
                                {' '}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scholarly English Translation */}
                  <div className="text-xs text-stone-600 font-serif-prose italic border-l-2 border-stone-300 pl-3">
                    &ldquo;{verse.translationEn}&rdquo;
                  </div>

                  {/* Discrepancy Cards Apparatus */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs uppercase tracking-wider text-stone-500 font-sans font-semibold">
                      Collation Apparatus ({verse.discrepancies.length} Identified Variations)
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {verse.discrepancies.map((disc) => (
                        <div
                          key={disc.id}
                          onClick={() => onSelectDiscrepancy(disc)}
                          className="group p-3.5 bg-stone-50 hover:bg-stone-100/80 border border-stone-200/90 rounded-md cursor-pointer transition-all hover:shadow-xs space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-sans font-semibold text-stone-900 group-hover:text-amber-900 transition-colors">
                              {disc.masoreticFeature}
                            </span>
                            <span className="text-[11px] text-stone-500 font-sans">
                              {disc.categoryLabel}
                            </span>
                          </div>

                          <div className="flex items-center justify-between font-hebrew text-xl bg-white p-2 rounded border border-stone-200">
                            <div className="text-stone-700 text-sm">
                              <span className="text-[11px] font-sans text-stone-400 block">Ginsburg</span>
                              <span className="font-hebrew text-lg">{disc.wordGinsburg}</span>
                            </div>
                            <span className="text-stone-300 font-sans text-xs">vs</span>
                            <div className="text-amber-950 text-sm text-left">
                              <span className="text-[11px] font-sans text-amber-700 block">Aleppo</span>
                              <span className="font-hebrew text-lg font-bold">{disc.wordAleppo}</span>
                            </div>
                          </div>

                          <p className="text-xs text-stone-600 font-serif-prose leading-relaxed line-clamp-2">
                            {disc.grammaticalSignificance}
                          </p>

                          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-200/60 font-sans">
                            <span>Click for Unicode breakdown</span>
                            <span className="text-stone-500 group-hover:text-stone-900 transition-colors font-medium flex items-center gap-1">
                              Inspect <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};
