/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EarlyProphetBookId = 
  | 'joshua' 
  | 'judges' 
  | 'samuel1' 
  | 'samuel2' 
  | 'kings1' 
  | 'kings2';

export type DiscrepancyCategory = 
  | 'cantillation'   // Te'amim (accents/conjunctive vs disjunctive)
  | 'vocalization'   // Niqqud (vowel points)
  | 'meteg_gaya'     // Meteg / Ga'ya presence or position
  | 'paseq'          // Paseq vertical dividing line
  | 'dagesh_rafe'    // Dagesh (forte/lene), Mappiq, Rafe bar
  | 'orthography';   // Plene/defective (male/haser), Qere/Ketiv

export interface DiscrepancyItem {
  id: string;
  verseRef: string;               // e.g. "Joshua 1:1"
  bookId: EarlyProphetBookId;
  chapter: number;
  verse: number;
  wordIndex: number;              // 0-based index in the verse
  wordGinsburg: string;           // Hebrew word in Ginsburg text
  wordAleppo: string;             // Hebrew word in Aleppo Codex
  category: DiscrepancyCategory;
  categoryLabel: string;
  masoreticFeature: string;        // e.g., "Zaqef Qaton vs. Tifcha"
  ginsburgReading: string;         // Detailed explanation of Ginsburg reading
  aleppoReading: string;           // Detailed explanation of Ben Asher Aleppo reading
  grammaticalSignificance: string; // Phonological, syntactical, or liturgical impact
  historicalWitnesses: string;     // e.g., "Leningrad B19a, BL Add. 15251, Bomberg 1525"
  benAsherRule?: string;           // Citation from Diqduqe ha-Te'amim or Masorah
}

export interface VerseCollation {
  id: string;
  bookId: EarlyProphetBookId;
  bookNameEn: string;
  bookNameHe: string;
  chapter: number;
  verse: number;
  referenceEn: string;             // e.g., "Joshua 1:1"
  referenceHe: string;             // e.g., "יהושע א:א"
  textGinsburg: string;            // Full verse with niqqud & te'amim from C.D. Ginsburg
  textAleppo: string;              // Full verse with niqqud & te'amim from Aleppo Codex
  translationEn: string;           // English scholarly translation
  contextTitle: string;            // Descriptive heading, e.g. "Opening of Joshua: Succession and Commission"
  discrepancies: DiscrepancyItem[];
  manuscriptNotes?: string;        // Folio info, condition of the parchment in Aleppo Codex
  aleppoFolio?: string;            // e.g. "Folio 41r, Column 1"
}

export interface DecomposedChar {
  char: string;
  type: 'consonant' | 'vowel' | 'accent' | 'meteg' | 'modifier' | 'punctuation';
  codePoint: string;
  nameEn: string;
  nameHe: string;
  category: string;
  accentClass?: 'disjunctive' | 'conjunctive' | 'euphonic' | 'structural';
}

export interface DecomposedWord {
  raw: string;
  consonantsOnly: string;
  chars: DecomposedChar[];
  hasMeteg: boolean;
  hasPaseq: boolean;
  accents: DecomposedChar[];
  vowels: DecomposedChar[];
  modifiers: DecomposedChar[];
}
