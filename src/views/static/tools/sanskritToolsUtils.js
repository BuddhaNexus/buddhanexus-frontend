import { html } from 'lit-element';

export function     preprocessTaggedString(taggedString){
	taggedString = taggedString.replace(/\|/g,", ");
	taggedString = taggedString.replace(/PPP/g,"past passive participle (PPP) ");
	taggedString = taggedString.replace(/NC/g,"common noun ");
	taggedString = taggedString.replace(/CADP/g,"preverb ");
	taggedString = taggedString.replace(/CAD/g,"adverb ");
	taggedString = taggedString.replace(/CCD/g,"coordinating conjunction ");
	taggedString = taggedString.replace(/CCM/g,"particle for comparison ");
	taggedString = taggedString.replace(/CEM/g,"emphatic particle ");
	taggedString = taggedString.replace(/CGDA/g,"absolutive ");
	taggedString = taggedString.replace(/CGDI/g,"infinitive ");
	taggedString = taggedString.replace(/CNG/g,"negation ");
	taggedString = taggedString.replace(/CQT/g,"quotation particle ");
	taggedString = taggedString.replace(/CSB/g,"subordinating conjunction ");
	taggedString = taggedString.replace(/CX/g,"adverb/indeclinable ");
	taggedString = taggedString.replace(/JJ/g,"adjective ");
	taggedString = taggedString.replace(/JQ/g,"quantifying adjective ");
	taggedString = taggedString.replace(/KDG/g,"gerundive ");
	taggedString = taggedString.replace(/KDP/g,"participle ");
	taggedString = taggedString.replace(/NUM/g,"number ");
	taggedString = taggedString.replace(/PPR/g,"personal pronoun ");
	taggedString = taggedString.replace(/PPX/g,"other word inflected like a pronoun ");
	taggedString = taggedString.replace(/PRC/g,"reciprocal pronoun ");
	taggedString = taggedString.replace(/PRD/g,"demonstrative pronoun ");
	taggedString = taggedString.replace(/PRI/g,"indefinite pronoun ");
	taggedString = taggedString.replace(/PRL/g,"relative pronoun ");
	taggedString = taggedString.replace(/PRQ/g,"interrogative pronoun ");
	taggedString = taggedString.replace(/Gen,/g,"genitive, ");
	taggedString = taggedString.replace(/Nom/g,"nominative ");
	taggedString = taggedString.replace(/Abl/g,"ablative ");
	taggedString = taggedString.replace(/Dat/g,"dative ");
	taggedString = taggedString.replace(/Ins/g,"instrumental ");
	taggedString = taggedString.replace(/Loc/g,"locative ");
	taggedString = taggedString.replace(/Voc/g,"vocative ");
	taggedString = taggedString.replace(/Acc/g,"accusative ");
	taggedString = taggedString.replace(/Sing/g,"singular");
	taggedString = taggedString.replace(/Masc/g,"masculine");
	taggedString = taggedString.replace(/Fem/g,"feminine");
	taggedString = taggedString.replace(/Neut/g,"neuter");							   
	taggedString = taggedString.replace(/V /g,"finite verb ");
	taggedString = taggedString.replace(/Cpd/g,"compound ");
	taggedString = taggedString.replace(/1/g,"singular");
	taggedString = taggedString.replace(/2/g,"dual");
	taggedString = taggedString.replace(/3/g,"plural");
	const entries = taggedString.split(' # ')
	return entries.map(entry => {
	    let entry_items = entry.split(' ')
	    entry = html`<b>${entry_items[0]}</b> ${entry_items.slice(1).join(' ').toLowerCase()}`
	    return html`${entry}<br/>`;
	});
    }
