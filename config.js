const config = {
  port: 80,
  userfields: {
    name: true,
    email: true,
    avatar: true
  },
  persons: [
    { id: 'spoons', name: 'Ложки', avatar: 'spoons.png' },
    { id: 'balalaika', name: 'Балалайка', avatar: 'balalaika.png' },
    { id: 'ratchet', name: 'Трещотка', avatar: 'ratchet.png' },
    { id: 'accordion', name: 'Аккордеон', avatar: 'accordion.png' },
    { id: 'tambourine', name: 'Бубен', avatar: 'tambourine.png' },
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}
