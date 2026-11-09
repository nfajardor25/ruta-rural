/* =========================================================
   Periodo 5: Cuidado Básico de Familia · Ginecobstetricia ·
   Factores de Riesgo I · Fisiopatología II
   ========================================================= */

/* ---------------- Cuidado Básico de Familia ---------------- */
C('familia', [
  ['Estructura', '¿Qué tipos de familia hay según su estructura?', 'Nuclear (padres e hijos), extensa (varias generaciones u otros parientes), monoparental (un solo padre o madre con sus hijos), reconstituida (pareja con hijos de uniones anteriores) y unipersonal.', 'La estructura orienta a quién involucrar en el cuidado.', 'cinco tipos.'],
  ['Instrumentos', '¿Qué es el familiograma?', 'Una representación gráfica de la familia de al menos tres generaciones, con sus relaciones y antecedentes.', 'Símbolos: cuadrado para el hombre, círculo para la mujer y una X sobre la figura si la persona falleció.', 'árbol familiar.'],
  ['Instrumentos', '¿Qué es el ecomapa?', 'Un gráfico de las relaciones de la familia con su entorno: escuela, trabajo, servicios de salud, iglesia, amigos y comunidad.', 'Las líneas muestran si la relación es fuerte, débil o conflictiva.', 'la familia y su entorno.'],
  ['Instrumentos', '¿Qué evalúa el APGAR familiar y cómo se interpreta?', 'La percepción de la función familiar en 5 ítems (adaptación, participación, gradiente de crecimiento, afecto y resolución), de 0 a 20 puntos: 18–20 buena función; 14–17 disfunción leve; 10–13 moderada; 9 o menos, severa.', 'Lo propuso Smilkstein.', 'cinco letras.'],
  ['Ciclo vital', '¿Cuáles son las etapas del ciclo vital familiar?', 'Formación (la pareja), extensión (nacen y crecen los hijos), contracción (los hijos se van) y disolución (muere uno de los miembros de la pareja).', 'Cada etapa trae tareas y crisis esperables.', 'cuatro etapas.'],
  ['Crisis', '¿Qué diferencia hay entre una crisis normativa y una no normativa?', 'La normativa es esperable por el ciclo vital (nacimiento de un hijo, adolescencia, jubilación); la no normativa es inesperada (enfermedad grave, desempleo, desplazamiento, muerte prematura).', 'Ambas exigen que la familia se adapte.', 'esperada vs. inesperada.'],
  ['Funciones', '¿Cuáles son las funciones de la familia?', 'Afecto, cuidado y protección, socialización, reproducción, educación y apoyo económico.', 'Cuando una función falla, se buscan apoyos en la red.', 'cuidar y formar.'],
  ['Visita domiciliaria', '¿Cuáles son las fases de la visita domiciliaria familiar?', 'Preparación (objetivo, materiales y ruta), ejecución (presentación, valoración e intervención) y registro con plan de seguimiento.', 'Siempre con el consentimiento de la familia.', 'antes, durante y después.'],
  ['Cuidador', '¿Qué evalúa la escala de Zarit?', 'La sobrecarga del cuidador principal.', 'Un puntaje alto indica riesgo de agotamiento.', 'el cansancio del cuidador.'],
  ['Cuidador', '¿Qué es el síndrome del cuidador y cómo se previene?', 'El agotamiento físico y emocional de quien cuida a un familiar dependiente; se previene con descansos (respiro), reparto de tareas, red de apoyo y autocuidado.', 'Pregunta siempre: "¿Y quién la cuida a usted?".', 'cuidar al que cuida.'],
  ['Dinámica', '¿Qué es la parentificación?', 'Cuando un hijo asume roles y responsabilidades que corresponden a los padres.', 'Ejemplo: una niña que cuida a sus hermanos y maneja la casa.', 'el hijo hace de padre.'],
  ['Dinámica', '¿Qué tipos de límites describió Minuchin?', 'Claros (familia funcional), difusos (aglutinamiento: todos se meten en todo) y rígidos (desligamiento: poca conexión).', 'Hacen parte de la terapia familiar estructural.', 'claros, difusos y rígidos.'],
  ['Dinámica', '¿Qué es la triangulación?', 'Cuando dos miembros en conflicto involucran a un tercero (a menudo un hijo) para bajar la tensión.', 'El tercero queda en medio del conflicto.', 'meter a un tercero.'],
  ['Funcionalidad', '¿Qué caracteriza a una familia funcional?', 'Comunicación clara, roles definidos, flexibilidad ante los cambios, apoyo mutuo y capacidad de resolver problemas.', 'No significa una familia sin conflictos.', 'se adapta.'],
  ['Violencias', '¿Qué tipos de violencia intrafamiliar existen?', 'Física, psicológica, sexual, económica y negligencia o abandono.', 'Activa la ruta: atención en salud, Comisaría de Familia y, si hay niños, ICBF.', 'no solo golpes.'],
  ['Plan de cuidado', '¿Qué es el plan de cuidado familiar?', 'Las metas y acciones que se acuerdan con la familia según sus riesgos y recursos, con fechas de seguimiento.', 'Se construye con la familia, no para la familia.', 'acuerdos.'],
  ['Enfoque', '¿Qué significa ver a la familia como un sistema?', 'Que lo que le pasa a un miembro afecta a todos y la familia busca mantener su equilibrio (homeostasis).', 'Por eso una enfermedad crónica cambia la vida de toda la familia.', 'todos se afectan.'],
  ['Duelo', '¿Qué etapas del duelo describió Kübler-Ross?', 'Negación, ira, negociación, depresión y aceptación.', 'No siempre aparecen en ese orden ni todas.', 'cinco etapas.'],
  ['Redes', '¿Qué es la red de apoyo social de una familia?', 'Las personas e instituciones con las que cuenta: parientes, amigos, vecinos, comunidad, iglesia y servicios.', 'El ecomapa ayuda a identificarla.', 'con quién cuenta.'],
  ['Cuidador', '¿Quién es el cuidador principal?', 'La persona que asume la mayor parte del cuidado de un familiar dependiente, con frecuencia una mujer de la familia.', 'Inclúyelo en la educación y en el plan de cuidado.', 'el que más cuida.'],
  ['Protección', '¿Qué factores familiares protegen la salud?', 'Comunicación abierta, afecto, normas claras, tiempo compartido y apoyo en las dificultades.', 'Fortalecerlos es parte de la promoción de la salud.', 'protegen.']
]);
G('familia', [
  ['o', 'Una abuela vive con su hija, su yerno y sus dos nietos. ¿Qué tipo de familia es?', ['Extensa', 'Nuclear', 'Monoparental', 'Unipersonal'], 0, 'Conviven varias generaciones.'],
  ['o', 'Una madre vive sola con sus dos hijos. ¿Qué tipo de familia es?', ['Monoparental', 'Extensa', 'Reconstituida', 'Nuclear'], 0, 'Un solo progenitor con sus hijos.'],
  ['o', 'Una pareja vive con los hijos de uniones anteriores de ambos. ¿Qué tipo de familia es?', ['Reconstituida', 'Extensa', 'Monoparental', 'Unipersonal'], 0, 'También llamada ensamblada.'],
  ['o', '¿Qué instrumento grafica las relaciones de la familia con la escuela, el trabajo y el puesto de salud?', ['Ecomapa', 'Familiograma', 'APGAR familiar', 'Escala de Zarit'], 0, 'El familiograma muestra la estructura en generaciones.'],
  ['o', '¿Qué instrumento evalúa la sobrecarga del cuidador?', ['Escala de Zarit', 'APGAR familiar', 'Escala de Braden', 'Escala de Glasgow'], 0, 'Zarit.'],
  ['o', 'Un APGAR familiar de 8/20 indica…', ['Disfunción familiar severa', 'Buena función familiar', 'Disfunción leve', 'Un recién nacido sano'], 0, '9 o menos: disfunción severa.'],
  ['o', 'La muerte inesperada de un padre joven es una crisis…', ['No normativa', 'Normativa', 'Del desarrollo esperado', 'Sin impacto en la familia'], 0, 'Es inesperada.'],
  ['o', 'Una niña de 12 años cuida a sus hermanos y maneja la casa porque su madre está enferma. ¿Qué fenómeno es?', ['Parentificación', 'Triangulación', 'Sublimación', 'Desligamiento'], 0, 'Asume roles de los padres.'],
  ['o', 'Una familia en la que todos se meten en todo y no hay espacio individual tiene límites…', ['Difusos', 'Rígidos', 'Claros', 'Flexibles'], 0, 'Produce aglutinamiento.'],
  ['o', 'En el familiograma, ¿cómo se representa a una mujer?', ['Con un círculo', 'Con un cuadrado', 'Con un triángulo', 'Con una X'], 0, 'El cuadrado es el hombre; la X, una persona fallecida.'],
  ['v', 'El familiograma suele representar al menos tres generaciones.', true, 'Permite ver patrones familiares.'],
  ['v', 'La llegada del primer hijo es una crisis normativa.', true, 'Es esperable en el ciclo vital.'],
  ['v', 'La escala de Zarit evalúa la funcionalidad familiar.', false, 'Evalúa la sobrecarga del cuidador; la función familiar se valora con el APGAR familiar.'],
  ['v', 'Lo que le pasa a un miembro de la familia puede afectar a todo el sistema familiar.', true, 'La familia es un sistema.'],
  ['v', 'La violencia económica no se considera violencia intrafamiliar.', false, 'Sí lo es: controlar o negar el dinero es una forma de violencia.'],
  ['p', 'Une cada componente del APGAR familiar con su significado', [['Adaptación', 'Uso de recursos ante una crisis'], ['Participación', 'Decisiones compartidas'], ['Gradiente de crecimiento', 'Apoyo para crecer y madurar'], ['Afecto', 'Expresión de cariño'], ['Resolución', 'Compartir tiempo y recursos']]],
  ['p', 'Une cada tipo de límite con su consecuencia', [['Claros', 'Familia funcional'], ['Difusos', 'Aglutinamiento'], ['Rígidos', 'Desligamiento']]],
  ['p', 'Une cada instrumento con lo que evalúa', [['Familiograma', 'Estructura familiar en generaciones'], ['Ecomapa', 'Relaciones con el entorno'], ['APGAR familiar', 'Percepción de la función familiar'], ['Escala de Zarit', 'Sobrecarga del cuidador']]],
  ['s', 'Ordena las etapas del ciclo vital familiar', ['Formación', 'Extensión', 'Contracción', 'Disolución'], 'De la pareja a la disolución.'],
  ['s', 'Ordena las fases de la visita domiciliaria', ['Preparar el objetivo, los materiales y la ruta', 'Presentarse y pedir consentimiento', 'Valorar a la familia y su entorno', 'Intervenir y hacer acuerdos', 'Registrar y programar el seguimiento'], 'Antes, durante y después.']
]);

/* ---------------- Cuidados de Enfermería en Ginecobstetricia (nuevas) ---------------- */
C('gineco', [
  ['Control prenatal', '¿Cómo calculas la fecha probable de parto con la regla de Naegele?', 'Al primer día de la última menstruación le sumas 7 días, le restas 3 meses y le sumas 1 año.', 'Ejemplo: FUM 10 de marzo → FPP 17 de diciembre.', '+7 días, −3 meses.', '', 'pf'],
  ['Control prenatal', '¿Qué valoran las maniobras de Leopold?', '1.ª: qué polo ocupa el fondo uterino; 2.ª: dónde está el dorso fetal; 3.ª: la presentación; 4.ª: el grado de encajamiento.', 'Se hacen desde el tercer trimestre.', 'cuatro maniobras.', '', 'pf'],
  ['Control prenatal', '¿Cómo se diagnostica la diabetes gestacional con la PTOG de 75 g?', 'Entre las semanas 24 y 28, con un solo valor alterado: ayunas ≥ 92, 1 hora ≥ 180 o 2 horas ≥ 153 mg/dL.', 'Si hay factores de riesgo, se tamiza antes.', '92 – 180 – 153.', 'GPC Embarazo y parto (MinSalud)', 'pf'],
  ['Control prenatal', '¿Dónde se palpa el fondo uterino en la semana 20?', 'A nivel del ombligo.', 'Entre las semanas 20 y 32, la altura uterina en centímetros se aproxima a las semanas de gestación.', 'en el ombligo.', '', 'pf'],
  ['Puerperio', '¿Cómo cambian los loquios en el puerperio?', 'Rubra (rojos, primeros 3–4 días), serosos (rosados o marrones, hasta unos 10 días) y alba (blanquecinos, hasta 3–6 semanas).', 'Mal olor, fiebre o sangrado abundante son signos de alarma.', 'rojo, rosado, blanco.', '', 'pf'],
  ['Infecciones', '¿Cómo se trata la sífilis gestacional?', 'Con penicilina benzatínica 2.400.000 UI IM: dosis única si es sífilis temprana, o 3 dosis semanales si es latente tardía o de duración desconocida.', 'Ante una prueba treponémica rápida positiva se aplica la primera dosis de inmediato y se trata también a la pareja.', 'penicilina benzatínica.', 'GPC Sífilis gestacional y congénita (MinSalud)', 'pf'],
  ['Trastornos hipertensivos', '¿Cuál es el esquema de Zuspan de sulfato de magnesio?', 'Impregnación con 4 g IV en 15–20 minutos y mantenimiento de 1 g por hora durante 24 horas.', 'Vigila reflejos, frecuencia respiratoria y diuresis; el antídoto es el gluconato de calcio.', '4 y 1.', '', 'pf'],
  ['Control prenatal', '¿Qué signos de alarma enseñas a la gestante?', 'Sangrado vaginal, salida de líquido, cefalea intensa, visión borrosa, dolor en la boca del estómago, fiebre, disminución de los movimientos fetales, hinchazón de cara y manos, y contracciones antes de tiempo.', 'Ante cualquiera, debe consultar de inmediato.', 'consultar ya.', '', 'pf'],
  ['Preconcepción', '¿Qué dosis de ácido fólico se recomienda para prevenir defectos del tubo neural?', '0,4 mg al día desde antes de concebir hasta la semana 12; 4 mg al día si hubo un hijo con defecto del tubo neural.', 'Por eso se insiste en la consulta preconcepcional.', '0,4 mg.', '', 'pf']
]);
G('gineco', [
  ['c', 'fpp'],
  ['o', '¿Cuántos años protege el implante de levonorgestrel de 2 varillas?', ['5 años', '3 años', '1 año', '10 años'], 0, 'El de etonogestrel de 1 varilla, 3 años.'],
  ['o', '¿Por cuántos años está aprobado el DIU T de cobre 380A?', ['10 años', '3 años', '1 año', '20 años'], 0, 'Según la ficha técnica.'],
  ['o', 'Gestante en la semana 26 con PTOG de 75 g: ayunas 95, 1 hora 170 y 2 horas 140 mg/dL. ¿Qué concluyes?', ['Diabetes gestacional: basta un valor alterado', 'Prueba normal', 'Repetir en 6 meses', 'Prediabetes sin seguimiento'], 0, 'Ayunas ≥ 92 ya es diagnóstico.'],
  ['o', 'La altura uterina a nivel del ombligo corresponde aproximadamente a la semana…', ['20', '12', '28', '36'], 0, 'En la semana 12 apenas sobrepasa la sínfisis.'],
  ['o', 'La tercera maniobra de Leopold identifica…', ['La presentación', 'El dorso fetal', 'El polo del fondo uterino', 'El grado de encajamiento'], 0, 'Qué polo se presenta en la pelvis.'],
  ['o', '¿Cuál es el uterotónico de elección para el manejo activo del alumbramiento?', ['Oxitocina', 'Misoprostol', 'Metilergonovina', 'Sulfato de magnesio'], 0, '10 UI IM inmediatamente después del nacimiento.'],
  ['o', 'Gestante con PA 160/110, cefalea y visión borrosa. ¿Qué medicamento previene las convulsiones?', ['Sulfato de magnesio', 'Diazepam', 'Fenitoína', 'Gluconato de calcio'], 0, 'Esquema de Zuspan.'],
  ['o', 'Puérpera de 5 días con loquios rosados. ¿Qué tipo de loquios son?', ['Serosos', 'Rubra', 'Alba', 'Purulentos'], 0, 'Los rubra son los primeros días.'],
  ['o', 'Gestante con prueba treponémica rápida positiva. ¿Qué haces?', ['Aplicas penicilina benzatínica de inmediato, pides la prueba no treponémica y tratas a la pareja', 'Esperas el parto para tratar', 'Das amoxicilina oral por 3 días', 'Solo tratas a la pareja'], 0, 'Así se previene la sífilis congénita.'],
  ['v', 'Para calcular la FPP con Naegele se suman 7 días a la FUM y se restan 3 meses.', true, 'Y se ajusta el año.'],
  ['v', 'En la PTOG de 75 g se necesitan dos valores alterados para diagnosticar diabetes gestacional.', false, 'Basta uno.'],
  ['v', 'Los loquios alba son los primeros que aparecen después del parto.', false, 'Los primeros son los rubra.'],
  ['v', 'La pareja de una gestante con sífilis también debe recibir tratamiento.', true, 'Si no, ella se reinfecta.'],
  ['v', 'El implante subdérmico protege contra las infecciones de transmisión sexual.', false, 'Solo el condón da doble protección.'],
  ['p', 'Une cada maniobra de Leopold con lo que valora', [['Primera', 'Polo fetal en el fondo uterino'], ['Segunda', 'Ubicación del dorso fetal'], ['Tercera', 'Presentación'], ['Cuarta', 'Grado de encajamiento']]],
  ['p', 'Une cada tipo de loquios con su característica', [['Rubra', 'Rojos, primeros 3–4 días'], ['Serosos', 'Rosados o marrones, hasta unos 10 días'], ['Alba', 'Blanquecinos, hasta 3–6 semanas']]],
  ['p', 'Une cada método con su duración o frecuencia', [['Implante de levonorgestrel (2 varillas)', '5 años'], ['Implante de etonogestrel (1 varilla)', '3 años'], ['DIU T de cobre 380A', '10 años'], ['Medroxiprogesterona de depósito', 'Cada 3 meses']]],
  ['s', 'Ordena los periodos del trabajo de parto', ['Dilatación', 'Expulsivo', 'Alumbramiento'], 'El alumbramiento es la salida de la placenta.'],
  ['s', 'Ordena el cálculo de la FPP con la regla de Naegele', ['Identificar el primer día de la última menstruación', 'Sumar 7 días', 'Restar 3 meses', 'Ajustar el año'], 'FUM + 7 días − 3 meses + 1 año.']
]);

/* ---------------- Factores de Riesgo I (cardiovascular y metabólico) ---------------- */
C('fr1', [
  ['Antropometría', '¿Cómo se calcula el índice de masa corporal (IMC)?', 'Peso en kilogramos dividido por la talla en metros al cuadrado.', 'Ejemplo: 70 kg ÷ (1,65 × 1,65) = 25,7.', 'kg/m².'],
  ['Antropometría', '¿Cómo clasifica la OMS el IMC del adulto?', 'Menos de 18,5 bajo peso; 18,5–24,9 normal; 25–29,9 sobrepeso; 30 o más obesidad (I: 30–34,9; II: 35–39,9; III: 40 o más).', 'En niños se usan las curvas de crecimiento, no estos puntos de corte.', '25 y 30.', 'OMS'],
  ['Antropometría', '¿Qué perímetro abdominal indica riesgo cardiometabólico?', 'Según la OMS: riesgo aumentado con más de 94 cm en hombres y 80 cm en mujeres; sustancialmente aumentado con más de 102 y 88 cm.', 'Algunas guías para población latinoamericana usan 90 cm en hombres y 80 cm en mujeres.', 'grasa en la barriga.', 'OMS'],
  ['Antropometría', '¿Por qué preocupa la grasa visceral?', 'Porque la grasa dentro del abdomen se asocia más a resistencia a la insulina, diabetes y enfermedad cardiovascular que la grasa subcutánea.', 'Se estima con el perímetro abdominal.', 'la de adentro.'],
  ['Actividad física', '¿Cuánta actividad física recomienda la OMS a los adultos?', 'Entre 150 y 300 minutos a la semana de actividad moderada (o 75–150 de vigorosa), más fortalecimiento muscular al menos 2 días.', 'Cualquier actividad es mejor que ninguna.', '150 minutos.', 'OMS – Directrices de actividad física 2020'],
  ['Tabaco', '¿Cómo se calcula el índice paquetes-año?', '(Cigarrillos al día ÷ 20) × años fumando.', 'Más de 10 paquetes-año aumenta claramente el riesgo de EPOC.', 'un paquete trae 20.'],
  ['Tabaco', '¿Qué beneficio cardiovascular trae dejar de fumar?', 'Al año de dejarlo, el riesgo de enfermedad coronaria se reduce aproximadamente a la mitad.', 'Nunca es tarde para dejarlo.', 'al año, la mitad.'],
  ['Tabaco', '¿Qué son las 5 A de la consejería breve para dejar de fumar?', 'Averiguar si fuma, aconsejar dejarlo, evaluar la disposición, ayudar con un plan y acordar el seguimiento.', 'Se puede hacer en pocos minutos en cualquier consulta.', 'cinco pasos.'],
  ['Alcohol', '¿Qué es el AUDIT?', 'Un cuestionario de 10 preguntas de la OMS para identificar el consumo de riesgo, el consumo perjudicial y la dependencia del alcohol.', 'Su versión corta (AUDIT-C) tiene 3 preguntas.', 'diez preguntas.', 'OMS'],
  ['Alimentación', '¿Cuánto azúcar libre recomienda la OMS como máximo?', 'Menos del 10 % de la energía diaria (idealmente menos del 5 %).', 'Una gaseosa puede traer más de lo recomendado para todo el día.', 'menos de 10 %.', 'OMS'],
  ['Alimentación', '¿Cuántas frutas y verduras recomienda la OMS al día?', 'Al menos 400 g, que equivalen a unas 5 porciones.', 'Ayudan a prevenir enfermedades cardiovasculares y algunos cánceres.', 'cinco al día.', 'OMS'],
  ['Alimentación', '¿Qué indican los sellos negros octagonales en los alimentos en Colombia?', 'Que el producto tiene exceso de azúcares, sodio, grasas saturadas o grasas trans, o que contiene edulcorantes.', 'Enséñale a la comunidad a preferir productos con menos sellos.', 'octágonos negros.', 'Ley 2120 de 2021; Res. 810 de 2021 modificada por la Res. 2492 de 2022'],
  ['Diabetes', '¿Qué es el FINDRISC?', 'Una escala que estima el riesgo de desarrollar diabetes tipo 2 en los próximos 10 años.', 'En las guías colombianas, un puntaje de 12 o más indica medir la glucemia.', 'riesgo de diabetes.', 'GPC Diabetes tipo 2 (MinSalud)'],
  ['Diabetes', '¿Qué valores definen la prediabetes?', 'Glucemia en ayunas de 100 a 125 mg/dL o HbA1c de 5,7 a 6,4 %.', 'Con cambios en el estilo de vida se puede evitar o retrasar la diabetes.', '100 a 125.', 'ADA – Standards of Care'],
  ['Conceptos', '¿Qué diferencia hay entre factores de riesgo modificables y no modificables?', 'Los modificables se pueden cambiar (tabaquismo, sedentarismo, dieta, obesidad, hipertensión, dislipidemia, diabetes, alcohol); los no modificables no (edad, sexo, antecedentes familiares).', 'La intervención se enfoca en los modificables.', 'lo que se puede cambiar.'],
  ['Riesgo cardiovascular', '¿Qué estima la escala de Framingham?', 'El riesgo de presentar un evento cardiovascular en los próximos 10 años.', 'En Colombia se usa calibrada para la población del país.', 'riesgo a 10 años.'],
  ['Riesgo cardiovascular', '¿Qué criterios definen el síndrome metabólico?', 'Tres o más de: perímetro abdominal aumentado, triglicéridos ≥ 150 mg/dL, HDL bajo (< 40 en hombres, < 50 en mujeres), PA ≥ 130/85 mmHg y glucemia en ayunas ≥ 100 mg/dL.', 'Aumenta el riesgo de diabetes y enfermedad cardiovascular.', 'tres de cinco.'],
  ['Lípidos', '¿Por qué el LDL es el principal objetivo en las dislipidemias?', 'Porque es la lipoproteína que más se asocia con la aterosclerosis y los eventos cardiovasculares.', 'La meta de LDL depende del riesgo cardiovascular de cada paciente.', 'el "malo".'],
  ['Hipertensión', '¿Qué cambios en el estilo de vida bajan la presión arterial?', 'Reducir la sal, seguir una dieta tipo DASH (frutas, verduras y lácteos bajos en grasa), hacer actividad física, bajar de peso, moderar el alcohol y no fumar.', 'Acompañan al tratamiento farmacológico, no lo reemplazan cuando está indicado.', 'menos sal, más movimiento.', '', 'hta'],
  ['Consejería', '¿Qué es la entrevista motivacional?', 'Un estilo de conversación colaborativo que fortalece la motivación de la persona para cambiar: expresar empatía, desarrollar la discrepancia, no confrontar y apoyar la autoeficacia.', 'La persona encuentra sus propias razones para cambiar.', 'sin regaños.']
]);
G('fr1', [
  ['c', 'imc'],
  ['o', 'Mujer con perímetro abdominal de 92 cm. Según la OMS, su riesgo cardiometabólico está…', ['Sustancialmente aumentado', 'Normal', 'Disminuido', 'Sin valorar'], 0, 'Más de 88 cm en mujeres.'],
  ['o', 'Un paciente fuma 10 cigarrillos al día desde hace 20 años. ¿Cuántos paquetes-año tiene?', ['10', '20', '200', '2'], 0, '(10 ÷ 20) × 20 = 10.'],
  ['o', '¿Cuánta actividad física moderada recomienda la OMS a los adultos?', ['150–300 minutos a la semana', '30 minutos al mes', '10 minutos a la semana', 'Solo los fines de semana'], 0, 'Más fortalecimiento muscular 2 días.'],
  ['o', '¿Qué instrumento identifica el consumo de riesgo de alcohol?', ['AUDIT', 'FINDRISC', 'Braden', 'Zarit'], 0, '10 preguntas de la OMS.'],
  ['o', '¿Qué escala estima el riesgo de desarrollar diabetes tipo 2?', ['FINDRISC', 'AUDIT', 'Framingham', 'Glasgow'], 0, 'Riesgo a 10 años.'],
  ['o', '¿Cuál de estos factores de riesgo no se puede modificar?', ['La edad', 'El tabaquismo', 'El sedentarismo', 'La obesidad'], 0, 'Los demás sí se pueden cambiar.'],
  ['o', 'Glucemia en ayunas de 110 mg/dL. ¿Cómo se clasifica?', ['Prediabetes (glucemia alterada en ayunas)', 'Normal', 'Diabetes', 'Hipoglucemia'], 0, '100 a 125 mg/dL.'],
  ['o', '¿Qué medida ayuda a bajar la presión arterial?', ['Reducir la sal y seguir una dieta tipo DASH', 'Comer más embutidos', 'Dejar el ejercicio', 'Tomar más bebidas azucaradas'], 0, 'Estilo de vida saludable.'],
  ['o', 'Según la OMS, los azúcares libres deben aportar menos del…', ['10 % de la energía diaria', '50 % de la energía diaria', '30 % de la energía diaria', '25 % de la energía diaria'], 0, 'Idealmente menos del 5 %.'],
  ['v', 'Un IMC de 27 corresponde a sobrepeso.', true, '25 a 29,9.'],
  ['v', 'La grasa visceral tiene menos riesgo que la subcutánea.', false, 'Tiene más riesgo metabólico.'],
  ['v', 'En la entrevista motivacional se confronta al paciente para que cambie.', false, 'Se evita la confrontación.'],
  ['v', 'Al año de dejar de fumar, el riesgo de enfermedad coronaria se reduce aproximadamente a la mitad.', true, 'Nunca es tarde.'],
  ['v', 'Los sellos negros octagonales advierten exceso de nutrientes críticos.', true, 'Azúcares, sodio y grasas.'],
  ['p', 'Une cada IMC con su clasificación', [['17', 'Bajo peso'], ['22', 'Normal'], ['27', 'Sobrepeso'], ['32', 'Obesidad']]],
  ['p', 'Une cada escala con su uso', [['FINDRISC', 'Riesgo de diabetes tipo 2'], ['AUDIT', 'Consumo de riesgo de alcohol'], ['Framingham', 'Riesgo cardiovascular a 10 años'], ['Índice paquetes-año', 'Exposición al tabaco']]],
  ['p', 'Une cada criterio del síndrome metabólico con su punto de corte', [['Triglicéridos', '≥ 150 mg/dL'], ['Presión arterial', '≥ 130/85 mmHg'], ['Glucemia en ayunas', '≥ 100 mg/dL'], ['HDL en mujeres', '< 50 mg/dL']]],
  ['s', 'Ordena las 5 A de la consejería breve para dejar de fumar', ['Averiguar si fuma', 'Aconsejar dejarlo', 'Evaluar la disposición', 'Ayudar con un plan', 'Acordar el seguimiento'], 'Se puede hacer en pocos minutos.'],
  ['s', 'Ordena las categorías del IMC de menor a mayor', ['Bajo peso', 'Normal', 'Sobrepeso', 'Obesidad grado I', 'Obesidad grado II', 'Obesidad grado III'], 'Puntos de corte: 18,5 – 25 – 30 – 35 – 40.']
]);

/* ---------------- Fisiopatología II ---------------- */
C('fisio2', [
  ['Diabetes', '¿Qué diferencia hay entre la diabetes tipo 1 y la tipo 2?', 'La tipo 1 es autoinmune, destruye las células β y causa déficit absoluto de insulina (suele iniciar en jóvenes, con tendencia a cetoacidosis); la tipo 2 combina resistencia a la insulina y déficit relativo, y se asocia a obesidad.', 'La tipo 2 es la más frecuente.', 'falta total vs. resistencia.'],
  ['Diabetes', '¿Cuáles son las complicaciones crónicas de la diabetes?', 'Microvasculares: retinopatía, nefropatía y neuropatía. Macrovasculares: infarto, ACV y enfermedad arterial periférica.', 'El buen control glucémico y de la presión las previene.', 'vasos pequeños y grandes.'],
  ['Diabetes', '¿Qué es el estado hiperosmolar hiperglucémico?', 'Una complicación aguda, típica de la diabetes tipo 2, con glucemia muy alta (a menudo > 600 mg/dL), deshidratación grave y alteración de la conciencia, sin cetoacidosis importante.', 'Es más frecuente en adultos mayores.', 'deshidratación extrema.'],
  ['Cardiovascular', '¿Qué es la aterosclerosis?', 'La formación de placas de lípidos y células inflamatorias en la pared de las arterias, que las estrechan y pueden romperse y formar trombos.', 'Es la base del infarto y del ACV isquémico.', 'placas en las arterias.'],
  ['Cardiovascular', '¿Qué ocurre en un infarto agudo de miocardio?', 'Una arteria coronaria se ocluye, casi siempre por un trombo sobre una placa rota, y el músculo cardiaco se necrosa por falta de oxígeno.', 'Dolor opresivo de más de 20 minutos, sudoración y náuseas; se confirma con ECG y troponinas.', 'trombo coronario.'],
  ['Cardiovascular', '¿Qué diferencia hay entre la falla cardiaca izquierda y la derecha?', 'La izquierda congestiona los pulmones (disnea, ortopnea, crépitos); la derecha congestiona la circulación sistémica (edema en piernas, ingurgitación yugular, hepatomegalia).', 'La causa más común de falla derecha es la falla izquierda.', 'pulmón vs. cuerpo.'],
  ['Respiratorio', '¿Qué es la EPOC y cuáles son sus causas principales?', 'Una limitación crónica y poco reversible del flujo de aire; sus causas principales son el tabaco y el humo de leña.', 'En el campo, pregunta siempre si cocina o cocinó con leña.', 'humo.'],
  ['Respiratorio', '¿Qué caracteriza al asma?', 'Inflamación crónica de la vía aérea con broncoconstricción reversible: sibilancias, tos nocturna y disnea ante desencadenantes.', 'Desencadenantes: alérgenos, infecciones, ejercicio y humo.', 'reversible.'],
  ['Respiratorio', '¿Qué es la neumonía y cómo se manifiesta?', 'Una infección del parénquima pulmonar con fiebre, tos, expectoración, disnea y crépitos.', 'En el adulto mayor puede manifestarse solo con confusión.', 'infección del alvéolo.'],
  ['Respiratorio', '¿Qué evalúa el CURB-65?', 'La gravedad de la neumonía: Confusión, Urea elevada, frecuencia Respiratoria ≥ 30, presión arterial Baja (PAS < 90 o PAD ≤ 60) y edad ≥ 65 años.', 'A más puntos, más gravedad y necesidad de hospitalizar.', 'cinco criterios.'],
  ['Renal', '¿Qué es la lesión renal aguda y cuáles son sus causas?', 'Una caída rápida de la función renal (sube la creatinina o baja la diuresis); sus causas son prerrenales (deshidratación, hipotensión), renales (tóxicos, infecciones) o posrenales (obstrucción).', 'La prerrenal es la más frecuente y se previene hidratando.', 'antes, dentro o después del riñón.'],
  ['Renal', '¿Qué es la enfermedad renal crónica y cuáles son sus principales causas?', 'Una tasa de filtración glomerular < 60 ml/min/1,73 m² o marcadores de daño renal durante más de 3 meses; sus principales causas son la diabetes y la hipertensión.', 'Evita los AINE en estos pacientes.', 'más de tres meses.'],
  ['Renal', '¿Qué diferencia hay entre el síndrome nefrótico y el nefrítico?', 'Nefrótico: proteinuria masiva (> 3,5 g/día), hipoalbuminemia, edema e hiperlipidemia. Nefrítico: hematuria, hipertensión, oliguria y edema leve.', 'El nefrítico puede aparecer tras una infección por estreptococo.', 'proteínas vs. sangre.'],
  ['Hígado', '¿Qué complicaciones tiene la cirrosis?', 'Ascitis, várices esofágicas que pueden sangrar, encefalopatía hepática, ictericia y alteraciones de la coagulación.', 'Causas: alcohol, hepatitis virales e hígado graso.', 'hígado cicatrizado.'],
  ['Neurología', '¿Qué diferencia hay entre el ACV isquémico y el hemorrágico?', 'El isquémico (el más frecuente, cerca del 85 %) se debe a la obstrucción de una arteria; el hemorrágico, a la ruptura de un vaso, a menudo por hipertensión.', 'Solo una imagen cerebral los diferencia con certeza.', 'tapón vs. ruptura.'],
  ['Endocrino', '¿Cómo se manifiesta el hipotiroidismo?', 'Cansancio, intolerancia al frío, aumento de peso, estreñimiento, piel seca y bradicardia; en el primario, la TSH está alta y la T4 libre baja.', 'En el recién nacido se tamiza con la TSH neonatal.', 'todo va lento.'],
  ['Hematología', '¿Qué caracteriza a la anemia ferropénica?', 'Es microcítica e hipocrómica, con ferritina baja; se debe a sangrado, dieta pobre en hierro o parásitos intestinales.', 'En zonas rurales, piensa en parasitosis y desparasita según las guías.', 'glóbulos pequeños y pálidos.'],
  ['Digestivo', '¿Qué papel tiene Helicobacter pylori?', 'Es la principal causa de úlcera péptica y un factor de riesgo de cáncer gástrico.', 'La otra gran causa de úlcera son los AINE.', 'una bacteria del estómago.'],
  ['Hipertensión', '¿Qué órganos daña la hipertensión arterial?', 'Corazón (hipertrofia y falla cardiaca), cerebro (ACV), riñón (enfermedad renal crónica), retina (retinopatía) y arterias.', 'Se les llama órganos blanco.', 'cinco órganos blanco.', '', 'hta'],
  ['Infecciosas', '¿Cómo se comporta la tuberculosis en el organismo?', 'Mycobacterium tuberculosis llega al pulmón por vía aérea y forma granulomas; puede quedar latente o causar enfermedad con tos crónica, fiebre, sudoración nocturna y pérdida de peso.', 'El VIH, la diabetes y la desnutrición favorecen que la infección latente se active.', 'granulomas.'],
  ['Endocrino', '¿Qué es el síndrome de Cushing?', 'El exceso de cortisol: obesidad central, cara de luna llena, giba, estrías violáceas, hiperglucemia e hipertensión.', 'La causa más común es el uso prolongado de corticoides.', 'cara de luna llena.']
]);
G('fisio2', [
  ['o', 'Paciente de 14 años con pérdida de peso, poliuria y cetoacidosis. ¿Qué tipo de diabetes es más probable?', ['Tipo 1', 'Tipo 2', 'Gestacional', 'Prediabetes'], 0, 'Déficit absoluto de insulina.'],
  ['o', 'Paciente con ortopnea, crépitos y disnea. ¿Qué tipo de falla cardiaca predomina?', ['Izquierda', 'Derecha', 'Ninguna', 'Hepática'], 0, 'Congestión pulmonar.'],
  ['o', 'Paciente con edema en las piernas, ingurgitación yugular y hepatomegalia. ¿Qué falla predomina?', ['Derecha', 'Izquierda', 'Respiratoria', 'Renal'], 0, 'Congestión sistémica.'],
  ['o', 'Mujer campesina no fumadora, con tos crónica y disnea progresiva, que cocinó con leña toda su vida. ¿Qué sospechas?', ['EPOC por humo de leña', 'Asma infantil', 'Neumonía aguda', 'Falla renal'], 0, 'El humo de leña es una causa importante de EPOC.'],
  ['o', '¿Cuáles son las dos principales causas de enfermedad renal crónica?', ['Diabetes e hipertensión', 'Infección urinaria y cálculos', 'Gripa y anemia', 'Asma y EPOC'], 0, 'Por eso se controlan desde la consulta de crónicos.'],
  ['o', 'Paciente con cirrosis y aumento del perímetro abdominal con onda líquida. ¿Qué complicación tiene?', ['Ascitis', 'Encefalopatía', 'Várices esofágicas', 'Ictericia'], 0, 'Líquido en la cavidad peritoneal.'],
  ['o', 'TSH alta y T4 libre baja indican…', ['Hipotiroidismo primario', 'Hipertiroidismo', 'Función tiroidea normal', 'Diabetes'], 0, 'La hipófisis estimula una tiroides que no responde.'],
  ['o', 'Anemia microcítica e hipocrómica con ferritina baja. ¿Qué tipo de anemia es?', ['Ferropénica', 'Megaloblástica', 'Hemolítica', 'Aplásica'], 0, 'Déficit de hierro.'],
  ['o', '¿Qué bacteria es la principal causa de úlcera péptica?', ['Helicobacter pylori', 'Escherichia coli', 'Staphylococcus aureus', 'Mycobacterium tuberculosis'], 0, 'También aumenta el riesgo de cáncer gástrico.'],
  ['o', 'Paciente con proteinuria masiva, albúmina baja y edema generalizado. ¿Qué síndrome es?', ['Nefrótico', 'Nefrítico', 'Cushing', 'Metabólico'], 0, 'Se pierden proteínas por la orina.'],
  ['v', 'La retinopatía diabética es una complicación microvascular.', true, 'Junto con la nefropatía y la neuropatía.'],
  ['v', 'El ACV hemorrágico es más frecuente que el isquémico.', false, 'El isquémico es cerca del 85 %.'],
  ['v', 'El estado hiperosmolar hiperglucémico es más típico de la diabetes tipo 2.', true, 'Sobre todo en adultos mayores.'],
  ['v', 'El uso prolongado de corticoides puede producir síndrome de Cushing.', true, 'Es la causa más común.'],
  ['v', 'En el asma la obstrucción bronquial es irreversible.', false, 'Es reversible; en la EPOC es poco reversible.'],
  ['p', 'Une cada órgano blanco de la hipertensión con su daño', [['Corazón', 'Hipertrofia ventricular y falla cardiaca'], ['Cerebro', 'ACV'], ['Riñón', 'Enfermedad renal crónica'], ['Retina', 'Retinopatía hipertensiva']]],
  ['p', 'Une cada enfermedad con su hallazgo típico', [['Hipotiroidismo', 'Intolerancia al frío y TSH alta'], ['Síndrome de Cushing', 'Cara de luna llena y estrías violáceas'], ['Cirrosis', 'Ascitis y várices esofágicas'], ['Tuberculosis', 'Tos crónica y sudoración nocturna']]],
  ['p', 'Une cada letra del CURB-65 con su criterio', [['C', 'Confusión'], ['U', 'Urea elevada'], ['R', 'Frecuencia respiratoria ≥ 30'], ['B', 'Presión arterial baja'], ['65', 'Edad de 65 años o más']]],
  ['s', 'Ordena la formación de la placa de ateroma', ['Daño del endotelio', 'Entrada y oxidación del LDL en la pared', 'Formación de células espumosas', 'Crecimiento de la placa fibrosa', 'Ruptura de la placa y trombosis'], 'La ruptura causa el infarto o el ACV.'],
  ['s', 'Ordena la fisiopatología de la cetoacidosis diabética', ['Déficit de insulina', 'La glucosa no entra a las células', 'Lipólisis y producción de cuerpos cetónicos', 'Acidosis metabólica', 'Respiración de Kussmaul para eliminar CO₂'], 'El pulmón intenta compensar la acidosis.']
]);
