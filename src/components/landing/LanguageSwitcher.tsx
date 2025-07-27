
"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    // The pathname is like /en/about, we want to replace the /en part
    const newPath = `/${newLocale}/${pathname.split("/").slice(2).join("/")}`;
    router.replace(newPath);
  };

  return (
    <Select onValueChange={handleLocaleChange} defaultValue={locale}>
      <SelectTrigger className="w-[70px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pt">Pt</SelectItem>
        <SelectItem value="es">Es</SelectItem>
        <SelectItem value="en">En</SelectItem>
        <SelectItem value="fr">Fr</SelectItem>
      </SelectContent>
    </Select>
  );
}
