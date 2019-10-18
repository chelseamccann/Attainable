export var modal = function(){

    var modal = document.getElementById("simple-modal");
    var modalBtn = document.getElementById("modal-btn");
    var closeBtn = document.getElementsByClassName("close-btn")[0];

    
    //open modal    
    // modalBtn.addEventListener("click", () => {
    //     modal.style.display = "block";
    // });

    //close modal
    closeBtn.addEventListener("click", () => {
        debugger
        d3.select("#modal-school")._groups[0][0].remove()
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if(e.target === modal){
            debugger
            d3.select("#modal-school")._groups[0][0].remove()
            modal.style.display = 'none';
        }
    })

}