# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Resume Tailoring AI is a Next.js 14 SaaS application that helps job seekers tailor their resumes to specific job descriptions using Google's Gemini AI. The system takes a LaTeX resume, analyzes a job description, and generates a tailored resume optimized for ATS systems, then compiles it to PDF through Overleaf.

## Development Commands

### Essential Commands
```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Code formatting
npm run format
```

### Testing Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage

# Run specific test file
npm test -- --testPathPattern=pricing

# Run specific test
npm test -- --testNamePattern="should render correctly"
```

### Database Commands
```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# View database in browser
npx prisma studio

# Reset database
npx prisma db reset
```

## Architecture Overview

### Core Application Flow
1. **Authentication**: NextAuth.js with Google OAuth handles user sessions
2. **Resume Upload**: Users upload LaTeX resume files via `/api/upload`
3. **AI Processing**: `/api/tailor` analyzes job descriptions using Gemini AI and tailors resume content
4. **LaTeX Compilation**: `/api/compile` sends processed LaTeX to Overleaf for PDF generation
5. **Rate Limiting**: Upstash Redis provides request throttling (5 requests per 60 seconds)

### Key API Endpoints
- `POST /api/tailor` - Core AI tailoring endpoint using Gemini API
- `POST /api/compile` - Overleaf LaTeX compilation with template selection
- `POST /api/upload` - Resume file upload handling
- `POST /api/download` - PDF download management
- `GET /api/auth/[...nextauth]` - Authentication routes

### Database Schema (Prisma + SQLite)
- **Users**: NextAuth.js user management with Google OAuth
- **Resumes**: LaTeX content storage with versioning (original + tailored)
- **Usage**: Tracking API usage, tokens, and costs per user
- **Templates**: Enum-based template system (MODERN, CLASSIC, EXECUTIVE, etc.)

### AI Integration Architecture
The `/api/tailor` endpoint implements:
- **Dynamic prompting**: Job description analysis extracts keywords for targeted tailoring
- **Model fallback**: Tries multiple Gemini models (`gemini-1.5-pro`, `gemini-1.5-flash`, `gemini-pro`)
- **LaTeX validation**: Ensures structural integrity of generated content
- **Retry logic**: Handles API failures with exponential backoff

### Component Structure
- **shadcn/ui**: Base UI components in `src/components/ui/`
- **Layout components**: Navbar, theme provider, error boundaries
- **Feature components**: Template selector, protected routes, loading states
- **Page components**: App router pages with loading and error states

## Environment Configuration

Required environment variables (see `.env.example`):
```bash
GEMINI_API_KEY=your-gemini-api-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Testing Architecture

### Test Configuration
- **Framework**: Jest with SWC for fast TypeScript/React transpilation
- **Testing Library**: React Testing Library with jest-dom matchers
- **JSX Runtime**: Configured for automatic JSX runtime (no React imports needed)
- **Mocking**: Comprehensive mocks for NextAuth, Next.js routing, and UI components

### Test Structure
- Component tests in `__tests__/` directories alongside components
- API route tests with `route.test.ts` files
- Mocked external dependencies (Gemini API, Overleaf, Redis)

### Running Tests
Tests use SWC transform with automatic JSX runtime configuration. The jest.setup.ts file provides extensive mocking for:
- NextAuth authentication
- Next.js navigation hooks
- UI component libraries
- External API services

## Rate Limiting

The application implements sliding window rate limiting:
- 5 requests per 60 seconds per IP address
- Uses Upstash Redis for distributed rate limiting
- Applied to AI-intensive endpoints (`/api/tailor`, `/api/compile`)

## LaTeX Template System

Templates are applied in `/api/compile` with predefined document classes:
- **Modern**: `moderncv` with modern styling
- **Classic**: `moderncv` with classic styling  
- **Executive**: `moderncv` with executive styling
- Additional templates: ACADEMIC, CREATIVE, TECHNICAL, MINIMAL, PROFESSIONAL

## Development Notes

### AI Model Management
The system automatically tries multiple Gemini models in order of preference. When adding new models, update the `SUPPORTED_MODELS` array in `/api/tailor/route.ts`.

### Database Migrations
Use `npx prisma db push` for development schema changes. For production, generate proper migrations with `npx prisma migrate dev`.

### Error Handling
All API routes implement comprehensive error handling with structured error responses including details and suggestions for resolution.

### Type Safety
The application uses strict TypeScript throughout. Run `npm run type-check` to verify type safety before commits.

Development Partnership
We're building production-quality code together. Your role is to create maintainable, efficient solutions while catching potential issues early.

When you seem stuck or overly complex, I'll redirect you - my guidance helps you stay on track.

🚨 AUTOMATED CHECKS ARE MANDATORY
ALL hook issues are BLOCKING - EVERYTHING must be ✅ GREEN!
No errors. No formatting issues. No linting problems. Zero tolerance.
These are not suggestions. Fix ALL issues before continuing.

CRITICAL WORKFLOW - ALWAYS FOLLOW THIS!
Research → Plan → Implement
NEVER JUMP STRAIGHT TO CODING! Always follow this sequence:

Research: Explore the codebase, understand existing patterns
Plan: Create a detailed implementation plan and verify it with me
Implement: Execute the plan with validation checkpoints
When asked to implement any feature, you'll first say: "Let me research the codebase and create a plan before implementing."

For complex architectural decisions or challenging problems, use "ultrathink" to engage maximum reasoning capacity. Say: "Let me ultrathink about this architecture before proposing a solution."

USE MULTIPLE AGENTS!
Leverage subagents aggressively for better results:

Spawn agents to explore different parts of the codebase in parallel
Use one agent to write tests while another implements features
Delegate research tasks: "I'll have an agent investigate the database schema while I analyze the API structure"
For complex refactors: One agent identifies changes, another implements them
Say: "I'll spawn agents to tackle different aspects of this problem" whenever a task has multiple independent parts.

Reality Checkpoints
Stop and validate at these moments:

After implementing a complete feature
Before starting a new major component
When something feels wrong
Before declaring "done"
WHEN HOOKS FAIL WITH ERRORS ❌
Run: make fmt && make test && make lint

Why: You can lose track of what's actually working. These checkpoints prevent cascading failures.

🚨 CRITICAL: Hook Failures Are BLOCKING
When hooks report ANY issues (exit code 2), you MUST:

STOP IMMEDIATELY - Do not continue with other tasks
FIX ALL ISSUES - Address every ❌ issue until everything is ✅ GREEN
VERIFY THE FIX - Re-run the failed command to confirm it's fixed
CONTINUE ORIGINAL TASK - Return to what you were doing before the interrupt
NEVER IGNORE - There are NO warnings, only requirements
This includes:

Formatting issues (gofmt, black, prettier, etc.)
Linting violations (golangci-lint, eslint, etc.)
Forbidden patterns (time.Sleep, panic(), interface{})
ALL other checks
Your code must be 100% clean. No exceptions.

Recovery Protocol:

When interrupted by a hook failure, maintain awareness of your original task
After fixing all issues and verifying the fix, continue where you left off
Use the todo list to track both the fix and your original task
Working Memory Management
When context gets long:
Re-read this CLAUDE.md file
Summarize progress in a PROGRESS.md file
Document current state before major changes
Maintain TODO.md:
## Current Task
- [ ] What we're doing RIGHT NOW

## Completed  
- [x] What's actually done and tested

## Next Steps
- [ ] What comes next
Go-Specific Rules
FORBIDDEN - NEVER DO THESE:
NO interface{} or any{} - use concrete types!
NO time.Sleep() or busy waits - use channels for synchronization!
NO keeping old and new code together
NO migration functions or compatibility layers
NO versioned function names (processV2, handleNew)
NO custom error struct hierarchies
NO TODOs in final code
AUTOMATED ENFORCEMENT: The smart-lint hook will BLOCK commits that violate these rules.
When you see ❌ FORBIDDEN PATTERN, you MUST fix it immediately!

Required Standards:
Delete old code when replacing it
Meaningful names: userID not id
Early returns to reduce nesting
Concrete types from constructors: func NewServer() *Server
Simple errors: return fmt.Errorf("context: %w", err)
Table-driven tests for complex logic
Channels for synchronization: Use channels to signal readiness, not sleep
Select for timeouts: Use select with timeout channels, not sleep loops
Implementation Standards
Our code is complete when:
? All linters pass with zero issues
? All tests pass
? Feature works end-to-end
? Old code is deleted
? Godoc on all exported symbols
Testing Strategy
Complex business logic ? Write tests first
Simple CRUD ? Write tests after
Hot paths ? Add benchmarks
Skip tests for main() and simple CLI parsing
Project Structure
cmd/        # Application entrypoints
internal/   # Private code (the majority goes here)
pkg/        # Public libraries (only if truly reusable)
Problem-Solving Together
When you're stuck or confused:

Stop - Don't spiral into complex solutions
Delegate - Consider spawning agents for parallel investigation
Ultrathink - For complex problems, say "I need to ultrathink through this challenge" to engage deeper reasoning
Step back - Re-read the requirements
Simplify - The simple solution is usually correct
Ask - "I see two approaches: [A] vs [B]. Which do you prefer?"
My insights on better approaches are valued - please ask for them!

Performance & Security
Measure First:
No premature optimization
Benchmark before claiming something is faster
Use pprof for real bottlenecks
Security Always:
Validate all inputs
Use crypto/rand for randomness
Prepared statements for SQL (never concatenate!)
Communication Protocol
Progress Updates:
✓ Implemented authentication (all tests passing)
✓ Added rate limiting  
✗ Found issue with token expiration - investigating
Suggesting Improvements:
"The current approach works, but I notice [observation]. Would you like me to [specific improvement]?"

Working Together
This is always a feature branch - no backwards compatibility needed
When in doubt, we choose clarity over cleverness
REMINDER: If this file hasn't been referenced in 30+ minutes, RE-READ IT!
Avoid complex abstractions or "clever" code. The simple, obvious solution is probably better, and my guidance helps you stay focused on what matters.