const todoComplete = Array.from(document.querySelectorAll(".completedTick"));
const trashCan = Array.from(document.querySelectorAll(".fa-dumpster"));

trashCan.forEach((can) => {
  can.addEventListener("click", deleteTask);
});

todoComplete.forEach((todoNode) => {
  todoNode.addEventListener("click", markAsDone);
});

async function deleteTask() {
  const taskDone = this.parentNode.childNodes[1].innerText;
  try {
    const res = await fetch("deleteTask", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: taskDone
      })
    });

    const data = await res.json();
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function markAsDone() {
  const taskDone = this.parentNode.childNodes[1].innerText;
  try {
    const res = await fetch("markAsDone", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: taskDone
      })
    });
    const data = await res.json();
    location.reload();
  } catch (err) {
    console.error(err);
  }
}
