import React from "react";
import { Label } from "@/components/ui/label";
import { ChromePicker } from "react-color";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  color,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <ChromePicker
        color={color}
        onChange={(color) => onChange(color.hex)}
        disableAlpha={true}
      />
    </div>
  );
};
