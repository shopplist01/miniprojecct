// ---- State ----
// Each item: { id, name, qty, purchased }
let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

// ---- DOM refs ----
const list = document.getElementById('list');
const addForm = document.getElementById('addForm');
const itemInput = document.getElementById('itemInput');
const qtyInput = document.getElementById('qtyInput');
const searchInput = document.getElementById('searchInput');
const countPill = document.getElementById('countPill');
const emptyMsg = document.getElementById('emptyMsg');

// ---- Save to Local Storage ----
function save() {
  localStorage.setItem('shoppingList', JSON.stringify(items));
}

// ---- Render ----
function render() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = items.filter(i => i.name.toLowerCase().includes(query));

  list.innerHTML = '';

  filtered.forEach(item => {
    const li = document.createElement('li');
    li.className = 'item' + (item.purchased ? ' done' : '');
    li.dataset.id = item.id;

    li.innerHTML = `
      <div class="check ${item.purchased ? 'checked' : ''}" title="Mark as purchased">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span class="item-name" contenteditable="true" spellcheck="false">${escapeHtml(item.name)}</span>
      <span class="qty">x${item.qty}</span>
      <button class="icon-btn" title="Delete item">Delete</button>
    `;

    // Toggle purchased
    li.querySelector('.check').addEventListener('click', () => {
      item.purchased = !item.purchased;
      save();
      render();
    });

    // Edit name
    const nameEl = li.querySelector('.item-name');
    nameEl.addEventListener('blur', () => {
      const newName = nameEl.textContent.trim();
      if (newName) {
        item.name = newName;
      } else {
        nameEl.textContent = item.name; // revert if emptied
      }
      save();
    });
    nameEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); nameEl.blur(); }
    });

    // Delete
    li.querySelector('.icon-btn').addEventListener('click', () => {
      items = items.filter(i => i.id !== item.id);
      save();
      render();
    });

    list.appendChild(li);
  });

  emptyMsg.style.display = filtered.length ? 'none' : 'block';
  countPill.textContent = `${items.length} item${items.length === 1 ? '' : 's'}`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---- Add item ----
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = itemInput.value.trim();
  const qty = parseInt(qtyInput.value, 10) || 1;
  if (!name) return;

  items.push({
    id: Date.now().toString(),
    name,
    qty,
    purchased: false
  });

  save();
  render();

  itemInput.value = '';
  qtyInput.value = 1;
  itemInput.focus();
});

// ---- Search ----
searchInput.addEventListener('input', render);

// ---- Initial render ----
render();