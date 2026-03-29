import { ClaudeCodePlugin, FileChange } from '@anthropics/claude-code-types';

/**
 * Doc-Sync-Pro: A high-performance synchronization engine for Claude Code.
 */
const DocSyncPro: ClaudeCodePlugin = {
  name: 'doc-sync-pro',
  description: 'Automatically synchronizes documentation (README, Swagger, JSDoc) with code changes.',

  async onBeforeCommit(context) {
    const changes: FileChange[] = context.pendingChanges;
    
    // Define file patterns to monitor
    const sourcePatterns = /\.(ts|js|py|go|cpp|php|java|rs|rb)$/i;
    const docPatterns = /\.(md|txt|yaml|yml|json)$/i;
    const ignorePatterns = /(node_modules|dist|build|target|\.git)/;

    // Filter changes
    const sourceChanges = changes.filter(f => 
      sourcePatterns.test(f.path) && !ignorePatterns.test(f.path)
    );
    
    const docChanges = changes.filter(f => 
      docPatterns.test(f.path) && !ignorePatterns.test(f.path)
    );

    // If source code changed but no documentation was updated
    if (sourceChanges.length > 0 && docChanges.length === 0) {
      const changedFiles = sourceChanges.map(f => f.path).join(', ');
      
      const analysisPrompt = `
        Code changes detected in: ${changedFiles}.
        
        System Task:
        1. Analyze the functional impact of these changes (API updates, new features, logic shifts).
        2. Identify related documentation (README.md, API specs, config files, or JSDoc).
        3. Propose or execute specific updates to ensure the documentation reflects the new code state.
        
        If no documentation update is necessary, respond with "ALIGNED". 
        Otherwise, perform the updates and then respond with "ALIGNED".
      `;

      // Trigger the autonomous loop to perform documentation updates
      await context.runCommand(`ralph-loop "${analysisPrompt}" --completion-promise "ALIGNED" --max-iterations 3`);
      
      return { status: 'proceed' };
    }

    return { status: 'proceed' };
  }
};

export default DocSyncPro;
