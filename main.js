const   tarjeta = document.querySelector('#tarjeta'),
        btnAbriFormulario = document.querySelector('#btn-abrir-formulario'),
        formulario = document.querySelector('#formulario-tarjeta'),
        numeroTarjeta = document.querySelector('#tarjeta .numero'),
        nombreTarjeta = document.querySelector('#tarjeta .nombre'),
        logoMarca = document.querySelector('#logoMarca'),
        firma = document.querySelector('#tarjeta .firma p')
        ccv= document.querySelector('#ccv .ccv'),
        mesExpiracion= document.querySelector('#tarjeta .mes'),
        yearExpiracion=document.querySelector('#tarjeta .year'),
        btnEnviar = document.querySelector('#btnEnviar'),
        mensaje= document.querySelector('.contenedor .mensaje'),
        contenidoMens= document.querySelector('#mensaje');

//tarejtea de frente
const mostarFrente = () =>{
    if (tarjeta.classList.contains('activa')){
        tarjeta.classList.toggle('activa');  
    }
}

//tarejtea de Atras
const mostarAtras = () =>{
    if (!tarjeta.classList.contains('activa')){
        tarjeta.classList.toggle('activa');  
    }
}


//****  RoTACION DE LA TARJETA  */
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('activa');
});

btnAbriFormulario.addEventListener('click', () => {
    btnAbriFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});

// Select del mes generado dinamicamente
 for(let i=1; i<=12;i++){
     let meses =['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
     let opcion = document.createElement('option');
     opcion.value = i;
     opcion.innerText = meses[i-1];
     formulario.selecMes.appendChild(opcion);

 }

 // Select del year generado dinamicamente

 let yearActual = new Date().getFullYear();//tenemos el year actual
 for(let i=yearActual; i<=yearActual + 8;i++){
    let year = document.createElement('option');
     year.value = i;
     year.innerText = i;
     formulario.selecYears.appendChild(year);

}

// Input Numero de tarjeta

formulario.inputNumero.addEventListener('keyup', (e) =>{
    let valorInput= e.target.value;
    formulario.inputNumero.value=valorInput
    //eliminamos espacion en blanco
    .replace(/\s/g,'')
    //eliminar Letras
    .replace(/\D/g,'')
    //PONEMOS ESPACIO CADA 4 NUMERO
    .replace(/([0-9]{4})/g,'$1 ')
    //elimina el ultimo espaciado
    .trim();
    numeroTarjeta.textContent =valorInput;
    if (valorInput =='') {
        numeroTarjeta.textContent ='#### #### #### ####'; 
        logoMarca.innerHTML='';
    }  

    if (valorInput[0] == 4) {
        logoMarca.innerHTML='';
        const imagen = document.createElement('img');
        imagen.src ='img/logos/visa.png';
        logoMarca.appendChild(imagen);
    }
    if (valorInput[0]==5 && valorInput.length==1) {
        const imagen = document.createElement('img');
        imagen.src ='img/logos/mastercard.png';
        logoMarca.appendChild(imagen);
    }

    mostarFrente();
});

// Input Nombre de tarjeta

formulario.inputNombre.addEventListener('keyup', (e) =>{
    let valorInput= e.target.value;
    
    formulario.inputNombre.value=valorInput
    //No numero
    .replace(/([0-9])/g, '');

    nombreTarjeta.textContent=valorInput;

    firma.textContent=valorInput;
    
    if (valorInput=='') {
        nombreTarjeta.textContent='Nombre Apellido';
        firma.textContent='Nombre Apellido';
    }

    mostarFrente();
});
//input del ccv
formulario.inputCCV.addEventListener('keyup', (e) =>{
    let valorInput= e.target.value;
    console.log(valorInput);

    formulario.inputCCV.value=valorInput
    //eliminamos espacion en blanco
    .replace(/\s/g,'')
    //eliminar Letras
    .replace(/\D/g,'')
    //elimina el ultimo espaciado
    .trim();
    ccv.textContent=valorInput;
    mostarAtras();
});

//input select mes
formulario.selecMes.addEventListener('change', (e) =>{
    mesExpiracion.textContent=e.target.value;
    mostarFrente();
});

//input select year
formulario.selecYears.addEventListener('change', (e) =>{
    yearExpiracion.textContent=e.target.value.slice(2);
    mostarFrente();
});


btnEnviar.addEventListener('click', (e) =>{
    e.preventDefault();
    if (formulario.inputNumero.value.length<=11 || formulario.inputNombre.value==='' || formulario.inputCCV.value.length<=2) {
        if (!mensaje.classList.contains('incorrecto')) {
            mensaje.classList.toggle('incorrecto');
            contenidoMens.textContent = 'Complete Todos los campos del Formulario';
            setTimeout(() =>{
                mensaje.classList.toggle('incorrecto');
            },3000);
        }
    }else{
        if (!mensaje.classList.contains('correcto')) {
            mensaje.classList.toggle('correcto');
            contenidoMens.textContent = 'Formulario Completado';
            setTimeout(() =>{
                mensaje.classList.toggle('correcto');
            },3000);
        }

    }

    formulario.inputNumero.value='';
    formulario.inputNombre.value='';
    formulario.inputCCV.value='';

});