class Team {
    constructor(name) {
        this.name = name;
        this.penaltiesAvailable = 5;
        this.penaltiesScored = 0;
    }
}

const ROUNDS = 5;
const penaltiesToShoot = ROUNDS * 2;
const argentina = new Team("Argentina");
const francia = new Team("Francia");

function startPenalties(teamOne, teamTwo) {
    let currentTeam = teamOne;

    for (let i = 0; i < penaltiesToShoot; i++) {
        // Determinar si el equipo actual marcó gol
        const goal = Boolean(Math.round(Math.random()));
        if (goal) currentTeam.penaltiesScored++;

        currentTeam.penaltiesAvailable--;

        // Cada vez que se patea se verifica si los goles anotados por el equipo que pateó
        // son mayores a los goles anotados por el equipo rival más su cantidad actual de penales dispoibles

        if (
            teamOne.penaltiesScored >
                teamTwo.penaltiesScored + teamTwo.penaltiesAvailable ||
            teamTwo.penaltiesScored >
                teamOne.penaltiesScored + teamOne.penaltiesAvailable
        ) {
            return console.log(
              `${teamOne.name}: ${teamOne.penaltiesScored} ${teamTwo.name}: ${teamTwo.penaltiesScored}`
            );
        }

        // Cambiar de equipo para la siguiente iteración

        currentTeam = currentTeam === teamOne ? teamTwo : teamOne;

        /*
          Es importante destacar que esta comparación puede hacerse directamente entre los objetos
          porque al inicializar "currentTeam" se lo iguala a "teamOne". Si no fuese así habría que
          compararlos por sus propiedades, ya que ambos objetos apuntarían a una sección distinta en memoria:

          currentTeam = currentTeam.name === teamOne.name ? teamTwo : teamOne; 
        */
    }

    // Si se terminan las 5 rondas y hay empate desempatar penal por penal

    let tie = true;
    while (tie) {
        const teamOneGoal = Boolean(Math.round(Math.random()));
        if (teamOneGoal) teamOne.penaltiesScored++;

        const teamTwoGoal = Boolean(Math.round(Math.random()));
        if (teamTwoGoal) teamTwo.penaltiesScored++;

        if (teamOneGoal !== teamTwoGoal) {
            return console.log(
              `${teamOne.name}: ${teamOne.penaltiesScored} ${teamTwo.name}: ${teamTwo.penaltiesScored}`
            );
        }
    }
}

startPenalties(argentina, francia);
