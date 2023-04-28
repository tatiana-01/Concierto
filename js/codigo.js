const frmData=document.forms['frmRegistro'];
const frmEnvioData=document.forms['frmEnvio'];
const frmCreditoData=document.forms['frmCredito'];
const RCredito=document.querySelector['#credito'];
const REfectivo=document.querySelector['#efectivo'];
let infoTotal=[];


function limpiarFrm(){
    for(let frmItem of frmData){
        frmItem.value='';
    }
    for(let frmItem of frmCreditoData){
        frmItem.value='';
    }
    for(let frmItem of frmEnvioData){
        frmItem.value='';
    }
    mostrarOcultarContenedor(['#registroInicio'],['#resumenCompra','#cancelado','#metodoPago','#infoCredito','#datosEnvio','#datosFinal','#finalizado','#sobrepaso']);
}

function mostrarOcultarContenedor(mostrarTodos,ocultarTodos){
    mostrarTodos.forEach(element => {
        const divVer=document.querySelector(element);
        divVer.style.display='block';
    });
    ocultarTodos.forEach(element => {
        const divOcultar=document.querySelector(element);
        divOcultar.style.display='none';
    });
}

function precioBoleta(tipo){
    let precio; 
    switch (tipo) {
        case "VIP":
            precio=1000000;
            break;
        case "VIP General":
            precio=800000;
            break;
        case "General":
            precio=600000;
            break;
        case "Graderia":
            precio=400000;
            break;
    }
    return(precio);
}

function resumenData(){
    const divNombre = document.querySelector('#nom');
    const divId = document.querySelector('#cc');
    const divFecha = document.querySelector('#fecha');
    const divBoleta = document.querySelector('#tipo');
    const divCantidad = document.querySelector('#cantidad');
    divNombre.innerHTML=frmData['txtNombre'].value;
    divId.innerHTML=frmData['txtIdentificacion'].value;
    divFecha.innerHTML=frmData['txtFechaConcierto'].value;
    divBoleta.innerHTML=frmData['txtTipoBoleta'].value;
    divCantidad.innerHTML=frmData['txtCantidad'].value;
}

function opTarjeta(){
    resumenData();
    let precio=precioBoleta(frmData['txtTipoBoleta'].value);
    let cantidad=frmData['txtCantidad'].value;
    let subtotal= precio*cantidad;
    let descuento= subtotal*0.03;
    let iva= (subtotal-descuento)*0.19;
    let total= subtotal-descuento+iva;
    const divSubtotal = document.querySelector('#subtotal');
    const divDescuento = document.querySelector('#desc');
    const divIVA = document.querySelector('#iva');
    const divTotal = document.querySelector('#total');
    divSubtotal.innerHTML= subtotal;
    divDescuento.innerHTML= descuento;
    divIVA.innerHTML= iva;
    divTotal.innerHTML= total;
    mostrarOcultarContenedor(['#metodoPago','#resumenCompra','#infoCredito','#datosEnvio'],['#registroInicio','#cancelado','#datosFinal','#finalizado','#sobrepaso']);
}

function opEfectivo(){
    resumenData();
    let precio=precioBoleta(frmData['txtTipoBoleta'].value);
    let cantidad=frmData['txtCantidad'].value;
    let subtotal= precio*cantidad;
    let descuento= subtotal*0.10;
    let iva= (subtotal-descuento)*0.19;
    let total= subtotal-descuento+iva;
    const divSubtotal = document.querySelector('#subtotal');
    const divDescuento = document.querySelector('#desc');
    const divIVA = document.querySelector('#iva');
    const divTotal = document.querySelector('#total');
    divSubtotal.innerHTML= subtotal;
    divDescuento.innerHTML= descuento;
    divIVA.innerHTML= iva;
    divTotal.innerHTML= total;
    mostrarOcultarContenedor(['#metodoPago','#resumenCompra','#datosEnvio'],['#registroInicio','#cancelado','#infoCredito','#datosFinal','#finalizado','#sobrepaso']);
}

function resumenFinal(){
    const divResumen= document.querySelector('#datosResumen');
    const divFinal= document.querySelector('#resumenCompra');
    divResumen.innerHTML=divFinal.innerHTML;
    const divDireccion = document.querySelector('#direcc');
    divDireccion.innerHTML=frmEnvioData['txtDireccion'].value;
    const divCiudad = document.querySelector('#ciudad');
    divCiudad.innerHTML=frmEnvioData['txtCiudad'].value;
    mostrarOcultarContenedor(['#datosFinal'],['#registroInicio','#cancelado','#infoCredito','#metodoPago','#datosEnvio','#finalizado','#resumenCompra','#sobrepaso']);
}


function almacenarInfo(){
    let nombre= frmData['txtNombre'];
    let identificacion= frmData['txtIdentificacion'];
    let fechaConcierto= frmData['txtFechaConcierto'];
    let tipoBoleta= frmData['txtTipoBoleta'];
    let cantidad= frmData['txtCantidad'];
    const divTotal = document.querySelector('#total');
    let total= divTotal.innerHTML;
    let direccionEnvio= frmEnvioData['txtDireccion'];
    let ciudadEnvio= frmEnvioData['txtCiudad'];
    cliente={
        nombre: nombre.value,
        identificacion: identificacion.value,
        fecha: fechaConcierto.value,
        boleta: tipoBoleta.value,
        cantidad: parseInt(cantidad.value),
        total: total,
        direccion: direccionEnvio.value,
        ciudad: ciudadEnvio.value
    }
    infoTotal.push(cliente);
    console.log(infoTotal);
    mostrarOcultarContenedor(['#finalizado'],['#registroInicio','#metodoPago','#resumenCompra','#infoCredito','#datosEnvio','#cancelado','#datosFinal','#sobrepaso'])
}

function revisarCompra(){
let cantidadTotal=0;
let cantidadFrm=parseInt(frmData['txtCantidad'].value);
if (cantidadFrm>2){
    mostrarOcultarContenedor(['#sobrepaso'],['#registroInicio','#metodoPago','#resumenCompra','#infoCredito','#datosEnvio','#cancelado','#datosFinal','#finalizado'])
}else{
    if (infoTotal.length==0){
        mostrarOcultarContenedor(['#metodoPago'],['#registroInicio','#resumenCompra','#cancelado','#infoCredito','#datosEnvio','#datosFinal','#finalizado','#sobrepaso'])
    }else{
        infoTotal.forEach(compra => {
            if(compra.identificacion==frmData['txtIdentificacion'].value){
                let cantidad= compra.cantidad;
                cantidadTotal=cantidadTotal+cantidad+cantidadFrm;
                console.log(cantidad);
            } 
         });
        if (cantidadTotal>2){
            mostrarOcultarContenedor(['#sobrepaso'],['#registroInicio','#metodoPago','#resumenCompra','#infoCredito','#datosEnvio','#cancelado','#datosFinal','#finalizado'])
        }else{
            mostrarOcultarContenedor(['#metodoPago'],['#registroInicio','#resumenCompra','#cancelado','#infoCredito','#datosEnvio','#datosFinal','#finalizado','#sobrepaso'])
        }
    }
}

}


/*function validacionContinuar(){
    let credito= document.querySelector('#credito').checked;
    let efectivo= document.querySelector('#efectivo').checked;

    if(credito){
        mostrarOcultarContenedor(['#infoCredito'],['#metodoPago','#registroInicio','#resumenCompra'])
    }else if(efectivo){
        mostrarOcultarContenedor(['#infoCredito'],['#metodoPago','#registroInicio','#resumenCompra'])
    }
}

mostrarOcultarContenedor(['#sobrepaso'],['#registroInicio','#metodoPago','#resumenCompra','#infoCredito','#datosEnvio','#cancelado','#datosFinal','#finalizado'])

mostrarOcultarContenedor(['#metodoPago'],['#registroInicio','#resumenCompra','#cancelado','#infoCredito','#datosEnvio','#datosFinal','#finalizado','#sobrepaso'])
                 if(compra.cantidad==2){
                    let continuar=false;
                 }else{
                    let continuar=true;
                 }
             }else{
                 let continuar=true;
             }
*/







