//Given an object listing demographics and the items they have, return the amount of unique objects found in that demographic as compared to all demographics.

imageObject = {
  Children: ['socks', 'sneakers', 'flops'],
  Adults: ['socks', 'sandals', 'crocs'],
  Seniors: ['socks', 'sneakers']
}

output = {
  Children: 1,
  Adults: 2,
  Seniors: 0
}


isDemoUnique = (imageObject) => {
  let output = {};
  let demographics = Object.keys(imageObject); // array of keys ['children','adults','seniors']
  for (i = 0; i < demographics.length; i++) {
    let counter = 0;
    for (j=0; j < Object.values(demographics[i]); j++) { // searches through keys
      for (k = 0; k < demographics.length; k++) { // searches through values
        for (l=0; l < Object.values(demographics[k]); l++) { // searches through keys again while holding value k
          if (Object.values(demographics[j]) === (demographics[l])) { // searches through values again while holding value k
            break;
          }
        }
      }
    }
    // do some return like output[demographics[i]] = counter to add new properties to output object
  }
  return output;
};


