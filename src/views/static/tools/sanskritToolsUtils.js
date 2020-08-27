import { html } from 'lit-element';

const SanskritTaggerOrder = [
  'PPP',
  'NC',
  'CADP',
  'CAD',
  'CCD',
  'CCM',
  'CEM',
  'CGDA',
  'CGDI',
  'CNG',
  'CQT',
  'CSB',
  'CX',
  'JJ',
  'JQ',
  'KDG',
  'KDP',
  'NUM',
  'PPR',
  'PPX',
  'PRC',
  'PRD',
  'PRI',
  'PRL',
  'PRQ',
  'Gen,',
  'Nom',
  'Abl',
  'Dat',
  'Ins',
  'Loc',
  'Voc',
  'Acc',
  'Sing',
  'Masc',
  'Fem',
  'Neut',
  'V ',
  'Cpd',
  '1',
  '2',
  '3',
];
const SanskritTaggerReplacements = {
  PPP: 'past passive participle (ppp) ',
  NC: 'common noun ',
  CADP: 'preverb ',
  CAD: 'adverb ',
  CCD: 'coordinating conjunction ',
  CCM: 'particle for comparison ',
  CEM: 'emphatic particle ',
  CGDA: 'absolutive ',
  CGDI: 'infinitive ',
  CNG: 'negation ',
  CQT: 'quotation particle ',
  CSB: 'subordinating conjunction ',
  CX: 'adverb/indeclinable ',
  JJ: 'adjective ',
  JQ: 'quantifying adjective ',
  KDG: 'gerundive ',
  KDP: 'participle ',
  NUM: 'number ',
  PPR: 'personal pronoun ',
  PPX: 'other word inflected like a pronoun ',
  PRC: 'reciprocal pronoun ',
  PRD: 'demonstrative pronoun ',
  PRI: 'indefinite pronoun ',
  PRL: 'relative pronoun ',
  PRQ: 'interrogative pronoun ',
  'Gen,': 'genitive, ',
  Nom: 'nominative ',
  Abl: 'ablative ',
  Dat: 'dative ',
  Ins: 'instrumental ',
  Loc: 'locative ',
  Voc: 'vocative ',
  Acc: 'accusative ',
  Sing: 'singular',
  Masc: 'masculine',
  Fem: 'feminine',
  Neut: 'neuter',
  'V ': 'finite verb ',
  Cpd: 'compound ',
  '1': 'singular',
  '2': 'dual',
  '3': 'plural',
};

export function preprocessTaggedString(taggedString) {
  taggedString = taggedString.replace(/\|/g, ', ');
  SanskritTaggerOrder.forEach(result => {
    while (taggedString.includes(result)) {
      taggedString = taggedString.replace(
        result,
        SanskritTaggerReplacements[result]
      );
    }
  });

  const entries = taggedString.split(' # ');
  return entries.map(entry => {
    let entry_items = entry.split(' ');
    entry = html`
      <strong>${entry_items[0]}</strong> ${entry_items
        .slice(1)
        .join(' ')
        .toLowerCase()}
    `;
    return html`
      ${entry}<br />
    `;
  });
}
