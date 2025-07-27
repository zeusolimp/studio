
export type FeatureItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type HeroSectionData = {
  id: 'hero';
  type: 'hero';
  headline: string;
  subtext: string;
  cta_button_text: string;
  image_url: string;
};

export type FeaturesSectionData = {
  id: 'features';
  type: 'features';
  title: string;
  subtext: string;
  items: FeatureItem[];
};

export type FeaturedArticleSectionData = {
    id: 'featured-article';
    type: 'featured-article';
    title: string;
    subtitle: string;
    text: string;
    image_url: string;
    button_text: string;
    button_link: string;
};

export type AboutUsSectionData = {
  id: 'about';
  type: 'about';
  title: string;
  paragraph1: string;
  paragraph2: string;
  image_url: string;
  button_text?: string;
  button_link?: string;
};

export type CtaSectionData = {
  id: 'cta';
  type: 'cta';
  title: string;
  subtext: string;
  button_text: string;
};

export type FooterLink = {
  id: string;
  text: string;
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
    brand_description: string;
    social_links: SocialLink[];
    legal_links: FooterLink[];
    copyright_text: string;
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
