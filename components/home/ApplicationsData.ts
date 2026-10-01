import {
  ConciergeBell,
  Flame,
  Flower2,
  Gem,
  Gift,
  Globe2,
  Home,
  Landmark,
  PartyPopper,
  type LucideIcon,
} from 'lucide-react';

export interface ApplicationItem {
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export const APPLICATION_LIST: ApplicationItem[] = [
  {
    title: 'Weddings',
    tagline: 'Ceremonial & Matrimonial Vows',
    description:
      'Worn during the auspicious varmala exchange, creating fragrant and timeless photo memories.',
    icon: Gem,
    href: '/products?category=Weddings',
  },
  {
    title: 'Religious Ceremonies',
    tagline: 'Temple Sanctums & Rituals',
    description:
      'Custom woven for deity alankaram, homams, and sanctum installations with sacred adherence.',
    icon: Flame,
    href: '/products?category=Religious+%26+Spiritual',
  },
  {
    title: 'Festivals',
    tagline: 'Cultural & Seasonal Joy',
    description:
      'Adorning festival stages and community celebrations during Diwali, Pongal, and festive seasons.',
    icon: PartyPopper,
    href: '/products?category=Festivals+%26+Cultural',
  },
  {
    title: 'Home Decoration',
    tagline: 'Organic Living Spaces',
    description:
      'Entryway portals and wall hangings imparting natural botanical character and natural scent.',
    icon: Home,
    href: '/products?category=Home+%26+Interior',
  },
  {
    title: 'Prayer Spaces',
    tagline: 'Serene Pooja Altars',
    description:
      'Framing meditation niches and home pooja mandirs with serene, enduring spice weaves.',
    icon: Flower2,
    href: '/products?category=Home+%26+Interior',
  },
  {
    title: 'Events & Conclaves',
    tagline: 'Cultural Summits & Celebrations',
    description:
      'Elevating inaugural ceremonies, auspicious lamp-lighting events, and traditional stage decor.',
    icon: Landmark,
    href: '/products?category=Hospitality',
  },
  {
    title: 'Hospitality',
    tagline: 'Resorts & VIP Receptions',
    description:
      'Welcoming guests and dignitaries with authentic Indian graciousness and botanical splendor.',
    icon: ConciergeBell,
    href: '/products?category=Hospitality',
  },
  {
    title: 'Gifting',
    tagline: 'Heirloom Tokens & Keepsakes',
    description:
      'Presented in bespoke export-ready presentation boxes for celebratory personal or corporate tokens.',
    icon: Gift,
    href: '/products?category=Gifting',
  },
  {
    title: 'Cultural Celebrations',
    tagline: 'Global Diaspora Traditions',
    description:
      'Bringing authentic regional craftsmanship to diaspora communities and heritage festivals worldwide.',
    icon: Globe2,
    href: '/products',
  },
];
