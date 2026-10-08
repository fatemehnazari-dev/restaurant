const cartKey = "banafsh-drinks-cart";
const orderEmail = "hello@gmail.com";
const numberFormatter = new Intl.NumberFormat("fa-IR");

function formatPrice(value) {
  return `${numberFormatter.format(value)} تومان`;
}

function readCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");

    if (!Array.isArray(savedCart)) {
      return [];
    }

    return savedCart.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        Number.isFinite(item.price) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    return true;
  } catch {
    return false;
  }
}

function setupDrinksCart() {
  const dialog = document.querySelector("#cart-dialog");

  if (!dialog) {
    return;
  }

  const cart = readCart();
  const cartCount = document.querySelector("#cart-count");
  const cartItems = document.querySelector("#cart-items");
  const cartEmpty = document.querySelector("#cart-empty");
  const cartTotal = document.querySelector("#cart-total");
  const cartTotalPrice = document.querySelector("#cart-total-price");
  const checkoutLink = document.querySelector("#checkout-link");
  const cartStatus = document.querySelector("#cart-status");
  const clearCartButton = document.querySelector("#clear-cart");

  function createControl(label, accessibleLabel, action, className = "") {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.setAttribute("aria-label", accessibleLabel);
    button.dataset.cartAction = action;

    if (className) {
      button.className = className;
    }

    return button;
  }

  function renderCart() {
    cartItems.replaceChildren();
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    cartCount.textContent = numberFormatter.format(itemCount);
    cartEmpty.hidden = cart.length > 0;
    cartTotal.hidden = cart.length === 0;
    clearCartButton.hidden = cart.length === 0;
    checkoutLink.hidden = cart.length === 0;
    cartTotalPrice.textContent = formatPrice(total);

    for (const item of cart) {
      const row = document.createElement("li");
      row.className = "cart-item";

      const details = document.createElement("div");
      const name = document.createElement("h3");
      const price = document.createElement("p");
      name.textContent = item.name;
      price.textContent = `${formatPrice(item.price)} · جمع: ${formatPrice(item.price * item.quantity)}`;
      details.append(name, price);

      const controls = document.createElement("div");
      controls.className = "cart-item-controls";
      controls.append(
        createControl("−", `کم‌کردن تعداد ${item.name}`, "decrease"),
      );

      const quantity = document.createElement("span");
      quantity.textContent = numberFormatter.format(item.quantity);
      quantity.setAttribute("aria-label", `تعداد ${item.name}`);
      controls.append(quantity);
      controls.append(
        createControl("+", `زیادکردن تعداد ${item.name}`, "increase"),
        createControl(
          "حذف",
          `حذف ${item.name} از سبد`,
          "remove",
          "cart-remove",
        ),
      );

      row.append(details, controls);
      cartItems.append(row);
    }

    const orderLines = cart.map(
      (item) =>
        `${item.name} × ${item.quantity}: ${formatPrice(item.price * item.quantity)}`,
    );
    const emailSubject = encodeURIComponent("سفارش نوشیدنی از رستوران بنفش");
    const emailBody = encodeURIComponent(
      `${orderLines.join("\n")}\n\nجمع کل: ${formatPrice(total)}`,
    );
    checkoutLink.href = `mailto:${orderEmail}?subject=${emailSubject}&body=${emailBody}`;
  }

  document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.closest(".drinks-items");
      const productId = product.dataset.productId;
      const productName = product.querySelector("h2").textContent.trim();
      const displayedPrice = product.querySelector(".price strong").textContent;
      const latinPrice = displayedPrice
        .replace(/[۰-۹٠-٩]/g, (digit) =>
          String("۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩".indexOf(digit) % 10),
        )
        .replace(/\D/g, "");
      const productPrice = Number(latinPrice);
      const existingItem = cart.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          quantity: 1,
        });
      }

      const saved = saveCart(cart);
      renderCart();
      cartStatus.textContent = saved
        ? `${productName} به سبد خرید اضافه شد.`
        : `${productName} اضافه شد؛ مرورگر امکان ذخیره‌ی سبد را نداد.`;
    });
  });

  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");

    if (!button) {
      return;
    }

    const row = button.closest(".cart-item");
    const itemName = row.querySelector("h3").textContent;
    const item = cart.find((cartItem) => cartItem.name === itemName);

    if (!item) {
      return;
    }

    if (button.dataset.cartAction === "increase") {
      item.quantity += 1;
    } else if (button.dataset.cartAction === "decrease") {
      item.quantity -= 1;
    } else {
      item.quantity = 0;
    }

    const itemIndex = cart.indexOf(item);

    if (item.quantity === 0) {
      cart.splice(itemIndex, 1);
    }

    saveCart(cart);
    renderCart();
  });

  document.querySelector("#cart-toggle").addEventListener("click", () => {
    dialog.showModal();
  });

  document.querySelector("#close-cart").addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  clearCartButton.addEventListener("click", () => {
    cart.splice(0, cart.length);
    saveCart(cart);
    cartStatus.textContent = "سبد خرید خالی شد.";
    renderCart();
  });

  renderCart();
}

function convertDigits(value) {
  return value.replace(/[۰-۹٠-٩]/g, (digit) =>
    String("۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩".indexOf(digit) % 10),
  );
}

function setupReservationForm() {
  const form = document.querySelector("#reservation");

  if (!form) {
    return;
  }

  const phoneInput = form.querySelector('input[type="tel"]');
  const dateInput = form.querySelector('input[type="date"]');
  const status = document.querySelector("#reservation-status");
  const emailLink = document.querySelector("#reservation-email-link");
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  dateInput.min = today.toISOString().slice(0, 10);

  phoneInput.addEventListener("input", () => {
    const phone = convertDigits(phoneInput.value).replace(/[\s()-]/g, "");
    const isValid = /^(?:\+98|0098|0)?9\d{9}$/.test(phone);
    phoneInput.setCustomValidity(
      phoneInput.value && !isValid
        ? "شماره‌ی همراه را به شکل معتبر وارد کنید."
        : "",
    );
    emailLink.hidden = true;
  });

  form.addEventListener("input", () => {
    emailLink.hidden = true;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const phone = convertDigits(phoneInput.value).replace(/[\s()-]/g, "");
    const isPhoneValid = /^(?:\+98|0098|0)?9\d{9}$/.test(phone);
    phoneInput.setCustomValidity(
      phoneInput.value && !isPhoneValid
        ? "شماره‌ی همراه را به شکل معتبر وارد کنید."
        : "",
    );

    if (!form.reportValidity()) {
      emailLink.hidden = true;
      return;
    }

    const fields = [...new FormData(form).entries()];
    const emailBody = encodeURIComponent(
      fields.map(([label, value]) => `${label}: ${value}`).join("\n"),
    );
    const emailSubject = encodeURIComponent("درخواست رزرو میز - رستوران بنفش");

    emailLink.href = `mailto:${orderEmail}?subject=${emailSubject}&body=${emailBody}`;
    emailLink.hidden = false;
    status.textContent =
      "درخواست آماده شد؛ برای بازکردن برنامه‌ی ایمیل دکمه‌ی زیر را انتخاب کنید.";
  });
}

setupDrinksCart();
setupReservationForm();
