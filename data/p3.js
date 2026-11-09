/* =========================================================
   Periodo 3: APS II · Epidemiología · Farmacología ·
   Principios del Cuidado de Enfermería · Psicología Social
   ========================================================= */

/* ---------------- Atención Primaria en Salud II ---------------- */
C('aps2', [
  ['Rutas integrales', '¿Qué adopta la Resolución 3280 de 2018?', 'Los lineamientos técnicos y operativos de la Ruta de Promoción y Mantenimiento de la Salud y de la Ruta Materno Perinatal.', 'Ha tenido modificaciones posteriores (por ejemplo, la Res. 051 de 2023): trabaja siempre con la versión vigente.', 'dos rutas.', 'Res. 3280 de 2018 (MinSalud)'],
  ['Rutas integrales', '¿Cuáles son los tres tipos de Rutas Integrales de Atención en Salud (RIAS)?', 'Ruta de Promoción y Mantenimiento de la Salud, rutas para grupos de riesgo y rutas para eventos específicos.', 'La de promoción y mantenimiento es para toda la población.', 'para todos, para grupos y para eventos.', 'Res. 3202 de 2016 (MinSalud)'],
  ['Curso de vida', '¿Cuáles son los momentos del curso de vida y sus edades en la Res. 3280?', 'Primera infancia (0–5 años), infancia (6–11), adolescencia (12–17), juventud (18–28), adultez (29–59) y vejez (60 y más).', 'Cada momento tiene intervenciones definidas en la ruta.', 'seis momentos.', 'Res. 3280 de 2018'],
  ['Curso de vida', '¿Qué plantea el enfoque de curso de vida?', 'Que la salud se construye a lo largo de toda la vida y lo que pasa en una etapa influye en las siguientes; por eso conviene intervenir temprano.', 'Ejemplo: la nutrición en la primera infancia influye en la salud de la adultez.', 'todo se acumula.'],
  ['Detección temprana', '¿Cómo se tamiza el cáncer de mama en la ruta de promoción y mantenimiento?', 'Mamografía cada 2 años de los 50 a los 69 años, y examen clínico de la mama cada año desde los 40.', 'Ante una masa o un cambio en la mama, la usuaria debe consultar sin esperar el tamizaje.', 'cada 2 años desde los 50.', 'Res. 3280 de 2018'],
  ['Detección temprana', '¿Cómo se tamiza el cáncer de colon y recto?', 'Con sangre oculta en materia fecal por inmunoquímica cada 2 años, de los 50 a los 75 años.', 'Si sale positiva, se remite a colonoscopia.', 'en las heces, cada 2 años.', 'Res. 3280 de 2018'],
  ['Detección temprana', '¿Cómo se tamiza el cáncer de próstata?', 'Con PSA y tacto rectal cada 5 años, de los 50 a los 75 años.', 'Explica antes al usuario en qué consiste y qué significan los resultados.', 'cada 5 años.', 'Res. 3280 de 2018'],
  ['Desarrollo infantil', '¿Qué escala se usa en Colombia para valorar el desarrollo en la primera infancia y la infancia?', 'La Escala Abreviada de Desarrollo, versión 3 (EAD-3).', 'Evalúa motricidad gruesa, motricidad fino-adaptativa, audición y lenguaje, y personal-social.', 'EAD.', 'Res. 3280 de 2018'],
  ['Modelos de atención', '¿Qué fueron la PAIS y el MAITE?', 'La Política de Atención Integral en Salud (Res. 429 de 2016) orientó el sistema hacia la APS; su modelo operativo inicial (MIAS) fue reemplazado por el MAITE con la Res. 2626 de 2019.', 'Los modelos cambian con los gobiernos: revisa el que está vigente en tu territorio.', 'política y modelo.'],
  ['Salud pública', '¿Qué es el Plan Decenal de Salud Pública 2022–2031?', 'La política de Estado que fija los objetivos y metas de salud pública del país para esa década.', 'Se adoptó con la Res. 1035 de 2022.', 'diez años.', 'Res. 1035 de 2022 (MinSalud)'],
  ['Salud pública', '¿Qué es el Plan de Intervenciones Colectivas (PIC)?', 'Un plan de acciones colectivas y gratuitas de promoción de la salud y gestión del riesgo, a cargo de las entidades territoriales.', 'Ejemplos: educación y comunicación para la salud, jornadas de salud y tamizajes en la comunidad.', 'colectivo y gratuito.'],
  ['Entornos', '¿Cuáles son los entornos donde se desarrollan las acciones de promoción de la salud?', 'Hogar, educativo, comunitario, laboral e institucional.', 'Las acciones se adaptan al lugar donde la gente vive, estudia y trabaja.', 'cinco entornos.'],
  ['Infancia', '¿Qué es la estrategia AIEPI?', 'La Atención Integrada a las Enfermedades Prevalentes de la Infancia, de la OPS/OMS y UNICEF, para evaluar, clasificar y tratar a los menores de 5 años.', 'Clasifica por colores: rojo (referir urgente), amarillo (tratar y hacer seguimiento) y verde (manejo en casa).', 'menores de 5.'],
  ['Gestión', '¿Qué es la demanda inducida?', 'Las acciones para informar, motivar y orientar a la población para que use los servicios de promoción y prevención.', 'Ejemplos: llamadas, visitas, recordatorios y agendamiento de citas.', 'ir a buscar a la gente.']
]);
G('aps2', [
  ['o', '¿A qué momento del curso de vida pertenece una persona de 15 años?', ['Adolescencia', 'Infancia', 'Juventud', 'Adultez'], 0, 'Adolescencia: 12 a 17 años.'],
  ['o', '¿A qué momento del curso de vida pertenece una persona de 25 años?', ['Juventud', 'Adolescencia', 'Adultez', 'Vejez'], 0, 'Juventud: 18 a 28 años.'],
  ['o', 'Mujer de 55 años: ¿qué tamizaje de cáncer de mama le corresponde?', ['Mamografía cada 2 años', 'Mamografía cada 5 años', 'Ecografía mamaria cada mes', 'Ninguno: ya pasó la edad'], 0, 'De 50 a 69 años, cada 2 años.'],
  ['o', 'Hombre de 60 años: ¿qué tamizaje de cáncer colorrectal le corresponde?', ['Sangre oculta en heces por inmunoquímica cada 2 años', 'Colonoscopia cada año', 'Coprológico cada mes', 'Ninguno'], 0, 'De 50 a 75 años, cada 2 años.'],
  ['o', '¿Cada cuánto se tamiza el cáncer de próstata entre los 50 y los 75 años?', ['Cada 5 años', 'Cada año', 'Cada 6 meses', 'Una sola vez en la vida'], 0, 'PSA y tacto rectal.'],
  ['o', '¿Qué escala usas para valorar el desarrollo de un niño de 2 años?', ['EAD-3', 'Glasgow', 'Braden', 'Silverman'], 0, 'Escala Abreviada de Desarrollo-3.'],
  ['o', '¿Qué resolución adoptó el Plan Decenal de Salud Pública 2022–2031?', ['Res. 1035 de 2022', 'Res. 3280 de 2018', 'Res. 3100 de 2019', 'Res. 2350 de 2020'], 0, 'La 3280 es la de las rutas; la 3100, habilitación.'],
  ['o', 'En AIEPI, la clasificación roja significa…', ['Referir de urgencia', 'Manejo en casa', 'Control en un mes', 'Dar de alta'], 0, 'Rojo: referencia urgente.'],
  ['o', 'La Ruta de Promoción y Mantenimiento de la Salud está dirigida a…', ['Toda la población', 'Solo las gestantes', 'Solo las personas con enfermedades crónicas', 'Solo los menores de 5 años'], 0, 'Es para todas las personas, por momento de curso de vida.'],
  ['o', 'Llamar a las gestantes que faltaron a su control prenatal es un ejemplo de…', ['Demanda inducida', 'Prevención terciaria', 'Auditoría médica', 'Contrarreferencia'], 0, 'Busca que la población use los servicios.'],
  ['v', 'La Res. 3280 de 2018 incluye la Ruta Materno Perinatal.', true, 'Junto con la de promoción y mantenimiento.'],
  ['v', 'El PIC es un plan individual que paga cada EPS.', false, 'Es colectivo y está a cargo de las entidades territoriales.'],
  ['v', 'La mamografía de tamizaje empieza a los 30 años.', false, 'Desde los 50 años.'],
  ['v', 'El hogar es uno de los entornos de la promoción de la salud.', true, 'Junto con el educativo, comunitario, laboral e institucional.'],
  ['v', 'AIEPI está dirigida a los menores de 5 años.', true, 'Enfermedades prevalentes de la infancia.'],
  ['p', 'Une cada momento del curso de vida con su edad', [['Primera infancia', '0 a 5 años'], ['Infancia', '6 a 11 años'], ['Adolescencia', '12 a 17 años'], ['Juventud', '18 a 28 años'], ['Adultez', '29 a 59 años'], ['Vejez', '60 años y más']]],
  ['p', 'Une cada tamizaje con su esquema', [['Mamografía', 'Cada 2 años, de 50 a 69 años'], ['Sangre oculta en heces', 'Cada 2 años, de 50 a 75 años'], ['PSA y tacto rectal', 'Cada 5 años, de 50 a 75 años'], ['Prueba de ADN-VPH', 'Cada 5 años, de 30 a 65 años']]],
  ['p', 'Une cada norma con su tema', [['Res. 3280 de 2018', 'Rutas de promoción y materno perinatal'], ['Res. 3202 de 2016', 'Manual de las RIAS'], ['Res. 2626 de 2019', 'MAITE'], ['Res. 1035 de 2022', 'Plan Decenal de Salud Pública']]],
  ['s', 'Ordena los momentos del curso de vida', ['Primera infancia', 'Infancia', 'Adolescencia', 'Juventud', 'Adultez', 'Vejez'], 'Res. 3280 de 2018.'],
  ['s', 'Ordena los pasos del proceso AIEPI', ['Evaluar signos de peligro y síntomas', 'Clasificar por colores', 'Determinar el tratamiento', 'Tratar al niño', 'Aconsejar a la madre o al cuidador', 'Programar el control de seguimiento'], 'Evaluar, clasificar, tratar, aconsejar y hacer seguimiento.']
]);

/* ---------------- Epidemiología ---------------- */
C('epi', [
  ['Medidas', '¿Qué mide la incidencia?', 'Los casos nuevos de una enfermedad en una población en riesgo durante un periodo.', 'Incidencia acumulada = casos nuevos ÷ población en riesgo al inicio del periodo.', 'casos nuevos.'],
  ['Medidas', '¿Qué mide la prevalencia?', 'La proporción de personas que tienen la enfermedad (casos nuevos y antiguos) en un momento o periodo.', 'Sirve para planear servicios para enfermedades crónicas como la hipertensión.', 'todos los casos.'],
  ['Medidas', '¿Qué relación hay entre prevalencia, incidencia y duración?', 'Prevalencia ≈ incidencia × duración de la enfermedad (en situaciones estables).', 'Si un tratamiento alarga la vida sin curar, la prevalencia sube.', 'cuanto más dura, más se acumula.'],
  ['Brotes', '¿Qué es la tasa de ataque?', 'La incidencia acumulada durante un brote: casos ÷ personas expuestas × 100.', 'Ejemplo: 30 de 120 asistentes a un almuerzo se enferman → 25 %.', 'se usa en brotes.'],
  ['Medidas', '¿Qué diferencia hay entre letalidad y mortalidad?', 'La letalidad es el porcentaje de enfermos que mueren por esa enfermedad; la mortalidad relaciona las muertes con toda la población.', 'Letalidad = muertes por la enfermedad ÷ casos × 100.', 'enfermos vs. población.'],
  ['Indicadores', '¿Cómo se calcula la tasa de mortalidad infantil?', 'Muertes de menores de 1 año ÷ nacidos vivos del mismo periodo × 1.000.', 'Es un indicador clave de las condiciones de vida de una población.', 'por mil nacidos vivos.'],
  ['Indicadores', '¿Cómo se calcula la razón de mortalidad materna?', 'Muertes maternas ÷ nacidos vivos × 100.000.', 'Cuenta las muertes durante el embarazo, el parto o los 42 días siguientes, por causas relacionadas o agravadas por el embarazo.', 'por cien mil.'],
  ['Conceptos', '¿Cuáles son los elementos de la tríada epidemiológica?', 'Agente, huésped y ambiente.', 'La enfermedad aparece cuando se rompe el equilibrio entre ellos.', 'tres elementos.'],
  ['Conceptos', '¿Cuáles son los eslabones de la cadena de transmisión?', 'Agente, reservorio, puerta de salida, modo de transmisión, puerta de entrada y huésped susceptible.', 'Romper cualquier eslabón corta la transmisión; por ejemplo, con la higiene de manos.', 'seis eslabones.'],
  ['Conceptos', '¿Qué diferencia hay entre endemia, epidemia y pandemia?', 'Endemia: presencia habitual en una zona. Epidemia: aumento de casos por encima de lo esperado. Pandemia: epidemia extendida a varios países o continentes.', 'El dengue es endémico en muchas zonas cálidas de Colombia.', 'habitual, aumento, mundial.'],
  ['Brotes', '¿Qué es un brote?', 'Dos o más casos relacionados entre sí en tiempo y lugar, o un aumento inusual de casos.', 'Para eventos en eliminación, como el sarampión, un solo caso sospechoso exige notificación inmediata e investigación.', 'casos relacionados.'],
  ['Vigilancia', '¿Qué es el SIVIGILA?', 'El Sistema Nacional de Vigilancia en Salud Pública de Colombia, coordinado por el Instituto Nacional de Salud (INS).', 'Recoge la notificación de los eventos de interés en salud pública.', 'lo coordina el INS.', 'Instituto Nacional de Salud'],
  ['Vigilancia', '¿Qué diferencia hay entre la notificación inmediata y la semanal?', 'La inmediata se hace en cuanto se detecta el caso (eventos graves o en eliminación); la semanal agrupa los casos de la semana epidemiológica.', 'Ejemplos de notificación inmediata: sospecha de sarampión o rubéola y parálisis flácida aguda en menores de 15 años.', 'urgente vs. rutinaria.', 'Instituto Nacional de Salud'],
  ['Vigilancia', '¿Qué es una semana epidemiológica?', 'Un periodo de 7 días, de domingo a sábado, que se usa para agrupar y comparar los datos de vigilancia.', 'El año tiene 52 o 53 semanas epidemiológicas.', 'de domingo a sábado.'],
  ['Vigilancia', '¿Qué es un canal endémico?', 'Un gráfico que muestra el comportamiento esperado de una enfermedad según los años anteriores, con zonas de éxito, seguridad, alerta y epidemia.', 'Si los casos entran en la zona de epidemia, se activan acciones de control.', 'lo esperado vs. lo observado.'],
  ['Pruebas diagnósticas', '¿Qué es la sensibilidad de una prueba?', 'La capacidad de detectar a los enfermos: verdaderos positivos ÷ (verdaderos positivos + falsos negativos).', 'Una prueba muy sensible sirve para tamizar porque deja pocos falsos negativos.', 'detecta enfermos.'],
  ['Pruebas diagnósticas', '¿Qué es la especificidad de una prueba?', 'La capacidad de identificar a los sanos: verdaderos negativos ÷ (verdaderos negativos + falsos positivos).', 'Una prueba muy específica sirve para confirmar.', 'identifica sanos.'],
  ['Pruebas diagnósticas', '¿Qué es el valor predictivo positivo y de qué depende?', 'La probabilidad de estar enfermo si la prueba sale positiva; depende de la prevalencia de la enfermedad.', 'Con prevalencia baja aumentan los falsos positivos.', 'depende de la prevalencia.'],
  ['Diseños', '¿Qué diferencia hay entre un estudio de cohorte y uno de casos y controles?', 'La cohorte parte de la exposición y sigue a las personas para ver quién enferma (calcula riesgo relativo); casos y controles parte de la enfermedad y busca exposiciones pasadas (calcula odds ratio).', 'El estudio transversal mide la prevalencia en un momento.', 'hacia adelante vs. hacia atrás.'],
  ['Asociación', '¿Cómo se interpreta el riesgo relativo (RR)?', 'RR = 1: no hay asociación; RR > 1: la exposición es factor de riesgo; RR < 1: es factor protector.', 'Ejemplo: RR = 3 significa el triple de riesgo en los expuestos.', 'se compara con 1.'],
  ['Control', '¿Qué es un cerco epidemiológico?', 'Las acciones en el área alrededor de un caso para cortar la transmisión: búsqueda activa de casos, vacunación de bloqueo y educación.', 'Se usa, por ejemplo, ante un caso sospechoso de sarampión.', 'rodear el caso.']
]);
G('epi', [
  ['c', 'incidencia'],
  ['c', 'pruebas'],
  ['o', 'En un almuerzo, 30 de 120 asistentes presentaron diarrea. ¿Cuál es la tasa de ataque?', ['25 %', '30 %', '4 %', '12 %'], 0, '30 ÷ 120 × 100 = 25 %.'],
  ['o', 'De 200 casos de una enfermedad, 10 murieron. ¿Cuál es la letalidad?', ['5 %', '10 %', '20 %', '2 %'], 0, '10 ÷ 200 × 100 = 5 %.'],
  ['o', '¿Qué medida usarías para saber cuántos hipertensos hay hoy en tu vereda?', ['Prevalencia', 'Incidencia', 'Letalidad', 'Tasa de ataque'], 0, 'Cuenta todos los casos existentes.'],
  ['o', 'Una prueba muy sensible es ideal para…', ['Tamizar', 'Confirmar', 'Calcular la letalidad', 'Medir la mortalidad'], 0, 'Deja pocos falsos negativos.'],
  ['o', 'Un estudio parte de mujeres con cáncer de cuello uterino y de mujeres sanas, y pregunta por exposiciones pasadas. ¿Qué diseño es?', ['Casos y controles', 'Cohorte', 'Ensayo clínico', 'Transversal'], 0, 'Va del efecto a la exposición.'],
  ['o', 'Un estudio reporta RR = 0,5 para la vacunación. ¿Qué indica?', ['La vacuna es un factor protector', 'La vacuna duplica el riesgo', 'No hay ninguna asociación', 'La vacuna causa la enfermedad'], 0, 'RR < 1: protector.'],
  ['o', 'La higiene de manos rompe principalmente qué eslabón de la cadena de transmisión?', ['El modo de transmisión', 'El reservorio', 'El agente', 'La susceptibilidad del huésped'], 0, 'Las manos son el principal vehículo de contacto.'],
  ['o', '¿Qué entidad coordina el SIVIGILA?', ['Instituto Nacional de Salud', 'INVIMA', 'DANE', 'Supersalud'], 0, 'El INS.'],
  ['v', 'La prevalencia incluye casos nuevos y antiguos.', true, 'Por eso sirve para enfermedades crónicas.'],
  ['v', 'El valor predictivo positivo no depende de la prevalencia.', false, 'Sí depende: con baja prevalencia hay más falsos positivos.'],
  ['v', 'La semana epidemiológica va de lunes a domingo.', false, 'Va de domingo a sábado.'],
  ['v', 'Un caso sospechoso de sarampión se notifica de inmediato.', true, 'Es un evento en eliminación.'],
  ['v', 'Una enfermedad endémica es la que aparece de forma habitual en una zona.', true, 'Como el dengue en zonas cálidas.'],
  ['p', 'Une cada indicador con su denominador', [['Mortalidad infantil', 'Nacidos vivos (× 1.000)'], ['Razón de mortalidad materna', 'Nacidos vivos (× 100.000)'], ['Letalidad', 'Casos de la enfermedad'], ['Tasa de ataque', 'Personas expuestas']]],
  ['p', 'Une cada diseño con lo que calcula', [['Cohorte', 'Riesgo relativo'], ['Casos y controles', 'Odds ratio'], ['Transversal', 'Prevalencia'], ['Ensayo clínico', 'Eficacia de una intervención']]],
  ['p', 'Une cada término con su definición', [['Endemia', 'Presencia habitual en una zona'], ['Epidemia', 'Aumento por encima de lo esperado'], ['Pandemia', 'Epidemia en varios países o continentes'], ['Brote', 'Casos relacionados en tiempo y lugar']]],
  ['s', 'Ordena los eslabones de la cadena de transmisión', ['Agente', 'Reservorio', 'Puerta de salida', 'Modo de transmisión', 'Puerta de entrada', 'Huésped susceptible'], 'Romper cualquier eslabón corta la cadena.'],
  ['s', 'Ordena los pasos de la investigación de un brote', ['Confirmar el brote y el diagnóstico', 'Definir caso y buscar casos', 'Describir en tiempo, lugar y persona', 'Plantear hipótesis', 'Aplicar medidas de control', 'Comunicar los resultados'], 'Si hay riesgo, las medidas de control pueden empezar desde el inicio.']
]);

/* ---------------- Farmacología ---------------- */
C('farma', [
  ['Farmacocinética', '¿Qué significa ADME?', 'Absorción, distribución, metabolismo y excreción: lo que el cuerpo le hace al fármaco.', 'La farmacodinamia es lo que el fármaco le hace al cuerpo.', 'cuatro letras.'],
  ['Farmacocinética', '¿Qué es la vida media de un fármaco?', 'El tiempo en que la concentración en sangre baja a la mitad.', 'Se necesitan unas 4 a 5 vidas medias para alcanzar el estado estable o para eliminarlo casi por completo.', 'la mitad.'],
  ['Farmacocinética', '¿Qué es el efecto de primer paso y qué vía lo evita?', 'La metabolización hepática de un fármaco oral antes de que llegue a la circulación general; la vía sublingual (como la de la nitroglicerina) lo evita.', 'Por eso algunas dosis orales son mayores que las intravenosas.', 'el hígado primero.'],
  ['Seguridad', '¿Qué es un fármaco de margen terapéutico estrecho? Da ejemplos.', 'Uno cuya dosis eficaz está muy cerca de la tóxica: digoxina, litio, warfarina, fenitoína y aminoglucósidos.', 'Requieren vigilancia estrecha y, a veces, niveles en sangre.', 'poca distancia entre útil y tóxico.'],
  ['Cardiovascular', '¿Qué haces antes de administrar digoxina?', 'Tomar el pulso apical durante 1 minuto; si es menor de 60 lpm en el adulto, no la administras y avisas.', 'Signos de toxicidad: náuseas, vómito, visión amarilla y arritmias; la hipopotasemia la favorece.', 'cuenta el pulso.'],
  ['Vías', '¿Qué ángulo se usa en las vías intradérmica, subcutánea e intramuscular?', 'Intradérmica 10–15°, subcutánea 45° (o 90° con agujas cortas o haciendo pliegue) e intramuscular 90°.', 'La prueba de tuberculina (PPD) es intradérmica.', 'cuanto más profunda, más vertical.'],
  ['Vías', '¿Qué sitios se usan para la inyección intramuscular?', 'Ventroglúteo (preferido en adultos), vasto lateral (preferido en lactantes) y deltoides (solo volúmenes pequeños).', 'El sitio dorsoglúteo tiene riesgo de lesionar el nervio ciático.', 'el ventroglúteo es el más seguro.'],
  ['Urgencias', '¿Cómo se administra la adrenalina en la anafilaxia?', 'IM en la cara anterolateral del muslo, 0,01 mg/kg de la ampolla de 1 mg/ml (máximo 0,5 mg; en el adulto suele ser 0,5 mg). Se puede repetir a los 5–15 minutos si no hay mejoría.', 'Es el tratamiento de primera línea: no la retrases por dar antihistamínicos.', 'músculo del muslo.'],
  ['Antibióticos', '¿Qué efectos adversos vigilas con los aminoglucósidos (gentamicina, amikacina)?', 'Nefrotoxicidad y ototoxicidad.', 'Vigila la diuresis, la creatinina y si el paciente refiere zumbido o pérdida de audición.', 'riñón y oído.'],
  ['Antibióticos', '¿En cuánto tiempo se infunde la vancomicina y por qué?', 'En al menos 60 minutos, para evitar la reacción por infusión rápida (síndrome del hombre rojo).', 'Produce enrojecimiento de cara, cuello y tórax.', 'una hora.'],
  ['Antídotos', '¿Cuál es el antídoto de la intoxicación por acetaminofén?', 'La N-acetilcisteína.', 'Funciona mejor si se inicia en las primeras 8 horas.', 'también es mucolítico.'],
  ['Insulinas', '¿Qué tipo de insulina es la glargina?', 'Una insulina basal de acción prolongada (unas 24 horas), sin pico marcado.', 'No se mezcla con otras insulinas en la misma jeringa.', 'basal.'],
  ['Seguridad', '¿Qué son los medicamentos de alto riesgo?', 'Los que pueden causar daño grave si se usan mal: insulinas, anticoagulantes, opioides, potasio y otros electrolitos concentrados, entre otros.', 'Se recomienda doble verificación antes de administrarlos.', 'doble chequeo.', 'ISMP – Medicamentos de alto riesgo'],
  ['Administración', '¿Cuáles son los "correctos" básicos de la administración de medicamentos?', 'Paciente, medicamento, dosis, vía y hora correctos; se amplían con registro, educación, valoración previa, verificación del vencimiento y el derecho a rechazar.', 'Verifica la identidad con dos identificadores.', 'empiezan siendo cinco.']
]);
G('farma', [
  ['c', 'dosis'],
  ['c', 'goteo'],
  ['o', 'Antes de dar digoxina encuentras un pulso apical de 52 lpm en un adulto. ¿Qué haces?', ['No la administras y avisas', 'La administras igual', 'Das el doble de la dosis', 'La das por vía IV'], 0, 'Con menos de 60 lpm se suspende y se informa.'],
  ['o', '¿Cuál es el antídoto de la intoxicación por acetaminofén?', ['N-acetilcisteína', 'Naloxona', 'Flumazenil', 'Protamina'], 0, 'Mejor en las primeras 8 horas.'],
  ['o', '¿Cuál es el sitio IM preferido en un lactante?', ['Vasto lateral', 'Deltoides', 'Dorsoglúteo', 'Abdomen'], 0, 'Es el músculo más desarrollado a esa edad.'],
  ['o', '¿Con qué ángulo se aplica una inyección intradérmica?', ['10–15°', '45°', '90°', '60°'], 0, 'Casi paralela a la piel.'],
  ['o', 'Un paciente con gentamicina refiere zumbido en los oídos. ¿Qué sospechas?', ['Ototoxicidad', 'Hipoglucemia', 'Alergia a la penicilina', 'Un efecto esperado sin importancia'], 0, 'Avisa: puede ser irreversible.'],
  ['o', 'Paciente con anafilaxia. ¿Cuál es el primer medicamento?', ['Adrenalina IM', 'Loratadina oral', 'Hidrocortisona IV', 'Salbutamol inhalado'], 0, 'Los demás son complementarios.'],
  ['o', '¿Cuál de estos es un medicamento de alto riesgo?', ['Cloruro de potasio concentrado', 'Acetaminofén en tabletas', 'Sales de rehidratación oral', 'Vitamina C'], 0, 'Nunca en bolo; siempre diluido.'],
  ['o', 'La vía sublingual de la nitroglicerina evita…', ['El efecto de primer paso hepático', 'La absorción', 'La distribución', 'La excreción renal'], 0, 'Pasa directo a la circulación.'],
  ['v', 'La vancomicina puede pasarse en bolo de 5 minutos.', false, 'Mínimo en 60 minutos.'],
  ['v', 'La hipopotasemia aumenta el riesgo de toxicidad por digoxina.', true, 'Vigila el potasio.'],
  ['v', 'La insulina glargina tiene un pico marcado a las 2 horas.', false, 'Es basal, sin pico marcado.'],
  ['v', 'Se necesitan unas 4 a 5 vidas medias para eliminar casi por completo un fármaco.', true, 'También para alcanzar el estado estable.'],
  ['v', 'El litio es un fármaco de margen terapéutico estrecho.', true, 'Requiere niveles en sangre.'],
  ['p', 'Une cada intoxicación con su antídoto', [['Opioides', 'Naloxona'], ['Benzodiacepinas', 'Flumazenil'], ['Heparina', 'Sulfato de protamina'], ['Acetaminofén', 'N-acetilcisteína'], ['Sulfato de magnesio', 'Gluconato de calcio']]],
  ['p', 'Une cada vía con su ángulo', [['Intradérmica', '10–15°'], ['Subcutánea', '45°'], ['Intramuscular', '90°'], ['Venopunción', '15–30°']]],
  ['p', 'Une cada fármaco con el efecto adverso que vigilas', [['Gentamicina', 'Nefrotoxicidad y ototoxicidad'], ['Enalapril', 'Tos seca'], ['Vancomicina', 'Reacción por infusión rápida'], ['Digoxina', 'Visión amarilla y arritmias']]],
  ['s', 'Ordena las fases de la farmacocinética', ['Absorción', 'Distribución', 'Metabolismo', 'Excreción'], 'ADME.'],
  ['s', 'Ordena la administración segura de un medicamento', ['Verificar la orden médica', 'Preparar el medicamento comprobando los correctos', 'Identificar al paciente con dos identificadores', 'Administrar y vigilar la respuesta', 'Registrar la administración'], 'Si no se registra, no se hizo.']
]);

/* ---------------- Principios del Cuidado de Enfermería ---------------- */
C('cuidado', [
  ['Proceso de enfermería', '¿Cuáles son las etapas del Proceso de Atención de Enfermería (PAE)?', 'Valoración, diagnóstico, planificación, ejecución y evaluación.', 'Es cíclico: la evaluación lleva a una nueva valoración.', 'cinco etapas.'],
  ['Proceso de enfermería', '¿Qué son NANDA, NIC y NOC?', 'NANDA: diagnósticos de enfermería; NIC: intervenciones; NOC: resultados esperados.', 'Juntas forman el lenguaje estandarizado del plan de cuidados.', 'diagnóstico, intervención, resultado.'],
  ['Proceso de enfermería', '¿Cómo se redacta un diagnóstico de enfermería con el formato PES?', 'Problema (etiqueta NANDA) + Etiología ("relacionado con") + Signos y síntomas ("manifestado por").', 'Ejemplo: Dolor agudo r/c agente lesivo físico m/p expresión verbal de dolor 8/10.', 'P-E-S.'],
  ['Teorías', '¿Qué propuso Virginia Henderson?', '14 necesidades básicas de la persona; la enfermera ayuda a satisfacerlas hasta que la persona recupere su independencia.', 'Incluyen respirar, comer y beber, eliminar, moverse, dormir, vestirse, mantener la temperatura, higiene, seguridad, comunicarse, creencias, trabajar, recrearse y aprender.', '14 necesidades.'],
  ['Teorías', '¿Qué propuso Dorothea Orem?', 'La teoría del déficit de autocuidado, con sistemas de enfermería totalmente compensatorio, parcialmente compensatorio y de apoyo educativo.', 'Muy útil con pacientes crónicos que aprenden a cuidarse.', 'autocuidado.'],
  ['Teorías', '¿Qué aportó Florence Nightingale?', 'Es la fundadora de la enfermería moderna; su teoría del entorno destaca la ventilación, la luz, la limpieza y la nutrición.', 'También usó estadísticas para mejorar la atención en la guerra de Crimea.', 'la dama de la lámpara.'],
  ['Aislamientos', '¿Qué precauciones se usan en el aislamiento por aerosoles y en qué enfermedades?', 'Respirador N95 y habitación individual (idealmente con presión negativa); por ejemplo, tuberculosis, sarampión y varicela.', 'Verifica el ajuste y el sellado del respirador cada vez que te lo pones.', 'N95.'],
  ['Aislamientos', '¿Qué precauciones se usan en el aislamiento por gotas?', 'Mascarilla quirúrgica al acercarse al paciente y separación de al menos 1 metro; por ejemplo, influenza, tosferina y meningococo.', 'El paciente usa mascarilla quirúrgica si sale de la habitación.', 'mascarilla quirúrgica.'],
  ['Aislamientos', '¿Qué precauciones se usan en el aislamiento de contacto?', 'Guantes y bata al tener contacto con el paciente o su entorno, y equipos de uso exclusivo.', 'Ejemplos: bacterias multirresistentes, Clostridioides difficile y escabiosis.', 'guantes y bata.'],
  ['Bioseguridad', '¿Hasta dónde se llena el guardián (recipiente para cortopunzantes)?', 'Hasta las tres cuartas partes de su capacidad.', 'Nunca reencapuches agujas con las dos manos.', 'tres cuartos.'],
  ['Posiciones', '¿Qué es la posición Fowler y cuándo se usa?', 'Paciente semisentado con la cabecera elevada (Fowler 45–60°; semi-Fowler 30–45°); útil en dificultad respiratoria, alimentación por sonda y para prevenir la broncoaspiración.', 'En la de Trendelenburg la cabeza queda más baja que los pies.', 'semisentado.'],
  ['Lesiones por presión', '¿Qué medidas previenen las lesiones por presión?', 'Cambios de posición al menos cada 2 horas, piel limpia y seca, superficies de alivio de presión, buena nutrición y valoración del riesgo con la escala de Braden.', 'Vigila sobre todo el sacro, los talones y las prominencias óseas.', 'mover cada 2 horas.'],
  ['Registros', '¿Cómo deben ser los registros de enfermería?', 'Claros, objetivos, oportunos, legibles, completos y sin enmendaduras, con fecha, hora y firma.', 'La historia clínica es un documento legal.', 'si no se registró, no se hizo.']
]);
G('cuidado', [
  ['c', 'goteo'],
  ['o', 'Paciente con sospecha de tuberculosis pulmonar. ¿Qué elemento de protección usas?', ['Respirador N95', 'Mascarilla quirúrgica', 'Solo guantes', 'Careta sin mascarilla'], 0, 'Aislamiento por aerosoles.'],
  ['o', 'Paciente con influenza. ¿Qué tipo de aislamiento corresponde?', ['Gotas', 'Aerosoles', 'Contacto', 'Ninguno'], 0, 'Mascarilla quirúrgica.'],
  ['o', '¿Hasta qué nivel se llena el guardián?', ['Tres cuartas partes', 'Hasta el borde', 'La mitad', 'Hasta que no quepa nada más'], 0, 'Así se evitan pinchazos al cerrarlo.'],
  ['o', '¿Qué teórica propuso las 14 necesidades básicas?', ['Virginia Henderson', 'Dorothea Orem', 'Florence Nightingale', 'Hildegard Peplau'], 0, 'Henderson.'],
  ['o', 'En el formato PES, la "E" corresponde a…', ['Etiología ("relacionado con")', 'Evaluación', 'Ejecución', 'Escala'], 0, 'Problema, Etiología, Signos y síntomas.'],
  ['o', 'La clasificación NOC se refiere a…', ['Resultados esperados', 'Intervenciones', 'Diagnósticos', 'Valoración'], 0, 'NANDA diagnósticos, NIC intervenciones, NOC resultados.'],
  ['o', 'Paciente con dificultad para respirar. ¿En qué posición lo acomodas?', ['Fowler', 'Trendelenburg', 'Decúbito prono', 'Litotomía'], 0, 'Semisentado facilita la expansión del tórax.'],
  ['o', '¿Cada cuánto, como mínimo, cambias de posición a un paciente encamado con riesgo de lesiones por presión?', ['Cada 2 horas', 'Cada 8 horas', 'Una vez al día', 'Solo cuando se queje'], 0, 'Y antes si la valoración lo indica.'],
  ['o', '¿Cuál es la primera etapa del PAE?', ['Valoración', 'Diagnóstico', 'Planificación', 'Evaluación'], 0, 'Sin una buena valoración no hay buen diagnóstico.'],
  ['v', 'Las agujas usadas se deben reencapuchar con las dos manos antes de desecharlas.', false, 'No se reencapuchan: van directo al guardián.'],
  ['v', 'El sarampión requiere aislamiento por aerosoles.', true, 'Igual que la tuberculosis y la varicela.'],
  ['v', 'La teoría de Orem se centra en el autocuidado.', true, 'Déficit de autocuidado.'],
  ['v', 'Un error en el registro de enfermería se puede tapar con corrector líquido.', false, 'No se usan enmendaduras: se corrige según el procedimiento institucional, dejando legible lo anterior.'],
  ['v', 'El PAE es un proceso cíclico.', true, 'La evaluación lleva a una nueva valoración.'],
  ['p', 'Une cada aislamiento con su elemento clave', [['Aerosoles', 'Respirador N95'], ['Gotas', 'Mascarilla quirúrgica'], ['Contacto', 'Bata y guantes'], ['Precauciones estándar', 'Higiene de manos con todos los pacientes']]],
  ['p', 'Une cada teórica con su aporte', [['Florence Nightingale', 'Teoría del entorno'], ['Virginia Henderson', '14 necesidades básicas'], ['Dorothea Orem', 'Déficit de autocuidado'], ['Hildegard Peplau', 'Relaciones interpersonales']]],
  ['p', 'Une cada sigla con su contenido', [['NANDA', 'Diagnósticos'], ['NIC', 'Intervenciones'], ['NOC', 'Resultados'], ['PES', 'Estructura del diagnóstico']]],
  ['s', 'Ordena las etapas del PAE', ['Valoración', 'Diagnóstico', 'Planificación', 'Ejecución', 'Evaluación'], 'Y vuelve a empezar.'],
  ['s', 'Ordena la colocación del equipo de protección personal', ['Higiene de manos', 'Bata', 'Mascarilla o respirador', 'Gafas o careta', 'Guantes'], 'Los guantes van de últimos y cubren el puño de la bata.']
]);

/* ---------------- Psicología Social ---------------- */
C('psicos', [
  ['Conceptos', '¿Qué estudia la psicología social?', 'Cómo los pensamientos, sentimientos y conductas de las personas se ven influidos por la presencia real o imaginada de otros.', 'Explica fenómenos como la conformidad, la obediencia y los prejuicios.', 'el individuo en el grupo.'],
  ['Influencia social', '¿Qué demostró el experimento de Asch?', 'Que muchas personas se conforman con la opinión del grupo aunque sea claramente errónea (conformidad).', 'Los participantes comparaban la longitud de unas líneas.', 'líneas.'],
  ['Influencia social', '¿Qué demostró el experimento de Milgram?', 'Que muchas personas obedecen a una autoridad aunque eso implique dañar a otro.', 'En salud recuerda que debes cuestionar una orden que pueda dañar al paciente.', 'descargas eléctricas.'],
  ['Influencia social', '¿Qué mostró el experimento de la prisión de Stanford (Zimbardo)?', 'El poder de los roles y de la situación sobre la conducta: los "guardias" se volvieron abusivos.', 'Se suspendió antes de tiempo y hoy tiene críticas metodológicas.', 'guardias y prisioneros.'],
  ['Conducta de ayuda', '¿Qué es el efecto espectador?', 'Cuantas más personas presencian una emergencia, menos probable es que alguien ayude, porque la responsabilidad se diluye.', 'En una emergencia señala a una persona concreta: "Usted, llame al 123".', 'difusión de la responsabilidad.'],
  ['Cognición social', '¿Qué es la disonancia cognitiva?', 'El malestar de sostener ideas o conductas contradictorias, que lleva a cambiar una de ellas o a justificarla.', 'Ejemplo: "Sé que fumar hace daño, pero fumo".', 'Festinger.'],
  ['Cognición social', '¿Qué es el error fundamental de atribución?', 'La tendencia a explicar la conducta de otros por su personalidad, subestimando la situación.', 'Ejemplo: pensar que un paciente que no vino al control es descuidado, sin saber que no tenía transporte.', 'culpar a la persona.'],
  ['Prejuicio', '¿Qué diferencia hay entre estereotipo, prejuicio y discriminación?', 'Estereotipo: creencia generalizada (cognitivo); prejuicio: actitud o emoción negativa (afectivo); discriminación: conducta de trato desigual.', 'Pensar, sentir y actuar.', 'pensar, sentir, actuar.'],
  ['Prejuicio', '¿Qué es el estigma según Goffman?', 'Un atributo que desacredita socialmente a una persona y la reduce a esa característica.', 'Afecta a personas con VIH, tuberculosis o trastornos mentales y las aleja de los servicios.', 'una marca social.'],
  ['Grupos', '¿Qué es el pensamiento grupal?', 'La tendencia de un grupo muy unido a buscar el consenso y evitar el desacuerdo, lo que lleva a malas decisiones.', 'Lo describió Irving Janis.', 'todos de acuerdo, aunque estén mal.'],
  ['Grupos', '¿Qué estilos de liderazgo describió Lewin?', 'Autocrático, democrático y laissez-faire (dejar hacer).', 'El democrático suele favorecer la participación y la satisfacción del equipo.', 'tres estilos.'],
  ['Cambio de conducta', '¿Cuáles son las etapas del modelo transteórico (Prochaska y DiClemente)?', 'Precontemplación, contemplación, preparación, acción y mantenimiento; la recaída puede ocurrir.', 'La intervención se ajusta a la etapa en que está la persona.', 'empieza en "pre".'],
  ['Cambio de conducta', '¿Qué plantea el modelo de creencias en salud?', 'Que una persona actúa si se percibe susceptible, cree que el problema es grave, ve más beneficios que barreras y recibe una clave para la acción.', 'Ejemplo: una campaña que motiva a hacerse la citología.', 'creencias.'],
  ['Actitudes', '¿Cuáles son los componentes de una actitud?', 'Cognitivo (lo que pienso), afectivo (lo que siento) y conductual (cómo tiendo a actuar).', 'Cambiar uno puede mover los demás.', 'pensar, sentir y hacer.'],
  ['Expectativas', '¿Qué es la profecía autocumplida (efecto Pigmalión)?', 'Cuando las expectativas sobre alguien influyen en su conducta y terminan haciéndose realidad.', 'Confiar en la capacidad del paciente puede mejorar su adherencia.', 'expectativas.'],
  ['Roles', '¿Qué diferencia hay entre rol y estatus?', 'El estatus es la posición que se ocupa en un grupo; el rol, las conductas que se esperan de esa posición.', 'Ejemplo: el estatus de jefe de enfermería y su rol de coordinar el servicio.', 'posición y conducta.'],
  ['Normas', '¿Qué son las normas sociales?', 'Reglas, explícitas o implícitas, que indican cómo comportarse en un grupo.', 'Influyen en conductas de salud como el consumo de alcohol.', 'reglas no escritas.'],
  ['Grupos', '¿Qué diferencia hay entre un grupo primario y uno secundario?', 'El primario es pequeño, íntimo y duradero (familia, amigos); el secundario es más formal y orientado a tareas (trabajo, instituciones).', 'El grupo primario es la principal red de apoyo.', 'familia vs. trabajo.'],
  ['Comunicación', '¿Qué es la comunicación asertiva?', 'Expresar las propias opiniones y necesidades de forma clara y respetuosa, sin agredir ni someterse.', 'Se diferencia del estilo pasivo y del agresivo.', 'ni pasiva ni agresiva.'],
  ['Apoyo social', '¿Por qué importa el apoyo social en la salud?', 'Porque las redes de apoyo amortiguan el estrés y se asocian a mejor adherencia, recuperación y salud mental.', 'Pregunta siempre con quién cuenta el paciente.', 'redes.'],
  ['Influencia social', '¿Qué es la facilitación social?', 'La mejora del desempeño en tareas sencillas o bien aprendidas cuando hay otras personas presentes.', 'En tareas nuevas o difíciles, la presencia de otros puede empeorar el desempeño.', 'público.']
]);
G('psicos', [
  ['o', 'Una persona cambia su respuesta para coincidir con el grupo aunque sabe que está equivocada. ¿Qué fenómeno es?', ['Conformidad', 'Obediencia', 'Facilitación social', 'Efecto Pigmalión'], 0, 'Experimento de Asch.'],
  ['o', 'En una calle llena de gente nadie ayuda a un señor que se desmayó. ¿Qué lo explica?', ['Efecto espectador', 'Efecto Pigmalión', 'Pensamiento grupal', 'Disonancia cognitiva'], 0, 'La responsabilidad se diluye.'],
  ['o', '"Sé que el cigarrillo hace daño, pero de algo me tengo que morir." ¿Qué fenómeno muestra?', ['Disonancia cognitiva', 'Conformidad', 'Estigma', 'Facilitación social'], 0, 'Justifica la contradicción entre lo que sabe y lo que hace.'],
  ['o', 'Un fumador dice que quiere dejar de fumar "en los próximos meses". ¿En qué etapa del cambio está?', ['Contemplación', 'Precontemplación', 'Acción', 'Mantenimiento'], 0, 'Lo piensa, pero no tiene fecha cercana.'],
  ['o', 'Negarse a atender a un paciente por tener VIH es un ejemplo de…', ['Discriminación', 'Estereotipo', 'Facilitación social', 'Conformidad'], 0, 'Es la conducta de trato desigual.'],
  ['o', '¿Qué investigador estudió la obediencia a la autoridad?', ['Stanley Milgram', 'Solomon Asch', 'Leon Festinger', 'Kurt Lewin'], 0, 'Con las supuestas descargas eléctricas.'],
  ['o', 'Un jefe que toma todas las decisiones sin consultar al equipo tiene un liderazgo…', ['Autocrático', 'Democrático', 'Laissez-faire', 'Participativo'], 0, 'Según Lewin.'],
  ['o', 'Pensar que un paciente que faltó al control es "irresponsable", sin conocer su situación, es…', ['Error fundamental de atribución', 'Facilitación social', 'Pensamiento grupal', 'Comunicación asertiva'], 0, 'Se subestima la situación.'],
  ['o', '¿Qué componente de la actitud corresponde a lo que la persona siente?', ['Afectivo', 'Cognitivo', 'Conductual', 'Normativo'], 0, 'Pensar, sentir y actuar.'],
  ['o', 'Un equipo evita discutir un error para no romper la armonía y toma una mala decisión. ¿Qué fenómeno es?', ['Pensamiento grupal', 'Efecto espectador', 'Efecto Pigmalión', 'Facilitación social'], 0, 'Descrito por Janis.'],
  ['v', 'En una emergencia conviene gritar "¡alguien llame una ambulancia!" sin señalar a nadie.', false, 'Señala a una persona concreta y dale una tarea.'],
  ['v', 'El estereotipo es el componente conductual del prejuicio.', false, 'El estereotipo es cognitivo; la discriminación es la conducta.'],
  ['v', 'El estigma puede alejar a las personas de los servicios de salud.', true, 'Por eso el trato debe ser respetuoso y confidencial.'],
  ['v', 'En el modelo transteórico la recaída puede ser parte del proceso de cambio.', true, 'Se retoma sin culpar.'],
  ['v', 'La comunicación asertiva implica imponer la propia opinión.', false, 'Es expresarla con respeto, sin agredir ni someterse.'],
  ['p', 'Une cada investigador con su estudio', [['Solomon Asch', 'Conformidad (líneas)'], ['Stanley Milgram', 'Obediencia a la autoridad'], ['Philip Zimbardo', 'Prisión de Stanford'], ['Leon Festinger', 'Disonancia cognitiva']]],
  ['p', 'Une cada concepto con su componente', [['Estereotipo', 'Cognitivo (creencia)'], ['Prejuicio', 'Afectivo (actitud negativa)'], ['Discriminación', 'Conductual (trato desigual)']]],
  ['p', 'Une cada etapa del cambio con su ejemplo', [['Precontemplación', '"Yo no tengo ningún problema con el cigarrillo"'], ['Contemplación', '"Estoy pensando en dejarlo algún día"'], ['Preparación', '"El próximo mes lo dejo; ya pedí ayuda"'], ['Acción', '"Hace dos meses dejé de fumar"'], ['Mantenimiento', '"Llevo un año sin fumar"']]],
  ['s', 'Ordena las etapas del modelo transteórico', ['Precontemplación', 'Contemplación', 'Preparación', 'Acción', 'Mantenimiento'], 'Prochaska y DiClemente.'],
  ['s', 'Alguien se desmaya en la calle. Ordena tu actuación para evitar el efecto espectador', ['Verificar que la escena sea segura', 'Comprobar si la persona responde', 'Señalar a alguien concreto: "Usted, llame al 123"', 'Pedir a otra persona concreta que busque un DEA', 'Iniciar RCP si no respira con normalidad'], 'Asignar tareas a personas concretas rompe la difusión de la responsabilidad.']
]);
