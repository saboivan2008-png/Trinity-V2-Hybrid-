// ===============================
// REAL API CONNECTORS (INSTANT)
// ===============================

// 1) GitHub API konektor
export const githubConnector = {
  async getUser(username: string) {
    const url = `https://api.github.com/users/${username}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "TrinityV2",
        "Accept": "application/vnd.github+json"
      }
    });

    if (!res.ok) {
      return { error: true, status: res.status };
    }

    const data = await res.json();
    return {
      login: data.login,
      id: data.id,
      avatar: data.avatar_url,
      url: data.html_url,
      type: data.type
    };
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
      return { error: true, status: res.status };
    }

    return await res.json();
  }
};


// 2) Nation API konektor (mock → pripravený na reálne API)
export const nationConnector = {
  async getIdentity(userId: string) {
    return {
      userId,
      status: "active",
      roles: ["member"],
      licenses: ["core"]
    };
  },

  async syncGitHubIdentity(githubData: any) {
    return {
      synced: true,
      githubLogin: githubData.login,
      nationMappedId: `NAT-${githubData.id}`
    };
  }
};


// 3) MDM / Device API konektor (mock → pripravený na reálne API)
export const mdmConnector = {
  async checkDevice(deviceId: string) {
    return {
      deviceId,
      compliant: true,
      os: "Android",
      securityLevel: "high"
    };
  },

  async enforcePolicy(deviceId: string, policy: string) {
    return {
      deviceId,
      policy,
      applied: true
    };
  }
};


// 4) Unified Connector Layer
export const unifiedConnector = {
  async fullSync(username: string, deviceId: string) {
    const gh = await githubConnector.getUser(username);
    const orgs = await githubConnector.getOrgs(username);
    const nat = await nationConnector.syncGitHubIdentity(gh);
    const dev = await mdmConnector.checkDevice(deviceId);

    return {
      github: gh,
      orgs,
      nation: nat,
      device: dev
    };
  }
};