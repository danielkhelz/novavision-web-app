(() => {
      const registerSelector = "#registerButton, #gateRegisterButton, [data-mobile-register], [data-open-register], [data-start-plan], [data-start-free]";
      const loginSelector = "#loginButton, #gateLoginButton, [data-mobile-login]";

      const openRegisterModal = button => {
        const modal = document.getElementById("authModal");
        if (!modal) return;
        const showModal = () => {
          modal.classList.remove("hidden");
          document.body.classList.add("modal-open");
          document.body.style.overflow = "hidden";
        };
        showModal();
        window.setTimeout(showModal, 0);

        try {
          const role = button?.dataset.openRegister || button?.dataset.startPlan || "artist";
          if (button?.matches("[data-start-plan]")) {
            window.startPlanRegistration?.(role);
          } else {
            window.startFreeRegistration?.(role);
          }
        } catch (error) {
          console.warn("Registrazione aperta con fallback.", error);
        }
      };

      const bindRegisterButtons = () => {
        const registerButtons = document.querySelectorAll(registerSelector);

        registerButtons.forEach(button => {
          button.addEventListener("click", () => {
            openRegisterModal(button);
          });
        });

        const handleRegisterActivation = event => {
          const button = event.target.closest(registerSelector);
          if (!button) return;
          openRegisterModal(button);
        };

        document.addEventListener("click", handleRegisterActivation, true);

        document.addEventListener("click", event => {
          const button = event.target.closest(loginSelector);
          if (!button) return;
          window.setAuthMode?.("login");
          window.setTimeout(() => {
            const modal = document.getElementById("authModal");
            if (!modal) return;
            modal.classList.remove("hidden");
            document.body.style.overflow = "hidden";
          }, 0);
        }, true);
      };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bindRegisterButtons, { once: true });
      } else {
        bindRegisterButtons();
      }
    })();

// Rimuove cache e vecchi service worker delle versioni precedenti.
    window.addEventListener("load", async () => {
      try {
        if ("serviceWorker" in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map(registration => registration.unregister()));
        }
        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map(key => caches.delete(key)));
        }
      } catch (_) {}
    });
