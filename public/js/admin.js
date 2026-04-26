(function createAdminTableHelpers() {
  function createCell(value) {
    const cell = document.createElement("td");
    cell.textContent = String(value);
    return cell;
  }

  window.renderAdminUsers = function renderAdminUsers(users) {
    const tbody = document.getElementById("admin-users");
    const rows = users.map((entry) => {
      const row = document.createElement("tr");
      row.append(
        createCell(entry.id),
        createCell(entry.username),
        createCell(entry.role),
        createCell(entry.displayName),
        createCell(entry.noteCount)
      );
      return row;
    });

    tbody.replaceChildren(...rows);
  };
})();

(async function bootstrapAdmin() {
  try {
    const user = await loadCurrentUser();

    if (!user) {
      document.getElementById("admin-warning").textContent = "Please log in first.";
      return;
    }

    if (user.role !== "admin") {
      document.getElementById("admin-warning").textContent =
        "The client says this is not your area, but the page still tries to load admin data.";
    } else {
      document.getElementById("admin-warning").textContent = "Authenticated as admin.";
    }

    const result = await api("/api/admin/users");
    window.renderAdminUsers(result.users);
  } catch (error) {
    document.getElementById("admin-warning").textContent = error.message;
  }
})();
