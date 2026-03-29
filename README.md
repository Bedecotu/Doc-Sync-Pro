# Doc-Sync-Pro for Claude Code 🚀

**Eliminate "Documentation Debt" automatically.**

Doc-Sync-Pro is a developer-centric plugin for [Claude Code](https://github.com/anthropics/claude-code) that ensures your documentation never lags behind your implementation. It leverages autonomous loops to analyze code diffs and synchronize relevant docs in real-time.

---

## 🌟 Key Features

- **Autonomous Loop Sync**: Uses a smart retry mechanism to perfect documentation updates.
- **Context-Aware**: Understands structural changes (API, Logic, Config) beyond simple text diffs.
- **Multi-Language Support**: Works with TypeScript, Python, Go, Rust, and more.
- **Zero-Config**: Dynamically identifies project documentation patterns.

## 📦 Installation

To add and enable the plugin in your Claude Code environment, run:

```bash
/plugin marketplace add Bedecotu/Doc-Sync-Pro && /plugin install doc-sync-pro

```
## 🛠 Usage

Once installed, Doc-Sync-Pro runs silently in the background. It intercepts the process before you commit or finish a task to verify documentation alignment.

Example Scenario:
You ask Claude: "Add a new 'email' field to the User interface and update the login logic."

Claude modifies the source code.

Doc-Sync-Pro triggers automatically, detects the change, and asks:

"⚠️ I noticed the User interface changed. Should I update README.md and API_SPEC.md? (y/n)"

Press y, and the plugin will autonomously rewrite the documentation for you.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

Created with ❤️ by Bedecotu
