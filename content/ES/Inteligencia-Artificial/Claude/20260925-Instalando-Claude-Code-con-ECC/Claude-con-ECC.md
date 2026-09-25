# Instalando Claude Code con ECC y FreeLLMAPI


Para instalarlo en Linux:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```


y luego pongo lo siguiente


```
wachin@avlmxe:~
$ npx freellmapi setup-claude --url http://127.0.0.1:31415
Updated /home/wachin/.claude/settings.json
Backup: /home/wachin/.claude/settings.json.backup-2026-09-25T18-41-45-250Z

Claude Code will read this configuration automatically.

For zero-persistence credentials, prefer: freellmapi launch
wachin@avlmxe:~
$ npx ecc-universal install --guided
Need to install the following packages:
ecc-universal@2.2.1
Ok to proceed? (y) y


Which coding agents should ECC configure?
  1. Claude Code — Selected Claude plugin scope: ~/.claude or ./.claude
  2. Codex — ~/.codex through the Codex native plugin lifecycle
  3. Kimi Code — ./.kimi-code
  all. All three guided harnesses

Advanced adapters (use ecc install --target): Cursor, Antigravity, Gemini CLI, OpenCode, CodeBuddy, JoyCode, Qwen Code, Zed, Hermes, and OpenClaw.

Choose one or more (for example 1,3 or all): 1

Where should Claude enable ecc@ecc?
  1. user
  2. project
  3. local
Choose [Recommended: user] (one option only): 1

How should ECC hooks run in Claude?
  1. off
  2. minimal
  3. standard
  4. strict
Choose [Recommended: standard] (one option only): 3

ECC guided install preview

Harness       Channel           Destination
Claude Code   native-plugin     Selected Claude plugin scope: ~/.claude or ./.claude

Claude hook profile 'standard' enables automation that can:
  1. Automatically format or otherwise modify project source files.
  2. Rewrite requested commands and start, replace, or terminate processes.
  3. Send transcript-derived conversation text to an external LLM.
  4. Probe MCP endpoints and launch, reconnect, or terminate MCP processes.
  5. Automatically deny or alter Edit, Write, Bash, and configuration operations.
  6. Persist session, observation, governance, notification, and cost records.
Choose '--claude-hooks off' to install without automatic hook behavior.

Apply ECC to these harnesses? [y/N]: y

ECC configured for Claude Code.

 ███████╗  ██████╗  ██████╗
 ██╔════╝ ██╔════╝ ██╔════╝
 █████╗   ██║      ██║
 ██╔══╝   ██║      ██║
 ███████╗ ╚██████╗ ╚██████╗
 ╚══════╝  ╚═════╝  ╚═════╝

  Welcome to ECC!
  v2.2.1

  ╭───────────────────────────────────────────────────────╮
  │ GitHub:        https://github.com/affaan-m/ECC        │
  │ Discord:       https://discord.gg/36yGMHGFbR          │
  │ Documentation: https://github.com/affaan-m/ECC#readme │
  │ GitHub App:     https://github.com/apps/ecc-tools     │
  ╰───────────────────────────────────────────────────────╯
wachin@avlmxe:~
```





## Referencias

https://ecc.tools/
