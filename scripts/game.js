arr = [];
for(const x in flags) {
    arr.push(x);
}

const set = new Set();
for(let i = 0; i < 5; i++) {
    let num = Math.floor(Math.random() * arr.length);
    console.log(num);
    while(set.has(num)) {
        num = Math.floor(Math.random() * arr.length);
    }
    set.add(num);
}

const Nums = Array.from(set);
for(x of Nums) {
    console.log(x);
}

let arr2 = [];
for(let i = 0; i < 5; i++) {
    var img = document.createElement("img");
    img.src = "https://flagcdn.com/h240/"+ arr[Nums[i]]+".png"
    arr2.push(img);
    console.log(arr2[i])
}

let button = document.getElementById("submit");
let text = document.getElementById("guess");
let score = document.getElementById("score");
let times = document.getElementById("times");
let num = 0;
document.getElementById("flag").appendChild(arr2[0]);
let idx = 0;

button.addEventListener("click", () => {
    if(text.value === "") {
        alert("You must submit text");
    } else {
        if(idx < 4) {
            document.getElementById("flag").removeChild(arr2[idx]);
            idx++;
            document.getElementById("flag").appendChild(arr2[idx]);
            console.log(text.value);
            if(text.value == "a") {
                score.innerHTML = parseInt(score.innerHTML) + 1;
            }
            times.innerHTML = parseInt(times.innerHTML) +1;
            text.value = "";
        } else {
            const points = score.innerHTML;
            const items = document.querySelectorAll(".items");
            items.forEach(item => {
                console.log()
                item.remove();
            });
            let finalScore = document.createElement("div");
            finalScore.innerHTML = points + "/5";
            document.body.appendChild(finalScore);

        }
    
    }
});




function generateFlag(num) {
    var img = document.createElement("img");
    img.src = "https://flagcdn.com/h240/"+ arr[num]+".png"
    document.getElementById("flag").appendChild(img);
    // var g = document.createElement("div");
    // g.innerHTML = flags[arr[num]];
    // document.getElementById("flag").appendChild(g);
}

    