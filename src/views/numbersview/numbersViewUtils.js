export const getParCollectionNumber = parSutta =>
  parSutta[0] &&
  (parSutta[0].match(/pli-tv-b[ui]-vb/) ||
    parSutta[0].match(/[A-Z]+[0-9]+/) ||
    parSutta[0].match(/XX/) ||
    parSutta[0].match(/OT/) ||
    parSutta[0].match(/NY/) ||
    parSutta[0].match(/[a-z-]+/));
