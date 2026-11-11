const STORAGE_KEY = "jobtracker_v2";

let jobs = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
);

function saveData(){
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(jobs)
    );
}

function addCandidate(){

    const company =
        document.getElementById("company").value.trim();

    const position =
        document.getElementById("position").value.trim();

    if(!company || !position){
        alert("Entreprise et poste obligatoires");
        return;
    }

    jobs.push({
        id:Date.now(),
        company:company,
        position:position,
        status:0
    });

    saveData();

    document.getElementById("company").value="";
    document.getElementById("position").value="";

    render();
}

function moveCandidate(id,direction){

    const job =
        jobs.find(j => j.id === id);

    if(!job) return;

    job.status += direction;

    if(job.status < 0) job.status = 0;
    if(job.status > 4) job.status = 4;

    saveData();

    render();
}

function deleteCandidate(id){

    jobs = jobs.filter(
        j => j.id !== id
    );

    saveData();

    render();
}

function render(){

    for(let i=0;i<5;i++){

        document.getElementById(
            "col"+i
        ).innerHTML="";
    }

    jobs.forEach(job => {

        const card =
            document.createElement("div");

        card.className="card";

        card.innerHTML=`
            <div class="company">
                ${job.company}
            </div>

            <div>
                ${job.position}
            </div>

            <div class="buttons">
                <button onclick="moveCandidate(${job.id},-1)">◀</button>
                <button onclick="moveCandidate(${job.id},1)">▶</button>
                <button onclick="deleteCandidate(${job.id})">🗑</button>
            </div>
        `;

        document
            .getElementById("col"+job.status)
            .appendChild(card);

    });

    document.getElementById("total").textContent =
        jobs.length;

    document.getElementById("entretiens").textContent =
        jobs.filter(j=>j.status===2).length;

    document.getElementById("offres").textContent =
        jobs.filter(j=>j.status===3).length;
}

render();
