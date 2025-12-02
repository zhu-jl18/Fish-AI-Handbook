---
title: "Github"
description: "Automate your workflow with GitHub Actions."
tab:
  label: Github
  order: 10
---

# GitHub Automation

Stop doing things manually. If you are running tests on your local machine before pushing, you are wasting time. If you are manually deploying, you are asking for trouble.

GitHub Actions is the answer. It's built-in, it's powerful, and it's free for public repositories.

## The Concepts: CI/CD vs Hooks vs Actions

People confuse these terms. Let's get them straight.

### 1. Hooks (The Trigger)
Hooks are **events**. They are the "when".
- "When code is pushed..."
- "When a PR is opened..."
- "When a release is created..."

In GitHub Actions, these are defined in the `on:` section of your workflow file.

### 2. CI/CD (The Process)
CI/CD is the **what**. It's the methodology.
- **CI (Continuous Integration)**: Automatically merging code changes into a shared repository. This usually involves running tests and linters to ensure the new code doesn't break anything.
- **CD (Continuous Deployment/Delivery)**: Automatically deploying the code to production (or staging) after it passes CI.

### 3. Actions (The Platform)
GitHub Actions is the **how**. It's the platform that runs your CI/CD workflows when Hooks fire. It provides the servers (runners) and the orchestration engine.

## The Workflow Anatomy

A workflow is a configurable automated process defined by a YAML file in `.github/workflows/`.

Let's dissect `.github/workflows/check-routes-typecheck.yml` from this repository. This is a **CI** workflow.

```yaml
name: check:routes and type-check

# THE HOOK (Trigger)
on:
  pull_request:
    branches: [main, master]

# THE PROCESS (Jobs)
jobs:
  validate:
    name: Validate route structure and types
    runs-on: ubuntu-latest  # The Runner (Virtual Machine)
    timeout-minutes: 15

    steps:
      # STEP 1: Get the code
      - name: Checkout
        uses: actions/checkout@v4

      # STEP 2: Prepare the environment
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      # STEP 3: Install dependencies
      - name: Install minimal deps for Astro check (no-save)
        run: |
          npm i --no-save astro@^5 @astrojs/check@^0.9 @astrojs/mdx@^4 @astrojs/sitemap@^3 typescript@^5

      # STEP 4: Run the actual tests
      - name: check:routes
        run: node scripts/check-route-structure.js

      - name: type-check (astro check)
        run: npx astro check
```

### Detailed Breakdown

#### `on:` (The Hook)
This defines when the workflow runs.
- `pull_request`: Runs when a PR is opened or updated.
- `branches: [main, master]`: Only for PRs targeting these branches.
- **Why?** We want to catch errors *before* they merge into the main codebase.

#### `jobs:`
A workflow is made of jobs. Jobs run in parallel by default.
- `runs-on: ubuntu-latest`: Tells GitHub to provision a fresh Ubuntu VM for this job.

#### `steps:`
A job is a sequence of steps. Steps run sequentially on the same runner.

1.  **`uses: actions/checkout@v4`**:
    - This is a pre-packaged Action. You don't write the git commands yourself.
    - It checks out your repository so the workflow can access your code.

2.  **`uses: actions/setup-node@v4`**:
    - Another pre-packaged Action.
    - Installs Node.js.
    - `cache: npm`: Automatically caches `node_modules`. This speeds up subsequent runs significantly.

3.  **`run: ...`**:
    - Executes shell commands.
    - `npm i --no-save ...`: Installs dependencies without modifying `package.json`. This is crucial for CI to ensure a clean state.

4.  **`run: node scripts/...`**:
    - Runs our custom validation script. If this script exits with a non-zero code (error), the step fails, the job fails, and the PR is blocked.

## Why This Matters

If `check:routes` fails, the PR is blocked. No human has to waste time reviewing code that breaks the basic structure.

If `type-check` fails, the PR is blocked. We don't want runtime errors that could have been caught at compile time.

## Conclusion

- **Hooks** trigger the work.
- **Actions** do the work.
- **CI/CD** is the result.

Automate everything. If you find yourself typing the same command twice, put it in a script. If you run that script more than once a day, put it in a GitHub Action.
