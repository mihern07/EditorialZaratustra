# EditorialZaratustra
**EDITORIAL ZARATUSTRA**

**Documento de diseño de videojuego**

**Grupo 09**

![](RackMultipart20201122-4-19mp3ec_html_2b1e88affe78ade.jpg)

_Daniel Illanes, Alejandro Ortega, Miguel Hernández, Sergio José Alfonso (Chikito)_

Versión 1.0 - 16 de octubre de 2020

| **Resumen** |
| --- |
| **Géneros:**
Point and click |
| **Público objetivo:**
Mayores de 16 años. |
| **Modos:**
Un jugador |
| **Plataformas:**
PC con teclado y ratón. |
| **Hitos:**
Fecha de propuesta del concepto (14/10/2020)_
Fechas de pre-producción (/2020)
Fechas de producción (/2020 -/2020)
Fecha de lanzamiento (/2020) |

**Página del juego**
https://mihern07.github.io/EditorialZaratustra/

**Página de gestión**
https://www.pivotaltracker.com/projects/2470815

**Descripción**

El juego se sitúa en el Madrid de los años 20. Nos encontramos en la recepción de la Editorial Zaratustra, donde nuestro trabajo será decidir si los libros que nos entregan serán rentables a la editorial al más puro estilo &quot;Papers, Please&quot;. A lo largo de las jornadas, la partida se irá complicando, de manera que el jugador tendrá que tener más factores en cuenta para hacer bien su trabajo y no ser despedido.

**Logotipo y portada del juego**

**Tabla de contenidos**

1. Aspectos Generales

2. Menús y modos de juego

2.1. Control

3. Jugabilidad

3.1. Mecánica

3.2. Dinámica

3.3. Estética

3.4. Eventos

4. Arquitectura

5. Contenido

5.1. Contexto y universo

5.2. Historia

5.3. Narrativa

5.4. Niveles

5.5. Objetos

5.6. Sonido SFX

6. Referencias

7. Links

///////////////////////////////////////////

1. **Aspectos generales**

Se busca un loop jugable rápido, donde el jugador deberá tener en cuenta varios factores para hacer bien su trabajo al igual que en Papers Please. Hay algunas mecánicas que diferirán de lo que nos podemos encontrar en el juego de Lucas Pope, y vendrán explicadas más adelante.

2. **Menús y modos de juego**

Desde el menú principal se podrá acceder a las opciones: &quot;Jugar&quot;, &quot;Opciones&quot;, &quot;Créditos&quot; y &quot;Salir&quot;.

![Menú](../master/readmeImages/Logo.png)

_Imagen provisional de menú (opciones en la página derecha)_

**2.1 Control**

Tiene un control similar a Papers Please, en el que se utilizará el ratón para ver los detalles de los diferentes objetos en la mesa y mover los que sean necesarios.

3. **Jugabilidad**

![EsquemaJugabilidad](../master/readmeImages/jugabilidad.jpg)

**3.1 Mecánica**

- Admitir/Denegar
  - Point and Click sobre la pluma para arrastrarla y firmar sobre un documento de acceso que te entrega el jugador. En función de lo que decida el jugador se usará tinta roja o verde, que cambiará dependiendo de si el jugador pasa la pluma por cada uno de los 2 tinteros diferentes.
- Llamar al siguiente cliente
  - El jugador podrá llamar al siguiente cliente en la cola pulsando un timbre que se encuentra en el mostrador. Este timbre sólo podrá ser utilizado cuando no se esté atendiendo a alguien en el mostrador, y se quedará en estado parpadeante para indicar visualmente que debe ser utilizado.
  - El cliente entregará un libro y un documento de acceso.
- Abrir y mover libros y papeles
  - Se podrán arrastrar los papeles a lo largo de la mesa pulsando en ellos y arrastrandolos. En ellos se verá si se trata de un _Libro_ o de _Prensa._
  - Si el jugador pulsa en un libro o papel desplegable este se abrirá o cerrará, mostrando la categoría y género del mismo (Únicamente categoría en caso de _Prensa_).
- Corcho
  - En este corcho se encontrarán los distintos géneros y categorías literarias a modo de referencia en forma de papelitos con chinchetas.
  - Al principio de una jornada se dirá qué _Libros_ son rentables y qué textos de _Prensa_ están censurados durante dicha jornada.
  - Se puede mover lo que se encuentra en él con el ratón. Sirve de ayuda para ordenar las ideas del jugador.
- Subir y bajar volumen - Radio (Encender/Apagar)
  - Al hacer click en ella se enciende si previamente había sonado estática que avisa de noticias, cambiando las tendencias de _Prensa_.
  - Cambia las tendencias del momento. El jugador debe estar atento y mover los papeles del corcho en consecuencia.
- Guardia de seguridad
  - En caso de personajes que te hagan perder tiempo, podrás llamar al guardia de seguridad mediante un botón en tu mostrador, para que expulse a dicho personaje y seguir con tu jornada de trabajo. Esta mecánica se desbloqueará en niveles avanzados.
- Sobornos
  - Algunos personajes intentarán sobornar al jugador. Si el jugador decide tomar el soborno su dinero aumentará y puede que reciba un strike (Contará con una probabilidad para incitar al jugador a arriesgarse. Esta probabilidad será equilibrada a lo largo del desarrollo).
- Strikes
  - El jugador puede recibir una penalización por dejar pasar a una persona indebida, tomar sobornos, aceptar _Prensa_ censurada o dejar pasar 3 _Libros_ no rentables en una jornada. Si el jugador recibe 3 strikes en la misma jornada laboral perderá automáticamente la partida.
- Calendario
  - Habrá un calendario a la izquierda de la pantalla que mostrará la fecha actual.
  - Muestra la jornada en la que se encuentra el jugador.

**3.2 Dinámica**

- El jugador ha de conseguir hacer su trabajo lo más rápido posible y sin equivocarse para conseguir llegar a final de jornada (El reloj al fondo de la sala mostrará el tiempo restante de jornada). Dejar pasar una obra que no tenga posibilidades en el mercado no aportará dinero al jugador; además, aceptar tres de ellos en un mismo día, el jugador recibirá un strike.
- Al final de cada jornada se deberá llegar a un mínimo de ingresos obtenidos para que el jugador no pierda la partida. Los ingresos obtenidos mediante buena toma de decisiones respecto a los libros aceptados se mostrarán en un menú al final de cada jornada, así como si se ha alcanzado el mínimo necesario.
- Para diferenciar si la obra podrá tener éxito el jugador ha de tener en cuenta diversos factores:
  - Factores de los libros
    - Género(s) y categoría de _Libros_: el jugador tendrá que comprobar el género y la categoría del libro. Hay géneros y categorías que tienen posibilidades en el mercado y otros que no, y estos pueden cambiar a lo largo de la jornada. El jugador ha de mantenerse atento a estos posibles cambios en tendencias. Se dividen en libros y en prensa.
      - Géneros de _Libro_: Novela, Poesía y Teatro
      - Categorías de Libros: Romance, Aventura, Suspense, Policiaco, Histórico, Drama, Ciencia-Ficción, Fantasía, Académico, Comedia.
        - Cada una tendrá un color asociado distintivo. Si no coincide, es fraude y no cuenta como libro correcto.
    - Los Libros tendrán también un nº de páginas.
      - Al principio de cada jornada se determinará entre qué número de páginas un libro tiene posibilidades en el mercado.
      - Un libro puede ser visualmente gordo (\&gt;1200 pags), finos (\&lt;150 pags) o medianos (400 - 700 págs). Si un libro no coincide visualmente con el nº de páginas es fraude y no cuenta como libro correcto.

  - Factores de la Prensa
    - Categorías de _Prensa:_ el jugador deberá comprobar si la categoría está censurada y actuar en consecuencia negando su entrada y viceversa.
      - Categorías de prensa: Noticia, Deportiva, Tiempo, Opinión, Ensayo, Esquela, Crónica, Propaganda.
    - Se deberá tener en cuenta si la fecha actual coincide con la del documento.

- A lo largo de la jornada pueden aparecer personajes de Evento **(Ver Eventos 3.4)**. El jugador tendrá que lidiar con ellos lo más rápido posible y sin meterse en un lío.

**3.3 Estética**

El juego busca reflejar la cruel España de los años 20. El protagonista cuenta con un sueño que quiere cumplir y deberá de enfrentarse a la crueldad de la sociedad de la época si quiere conseguir suficiente dinero.

Los sentimientos principales que se buscan reflejar son la opresión y la tristeza del momento. (Mediante sistemas como el de dinero o la censura en la _Prensa_)

También aparecerán varios personajes que reflejarán la pobreza de la época como niños que no tienen nada con lo que mantenerse y pedirán dinero al jugador, dando a elegir al jugador entre sus propios sueños o proporcionar algo de ayuda a los necesitados. Con esto se busca fomentar un sentimiento de impotencia y remordimiento muy presente en la época.

El arte consiste en un estilo de dibujo simple para los objetos y un estilo parecido al del videojuego Reigns para los personajes

**3.4 Eventos**

- Evento 1: Niño
  - Diálogos:
    - Llegada:
      - Niño: Por favor, no encuentro a mi mamá y tengo hambre y frío… Déjame pasar un rato por aquí.
    - Mientras el jugador no haga nada:
      - Niño: Fuera hace frío, por favor déjame pasar.
      - Niño: Prometo que no será mucho rato, por favor déjame pasar.
      - Mi madre te recompensará cuando se lo cuente.
    - El jugador le echa:
      - Niño: ¿¡Acaso no tiene consciencia?! Echo de menos a mi mamá…
    - El jugador le deja pasar:
      - Niño: ¡Muchas gracias, muchísimas gracias! Prometo que no me quedaré mucho tiempo.

  - Opciones del jugador y consecuencias:
    - Echarle: un guardia aparece para echar al niño. El jugador consigue no perder más tiempo con él.
    - No hacerle caso: el niño se quedará hablando al jugador hasta que el jugador le eche o le deje entrar.
    - Dejarle entrar: si el jugador deja entrar al niño podrá recibir un strike (baja probabilidad) y recibirá compensación monetaria equivalente a aceptar 2 libros correctos (Esta cantidad será equilibrada a lo largo del desarrollo).
- Evento 2: Vagabundo
  - Diálogos:
    - Llegada:
      - Vagabundo: Déjame entrar por favor, el tiempo es frío hoy y no hay espacio en la calle para un poeta pobre estos días.
    - Mientras el jugador no haga nada:
      - Vagabundo: Por favor, podré escribir poemas para vosotros, déjame entrar.
      - Vagabundo: Os haré ganar mucho dinero con mis obras.
    - El jugador le echa:
      - Vagabundo: Jajaja, parece que la buena fé murió con los buenos poemas. Ojalá te pudras.
    - El jugador le deja pasar:
      - Vagabundo: ¡Muchas gracias! Os aseguro que mis poemas serán de calidad.

  - Opciones del jugador y consecuencias:
    - Echarle: un guardia aparece para echar al vagabundo. El jugador consigue no perder más tiempo con él.
    - No hacerle caso: el vagabundo se quedará hablando al jugador hasta que el jugador le eche o le deje entrar.
    - Dejarle entrar: si el jugador deja entrar al vagabundo podrá recibir un strike (baja probabilidad) y recibirá compensación monetaria equivalente a aceptar 3 libros correctos (Esta cantidad será equilibrada a lo largo del desarrollo).
- Evento 3: Correos (La fecha de las cartas corresponde con la fecha actual)
  - Diálogos:
    - Llegada:
      - Correos: Vengo a entregar la correspondencia del día.
    - Mientras el jugador no haga nada:
      - Correos: Perdone, pero no tengo todo el día… ¿Podría por favor dejarme pasar?
      - Correos: ………..
      - Correos: ¿Sigue vivo ahí dentro?
      - Correos: ……… (Quiero irme a mi casa….)
    - El jugador le echa:
      - Correos: Creo que es la primera vez que no me dejan entregar el correo… en fin...
    - El jugador le deja pasar:
      - Correos: Que pase un buen día.

  - Opciones del jugador y consecuencias:
    - Echarle: un guardia aparece a llevarse a rastras al hombre de correos. Si es verdadero, el jugador recibe un strike.
    - No hacerle caso: el hombre de Correos espera pacientemente delante del jugador.
    - Dejarle entrar (verdadero): el jugador consigue información actualizada mediante el correo diario. ??????? O simplemente se libra de recibir un strike ????
    - Dejarle entrar (falso): el jugador recibe un strike, el hombre de correos falso resulta ser un ladrón.
- Evento 4: Mujer del jefe (La mujer del jefe siempre menciona el supuesto nombre de su marido, si éste no coincide con el nombre de que aparece en la firma de los documentos del jugador entonces se trata de la mujer del jefe falsa)
  - Diálogos:
    - Llegada:
      - Mujer del jefe: Hola, buenas. Mi marido (Insertar nombre del jefe) se dejó las llaves en casa, puedo pasar a entregárselas.
    - Mientras el jugador no haga nada:
      - Mujer del jefe: Perdona, ¿podría dejarme pasar? Que yo sepa no le pagan para que vaguee en el trabajo.
      - Mujer del jefe: Mi marido (Insertar nombre del jefe) me está esperando, por favor déjeme pasar.
    - El jugador le echa:
      - Mujer del jefe: ¡Que sepa que mi marido se va a enterar de esto! ¡Se va a quedar usted sin trabajo!
    - El jugador le deja pasar:
      - Mujer del jefe: Muchas gracias, que tenga un buen día.

  - Opciones del jugador y consecuencias:
    - Echarle: un guardia aparece a llevarse a rastras a la mujer del jefe. Si es verdadera, el jugador tiene una probabilidad media de recibir un strike (Esta probabilidad será equilibrada a lo largo del desarrollo).
    - No hacerle caso: La mujer del jefe se queda esperando a que le hagas caso.
    - Dejarle entrar (verdadero): La mujer del jefe puede que te entregue una propina correspondiente a aceptar 2 libros correctos (Estas cantidades serán equilibradas a lo largo del desarrollo).
    - Dejarle entrar (falso): El jugador tiene una probabilidad alta de recibir un strike (Esta probabilidad será equilibrada a lo largo del desarrollo)
- Evento 5: Sobornador
  - Diálogos:
    - Llegada:
      - Sobornador: Buenos días. Vengo a publicar este increíble libro, de hecho es un libro tan increíble que le daré un pequeño regalo por dejarme pasar. ¿Qué le parece?
    - Mientras el jugador no haga nada:
      - Sobornador: Venga, sabes que necesitas un poquito de ayuda extra este mes… Déjame que aporte mi pequeño grano de arena...
      - Sobornador: Vamos, no me seas, sabes que tus jefes también se dejan de vez en cuando, ¿por qué tú ibas a ser menos?
      - Sobornador: Nadie se va a enterar, no te preocupes.
    - El jugador le echa:
      - Sobornador: Tu pérdida.
    - El jugador le deja pasar:
      - Sobornador: Ji ji, me alegro de que nos entendamos.

  - Opciones del jugador y consecuencias:
    - Echarle: un guardia aparece a llevarse a rastras al sobornador.
    - No hacerle caso: el sobornador se queda esperando a que el jugador le haga caso.
    - Dejarle entrar: El jugador tiene una probabilidad media de recibir un strike y recibirá una compensación monetaria correspondiente a aceptar 3 libros correctos (Estas cantidades serán equilibradas a lo largo del desarrollo)
- Evento 6: Personaje tendencias (Este personaje aparece para notificar al jugador de un cambio de tendencias en libros)
  - Diálogos:
    - Llegada:
      - Personaje tendencias: Buenos días. Vengo a compartir mi increíble sabiduría sobre tendencias. Ha de saber usted que el género (Insertar nombre de género) está que arde.

4. **Arquitectura**![EsquemaUML](../master/readmeImages/uml1.jpg)

![UML](../master/readmeImages/uml2.jpg)

Enlace a Diagrama de arquitectura:

[https://app.creately.com/diagram/0hjFRldAeKX/edit](https://app.creately.com/diagram/0hjFRldAeKX/edit)

Enlace a Diagrama de clases UML: [https://app.creately.com/diagram/XXPXHOzG7Mq/edit](https://app.creately.com/diagram/XXPXHOzG7Mq/edit)

5. **Contenido**

**5.1 Contexto y universo**

El juego se sitúa en el Madrid de los años 20, donde los intelectuales tenían que luchar por escapar de la pobreza y los corruptos y sinvergüenzas viven sin problemas. Se plantea un setting esperpéntico, con personajes extravagantes, que tendrán todo tipo de personalidades. Es una época cargada de conflicto, donde diversos grupos sociales e ideológicos salen a la calle a protestar. La existencia de todos estos personajes y disputas se traduce en un contexto caótico, donde cualquier situación fuera de los límites de la imaginación podría estar ocurriendo en cualquier instante.

**5.2 Historia**

Eres un recepcionista en la Editorial Zaratustra y tu objetivo es llegar a fin de mes en una España pobre y poco generosa. Trabajas para lograr tu sueño de mudarte a vivir a un país paradisiaco. Vivirás tu día a día remando contra la adversidad por que no te echen del trabajo y puedas alcanzar tu meta.

**5.3 Narrativa**

La historia será visible en los diferentes finales. Estos dependen de si el jugador completa todas las jornadas con éxito, si acaba alguna jornada sin alcanzar los ingresos mínimos, si es echado de su puesto por recibir 3 strikes.

**5.4 Niveles**

- Los niveles serán distribuidos en jornadas:
  - Primera Jornada: el nivel de dificultad será básico, con la condición de solo aceptar una categoría de libros de entre 4 categorías. Se añaden post-its al corcho de las categorías.
  - Segunda Jornada: el nivel aumentará conforme a la anterior jornada, en esta se incluirán el resto de categorías, así como un género asociado a cada una. Se añaden post-its al corcho de los géneros. Las categorías/géneros a aceptar serán ajustadas con el balanceo de niveles.
  - Tercera Jornada: se añadirá la prensa y sus categorías asociadas. Las categorías de libros pueden no coincidir con su color asociado.
  - Cuarta Jornada: podrán aparecer los personajes de evento: personaje tendencias y sobornador.
  - Quinta Jornada: la editorial te hará entrega de una radio que te dará noticias acerca de la variación en la lista de categorías de prensa. Podrá cambiar la tendencia en mitad de la jornada y el jugador debe actuar en consecuencia. Además, aparecerá el personaje de evento: mujer del jefe. Podrán aparecer los personajes de evento de la jornada anterior.
  - Sexta Jornada: aparecerá uno de estos personajes de evento: niño o vagabundo. Podrán aparecer los personajes de evento de la jornada 4.
  - Séptima Jornada: aparecerá uno de estos personajes de evento: correo y niño o vagabundo (el que no haya aparecido aún) y. Podrán aparecer los personajes de evento de la jornada 4.

Cada jornada será más enrevesada respecto a los parámetros de los libros y las noticias.

**5.5 Personajes**

5.5.0 Protagonista

- Recepcionista/a

_5.5.1 Roles_

- Autores
- Poetas
- Vendedores de libros
- Sobornadores
- Gente pierde-tiempo
- Guardia de seguridad

_5.5.2 Arquetipos_

**5.6 Objetos**

| **Objeto** | **Disponibilidad** | **Función** | **Imágen** |
| --- | --- | --- | --- |
| Timbre | Al comienzo | Llamar al siguiente cliente |
| Radio | Quinta Jornada | Cambiar el orden de la lista de tendencias |
| Lista de tendencias (corcho) | Tercera Jornada | Mostrar la lista de tendencias, afectando a la decisión del jugador |
| Libros | Al comienzo | Papeles que te darán los personajes, donde pone la categoría de dicho libro. |
| Pluma y tinteros | Al comienzo | Aceptar o denegar la entrada de_Libros_/_Prensa_ |
| Documento de acceso | Al comienzo | Papel en blanco donde se usa la pluma para permitir pasar o no. |

**5.7 Sonido SFX**

- Efectos
  - Gente hablando
  - Ligero ruido al pulsar un botón.
  - Radio.
  - Timbre.
  - Botón de emergencia.

**6. Referencias**

- _Papers, Please ( __Lucas Pope__ , 2013)_
- _Luces de Bohemia (Valle-Inclán, 1924)_
- _Reigns (__François Alliot, 2016)_

**7. Links**

- https://www.pivotaltracker.com/n/projects/2470815
