"use client";

import type { LucideProps } from 'lucide-react';
import { Edit, Image, Move, Rocket, Users, ShieldCheck, PenTool, Code, Wand2, Ticket, User, Mail, Building, Calendar, AppWindow, Link, Palette, PlusCircle, Trash2, Home, Briefcase, Phone, Settings, Facebook, Instagram, Linkedin, MapPin, LayoutDashboard } from 'lucide-react';

export const iconMap = {
  Edit,
  Image,
  Move,
  Rocket,
  Users,
  ShieldCheck,
  PenTool,
  Code,
  Wand2,
  Ticket,
  User,
  Mail,
  Building,
  Calendar,
  AppWindow,
  Link,
  Palette,
  PlusCircle,
  Trash2,
  Home,
  Briefcase,
  Phone,
  Settings,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  LayoutDashboard
};

export type IconName = keyof typeof iconMap;

export const DynamicIcon = ({ name, ...props }: { name: IconName } & LucideProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return <PenTool {...props} />; // Fallback icon
  }

  return <IconComponent {...props} />;
};
