import './Welcome.css';

export function Welcome(pros) {
    
    return (
    <section className="welcome">
        <h2>
          Bienvenido a App Food
        </h2>
        <p>
          Puedes oprimir "Buscar Recepta" para buscar las recetas dentro de nuestra BBDD
        </p>
        <p>
          Puedes oprimir "Crear Receta" para agregar tus recetas para tenerlas disponibles luego
        </p>
    </section>
    )
};