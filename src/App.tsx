/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { OverviewHero } from './components/OverviewHero';
import { EarlyProphetsBrowser } from './components/EarlyProphetsBrowser';
import { CustomComparator } from './components/CustomComparator';
import { MasoreticKnowledgeBase } from './components/MasoreticKnowledgeBase';
import { WordInspectorModal } from './components/WordInspectorModal';
import { ExportModal } from './components/ExportModal';
import { DiscrepancyItem } from './types/masorah';
import { EARLY_PROPHETS_COLLATIONS } from './data/earlyProphetsData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'browser' | 'comparator' | 'accents' | 'history'>('browser');
  const [selectedDiscrepancy, setSelectedDiscrepancy] = useState<DiscrepancyItem | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const totalVerses = EARLY_PROPHETS_COLLATIONS.length;
  const totalDiscrepancies = EARLY_PROPHETS_COLLATIONS.reduce((a, b) => a + b.discrepancies.length, 0);

  const handleFilterByCategory = (category: string) => {
    setCategoryFilter(category);
    setActiveTab('browser');
  };

  return (
    <div className="min-h-screen bg-[#fcfbf8] text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-950">
      {/* 3-Zone Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'browser' && (
          <>
            <OverviewHero
              totalVerses={totalVerses}
              totalDiscrepancies={totalDiscrepancies}
              onJumpToComparator={() => setActiveTab('comparator')}
              onFilterByCategory={handleFilterByCategory}
            />
            <EarlyProphetsBrowser
              onSelectDiscrepancy={(item) => setSelectedDiscrepancy(item)}
              initialCategoryFilter={categoryFilter}
            />
          </>
        )}

        {activeTab === 'comparator' && (
          <CustomComparator />
        )}

        {activeTab === 'accents' && (
          <MasoreticKnowledgeBase />
        )}

        {activeTab === 'history' && (
          <MasoreticKnowledgeBase />
        )}
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-stone-200 bg-[#f7f4ee] py-8 text-xs text-stone-600 font-serif-prose">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="font-editorial font-bold text-stone-900 block sm:inline mr-2">
              Masoretic Collation &amp; Critical Apparatus
            </span>
            <span>Early Prophets (Joshua, Judges, 1–2 Samuel, 1–2 Kings)</span>
          </div>

          <div className="flex items-center gap-4 text-stone-500 text-[11px] font-sans">
            <span>Witnesses: Keter Aram Tzova (c. 930 CE)</span>
            <span aria-hidden="true">·</span>
            <span>C. D. Ginsburg (BFBS 1926)</span>
            <span aria-hidden="true">·</span>
            <span>Venice Second Rabbinic Bible (1525)</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WordInspectorModal
        discrepancy={selectedDiscrepancy}
        onClose={() => setSelectedDiscrepancy(null)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
