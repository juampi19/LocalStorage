//Variables
const ListaTweets = document.querySelector( '#lista-tweets' );
const formulario = document.querySelector( '#formulario' );
let tweets = [];


//Eventos
eventListeners()
function eventListeners() {
    formulario.addEventListener( 'submit', agregarTweet );

    //Evento para crear los tweet almacenado
    document.addEventListener( 'DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem( 'tweets' ) ) || [];

        crearHTML();
    } )
}


//Funciones
function agregarTweet( e ) {
    e.preventDefault();
    const tweet = document.querySelector( '#tweet' ).value;
    //Comprobamos si el tweet esta vacio
    if( tweet === '' ) {
        mostrarMensaje('El tweet no puede ir vacio');
        return;
    }
    const tweetsObj = {
        id: Date.now(),
        tweet,
    }
    tweets = [ ...tweets, tweetsObj ];
    crearHTML();

    formulario.reset();
}


function mostrarMensaje( error ) {
    const mensaje = document.createElement( 'p' );
    mensaje.textContent = error;
    mensaje.classList.add( 'error' );

    const contenido = document.querySelector( '#contenido' );
    const errores = document.querySelectorAll( 'p.error' );
    if( errores.length === 0 ) {
        contenido.appendChild( mensaje );

        setTimeout(() => {
            mensaje.remove();
        }, 3000);
    }
}

//Agregar al html
function crearHTML() {
    //Limpiamos el html
    limpiarHTML();

    //Añadiendo los tweets al html
    tweets.forEach( tweet => {
        //Creamos el boton de borrar
        const btnBorrar = document.createElement( 'p' );
        btnBorrar.textContent = 'X';
        btnBorrar.classList.add( 'borrar-tweet' );

        //Agregamos una evento al boton
        btnBorrar.onclick = () => {
            borrarTweet( tweet.id );
        }

        //Creamos la lista de los tweets
        const li = document.createElement( 'li' );
        li.textContent = tweet.tweet;

        //Añadimos los elementos al html
        li.appendChild( btnBorrar );
        ListaTweets.appendChild( li );
    } );

    sincronizarLocalStorage();
}

function borrarTweet( id ) {
    tweets = tweets.filter( tweet =>  {
        return tweet.id !== id;
    } );

    crearHTML();
}

function limpiarHTML() {
    while( ListaTweets.firstChild ) {
        ListaTweets.removeChild( ListaTweets.firstChild );
    }
}

function sincronizarLocalStorage() {
    localStorage.setItem( 'tweets', JSON.stringify( tweets ) );
}