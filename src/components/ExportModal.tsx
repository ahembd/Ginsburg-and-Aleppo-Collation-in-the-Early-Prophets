/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Copy, Download, Check, FileText, Table } from 'lucide-react';
import { EARLY_PROPHETS_COLLATIONS } from '../data/earlyProphetsData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [format, setFormat] = useState<'markdown' | 'csv'>('markdown');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate Markdown report
  const generateMarkdown = () => {
    let md = `# Critical Collation: Hebrew Bible Early Prophets (נביאים ראשונים)\n`;
    md += `## Christian David Ginsburg (1894/1926) vs. Aleppo Codex (Keter Aram Tzova c. 930 CE)\n`;
    md += `Generated: ${new Date().toISOString().split('T')[0]}\n\n`;
    md += `---\n\n`;

    EARLY_PROPHETS_COLLATIONS.forEach((verse) => {
      md += `### ${verse.referenceEn} (${verse.referenceHe}) - ${verse.contextTitle}\n\n`;
      md += `**English Translation:** *"${verse.translationEn}"*\n\n`;
      md += `**C. D. Ginsburg Reading:**\n> ${verse.textGinsburg}\n\n`;
      md += `**Aleppo Codex Reading:**\n> ${verse.textAleppo}\n\n`;
      if (verse.aleppoFolio) {
        md += `*Witness:* Aleppo Codex ${verse.aleppoFolio}\n\n`;
      }
      md += `#### Discrepancies Identified:\n`;
      verse.discrepancies.forEach((d, idx) => {
        md += `${idx + 1}. **${d.masoreticFeature}** [${d.categoryLabel}]\n`;
        md += `   - **Ginsburg:** \`${d.wordGinsburg}\` — ${d.ginsburgReading}\n`;
        md += `   - **Aleppo:** \`${d.wordAleppo}\` — ${d.aleppoReading}\n`;
        md += `   - **Grammatical/Liturgical Impact:** ${d.grammaticalSignificance}\n`;
        if (d.benAsherRule) {
          md += `   - **Ben Asher Rule:** *${d.benAsherRule}*\n`;
        }
        md += `   - **Witnesses:** ${d.historicalWitnesses}\n\n`;
      });
      md += `---\n\n`;
    });

    return md;
  };

  // Generate CSV data
  const generateCSV = () => {
    const headers = [
      'Reference',
      'Book',
      'Chapter',
      'Verse',
      'Category',
      'Masoretic Feature',
      'Word Ginsburg',
      'Word Aleppo',
      'Ginsburg Reading',
      'Aleppo Reading',
      'Grammatical Significance',
      'Witnesses'
    ];

    const rows: string[][] = [];

    EARLY_PROPHETS_COLLATIONS.forEach((verse) => {
      verse.discrepancies.forEach((d) => {
        rows.push([
          `"${d.verseRef}"`,
          `"${verse.bookNameEn}"`,
          `${verse.chapter}`,
          `${verse.verse}`,
          `"${d.categoryLabel}"`,
          `"${d.masoreticFeature.replace(/"/g, '""')}"`,
          `"${d.wordGinsburg}"`,
          `"${d.wordAleppo}"`,
          `"${d.ginsburgReading.replace(/"/g, '""')}"`,
          `"${d.aleppoReading.replace(/"/g, '""')}"`,
          `"${d.grammaticalSignificance.replace(/"/g, '""')}"`,
          `"${d.historicalWitnesses.replace(/"/g, '""')}"`
        ]);
      });
    });

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  };

  const exportContent = format === 'markdown' ? generateMarkdown() : generateCSV();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([exportContent], { type: format === 'markdown' ? 'text/markdown' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ginsburg_vs_aleppo_early_prophets_${format}.${format === 'markdown' ? 'md' : 'csv'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-[#fcfbf8] border border-stone-300 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-100/70">
          <div>
            <div className="text-xs font-sans text-stone-500 uppercase tracking-wider">
              Export Apparatus Data
            </div>
            <h2 className="text-lg font-editorial font-bold text-stone-900">
              Collation Report &amp; Data Apparatus
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Format selector */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-600 font-sans font-medium">Format:</span>
              <button
                onClick={() => setFormat('markdown')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                  format === 'markdown' ? 'bg-stone-900 text-white font-medium' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Scholarly Markdown (.md)</span>
              </button>
              <button
                onClick={() => setFormat('csv')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                  format === 'csv' ? 'bg-stone-900 text-white font-medium' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Tabular Dataset (.csv)</span>
              </button>
            </div>

            <div className="text-xs text-stone-500 font-sans">
              {EARLY_PROPHETS_COLLATIONS.length} Loci · {EARLY_PROPHETS_COLLATIONS.reduce((a, b) => a + b.discrepancies.length, 0)} Discrepancies
            </div>
          </div>

          {/* Preview box */}
          <div className="space-y-1">
            <span className="text-xs text-stone-500 font-sans uppercase tracking-wider">Preview</span>
            <pre className="p-4 bg-stone-900 text-stone-200 text-xs font-mono rounded-md overflow-x-auto max-h-72 select-all whitespace-pre-wrap leading-relaxed">
              {exportContent.slice(0, 3000)}
              {exportContent.length > 3000 && '\n\n... [Content truncated in preview. Click Download for complete report] ...'}
            </pre>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-stone-200 bg-stone-50">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-stone-800 bg-white border border-stone-200 hover:bg-stone-100 rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Full Report' : 'Copy to Clipboard'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
