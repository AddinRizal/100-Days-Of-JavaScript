// Mendapatkan semua tombol dengan kelas "option-button" dan menyimpannya dalam variabel
let optionsButtons = document.querySelectorAll(".option-button");
// Mendapatkan semua tombol dengan kelas "adv-option-button" dan menyimpannya dalam variabel
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
// Mendapatkan elemen dengan id "fontName" dan menyimpannya dalam variabel
let fontName = document.getElementById("fontName");
// Mendapatkan elemen dengan id "fontSize" dan menyimpannya dalam variabel
let fontSizeRef = document.getElementById("fontSize");
// Mendapatkan elemen dengan id "text-input" dan menyimpannya dalam variabel
let writingArea = document.getElementById("text-input");
// Mendapatkan elemen dengan id "createLink" dan menyimpannya dalam variabel
let linkButton = document.getElementById("createLink");
// Mendapatkan semua tombol dengan kelas "align" dan menyimpannya dalam variabel
let alignButtons = document.querySelectorAll(".align");
// Mendapatkan semua tombol dengan kelas "spacing" dan menyimpannya dalam variabel
let spacingButtons = document.querySelectorAll(".spacing");
// Mendapatkan semua tombol dengan kelas "format" dan menyimpannya dalam variabel
let formatButtons = document.querySelectorAll(".format");
// Mendapatkan semua tombol dengan kelas "script" dan menyimpannya dalam variabel
let scriptButtons = document.querySelectorAll(".script");

// Daftar font yang tersedia
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "Cursive",
];

// Fungsi untuk inisialisasi halaman saat pertama kali dimuat
const intializer = () => {
  // Menambahkan event listener dan highlight pada tombol align
  highlighter(alignButtons, true);
  // Menambahkan event listener dan highlight pada tombol spacing
  highlighter(spacingButtons, true);
  // Menambahkan event listener dan highlight pada tombol format
  highlighter(formatButtons, false);
  // Menambahkan event listener dan highlight pada tombol script
  highlighter(scriptButtons, true);

  // Menambahkan opsi font ke dropdown font
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  // Menambahkan opsi ukuran font ke dropdown ukuran font
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  // Menetapkan ukuran font default
  fontSizeRef.value = 3;
};

// Fungsi untuk memodifikasi teks berdasarkan perintah
const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

// Menambahkan event listener pada setiap tombol opsi
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

// Menambahkan event listener pada setiap tombol opsi lanjutan
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

// Menambahkan event listener pada tombol link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL?");
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

// Fungsi untuk menambahkan highlight pada tombol yang aktif
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = false;
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }
        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

// Fungsi untuk menghapus highlight pada tombol yang tidak aktif
const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

// Memanggil fungsi inisialisasi saat halaman dimuat
window.onload = intializer();
