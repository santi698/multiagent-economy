function mulberry32(a) {
  return () => {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function xfnv1a(k) {
  for (var i = 0, h = 2166136261 >>> 0; i < k.length; i++)
    h = Math.imul(h ^ k.charCodeAt(i), 16777619);
  return () => {
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    return (h += h << 5) >>> 0;
  };
}

module.exports = () => {
  const seed = Math.round(Math.random() * 5000);
  console.log(`Randomizing with seed ${seed}`);
  return mulberry32(xfnv1a(seed)());
};
