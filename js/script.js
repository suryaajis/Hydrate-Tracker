window.onload = function() {
  document.getElementById("bar").style.width = "0%";
}

// let gender = document.getElementById('gender-list')
let bar; // = 3700;  
let gender;
let umur;
let selisih;
let nama;

// FUNCTION
function maxBar(gender, age){
    var result = 0
    if(age < 14 && age > 0){
        result = 1300
    } if(age >= 14){
        if(gender === 'Wanita'){ //<<< ganti icon / string?
            result = 2700
        }else if(gender === 'Pria'){
            result = 3700
        }else{return `invalid gender`}
    }
    return result
}
//var bar = maxBar(gender, age) //<<< angka bar maksimal

const resetInput = document.getElementById('umur-gender-submit')
resetInput.addEventListener('click', function(event) {
  event.preventDefault()
  document.getElementById('input-data').reset()
  
  let status = document.getElementById('status')
  const progBar = document.getElementById("bar");
  
  progBar.style.width = '0%'
  selisih = bar;
  status.innerHTML = `${selisih} ml to go! Drink more ${nama}`
})


function onSubmit() {
  umur = document.getElementById("umur").value;
  gender = document.getElementById("gender-list").value;
  nama = document.getElementById('userName').value
  bar = maxBar(gender, umur);
  console.log(bar, nama);
  //console.log(umur, gender);
  selisih = bar;

  const statues = document.getElementById('status')
  statues.textContent = `Status: ${nama}, ${umur}, ${gender}`
}
// console.log(onSubmit())

var waterCount = 0 //<<< inputan air usernya

//update ke button
function getWater(button){
    count = 0
    if(button1){
        count += 200 //<< input icon 1
    }if(button2){
        count += 600 //<< input icon 2
    }if(button3){
        count += 1500 //<< input icon 3
    }if(button4){
        count += button4 //<< input air yang custom
    }
}

//update result
function getStatus(width){
  const progBar = document.getElementById("bar");
  let status = document.getElementById('status')
  let username = nama
    // var bar = 3700;
    selisih = selisih - width
    if(selisih <= 0){
        status.innerHTML = `You have had enough water today to keep you healthy :)`
    }else{
        status.innerHTML = `${selisih} ml to go! Drink more ${username}`
    }
}


function updateProgressBar(value) {
  if(!bar) {
    // console.log("input gender and age first...");
    const stat = document.getElementById('status')
    stat.textContent = `Fill input name, gender, and age first`
    return stat
  }

  const progBar = document.getElementById("bar");
  let width = progBar.style.width;
  width = +width.substr(0, width.length-1);
  let add = value/bar * 100;
  width += add;
  if(width <= 100) {
    progBar.style.width = width + '%';
    progBar.style.transition = 'all 0.5s ease-in'
  } else {
    progBar.style.width = '100%';
  }
  getStatus(value)
  console.log(value)
}


// DOM
const resetBtn = document.querySelector('.reset-button')
resetBtn.addEventListener('click', function() {
  let status = document.getElementById('status')
  const progBar = document.getElementById("bar");
  if(!bar) {
    // console.log("input gender and age first...");
    const stat = document.getElementById('status')
    stat.textContent = `Fill input name, gender, and age first`
    stat.style.boxShadow = '1px 1px 10px black;'
    return stat
  }

  progBar.style.width = '0%'
  selisih = bar;
  status.innerHTML = `${selisih} ml to go! Drink more ${nama}`
})
