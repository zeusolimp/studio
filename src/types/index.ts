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
  items: FeatureItem[];
};

export type CtaSectionData = {
  id: 'cta';
  type: 'cta';
  title: string;
  subtext: string;
  button_text: string;
};

export type Section = HeroSectionData | FeaturesSectionData | CtaSectionData;

export type LandingContent = {
  sections: Section[];
};
