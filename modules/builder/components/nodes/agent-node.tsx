"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { AppIcon } from "@/components/app-icon";
import { getToolLabel } from "@/modules/builder/lib/tools-catalog";

type ToolEntry = { toolId: string; config?: Record<string, unknown> };

export function AgentNode({ data }: NodeProps) {
  const tools = Array.isArray(data.tools) ? (data.tools as ToolEntry[]) : [];

  return (
    <div className="min-w-[160px] max-w-60 rounded-xl border-2 border-primary bg-card px-4 py-3 shadow-sm">
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Right} id="right" />
      <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
        <AppIcon name="bot" className="size-3.5" />
        Agent
      </p>
      <p className="text-muted-foreground mt-1 text-xs">{(data.label as string) ?? "Main agent"}</p>
      {tools.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tools.map((tool, index) => {
            const label = getToolLabel(tool.toolId, tool.config);
            return (
              <span
                key={`${tool.toolId}-${index}`}
                title={label}
                className="max-w-full truncate rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
              >
                {label}
              </span>
            );
          })}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
}
