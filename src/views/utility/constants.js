export const LANGUAGE_CODES = {
  PALI: 'pli',
  TIBETAN: 'tib',
  CHINESE: 'chn',
  SANSKRIT: 'skt',
  MULTILING: 'multi',
};

export const MIN_LENGTHS = {
  PALI: 30,
  TIBETAN: 7,
  CHINESE: 5,
  SANSKRIT: 25,
  MULTILING: 5,
};

export const DEFAULT_LENGTHS = {
  PALI: 40,
  TIBETAN: 14,
  CHINESE: 7,
  SANSKRIT: 35,
  MULTILING: 10,
};

export const LANGUAGE_NAMES = {
  PALI: 'Pāḷi',
  TIBETAN: 'Tibetan',
  CHINESE: 'Chinese',
  SANSKRIT: 'Sanskrit',
  MULTILING: 'Multilingual',
};

export const DEFAULT_SCORES = {
  PALI: 30,
  TIBETAN: 30,
  CHINESE: 30,
  SANSKRIT: 30,
  MULTILING: 55,
};

export const SOURCE_BUTTONS = {
  GRETIL: [
    '../../src/assets/icons/gretil_logo.png',
    'Click to go to the original file in GRETIL (includes full header information).',
  ],
  DSBC: [
    '../../src/assets/icons/dsbc_logo.png',
    'Click to go to the original file in the Digital Sanskrit Buddhist Canon (includes full header information).',
  ],
  VRI: [
    '../../src/assets/icons/vri_logo.gif',
    'Click to go to the original text in Vipassana Research Institute.',
  ],
  SC: [
    '../../src/assets/icons/sc_logo.png',
    'Click to go to the original text(s) in SuttaCentral (includes translations and parallels).',
  ],
  BDRC: [
    '../../src/assets/icons/bdrc_logo.png',
    'Click to visit the file in the Buddhist Digital Resource Center.',
  ],
  RKTS: [
    '../../src/assets/icons/rkts_logo.png',
    'Click to visit the file at Resources for Kanjur & Tanjur Studies.',
  ],
  CBETA: [
    '../../src/assets/icons/cbeta_logo.png',
    'Click to go to the original file in CBETA (NEW SITE) (includes additional information).',
  ],
  CBC: [
    '',
    'Click to go to Chinese Buddhist Canonical Attributions database listing (includes information about ascriptions).',
  ],
};

export const NOENGLISHTRANSLATION =
  '^(atk|tik|any|[bkpv]v|th[ai]-|cp|[yj]a|[cm]nd|[dp][psa]|[np]e|mil|pli-tv-p|vb|dt|snp|pli-tv-b[ui]-p)';
