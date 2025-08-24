document.addEventListener("DOMContentLoaded", () => {
  const safeGet = (id) => document.getElementById(id);

  const themeToggleButton = safeGet("theme-toggle-btn");
  const body = document.body;

  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
      <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
    </svg>`;
  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
      <path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z"></path>
    </svg>`;

  const applyTheme = (theme) => {
    if (theme === "dark-theme") {
      body.classList.add("dark-theme");
      themeToggleButton.innerHTML = sunIcon;
    } else {
      body.classList.remove("dark-theme");
      themeToggleButton.innerHTML = moonIcon;
    }
  };

  const currentTheme = localStorage.getItem("theme") || "light-theme";
  applyTheme(currentTheme);

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      let newTheme = "light-theme";
      if (body.classList.contains("dark-theme")) {
        newTheme = "dark-theme";
      }
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  }

  const loginForm = safeGet("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }

  const cadastroForm = safeGet("cadastroForm");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", handleRegisterSubmit);
  }

  const searchInput = safeGet("search-input");
  if (searchInput) {
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const query = event.target.value;
        if (query) {
          const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
          window.location.href = googleSearchUrl;
        }
      }
    });
  }

  const searchIcon = document.querySelector(".search-icon");
  if (searchIcon && searchInput) {
    searchIcon.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.location.href = googleSearchUrl;
      }
    });
  }

  const openMenuButton = safeGet("open-menu-btn");
  const closeMenuButton = safeGet("close-modal-btn");
  const menuModal = safeGet("menu-modal");

  if (openMenuButton && menuModal) {
    openMenuButton.addEventListener("click", () => {
      menuModal.classList.add("active");
    });
  }

  if (closeMenuButton && menuModal) {
    closeMenuButton.addEventListener("click", () => {
      menuModal.classList.remove("active");
    });
  }

  if (menuModal) {
    menuModal.addEventListener("click", (event) => {
      if (event.target === menuModal) {
        menuModal.classList.remove("active");
      }
    });
  }
});

function handleLoginSubmit(event) {
  event.preventDefault();
  clearErrors();

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");

  const name = nameEl?.value.trim() || "";
  const email = emailEl?.value.trim() || "";
  const password = passwordEl?.value.trim() || "";
  let hasErrors = false;

  if (name === "") {
    displayError("name", "O campo Nome é obrigatório.");
    hasErrors = true;
  }

  if (email === "") {
    displayError("email", "O campo Email é obrigatório.");
    hasErrors = true;
  } else if (!isValidEmail(email)) {
    displayError("email", "Por favor, insira um endereço de email válido.");
    hasErrors = true;
  }

  if (password === "") {
    displayError("password", "O campo Senha é obrigatório.");
    hasErrors = true;
  }

  if (!hasErrors) {
    console.log("Login bem-sucedido! Redirecionando...");
    window.location.href = "meu-progresso.html";
  }
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  clearErrors();

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const telefoneEl = document.getElementById("telefone");
  const passwordEl = document.getElementById("password");
  const confirmEl = document.getElementById("confirm-password");

  const name = nameEl?.value.trim() || "";
  const email = emailEl?.value.trim() || "";
  const telefone = telefoneEl?.value.trim() || "";
  const password = passwordEl?.value.trim() || "";
  const confirmPassword = confirmEl?.value.trim() || "";
  let hasErrors = false;

  if (name === "") {
    displayError("name", "O campo Nome é obrigatório.");
    hasErrors = true;
  }

  if (email === "") {
    displayError("email", "O campo Email é obrigatório.");
    hasErrors = true;
  } else if (!isValidEmail(email)) {
    displayError("email", "Por favor, insira um endereço de email válido.");
    hasErrors = true;
  }

  if (telefone === "") {
    displayError("telefone", "O campo Telefone é obrigatório.");
    hasErrors = true;
  }

  if (password === "") {
    displayError("password", "O campo Senha é obrigatório.");
    hasErrors = true;
  }

  if (confirmPassword === "") {
    displayError("confirm-password", "A confirmação da senha é obrigatória.");
    hasErrors = true;
  } else if (password !== confirmPassword) {
    displayError("confirm-password", "As senhas não coincidem.");
    hasErrors = true;
  }

  if (!hasErrors) {
    console.log("Cadastro bem-sucedido! Redirecionando para o login...");
    window.location.href = "login.html";
  }
}

function displayError(inputId, message) {
  const inputElement = document.getElementById(inputId);
  if (!inputElement || !inputElement.parentElement) return;
  const existing = inputElement.parentElement.querySelector(".error-text");
  if (existing) existing.remove();

  const errorElement = document.createElement("p");
  errorElement.className = "error-text";
  errorElement.textContent = message;
  inputElement.parentElement.appendChild(errorElement);
}

function clearErrors() {
  document.querySelectorAll(".error-text").forEach((e) => e.remove());
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
