"use client";
import React, { useEffect, useRef, useState } from "react";
import { Graph } from "@antv/x6";
import { register } from "@antv/x6-react-shape";
import MultiAINode from "./MultiAINode";
import { ArrowDown, ArrowRight } from "lucide-react";
import TextNode from "./TextNode";
import BlockNode from "./BlockNode";

////
const GraphComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);
  const [isVertical, setIsVertical] = useState(false);

  const updateLayout = (graph: Graph, vertical: boolean) => {
    graph.options.connecting.router = {
      name: "manhattan",
      args: {
        padding: 20,
        startDirections: vertical ? ["bottom"] : ["right"],
        endDirections: vertical ? ["top"] : ["left"],
      },
    };

    // Update existing edges with new router settings
    graph.getEdges().forEach((edge) => {
      edge.router = {
        name: "manhattan",
        args: {
          padding: 20,
          startDirections: vertical ? ["bottom"] : ["right"],
          endDirections: vertical ? ["top"] : ["left"],
        },
      };
    });

    graph.getNodes().forEach((node) => {
      node.setData({ isVertical: vertical }); // Update node data
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    register({
      shape: "multi-ai-node",
      width: 350,
      height: 50,
      component: MultiAINode,
      ports: {
        groups: {
          left: {
            position: "left",
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#2d8cf0",
                fill: "#fff",
                strokeWidth: 1,
              },
            },
            markup: [
              {
                tagName: "circle",
                selector: "circle",
              },
            ],
          },
          top: {
            position: {
              name: "top",
              args: {
                x: "33%",
                y: 0,
              },
            },
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#2d8cf0",
                fill: "#fff",
                strokeWidth: 2,
              },
            },
            markup: [
              {
                tagName: "circle",
                selector: "circle",
              },
            ],
          },
          right: {
            position: {
              name: "absolute",
              args: {
                x: "100%",
                y: "50%",
              },
            },
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#2d8cf0",
                fill: "#fff",
                strokeWidth: 2,
              },
              plus: {
                d: "M -4 0 L 4 0 M 0 -4 L 0 4",
                stroke: "#2d8cf0",
                strokeWidth: 2,
              },
              line: {
                stroke: "#2d8cf0",
                strokeWidth: 2,
                targetMarker: null,
              },
            },
            markup: [
              {
                tagName: "path",
                selector: "line",
              },
              {
                tagName: "circle",
                selector: "circle",
              },
              {
                tagName: "path",
                selector: "plus",
              },
            ],
          },
          bottom: {
            position: {
              name: "absolute",
              args: {
                x: "50%",
                y: "100%",
              },
            },
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#2d8cf0",
                fill: "#fff",
                strokeWidth: 2,
                cursor: "pointer",
              },
            },
            markup: [
              {
                tagName: "circle",
                selector: "circle",
              },
            ],
          },
        },
      },
    });
    register({
      shape: "text-node",
      width: 200,
      height: 40,
      component: TextNode,
      ports: {
        groups: {
          top: {
            position: {
              name: "top",
              args: {
                dx: 0,
                dy: 0,
              },
            },
            attrs: {
              circle: {
                r: 0,
                magnet: true,
                stroke: "none",
                fill: "none",
              },
              ".plus-icon": {
                d: "M 0 -6 L 0 6 M -6 0 L 6 0",
                stroke: "#2d8cf0",
                strokeWidth: 2,
                fill: "none",
              },
              ".plus-background": {
                r: 10,
                fill: "#fff",
                stroke: "#2d8cf0",
                strokeWidth: 1,
              },
            },
            markup: [
              {
                tagName: "circle",
                selector: ".plus-background",
              },
              {
                tagName: "path",
                selector: ".plus-icon",
              },
            ],
          },
          bottom: {
            position: "bottom",
            attrs: {
              circle: {
                r: 10,
                magnet: true,
                stroke: "#2d8cf0",
                fill: "#fff",
                strokeWidth: 1,
              },
              path: {
                d: "M -4 0 L 4 0 M 0 -4 L 0 4",
                stroke: "#2d8cf0",
                strokeWidth: 2,
              },
            },
            markup: [
              {
                tagName: "circle",
                selector: "circle",
              },
              {
                tagName: "path",
                selector: "path",
              },
            ],
          },
          left: {
            position: "left",
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#2d8cf0",
                fill: "#fff",
                strokeWidth: 1,
              },
            },
            markup: [
              {
                tagName: "circle",
                selector: "circle",
              },
            ],
          },
          right: {
            position: "right",
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#2d8cf0",
                fill: "#fff",
                strokeWidth: 1,
              },
            },
            markup: [
              {
                tagName: "circle",
                selector: "circle",
              },
            ],
          },
        },
      },
    });

    register({
      shape: "block-node",
      width: 400,
      height: 300,
      component: BlockNode,
      zIndex: 0,
      ports: {
        groups: {
          left: {
            position: "left",
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#2d8cf0",
                fill: "#fff",
                strokeWidth: 1,
              },
            },
            markup: [
              {
                tagName: "circle",
                selector: "circle",
              },
            ],
          },
          right: {
            position: "right",
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#2d8cf0",
                fill: "#fff",
                strokeWidth: 1,
              },
            },
            markup: [
              {
                tagName: "circle",
                selector: "circle",
              },
            ],
          },
        },
      },
    });

    const graph = new Graph({
      container: containerRef.current,
      // grid: true,
      panning: {
        enabled: true,
        eventTypes: ["leftMouseDown", "mouseWheel"],
      },
      mousewheel: {
        enabled: true,
        modifiers: "ctrl",
        factor: 1.1,
        maxScale: 1.5,
        minScale: 0.5,
      },
      highlighting: {
        magnetAdsorbed: {
          name: "stroke",
          args: {
            attrs: {
              fill: "#fff",
              stroke: "#31d0c6",
              strokeWidth: 4,
            },
          },
        },
      },
      width: 1400,
      height: 900,
      background: { color: "#f8f9fa" },

      connecting: {
        router: {
          name: "manhattan",
          args: {
            padding: 20,
            startDirections: ["right"],
            endDirections: ["left"],
          },
        },
        connector: {
          name: "smooth",
          args: {
            // radius: 50,
          },
        },
        anchor: "center",
        connectionPoint: {
          name: "boundary",
          args: {
            sticky: true,
          },
        },

        validateConnection: ({ sourcePort, targetPort, targetMagnet }) => {
          return (
            !!targetMagnet &&
            sourcePort !== targetPort &&
            targetMagnet.getAttribute("magnet") === "true"
          );
        },

        snap: { radius: 20 },
        allowBlank: false,
        allowLoop: false,
        allowNode: false,
        allowEdge: false,
        allowMulti: true,
        highlight: true,
      },

      interacting: {
        magnetConnectable: true,
        nodeMovable: true,
      },
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox();
          return this.getNodes().filter((node) => {
            // Only consider block-nodes as potential parents
            if (node.shape !== "block-node") return false;
            const targetBBox = node.getBBox();
            return targetBBox.containsRect(bbox);
          });
        },
      },
    });

    graph.on("node:change:position", ({ node, options }) => {
      if (options.skipParentHandler) return;

      const parent = node.getParent();
      if (parent && parent.shape === "block-node") {
        const parentBBox = parent.getBBox();
        const nodeBBox = node.getBBox();

        const x = Math.min(
          Math.max(nodeBBox.x, parentBBox.x + 10),
          parentBBox.x + parentBBox.width - nodeBBox.width - 10
        );

        const y = Math.min(
          Math.max(nodeBBox.y, parentBBox.y + 40),
          parentBBox.y + parentBBox.height - nodeBBox.height - 10
        );

        if (x !== nodeBBox.x || y !== nodeBBox.y) {
          node.setPosition({ x, y }, { skipParentHandler: true });
        }
      }
    });

    graphRef.current = graph;
    return () => {
      graph.dispose();
    };
  }, []);

  const handleDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("nodeType", type);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData("nodeType");

    if (nodeType && graphRef.current) {
      const { offsetX, offsetY } = event.nativeEvent;
      const point = graphRef.current.clientToLocal({ x: offsetX, y: offsetY });

      // Define the base node configuration
      let nodeConfig: any = {
        shape: nodeType,
        x: offsetX - 100, // Center the node to cursor
        y: offsetY - 20,
        ports: { items: [] },
      };

      // Customize ports based on node type
      switch (nodeType) {
        // case "multi-ai-node":
        //   nodeConfig.ports.items = [
        //     { id: "left", group: "left" },
        //     { id: "right", group: "right" },
        //   ];
        //   break;

        case "multi-ai-node":
          nodeConfig.ports.items = [
            { id: "left", group: "left" },
            // { id: "left-2", group: "left-2" },
            { id: "right", group: "right" },
            { id: "top-1", group: "top" },
            // { id: "top-2", group: "top-2" },
          ];
          break;

        case "text-node":
          nodeConfig.ports.items = [
            { id: "left", group: "left" },
            { id: "right", group: "right" },
          ];
          break;
        case "block-node":
          nodeConfig.x = offsetX - 200; // Center based on block width
          nodeConfig.y = offsetY - 150; // Center based on block height
          nodeConfig.ports.items = [
            { id: "left", group: "left" },
            { id: "right", group: "right" },
          ];
          nodeConfig.zIndex = 0;
          break;
        default:
          console.warn(`Unknown node type: ${nodeType}`);
          break;
      }
      graphRef.current.addNode(nodeConfig);
      // graphRef.current.addNode({
      //   shape: nodeType,
      //   x: point.x - 175, // Center the node
      //   y: point.y - 25,
      //   ports: {
      //     items: [
      //       {
      //         id: "port-1",
      //         group: "right",
      //       },
      //     ],
      //   },
      // });
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };
  const handleLayoutToggle = () => {
    if (graphRef.current) {
      const newIsVertical = !isVertical;
      setIsVertical(newIsVertical);
      updateLayout(graphRef.current, newIsVertical);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="p-4 bg-gray-100 border-r border-gray-200 h-full">
        {/* Multi-AI Node */}
        <h2 className="text-lg font-bold mb-4">Nodes</h2>
        {/* Block Node */}
        <div
          className="p-2 mb-2 border border-gray-300 rounded bg-white cursor-pointer"
          draggable
          onDragStart={(event) => handleDragStart(event, "block-node")}
        >
          Block Container
        </div>
        <div
          className="mb-2 border border-gray-300 rounded bg-white cursor-pointer"
          draggable
          onDragStart={(event) => handleDragStart(event, "multi-ai-node")}
        >
          <MultiAINode isVertical={isVertical} />
        </div>
        <div
          className="p-2 mb-2 border border-gray-300 rounded bg-white cursor-pointer"
          draggable
          onDragStart={(event) => handleDragStart(event, "text-node")}
        >
          Text Node
        </div>
      </div>

      {/* Right Canvas Area */}
      <div className="flex-1 h-screen relative">
        {/* Layout Toggle Button */}
        <button
          onClick={handleLayoutToggle}
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-md shadow-md hover:bg-gray-50"
          title={
            isVertical
              ? "Switch to Horizontal Layout"
              : "Switch to Vertical Layout"
          }
        >
          {isVertical ? <ArrowRight /> : <ArrowDown />}
        </button>

        <div
          ref={containerRef}
          className="w-full h-full"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      </div>
    </div>
  );
};

export default GraphComponent;
