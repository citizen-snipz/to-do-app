const todoComplete = Array.from(
  document.querySelectorAll("input[type='checkbox']")
);
const trashCan = Array.from(document.querySelectorAll(".far"));

trashCan.forEach((can) => {
  can.addEventListener("click", deleteTask);
});

todoComplete.forEach((todoNode) => {
  todoNode.addEventListener("change", markAsDone);
});

async function deleteTask() {
  const task = this.parentNode.childNodes[3].innerText;
  try {
    const res = await fetch("deleteTask", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: task
      })
    });

    const data = await res.json();
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function markAsDone(e) {
  const completed = e.target.checked;
  const task = e.target.nextElementSibling.innerText;
  try {
    const res = await fetch("markAsDone", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: task,
        completed: completed
      })
    });
    const data = await res.json();
    location.reload();
  } catch (err) {
    console.error(err);
  }
}
