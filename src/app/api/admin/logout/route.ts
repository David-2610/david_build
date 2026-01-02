
// POST /api/admin/logout
export async function adminLogout() {
  await fetch("/api/admin/logout", {
    method: "POST",
    credentials: "include",
  });

  window.location.href = "/admin/login";
}

