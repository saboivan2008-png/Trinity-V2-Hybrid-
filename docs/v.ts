// TrinityV2-full-instant.ts

// ========== ÚSTAVA ==========
const constitution = {
  protectionOfLife: "Systém nikdy neohrozí živú bytosť, ani v simulácii.",
  legality: "Systém rešpektuje zákony a nesmie radiť, ako ich obchádzať.",
  privacy: "Citlivé údaje sa ukladajú len minimálne, sanitizované a autorizované.",
  simulationBoundary: "Simulácie sa nesmú prezentovať ako realita.",
  security: "Systém nesmie obchádzať bezpečnostné mechanizmy, approvals ani audit.",
  priority: "Žiadny cieľ neprebíja ústavu."
};

// ========== POLICY ==========
function policyCheck(action: { type: string; input?: string }) {
  if (action.type === "harm") return "block";
  if (action.input && action.input.includes("harm")) return "block";
  if (action.type === "privacy_risk") return "require_review";
  return "allow";
}

// ========== AUDIT ==========
const audit = {
  log(event: string, data: any) {
    console.log(`[AUDIT] ${event}`, data);
  }
};

// ========== PAMÄŤ AGENT ==========
const memoryAgent = {
  store: [] as { type: string; value: string; time: number }[],
  sanitize(data: string) {
    return data.replace(/[\w.-]+@[\w.-]+/g, "[email]");
  },
  write(data: string) {
    const sanitized = this.sanitize(data);
    const item = { type: "fact", value: sanitized, time: Date.now() };
    this.store.push(item);
    audit.log("memory_write", item);
    return { status: "saved", value: sanitized };
  },
  read(query: string) {
    const result = this.store.filter(item => item.value.includes(query));
    audit.log("memory_read", { query, count: result.length });
    return result;
  }
};

// ========== SKILL AGENT ==========
const skillAgent = {
  execute(task: { skill: string; input: string }) {
    audit.log("skill_execute", task);
    return {
      status: "executed",
      skill: task.skill,
      output: `Skill ${task.skill} executed with input: ${task.input}`
    };
  }
};

// ========== EVAL AGENT ==========
const evalAgent = {
  async run(task: { input?: string }) {
    if (task.input?.includes("harm")) {
      audit.log("eval_failed", { reason: "Unsafe content", task });
      return { safe: false, reason: "Unsafe content" };
    }
    audit.log("eval_passed", task);
    return { safe: true };
  }
};

// ========== REAL API CONNECTORS ==========
const githubConnector = {
  async getUser(username: string) {
    const url = `https://api.github.com/users/${username}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "TrinityV2",
        "Accept": "application/vnd.github+json"
      }
    });

    if (!res.ok) {
      audit.log("github_user_error", { username, status: res.status });
      return { error: true, status: res.status };
    }

    const data = await res.json();
    const result = {
      login: data.login,
      id: data.id,
      avatar: data.avatar_url,
      url: data.html_url,
      type: data.type
    };
    audit.log("github_user", result);
    return result;
  },

  async getOrgs(username: string) {
    const url = `https://api.github.com/users/${username}/orgs`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "TrinityV2",
        "Accept": "application/vnd.github+json"
      }
    });

    if (!res.ok) {
      audit.log("github_orgs_error", { username, status: res.status });
      return { error: true, status: res.status };
    }

    const orgs = await res.json();
    audit.log("github_orgs", { username, count: orgs.length });
    return orgs;
  }
};

const nationConnector = {
  async syncGitHubIdentity(githubData: any) {
    const mapped = {
      synced: true,
      githubLogin: githubData.login,
      nationMappedId: `NAT-${githubData.id}`
    };
    audit.log("nation_sync", mapped);
    return mapped;
  }
};

const mdmConnector = {
  async checkDevice(deviceId: string) {
    const result = {
      deviceId,
      compliant: true,
      os: "Android",
      securityLevel: "high"
    };
    audit.log("mdm_check", result);
    return result;
  }
};

const unifiedConnector = {
  async fullSync(username: string, deviceId: string) {
    const gh = await githubConnector.getUser(username);
    const orgs = await githubConnector.getOrgs(username);
    const nat = await nationConnector.syncGitHubIdentity(gh);
    const dev = await mdmConnector.checkDevice(deviceId);

    const result = { github: gh, orgs, nation: nat, device: dev };
    audit.log("full_sync", result);
    return result;
  }
};

// ========== ORCHESTRATOR ==========
async function orchestrator(task: any) {
  const policy = policyCheck(task);

  if (policy === "block") {
    audit.log("policy_block", task);
    return { status: "blocked", reason: "Policy violation" };
  }

  if (task.type === "memory_write") {
    return memoryAgent.write(task.data);
  }

  if (task.type === "memory_read") {
    return memoryAgent.read(task.query);
  }

  if (task.type === "skill_run") {
    const evalResult = await evalAgent.run(task);
    if (!evalResult.safe) return { status: "blocked", reason: "Eval failed" };
    return skillAgent.execute(task);
  }

  if (task.type === "full_sync") {
    return unifiedConnector.fullSync(task.username, task.deviceId);
  }

  return { status: "ok", message: "Task processed" };
}

// ========== HLAVNÁ FUNKCIA ==========
export async function TrinityV2(task: any) {
  return orchestrator(task);
}

// ========== DEMO (môžeš zmazať) ==========
(async () => {
  console.log(await TrinityV2({ type: "memory_write", data: "test@example.com je tu" }));
  console.log(await TrinityV2({ type: "memory_read", query: "test" }));
  console.log(await TrinityV2({ type: "skill_run", skill: "demo", input: "hello world" }));
  console.log(await TrinityV2({ type: "full_sync", username: "github", deviceId: "device-001" }));
})();