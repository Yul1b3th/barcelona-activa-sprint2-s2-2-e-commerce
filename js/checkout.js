const formulario = document.querySelector( '#form' );
const inputs = document.querySelectorAll( '#form input' );

const expresiones = {
 fName: /^[a-zA-ZÀ-ÿ\s]{3,40}$/u,
 fLastN: /^[a-zA-ZÀ-ÿ\s]{3,40}$/u,
 fEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
 fAddress: /^.{3,}$/,
 fPassword: /^.{3,8}$/,
 fPhone: /^\d{3,14}$/
};

const campos = {
 fName: false,
 fLastN: false,
 fEmail: false,
 fPassword: false,
 fAddress: false,
 fPhone: false,
};

const validarFName = () => {
 const inputFName = document.getElementById( 'fName' );
 // Limpia y restringe caracteres no permitidos
 inputFName.value = inputFName.value.trim().replace( /[^a-zA-ZÀ-ÿ\s]+/ug, '' );
 const isValid = expresiones.fName.test( inputFName.value );

 inputFName.classList.toggle( 'is-valid', isValid );
 inputFName.classList.toggle( 'is-invalid', !isValid );
 campos.fName = isValid;
};

const validarFLastN = () => {
 const inputFLastN = document.getElementById( 'fLastN' );
 // Limpia y restringe caracteres no permitidos
 inputFLastN.value = inputFLastN.value.trim().replace( /[^a-zA-ZÀ-ÿ\s]+/ug, '' );
 const isValid = expresiones.fLastN.test( inputFLastN.value );

 inputFLastN.classList.toggle( 'is-valid', isValid );
 inputFLastN.classList.toggle( 'is-invalid', !isValid );
 campos.fLastN = isValid;
};

const validarFEmail = () => {
 const inputFEmail = document.getElementById( 'fEmail' );
 // Limpia y restringe caracteres no permitidos
 inputFEmail.value = inputFEmail.value.trim();
 const isValid = expresiones.fEmail.test( inputFEmail.value );

 inputFEmail.classList.toggle( 'is-valid', isValid );
 inputFEmail.classList.toggle( 'is-invalid', !isValid );
 campos.fEmail = isValid;
};

const validarFPassword = () => {
 const inputFPassword = document.getElementById( 'fPassword' );
 // Limpia y restringe caracteres no permitidos
 inputFPassword.value = inputFPassword.value.trim();
 const isValid = expresiones.fPassword.test( inputFPassword.value );

 inputFPassword.classList.toggle( 'is-valid', isValid );
 inputFPassword.classList.toggle( 'is-invalid', !isValid );
 campos.fPassword = isValid;
};

const validarFAddress = () => {
 const inputFAddress = document.getElementById( 'fAddress' );
 // Limpia y restringe caracteres no permitidos
 const isValid = expresiones.fAddress.test( inputFAddress.value );

 inputFAddress.classList.toggle( 'is-valid', isValid );
 inputFAddress.classList.toggle( 'is-invalid', !isValid );
 campos.fAddress = isValid;
};

const validarFPhone = () => {
 const inputFPhone = document.getElementById( 'fPhone' );
 // Limpia y restringe caracteres no permitidos
 inputFPhone.value = inputFPhone.value.trim().replace( /[^0-9]/g, '' );
 const isValid = expresiones.fPhone.test( inputFPhone.value );

 inputFPhone.classList.toggle( 'is-valid', isValid );
 inputFPhone.classList.toggle( 'is-invalid', !isValid );
 campos.fPhone = isValid;
};

document.getElementById( 'fName' ).addEventListener( 'input', validarFName );
document.getElementById( 'fLastN' ).addEventListener( 'input', validarFLastN );
document.getElementById( 'fEmail' ).addEventListener( 'input', validarFEmail );
document.getElementById( 'fPassword' ).addEventListener( 'input', validarFPassword );
document.getElementById( 'fAddress' ).addEventListener( 'input', validarFAddress );
document.getElementById( 'fPhone' ).addEventListener( 'input', validarFPhone );

document.getElementById( 'btn' ).addEventListener( 'click', function ( e ) {
 e.preventDefault();

 // Validar cada campo antes de agregar la clase .was-validated
 validarFName();
 validarFLastN();
 validarFEmail();
 validarFPassword();
 validarFAddress();
 validarFPhone();

 if ( campos.fName && campos.fLastN && campos.fEmail && campos.fPassword && campos.fAddress && campos.fPhone ) {
  // Simular el envío del formulario si todos los campos son válidos
  formulario.submit();
 }
} );