/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, FileDown, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: 'browser' | 'comparator' | 'accents' | 'history';
  setActiveTab: (tab: 'browser' | 'comparator' | 'accents' | 'history') => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenExport }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xl font-editorial font-bold tracking-tight text-stone-900 whitespace-nowrap">
            Masoretic Collation
          </span>
          <span className="hidden sm:inline text-xs text-stone-400 font-serif-prose italic">
            Ginsburg · Aleppo Codex
          </span>
        </div>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('browser')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
              activeTab === 'browser'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Early Prophets Collation
          </button>

          <button
            onClick={() => setActiveTab('comparator')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
              activeTab === 'comparator'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Interactive Comparator
          </button>

          <button
            onClick={() => setActiveTab('accents')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
              activeTab === 'accents'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Tiberian Accent System
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
              activeTab === 'history'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Scholarly Apparatus & History
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenExport}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-800 bg-stone-200/80 hover:bg-stone-300/80 rounded-md transition-colors whitespace-nowrap shrink-0"
            title="Export critical collation apparatus as Markdown or CSV"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Mobile nav rail */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200/80 px-4 py-2 bg-stone-100/60 text-xs">
        <button
          onClick={() => setActiveTab('browser')}
          className={`py-1 px-2 font-medium ${activeTab === 'browser' ? 'text-stone-950 font-bold border-b border-stone-900' : 'text-stone-600'}`}
        >
          Early Prophets
        </button>
        <button
          onClick={() => setActiveTab('comparator')}
          className={`py-1 px-2 font-medium ${activeTab === 'comparator' ? 'text-stone-950 font-bold border-b border-stone-900' : 'text-stone-600'}`}
        >
          Comparator
        </button>
        <button
          onClick={() => setActiveTab('accents')}
          className={`py-1 px-2 font-medium ${activeTab === 'accents' ? 'text-stone-950 font-bold border-b border-stone-900' : 'text-stone-600'}`}
        >
          Accents
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-1 px-2 font-medium ${activeTab === 'history' ? 'text-stone-950 font-bold border-b border-stone-900' : 'text-stone-600'}`}
        >
          History
        </button>
      </div>
    </header>
  );
};
