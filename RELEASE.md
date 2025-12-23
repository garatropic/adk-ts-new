# Release Process

This document describes how to create and publish releases for `create-adk-agent`.

## Prerequisites

1. **NPM Account**: You need an npm account with publish access to `create-adk-agent`
2. **NPM Trusted Publishing**: Configure trusted publisher on npm (see Setup below)
3. **GitHub Token**: Already available as `GITHUB_TOKEN` in Actions

## Setup (One-time)

### Configure npm Trusted Publishing

npm trusted publishing uses OpenID Connect (OIDC) to authenticate GitHub Actions without needing tokens.

1. **Go to npm package settings**:
   - Visit https://www.npmjs.com/package/create-adk-agent/access
   - Or navigate to: Package → Settings → Publishing Access

2. **Add GitHub as trusted publisher**:
   - Click "Add trusted publisher"
   - Provider: **GitHub Actions**
   - Repository: `garatropic/adk-ts-new`
   - Workflow: `release.yml`
   - Environment: (leave empty)
   - Click "Add"

3. **Verify setup**:
   - You should see GitHub Actions listed as a trusted publisher
   - No npm token needed! 🎉

### Benefits of Trusted Publishing

- ✅ More secure (no long-lived tokens)
- ✅ Automatic authentication via OIDC
- ✅ Provenance enabled by default
- ✅ No secrets to rotate or manage

```bash
npm login
```

## Release Workflow

### Option 1: Automated Release (Recommended)

1. **Version and Tag** (locally):

   ```bash
   # Dry run to see what will happen
   pnpm release:dry-run

   # Create version and tag
   pnpm release:version
   # Follow the prompts to select version bump (patch/minor/major)
   ```

2. **Push to GitHub**:

   ```bash
   git push --follow-tags
   ```

3. **Automated Publishing**:
   - GitHub Actions will automatically:
     - Run tests
     - Build packages
     - Publish to npm
     - Create GitHub release

### Option 2: Manual Release

1. **Build and Test**:

   ```bash
   pnpm nx run-many -t build
   pnpm nx run-many -t test
   ```

2. **Version**:

   ```bash
   pnpm release:version
   ```

3. **Publish**:

   ```bash
   cd packages/create-adk-agent
   npm publish --access public
   ```

4. **Push tags**:
   ```bash
   git push --follow-tags
   ```

## Release Checklist

Before releasing:

- [ ] All tests pass: `pnpm nx run-many -t test`
- [ ] Build succeeds: `pnpm nx run-many -t build`
- [ ] CHANGELOG.md is updated
- [ ] README.md is up to date
- [ ] Test package locally: `cd packages/create-adk-agent && npm pack`
- [ ] Test CLI works: `node packages/create-adk-agent/bin/create-adk-agent.js test-project`

## Version Strategy

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (0.0.x): Bug fixes, documentation updates
- **Minor** (0.x.0): New features, backward compatible
- **Major** (x.0.0): Breaking changes

## Tag Format

Tags should follow the format:

- `create-adk-agent@x.y.z` (preferred)
- or `vx.y.z` (also supported)

Example: `create-adk-agent@0.1.0`

## Troubleshooting

### Publishing fails with authentication error

```bash
npm login
npm whoami  # Verify you're logged in
```

### Tag already exists

```bash
git tag -d create-adk-agent@x.y.z  # Delete locally
git push origin :refs/tags/create-adk-agent@x.y.z  # Delete remotely
```

### Build fails in CI

Check the workflow logs:
https://github.com/garatropic/adk-ts-new/actions

## Testing Releases

Before publishing to npm, test the package:

```bash
# Build and pack
cd packages/create-adk-agent
npm pack

# Install locally in a test directory
cd /tmp
npm install /path/to/create-adk-agent-x.y.z.tgz

# Test the CLI
npx create-adk-agent my-test-agent
```

## Post-Release

After a successful release:

1. Verify package on npm: https://www.npmjs.com/package/create-adk-agent
2. Test installation: `npx create-adk-agent@latest test-project`
3. Update project documentation if needed
4. Announce the release (Twitter, Discord, etc.)

## References

- [Nx Release Documentation](https://nx.dev/nx-api/nx/documents/release)
- [npm Publishing Documentation](https://docs.npmjs.com/cli/v10/commands/npm-publish)
- [Semantic Versioning](https://semver.org/)
