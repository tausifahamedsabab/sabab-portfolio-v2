"use client";

/* eslint-disable react-hooks/static-components -- getIcon resolves a stable per-name Lucide component; rendering it is intentional */

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { ProjectArchitecture, ProjectArchitectureNode } from "@/data/projects";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "@/hooks/useInViewOnce";

const NODE_W = 128;
const NODE_H = 54;
const GAP = 14;

interface EdgeGeom {
  id: string;
  from: string;
  to: string;
  label: string;
  d: string;
  length: number;
  labelX: number;
  labelY: number;
}

interface NodePos {
  x: number;
  y: number;
}

interface Layout {
  width: number;
  height: number;
  nodes: Record<string, NodePos>;
  edges: EdgeGeom[];
}

function computeEdges(
  diagram: ProjectArchitecture,
): { id: string; from: string; to: string; label: string }[] {
  const known = new Set(diagram.layers.flatMap((l) => l.nodes.map((n) => n.id)));
  const result: { id: string; from: string; to: string; label: string }[] = [];
  const push = (e: { id: string; from: string; to: string; label: string }) => {
    if (known.has(e.from) && known.has(e.to) && !result.some((r) => r.id === e.id)) {
      result.push(e);
    }
  };
  diagram.layers.forEach((layer, i) => {
    const next = diagram.layers[i + 1];
    if (!next) return;
    layer.nodes.forEach((node) => {
      const match = next.nodes.find((n) => n.id === node.id);
      if (match) {
        push({ id: `${node.id}>${match.id}`, from: node.id, to: match.id, label: "" });
      }
    });
  });
  diagram.edges.forEach((e) =>
    push({ id: `${e.from}>${e.to}`, from: e.from, to: e.to, label: e.label }),
  );
  return result;
}

function computeLayout(diagram: ProjectArchitecture, horizontal: boolean): Layout {
  const nodes: Record<string, NodePos> = {};
  let cursor = 16;
  diagram.layers.forEach((layer) => {
    if (horizontal) {
      layer.nodes.forEach((node, j) => {
        nodes[node.id] = { x: cursor, y: 16 + j * (NODE_H + GAP / 2) };
      });
      cursor += NODE_W + GAP;
    } else {
      const n = layer.nodes.length;
      layer.nodes.forEach((node, j) => {
        nodes[node.id] = { x: 16 + j * (NODE_W + GAP / 2), y: cursor };
      });
      cursor += (n ? n * NODE_H + (n - 1) * (GAP / 2) : 0) + GAP * 2;
    }
  });

  const width = horizontal
    ? cursor
    : Math.max(0, ...diagram.layers.flatMap((l) => l.nodes.map((n) => (nodes[n.id]?.x ?? 0) + NODE_W))) + 32;
  const height = horizontal
    ? Math.max(0, ...diagram.layers.flatMap((l) => l.nodes.map((n) => (nodes[n.id]?.y ?? 0) + NODE_H))) + 32
    : cursor + 16;

  const edges = computeEdges(diagram)
    .map((e) => {
      const a = nodes[e.from];
      const b = nodes[e.to];
      if (!a || !b) return null;
      let fromX: number, fromY: number, toX: number, toY: number;
      if (horizontal) {
        fromX = a.x + NODE_W;
        fromY = a.y + NODE_H / 2;
        toX = b.x;
        toY = b.y + NODE_H / 2;
      } else {
        fromX = a.x + NODE_W / 2;
        fromY = a.y + NODE_H;
        toX = b.x + NODE_W / 2;
        toY = b.y;
      }
      const length = Math.hypot(toX - fromX, toY - fromY);
      const labelX = (fromX + toX) / 2;
      const labelY = (fromY + toY) / 2 - (horizontal ? -6 : 8);
      return {
        ...e,
        d: `M ${fromX} ${fromY} L ${toX} ${toY}`,
        length,
        labelX,
        labelY,
      };
    })
    .filter((e): e is EdgeGeom => e !== null);

  return { width, height, nodes, edges };
}

interface NodeBoxProps {
  node: ProjectArchitectureNode;
  pos: NodePos;
  delay: number;
  prefersReduced: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function NodeBox({ node, pos, delay, prefersReduced, onHover, onLeave }: NodeBoxProps) {
  const Icon = getIcon(node.icon);
  return (
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 1, left: pos.x, top: pos.y }
          : { opacity: 0, left: pos.x, top: pos.y }
      }
      animate={{ opacity: 1, left: pos.x, top: pos.y }}
      transition={
        prefersReduced
          ? { duration: 0.01 }
          : { type: "tween", duration: 0.55, delay, ease: "easeOut" }
      }
      style={{ left: pos.x, top: pos.y, width: NODE_W, height: NODE_H }}
      className={cn(
        "arch-node absolute flex items-start gap-3 rounded-xl border p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.35)]",
        `arch-node--${node.color}`,
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role="img"
      aria-label={node.title}
    >
      <Icon size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[13px] font-bold text-fg">{node.title}</p>
        {node.subtitle && (
          <p className="mt-0.5 text-[11px] leading-snug text-muted">{node.subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}

export function SystemArchitectureDiagram({ diagram }: { diagram: ProjectArchitecture }) {
  const prefersReduced = useReducedMotion() ?? false;
  const [isDesktop, setIsDesktop] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { ref, inView } = useInViewOnce(0.1);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handler = () => setIsDesktop(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const layout = useMemo(() => computeLayout(diagram, isDesktop), [diagram, isDesktop]);
  const nodeIndex = useMemo(() => {
    const map = new Map<string, number>();
    diagram.layers.forEach((l) => l.nodes.forEach((n) => map.set(n.id, map.size)));
    return map;
  }, [diagram]);

  return (
    <motion.div
      ref={ref}
      className="arch-diagram glass-strong rounded-3xl border border-[#141722]"
      style={{ width: layout.width, height: layout.height, padding: 24 }}
      role="img"
      aria-label={diagram.title}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={inView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={prefersReduced ? { duration: 0.01 } : { type: "tween", duration: 0.7, ease: "easeOut" }}
    >
      {/* Title + description */}
      <div className="mb-5">
        <p className="font-display text-2xl font-bold text-fg">{diagram.title}</p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{diagram.description}</p>
      </div>

      <div className="relative" style={{ width: layout.width - 64, height: layout.height - 112 }}>
        <svg
          className="absolute inset-0"
          width={layout.width - 64}
          height={layout.height - 112}
          viewBox={`0 0 ${layout.width - 64} ${layout.height - 112}`}
          aria-hidden="true"
        >
          {layout.edges.map((e, i) => {
            const highlighted = hovered !== null && (e.from === hovered || e.to === hovered);
            return (
              <path
                key={e.id}
                d={e.d}
                className={cn("arch-edge", highlighted && "arch-edge--hl")}
                style={
                  {
                    "--edge-len": `${Math.max(e.length, 40)}px`,
                    "--stagger": `${i * 0.05}s`,
                  } as React.CSSProperties
                }
                strokeWidth={highlighted ? 3.5 : 2}
              />
            );
          })}
          {layout.edges.map((e) =>
            e.label ? (
              <text
                key={`${e.id}-label`}
                className="arch-edge-label"
                x={e.labelX}
                y={e.labelY}
                textAnchor="middle"
              >
                {e.label}
              </text>
            ) : null,
          )}
        </svg>

        {diagram.layers.map((layer) => {
          const firstNode = layer.nodes[0];
          const anchor = firstNode ? layout.nodes[firstNode.id] : undefined;
          if (!anchor) return null;
          return (
            <div
              key={layer.id}
              className="absolute z-10"
              style={
                isDesktop
                  ? { left: anchor.x - 16, top: 0 }
                  : { left: 0, top: anchor.y - 12 }
              }
            >
              <p className="arch-layer-title">{layer.title}</p>
              <div className="mt-1 flex flex-col gap-[18px] md:flex-row md:gap-[4px]">
                {layer.nodes.map((node) => (
                  <NodeBox
                    key={node.id}
                    node={node}
                    pos={layout.nodes[node.id]}
                    delay={(nodeIndex.get(node.id) ?? 0) * 0.045}
                    prefersReduced={prefersReduced}
                    onHover={() => setHovered(node.id)}
                    onLeave={() => setHovered(null)}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {diagram.notes.map((note, i) => (
          <motion.div
            key={note.node}
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.09, duration: 0.5, ease: "easeOut" }}
            className="mt-3 glass rounded-xl border border-[#141722] px-3 py-2.5 text-[11.5px] text-muted"
          >
            <span className="font-mono uppercase tracking-wide text-accent">{note.node} →</span>{" "}
            {note.text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
