/* =========================================================
   Ruta Rural · Videos
   Versión 1: búsquedas guiadas en YouTube (siempre funcionan) y canales.
   En próximas tandas se reemplazan por videos específicos revisados uno a uno.
   ========================================================= */
function yt(q) { return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q); }

window.RR_CANALES = [
  { nombre: 'SalusPlay', foco: 'Farmacología y temas generales de salud', url: 'https://www.youtube.com/user/prescripcionenfermer', lang: 'ES' },
  { nombre: 'El enfermero del pendiente', foco: 'Técnicas y procedimientos (canalización, cuidado crítico)', url: yt('El enfermero del pendiente'), lang: 'ES' },
  { nombre: 'Javi Matrón Academy', foco: 'Ginecología y obstetricia en formato de preguntas', url: yt('Javi Matrón Academy'), lang: 'ES' },
  { nombre: 'Enfermero Jorge Ángel', foco: 'Videos cortos: medicación, salud sexual, primeros auxilios', url: yt('Enfermero Jorge Ángel'), lang: 'ES' },
  { nombre: 'EBEVIDENCIA', foco: 'Enfermería basada en la evidencia', url: yt('EBEVIDENCIA enfermería'), lang: 'ES' },
  { nombre: 'Canal Enfermero', foco: 'Consejo General de Enfermería (España)', url: yt('Canal Enfermero Consejo General de Enfermería'), lang: 'ES' },
  { nombre: 'Level Up RN', foco: 'Farmacología, médico-quirúrgico, maternidad', url: yt('Level Up RN'), lang: 'EN' },
  { nombre: 'RegisteredNurseRN', foco: 'Explicaciones detalladas de temas de enfermería', url: yt('RegisteredNurseRN'), lang: 'EN' }
];

window.RR_VIDEOS = [
  { m: 'pf', titulo: 'Inserción y retiro de implante subdérmico', url: yt('inserción implante subdérmico procedimiento enfermería') },
  { m: 'pf', titulo: 'Toma de citología cervicouterina', url: yt('toma de citología cervicouterina técnica paso a paso') },
  { m: 'pf', titulo: 'Criterios de elegibilidad de la OMS', url: yt('criterios médicos de elegibilidad OMS anticonceptivos explicación') },
  { m: 'pf', titulo: 'Partograma explicado', url: yt('partograma explicación enfermería') },
  { m: 'pf', titulo: 'Manejo activo del alumbramiento', url: yt('manejo activo del tercer periodo del parto alumbramiento') },
  { m: 'pf', titulo: 'Ruta materno perinatal (Res. 3280)', url: yt('ruta materno perinatal resolución 3280 explicación') },
  { m: 'proc', titulo: 'Cistoirrigación continua', url: yt('cistoirrigación continua cuidados de enfermería') },
  { m: 'proc', titulo: 'Técnica de glucometría', url: yt('glucometría técnica correcta enfermería') },
  { m: 'proc', titulo: 'Cálculo de goteo', url: yt('cálculo de goteo enfermería macrogoteo microgoteo ejercicios') },
  { m: 'hta', titulo: 'Toma correcta de la presión arterial', url: yt('técnica correcta toma de presión arterial enfermería') },
  { m: 'hta', titulo: 'Antihipertensivos para enfermería', url: yt('antihipertensivos farmacología enfermería') },
  { m: 'bal', titulo: 'Balance de líquidos con ejercicios', url: yt('balance de líquidos enfermería ejercicio resuelto') },
  { m: 'elec', titulo: 'Potasio y cambios en el ECG', url: yt('hiperpotasemia hipopotasemia electrocardiograma enfermería') },
  { m: 'elec', titulo: 'Trastornos del sodio', url: yt('hiponatremia hipernatremia enfermería explicación') },
  { m: 'fund', titulo: 'Signos vitales', url: yt('toma de signos vitales enfermería técnica') },
  { m: 'farma', titulo: 'Sulfato de magnesio en preeclampsia', url: yt('sulfato de magnesio preeclampsia cuidados de enfermería') }
];
