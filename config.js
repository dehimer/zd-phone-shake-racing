const config = {
  port: 80,
  userfields: {
    name: true,
    email: true,
    avatar: true
  },
  persons: [
    { id: 'spoons', name: 'Ложки', avatar: 'loshki.png' },
    { id: 'balalaika', name: 'Балалайка', avatar: 'balalaika.png' },
    { id: 'ratchet', name: 'Трещотка', avatar: 'treshetki.png' },
    { id: 'accordion', name: 'Аккордеон', avatar: 'garmoshka.png' },
    { id: 'tambourine', name: 'Бубен', avatar: 'buben.png' },
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}
