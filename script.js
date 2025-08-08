const mainWadah = document.querySelector("#mainWadah");
const victory = document.querySelector("#victory");
const seimbang = document.querySelector("#seimbang");
const lose = document.querySelector("#lose");
const score = document.querySelector("#score")
const playAgainButtons = document.querySelectorAll(".playAgain")
const themeToggle = document.querySelector("#themeToggle");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    themeToggle.setAttribute("aria-label", "Switch to light mode");
}else{
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

if(localStorage.getItem("scoreSuit")){
    score.innerHTML = localStorage.getItem("scoreSuit")
}

playAgainButtons.forEach(button => {
  button.addEventListener("click", () => {
    victory.style.display = "none";
    lose.style.display = "none";
    seimbang.style.display = "none";
    tampilkanPilihan();
  });
});

mainWadah.addEventListener("click",(e) => {

  if(e.target.classList.contains("pilihanSuit")){
    const pilihan = e.target.getAttribute("data-suit");
    const musuh = Math.floor(Math.random() * 3)
    const imgPlayer = imgPilihan(Number(pilihan));
    const imgMusuh = imgPilihan(Number(musuh));
    mainWadah.innerHTML = 
    ` 
    <img  data-suit="2" style="opacity: 0;"  src="asset/${imgMusuh}" alt="musuh"><br> 
    <img class="atas-and-hide" src="asset/${imgPlayer}" alt="player" >
    `

    setTimeout(() => {
      mainWadah.innerHTML = 
      `
      <img  data-suit="2" class="bawah-and-hide" src="asset/${imgMusuh}" alt="player"><br> 
      <img  src="asset/${imgPlayer}" >
      `
    },1000)
    
    setTimeout(() => {
      sistemSuit(Number(pilihan),Number(musuh))
    },2000)

  }

  if(e.target.id === "startButton"){
    tampilkanPilihan()
  }

})

function tampilkanPilihan () {
    mainWadah.innerHTML = `
      <img  data-suit="0" class="pilihanSuit minecraft-item"  src="asset/Batu.png" alt="batu">
      <img  data-suit="1" class="pilihanSuit reverse-item"  src="asset/kertas.png" alt="kertas">
      <img  data-suit="2" class="pilihanSuit minecraft-item"  src="asset/gunting.png" alt="gunting">
    `
}

function sistemSuit (player,musuh) {  

  if(player === musuh){
    seimbang.style.display = "flex";
    return
  }

  if(player === 0 && musuh === 1){
    spawnLose ()
    return 
  }

  if(player === 0 && musuh === 2){
    spawnVictory()
    return 
  }

  if(player === 1 && musuh === 0 ){
    spawnVictory()
    return 
  }

  if(player === 1 && musuh === 2 ){
    spawnLose () 
    return 
  }

  if(player === 2 && musuh === 1 ){
    spawnVictory()
    return 
  }

  if(player === 2 && musuh === 0 ){
    spawnLose () 
    return 
  }

  alert("error")

}

function imgPilihan (pilihan) {
  switch (pilihan) {
    case 0:
      return `Batu.png`;
    case 1:
      return `kertas.png`;
    case 2:
      return `gunting.png`;
    default:
      throw new Error("Pilihan tidak valid");
  }
}

function spawnVictory () {
  const hasil =  Number(score.innerHTML) + 100;  
  SetScore(hasil)  
  victory.style.display = "flex"
}

function spawnLose () {
  const hasil =  Number(score.innerHTML) - 100;  
  SetScore(hasil)
  lose.style.display = "flex"
}

function SetScore (hasil) {
  localStorage.setItem("scoreSuit",hasil);
  score.innerHTML = hasil; 
}
