/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DecomposedChar, DecomposedWord, DiscrepancyCategory } from '../types/masorah';

// Detailed Unicode mapping for Hebrew characters, Niqqud, Accents, and Punctuation
export const HEBREW_UNICODE_MAP: Record<number, { nameEn: string; nameHe: string; type: DecomposedChar['type']; accentClass?: 'disjunctive' | 'conjunctive' | 'euphonic' | 'structural'; description: string }> = {
  // Cantillation Accents (Te'amim / טעמים)
  0x0591: { nameEn: 'Etnahta / Atnah', nameHe: 'אֶתְנַחְתָּא', type: 'accent', accentClass: 'disjunctive', description: 'Major disjunctive accent dividing the verse into two principal halves' },
  0x0592: { nameEn: 'Segol (Accent)', nameHe: 'סְגוֹל', type: 'accent', accentClass: 'disjunctive', description: 'Disjunctive accent marking clause division' },
  0x0593: { nameEn: 'Shalshelet', nameHe: 'שַׁלְשֶׁלֶת', type: 'accent', accentClass: 'disjunctive', description: 'Rare dramatic trilling disjunctive accent' },
  0x0594: { nameEn: 'Zaqef Qaton', nameHe: 'זָקֵף קָטֹן', type: 'accent', accentClass: 'disjunctive', description: 'Primary king/disjunctive accent creating secondary pause within the hemistich' },
  0x0595: { nameEn: 'Zaqef Gadol', nameHe: 'זָקֵף גָּדוֹל', type: 'accent', accentClass: 'disjunctive', description: 'Disjunctive accent occurring on isolated single-word clauses' },
  0x0596: { nameEn: 'Tifcha / Tarcha', nameHe: 'טִפְחָא', type: 'accent', accentClass: 'disjunctive', description: 'Essential pre-pausal disjunctive accent preceding Siluq or Etnahta' },
  0x0597: { nameEn: 'Revia', nameHe: 'רְבִיעַ', type: 'accent', accentClass: 'disjunctive', description: 'Disjunctive accent marking tertiary pause' },
  0x0598: { nameEn: 'Zarqa', nameHe: 'זַרְקָא', type: 'accent', accentClass: 'disjunctive', description: 'Postpositive disjunctive accent' },
  0x0599: { nameEn: 'Pashta', nameHe: 'פַּשְׁטָא', type: 'accent', accentClass: 'disjunctive', description: 'Postpositive disjunctive accent, doubled when word is stressed on penult (mile\'el)' },
  0x059A: { nameEn: 'Yetiv', nameHe: 'יְתִיב', type: 'accent', accentClass: 'disjunctive', description: 'Prepositive disjunctive accent' },
  0x059B: { nameEn: 'Tevir', nameHe: 'תְּבִיר', type: 'accent', accentClass: 'disjunctive', description: 'Subordinate disjunctive accent often preceded by Darga or Merkha' },
  0x059C: { nameEn: 'Geresh / Azla', nameHe: 'גֵּרֶשׁ', type: 'accent', accentClass: 'disjunctive', description: 'Disjunctive accent' },
  0x059D: { nameEn: 'Geresh Muqdam', nameHe: 'גֵּרֶשׁ מֻקְדָּם', type: 'accent', accentClass: 'disjunctive', description: 'Early geresh accent' },
  0x059E: { nameEn: 'Gershayim', nameHe: 'גֵּרְשַׁיִם', type: 'accent', accentClass: 'disjunctive', description: 'Double geresh disjunctive accent' },
  0x059F: { nameEn: 'Karney Farah / Pazer Gadol', nameHe: 'קַרְנֵי פָרָה', type: 'accent', accentClass: 'disjunctive', description: 'Majestic high disjunctive accent' },
  0x05A0: { nameEn: 'Telisha Gedola', nameHe: 'תְּלִישָׁא גְדוֹלָה', type: 'accent', accentClass: 'disjunctive', description: 'Prepositive major disjunctive accent' },
  0x05A1: { nameEn: 'Pazer', nameHe: 'פָּזֵר', type: 'accent', accentClass: 'disjunctive', description: 'Major disjunctive accent' },
  0x05A2: { nameEn: 'Atnah Hafukh', nameHe: 'אַתְנַח הָפוּךְ', type: 'accent', accentClass: 'conjunctive', description: 'Conjunctive accent in poetic books' },
  0x05A3: { nameEn: 'Munach', nameHe: 'מֻנַּח', type: 'accent', accentClass: 'conjunctive', description: 'Universal conjunctive servant accent connecting smoothly to next word' },
  0x05A4: { nameEn: 'Mahpakh', nameHe: 'מַהְפָּךְ', type: 'accent', accentClass: 'conjunctive', description: 'Conjunctive accent linking closely to Pashta' },
  0x05A5: { nameEn: 'Merkha', nameHe: 'מֶרְכָא', type: 'accent', accentClass: 'conjunctive', description: 'Crucial conjunctive servant preceding Tifcha, Siluq, or Pashta' },
  0x05A6: { nameEn: 'Merkha Kefula', nameHe: 'מֶרְכָא כְפוּלָה', type: 'accent', accentClass: 'conjunctive', description: 'Double Merkha conjunctive accent' },
  0x05A7: { nameEn: 'Darga', nameHe: 'דַּרְגָּא', type: 'accent', accentClass: 'conjunctive', description: 'Ascending conjunctive accent leading to Tevir' },
  0x05A8: { nameEn: 'Qadma', nameHe: 'קַדְמָא', type: 'accent', accentClass: 'conjunctive', description: 'Preceding conjunctive accent before Geresh or Zaqef' },
  0x05A9: { nameEn: 'Telisha Qetana', nameHe: 'תְּלִישָׁא קְטַנָּה', type: 'accent', accentClass: 'conjunctive', description: 'Postpositive conjunctive accent' },
  0x05AA: { nameEn: 'Yerah Ben Yomo', nameHe: 'יֶרַח בֶּן יוֹמוֹ', type: 'accent', accentClass: 'conjunctive', description: 'Conjunctive accent preceding Karney Farah' },
  0x05AB: { nameEn: 'Ole', nameHe: 'עוֹלֶה', type: 'accent', accentClass: 'disjunctive', description: 'Poetic disjunctive accent' },
  0x05AC: { nameEn: 'Iluy', nameHe: 'עִלּוּי', type: 'accent', accentClass: 'conjunctive', description: 'Poetic conjunctive accent' },
  0x05AD: { nameEn: 'Dehi', nameHe: 'דְּחִי', type: 'accent', accentClass: 'disjunctive', description: 'Poetic disjunctive accent' },
  0x05AE: { nameEn: 'Zinor / Zinorit', nameHe: 'זִנּוֹר', type: 'accent', accentClass: 'disjunctive', description: 'Postpositive disjunctive / ornamental accent' },
  0x05AF: { nameEn: 'Masora Circle', nameHe: 'עִגּוּל הַמַּסּוֹרָה', type: 'modifier', accentClass: 'structural', description: 'Small circle over word linking to Masorah Magna/Parva marginal note' },

  // Vocalization (Niqqud / ניקוד)
  0x05B0: { nameEn: 'Sheva (Na / Nach)', nameHe: 'שְׁוָא', type: 'vowel', description: 'Neutral vowel point: vocal (na) or silent (nach)' },
  0x05B1: { nameEn: 'Hataf Segol', nameHe: 'חֲטַף סְגוֹל', type: 'vowel', description: 'Reduced short /e/ vowel under guttural or initial consonants' },
  0x05B2: { nameEn: 'Hataf Patah', nameHe: 'חֲטַף פַּתַּח', type: 'vowel', description: 'Reduced ultra-short /a/ vowel, characteristic of Ben Asher Tiberian precision' },
  0x05B3: { nameEn: 'Hataf Qamats', nameHe: 'חֲטַף קָמָץ', type: 'vowel', description: 'Reduced short /o/ vowel' },
  0x05B4: { nameEn: 'Hiriq', nameHe: 'חִירִיק', type: 'vowel', description: '/i/ vowel, written defective or plene with yod' },
  0x05B5: { nameEn: 'Tsere', nameHe: 'צֵירֵי', type: 'vowel', description: 'Long /e/ vowel' },
  0x05B6: { nameEn: 'Segol', nameHe: 'סְגוֹל', type: 'vowel', description: 'Short /e/ vowel' },
  0x05B7: { nameEn: 'Patah', nameHe: 'פַּתַּח', type: 'vowel', description: 'Short /a/ vowel' },
  0x05B8: { nameEn: 'Qamats (Gadol / Qatan)', nameHe: 'קָמָץ', type: 'vowel', description: 'Broad /a/ (gadol) or short closed /o/ (qatan)' },
  0x05B9: { nameEn: 'Holam', nameHe: 'חֹלָם', type: 'vowel', description: 'Long /o/ vowel' },
  0x05BA: { nameEn: 'Holam Haser', nameHe: 'חֹלָם חָסֵר', type: 'vowel', description: 'Defective holam without mater lectionis vav' },
  0x05BB: { nameEn: 'Qubuts', nameHe: 'קֻבּוּץ', type: 'vowel', description: 'Short /u/ vowel' },
  0x05C7: { nameEn: 'Qamats Qatan', nameHe: 'קָמָץ קָטָן', type: 'vowel', description: 'Explicit short /o/ phoneme notation' },

  // Diacritic Modifiers & Punctuation
  0x05BC: { nameEn: 'Dagesh / Mappiq / Shuruq', nameHe: 'דָּגֵשׁ / מַפִּיק', type: 'modifier', description: 'Interior point: hardening of Begadkefat, consonant gemination, or consonantal he (mappiq)' },
  0x05BD: { nameEn: 'Meteg / Ga\'ya', nameHe: 'מֶתֶג / גַּעְיָה', type: 'meteg', accentClass: 'euphonic', description: 'Vertical line marking secondary stress, tone prolongation, or preventing slurring' },
  0x05BE: { nameEn: 'Maqaf', nameHe: 'מַקָּף', type: 'punctuation', accentClass: 'structural', description: 'Hebrew hyphen joining words into a single accentual unit' },
  0x05BF: { nameEn: 'Rafe', nameHe: 'רָפֶה', type: 'modifier', description: 'Horizontal bar above soft Begadkefat or silent consonants, extensively preserved in Aleppo Codex' },
  0x05C0: { nameEn: 'Paseq', nameHe: 'פָּסֵק', type: 'punctuation', accentClass: 'disjunctive', description: 'Masoretic vertical dividing stroke enforcing distinct pause between words' },
  0x05C1: { nameEn: 'Shin Dot', nameHe: 'שִׁין יְמָנִית', type: 'modifier', description: 'Diacritic dot placing sound as /sh/' },
  0x05C2: { nameEn: 'Sin Dot', nameHe: 'שִׂין שְׂמָאלִית', type: 'modifier', description: 'Diacritic dot placing sound as /s/' },
  0x05C3: { nameEn: 'Sof Pasuq', nameHe: 'סוֹף פָּסוּק', type: 'punctuation', accentClass: 'structural', description: 'Verse terminal colon mark following Siluq' },
};

// Consonant names
export const HEBREW_CONSONANTS: Record<number, { nameEn: string; nameHe: string }> = {
  0x05D0: { nameEn: 'Alef', nameHe: 'אָלֶף' },
  0x05D1: { nameEn: 'Bet', nameHe: 'בֵּית' },
  0x05D2: { nameEn: 'Gimel', nameHe: 'גִּימֶל' },
  0x05D3: { nameEn: 'Dalet', nameHe: 'דָּלֶת' },
  0x05D4: { nameEn: 'He', nameHe: 'הֵא' },
  0x05D5: { nameEn: 'Vav', nameHe: 'וָו' },
  0x05D6: { nameEn: 'Zayin', nameHe: 'זַיִן' },
  0x05D7: { nameEn: 'Het', nameHe: 'חֵית' },
  0x05D8: { nameEn: 'Tet', nameHe: 'טֵית' },
  0x05D9: { nameEn: 'Yod', nameHe: 'יוֹד' },
  0x05DA: { nameEn: 'Final Kaf', nameHe: 'כַּף סוֹפִית' },
  0x05DB: { nameEn: 'Kaf', nameHe: 'כַּף' },
  0x05DC: { nameEn: 'Lamed', nameHe: 'לָמֶד' },
  0x05DD: { nameEn: 'Final Mem', nameHe: 'מֵם סוֹפִית' },
  0x05DE: { nameEn: 'Mem', nameHe: 'מֵם' },
  0x05DF: { nameEn: 'Final Nun', nameHe: 'נוּן סוֹפִית' },
  0x05E0: { nameEn: 'Nun', nameHe: 'נוּן' },
  0x05E1: { nameEn: 'Samekh', nameHe: 'סָמֶךְ' },
  0x05E2: { nameEn: 'Ayin', nameHe: 'עַיִן' },
  0x05E3: { nameEn: 'Final Pe', nameHe: 'פֵּא סוֹפִית' },
  0x05E4: { nameEn: 'Pe', nameHe: 'פֵּא' },
  0x05E5: { nameEn: 'Final Tsadi', nameHe: 'צָדֵי סוֹפִית' },
  0x05E6: { nameEn: 'Tsadi', nameHe: 'צָדֵי' },
  0x05E7: { nameEn: 'Qof', nameHe: 'קוֹף' },
  0x05E8: { nameEn: 'Resh', nameHe: 'רֵישׁ' },
  0x05E9: { nameEn: 'Shin / Sin', nameHe: 'שִׁין' },
  0x05EA: { nameEn: 'Tav', nameHe: 'תָּו' },
};

/**
 * Decompose a single Hebrew word into its atomic unicode graphemes and categorize them.
 */
export function decomposeHebrewWord(rawWord: string): DecomposedWord {
  const chars: DecomposedChar[] = [];
  let consonantsOnly = '';

  for (let i = 0; i < rawWord.length; i++) {
    const char = rawWord[i];
    const code = char.charCodeAt(0);
    const codePoint = `U+${code.toString(16).toUpperCase().padStart(4, '0')}`;

    if (HEBREW_CONSONANTS[code]) {
      consonantsOnly += char;
      chars.push({
        char,
        type: 'consonant',
        codePoint,
        nameEn: HEBREW_CONSONANTS[code].nameEn,
        nameHe: HEBREW_CONSONANTS[code].nameHe,
        category: 'Consonant (אות)',
      });
    } else if (HEBREW_UNICODE_MAP[code]) {
      const meta = HEBREW_UNICODE_MAP[code];
      chars.push({
        char,
        type: meta.type,
        codePoint,
        nameEn: meta.nameEn,
        nameHe: meta.nameHe,
        category: meta.type === 'vowel' ? 'Vocalization (ניקוד)' :
                  meta.type === 'accent' ? 'Cantillation (טעמים)' :
                  meta.type === 'meteg' ? 'Meteg / Ga\'ya (מתג)' :
                  meta.type === 'modifier' ? 'Diacritic / Rafe (דגש/רפה)' : 'Punctuation (פיסוק)',
        accentClass: meta.accentClass,
      });
    } else {
      // General punctuation or unmapped
      chars.push({
        char,
        type: 'punctuation',
        codePoint,
        nameEn: char === ' ' ? 'Space' : `Char (${char})`,
        nameHe: '',
        category: 'Punctuation',
      });
    }
  }

  const hasMeteg = chars.some(c => c.type === 'meteg');
  const hasPaseq = chars.some(c => c.codePoint === 'U+05C0');
  const accents = chars.filter(c => c.type === 'accent');
  const vowels = chars.filter(c => c.type === 'vowel');
  const modifiers = chars.filter(c => c.type === 'modifier');

  return {
    raw: rawWord,
    consonantsOnly,
    chars,
    hasMeteg,
    hasPaseq,
    accents,
    vowels,
    modifiers,
  };
}

/**
 * Strip all niqqud and te'amim, retaining only consonants and spaces/maqaf
 */
export function stripToConsonants(text: string): string {
  return text.replace(/[\u0591-\u05C7]/g, '');
}

/**
 * Strip only cantillation accents, retaining vowels and dagesh
 */
export function stripAccents(text: string): string {
  return text.replace(/[\u0591-\u05AF\u05BD]/g, '');
}

/**
 * Normalizes Hebrew text for visual matching (ignoring minor unicode ordering differences)
 */
export function normalizeHebrewText(text: string): string {
  // Normalize Unicode canonical decomposition/composition
  return text.normalize('NFC').trim();
}

export interface DetailedDiff {
  type: DiscrepancyCategory;
  description: string;
  ginsburgChar?: DecomposedChar;
  aleppoChar?: DecomposedChar;
  context: string;
}

/**
 * Compare two Hebrew words and identify exact diacritic discrepancies
 */
export function compareHebrewWords(wordGinsburg: string, wordAleppo: string): {
  isIdentical: boolean;
  consonantsMatch: boolean;
  vowelsMatch: boolean;
  accentsMatch: boolean;
  metegMatch: boolean;
  diffs: DetailedDiff[];
} {
  const decG = decomposeHebrewWord(wordGinsburg);
  const decA = decomposeHebrewWord(wordAleppo);

  const isIdentical = normalizeHebrewText(wordGinsburg) === normalizeHebrewText(wordAleppo);
  const consonantsMatch = decG.consonantsOnly === decA.consonantsOnly;

  const diffs: DetailedDiff[] = [];

  // Check Consonant / Orthography differences
  if (!consonantsMatch) {
    diffs.push({
      type: 'orthography',
      description: `Consonantal variation (Plene/Defective or Qere/Ketiv): Ginsburg reads "${decG.consonantsOnly}" vs. Aleppo "${decA.consonantsOnly}"`,
      context: 'Consonantal skeleton (אותיות)',
    });
  }

  // Check Meteg / Ga'ya
  if (decG.hasMeteg !== decA.hasMeteg) {
    diffs.push({
      type: 'meteg_gaya',
      description: decA.hasMeteg 
        ? `Aleppo Codex preserves Ga'ya (Meteg ֽ) marking secondary stress or vowel quantity, omitted in Ginsburg's text`
        : `Ginsburg marks Meteg (ֽ) not present in the Ben Asher Aleppo Codex`,
      context: 'Meteg / Ga\'ya system',
    });
  }

  // Check Paseq
  if (decG.hasPaseq !== decA.hasPaseq) {
    diffs.push({
      type: 'paseq',
      description: decA.hasPaseq
        ? `Aleppo Codex contains Paseq (׀) separating words, omitted in Ginsburg`
        : `Ginsburg contains Paseq (׀) absent from Aleppo Codex`,
      context: 'Paseq dividing stroke',
    });
  }

  // Check Cantillation Accents (Te'amim)
  const gAccentCodes = decG.accents.map(a => a.codePoint).sort().join(',');
  const aAccentCodes = decA.accents.map(a => a.codePoint).sort().join(',');
  const accentsMatch = gAccentCodes === aAccentCodes;

  if (!accentsMatch) {
    const gNames = decG.accents.map(a => a.nameEn).join(', ') || 'None';
    const aNames = decA.accents.map(a => a.nameEn).join(', ') || 'None';
    diffs.push({
      type: 'cantillation',
      description: `Accent difference: Ginsburg has [${gNames}] vs. Aleppo Ben Asher [${aNames}]`,
      context: 'Cantillation / Te\'amim',
    });
  }

  // Check Vowels (Niqqud)
  const gVowelCodes = decG.vowels.map(v => v.codePoint).sort().join(',');
  const aVowelCodes = decA.vowels.map(v => v.codePoint).sort().join(',');
  const vowelsMatch = gVowelCodes === aVowelCodes;

  if (!vowelsMatch) {
    const gVNames = decG.vowels.map(v => v.nameEn).join(', ') || 'None';
    const aVNames = decA.vowels.map(v => v.nameEn).join(', ') || 'None';
    diffs.push({
      type: 'vocalization',
      description: `Vocalization nuance: Ginsburg points with [${gVNames}] vs. Aleppo [${aVNames}]`,
      context: 'Vowels / Niqqud',
    });
  }

  // Check Dagesh / Rafe
  const gMods = decG.modifiers.map(m => m.nameEn).join(',');
  const aMods = decA.modifiers.map(m => m.nameEn).join(',');
  if (gMods !== aMods) {
    diffs.push({
      type: 'dagesh_rafe',
      description: `Dagesh / Rafe marking: Ginsburg [${gMods || 'None'}] vs. Aleppo [${aMods || 'None'}]`,
      context: 'Dagesh / Rafe / Mappiq',
    });
  }

  const metegMatch = decG.hasMeteg === decA.hasMeteg;

  return {
    isIdentical,
    consonantsMatch,
    vowelsMatch,
    accentsMatch,
    metegMatch,
    diffs,
  };
}

/**
 * Tokenize verse into individual Hebrew words with punctuation
 */
export function tokenizeHebrewVerse(verseText: string): string[] {
  // Split on spaces while respecting maqaf as part of hyphenated word compounds or splitting them cleanly
  return verseText.trim().split(/\s+/).filter(Boolean);
}
