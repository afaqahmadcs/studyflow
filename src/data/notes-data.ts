import { Note } from "@/types/notes";

export const INITIAL_NOTES: Note[] = [
  {
    id: "note-1",
    title: "Raft Consensus Protocol & Leader Election Breakdown",
    subjectCode: "CS401",
    subjectName: "Distributed Systems",
    tags: ["#raft", "#midterm", "#consensus", "#algorithms"],
    isPinned: true,
    createdAt: "Oct 24, 2025",
    updatedAt: "24m ago",
    readTimeMinutes: 5,
    wordCount: 1420,
    content: `## 1. Core Mechanics: Term Numbers as Logical Clocks

In the Raft consensus algorithm, time is divided into arbitrary length \`terms\` numbered with consecutive integers. Each term begins with an election, in which one or more candidates attempt to reach leader status through majority vote accumulation.

> **Exam Tip • Prof. Thorne (Midterm Priority)**
> Split votes are resolved through **randomized election timeouts** (typically configured between 150ms–300ms). This spreads out votes so that a single candidate times out first, establishes leadership, and heartbeats prior to any competing timeouts.

### Mastery Verification Checklist
- [x] Master RequestVote RPC parameters and safety requirements
- [x] Verify Leader AppendEntries periodic heartbeat interval
- [ ] Practice election timeout derivation formula & Byzantine safety proof

## 2. Remote Procedure Call (RPC) Signatures

Candidates initiate election sequences by broadcasting the following Go structure to all peers concurrently via parallel goroutines:

\`\`\`go
// Candidate RequestVote RPC invocation parameters
type RequestVoteArgs struct {
    Term         int // candidate’s current term
    CandidateId  int // candidate requesting vote
    LastLogIndex int // index of candidate’s last log entry
    LastLogTerm  int // term of candidate’s last log entry
}

type RequestVoteReply struct {
    Term        int  // currentTerm, for candidate to update itself
    VoteGranted bool // true means candidate received vote
}
\`\`\`

## 3. Safety Invariants & Election Guardrails

Raft guarantees that if any server has applied a particular log entry at a given index to its state machine, no other server will ever apply a different log entry for the same index.

- **Election Safety**: At most one leader can be elected in a given term: \`|Leaders(t)| ≤ 1\` for all valid terms \`t\`.
- **Leader Append-Only**: A leader never overwrites or truncates its own log entries; it only appends new client entries sequentially.
- **Log Matching**: If two logs contain an entry with the same index and term, then the logs are identical in all entries up through the given index.`,
    checklistItems: [
      { id: "c1", text: "Master RequestVote RPC parameters and safety requirements", done: true },
      { id: "c2", text: "Verify Leader AppendEntries periodic heartbeat interval", done: true },
      { id: "c3", text: "Practice election timeout derivation formula & Byzantine safety proof", done: false },
    ],
  },
  {
    id: "note-2",
    title: "Kernel Virtual Memory Paging & TLB Flushes",
    subjectCode: "CS450",
    subjectName: "Operating Systems",
    tags: ["#virtual-memory", "#pointers", "#lab-notes"],
    isPinned: true,
    createdAt: "Oct 25, 2025",
    updatedAt: "Today 09:15 AM",
    readTimeMinutes: 4,
    wordCount: 980,
    content: `## 1. Multi-Level Page Tables & Architectural Overview

Modern x86-64 operating systems utilize a 4-level or 5-level paging scheme to map 48-bit or 57-bit virtual addresses into physical frames without requiring monolithic linear arrays in memory.

### Address Translation Levels:
1. **PML4** (Page Map Level 4): Bits [47:39], indexed by CR3 register
2. **PDPT** (Page Directory Pointer Table): Bits [38:30]
3. **PD** (Page Directory): Bits [29:21]
4. **PT** (Page Table): Bits [20:12]
5. **Physical Offset**: Bits [11:0] (4096-byte page offset)

### Translation Lookaside Buffer (TLB) Invalidation
When modifying page permissions or switching process address spaces:
- \`invlpg [addr]\` invalidates a single TLB entry
- Writing to CR3 register flushes all non-global TLB entries
- Multi-core SMP architectures require **TLB shootdown interrupts** to synchronize cache entries across CPU cores.`,
    checklistItems: [
      { id: "c4", text: "Trace virtual address 0x7FFF_8000_1000 through PML4 hierarchy", done: true },
      { id: "c5", text: "Implement copy-on-write page fault handler in kernel lab", done: false },
    ],
  },
  {
    id: "note-3",
    title: "B+ Tree Index Concurrency & Latch Crabbing",
    subjectCode: "CS320",
    subjectName: "Database Systems",
    tags: ["#btree", "#concurrency", "#algorithms"],
    isPinned: false,
    createdAt: "Oct 26, 2025",
    updatedAt: "Yesterday 04:00 PM",
    readTimeMinutes: 6,
    wordCount: 1250,
    content: `## 1. Latch Crabbing Protocol for Concurrent B+ Trees

Latch crabbing (or lock coupling) allows multiple threads to read and modify database index pages concurrently without causing deadlock or corrupting node sibling pointers.

### Search Protocol:
1. Acquire **Read (Shared)** latch on Root node.
2. Read child pointer.
3. Acquire **Read (Shared)** latch on Child node.
4. Release Read latch on Parent node.
5. Repeat down to leaf level.

### Insert / Delete Protocol:
1. Acquire **Write (Exclusive)** latch on Root node.
2. Check if Child is *safe* (i.e. has spare capacity for inserts or more than min keys for deletes).
3. If Child is safe, release all locks on Ancestors!
4. Acquire Write latch on Child.
5. Repeat down to leaf level.`,
    checklistItems: [
      { id: "c6", text: "Implement safe node heuristic for node splits", done: true },
      { id: "c7", text: "Benchmark reader throughput under high latch contention", done: false },
    ],
  },
  {
    id: "note-4",
    title: "Eigenvalues, SVD & Spectral Decomposition Proofs",
    subjectCode: "MATH310",
    subjectName: "Linear Algebra",
    tags: ["#linear-algebra", "#proofs", "#exam-cheatsheet"],
    isPinned: false,
    createdAt: "Oct 24, 2025",
    updatedAt: "Oct 24, 2025",
    readTimeMinutes: 4,
    wordCount: 890,
    content: `## 1. Spectral Theorem for Symmetric Matrices

Every real symmetric matrix $A \\in \\mathbb{R}^{n \\times n}$ can be diagonalized by an orthogonal matrix $Q$:
$$A = Q \\Lambda Q^T$$
Where:
- $\\Lambda = \\text{diag}(\\lambda_1, \\dots, \\lambda_n)$ contains real eigenvalues.
- $Q = [q_1, \\dots, q_n]$ has orthonormal columns ($Q^T Q = I$).

### Singular Value Decomposition (SVD)
For any arbitrary matrix $A \\in \\mathbb{R}^{m \\times n}$:
$$A = U \\Sigma V^T$$
- $U \\in \\mathbb{R}^{m \\times m}$ orthogonal eigenvectors of $A A^T$
- $V \\in \\mathbb{R}^{n \\times n}$ orthogonal eigenvectors of $A^T A$
- $\\Sigma \\in \\mathbb{R}^{m \\times n}$ diagonal singular values $\\sigma_i = \\sqrt{\\lambda_i}$`,
    checklistItems: [
      { id: "c8", text: "Memorize proof of real eigenvalues for symmetric matrices", done: true },
      { id: "c9", text: "Practice low-rank matrix approximation via truncated SVD", done: true },
    ],
  },
  {
    id: "note-5",
    title: "Midterm Formula Cheatsheet - Allowed Sheet",
    subjectCode: "CS401",
    subjectName: "Distributed Systems",
    tags: ["#cheatsheet", "#exam", "#exam-cheatsheet"],
    isPinned: false,
    createdAt: "Oct 23, 2025",
    updatedAt: "Oct 23, 2025",
    readTimeMinutes: 3,
    wordCount: 650,
    content: `## 1. High-Yield Distributed Systems Equations

### Lamport Logical Clock Update Rules:
- Before sending event: $C_i = C_i + 1$
- Upon receiving message with timestamp $t$: $C_j = \\max(C_j, t) + 1$

### Quorum Consensus:
$$V_R + V_W > V \\quad \\text{and} \\quad V_W > V / 2$$
Ensures read-write overlap and prevents write-write split-brain.

### Byzantine Fault Tolerance Minimum Nodes:
$$N \\ge 3f + 1$$
To tolerate $f$ Byzantine (arbitrary/malicious) faulty nodes in an asynchronous network.`,
    checklistItems: [
      { id: "c10", text: "Print physical copy for allowed 1-page formula sheet", done: false },
    ],
  },
];
