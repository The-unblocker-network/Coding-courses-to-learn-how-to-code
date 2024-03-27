document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("language-select");
  
  languageSelect.addEventListener("change", function () {
    const selectedLanguage = languageSelect.value;
    loadTipsAndDictionary(selectedLanguage);
  });
});

function loadTipsAndDictionary(language) {
  fetch('tips_and_dictionary.json')
    .then(response => response.json())
    .then(data => {
      const tips = data[language].tips;
      const dictionary = data[language].dictionary;
      
      // Display tips and dictionary entries
      displayTips(tips);
      displayDictionary(dictionary);
    });
}

function displayTips(tips) {
  const tipSection = document.querySelector(".tips");
  tipSection.innerHTML = "<h2>Tips:</h2>";
  
  tips.forEach(tip => {
    const tipItem = document.createElement("p");
    tipItem.textContent = tip;
    tipSection.appendChild(tipItem);
  });
}

function displayDictionary(dictionary) {
  const dictionarySection = document.querySelector(".dictionary");
  dictionarySection.innerHTML = "<h2>Dictionary:</h2>";
  
  for (const term in dictionary) {
    const definition = dictionary[term].description;
    const example = dictionary[term].example;
    
    const dictionaryItem = document.createElement("div");
    dictionaryItem.classList.add("dictionary-item");
    dictionaryItem.innerHTML = `<p><strong>${term}:</strong> ${definition}</p><p><em>Example:</em> ${example}</p>`;
    
    dictionarySection.appendChild(dictionaryItem);
  }
}

// Simulate progress tracking with local storage
document.querySelectorAll('.start-button').forEach(button => {
  button.addEventListener('click', () => {
    const courseName = button.parentElement.querySelector('h2').textContent;
    localStorage.setItem('currentCourse', courseName);
  });
});

// Check for completed courses on page load
document.addEventListener("DOMContentLoaded", function () {
  const currentCourse = localStorage.getItem('currentCourse');
  const courses = document.querySelectorAll('.course');
  courses.forEach(course => {
    const courseName = course.querySelector('h2').textContent;
    if (courseName === currentCourse) {
      course.classList.remove('locked');
    }
  });
});

