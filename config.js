const config = {
  port: 80,
  userfields: {
    name: true,
    email: true,
    avatar: true
  },
  persons: [
    { id: 'accordion', name: 'Гармошка', avatar: 'garmoshka.png' },
    { id: 'ratchet', name: 'Трещотки', avatar: 'treshetki.png' },
    { id: 'spoons', name: 'Ложки', avatar: 'loshki.png' },
    { id: 'tambourine', name: 'Бубен', avatar: 'buben.png' },
    { id: 'balalaika', name: 'Балалайка', avatar: 'balalaika.png' },
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}
