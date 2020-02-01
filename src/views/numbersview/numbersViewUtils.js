export const getParSutta = (firstParSegmentNr, lastParSegmentNr) => {
  let parSutta = firstParSegmentNr ? firstParSegmentNr.split(':') : [];
  if (lastParSegmentNr && lastParSegmentNr !== firstParSegmentNr) {
    let parallelArray = lastParSegmentNr.split(':');
    parSutta[parSutta.length - 1] =
      parSutta[parSutta.length - 1] +
      `–${parallelArray[parallelArray.length - 1]}`;
  }
  return parSutta;
};

export const getParCollectionNumber = parSutta =>
  parSutta[0] &&
  (parSutta[0].match(/pli-tv-b[ui]-vb/) ||
    parSutta[0].match(/[A-Z]+[0-9]+/) ||
    parSutta[0].match(/XX/) ||
    parSutta[0].match(/OT/) ||
    parSutta[0].match(/[a-z-]+/));
