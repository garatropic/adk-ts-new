# Quick Release Guide

## First-time Setup

### Configure npm Trusted Publishing (More Secure! ✅)

npm trusted publishing uses OIDC - no tokens needed!

1. **Go to npm package settings**:
   - Visit: https://www.npmjs.com/package/create-adk-agent/access
   - Click "Manage publishing access"

2. **Add GitHub as trusted publisher**:
   - Click "Add trusted publisher"
   - Provider: **GitHub Actions**
   - Repository: `garatropic/adk-ts-new`
   - Workflow: `release.yml`
   - Environment: (leave empty)
   - Click "Add"

✅ Done! No NPM_TOKEN secret needed - authentication happens automatically via OIDC.

## Creating a Release

### 1. Make sure everything is clean

```bash
git status  # Should be clean
pnpm nx run-many -t build test  # All should pass
```

### 2. Create version and tag

```bash
# Interactive - will ask for version type
pnpm release:version

# Or specify version directly
pnpm release:version patch  # 0.0.2 -> 0.0.3
pnpm release:version minor  # 0.0.2 -> 0.1.0
pnpm release:version major  # 0.0.2 -> 1.0.0
```

This will:

- Build all packages
- Update version in package.json
- Update CHANGELOG.md
- Create a git commit
- Create a git tag

### 3. Push to trigger automated publishing

```bash
git push --follow-tags
```

This will trigger GitHub Actions to:

- ✅ Run tests
- ✅ Build packages
- ✅ Publish to npm
- ✅ Create GitHub release

### 4. Verify

Check:

- GitHub Actions: https://github.com/garatropic/adk-ts-new/actions
- npm package: https://www.npmjs.com/package/create-adk-agent
- GitHub releases: https://github.com/garatropic/adk-ts-new/releases

## Testing Before Release

```bash
# Dry run to see what would happen
pnpm release:dry-run

# Build and test locally
cd packages/create-adk-agent
npm pack
npm install -g ./create-adk-agent-*.tgz
create-adk-agent test-project
```

## Troubleshooting

**"npm provenance statement could not be generated"**

- Make sure trusted publishing is configured on npm
- Check that the workflow file is named exactly `release.yml`
- Verify `id-token: write` permission is set in workflow

**"Forbidden - you do not have permission to publish"**

- Configure trusted publishing on npm (see setup above)
- Or add yourself as a collaborator on the npm package

**"Tag already exists"**

```bash
git tag -d create-adk-agent@x.y.z
git push origin :refs/tags/create-adk-agent@x.y.z
pnpm release:version
```

**"Build failed"**

- Check locally: `pnpm nx run-many -t build`
- Fix errors and try again

## Next Steps After Release

1. Test the published package: `npx create-adk-agent@latest my-test`
2. Update documentation if needed
3. Announce the release 🎉
