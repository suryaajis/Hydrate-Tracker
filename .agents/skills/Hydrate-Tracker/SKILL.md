```markdown
# Hydrate-Tracker Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the core development patterns and conventions used in the Hydrate-Tracker JavaScript codebase. You'll learn about file naming, import/export styles, commit message patterns, and how to write and run tests. This guide is designed to help you quickly onboard and contribute effectively to the project.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - **Example:** `hydrateTracker.js`, `userProfileManager.js`

### Import Style
- Use **relative imports** to include modules.
  - **Example:**
    ```javascript
    import { calculateIntake } from './waterIntakeUtils.js';
    ```

### Export Style
- Use **named exports** for functions and variables.
  - **Example:**
    ```javascript
    // In waterIntakeUtils.js
    export function calculateIntake(amount) {
      // ...
    }
    ```

### Commit Messages
- **Freeform** style, no strict prefixes.
- Average commit message length: ~59 characters.
  - **Example:**  
    ```
    Add hydration reminder feature to dashboard
    ```

## Workflows

### Adding a New Feature
**Trigger:** When you want to introduce a new functionality.
**Command:** `/add-feature`

1. Create a new file using camelCase naming.
2. Write your feature logic using named exports.
3. Import any utilities or dependencies using relative paths.
4. Write or update corresponding test files (`*.test.js`).
5. Commit your changes with a clear, descriptive message.

### Fixing a Bug
**Trigger:** When you need to resolve an issue or error in the codebase.
**Command:** `/fix-bug`

1. Locate the relevant file(s) and make necessary corrections.
2. Ensure all related imports/exports are updated as needed.
3. Update or add tests to cover the bug fix.
4. Commit your changes with a concise message describing the fix.

### Writing Tests
**Trigger:** When adding or updating features/bug fixes.
**Command:** `/write-test`

1. Create or update a test file matching the pattern `*.test.js`.
2. Write test cases for the relevant functions or modules.
3. Run your tests to ensure correctness.

## Testing Patterns

- **Test File Pattern:** Files should match `*.test.js`.
- **Testing Framework:** Not explicitly detected; use standard JavaScript testing practices.
- **Example:**
  ```javascript
  // waterIntakeUtils.test.js
  import { calculateIntake } from './waterIntakeUtils.js';

  test('calculateIntake returns correct value', () => {
    expect(calculateIntake(500)).toBe(500);
  });
  ```

## Commands
| Command       | Purpose                                      |
|---------------|----------------------------------------------|
| /add-feature  | Start the workflow for adding a new feature  |
| /fix-bug      | Begin the process for fixing a bug           |
| /write-test   | Guide for writing or updating tests          |
```
