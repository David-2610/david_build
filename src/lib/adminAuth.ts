export function adminLogout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_token_exp");
    window.location.href = "/admin/login";
  }
  