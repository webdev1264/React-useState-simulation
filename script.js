const componentHooks = [];
let currentHookIndex = 0;

let form = document.getElementById("form");
let editButton = document.getElementById("editButton");
let firstNameInput = document.getElementById("firstNameInput");
let firstNameText = document.getElementById("firstNameText");
let lastNameInput = document.getElementById("lastNameInput");
let lastNameText = document.getElementById("lastNameText");
let helloText = document.getElementById("helloText");

function useState(initialState) {
  let hook = componentHooks[currentHookIndex];
  if (hook) {
    currentHookIndex++;
    return hook;
  }
  function setState(callback) {
    if (typeof callback === "function") {
      hook[0] = callback(hook[0]);
    } else {
      hook[0] = callback;
    }
    updateDOM();
  }
  hook = [initialState, setState];
  componentHooks[currentHookIndex] = hook;
  currentHookIndex++;
  return hook;
}

function Form() {
  const [name, setName] = useState({
    firstName: "Michael",
    lastName: "Jordan",
  });
  const [isEditing, setIsEditing] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();
    setIsEditing(!isEditing);
  }

  function handleNameChange(e) {
    setName({ ...name, [e.target.name]: e.target.value });
  }

  return {
    isEditing,
    firstName: name.firstName,
    lastName: name.lastName,
    handleFormSubmit,
    handleNameChange,
  };
}

function updateDOM() {
  const { isEditing, firstName, lastName, handleFormSubmit, handleNameChange } =
    Form();

  form.onsubmit = handleFormSubmit;
  firstNameInput.oninput = handleNameChange;
  lastNameInput.oninput = handleNameChange;
  firstNameInput.textContent = firstName;
  lastNameInput.textContent = lastName;
  firstNameText.textContent = firstName;
  lastNameText.textContent = lastName;

  if (isEditing) {
    hide(firstNameText);
    hide(lastNameText);
    show(firstNameInput);
    show(lastNameInput);
  } else {
    hide(firstNameInput);
    hide(lastNameInput);
    show(firstNameText);
    show(lastNameText);
  }

  editButton.innerText = (isEditing ? "Save " : "Edit ") + "Profile";
  helloText.textContent = "Hello, " + firstName + " " + lastName + "!";
  currentHookIndex = 0;
}

function hide(el) {
  el.style.display = "none";
}

function show(el) {
  el.style.display = "";
}

updateDOM();
