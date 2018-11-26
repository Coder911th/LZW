/**
 * @param {String} text кодируемая строка
 * @param {Array}  dict массив символов алфавита
 */
function encode(text, dict) {
  let w, k, textLength = text.length, res = [];

  if (!textLength)
    return res;
  
  w = text[0];

  for (let i = 1; i < textLength; i++) {
    k = text[i];
    let wk = w + k;
    let pos = dict.indexOf(wk);
    if (pos > -1) {
      w = wk;
    } else {
      res.push(dict.indexOf(w));
      dict.push(wk);
      w = k;
    }
  }

  res.push(dict.indexOf(w));
  return res;
}

/**
 * 
 * @param {Array} codes массив кодов
 * @param {Array} dict  словарь символов
 */
function decode(codes, dict) {
  if (!codes.length) {
    return '';
  }

  let w = codes[0], 
    res = '', 
    s = w,
    codesLength = codes.length,
    t, k;

  res += dict[w];
  for (let i = 1; i < codesLength; i++) {
    w = codes[i];
    let sym = dict[w];
    if (sym) {
      res += sym;
      t = dict[s];
      k = sym[0];
      dict.push(t + k);
    } else {
      t = dict[s];
      k = t[0];
      res += t + k;
      dict.push(t + k)
    }
    s = w;
  }

  return res;
}

export default {
  encode, decode
}