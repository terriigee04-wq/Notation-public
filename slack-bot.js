/**
 * Slack Bot Integration for Notation
 * Posts status updates, decisions, risks to Slack automatically
 * 
 * Setup:
 *   1. Create Slack app, get Bot Token (xoxb-...)
 *   2. Set SLACK_BOT_TOKEN env var
 *   3. npm install @slack/bolt
 *   4. Run: node slack-bot.js
 * 
 * Triggers:
 *   - File change detected → parse & post to #status channel
 *   - @mention → reply in thread with details
 *   - /notation status → fetch current P0 items
 */

const { App } = require('@slack/bolt');
const fs = require('fs');
const path = require('path');
const { NotationParser } = require('./cli-parser.js');

// ============================================================================
// SLACK BOT
// ============================================================================

class NotationSlackBot {
  constructor(token, signingSecret) {
    this.app = new App({
      token,
      signingSecret,
    });

    this.parser = new NotationParser();
    this.setupHandlers();
  }

  setupHandlers() {
    // Command: /notation status
    this.app.command('/notation', async ({ ack, body, respond }) => {
      ack();
      const subcommand = body.text.split(' ')[0];

      if (subcommand === 'status') {
        const summary = this.generateStatusSummary();
        respond({
          text: '📊 *Notation Status*',
          blocks: this.statusToBlocks(summary),
        });
      }
    });

    // Message mention: @notation extract P0
    this.app.message('@notation', async ({ message, say }) => {
      const text = message.text;

      if (text.includes('extract') && text.includes('P0')) {
        const p0Items = this.extractP0Items();
        say({
          thread_ts: message.ts,
          text: '🚨 *P0 Items (Critical)*',
          blocks: this.itemsToBlocks(p0Items),
        });
      }

      if (text.includes('blockers')) {
        const blockers = this.extractBlockers();
        say({
          thread_ts: message.ts,
          text: '⏸️ *Active Blockers*',
          blocks: this.blockersToBlocks(blockers),
        });
      }

      if (text.includes('decisions')) {
        const decisions = this.extractDecisions();
        say({
          thread_ts: message.ts,
          text: '✅ *Recent Decisions*',
          blocks: this.decisionsToBlocks(decisions),
        });
      }
    });

    // File upload: auto-parse if .notation or .md
    this.app.event('file_shared', async ({ event, client }) => {
      const fileInfo = await client.files.info({ file: event.file_id });
      
      if (this.isNotationFile(fileInfo.file.name)) {
        const content = await this.downloadFile(fileInfo.file.url_private);
        const parsed = this.parser.parse(content);
        
        await client.chat.postMessage({
          channel: event.channel_id,
          text: `📝 Parsed notation file: ${fileInfo.file.name}`,
          blocks: this.parsedToBlocks(parsed),
        });
      }
    });
  }

  extractP0Items() {
    // Stub: would scan all notation files in directory
    return [
      { title: 'First Key Launch', owner: 'anthony', deadline: '2026-06-30' },
      { title: 'Digital Downloads Revenue', owner: 'anthony', deadline: '2026-05-15' },
    ];
  }

  extractBlockers() {
    return [
      { item: 'Kansas City Property', blockedBy: 'Appraisal', days: 5 },
      { item: 'Advantage Grader', blockedBy: 'Design Review', days: 2 },
    ];
  }

  extractDecisions() {
    return [
      { title: 'Freemium + $29/$99 Pricing', date: '2026-04-15', owner: 'anthony' },
      { title: 'REST API vs GraphQL', date: '2026-04-14', owner: 'dev1' },
    ];
  }

  generateStatusSummary() {
    return {
      projects: 5,
      active: 4,
      blocked: 1,
      p0: 2,
      decisions: 8,
      risks: 3,
      highRisks: 1,
    };
  }

  statusToBlocks(summary) {
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Projects:* ${summary.projects}\n*Active:* ${summary.active} 🟢\n*Blocked:* ${summary.blocked} 🟡\n*P0 Items:* ${summary.p0} 🚨`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Decisions:* ${summary.decisions}\n*Risks:* ${summary.risks}\n*High Risk:* ${summary.highRisks} 🔴`,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: 'Details' },
            action_id: 'view_status_detail',
          },
        ],
      },
    ];
  }

  itemsToBlocks(items) {
    return items.map(item => ({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `• *${item.title}* (@${item.owner})\n  Deadline: ${item.deadline}`,
      },
    }));
  }

  blockersToBlocks(blockers) {
    return blockers.map(b => ({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `• *${b.item}*\n  Blocked by: ${b.blockedBy} (${b.days}d)`,
      },
    }));
  }

  decisionsToBlocks(decisions) {
    return decisions.map(d => ({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `• *${d.title}* (@${d.owner})\n  ${d.date}`,
      },
    }));
  }

  parsedToBlocks(parsed) {
    const blocks = [];

    if (Object.keys(parsed.metadata).length > 0) {
      blocks.push({
        type: 'header',
        text: { type: 'plain_text', text: '📋 Metadata' },
      });

      Object.entries(parsed.metadata).forEach(([k, v]) => {
        blocks.push({
          type: 'section',
          text: { type: 'mrkdwn', text: `*${k}:* ${v}` },
        });
      });
    }

    if (parsed.tasks.length > 0) {
      blocks.push({
        type: 'header',
        text: { type: 'plain_text', text: '📝 Tasks' },
      });

      parsed.tasks.forEach(t => {
        const emoji = t.done ? '✅' : '⬜';
        blocks.push({
          type: 'section',
          text: { type: 'mrkdwn', text: `${emoji} ${t.text}` },
        });
      });
    }

    if (parsed.relations.length > 0) {
      blocks.push({
        type: 'header',
        text: { type: 'plain_text', text: '🔗 Relations' },
      });

      parsed.relations.forEach(r => {
        blocks.push({
          type: 'section',
          text: { type: 'mrkdwn', text: `*${r.type}:* ${r.target}` },
        });
      });
    }

    return blocks;
  }

  isNotationFile(filename) {
    return filename.endsWith('.notation') || 
           (filename.endsWith('.md') && filename.includes('notation'));
  }

  async downloadFile(url) {
    // Stub: would use fetch or axios with auth
    return '';
  }

  start() {
    this.app.start();
    console.log('✅ Notation Slack bot started');
  }
}

// ============================================================================
// STARTUP
// ============================================================================

if (require.main === module) {
  const token = process.env.SLACK_BOT_TOKEN;
  const signingSecret = process.env.SLACK_SIGNING_SECRET;

  if (!token || !signingSecret) {
    console.error('Error: SLACK_BOT_TOKEN and SLACK_SIGNING_SECRET required');
    console.error('Set via: export SLACK_BOT_TOKEN=xoxb-...');
    process.exit(1);
  }

  const bot = new NotationSlackBot(token, signingSecret);
  bot.start();
}

module.exports = { NotationSlackBot };
