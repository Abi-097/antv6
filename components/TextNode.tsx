import React, { useEffect, useRef, useState } from "react";
import { Bot, MoreHorizontal } from "lucide-react";
// import { Menu, MenuButton, MenuList, MenuItem } from "@shadcn/menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChromePicker } from "react-color";

export interface TextNodeProps {
  node?: any;
}

export interface PortOption {
  id: string;
  label: string;
  enabled: boolean;
}

const DEFAULT_NODE_OPTIONS: PortOption[] = [
  { id: "colors", label: "Colors", enabled: false },
  { id: "edit", label: "Edit", enabled: false },
  { id: "delete", label: "Delete", enabled: false },
];

const TextNode: React.FC<TextNodeProps> = ({ node }) => {
  const [text, setText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [size, setSize] = useState({ width: 200, height: 100 });
  const [nodeOptions, setNodeOptions] =
    useState<PortOption[]>(DEFAULT_NODE_OPTIONS);
  const [isNodeOptionsOpen, setIsNodeOptionsOpen] = useState(false);
  const [bgColor, setBgColor] = useState("#c9ced6");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const colorPickerContainerRef = useRef<HTMLDivElement>(null);
  // Update node size when resizing
  useEffect(() => {
    if (node) {
      node.resize(size.width, size.height);
    }
  }, [size, node]);

  useEffect(() => {
    // Prevent node dragging when interacting with color picker
    if (showColorPicker && node) {
      const originalDraggable = node.draggable;
      node.draggable = false;
      return () => {
        node.draggable = originalDraggable;
      };
    }
  }, [showColorPicker, node]);

  // Handle resizing logic
  const handleResize = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    const startWidth = size.width;
    const startHeight = size.height;
    const startX = e.clientX;
    const startY = e.clientY;

    const onMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      const newWidth = Math.max(200, startWidth + deltaX);
      const newHeight = Math.max(100, startHeight + deltaY);

      setSize({
        width: newWidth,
        height: newHeight,
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
  const toggleNodeOption = (id: string) => {
    if (id === "colors") {
      setShowColorPicker(!showColorPicker);
    } else {
      console.log(`Node option ${id} toggled`);
    }
  };

  const handleColorChange = (color: any) => {
    setBgColor(color.hex);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      showColorPicker &&
      colorPickerContainerRef.current &&
      !colorPickerContainerRef.current.contains(event.target as Node)
    ) {
      setShowColorPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showColorPicker]);

  const handleColorPickerMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div
      className="relative bg-white border border-gray-300 rounded-md shadow-md overflow-visible"
      style={{
        width: size.width,
        height: size.height,
        minWidth: "200px",
        minHeight: "100px",
        backgroundColor: bgColor,
      }}
    >
      {/* Header with Dropdown */}
      <div className="flex justify-between items-center bg-gray-200 px-2 py-1 rounded-t-md">
        <span className="font-medium text-sm text-gray-700">Text Node</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black text-xl px-2"
            >
              <MoreHorizontal size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {nodeOptions.map((option) => (
              <DropdownMenuItem
                key={option.id}
                onClick={() => toggleNodeOption(option.id)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {showColorPicker && (
        <div
          ref={colorPickerContainerRef}
          className="absolute right-0 top-[calc(100%+10px)] z-50"
          onMouseDown={handleColorPickerMouseDown}
        >
          <div ref={colorPickerRef}>
            <ChromePicker
              color={bgColor}
              onChangeComplete={handleColorChange}
              disableAlpha={true}
            />
          </div>
        </div>
      )}
      {/* Text Area */}
      <div className="p-2 h-[calc(100%-40px)]">
        <textarea
          placeholder="Type here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            overflow: "auto",
          }}
        />
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-1 right-1 w-3 h-3 bg-gray-400 cursor-se-resize rounded-sm hover:bg-gray-600"
        onMouseDown={handleResize}
      />

      {/* Port Containers - These will stay fixed relative to the node's edges */}
      <div className="absolute left-0 top-0 bottom-0 flex items-center -translate-x-[6px]">
        <div className="w-3 h-3 bg-white border-2 border-blue-500 rounded-full" />
      </div>
      <div className="absolute right-0 top-0 bottom-0 flex items-center translate-x-[6px]">
        <div className="w-3 h-3 bg-white border-2 border-blue-500 rounded-full" />
      </div>
    </div>
  );
};

export default TextNode;
