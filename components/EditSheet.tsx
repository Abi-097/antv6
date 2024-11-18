import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "./ColorPicker";

interface EditSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  backgroundColor: string;
  textColor: string;
  heading: string;
  onBackgroundColorChange: (color: string) => void;
  onTextColorChange: (color: string) => void;
  onHeadingChange: (newHeading: string) => void;
}

export const EditSheet: React.FC<EditSheetProps> = ({
  isOpen,
  onOpenChange,
  backgroundColor,
  textColor,
  heading,
  onBackgroundColorChange,
  onTextColorChange,
  onHeadingChange,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Edit Node Appearance</SheetTitle>
          <SheetDescription>
            Customize the colors of your Multi-AI node.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-6 py-4">
          {/* Heading Field */}
          <div>
            <label htmlFor="heading" className="block text-sm font-medium">
              Heading
            </label>
            <input
              id="heading"
              type="text"
              className="mt-2 p-2 block w-full border rounded-md text-sm"
              value={heading}
              onChange={(e) => onHeadingChange(e.target.value)}
            />
          </div>
          <ColorPicker
            label="Background Color"
            color={backgroundColor}
            onChange={onBackgroundColorChange}
          />

          <ColorPicker
            label="Text Color"
            color={textColor}
            onChange={onTextColorChange}
          />
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
