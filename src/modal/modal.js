export var modal = function(){

    var modal = document.getElementById("simple-modal");
    var modalBtn = document.getElementById("modal-btn");
    var closeBtn = document.getElementsByClassName("close-btn")[0];

    //open modal
    modalBtn.addEventListener("click", () => {
        debugger
        modal.style.display = "block";
    });

    //close modal
    closeBtn.addEventListener("click", () => {
        debugger
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if(e.target === modal){
            modal.style.display = 'none';
        }
    })

}