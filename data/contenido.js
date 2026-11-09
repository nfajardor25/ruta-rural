/* =========================================================
   Ruta Rural · Banco de contenido (tanda 1)
   Cada tarjeta: id, m (módulo), t (tema), q (pregunta), a (respuesta),
   n (nota ampliada), h (pista de Clara), f (fuente sugerida)
   IMPORTANTE: validar cada dato con la guía vigente y con docentes.
   ========================================================= */

window.RR_MODULOS = [
  { id: 'pf', nombre: 'Planificación familiar y SSR', sub: 'Implantes, métodos, citología, parto', color: 'lav', icono: 'venus', enfasis: true },
  { id: 'proc', nombre: 'Procedimientos', sub: 'Cistoirrigación, glucometría, goteo', color: 'mint', icono: 'syringe', enfasis: true },
  { id: 'hta', nombre: 'HTA en el paciente crónico', sub: 'Diagnóstico, toma de PA, fármacos', color: 'peach', icono: 'heart', enfasis: true },
  { id: 'bal', nombre: 'Balance de líquidos', sub: 'Ingresos, egresos, pérdidas', color: 'sky', icono: 'drop', enfasis: true, juego: true },
  { id: 'elec', nombre: 'Equilibrio electrolítico', sub: 'Na, K, Ca, Mg y ECG', color: 'butter', icono: 'bolt', enfasis: true },
  { id: 'fund', nombre: 'Principios del cuidado', sub: 'Signos vitales, bioseguridad', color: 'mauve', icono: 'case', enfasis: false },
  { id: 'farma', nombre: 'Farmacología', sub: 'Antídotos, insulinas, seguridad', color: 'lav', icono: 'syringe', enfasis: false },
  { id: 'aps', nombre: 'Atención primaria y salud pública', sub: 'APS, vacunación', color: 'mint', icono: 'hills', enfasis: false }
];

/* Pensum (malla curricular) y módulos de la app que alimentan cada asignatura */
window.RR_PENSUM = [
  { periodo: 1, materias: [
    ['Bioética y Constitución', []], ['Bioquímica I', []], ['Cátedra Antonio Nariño', []], ['Electiva I', []],
    ['Morfofisiología I', []], ['Psicología General y Evolutiva', []], ['Socioantropología', []], ['Técnicas de Comunicación', []] ] },
  { periodo: 2, materias: [
    ['Atención Primaria en Salud I', ['aps']], ['Bioestadística', []], ['Bioquímica II', []], ['Morfofisiología II', []],
    ['Psicología de la Personalidad', []], ['Seguridad Social', []] ] },
  { periodo: 3, materias: [
    ['Atención Primaria en Salud II', ['aps', 'pf']], ['Epidemiología', []], ['Farmacología', ['farma']],
    ['Principios del Cuidado de Enfermería', ['fund', 'proc']], ['Psicología Social', []] ] },
  { periodo: 4, materias: [
    ['Cuidado de Enfermería en Salud Mental', []], ['Cuidados de Enfermería en Clínicas Médicas', ['hta', 'bal', 'elec']],
    ['Fisiopatología I', ['elec']], ['Metodología de la Investigación', []] ] },
  { periodo: 5, materias: [
    ['Cuidado Básico de Familia', []], ['Cuidados de Enfermería en Ginecobstetricia', ['pf']], ['Electiva II', []],
    ['Factores de Riesgo I', ['hta']], ['Fisiopatología II', []], ['Trabajo de Grado I', []] ] },
  { periodo: 6, materias: [
    ['Cuidados de Enfermería en Pediatría', []], ['Electiva III', []], ['Factores de Riesgo II', []],
    ['Programas de Educación en Enfermería', []], ['Trabajo de Grado II', []] ] },
  { periodo: 7, materias: [
    ['Cuidado de Enfermería en Clínicas Quirúrgicas', ['proc', 'bal']], ['Gerencia de Servicios de Enfermería I', []], ['Trabajo de Grado III', []] ] },
  { periodo: 8, materias: [
    ['Calidad de Servicios de Salud', []], ['Cuidado de Enfermería al Paciente Crítico', ['elec', 'bal', 'farma']],
    ['Gerencia de Servicios de Enfermería II', []] ] }
];

var F = {
  r3280: 'Resolución 3280 de 2018 (MinSalud), modificada por la Res. 051 de 2023',
  oms_mec: 'OMS · Criterios médicos de elegibilidad para el uso de anticonceptivos',
  ficha: 'Ficha técnica del producto (INVIMA)',
  oms_parto: 'OMS · Recomendaciones para los cuidados durante el parto (2018)',
  oms_hpp: 'OMS · Recomendaciones para la prevención y tratamiento de la hemorragia posparto',
  hta: 'GPC Hipertensión arterial primaria, Guía 18 (MinSalud), con actualización parcial 2025',
  ada: 'ADA · Standards of Care in Diabetes',
  lab: 'Rangos de referencia habituales (cada laboratorio define los suyos)',
  farma: 'Texto de farmacología clínica / protocolo institucional',
  inst: 'Protocolo institucional de enfermería',
  oms_manos: 'OMS · Los 5 momentos para la higiene de las manos',
  aps: 'Declaración de Alma-Ata (1978)',
  pai: 'Programa Ampliado de Inmunizaciones (PAI) Colombia'
};

window.RR_TARJETAS = [
  /* ---------- Planificación familiar: implantes y métodos ---------- */
  { id: 'pf01', m: 'pf', t: 'Implante subdérmico', q: '¿Cuántos años de protección da el implante de levonorgestrel de 2 varillas (Jadelle)?', a: '5 años.', n: 'Al cumplir 5 años se retira y, si la usuaria quiere, se coloca uno nuevo en el mismo procedimiento.', h: 'el de 2 varillas dura más que el de 1.', f: F.ficha },
  { id: 'pf02', m: 'pf', t: 'Implante subdérmico', q: '¿Cuántos años de protección da el implante de etonogestrel de 1 varilla (Implanon NXT)?', a: '3 años.', n: 'Es radiopaco, lo que permite ubicarlo con rayos X si no se palpa.', h: 'es el de una sola varilla.', f: F.ficha },
  { id: 'pf03', m: 'pf', t: 'Implante subdérmico', q: '¿Dónde se inserta el implante subdérmico?', a: 'Cara interna del brazo no dominante, por debajo de la piel, unos 8 a 10 cm por encima del epicóndilo medial.', n: 'Se evita el surco entre bíceps y tríceps por los vasos y nervios que pasan por allí. Después de insertarlo, la usuaria y tú deben palparlo.', h: 'brazo que menos usa, cara interna.', f: F.ficha },
  { id: 'pf04', m: 'pf', t: 'Implante subdérmico', q: '¿Cuál es el efecto adverso más frecuente del implante?', a: 'Cambios en el patrón de sangrado (irregular, prolongado o amenorrea).', n: 'Explicarlo en la consejería antes de la inserción disminuye las solicitudes de retiro temprano.', h: 'tiene que ver con la menstruación.', f: F.oms_mec },
  { id: 'pf05', m: 'pf', t: 'Implante subdérmico', q: '¿El implante protege contra infecciones de transmisión sexual?', a: 'No. Para eso se recomienda usar además el condón (doble protección).', n: 'Ningún método hormonal protege contra ITS.', h: 'piensa en qué método actúa como barrera.', f: F.oms_mec },
  { id: 'pf06', m: 'pf', t: 'Criterios de elegibilidad', q: '¿En cuántas categorías clasifica la OMS los criterios médicos de elegibilidad de anticonceptivos?', a: 'En 4 categorías.', n: '1: sin restricción · 2: los beneficios superan los riesgos · 3: los riesgos suelen superar los beneficios · 4: riesgo inaceptable, no usar.', h: 'es un número par y pequeño.', f: F.oms_mec },
  { id: 'pf07', m: 'pf', t: 'Criterios de elegibilidad', q: '¿Qué significa que un método sea categoría 3 para una usuaria?', a: 'Los riesgos teóricos o comprobados suelen superar los beneficios; no se recomienda salvo que no haya otro método disponible o aceptable.', n: 'Requiere juicio clínico y seguimiento cercano.', h: 'está a un paso de la contraindicación.', f: F.oms_mec },
  { id: 'pf08', m: 'pf', t: 'Criterios de elegibilidad', q: 'Usuaria con migraña con aura que pide anticonceptivos orales combinados. ¿Qué categoría tienen?', a: 'Categoría 4: no se deben usar.', n: 'Los estrógenos aumentan el riesgo de accidente cerebrovascular en mujeres con migraña con aura. Se ofrecen métodos sin estrógenos.', h: 'el problema es el estrógeno.', f: F.oms_mec },
  { id: 'pf09', m: 'pf', t: 'Métodos anticonceptivos', q: '¿Cuántos años está aprobado el DIU T de cobre 380A?', a: '10 años según ficha técnica.', n: 'La OMS reconoce evidencia de eficacia hasta 12 años. No contiene hormonas.', h: 'una década.', f: F.ficha },
  { id: 'pf10', m: 'pf', t: 'Métodos anticonceptivos', q: 'Acetato de medroxiprogesterona de depósito: ¿dosis y frecuencia?', a: '150 mg IM cada 3 meses.', n: 'La OMS acepta aplicar la siguiente dosis hasta 4 semanas tarde sin protección adicional.', h: 'es el inyectable trimestral.', f: F.oms_mec },
  { id: 'pf11', m: 'pf', t: 'Métodos anticonceptivos', q: 'Anticoncepción de emergencia con levonorgestrel: ¿dosis y ventana?', a: '1,5 mg en dosis única, lo antes posible; idealmente dentro de las primeras 72 horas.', n: 'Puede usarse hasta 120 horas, pero su eficacia disminuye con el tiempo.', h: 'una sola toma, cuanto antes mejor.', f: F.oms_mec },
  { id: 'pf12', m: 'pf', t: 'Métodos anticonceptivos', q: '¿Qué tres condiciones exige el método de lactancia y amenorrea (MELA)?', a: 'Amenorrea, lactancia exclusiva o casi exclusiva y menos de 6 meses posparto.', n: 'Si falla cualquiera de las tres, la usuaria necesita otro método.', h: 'son tres, y una tiene límite de meses.', f: F.oms_mec },
  { id: 'pf13', m: 'pf', t: 'Métodos anticonceptivos', q: '¿Qué método ofrece doble protección (embarazo e ITS)?', a: 'El condón (masculino o femenino).', n: 'Se puede combinar con cualquier otro método.', h: 'es un método de barrera.', f: F.oms_mec },

  /* ---------- Tamizaje de cuello uterino ---------- */
  { id: 'pf14', m: 'pf', t: 'Tamizaje de cuello uterino', q: 'Mujeres de 25 a 29 años: ¿con qué prueba y esquema se tamizan?', a: 'Citología, esquema 1-3-3 ante resultados negativos.', n: 'Puede ser citología convencional o en base líquida, según disponibilidad.', h: 'en este grupo todavía no va la prueba de VPH.', f: F.r3280 },
  { id: 'pf15', m: 'pf', t: 'Tamizaje de cuello uterino', q: 'Mujeres de 30 a 65 años: ¿con qué prueba y esquema se tamizan?', a: 'Prueba de ADN-VPH, esquema 1-5-5 ante resultados negativos.', n: 'Si el ADN-VPH es positivo, la citología se usa para decidir si va a colposcopia.', h: 'es una prueba molecular y el intervalo es más largo.', f: F.r3280 },
  { id: 'pf16', m: 'pf', t: 'Tamizaje de cuello uterino', q: '¿Se tamiza de rutina a las menores de 25 años?', a: 'No. Solo por criterio médico o de enfermería si hay factores de riesgo, con esquema 1-3-3.', n: 'Factores de riesgo: inicio de relaciones antes de los 15 años, multiparidad (3 o más hijos) o múltiples compañeros sexuales.', h: 'la regla general es esperar.', f: F.r3280 },
  { id: 'pf17', m: 'pf', t: 'Tamizaje de cuello uterino', q: 'La citología llega como "muestra insatisfactoria". ¿Qué haces?', a: 'Tomar una nueva muestra en las siguientes 3 a 4 semanas.', n: 'Explica a la usuaria que no es un resultado anormal sino una muestra que no se pudo leer.', h: 'se repite, pero no de inmediato.', f: F.r3280 },
  { id: 'pf18', m: 'pf', t: 'Tamizaje de cuello uterino', q: 'Mujeres de 30 a 50 años en zonas dispersas con difícil acceso: ¿qué estrategia de tamizaje contempla la norma?', a: 'Técnicas de inspección visual (VIA-VILI) con la estrategia "ver y tratar".', n: 'Muy relevante en el rural: el resultado se da en la misma consulta y se puede tratar de inmediato.', h: 'se ve con ácido acético y lugol.', f: F.r3280 },
  { id: 'pf19', m: 'pf', t: 'Tamizaje de cuello uterino', q: 'En la toma de citología convencional, ¿qué zonas se muestrean?', a: 'Exocérvix (con espátula) y endocérvix (con cepillo), incluyendo la zona de transformación.', n: 'La zona de transformación es donde se originan la mayoría de las lesiones.', h: 'por fuera y por dentro del cuello.', f: F.inst },
  { id: 'pf20', m: 'pf', t: 'Tamizaje de cuello uterino', q: 'Citología convencional: ¿cuándo se fija la lámina?', a: 'De inmediato, en segundos, para evitar que las células se sequen.', n: 'Una muestra secada al aire puede quedar insatisfactoria.', h: 'no hay que esperar nada.', f: F.inst },
  { id: 'pf21', m: 'pf', t: 'Tamizaje de cuello uterino', q: '¿Qué recomendaciones das antes de la toma de citología?', a: 'Evitar duchas vaginales, óvulos y relaciones sexuales en los días previos (usualmente 48 horas) y no tomarla durante la menstruación.', n: 'Todo esto puede alterar la lectura de la muestra.', h: 'nada dentro de la vagina antes.', f: F.inst },

  /* ---------- Parto ---------- */
  { id: 'pf22', m: 'pf', t: 'Atención del parto', q: '¿Cuáles son los periodos del trabajo de parto?', a: 'Dilatación, expulsivo y alumbramiento.', n: 'El periodo de dilatación tiene una fase latente y una activa.', h: 'son tres y el último incluye la placenta.', f: F.oms_parto },
  { id: 'pf23', m: 'pf', t: 'Atención del parto', q: 'Según la OMS (2018), ¿desde cuántos centímetros empieza la fase activa?', a: 'Desde 5 cm de dilatación.', n: 'Algunas guías anteriores usaban 4 cm. Revisa cuál aplica en tu institución.', h: 'un número a la mitad del camino.', f: F.oms_parto },
  { id: 'pf24', m: 'pf', t: 'Atención del parto', q: '¿Qué es el alumbramiento?', a: 'El periodo que va desde el nacimiento del bebé hasta la expulsión de la placenta y las membranas.', n: 'Es el periodo con mayor riesgo de hemorragia.', h: 'tercer periodo.', f: F.oms_parto },
  { id: 'pf25', m: 'pf', t: 'Atención del parto', q: 'Manejo activo del alumbramiento: ¿cuál es el uterotónico de elección?', a: 'Oxitocina 10 UI IM (o IV) inmediatamente después del nacimiento.', n: 'Hace parte de la prevención de la hemorragia posparto.', h: 'es la hormona de las contracciones.', f: F.oms_hpp },
  { id: 'pf26', m: 'pf', t: 'Atención del parto', q: '¿A partir de cuánto tiempo se considera retenida la placenta?', a: 'Si no ha salido 30 minutos después del nacimiento.', n: 'Es una causa de hemorragia: requiere manejo médico y, en el rural, remisión oportuna.', h: 'media hora.', f: F.oms_hpp },
  { id: 'pf27', m: 'pf', t: 'Atención del parto', q: '¿Cómo se define la hemorragia posparto en un parto vaginal?', a: 'Pérdida de 500 ml o más de sangre en las primeras 24 horas.', n: 'En cesárea se usa clásicamente 1.000 ml. Cualquier sangrado con inestabilidad hemodinámica es hemorragia.', h: 'medio litro.', f: F.oms_hpp },
  { id: 'pf28', m: 'pf', t: 'Atención del parto', q: '¿Cuáles son las "4 T" de la hemorragia posparto y cuál es la más frecuente?', a: 'Tono, Trauma, Tejido y Trombina. La más frecuente es la atonía uterina (Tono).', n: 'Ante atonía: masaje uterino y uterotónicos según protocolo.', h: 'la más común es un útero blando.', f: F.oms_hpp },
  { id: 'pf29', m: 'pf', t: 'Atención del parto', q: '¿Cuál es el rango normal de la frecuencia cardiaca fetal?', a: '110 a 160 latidos por minuto.', n: 'Fuera de ese rango, avisa y evalúa bienestar fetal.', h: 'más rápido que un adulto, por encima de 100.', f: F.oms_parto },
  { id: 'pf30', m: 'pf', t: 'Atención del parto', q: '¿Cuándo se recomienda pinzar el cordón en un recién nacido que no necesita reanimación?', a: 'Entre 1 y 3 minutos después del nacimiento (pinzamiento tardío).', n: 'Mejora las reservas de hierro del bebé.', h: 'no de inmediato.', f: F.oms_parto },
  { id: 'pf31', m: 'pf', t: 'Trastornos hipertensivos del embarazo', q: '¿Qué cifra de presión arterial define hipertensión en el embarazo y desde qué semana se habla de preeclampsia?', a: 'PA ≥ 140/90 mmHg; preeclampsia después de la semana 20, con proteinuria o daño de órgano.', n: 'Signos de alarma: cefalea intensa, visión borrosa, dolor en epigastrio, edema súbito.', h: 'la misma cifra que en el adulto, pero con semanas.', f: F.oms_parto },

  /* ---------- Procedimientos ---------- */
  { id: 'pr01', m: 'proc', t: 'Cistoirrigación', q: '¿Qué tipo de sonda se usa para la cistoirrigación continua?', a: 'Sonda Foley de 3 vías.', n: 'Una vía para el balón, una para la entrada de la irrigación y otra para el drenaje.', h: 'cuenta las funciones que necesita.', f: F.inst },
  { id: 'pr02', m: 'proc', t: 'Cistoirrigación', q: '¿Qué solución se usa habitualmente para la cistoirrigación?', a: 'Solución salina normal al 0,9 % (isotónica).', n: 'Revisa siempre la orden médica.', h: 'la más común en el servicio.', f: F.inst },
  { id: 'pr03', m: 'proc', t: 'Cistoirrigación', q: 'En cistoirrigación continua, ¿cómo calculas la diuresis real?', a: 'Volumen total drenado − volumen de irrigación infundido.', n: 'Si no restas la irrigación, la diuresis queda falsamente alta y el balance sale mal.', h: 'lo que entra por la irrigación también sale por el drenaje.', f: F.inst },
  { id: 'pr04', m: 'proc', t: 'Cistoirrigación', q: 'El drenaje es menor que lo infundido y el paciente tiene dolor suprapúbico. ¿Qué sospechas y qué haces?', a: 'Obstrucción (por ejemplo, por coágulos): detienes la irrigación, revisas el sistema y avisas o irrigas según protocolo.', n: 'Seguir infundiendo con la sonda obstruida distiende la vejiga.', h: 'algo no está dejando salir el líquido.', f: F.inst },
  { id: 'pr05', m: 'proc', t: 'Cistoirrigación', q: '¿Con qué criterio ajustas la velocidad de la cistoirrigación?', a: 'Para mantener un drenaje rosado claro y sin coágulos.', n: 'Si el drenaje se oscurece o aparecen coágulos, se aumenta según la orden y se avisa.', h: 'mira el color.', f: F.inst },
  { id: 'pr06', m: 'proc', t: 'Glucometría', q: '¿Dónde se recomienda puncionar para una glucometría capilar?', a: 'En la cara lateral de la yema del dedo, rotando los dedos.', n: 'El centro de la yema tiene más terminaciones nerviosas y duele más.', h: 'al costado del dedo.', f: F.inst },
  { id: 'pr07', m: 'proc', t: 'Glucometría', q: 'Si limpias el dedo con alcohol antes de la glucometría, ¿qué debes cuidar?', a: 'Dejar que se seque completamente antes de puncionar.', n: 'El alcohol húmedo puede alterar el resultado. Lo ideal es que el paciente se lave las manos con agua y jabón.', h: 'el alcohol no debe mezclarse con la gota.', f: F.inst },
  { id: 'pr08', m: 'proc', t: 'Glucometría', q: '¿Por debajo de qué valor de glucemia hablamos de hipoglucemia?', a: 'Por debajo de 70 mg/dL.', n: 'Por debajo de 54 mg/dL es hipoglucemia clínicamente significativa (nivel 2).', h: 'un número redondo cerca de 70.', f: F.ada },
  { id: 'pr09', m: 'proc', t: 'Glucometría', q: 'Paciente consciente con glucometría de 58 mg/dL. ¿Qué es la "regla de los 15"?', a: 'Dar 15 g de carbohidratos de absorción rápida y repetir la glucometría a los 15 minutos; repetir si sigue por debajo de 70.', n: 'Ejemplos de 15 g: medio vaso de jugo o gaseosa normal, o 3 a 4 cucharaditas de azúcar disueltas en agua.', h: 'el número se repite dos veces.', f: F.ada },
  { id: 'pr10', m: 'proc', t: 'Glucometría', q: 'Paciente con hipoglucemia que está inconsciente. ¿Le das azúcar por boca?', a: 'No. Riesgo de broncoaspiración: se usa glucagón IM o dextrosa IV según protocolo, y se avisa de inmediato.', n: 'Colócalo de lado para proteger la vía aérea.', h: 'piensa en la vía aérea.', f: F.ada },
  { id: 'pr11', m: 'proc', t: 'Glucometría', q: 'Glucemia en ayunas: ¿cuál es el valor normal, el de prediabetes y el de diabetes?', a: 'Normal 70–99 mg/dL · prediabetes 100–125 · diabetes ≥ 126 (confirmado en dos ocasiones).', n: 'El diagnóstico se hace con glucosa en plasma, no con glucometría.', h: '100 y 126 son los cortes.', f: F.ada },
  { id: 'pr12', m: 'proc', t: 'Cálculo de goteo', q: '¿Cuál es la fórmula para calcular gotas por minuto?', a: 'Gotas/min = volumen (ml) × factor de goteo ÷ tiempo (minutos).', n: 'El factor de goteo viene impreso en el equipo de venoclisis.', h: 'volumen por factor, sobre tiempo.', f: F.farma },
  { id: 'pr13', m: 'proc', t: 'Cálculo de goteo', q: '¿Cuál es el factor de goteo habitual del macrogoteo y del microgoteo?', a: 'Macrogoteo: 20 gotas/ml (verifica el equipo). Microgoteo: 60 microgotas/ml.', n: 'Algunos equipos de macrogoteo traen 10 o 15 gotas/ml.', h: 'el micro es tres veces el macro de 20.', f: F.farma },
  { id: 'pr14', m: 'proc', t: 'Cálculo de goteo', q: 'Con macrogoteo de 20 gotas/ml, ¿cuál es el atajo para pasar de ml/h a gotas/min?', a: 'Gotas/min = ml/h ÷ 3.', n: 'Ejemplo: 120 ml/h ÷ 3 = 40 gotas/min.', h: 'dividir entre un número pequeño.', f: F.farma },
  { id: 'pr15', m: 'proc', t: 'Cálculo de goteo', q: 'Con microgoteo (60 microgotas/ml), ¿cuántas microgotas por minuto equivalen a 30 ml/h?', a: '30 microgotas/min.', n: 'En microgoteo, microgotas/min = ml/h.', h: 'el número no cambia.', f: F.farma },

  /* ---------- HTA en paciente crónico ---------- */
  { id: 'ht01', m: 'hta', t: 'Diagnóstico', q: 'Según la guía colombiana, ¿a partir de qué cifra se considera hipertensión arterial?', a: 'PA ≥ 140/90 mmHg.', n: 'Entre 120/80 y 139/89 la guía de 2013 habla de presión normal alta. Revisa la actualización parcial de 2025.', h: 'el corte clásico.', f: F.hta },
  { id: 'ht02', m: 'hta', t: 'Toma de presión arterial', q: '¿Cómo preparas al paciente antes de tomar la presión?', a: 'Sentado 5 minutos en reposo, espalda apoyada, pies en el piso sin cruzar las piernas y brazo a la altura del corazón.', n: 'Que no haya fumado, tomado café ni hecho ejercicio en los 30 minutos previos, y con la vejiga vacía.', h: 'reposo, postura y brazo.', f: F.hta },
  { id: 'ht03', m: 'hta', t: 'Toma de presión arterial', q: '¿Qué pasa si usas un brazalete demasiado pequeño para el brazo del paciente?', a: 'La presión sale falsamente alta (se sobreestima).', n: 'La cámara del brazalete debe cubrir al menos el 80 % de la circunferencia del brazo.', h: 'aprieta de más.', f: F.hta },
  { id: 'ht04', m: 'hta', t: 'Crisis hipertensiva', q: '¿Qué diferencia una emergencia hipertensiva de una urgencia hipertensiva?', a: 'En la emergencia hay daño agudo de órgano blanco (dolor torácico, déficit neurológico, edema pulmonar, entre otros); en la urgencia no.', n: 'Las dos suelen tener cifras ≥ 180/120 mmHg. La emergencia requiere remisión inmediata.', h: 'la clave no es la cifra sino los órganos.', f: F.hta },
  { id: 'ht05', m: 'hta', t: 'Fármacos antihipertensivos', q: '¿Cuál es el efecto adverso típico de los IECA como el enalapril?', a: 'Tos seca.', n: 'También pueden causar hiperpotasemia y, rara vez, angioedema (urgencia).', h: 'molesta en la garganta.', f: F.farma },
  { id: 'ht06', m: 'hta', t: 'Fármacos antihipertensivos', q: 'Losartán (ARA II): ¿qué electrolito vigilas?', a: 'El potasio, porque puede subir (hiperpotasemia).', n: 'Más riesgo si hay enfermedad renal crónica o si se combina con espironolactona.', h: 'el mismo de los IECA.', f: F.farma },
  { id: 'ht07', m: 'hta', t: 'Fármacos antihipertensivos', q: 'Hidroclorotiazida: ¿qué alteraciones electrolíticas produce con más frecuencia?', a: 'Hipopotasemia e hiponatremia.', n: 'Vigila calambres y debilidad muscular.', h: 'hace perder potasio por la orina.', f: F.farma },
  { id: 'ht08', m: 'hta', t: 'Fármacos antihipertensivos', q: 'Amlodipino: ¿cuál es su efecto adverso más común?', a: 'Edema en los tobillos (maleolar).', n: 'No responde bien a diuréticos; se informa al médico.', h: 'se ve en los pies.', f: F.farma },
  { id: 'ht09', m: 'hta', t: 'Fármacos antihipertensivos', q: '¿Qué controlas antes de administrar un betabloqueador como el metoprolol?', a: 'La frecuencia cardiaca (y la presión arterial).', n: 'Con bradicardia o hipotensión, consulta antes de administrarlo.', h: 'el pulso.', f: F.farma },
  { id: 'ht10', m: 'hta', t: 'Medidas no farmacológicas', q: '¿Cuánta sal al día recomienda la OMS como máximo?', a: 'Menos de 5 g de sal al día (una cucharadita).', n: 'Junto con actividad física, control del peso, no fumar y limitar el alcohol.', h: 'una cucharadita.', f: F.hta },

  /* ---------- Balance de líquidos ---------- */
  { id: 'bl01', m: 'bal', t: 'Conceptos', q: '¿Qué es el balance hídrico?', a: 'La diferencia entre los ingresos y los egresos de líquidos en un periodo de tiempo.', n: 'Positivo: entra más de lo que sale. Negativo: sale más de lo que entra.', h: 'una resta.', f: F.inst },
  { id: 'bl02', m: 'bal', t: 'Conceptos', q: 'Nombra ingresos que se cuentan en el balance.', a: 'Vía oral, líquidos endovenosos, nutrición o líquidos por sonda, medicamentos diluidos y hemoderivados.', n: 'Las diluciones de medicamentos se olvidan con frecuencia.', h: 'todo lo que entra por cualquier vía.', f: F.inst },
  { id: 'bl03', m: 'bal', t: 'Conceptos', q: 'Nombra egresos que se cuentan en el balance.', a: 'Diuresis, deposiciones, vómito, drenajes, sangrado y pérdidas insensibles.', n: 'Las pérdidas insensibles son las que no se ven: piel y respiración.', h: 'todo lo que sale, lo veas o no.', f: F.inst },
  { id: 'bl04', m: 'bal', t: 'Pérdidas insensibles', q: '¿Qué fórmula se usa comúnmente para las pérdidas insensibles del adulto?', a: '0,5 ml × kg × horas.', n: 'Cada institución puede usar una fórmula distinta; aumentan con fiebre, taquipnea o calor.', h: 'medio mililitro por kilo por hora.', f: F.inst },
  { id: 'bl05', m: 'bal', t: 'Diuresis', q: '¿Cuál es la diuresis mínima esperada en el adulto?', a: '0,5 ml/kg/h.', n: 'Por debajo, sospecha oliguria y avisa.', h: 'la misma cifra de las insensibles.', f: F.inst },
  { id: 'bl06', m: 'bal', t: 'Interpretación', q: 'Balance positivo marcado en un paciente con falla cardiaca: ¿qué signos de sobrecarga buscas?', a: 'Edema, crépitos pulmonares, ingurgitación yugular, disnea y aumento de peso.', n: 'Avisa y revisa los líquidos endovenosos ordenados.', h: 'el líquido se acumula en algún lado.', f: F.inst },
  { id: 'bl07', m: 'bal', t: 'Interpretación', q: '¿Cuál es el indicador más práctico de cambios de volumen día a día?', a: 'El peso diario, a la misma hora, con la misma báscula y ropa similar.', n: '1 kg de aumento rápido equivale aproximadamente a 1 litro de líquido retenido.', h: 'se mide subiéndose a algo.', f: F.inst },

  /* ---------- Electrolitos ---------- */
  { id: 'el01', m: 'elec', t: 'Valores normales', q: '¿Cuál es el rango normal de sodio sérico?', a: '135 – 145 mEq/L.', n: 'Cada laboratorio puede tener rangos ligeramente distintos.', h: 'empieza en 135.', f: F.lab },
  { id: 'el02', m: 'elec', t: 'Valores normales', q: '¿Cuál es el rango normal de potasio sérico en el adulto?', a: '3,5 – 5,0 mEq/L.', n: 'Es un rango estrecho: pequeñas variaciones afectan el corazón.', h: 'empieza en 3,5.', f: F.lab },
  { id: 'el03', m: 'elec', t: 'Valores normales', q: '¿Cuál es el rango normal de calcio total?', a: '8,5 – 10,5 mg/dL (aproximadamente).', n: 'Si la albúmina está baja, el calcio total puede salir bajo sin que el calcio iónico lo esté.', h: 'alrededor de 9 y 10.', f: F.lab },
  { id: 'el04', m: 'elec', t: 'Valores normales', q: '¿Cuál es el rango normal de magnesio sérico?', a: '1,7 – 2,2 mg/dL (aproximadamente).', n: 'La hipomagnesemia dificulta corregir la hipopotasemia.', h: 'un poco por debajo de 2 y un poco por encima.', f: F.lab },
  { id: 'el05', m: 'elec', t: 'Valores normales', q: '¿Cuál es el rango normal de cloro sérico?', a: '98 – 106 mEq/L.', n: 'Acompaña al sodio en la mayoría de los cambios.', h: 'alrededor de 100.', f: F.lab },
  { id: 'el06', m: 'elec', t: 'Potasio', q: '¿Qué hallazgo típico da la hiperpotasemia en el ECG?', a: 'Ondas T altas y picudas.', n: 'Si progresa: ensanchamiento del QRS y arritmias graves. Es una urgencia.', h: 'una onda que se pone puntiaguda.', f: F.lab },
  { id: 'el07', m: 'elec', t: 'Potasio', q: '¿Qué hallazgo típico da la hipopotasemia en el ECG?', a: 'Onda U prominente y aplanamiento de la onda T.', n: 'Clínica: debilidad muscular, calambres, íleo.', h: 'aparece una onda extra.', f: F.lab },
  { id: 'el08', m: 'elec', t: 'Potasio', q: '¿Se puede administrar cloruro de potasio en bolo IV directo?', a: 'Nunca. Siempre diluido y, de preferencia, con bomba de infusión.', n: 'El potasio en bolo puede causar paro cardiaco. Es un medicamento de alto riesgo.', h: 'alto riesgo.', f: F.farma },
  { id: 'el09', m: 'elec', t: 'Calcio', q: '¿Qué signos clínicos buscas en la hipocalcemia?', a: 'Signo de Chvostek y signo de Trousseau, parestesias y tetania.', n: 'Chvostek: contracción facial al percutir el nervio facial. Trousseau: espasmo de la mano al inflar el brazalete.', h: 'dos signos con nombre propio.', f: F.lab },
  { id: 'el10', m: 'elec', t: 'Sodio', q: '¿Qué síntomas da la hiponatremia?', a: 'Cefalea, náuseas, confusión y, si es grave, convulsiones y coma.', n: 'Los síntomas son principalmente neurológicos por edema cerebral.', h: 'se afecta el cerebro.', f: F.lab },
  { id: 'el11', m: 'elec', t: 'Sodio', q: '¿Qué riesgo tiene corregir muy rápido una hiponatremia crónica?', a: 'Síndrome de desmielinización osmótica.', n: 'Por eso la corrección es lenta y controlada con sodios seriados.', h: 'daño en la mielina.', f: F.lab },

  /* ---------- Principios del cuidado ---------- */
  { id: 'fu01', m: 'fund', t: 'Signos vitales', q: '¿Cuál es la frecuencia cardiaca normal en reposo del adulto?', a: '60 – 100 latidos por minuto.', n: 'Menos de 60: bradicardia. Más de 100: taquicardia.', h: 'de 60 a 100.', f: F.inst },
  { id: 'fu02', m: 'fund', t: 'Signos vitales', q: '¿Cuál es la frecuencia respiratoria normal del adulto?', a: '12 – 20 respiraciones por minuto.', n: 'Cuéntala sin que el paciente lo note, durante un minuto completo si es irregular.', h: 'entre una docena y veinte.', f: F.inst },
  { id: 'fu03', m: 'fund', t: 'Signos vitales', q: '¿A partir de qué temperatura hablamos de fiebre?', a: '38 °C o más.', n: 'Entre 37,5 y 37,9 °C se suele hablar de febrícula.', h: 'un número redondo.', f: F.inst },
  { id: 'fu04', m: 'fund', t: 'Signos vitales', q: '¿La saturación de oxígeno normal es igual en la costa que en Bogotá?', a: 'No. En altura los valores normales son algo menores que a nivel del mar.', n: 'Interpreta la oximetría según la altitud del municipio y el estado clínico.', h: 'piensa en el aire de la montaña.', f: F.inst },
  { id: 'fu05', m: 'fund', t: 'Bioseguridad', q: '¿Cuáles son los 5 momentos de la higiene de manos de la OMS?', a: 'Antes del contacto con el paciente, antes de una tarea aséptica, después de exposición a fluidos, después del contacto con el paciente y después del contacto con su entorno.', n: 'Dos "antes" y tres "después".', h: 'dos antes y tres después.', f: F.oms_manos },

  /* ---------- Farmacología ---------- */
  { id: 'fa01', m: 'farma', t: 'Antídotos', q: '¿Cuál es el antídoto de la heparina?', a: 'Sulfato de protamina.', n: 'Para la warfarina se usa vitamina K.', h: 'empieza por P.', f: F.farma },
  { id: 'fa02', m: 'farma', t: 'Antídotos', q: '¿Cuál es el antídoto de los opioides?', a: 'Naloxona.', n: 'Vigila: su efecto puede durar menos que el del opioide.', h: 'empieza por N.', f: F.farma },
  { id: 'fa03', m: 'farma', t: 'Antídotos', q: '¿Cuál es el antídoto de las benzodiacepinas?', a: 'Flumazenil.', n: 'Úsalo con precaución por el riesgo de convulsiones.', h: 'empieza por F.', f: F.farma },
  { id: 'fa04', m: 'farma', t: 'Antídotos', q: 'Sulfato de magnesio en preeclampsia: ¿qué signos de toxicidad vigilas y cuál es el antídoto?', a: 'Pérdida de reflejos osteotendinosos, depresión respiratoria y oliguria. Antídoto: gluconato de calcio.', n: 'Vigila reflejo patelar, frecuencia respiratoria y diuresis de forma horaria.', h: 'revisa la rodilla y la respiración.', f: F.farma },
  { id: 'fa05', m: 'farma', t: 'Insulinas', q: '¿Qué insulina se usa por vía intravenosa?', a: 'La insulina regular (cristalina).', n: 'Las insulinas de acción intermedia o prolongada no se aplican por vía IV.', h: 'la que se ve transparente y es la clásica.', f: F.farma },

  /* ---------- APS y salud pública ---------- */
  { id: 'ap01', m: 'aps', t: 'Atención primaria en salud', q: '¿En qué declaración y año se definió la estrategia de Atención Primaria en Salud?', a: 'Declaración de Alma-Ata, 1978.', n: 'Lema: "Salud para todos en el año 2000".', h: 'una ciudad de Kazajistán.', f: F.aps },
  { id: 'ap02', m: 'aps', t: 'Vacunación', q: '¿Qué previene principalmente la vacuna BCG?', a: 'Las formas graves de tuberculosis en niños (meníngea y miliar).', n: 'Se aplica al recién nacido.', h: 'una enfermedad respiratoria con formas graves en niños.', f: F.pai }
];

/* Mensajes de Clara */
window.RR_CLARA = {
  animo: [
    '¡Vamos bien, jefe {n}!',
    'Un paso más hacia tu rural, jefe {n}.',
    'Así se repasa, jefe {n}.',
    'Cada tarjeta cuenta, jefe {n}.'
  ],
  fallo: [
    'Tranquila, jefe {n}: equivocarse aquí es mejor que en el puesto de salud.',
    'Casi, jefe {n}. Mira la explicación y la próxima sale.',
    'No pasa nada, jefe {n}. Esta te la vuelvo a traer pronto.'
  ]
};
