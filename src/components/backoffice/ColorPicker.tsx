
"use client";

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
    label: string;
    color: string;
    onChange: (color: string) => void;
}

export default function ColorPicker({ label, color, onChange }: ColorPickerProps) {
    const hexColor = `hsl(${color.replace(/ /g, ', ')})`;
    
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex items-center gap-2">
                <div 
                    className="h-10 w-10 rounded-md border" 
                    style={{ backgroundColor: hexColor }}
                />
                <Input 
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="e.g. 222 47% 11%"
                />
            </div>
        </div>
    );
}
