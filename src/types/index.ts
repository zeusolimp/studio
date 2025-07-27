
export type LocalizedString = {
    pt: string;
    es: string;
    en: string;
    fr: string;
};

export type FeatureItem = {
  id: string;
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
};

export type HeroSectionData = {
  id: 'hero';
  type: 'hero';
  headline: LocalizedString;
  subtext: LocalizedString;
  cta_button_text: LocalizedString;
  image_url: string;
};

export type FeaturesSectionData = {
  id: 'features';
  type: 'features';
  title: LocalizedString;
  subtext: LocalizedString;
  items: FeatureItem[];
};

export type FeaturedArticleSectionData = {
    id: 'featured-article';
    type: 'featured-article';
    title: LocalizedString;
    subtitle: LocalizedString;
    text: LocalizedString;
    image_url: string;
    button_text: LocalizedString;
    button_link: string;
};

export type AboutUsSectionData = {
  id: 'about';
  type: 'about';
  title: LocalizedString;
  paragraph1: LocalizedString;
  paragraph2: LocalizedString;
  image_url: string;
  button_text?: LocalizedString;
  button_link?: string;
};

export type CtaSectionData = {
  id: 'cta';
  type: 'cta';
  title: LocalizedString;
  subtext: LocalizedString;
  button_text: LocalizedString;
};

export type FooterLink = {
  id: string;
  text: LocalizedString;
  url: string;
};

export type SocialLink = {
  id: string;
  platform: 'Facebook' | 'Instagram' | 'Linkedin';
  url: string;
};

export type FooterSectionData = {
    id: 'footer';
    type: 'footer';
    brand_description: LocalizedString;
    social_links: SocialLink[];
    legal_links: FooterLink[];
    copyright_text: LocalizedString;
}

export type Section = HeroSectionData | FeaturesSectionData | AboutUsSectionData | CtaSectionData | FeaturedArticleSectionData | FooterSectionData;

export type LandingContent = {
  sections: Section[];
};


// Settings Types
export type ContactInfo = {
    email: string;
    phone: string;
    address: string;
};

export type ThemeColors = {
    background: string;
    foreground: string;
    accent: string;
};

export type SiteSettings = {
    logo_url: string;
    contact: ContactInfo;
    theme: {
        light: ThemeColors;
        dark: ThemeColors;
    };
};

export type Locale = 'pt' | 'es' | 'en' | 'fr';

