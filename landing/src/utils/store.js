// localStorage helper

const NS = "rimt";

export const store = {
  get: (k, f = null) => {
    try {
      const r = localStorage.getItem(NS + ":" + k);
      return r ? JSON.parse(r) : f;
    } catch {
      return f;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(NS + ":" + k, JSON.stringify(v));
    } catch {}
  },
  rem: (k) => {
    try {
      localStorage.removeItem(NS + ":" + k);
    } catch {}
  },
};

