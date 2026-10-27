/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AccentRule {
  nameEn: string;
  nameHe: string;
  rank: 'Emperor (קיסר)' | 'King (מלך)' | 'Duke (משנה)' | 'Count (שליש)' | 'Servant (משרת)';
  symbol: string;
  codePoint: string;
  isDisjunctive: boolean;
  function: string;
  aleppoVsGinsburgNote: string;
}

export const MASORETIC_ACCENT_SYSTEM: AccentRule[] = [
  {
    nameEn: 'Siluq & Sof Pasuq',
    nameHe: 'סִלּוּק וְסוֹף פָּסוּק',
    rank: 'Emperor (קיסר)',
    symbol: 'ֽ ׃',
    codePoint: 'U+05BD / U+05C3',
    isDisjunctive: true,
    function: 'Ultimate pause terminating every biblical verse; accompanied by Sof Pasuq colon.',
    aleppoVsGinsburgNote: 'Universal concordance between Aleppo and Ginsburg, though secondary meteg preceding siluq varies.'
  },
  {
    nameEn: 'Etnahta / Atnah',
    nameHe: 'אֶתְנַחְתָּא',
    rank: 'Emperor (קיסר)',
    symbol: '֑',
    codePoint: 'U+0591',
    isDisjunctive: true,
    function: 'Major mid-verse disjunctive dividing the verse into two equal or logical hemistichs.',
    aleppoVsGinsburgNote: 'Very high agreement in major verse division, but occasional differences in the preceding servant sequence (Munach vs Merkha).'
  },
  {
    nameEn: 'Zaqef Qaton',
    nameHe: 'זָקֵף קָטֹן',
    rank: 'King (מלך)',
    symbol: '֔',
    codePoint: 'U+0594',
    isDisjunctive: true,
    function: 'Principal king accent marking major internal clause subdivisions within either hemistich.',
    aleppoVsGinsburgNote: 'Frequently substituted in Ginsburg by Pashta or Segolta based on late Ashkenazi MSS consensus.'
  },
  {
    nameEn: 'Tifcha / Tarcha',
    nameHe: 'טִפְחָא',
    rank: 'King (מלך)',
    symbol: '֖',
    codePoint: 'U+0596',
    isDisjunctive: true,
    function: 'Essential herald immediately preceding Siluq and Etnahta.',
    aleppoVsGinsburgNote: 'Aleppo rigorously insists on Tifcha before all major pauses; European printings occasionally elided it.'
  },
  {
    nameEn: 'Segolta',
    nameHe: 'סְגוֹלְתָּא',
    rank: 'King (מלך)',
    symbol: '֒',
    codePoint: 'U+0592',
    isDisjunctive: true,
    function: 'Postpositive king accent governing the opening of long compound verses.',
    aleppoVsGinsburgNote: 'Aleppo pairs Segolta strictly with antecedent Zarqa; Ginsburg variants show occasional Revia substitutions.'
  },
  {
    nameEn: 'Revia',
    nameHe: 'רְבִיעַ',
    rank: 'Duke (משנה)',
    symbol: '֗',
    codePoint: 'U+0597',
    isDisjunctive: true,
    function: 'Third-order disjunctive dot above the accented syllable.',
    aleppoVsGinsburgNote: 'Aleppo preserves Ga\'ya on the pre-accentual syllable before Revia, which Ginsburg often drops.'
  },
  {
    nameEn: 'Pashta',
    nameHe: 'פַּשְׁטָא',
    rank: 'Duke (משנה)',
    symbol: '֙',
    codePoint: 'U+0599',
    isDisjunctive: true,
    function: 'Postpositive accent marking minor disjunction, doubled on penultimate-stressed words.',
    aleppoVsGinsburgNote: 'Ben Asher doubles the Pashta mark when the word is stressed on the penult (mile\'el); early printed Bibles often omitted the initial stress mark.'
  },
  {
    nameEn: 'Mahpakh',
    nameHe: 'מַהְפָּךְ',
    rank: 'Servant (משרת)',
    symbol: '֤',
    codePoint: 'U+05A4',
    isDisjunctive: false,
    function: 'Conjunctive servant leading directly into Pashta.',
    aleppoVsGinsburgNote: 'Often interchanged with Munach in Ginsburg\'s base editions.'
  },
  {
    nameEn: 'Merkha',
    nameHe: 'מֶרְכָא',
    rank: 'Servant (משרת)',
    symbol: '֥',
    codePoint: 'U+05A5',
    isDisjunctive: false,
    function: 'Ubiquitous conjunctive stroke serving Tifcha and Siluq.',
    aleppoVsGinsburgNote: 'Ginsburg occasionally places Merkha where Aleppo has Darga or Mahpakh.'
  },
  {
    nameEn: 'Darga',
    nameHe: 'דַּרְגָּא',
    rank: 'Servant (משרת)',
    symbol: '֧',
    codePoint: 'U+05A7',
    isDisjunctive: false,
    function: 'Waved conjunctive step serving Tevir.',
    aleppoVsGinsburgNote: 'Aleppo uses Darga with high consistency; Western manuscripts frequently flattened this to Merkha.'
  }
];

export const HISTORICAL_ESSAY = {
  title: 'Christian David Ginsburg vs. The Aleppo Codex: A Century of Masoretic Scholarship',
  subtitle: 'From the Venice Rabbinic Bible (1525) to the Discovery of Ben Asher\'s Autograph',
  sections: [
    {
      heading: '1. The Preservation of the Early Prophets in Keter Aram Tzova',
      content: `The Aleppo Codex (כתר ארם צובה - Keter Aram Tzova), produced circa 930 CE in Tiberias, is universally acknowledged as the supreme codification of the Hebrew Bible. Pointed and vocalized by the greatest Masoretic master, Aaron ben Moses ben Asher, it was famously validated by Maimonides (Rambam) in his Hilkhot Sefer Torah (VIII, 4). While tragic riots in 1947 in Aleppo destroyed roughly a quarter of the manuscript (including most of the Torah from Genesis through Deuteronomy 28), the entire Early Prophets (נביאים ראשונים: Joshua, Judges, 1-2 Samuel, 1-2 Kings) survived completely intact and in pristine physical preservation.`
    },
    {
      heading: '2. C. D. Ginsburg and the 19th-Century Collation Campaign',
      content: `Christian David Ginsburg (1831–1914) spent over four decades laboring on the most comprehensive collation of Hebrew biblical manuscripts ever undertaken in the British Empire. Published by the Trinitarian Bible Society (1894) and posthumously completed by the British and Foreign Bible Society (1908–1926), Ginsburg collated more than 70 ancient and medieval codices in the British Museum (such as Or. 4445, Add. 15250, Add. 15251, Harley 5710). However, because the Aleppo Codex was locked away in the underground crypt of the Central Synagogue in Aleppo, it was inaccessible to Western scholars during Ginsburg's lifetime.`
    },
    {
      heading: '3. Why Ginsburg and Ben Asher Diverge',
      content: `Ginsburg chose as his primary base text the Second Rabbinic Bible edited by Jacob ben Chayyim ibn Adonijah and printed by Daniel Bomberg in Venice in 1524–1525. While monumental for its era, Jacob ben Chayyim worked primarily with late Franco-German and Sephardic manuscripts from the 13th to 15th centuries. In these later European manuscripts:
      
1. The Meteg / Ga'ya System had decayed: The delicate phonetic rules formulated in Ben Asher's Diqduqe ha-Te'amim—distinguishing Ga'ya peshuta, medabberet, and chatafa—were frequently omitted by European scribes and early Renaissance printers to conserve space.
2. The Rafe Bar was discarded: The Aleppo Codex meticulously marks non-dageshed Begadkefat letters and silent letters with a supralinear horizontal Rafe bar (־). Ginsburg documented Rafe variants in his apparatus but omitted them from his standard text.
3. The Paseq (׀) was inconsistently preserved: Late Western scribes often blurred the distinction between the five distinct classes of Masoretic Paseq strokes.
4. Accent Shifts (Nasog Achor): Ben Asher's systematic retraction of stress to prevent accent clashes between consecutive words was frequently ignored in later editions.`
    },
    {
      heading: '4. Scholarly Value of this Comparative Collation',
      content: `Juxtaposing Ginsburg's critical apparatus against the Aleppo Codex allows textual scholars, Hebraists, and cantors to discern between authentic 10th-century Palestinian Tiberian traditions and secondary Renaissance standardizations. Ginsburg's monumental apparatus remains invaluable because it accurately reflects the European manuscript tradition, while the Aleppo Codex provides the unblemished Ben Asher prototype.`
    }
  ]
};
