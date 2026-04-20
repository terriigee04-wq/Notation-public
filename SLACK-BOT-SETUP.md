# Slack Bot Setup Guide

## Step 1: Create Slack App

1. Go to https://api.slack.com/apps
2. Click **Create New App** → **From scratch**
3. App name: `Notation`
4. Workspace: Select your workspace
5. Click **Create App**

---

## Step 2: Enable Bot Token & Scopes

1. Left sidebar → **OAuth & Permissions**
2. Scroll to **Scopes** → **Bot Token Scopes**
3. Add these scopes:
   - `chat:write` (post messages)
   - `chat:write.public` (post in public channels)
   - `files:read` (read uploaded files)
   - `commands` (slash commands)
   - `app_mentions:read` (respond to @notation mentions)

4. **Install App to Workspace** (top of page)
5. Authorize when prompted

---

## Step 3: Get Credentials

After authorization, you'll see:

**Bot User OAuth Token:** `xoxb-...` (COPY THIS)
**Signing Secret:** Settings → Basic Information → Signing Secret (COPY THIS)

---

## Step 4: Configure Commands & Events

### Slash Commands
1. Left sidebar → **Slash Commands** → **Create New Command**
2. Command: `/notation`
3. Request URL: `https://your-domain.com/slack/events` (or local tunnel URL)
4. Short Description: "Notation status and insights"
5. Save

### Event Subscriptions
1. Left sidebar → **Event Subscriptions** → Toggle **On**
2. Request URL: `https://your-domain.com/slack/events`
3. Under **Subscribe to bot events**, add:
   - `app_mention` (when @notation mentioned)
   - `file_shared` (when files uploaded)
   - `message.channels` (channel messages)

4. Save

---

## Step 5: Local Testing (Without Real Slack)

Use mock testing first:

```bash
# Set fake credentials
export SLACK_BOT_TOKEN="xoxb-fake-token"
export SLACK_SIGNING_SECRET="fake-secret"

# Run bot in test mode
node slack-bot-mock.js
```

This will:
- Parse notation files locally
- Simulate Slack messages
- Output what would be posted
- No real Slack required

---

## Step 6: Deploy (When Ready)

Option A: **Local tunnel** (testing)
```bash
npx ngrok http 3000
# Copy tunnel URL → Slack app settings → Event Request URL
```

Option B: **Cloud deploy** (production)
- Deploy to Heroku, Railway, or AWS
- Set env vars in deployment platform
- Point Slack Request URL to your domain

Option C: **Serverless** (cheapest)
- Deploy as AWS Lambda + API Gateway
- Slack Request URL points to Lambda endpoint

---

## Environment Setup

Create `.env` file:
```
SLACK_BOT_TOKEN=xoxb-your-token-here
SLACK_SIGNING_SECRET=your-signing-secret-here
SLACK_CHANNEL_STATUS=#status
SLACK_CHANNEL_RISKS=#risks
SLACK_CHANNEL_DECISIONS=#decisions
```

Then in bot code:
```javascript
require('dotenv').config();
const token = process.env.SLACK_BOT_TOKEN;
const signingSecret = process.env.SLACK_SIGNING_SECRET;
```

---

## Testing Checklist

- [ ] Bot token created
- [ ] Signing secret obtained
- [ ] Scopes configured (chat:write, files:read, etc)
- [ ] Slash commands registered
- [ ] Event subscriptions enabled
- [ ] Local mock test passes
- [ ] Real Slack connection works
- [ ] Bot posts messages to #status
- [ ] `/notation status` command returns data
- [ ] File upload parsing works

---

## Common Issues

| Issue | Fix |
|-------|-----|
| "Invalid token" | Check SLACK_BOT_TOKEN format, starts with `xoxb-` |
| Request URL fails | Use ngrok tunnel or deploy first |
| Bot can't post | Check channel membership, add @Notation to channels |
| Commands not responding | Verify slash command URL matches bot endpoint |
| File upload not parsing | Check `files:read` scope is enabled |

---

## Next Steps

1. **Get Slack token** (this document, Steps 1-3)
2. **Share token** securely (1Password, encrypted message)
3. **Test locally** with mock bot
4. **Deploy** to cloud (Heroku/Railway/AWS)
5. **Validate** in real workspace

**Timeline:** Can be running in Slack within 1-2 hours of getting token.

