const STORAGE_KEY = "notecred_data_v1";

const DEFAULT_STATE = {
  user: { name: "Tanuj", email: "tanuj@sau.ac.in", batch: "1st Year" },
  savedIds: [1, 3],
  notes: [
    {
      id: 1,
      title: "Data Structures and Algorithms – Notes",
      subject: "CSE",
      topic: "Data Structures",
      author: "Rahul Verma",
      year: "3rd Year",
      rating: 4.8,
      useful: 124,
      format: "PDF",
      size: "12 MB",
      time: "2h ago",
      desc: "Complete DSA notes covering arrays, linked lists, stacks, queues, trees, graphs, and sorting complexities.",
      comments: [{ by: "Anju", text: "Super clean diagrams for BST and AVL rotations!" }]
    },
    {
      id: 2,
      title: "Linear Algebra – Short Notes",
      subject: "MATHS",
      topic: "Discrete Maths",
      author: "Priya Singh",
      year: "2nd Year",
      rating: 4.6,
      useful: 98,
      format: "PDF",
      size: "8 MB",
      time: "5h ago",
      desc: "Quick revision sheet for vector spaces, eigenvalues, eigenvectors, rank-nullity theorem, and inner products.",
      comments: []
    },
    {
      id: 3,
      title: "Semiconductor Devices – Handwritten Notes",
      subject: "PHYSICS",
      topic: "Electronics",
      author: "Aakash Kumar",
      year: "2nd Year",
      rating: 4.7,
      useful: 76,
      format: "PDF",
      size: "10 MB",
      time: "8h ago",
      desc: "Neat handwritten derivations for PN junctions, Zener diodes, BJT biasing, and MOSFET characteristics.",
      comments: []
    },
    {
      id: 4,
      title: "Web Development – Full Stack Guide",
      subject: "CSE",
      topic: "Web Development",
      author: "Sneha Patel",
      year: "3rd Year",
      rating: 4.5,
      useful: 63,
      format: "PDF",
      size: "15 MB",
      time: "12h ago",
      desc: "HTML5 semantics, CSS Flexbox/Grid, JavaScript DOM, and project structuring guide for beginners.",
      comments: []
    },
    {
      id: 5,
      title: "DBMS Important Questions",
      subject: "CSE",
      topic: "Database",
      author: "Riya Sharma",
      year: "3rd Year",
      rating: 4.7,
      useful: 54,
      format: "PDF",
      size: "4 MB",
      time: "2h ago",
      desc: "ER diagrams, normalization (1NF to BCNF), SQL joins, and transaction ACID properties.",
      comments: []
    },
    {
      id: 6,
      title: "Python Practice Set",
      subject: "CSE",
      topic: "Python",
      author: "Karan Mehta",
      year: "2nd Year",
      rating: 4.6,
      useful: 49,
      format: "PDF",
      size: "3 MB",
      time: "5h ago",
      desc: "50 solved Python coding problems covering loops, recursion, dictionaries, and file handling.",
      comments: []
    }
  ],
  requests: [
    {
      id: 101,
      title: "C Programming Pointers & Structures PYQs",
      subject: "CSE",
      by: "Tanuj",
      details: "Need previous year end-sem questions with pointer tracing examples.",
      upvotes: 14,
      fulfilled: false
    },
    {
      id: 102,
      title: "Operations Research Simplex Method Examples",
      subject: "MATHS",
      by: "Priyanshu",
      details: "Looking for step-by-step Big-M and Two-Phase solved problems.",
      upvotes: 9,
      fulfilled: true
    }
  ],
  projects: [
    {
      id: 201,
      title: "NoteCred — Student Resource Platform",
      batch: "B.Tech CSE 2026",
      author: "Tanuj Rana",
      tech: ["HTML5", "CSS3", "JavaScript"],
      desc: "Central academic hub for subject-wise notes, note requests, senior guidance, and project archiving.",
      improvements: "Add real-time PDF preview, backend database sync, and college email verification."
    },
    {
      id: 202,
      title: "Campus Bus & Timetable Notifier",
      batch: "B.Tech CSE 2025",
      author: "Rahul Verma",
      tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
      desc: "Lightweight web app helping hostellers and day scholars track lecture timings and shuttle schedules.",
      improvements: "Integrate push notifications and live GPS route tracking."
    }
  ],
  guidance: [
    {
      id: 301,
      title: "How to Ace 1st-Year CSE Without Burnout",
      category: "Exams",
      by: "Sneha Patel (3rd Year)",
      body: "Focus on understanding C pointers and Linear Algebra fundamentals early. Solve at least 2 previous year papers before mid-sems."
    },
    {
      id: 302,
      title: "Start Building Mini-Projects in Sem 1",
      category: "Coding",
      by: "Rahul Verma (3rd Year)",
      body: "Don't wait to finish 10 tutorials. Build small HTML/CSS/JS apps, push them to GitHub, and document what you learned."
    }
  ],
  notifications: [
    "Riya Sharma uploaded 'DBMS Important Questions'",
    "Your note request got 3 new upvotes",
    "Sneha Patel posted new Senior Guidance"
  ]
};

const TOPICS = [
  "Data Structures", "Web Development", "Database", "Python",
  "Operating System", "Machine Learning", "C Programming",
  "Discrete Maths", "Computer Networks", "Electronics"
];

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : structuredClone(DEFAULT_STATE);
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => t.classList.add("hidden"), 2500);
}

/* Navigation */
function switchView(viewName) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  document.getElementById(`view-${viewName}`)?.classList.add("active");

  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  document.getElementById("sidebar").classList.remove("open");
  renderAll();
}

/* Dynamic Greeting */
function updateGreeting() {
  const hr = new Date().getHours();
  const part = hr < 12 ? "Good Morning" : hr < 17 ? "Good Afternoon" : "Good Evening";
  document.getElementById("greetingText").innerHTML =
    `${part}, <span class="accent-name">${escapeHtml(state.user.name)}!</span>`;
  document.getElementById("topUserName").textContent = state.user.name;
  document.getElementById("settingsName").value = state.user.name;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

/* Render Note Card */
function createNoteCard(note, allowDelete = false) {
  const isSaved = state.savedIds.includes(note.id);
  const div = document.createElement("div");
  div.className = "note-card";
  div.innerHTML = `
    <div class="note-top">
      <span class="tag tag-${note.subject}">${note.subject}</span>
      <button class="mini-btn" data-save="${note.id}" title="Bookmark">${isSaved ? "★ Saved" : "☆ Save"}</button>
    </div>
    <h4>${escapeHtml(note.title)}</h4>
    <p class="note-meta">By ${escapeHtml(note.author)} • ${escapeHtml(note.year)}</p>
    <p class="note-rating">⭐ ${note.rating.toFixed(1)} | ${note.useful} found useful</p>
    <div class="note-foot">
      <span>📄 ${note.format} • ${note.size}</span>
      <div>
        ${allowDelete ? `<button class="mini-btn danger" data-del="${note.id}">Delete</button>` : ""}
        <button class="mini-btn" data-dl="${note.id}">⬇</button>
      </div>
    </div>
  `;

  div.addEventListener("click", (e) => {
    if (e.target.dataset.save) {
      e.stopPropagation();
      toggleSave(note.id);
    } else if (e.target.dataset.del) {
      e.stopPropagation();
      deleteNote(note.id);
    } else if (e.target.dataset.dl) {
      e.stopPropagation();
      downloadDemoNote(note);
    } else {
      openNoteModal(note.id);
    }
  });
  return div;
}

function toggleSave(id) {
  const idx = state.savedIds.indexOf(id);
  if (idx >= 0) {
    state.savedIds.splice(idx, 1);
    showToast("Removed from Saved Notes");
  } else {
    state.savedIds.push(id);
    showToast("Saved to your bookmarks");
  }
  saveState();
  renderAll();
}

function deleteNote(id) {
  state.notes = state.notes.filter((n) => n.id !== id);
  state.savedIds = state.savedIds.filter((sid) => sid !== id);
  saveState();
  showToast("Note deleted");
  renderAll();
}

function downloadDemoNote(note) {
  const text = `NoteCred Resource Summary\n========================\nTitle: ${note.title}\nSubject: ${note.subject}\nAuthor: ${note.author} (${note.year})\nDescription: ${note.desc}\n`;
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${note.title.replace(/\s+/g, "_")}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast("Downloaded note summary");
}

/* Note Detail Modal */
function openNoteModal(id) {
  const note = state.notes.find((n) => n.id === id);
  if (!note) return;
  const modal = document.getElementById("noteModal");
  const body = document.getElementById("noteModalBody");

  body.innerHTML = `
    <span class="tag tag-${note.subject}">${note.subject}</span>
    <h2 style="margin:8px 0 4px">${escapeHtml(note.title)}</h2>
    <p class="note-meta">By ${escapeHtml(note.author)} • ${escapeHtml(note.year)} • ${note.format} (${note.size})</p>
    <p style="margin:12px 0; color:#334155">${escapeHtml(note.desc)}</p>

    <div class="btn-row" style="margin-bottom:14px">
      <button class="btn-primary" id="modalUsefulBtn">👍 Found Useful (${note.useful})</button>
      <button class="btn-secondary" id="modalSaveBtn">${state.savedIds.includes(note.id) ? "★ Saved" : "☆ Save"}</button>
      <button class="btn-secondary" id="modalDlBtn">⬇ Download</button>
    </div>

    <div style="margin-bottom:14px">
      <strong style="font-size:0.9rem">Rate this resource (Current: ⭐ ${note.rating.toFixed(1)}):</strong>
      <div class="star-bar" id="starBar">
        ${[1, 2, 3, 4, 5].map((s) => `<button data-star="${s}">⭐</button>`).join("")}
      </div>
    </div>

    <hr style="border:none;border-top:1px solid #e5eaf3;margin:12px 0" />
    <h4>Feedback & Comments (${note.comments.length})</h4>
    <div id="modalComments">
      ${note.comments.map((c) => `<div class="comment-item"><strong>${escapeHtml(c.by)}:</strong> ${escapeHtml(c.text)}</div>`).join("") || `<p class="note-meta" style="margin-top:6px">No comments yet. Be the first!</p>`}
    </div>
    <form id="commentForm" style="display:flex;gap:8px;margin-top:10px">
      <input type="text" id="commentInput" placeholder="Write helpful feedback..." style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:8px" required />
      <button type="submit" class="btn-primary">Post</button>
    </form>
  `;

  modal.classList.remove("hidden");

  document.getElementById("modalUsefulBtn").onclick = () => {
    note.useful += 1;
    saveState();
    showToast("Marked as useful!");
    openNoteModal(id);
    renderAll();
  };

  document.getElementById("modalSaveBtn").onclick = () => {
    toggleSave(id);
    openNoteModal(id);
  };

  document.getElementById("modalDlBtn").onclick = () => downloadDemoNote(note);

  document.querySelectorAll("#starBar button").forEach((btn) => {
    btn.onclick = () => {
      const val = Number(btn.dataset.star);
      note.rating = Math.min(5, (note.rating * 4 + val) / 5);
      saveState();
      showToast(`Rated ${val} stars`);
      openNoteModal(id);
      renderAll();
    };
  });

  document.getElementById("commentForm").onsubmit = (e) => {
    e.preventDefault();
    const text = document.getElementById("commentInput").value.trim();
    if (!text) return;
    note.comments.push({ by: state.user.name, text });
    saveState();
    openNoteModal(id);
    showToast("Comment added");
  };
}

/* Render All Sections */
function renderAll() {
  updateGreeting();

  // Stats
  const totalNotes = 118 + state.notes.length;
  const totalUsefuls = state.notes.reduce((s, n) => s + n.useful, 736);
  document.getElementById("statNotes").textContent = totalNotes;
  document.getElementById("statContributors").textContent = 62 + state.notes.length;
  document.getElementById("statUsefuls").textContent =
    totalUsefuls >= 1000 ? `${(totalUsefuls / 1000).toFixed(1)}k` : totalUsefuls;

  // Notifications
  document.getElementById("notifDot").textContent = state.notifications.length;
  document.getElementById("notifList").innerHTML = state.notifications
    .map((n) => `<li>• ${escapeHtml(n)}</li>`)
    .join("");

  // Featured Notes (top 4)
  const featGrid = document.getElementById("featuredNotesGrid");
  featGrid.innerHTML = "";
  state.notes.slice(0, 4).forEach((n) => featGrid.appendChild(createNoteCard(n)));

  // Popular Topics
  const topicsEl = document.getElementById("popularTopics");
  topicsEl.innerHTML = "";
  TOPICS.forEach((topic) => {
    const b = document.createElement("button");
    b.className = "topic-chip";
    b.textContent = topic;
    b.onclick = () => {
      document.getElementById("exploreSearch").value = topic;
      switchView("explore");
    };
    topicsEl.appendChild(b);
  });

  // Recent Uploads
  const recentEl = document.getElementById("recentUploadsList");
  recentEl.innerHTML = "";
  state.notes.slice(0, 4).forEach((n) => {
    const row = document.createElement("div");
    row.className = "recent-item";
    row.innerHTML = `<div>📄</div><div><strong>${escapeHtml(n.title)}</strong><span>By ${escapeHtml(n.author)} • ${n.time}</span></div>`;
    row.onclick = () => openNoteModal(n.id);
    recentEl.appendChild(row);
  });

  // Explore Notes
  renderExplore();

  // My Notes
  const myGrid = document.getElementById("myNotesGrid");
  myGrid.innerHTML = "";
  const mine = state.notes.filter((n) => n.author.toLowerCase() === state.user.name.toLowerCase());
  if (!mine.length) {
    myGrid.innerHTML = `<p class="note-meta">You haven't uploaded any notes yet. Click "+ Upload New" to share your first note!</p>`;
  } else {
    mine.forEach((n) => myGrid.appendChild(createNoteCard(n, true)));
  }

  // Saved Notes
  const savedGrid = document.getElementById("savedNotesGrid");
  savedGrid.innerHTML = "";
  const saved = state.notes.filter((n) => state.savedIds.includes(n.id));
  if (!saved.length) {
    savedGrid.innerHTML = `<p class="note-meta">No saved notes yet. Bookmark any note to access it quickly here.</p>`;
  } else {
    saved.forEach((n) => savedGrid.appendChild(createNoteCard(n)));
  }

  // Requests
  const reqEl = document.getElementById("requestsList");
  reqEl.innerHTML = "";
  state.requests.forEach((r) => {
    const card = document.createElement("div");
    card.className = "panel";
    card.innerHTML = `
      <div class="note-top">
        <span class="tag tag-${r.subject}">${r.subject}</span>
        <span class="note-meta">${r.fulfilled ? "✅ Fulfilled" : "⏳ Open"}</span>
      </div>
      <h4 style="margin:6px 0">${escapeHtml(r.title)}</h4>
      <p class="note-meta">Requested by ${escapeHtml(r.by)} — ${escapeHtml(r.details)}</p>
      <div class="btn-row" style="margin-top:10px">
        <button class="mini-btn" data-up="${r.id}">▲ Upvote (${r.upvotes})</button>
        ${!r.fulfilled ? `<button class="mini-btn" data-fulfill="${r.id}">Mark Fulfilled</button>` : ""}
      </div>
    `;
    card.addEventListener("click", (e) => {
      if (e.target.dataset.up) {
        r.upvotes += 1;
        saveState();
        renderAll();
      } else if (e.target.dataset.fulfill) {
        r.fulfilled = true;
        saveState();
        showToast("Request marked as fulfilled!");
        renderAll();
      }
    });
    reqEl.appendChild(card);
  });

  // Projects
  const projEl = document.getElementById("projectsGrid");
  projEl.innerHTML = "";
  state.projects.forEach((p) => {
    const card = document.createElement("div");
    card.className = "panel";
    card.innerHTML = `
      <span class="tag tag-CSE">${escapeHtml(p.batch)}</span>
      <h3 style="margin:8px 0 4px">${escapeHtml(p.title)}</h3>
      <p class="note-meta">By ${escapeHtml(p.author)}</p>
      <p style="margin:8px 0;font-size:0.9rem">${escapeHtml(p.desc)}</p>
      <div class="topics-wrap" style="margin:8px 0">
        ${p.tech.map((t) => `<span class="topic-chip">${escapeHtml(t)}</span>`).join("")}
      </div>
      <div class="improve-box"><strong>Possible Improvements:</strong> ${escapeHtml(p.improvements)}</div>
    `;
    projEl.appendChild(card);
  });

  // Guidance
  const guideEl = document.getElementById("guidanceList");
  guideEl.innerHTML = "";
  state.guidance.forEach((g) => {
    const card = document.createElement("div");
    card.className = "panel";
    card.innerHTML = `
      <span class="tag tag-MATHS">${escapeHtml(g.category)}</span>
      <h3 style="margin:8px 0 4px">${escapeHtml(g.title)}</h3>
      <p class="note-meta">Shared by ${escapeHtml(g.by)}</p>
      <p style="margin-top:8px;font-size:0.92rem;color:#334155">${escapeHtml(g.body)}</p>
    `;
    guideEl.appendChild(card);
  });
}

function renderExplore() {
  const q = document.getElementById("exploreSearch").value.trim().toLowerCase();
  const sub = document.getElementById("subjectFilter").value;
  const sort = document.getElementById("sortFilter").value;

  let list = state.notes.filter((n) => {
    const matchesSub = sub === "ALL" || n.subject === sub;
    const hay = `${n.title} ${n.author} ${n.topic} ${n.subject}`.toLowerCase();
    return matchesSub && (!q || hay.includes(q));
  });

  if (sort === "useful") list.sort((a, b) => b.useful - a.useful);
  else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
  else list.sort((a, b) => b.id - a.id);

  const grid = document.getElementById("exploreNotesGrid");
  grid.innerHTML = "";
  if (!list.length) {
    grid.innerHTML = `<p class="note-meta">No matching resources found.</p>`;
  } else {
    list.forEach((n) => grid.appendChild(createNoteCard(n)));
  }
}

/* Event Listeners */
document.querySelectorAll(".nav-item").forEach((btn) => {
  btn.addEventListener("click", () => switchView(btn.dataset.view));
});

document.getElementById("menuToggle").onclick = () => {
  document.getElementById("sidebar").classList.toggle("open");
};

document.getElementById("globalSearch").addEventListener("input", (e) => {
  document.getElementById("exploreSearch").value = e.target.value;
  if (e.target.value.trim()) switchView("explore");
});

["exploreSearch", "subjectFilter", "sortFilter"].forEach((id) => {
  document.getElementById(id).addEventListener("input", renderExplore);
});

/* Notifications */
document.getElementById("notifBtn").onclick = () => {
  document.getElementById("notifDropdown").classList.toggle("hidden");
};

/* Upload Form */
document.getElementById("noteFile").addEventListener("change", (e) => {
  const f = e.target.files[0];
  if (f) document.getElementById("noteSize").value = `${Math.max(1, Math.round(f.size / 1048576))} MB`;
});

document.getElementById("uploadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("noteTitle").value.trim();
  const subject = document.getElementById("noteSubject").value;
  const year = document.getElementById("noteYear").value;
  const topic = document.getElementById("noteTopic").value.trim();
  const size = document.getElementById("noteSize").value.trim() || "4 MB";
  const desc = document.getElementById("noteDesc").value.trim();
  const msg = document.getElementById("uploadMsg");

  if (!title || !subject || !topic || desc.length < 10) {
    msg.className = "form-msg error";
    msg.textContent = "Please fill all required fields (description at least 10 characters).";
    return;
  }

  state.notes.unshift({
    id: Date.now(),
    title,
    subject,
    topic,
    author: state.user.name,
    year,
    rating: 5.0,
    useful: 1,
    format: "PDF",
    size,
    time: "Just now",
    desc,
    comments: []
  });
  state.notifications.unshift(`${state.user.name} uploaded '${title}'`);
  saveState();
  e.target.reset();
  msg.className = "form-msg ok";
  msg.textContent = "Resource published successfully!";
  showToast("Note uploaded!");
  renderAll();
});

/* Request Form */
document.getElementById("requestForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("reqTitle").value.trim();
  const subject = document.getElementById("reqSubject").value;
  const details = document.getElementById("reqDetails").value.trim();
  const msg = document.getElementById("reqMsg");

  if (!title || !details) {
    msg.className = "form-msg error";
    msg.textContent = "Please enter the title and details.";
    return;
  }
  state.requests.unshift({
    id: Date.now(),
    title,
    subject,
    by: state.user.name,
    details,
    upvotes: 1,
    fulfilled: false
  });
  saveState();
  e.target.reset();
  msg.className = "form-msg ok";
  msg.textContent = "Request posted!";
  showToast("Note request posted!");
  renderAll();
});

/* Project Form */
document.getElementById("toggleProjectFormBtn").onclick = () => {
  document.getElementById("projectForm").classList.toggle("hidden");
};

document.getElementById("projectForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("projTitle").value.trim();
  const batch = document.getElementById("projBatch").value.trim();
  const tech = document.getElementById("projTech").value.split(",").map((s) => s.trim()).filter(Boolean);
  const author = document.getElementById("projAuthor").value.trim();
  const desc = document.getElementById("projDesc").value.trim();
  const improvements = document.getElementById("projImprove").value.trim();
  const msg = document.getElementById("projMsg");

  if (!title || !batch || !tech.length || !author || !desc || !improvements) {
    msg.className = "form-msg error";
    msg.textContent = "Please fill in all project fields.";
    return;
  }
  state.projects.unshift({ id: Date.now(), title, batch, author, tech, desc, improvements });
  saveState();
  e.target.reset();
  document.getElementById("projectForm").classList.add("hidden");
  showToast("Project added to repository!");
  renderAll();
});

/* Guidance Form */
document.getElementById("guidanceForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("guideTitle").value.trim();
  const category = document.getElementById("guideCategory").value;
  const body = document.getElementById("guideBody").value.trim();
  const msg = document.getElementById("guideMsg");

  if (!title || !body) {
    msg.className = "form-msg error";
    msg.textContent = "Please enter both a topic and advice.";
    return;
  }
  state.guidance.unshift({
    id: Date.now(),
    title,
    category,
    by: `${state.user.name} (${state.user.batch})`,
    body
  });
  saveState();
  e.target.reset();
  msg.className = "form-msg ok";
  msg.textContent = "Guidance shared!";
  showToast("Senior guidance posted!");
  renderAll();
});

/* Settings & Help */
document.getElementById("saveSettingsBtn").onclick = () => {
  const newName = document.getElementById("settingsName").value.trim();
  const msg = document.getElementById("settingsMsg");
  if (!newName) {
    msg.className = "form-msg error";
    msg.textContent = "Name cannot be empty.";
    return;
  }
  state.user.name = newName;
  saveState();
  msg.className = "form-msg ok";
  msg.textContent = "Settings saved!";
  showToast("Profile updated");
  renderAll();
};

document.getElementById("resetDataBtn").onclick = () => {
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(DEFAULT_STATE);
  showToast("Demo data reset");
  renderAll();
};

document.querySelectorAll(".faq-q").forEach((q) => {
  q.onclick = () => q.parentElement.classList.toggle("open");
});

document.getElementById("helpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("helpEmail").value.trim();
  const text = document.getElementById("helpMessage").value.trim();
  const msg = document.getElementById("helpMsg");
  if (!email.includes("@") || text.length < 5) {
    msg.className = "form-msg error";
    msg.textContent = "Enter a valid email and message.";
    return;
  }
  e.target.reset();
  msg.className = "form-msg ok";
  msg.textContent = "Support message sent!";
  showToast("Message received");
});

/* Modals & Auth */
document.getElementById("closeNoteModal").onclick = () => {
  document.getElementById("noteModal").classList.add("hidden");
};

const authModal = document.getElementById("authModal");
document.getElementById("authTrigger").onclick = () => authModal.classList.remove("hidden");
document.getElementById("closeAuthModal").onclick = () => authModal.classList.add("hidden");

document.querySelectorAll(".auth-tab").forEach((tab) => {
  tab.onclick = () => {
    document.querySelectorAll(".auth-tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const isLogin = tab.dataset.tab === "login";
    document.getElementById("loginForm").classList.toggle("hidden", !isLogin);
    document.getElementById("registerForm").classList.toggle("hidden", isLogin);
  };
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPass").value;
  const msg = document.getElementById("loginMsg");
  if (!email.includes("@") || pass.length < 6) {
    msg.className = "form-msg error";
    msg.textContent = "Enter a valid email and password (min 6 chars).";
    return;
  }
  state.user.email = email;
  state.user.name = email.split("@")[0].replace(/^./, (c) => c.toUpperCase());
  saveState();
  authModal.classList.add("hidden");
  showToast(`Logged in as ${state.user.name}`);
  renderAll();
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const batch = document.getElementById("regBatch").value;
  const pass = document.getElementById("regPass").value;
  const msg = document.getElementById("regMsg");
  if (!name || !email.includes("@") || pass.length < 6) {
    msg.className = "form-msg error";
    msg.textContent = "Fill all fields (password min 6 characters).";
    return;
  }
  state.user = { name, email, batch };
  saveState();
  authModal.classList.add("hidden");
  showToast(`Welcome to NoteCred, ${name}!`);
  renderAll();
});

/* Initial Render */
renderAll();