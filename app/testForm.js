function loadTestForm(){
    let btnEnviarMonito = document.getElementById("btn_enviar_monito");
    btnEnviarMonito.addEventListener("click", (evento) => {
        evento.preventDefault();
        
        let name = document.getElementById("myname").value;
        let age = document.getElementById("age").value;
        alert(`solo soy un mono mas, me llamo ${name} y tengo ${age} pepinos`);
    });
}