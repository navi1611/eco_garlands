export interface ApplicationItem {
  title: string;
  tagline: string;
  description: string;
  icon: string;
  href: string;
}

export const APPLICATION_LIST: ApplicationItem[] = [
  {
    title: 'Weddings',
    tagline: 'Ceremonial & Matrimonial Vows',
    description:
      'Worn during the auspicious varmala exchange, creating fragrant and timeless photo memories.',
    icon: '💍',
    href: '/products?category=Weddings',
  },
  {
    title: 'Religious Ceremonies',
    tagline: 'Temple Sanctums & Rituals',
    description:
      'Custom woven for deity alankaram, homams, and sanctum installations with sacred adherence.',
    icon: '🪔',
    href: '/products?category=Religious+%26+Spiritual',
  },
  {
    title: 'Festivals',
    tagline: 'Cultural & Seasonal Joy',
    description:
      'Adorning festival stages and community celebrations during Diwali, Pongal, and festive seasons.',
    icon: '✨',
    href: '/products?category=Festivals+%26+Cultural',
  },
  {
    title: 'Home Decoration',
    tagline: 'Organic Living Spaces',
    description:
      'Entryway portals and wall hangings imparting natural botanical character and natural scent.',
    icon: '🏡',
    href: '/products?category=Home+%26+Interior',
  },
  {
    title: 'Prayer Spaces',
    tagline: 'Serene Pooja Altars',
    description:
      'Framing meditation niches and home pooja mandirs with serene, enduring spice weaves.',
    icon: '🌸',
    href: '/products?category=Home+%26+Interior',
  },
  {
    title: 'Events & Conclaves',
    tagline: 'Cultural Summits & Celebrations',
    description:
      'Elevating inaugural ceremonies, auspicious lamp-lighting events, and traditional stage decor.',
    icon: '🏛️',
    href: '/products?category=Hospitality',
  },
  {
    title: 'Hospitality',
    tagline: 'Resorts & VIP Receptions',
    description:
      'Welcoming guests and dignitaries with authentic Indian graciousness and botanical splendor.',
    icon: '🌿',
    href: '/products?category=Hospitality',
  },
  {
    title: 'Gifting',
    tagline: 'Heirloom Tokens & Keepsakes',
    description:
      'Presented in bespoke export-ready presentation boxes for celebratory personal or corporate tokens.',
    icon: '🎁',
    href: '/products?category=Gifting',
  },
  {
    title: 'Cultural Celebrations',
    tagline: 'Global Diaspora Traditions',
    description:
      'Bringing authentic regional craftsmanship to diaspora communities and heritage festivals worldwide.',
    icon: '🌏',
    href: '/products',
  },
];
