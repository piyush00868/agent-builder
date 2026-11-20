export type AgentDefinition = {
    schemaVersion: 1;
    instructions: string;
    model: { provider: "groq"; modelId: string };
    tools: { toolId: string; config: Record<string, unknown> }[];
    memory: { enabled: boolean };
    limits: { maxToolCalls: number; timeoutMs: number };
  };
  
  export function defaultDefinition(): AgentDefinition {
    return {
      schemaVersion: 1,
      instructions: "You are a helpful assistant.",
      model: { provider: "groq", modelId: "openai/gpt-oss-120b" },
      tools: [],
      memory: { enabled: false },
      limits: { maxToolCalls: 5, timeoutMs: 60000 },
    };
  }
  