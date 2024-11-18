import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  MoreHorizontal,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
} from "lucide-react";
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
import { EditSheet } from "./EditSheet";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

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
  const [textColor, setTextColor] = useState("#000000");
  const [heading, setHeading] = useState("Text Container");
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const formatCommands = [
    {
      group: "Headings",
      items: [
        { id: "h1", label: "Heading 1", format: "# " },
        { id: "h2", label: "Heading 2", format: "## " },
        { id: "h3", label: "Heading 3", format: "### " },
        { id: "h4", label: "Heading 4", format: "#### " },
        { id: "h5", label: "Heading 5", format: "##### " },
        { id: "h6", label: "Heading 6", format: "###### " },
      ],
    },
    {
      group: "Lists",
      items: [
        { id: "ul", label: "Unordered List", format: "- ", icon: List },
        { id: "ol", label: "Ordered List", format: "1. ", icon: ListOrdered },
      ],
    },
    {
      group: "Alignment",
      items: [
        {
          id: "align-left",
          label: "Align Left",
          format: "<div class='text-left'>",
          icon: AlignLeft,
        },
        {
          id: "align-center",
          label: "Align Center",
          format: "<div class='text-center'>",
          icon: AlignCenter,
        },
        {
          id: "align-right",
          label: "Align Right",
          format: "<div class='text-right'>",
          icon: AlignRight,
        },
      ],
    },
    {
      group: "Media",
      items: [
        {
          id: "image",
          label: "Insert Image",
          format: "![Alt text](image-url)",
          icon: ImageIcon,
        },
        {
          id: "table",
          label: "Insert Table",
          format:
            "\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n",
        },
      ],
    },
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    // Check if the last character typed is "/"
    if (
      newText.charAt(e.target.selectionStart - 1) === "/" &&
      !showCommandMenu
    ) {
      setShowCommandMenu(true);
      setCursorPosition(e.target.selectionStart);
    }
  };

  const handleCommandSelect = (command: { format: string }) => {
    if (textareaRef.current) {
      const beforeText = text.slice(0, cursorPosition - 1); // Remove the "/"
      const afterText = text.slice(cursorPosition);

      setText(beforeText + command.format + afterText);

      // Set cursor position after the inserted format
      const newPosition = cursorPosition - 1 + command.format.length;
      setTimeout(() => {
        textareaRef.current?.setSelectionRange(newPosition, newPosition);
        textareaRef.current?.focus();
      }, 0);
    }
    setShowCommandMenu(false);
  };

  // Update node size when resizing
  useEffect(() => {
    if (node) {
      node.resize(size.width, size.height);
    }
  }, [size, node]);

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
    if (id === "edit") {
      setIsEditSheetOpen(true);
    } else {
      console.log(`Node option ${id} toggled`);
    }
  };

  const handleColorPickerMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <>
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
          <span
            className="font-medium text-sm text-gray-700"
            style={{ color: textColor }}
          >
            {heading}
          </span>
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

        {/* Text Area */}
        <div className="p-2 h-[calc(100%-40px)] relative">
          <textarea
            ref={textareaRef}
            placeholder="Type / for commands..."
            value={text}
            onChange={handleTextChange}
            className="w-full h-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ overflow: "auto" }}
          />
          {showCommandMenu && (
            <div className="absolute left-4 bottom-4 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <Command>
                <CommandInput placeholder="Search formatting options..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {formatCommands.map((group) => (
                    <CommandGroup key={group.group} heading={group.group}>
                      {group.items.map((item) => (
                        <CommandItem
                          key={item.id}
                          onSelect={() => handleCommandSelect(item)}
                          className="flex items-center gap-2"
                        >
                          {item.icon && <item.icon className="w-4 h-4" />}
                          <span>{item.label}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </div>
          )}
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
      <EditSheet
        isOpen={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        backgroundColor={bgColor}
        textColor={textColor}
        heading={heading}
        onBackgroundColorChange={setBgColor}
        onTextColorChange={setTextColor}
        onHeadingChange={setHeading}
      />{" "}
    </>
  );
};

export default TextNode;
