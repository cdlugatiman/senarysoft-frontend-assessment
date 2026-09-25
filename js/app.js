/*
 * User Management - Edit Users
 * Plain JavaScript, no build step. Depends on js/data.js (mock data) and Bootstrap's JS bundle.
 *
 * Flow: user action -> update `state` (or `users`) -> render() redraws table, count and pagination.
 */
"use strict";

const PAGE_SIZE = 10;

// The fields that "All fields" search looks at (and that the field selector can target).
const SEARCH_FIELDS = ["id", "firstName", "lastName", "email", "group", "division", "region", "userType"];

// In-memory copy of the mock data (edits last until the page is reloaded).
let users = MOCK_USERS.map((u) => ({ ...u }));

// Everything that decides what the table shows.
const state = { query: "", field: "all", status: "all", region: "all", division: "all", page: 1 };

const $ = (id) => document.getElementById(id);
const els = {
  search: $("searchInput"),
  quickSearch: $("quickSearch"),
  field: $("searchField"),
  status: $("statusFilter"),
  region: $("regionFilter"),
  division: $("divisionFilter"),
  body: $("usersBody"),
  count: $("entryCount"),
  pagination: $("pagination"),
  form: $("userForm"),
  modalTitle: $("userModalTitle"),
  email: $("fEmail"),
  emailFeedback: $("fEmailFeedback")
};
const userModal = new bootstrap.Modal($("userModal"));

/* ---------- Helpers ---------- */

// Escape text before putting it in innerHTML (user-entered names could contain markup).
function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// "2025-05-01" -> "05/01/2025"; missing date -> em dash.
function formatDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
}

function todayISO() {
  const t = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
}

function fullName(u) {
  return `${u.firstName} ${u.lastName}`;
}

function nextId() {
  const max = users.reduce((m, u) => Math.max(m, parseInt(u.id, 10)), 0);
  return String(max + 1).padStart(4, "0");
}

function showToast(message) {
  const el = document.createElement("div");
  el.className = "toast align-items-center text-bg-dark border-0";
  el.setAttribute("role", "status");
  el.setAttribute("aria-live", "polite");
  el.setAttribute("aria-atomic", "true");
  el.innerHTML = `<div class="d-flex"><div class="toast-body">${esc(message)}</div>` +
    `<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>`;
  $("toastArea").appendChild(el);
  el.addEventListener("hidden.bs.toast", () => el.remove());
  new bootstrap.Toast(el, { delay: 3500 }).show();
}

/* ---------- Filtering ---------- */

// Search text AND each dropdown filter must all match.
function getFilteredUsers() {
  const q = state.query.trim().toLowerCase();
  const fields = state.field === "all" ? SEARCH_FIELDS : [state.field];

  return users.filter((u) => {
    if (q && !fields.some((f) => String(u[f]).toLowerCase().includes(q))) return false;
    if (state.status !== "all" && u.status !== state.status) return false;
    if (state.region !== "all" && u.region !== state.region) return false;
    if (state.division !== "all" && u.division !== state.division) return false;
    return true;
  });
}

/* ---------- Rendering ---------- */

function render() {
  const filtered = getFilteredUsers();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  state.page = Math.min(Math.max(state.page, 1), totalPages); // keep the page in range

  const start = (state.page - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(start, start + PAGE_SIZE);

  renderRows(pageRows);
  renderCount(filtered.length, start, pageRows.length);
  renderPagination(totalPages);
}

function renderRows(rows) {
  if (rows.length === 0) {
    els.body.innerHTML = `<tr><td colspan="12" class="empty-row">No users match your search or filters.</td></tr>`;
    return;
  }
  els.body.innerHTML = rows.map((u) => {
    const active = u.status === "Active";
    const name = esc(fullName(u));
    return `<tr class="${active ? "" : "row-disabled"}">
      <td>${esc(u.id)}</td>
      <td>${esc(u.firstName)}</td>
      <td>${esc(u.lastName)}</td>
      <td class="cell-email"><span title="${esc(u.email)}">${esc(u.email)}</span></td>
      <td>${esc(u.group)}</td>
      <td>${esc(u.division)}</td>
      <td>${esc(u.region)}</td>
      <td>${esc(u.userType)}</td>
      <td>${formatDate(u.submittedDate)}</td>
      <td>${formatDate(u.enabledDate)}</td>
      <td><span class="status-badge ${active ? "is-active" : "is-disabled"}">${esc(u.status)}</span></td>
      <td class="col-actions">
        <button type="button" class="action-btn action-edit" data-action="edit" data-id="${esc(u.id)}" aria-label="Edit ${name}" title="Edit user">
          <svg class="icon" aria-hidden="true"><use href="#i-edit"/></svg>
        </button>
        <button type="button" class="action-btn action-toggle" data-action="toggle" data-id="${esc(u.id)}" aria-label="${active ? "Disable" : "Enable"} ${name}" title="${active ? "Disable user" : "Enable user"}">
          <svg class="icon" aria-hidden="true"><use href="#${active ? "i-ban" : "i-check"}"/></svg>
        </button>
      </td>
    </tr>`;
  }).join("");
}

function renderCount(total, start, shown) {
  if (total === 0) {
    els.count.textContent = "Showing 0 entries";
  } else {
    els.count.textContent = `Showing ${start + 1} to ${start + shown} of ${total} entries`;
  }
  if (total !== users.length) els.count.textContent += ` (filtered from ${users.length} total entries)`;
}

// Page numbers: always first, last and the pages next to the current one; "…" fills gaps.
function pageList(current, total) {
  const pages = [];
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - current) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }
  return pages;
}

function renderPagination(totalPages) {
  const cur = state.page;
  const item = (label, page, opts = {}) =>
    `<li class="page-item${opts.active ? " active" : ""}${opts.disabled ? " disabled" : ""}">` +
    `<button type="button" class="page-link" data-page="${page}"${opts.disabled ? " disabled" : ""}` +
    `${opts.active ? ' aria-current="page"' : ""}${opts.aria ? ` aria-label="${opts.aria}"` : ""}>${label}</button></li>`;

  let html = item("Previous", cur - 1, { disabled: cur === 1 });
  pageList(cur, totalPages).forEach((p) => {
    html += p === "…"
      ? `<li class="page-item disabled"><span class="page-link">…</span></li>`
      : item(p, p, { active: p === cur, aria: `Page ${p}` });
  });
  html += item("Next", cur + 1, { disabled: cur === totalPages });
  els.pagination.innerHTML = html;
}

/* ---------- Filter setup and events ---------- */

function fillSelect(select, values, keepFirst) {
  const first = keepFirst ? select.options[0].outerHTML : "";
  select.innerHTML = first + values.map((v) => `<option value="${esc(v)}">${esc(v)}</option>`).join("");
}

function setupSelects() {
  fillSelect(els.status, STATUSES, true);
  fillSelect(els.region, REGIONS, true);
  fillSelect(els.division, DIVISIONS, true);
  fillSelect($("fGroup"), GROUPS);
  fillSelect($("fUserType"), USER_TYPES);
  fillSelect($("fDivision"), DIVISIONS);
  fillSelect($("fRegion"), REGIONS);
  fillSelect($("fStatus"), STATUSES);
}

// Any change to search/filters returns to page 1.
function onFilterChange() {
  state.query = els.search.value;
  state.field = els.field.value;
  state.status = els.status.value;
  state.region = els.region.value;
  state.division = els.division.value;
  state.page = 1;
  els.quickSearch.value = els.search.value;
  render();
}

function clearFilters() {
  els.search.value = "";
  els.quickSearch.value = "";
  els.field.value = "all";
  els.status.value = "all";
  els.region.value = "all";
  els.division.value = "all";
  onFilterChange();
}

/* ---------- Add / Edit / Enable-Disable ---------- */

function openUserModal(user) {
  els.form.classList.remove("was-validated");
  els.email.setCustomValidity("");
  els.modalTitle.textContent = user ? "Edit User" : "Add User";
  $("fId").value = user ? user.id : "";
  $("fFirstName").value = user ? user.firstName : "";
  $("fLastName").value = user ? user.lastName : "";
  els.email.value = user ? user.email : "";
  $("fGroup").value = user ? user.group : GROUPS[0];
  $("fUserType").value = user ? user.userType : USER_TYPES[0];
  $("fDivision").value = user ? user.division : DIVISIONS[0];
  $("fRegion").value = user ? user.region : REGIONS[0];
  $("fStatus").value = user ? user.status : "Active";
  userModal.show();
}

// Email must be unique (ignoring the user being edited).
function checkDuplicateEmail(editingId) {
  const email = els.email.value.trim().toLowerCase();
  const dup = users.some((u) => u.email.toLowerCase() === email && u.id !== editingId);
  els.email.setCustomValidity(dup ? "duplicate" : "");
  els.emailFeedback.textContent = dup ? "That email is already in use." : "Enter a valid email address.";
}

// Enabled date follows the status: set when a user becomes Active, cleared when Disabled.
function applyStatus(user, status) {
  if (user.status === status) return;
  user.status = status;
  user.enabledDate = status === "Active" ? todayISO() : null;
}

function saveUser(event) {
  event.preventDefault();
  const editingId = $("fId").value;
  checkDuplicateEmail(editingId);
  els.form.classList.add("was-validated");
  if (!els.form.checkValidity()) {
    els.form.querySelector(":invalid").focus();
    return;
  }

  const values = {
    firstName: $("fFirstName").value.trim(),
    lastName: $("fLastName").value.trim(),
    email: els.email.value.trim(),
    group: $("fGroup").value,
    userType: $("fUserType").value,
    division: $("fDivision").value,
    region: $("fRegion").value
  };
  const status = $("fStatus").value;

  if (editingId) {
    const user = users.find((u) => u.id === editingId);
    Object.assign(user, values);
    applyStatus(user, status);
    showToast(`${fullName(user)} was updated.`);
    userModal.hide();
    render();
  } else {
    const user = { id: nextId(), ...values, submittedDate: todayISO(), enabledDate: null, status: "Disabled" };
    applyStatus(user, status);
    users.unshift(user);
    showToast(`${fullName(user)} was added.`);
    userModal.hide();
    clearFilters(); // reset so the new user is visible at the top of page 1
  }
}

function toggleUser(id) {
  const user = users.find((u) => u.id === id);
  applyStatus(user, user.status === "Active" ? "Disabled" : "Active");
  showToast(`${fullName(user)} was ${user.status === "Active" ? "enabled" : "disabled"}.`);
  render();
}

/* ---------- Wire up events ---------- */

setupSelects();

els.search.addEventListener("input", onFilterChange);
els.quickSearch.addEventListener("input", () => { els.search.value = els.quickSearch.value; onFilterChange(); });
[els.field, els.status, els.region, els.division].forEach((el) => el.addEventListener("change", onFilterChange));
$("clearFilters").addEventListener("click", clearFilters);
$("addUserBtn").addEventListener("click", () => openUserModal(null));
els.form.addEventListener("submit", saveUser);
els.email.addEventListener("input", () => els.email.setCustomValidity(""));

els.body.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  if (btn.dataset.action === "edit") openUserModal(users.find((u) => u.id === btn.dataset.id));
  if (btn.dataset.action === "toggle") toggleUser(btn.dataset.id);
});

els.pagination.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-page]");
  if (!btn || btn.disabled) return;
  state.page = Number(btn.dataset.page);
  render();
});

// Only this page exists, so the other navigation links are visual only: keep them from jumping to the top.
document.querySelectorAll("[data-demo-link]").forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));

render();
