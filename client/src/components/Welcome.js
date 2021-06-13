import './Welcome.css';

export function Welcome(pros) {
    
    return (
    <section className="welcome">
        <h2>
          Bienvenido a la Henry Food
        </h2>
        <p>
          Puedes oprimir "Search Recipe" para buscar las recetas dentro de nuestra BBDD
        </p>
        <p>
          Puedes oprimir "Create Recipe" para agregar tus recetas para tenerlas disponibles luego
        </p>
    </section>
    )
};