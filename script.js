// ==========================
// ESTADOS
// ==========================
let currentPrice = 0;
let maxFlavors = 0;
let selectedFlavors = [];
let sizeName = "";
let deliveryMode = "delivery"; // 'delivery' ou 'pickup'
let paymentMethod = "";
let toastTimer = null;

// ==========================
// TOAST (Notificações visuais)
// ==========================
function showToast(message, type = "danger") {
  const toast = document.getElementById("toast");
  toast.classList.remove("success", "danger");
  toast.classList.add(type);
  toast.textContent = message;
  toast.classList.add("show");
  
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ==========================
// ABRIR/FECHAR MODAL
// ==========================
function openModal() {
  document.getElementById("pizzaModal").style.display = "flex";
  resetOrder();
}

function closeModal() {
  document.getElementById("pizzaModal").style.display = "none";
}

// fechar ao clicar fora
window.addEventListener("click", (event) => {
  const modal = document.getElementById("pizzaModal");
  if (event.target === modal) closeModal();
});

// fechar com ESC (desktop)
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ==========================
// SELECIONAR TAMANHO
// ==========================
function selectSize(element, price, max, name) {
  currentPrice = price;
  maxFlavors = max;
  sizeName = name;
  selectedFlavors = [];
  
  // Visual
  document.querySelectorAll(".size-item").forEach(el => el.classList.remove("active"));
  element.classList.add("active");
  
  // libera sabores
  const flavorSection = document.getElementById("flavor-section");
  flavorSection.classList.remove("disabled-section");
  document.querySelectorAll(".flavor-card").forEach(el => el.classList.remove("selected"));
  updateUI();
  
  // UX: rola suavemente para sabores
  flavorSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ==========================
// FEEDBACK VISUAL: negar sabores
// ==========================
function denyFlavorSelection() {
  const section = document.getElementById("flavor-section");
  const counter = document.getElementById("flavor-counter");
  
  section.classList.remove("shake-deny", "deny-flash");
  counter.classList.remove("deny");
  
  // força reflow pra animação rodar sempre
  void section.offsetWidth;
  
  section.classList.add("shake-deny", "deny-flash");
  counter.classList.add("deny");
  
  setTimeout(() => {
    section.classList.remove("deny-flash");
    counter.classList.remove("deny");
  }, 650);
  
  // CORREÇÃO: Sintaxe de Template Literal (crases ` `) inserida
  showToast(`Limite de ${maxFlavors} sabor(es) para este tamanho.`, "danger");
}

// ==========================
// SELECIONAR SABOR
// ==========================
function toggleFlavor(element, flavorName) {
  // bloqueia se não escolheu tamanho
  if (maxFlavors === 0) {
    showToast("Escolha um tamanho primeiro.", "danger");
    document.getElementById("size-section").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  
  // se já selecionado, remove
  if (selectedFlavors.includes(flavorName)) {
    selectedFlavors = selectedFlavors.filter(f => f !== flavorName);
    element.classList.remove("selected");
    updateUI();
    return;
  }
  
  // se ainda cabe, adiciona
  if (selectedFlavors.length < maxFlavors) {
    selectedFlavors.push(flavorName);
    element.classList.add("selected");
    updateUI();
    return;
  }
  
  // se passou do limite => vibra a seção
  denyFlavorSelection();
}

// ==========================
// MODO ENTREGA
// ==========================
function setDeliveryMode(mode) {
  deliveryMode = mode;
  document.getElementById("opt-delivery").classList.remove("active");
  document.getElementById("opt-pickup").classList.remove("active");
  
  // CORREÇÃO: Sintaxe de Template Literal inserida
  document.getElementById(`opt-${mode}`).classList.add("active");
  
  const addressBox = document.getElementById("address-box");
  if (mode === "pickup") {
    addressBox.classList.add("hidden");
  } else {
    addressBox.classList.remove("hidden");
  }
}

// ==========================
// PAGAMENTO
// ==========================
function selectPayment(element, method) {
  paymentMethod = method;
  document.querySelectorAll(".pay-card").forEach(el => el.classList.remove("selected"));
  element.classList.add("selected");
}

// ==========================
// UI (contador e total)
// ==========================
function updateUI() {
  // CORREÇÃO: Sintaxe de Template Literal inserida
  document.getElementById("flavor-counter").innerText = `${selectedFlavors.length}/${maxFlavors}`;
  document.getElementById("total-display").innerText = `R$ ${currentPrice.toFixed(2).replace(".", ",")}`;
}

// ==========================
// RESET PEDIDO
// ==========================
function resetOrder() {
  currentPrice = 0;
  maxFlavors = 0;
  selectedFlavors = [];
  sizeName = "";
  paymentMethod = "";
  deliveryMode = "delivery";
  
  document.querySelectorAll(".size-item").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".flavor-card").forEach(el => el.classList.remove("selected"));
  document.querySelectorAll(".pay-card").forEach(el => el.classList.remove("selected"));
  
  document.getElementById("flavor-section").classList.add("disabled-section");
  document.getElementById("obs-text").value = "";
  document.getElementById("address-input").value = "";
  
  setDeliveryMode("delivery");
  updateUI();
}

// ==========================
// FINALIZAR E ENVIAR WHATSAPP (A Magia do Portfólio)
// ==========================
function finishOrder() {
  // Validações antes de enviar
  if (currentPrice === 0) {
    showToast("Escolha um tamanho.", "danger");
    document.getElementById("size-section").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  
  if (selectedFlavors.length === 0) {
    showToast("Escolha ao menos 1 sabor.", "danger");
    document.getElementById("flavor-section").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  
  let address = "";
  if (deliveryMode === "delivery") {
    address = document.getElementById("address-input").value.trim();
    if (!address) {
      showToast("Digite o endereço de entrega.", "danger");
      document.getElementById("final-section").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
  }
  
  if (!paymentMethod) {
    showToast("Selecione a forma de pagamento.", "danger");
    document.getElementById("final-section").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  // Lógica de Montagem da String pro WhatsApp
  let text = `*Novo Pedido - La Mamma* 🍕\n\n`;
  text += `*Tamanho:* ${sizeName}\n`;
  text += `*Sabores:* ${selectedFlavors.join(", ")}\n`;
  text += `*Pagamento:* ${paymentMethod}\n`;
  text += `*Modo:* ${deliveryMode === 'delivery' ? 'Entrega' : 'Retirada na Loja'}\n`;
  
  if (deliveryMode === 'delivery') {
      text += `*Endereço:* ${address}\n`;
  }
  
  const obs = document.getElementById("obs-text").value.trim();
  if (obs) text += `*Observações:* ${obs}\n`;
  
  text += `\n*Total a Pagar:* R$ ${currentPrice.toFixed(2).replace(".", ",")}`;

  // Codificar e gerar link (substitua o telefone pelo seu)
  const phone = "5511999999999"; 
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  // Feedback de sucesso e redirecionamento
  showToast("Redirecionando para o WhatsApp...", "success");
  
  setTimeout(() => {
    window.open(url, '_blank');
    closeModal();
  }, 800);
}

// ==========================
// MENU MOBILE
// ==========================
const menuBtn = document.querySelector(".menu-icon");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// fecha menu ao clicar em link (mobile)
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});