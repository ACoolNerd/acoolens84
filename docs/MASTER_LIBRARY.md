# 📚 Sovereign Master Library Directory
## Complete Full-Stack Architecture Dossier

This document registers and maps all core system files, configurations, and scripts for the **Hermes CLI**, **Hermes Self-Evolution Core**, and **Gemini Antigravity** clusters. It acts as the single source of truth for developer orchestration across the sovereign ecosystem.

---

## 🤖 Cluster 01: Hermes Agent Core & CLI
* **Root Location:** `/Users/acoolnerd/.hermes/hermes-agent/`
* **Purpose:** Multi-channel gateway, CLI shell interface, and core learning loop execution.

### Key Manifest Files
* **[cli.py](file:///Users/acoolnerd/.hermes/hermes-agent/cli.py)**
  Main TUI/CLI interactive shell. Houses the slash command parser (`/new`, `/reset`, `/model`, `/skills`).
* **[run_agent.py](file:///Users/acoolnerd/.hermes/hermes-agent/run_agent.py)**
  The runtime orchestrator. Manages model token requests, agent thought loops, and step iterations.
* **[mcp_serve.py](file:///Users/acoolnerd/.hermes/hermes-agent/mcp_serve.py)**
  Bridges external Model Context Protocol servers to provide custom filesystem and terminal tool bounds.
* **[setup-hermes.sh](file:///Users/acoolnerd/.hermes/hermes-agent/setup-hermes.sh)**
  Shell bootstrap package. Deploys `uv` package manager, activates `.venv` Python 3.11 environment, and links binaries.
* **[AGENTS.md](file:///Users/acoolnerd/.hermes/hermes-agent/AGENTS.md)**
  Governs strict entity containment guidelines (firewalling personal operations from agency models).
* **[config.yaml](file:///Users/acoolnerd/.hermes/config.yaml)**
  Configures global LLM endpoint URLs, key bindings, active tools, and authorized gateway channels.

---

## 🧬 Cluster 02: Hermes Self-Evolution Engine
* **Root Location:** `/Users/acoolnerd/hermes-agent-self-evolution/`
* **Purpose:** Refines agent prompt efficiency, tool descriptions, and skills via genetic Pareto search optimization.

### Key Manifest Files
* **[pyproject.toml](file:///Users/acoolnerd/hermes-agent-self-evolution/pyproject.toml)**
  Registers dependencies for prompt evolution including `dspy-ai` and `gepa` prompt mutation algorithms.
* **[generate_report.py](file:///Users/acoolnerd/hermes-agent-self-evolution/generate_report.py)**
  Parses execution traces and produces progress charts detailing evolutionary model improvements.
* **[evolution/skills/evolve_skill.py](file:///Users/acoolnerd/hermes-agent-self-evolution/evolution/skills/evolve_skill.py)**
  Mutates SKILL.md directives using real user logs to maximize instruction compliance.

---

## ⚡ Cluster 03: Gemini Antigravity Core
* **Root Location:** `/Users/acoolnerd/ACoolai/antigravity/`
* **Purpose:** Primary narrative strategy engine and corporate alignment center for all 9 strategic clusters.

### Key Manifest Files
* **[antigravity_gemini_config.json](file:///Users/acoolnerd/ACoolai/antigravity/antigravity_gemini_config.json)**
  Defines specific hyperparameters for Gemini 3.5 models, system temp settings, and RAG contexts.
* **[ANTIGRAVITY_PROMPT_GEMINI_DEPLOYMENT_GUIDE.md](file:///Users/acoolnerd/ACoolai/antigravity/docs/ANTIGRAVITY_PROMPT_GEMINI_DEPLOYMENT_GUIDE.md)**
  Strategic overview documenting how the Antigravity prompt layer spans 22+ entities, from ACoolACADEMY to iAmACoolCOLLECTOR.
* **[GEMINI.md](file:///Users/acoolnerd/ACoolai/ACoolCITY/GEMINI.md)**
  Specifies data structure laws: enforces the **7-Field Schema Law** and prompt building via **ICTFS format** (Instruction, Context, Task, Format, System).

---

## 📊 Full-Stack Ecosystem Map

```
                     ┌───────────────────────────────────────────────┐
                     │          ACoolECOSYSTEM Orchestrator          │
                     └───────────────────────┬───────────────────────┘
                                             │
                       ┌─────────────────────┼─────────────────────┐
                       ▼                     ▼                     ▼
             [Hermes CLI Core]     [Self-Evolution DSPy]  [Antigravity Gemini]
             - Gateway Engine      - Genetic Optimization - Narrative Strategy
             - Tool/MCP Integrator - Skill Mutation Loops - 9-Cluster Contexts
                       │                     │                     │
                       └─────────────────────┼─────────────────────┘
                                             │
                                             ▼
                               ┌───────────────────────────┐
                               │  LA28Lens Web App & HUD   │
                               │  - ACCESSFriendly Route   │
                               │  - Oculus VR Concessions  │
                               │  - Glasses Telemetry stream│
                               └───────────────────────────┘
```
