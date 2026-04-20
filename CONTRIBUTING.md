# Contributing to Notation

Thanks for your interest in Notation! We're building a community around better project management.

## Getting Started

### Prerequisites
- Node.js 14+
- npm 6+
- Git

### Setup

```bash
# Clone the repo
git clone https://github.com/terriigee04-wq/Notation-public.git
cd Notation-public

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
# Edit .env with your values (optional for local development)
```

### Running Locally

```bash
# Test the CLI parser
node cli-parser.js parse test-notation.md --format=json

# Start Slack bot (requires SLACK_BOT_TOKEN)
npm run slack
```

## How to Contribute

### Reporting Bugs
Open an issue with:
- Description of the bug
- Steps to reproduce
- Expected vs. actual behavior
- Your environment (Node version, OS)

### Suggesting Features
Open an issue with `[FEATURE]` prefix:
- Clear description of the feature
- Use case / why it matters
- Example notation if applicable

### Code Contributions

1. **Fork** the repo
2. **Create a branch**: `git checkout -b feature/your-feature`
3. **Make changes** following code style below
4. **Test**: Run CLI on test files, verify parsing accuracy
5. **Commit**: `git commit -m "feat: add feature description"`
6. **Push**: `git push origin feature/your-feature`
7. **Open a PR** with description of changes

### Code Style

- Use 2-space indentation
- No trailing whitespace
- Comments for complex logic
- Keep functions small and focused
- Variable names should be descriptive

Example:
```javascript
// Good
function parseMetadata(line) {
  const match = line.match(/^\[([A-Z_]+)\]\s*(.+)$/);
  if (match) {
    return { field: match[1], value: match[2] };
  }
  return null;
}

// Avoid
function parse(l) {
  let m = l.match(/^\[([A-Z_]+)\]\s*(.+)$/);
  return m ? {f: m[1], v: m[2]} : null;
}
```

## Testing

### Adding Tests
Create test cases in `/tests` directory:

```javascript
// tests/parser.test.js
const { NotationParser } = require('../cli-parser.js');

test('parses metadata correctly', () => {
  const parser = new NotationParser();
  const result = parser.parse('[PROJECT] Test\n[STATUS] 🟢 ACTIVE');
  expect(result.metadata.PROJECT).toBe('Test');
  expect(result.status).toBe('ACTIVE');
});
```

### Running Tests
```bash
npm test
```

## Documentation

### Updating README
If you change features, update the README with:
- New syntax examples
- Updated CLI commands
- Breaking changes (if any)

### Adding Examples
Submit real-world notation files to `examples/` directory:
- Project tracking
- Decision logs
- Risk registers
- Meeting notes
- Custom use cases

## Commit Message Format

```
feat: add new feature
fix: resolve parsing bug
docs: update README
refactor: improve parser logic
test: add unit tests for dates
chore: update dependencies
```

## Pull Request Process

1. Update README if adding features
2. Add/update tests for new functionality
3. Ensure all tests pass: `npm test`
4. Include description of changes
5. Link any related issues
6. Squash commits if cleanup needed before merge

## Code of Conduct

- Be respectful and inclusive
- Assume good intent
- Focus on ideas, not people
- Help others learn

## Questions?

Open an issue or email hello@notation.dev

---

**Thank you for contributing to Notation!** 🎉

Every contribution — code, documentation, ideas, feedback — helps make Notation better.
