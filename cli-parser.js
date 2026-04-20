#!/usr/bin/env node

/**
 * Notation Parser CLI
 * Parse notation markdown files into structured JSON, CSV, or alerts
 * 
 * Usage:
 *   node cli-parser.js parse <file> --format json|csv|alerts
 *   node cli-parser.js extract <file> --filter priority=P0,status=BLOCKED
 *   node cli-parser.js graph <directory> --format dot|json
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// PARSER CORE
// ============================================================================

class NotationParser {
  constructor() {
    this.patterns = {
      // Metadata headers: [FIELD] value
      metadata: /^\[([A-Z_]+)\]\s*(.+)$/gm,
      
      // Status codes: 🟢 ACTIVE, ✅ DONE, etc
      statusEmoji: /([🟢🟡🔴⚪✅])\s*([A-Z_]+)/g,
      
      // Priority: P0-P3
      priority: /\[?P([0-3])\]?/g,
      
      // Dates: [by 2026-04-15], [~2026-04-15], [2026-04-15], [ASAP], [BLOCKED_SINCE DATE]
      dateBy: /\[by\s+(\d{4}-\d{2}-\d{2})\]/g,
      dateApprox: /\[~(\d{4}-\d{2}-\d{2})\]/g,
      dateExact: /\[(\d{4}-\d{2}-\d{2})\]/g,
      dateUrgent: /\[(ASAP|BLOCKED_SINCE)\s*([^\]]*)?\]/g,
      
      // Owners/mentions: @username
      mentions: /@([a-zA-Z0-9_-]+)/g,
      
      // Relations: DEPENDS_ON, BLOCKS, BLOCKED_BY
      relations: /(DEPENDS_ON|BLOCKS|BLOCKED_BY|HANDOFF):\s*(.+?)(?=\n|$)/g,
      
      // Checkboxes: [ ] [ x] [x]
      checkbox: /^\s*-\s*\[([x\s])\]\s*(.+)$/gm,
    };
  }

  parse(content) {
    const lines = content.split('\n');
    const result = {
      metadata: {},
      content: [],
      tasks: [],
      relations: [],
      mentions: new Set(),
      dates: [],
      status: null,
      priority: null,
    };

    // Extract metadata headers
    let inMetadata = true;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^\[([A-Z_]+)\]\s*(.+)$/);
      
      if (match) {
        const [, field, value] = match;
        result.metadata[field] = value;
        
        // Special handling
        if (field === 'STATUS') {
          const statusMatch = value.match(/(🟢|🟡|🔴|⚪|✅)\s*([A-Z_]+)/);
          if (statusMatch) result.status = statusMatch[2];
        }
        if (field === 'PRIORITY') {
          const priMatch = value.match(/P([0-3])/);
          if (priMatch) result.priority = parseInt(priMatch[1]);
        }
      } else if (line.trim() === '' || line.startsWith('##') || line.startsWith('#')) {
        inMetadata = false;
      }
    }

    // Extract tasks (checkboxes)
    let match;
    this.patterns.checkbox.lastIndex = 0;
    while ((match = this.patterns.checkbox.exec(content))) {
      result.tasks.push({
        text: match[2],
        done: match[1] !== ' ',
      });
    }

    // Extract mentions
    this.patterns.mentions.lastIndex = 0;
    while ((match = this.patterns.mentions.exec(content))) {
      result.mentions.add(match[1]);
    }

    // Extract dates
    this.patterns.dates.lastIndex = 0;
    while ((match = this.patterns.dates.exec(content))) {
      result.dates.push({
        type: match[1] || 'exact',
        date: match[2],
      });
    }

    // Extract relations
    this.patterns.relations.lastIndex = 0;
    while ((match = this.patterns.relations.exec(content))) {
      result.relations.push({
        type: match[1],
        target: match[2].trim(),
      });
    }

    result.mentions = Array.from(result.mentions);
    return result;
  }

  toJSON(parsed) {
    return JSON.stringify(parsed, null, 2);
  }

  toCSV(parsed) {
    const headers = ['Field', 'Value'];
    const rows = [headers];

    // Metadata rows
    Object.entries(parsed.metadata).forEach(([k, v]) => {
      rows.push([k, v]);
    });

    // Status
    if (parsed.status) rows.push(['STATUS', parsed.status]);
    if (parsed.priority !== null) rows.push(['PRIORITY', `P${parsed.priority}`]);

    // Mentions
    if (parsed.mentions.length) rows.push(['MENTIONS', parsed.mentions.join(', ')]);

    // Dates
    if (parsed.dates.length) {
      parsed.dates.forEach(d => {
        rows.push(['DATE', `${d.type} ${d.date}`]);
      });
    }

    // Relations
    if (parsed.relations.length) {
      parsed.relations.forEach(r => {
        rows.push([r.type, r.target]);
      });
    }

    // Tasks
    if (parsed.tasks.length) {
      rows.push(['TASKS', `${parsed.tasks.filter(t => t.done).length}/${parsed.tasks.length} done`]);
    }

    return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  }

  filter(parsed, filters) {
    const filtered = { ...parsed };

    if (filters.priority !== undefined) {
      if (parsed.priority !== filters.priority) return null;
    }

    if (filters.status !== undefined) {
      if (parsed.status !== filters.status) return null;
    }

    if (filters.owner !== undefined) {
      if (!parsed.mentions.includes(filters.owner)) return null;
    }

    return filtered;
  }
}

// ============================================================================
// CLI HANDLER
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0];
  const file = args[1];
  const options = {};

  for (let i = 2; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const [key, value] = args[i].substring(2).split('=');
      options[key] = value || true;
    }
  }

  return { command, file, options };
}

function main() {
  const { command, file, options } = parseArgs();
  const parser = new NotationParser();

  if (!command || !file) {
    console.log('Usage: cli-parser.js <command> <file> [options]');
    console.log('Commands: parse, extract, graph');
    console.log('Options: --format=json|csv, --filter=key=value');
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(file, 'utf8');
    const parsed = parser.parse(content);

    switch (command) {
      case 'parse':
        const format = options.format || 'json';
        if (format === 'json') {
          console.log(parser.toJSON(parsed));
        } else if (format === 'csv') {
          console.log(parser.toCSV(parsed));
        } else {
          console.error('Unknown format:', format);
          process.exit(1);
        }
        break;

      case 'extract':
        // Filter by criteria
        const filters = {};
        if (options.filter) {
          options.filter.split(',').forEach(f => {
            const [k, v] = f.split('=');
            if (k === 'priority') filters.priority = parseInt(v.replace('P', ''));
            else if (k === 'status') filters.status = v;
            else if (k === 'owner') filters.owner = v;
          });
        }

        const result = parser.filter(parsed, filters);
        if (result) {
          console.log(parser.toJSON(result));
        } else {
          console.log('No matches');
        }
        break;

      case 'graph':
        // Dependency graph (stub)
        console.log('digraph {');
        parsed.relations.forEach(r => {
          if (r.type === 'BLOCKS') {
            console.log(`  "${parsed.metadata.PROJECT || 'Unknown'}" -> "${r.target}"`);
          }
        });
        console.log('}');
        break;

      default:
        console.error('Unknown command:', command);
        process.exit(1);
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NotationParser };
}

// Run CLI if invoked directly
if (require.main === module) {
  main();
}
