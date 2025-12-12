// file preview, file size check, year enforcement and form validation
document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("photoFile");
  const chooseBtn = document.getElementById("chooseFileBtn");
  const fileNameSpan = document.getElementById("fileName");
  const previewImg = document.getElementById("filePreview");
  const annee = document.getElementById("annee");
  const form = document.getElementById("subscriptionForm");

  if (chooseBtn && fileInput) {
    chooseBtn.addEventListener("click", () => fileInput.click());
  }

  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) {
        if (fileNameSpan) fileNameSpan.textContent = "Aucun fichier choisi";
        if (previewImg) {
          previewImg.style.display = "none";
          previewImg.src = "";
        }
        return;
      }
      if (f.size > 3 * 1024 * 1024) {
        alert("Fichier trop volumineux (max 3 MB).");
        fileInput.value = "";
        if (fileNameSpan) fileNameSpan.textContent = "Aucun fichier choisi";
        if (previewImg) {
          previewImg.style.display = "none";
          previewImg.src = "";
        }
        return;
      }
      if (fileNameSpan) fileNameSpan.textContent = f.name;
      if (previewImg) {
        if (f.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            previewImg.src = e.target.result;
            previewImg.style.display = "inline-block";
          };
          reader.readAsDataURL(f);
        } else {
          previewImg.style.display = "none";
          previewImg.src = "";
        }
      }
    });
  }

  if (annee) {
    annee.setAttribute("max", String(new Date().getFullYear()));
    annee.setAttribute("min", "1950");
    annee.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 4);
    });
    annee.addEventListener("input", function () {
      const cleaned = (this.value + "").replace(/[^\d]/g, "");
      this.value = cleaned.slice(0, 4);
    });
    annee.addEventListener("blur", function () {
      if (!this.value) return;
      const val = Number(this.value);
      const min = 1950;
      const max = new Date().getFullYear();
      if (val < min) this.value = String(min);
      if (val > max) this.value = String(max);
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      if (annee && annee.value.length !== 4) {
        e.preventDefault();
        alert(
          "Veuillez entrer une année du baccalauréat valide sur 4 chiffres (ex: 2022)."
        );
        annee.focus();
        return;
      }
      const f = fileInput && fileInput.files && fileInput.files[0];
      if (f && f.size > 3 * 1024 * 1024) {
        e.preventDefault();
        alert("La photo dépasse 3 MB.");
        return;
      }
    });
  }
});
