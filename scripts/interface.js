import {
  documents,
  load_documents,
  add_message_to_documents,
  on_snapshot,
} from "./script.js";

function format_date(date, format) {
  const formatMap = {
    DD: String(date.getDate()).padStart(2, "0"),
    MM: String(date.getMonth() + 1).padStart(2, "0"),
    YY: date.getFullYear().toString().slice(-2),
    YYYY: date.getFullYear(),
    hh: String(date.getHours()).padStart(2, "0"),
    mm: String(date.getMinutes()).padStart(2, "0"),
  };
  return format.replace(/DD|MM|YY|hh|mm/gi, (matched) => formatMap[matched]);
}
setTimeout(() => {
  for (var i in documents) {
    if (i == 0) {
      rebuild_html(documents[i]);
    } else {
      build_html(documents[i]);
    }
  }
}, 750);

export function make_message() {
  let codename = document.getElementById("codename").value;
  let message = document.getElementById("message").value;
  let error = document.getElementsByClassName("error")[0];
  let date = new Date(Date.now());
  let formatted_date = format_date(date, "DD/MM/YY hh:mm");

  if (!codename) {
    codename = "Anônimo";
  }

  if (!message) {
    error.style.display = "inline-block";
    console.log("Erro");
    setTimeout(() => {
      error.style.display = "none";
    }, 5000);
  }

  if (codename && message) {
    add_message_to_documents(codename, message, date, formatted_date);
    setTimeout(() => {
      for (var i in documents) {
        if (i == 0) {
          rebuild_html(documents[i]);
        } else {
          build_html(documents[i]);
        }
      }
    }, 750);
  }
}

export function rebuild_html(doc) {
  let messages_area = document.getElementsByClassName("messages_area")[0];
  messages_area.innerHTML = `
  <div class="message_container">
    <h1 class="codename">${doc.codename}</h1>
    <p class="message">${doc.msg}</p>
    <div class="date">
      <p id="date">${doc.formatted_date}</p>
    </div>
    <div class="control">
      <i class="bi-arrow-up"></i>
      <i class="bi-arrow-down"></i>
      <i class="bi-chat"></i>
      <i class="bi-flag-fill"></i>
    </div>
  </div>`;
}

export function build_html(doc) {
  let messages_area = document.getElementsByClassName("messages_area")[0];
  messages_area.innerHTML += `
  <div class="message_container">
    <h1 class="codename">${doc.codename}</h1>
    <p class="message">${doc.msg}</p>
    <div class="date">
      <p id="date">${doc.formatted_date}</p>
    </div>
    <div class="control">
      <i class="bi-arrow-up"></i>
      <i class="bi-arrow-down"></i>
      <i class="bi-chat"></i>
      <i class="bi-flag-fill"></i>
    </div>
  </div>`;
}

let submit_button = document.getElementsByClassName("local_submit_btn");
submit_button[0].addEventListener("click", make_message);
