
export var instrux = function(){

    var modal = document.getElementById("simple-modal-onload");
    var modalBtn = document.getElementById("modal-btn-onload");
    var closeBtn = document.getElementsByClassName("close-btn-onload")[0];


    d3.select("#simple-modal-onload").style("display", "block")

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if(e.target === modal){
            modal.style.display = 'none';
        }
    })

}