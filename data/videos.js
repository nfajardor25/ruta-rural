/* =========================================================
   Ruta Rural · Videos por materia
   Videos de YouTube encontrados por búsqueda (la mayoría en español).
   Formato: [título, idDeYouTube] o [título, id, 'EN'] si está en inglés.
   RR_BUSCAR: búsqueda guiada para encontrar más videos de cada materia.
   ========================================================= */
window.RR_VIDEOS = {
  bioetica: [['Los 4 principios de la bioética','pLCQhbFrW7U'], ['¿Qué es la bioética? (fácil)','BBxyLQzQamc'], ['Principios bioéticos fundamentales','SpvqQ-3s1u4']],
  bioq1: [['Las biomoléculas explicadas fácil','I9-zScGWBZE'], ['Biomoléculas: carbohidratos, lípidos, proteínas y ácidos nucleicos','ZMtEPuT_KFk'], ['Biomoléculas (Amoeba Sisters en español)','gk9WmmRWgxA']],
  morfo1: [['Generalidades del sistema nervioso','plreXXuWsLw'], ['Sinapsis y funcionamiento de las neuronas','FwAqAaJ4gPs'], ['Sinapsis química y eléctrica (Fisiología fácil)','TNxwcPvXvN8']],
  psicog: [['Erikson: las 8 etapas del desarrollo psicosocial','LfHguJI9sTc'], ['8 etapas del desarrollo de Erik Erikson','C8TBqpu4T2I'], ['Etapas del desarrollo: Freud, Piaget y Erikson','5a-5-7DcNF4']],
  socio: [['Enfermería transcultural: teoría de Leininger resumida','32M7O6CX5mM'], ['Madeleine Leininger: modelo transcultural','42ctHQ1-CeQ']],
  aps1: [['Declaración de Alma-Ata (1978)','IRxEhAdwDDo'], ['Historia natural de la enfermedad (fácil)','cKgBpKBdZ-c'], ['¿Qué son los niveles de prevención?','oHxuZ1zxvPc']],
  bioest: [['Medidas de tendencia central súper fácil','KFB5mWICDeQ'], ['Media, mediana y moda','sML3-KoBnTQ'], ['Estadística: medidas de tendencia central','06w-VkGCuCA']],
  bioq2: [['Respiración celular: glucólisis, Krebs y cadena de electrones','1HRuFK2OjMs'], ['Glucólisis y ciclo de Krebs ¡fácil y rápido!','H4kP1LQDZKE'], ['Ciclo de Krebs paso a paso','C8440-oGryU']],
  morfo2: [['Ciclo cardíaco: explicación fácil','NlAAhU1xDcM'], ['Sistema de conducción del corazón (explicación fácil)','_N8Yy_SjE10'], ['Sistema eléctrico del corazón','Zk_zE_bRHLw']],
  psicop: [['Ello, yo y superyó de Freud, con ejemplos','Nw6QmykNWDo'], ['Mecanismos de defensa: 10 estrategias','ZS-PGmWukyo'], ['¿Qué son los mecanismos de defensa del yo?','sqEAJNEJfW0']],
  segsoc: [['El Sistema General de Seguridad Social en Salud (SGSSS)','xZ45N02yy9Y'], ['Sistema de salud colombiano: regímenes','z91giRwDma4'], ['Sistema de salud en Colombia, te lo explico','ZIV-jnzIr4I']],
  aps2: [['Generalidades y principios de las RIAS','OQ8PuL4ft1U'], ['Resolución 3280 de 2018','u3gehbnYREk'], ['Primera infancia en la Resolución 3280','yLnk3lQRymw']],
  epi: [['Incidencia vs prevalencia','RiHO_mAZB94'], ['Medidas de frecuencia y asociación','VdBoGha-DsE'], ['Incidencia y prevalencia: medidas de frecuencia','ZWmUeAPJ7RI']],
  farma: [['¿Qué es la farmacocinética?','yWjjSLbf8C0'], ['ADME explicado fácil','R8fUkbOmNkQ'], ['Ángulos y vías de administración de medicamentos','aIHMnmWWNtE'], ['Pharmacokinetics (Level Up RN, inglés)','HhlT8RJaQEY','EN']],
  cuidado: [['Las 5 etapas del PAE (fácil)','y70B5GOyoNA'], ['Control de signos vitales','N2S11TosdAk'], ['Procedimientos básicos en enfermería','Ykl8HBm0-mE']],
  psicos: [['El experimento de Asch: influencia de la mayoría','wt9i7ZiMed8'], ['Experimento de conformidad de Asch','jwsXnaamHeo'], ['El experimento de Milgram: obediencia a la autoridad','qHKhLZI2Fg0']],
  mental: [['Curso de enfermería en psiquiatría y salud mental (parte 1)','U4Vg5ilzFSE'], ['Plan de cuidado de enfermería en salud mental','8sMMQEEfOI0'], ['El papel de la enfermería en salud mental','RH7H3AkikdM']],
  medicas: [['Cuidados de enfermería en diabetes tipo 2 e insulinoterapia','RYkyr4_AAZs'], ['Cuidados del paciente con diabetes','__VO9mGuBZI'], ['Consulta de enfermería en insuficiencia cardiaca','dIAnWK5otIg']],
  fisio1: [['Tipos de shock: fisiopatología','qdKFv9_nCFg'], ['Fisiopatología del shock','-UBZpvqC4EY'], ['Inflamación aguda y sus patrones','hPLb2liJS2w']],
  familia: [['Generalidades del familiograma','t-a1xDWAwIQ'], ['APGAR familiar','IWORSiuNDSI'], ['Ecomapa familiar y APGAR familiar','qQIwXiHkYKs'], ['Instrumentos de evaluación familiar','FAnm5XDuqHw']],
  gineco: [['Maniobras de Leopold y estática fetal','80pCazlbvGU'], ['Maniobras de Leopold (Edublog Enfermería)','WSYKkN0rxBI'], ['Ruta materno perinatal (Res. 3280) – video 1','u_g-TZxvhaE'], ['Ruta materno perinatal: parto, puerperio y emergencias','yjYzmgHsh4g'], ['Parto de urgencia (U. de Valparaíso)','TDlOmCLmINg']],
  fr1: [['Riesgo cardiovascular: señales de alerta','9Qr97OudwFw'], ['Factores de riesgo cardiovascular: obesidad (TRAPS)','kCkBXRwkvFI'], ['El sobrepeso, la obesidad y el IMC','gcVg_Ua5Qy4']],
  fisio2: [['Diabetes mellitus tipo 1 y 2, fisiopatología y cetoacidosis','PPbrfPs53vM'], ['Fisiopatología de la diabetes tipo 1 y 2','uXTE5VXvQDU'], ['¿Qué es la insuficiencia cardiaca?','4i_CoWEFf98']],
  pedia: [['Signos generales de peligro en niños (AIEPI)','B28GP-uHAzQ'], ['Deshidratación y rehidratación en niños','Leku_YjP5RU'], ['Enfermería pediátrica: planes de hidratación','FjUVmOivKmY'], ['Fiebre en la estrategia AIEPI','uq65pRAor7o']],
  fr2: [['Signos de alarma del dengue','2XrzZC2SVWE'], ['Dengue con signos de alarma: ¿qué hace el equipo de salud? (OPS)','NJvmrVqfCv4'], ['Manejo del accidente ofídico (parte I)','yvtIU8sh_Ws'], ['Mordedura de serpiente: ¿qué hacer?','HrWBBUh4kiE']],
  quirur: [['Lista de verificación de cirugía segura de la OMS','_Z0AAEO6g5g'], ['¿Cómo hacer el check-list de cirugía segura?','hU-rxB9CUxw'], ['Cirugía segura: lista de verificación','WOgxNnmQJw4'], ['Cuidados de enfermería en el posoperatorio inmediato','8kFREeIlkno'], ['Atención de enfermería en el posoperatorio inmediato','bVu57ikdSX8']],
  calidad: [['Política de Seguridad del Paciente en Colombia','ttPALfqUiRw'], ['Seguridad del paciente y Protocolo de Londres','YQUfV73cTzA'], ['Protocolo de Londres','8zxdjgk7xEA']],
  critico: [['RCP en adultos: guías AHA 2020','bJZ06BCwICE'], ['RCP básico (Escuela de Enfermería, U. Andrés Bello)','dFSiqFTuQxU'], ['Interpretación de gasometría arterial con casos clínicos','hI-8e8T1DIk'], ['Gasometría arterial con ejercicios','zsEpOFQdBGM']]
};

window.RR_BUSCAR = {
  bioetica: 'bioética en enfermería principios',
  bioq1: 'bioquímica biomoléculas explicación',
  morfo1: 'morfofisiología humana clase',
  psicog: 'psicología del desarrollo Piaget Erikson',
  socio: 'socioantropología de la salud interculturalidad',
  aps1: 'atención primaria en salud Alma-Ata explicación',
  bioest: 'bioestadística ciencias de la salud',
  bioq2: 'metabolismo glucólisis ciclo de Krebs explicación',
  morfo2: 'fisiología cardiovascular renal respiratoria',
  psicop: 'teorías de la personalidad psicología',
  segsoc: 'sistema de salud colombiano Ley 100 explicación',
  aps2: 'Resolución 3280 rutas integrales de atención en salud',
  epi: 'epidemiología incidencia prevalencia explicación',
  farma: 'farmacología para enfermería',
  cuidado: 'proceso de atención de enfermería NANDA NIC NOC',
  psicos: 'psicología social experimentos Asch Milgram',
  mental: 'enfermería en salud mental cuidados',
  medicas: 'enfermería médico quirúrgica paciente crónico',
  fisio1: 'fisiopatología inflamación shock edema',
  familia: 'enfermería familiar familiograma APGAR familiar',
  gineco: 'enfermería materno perinatal control prenatal parto',
  fr1: 'factores de riesgo cardiovascular prevención',
  fisio2: 'fisiopatología diabetes insuficiencia cardiaca EPOC',
  pedia: 'AIEPI enfermería pediátrica',
  fr2: 'dengue malaria accidente ofídico Colombia enfermería',
  quirur: 'enfermería quirúrgica cuidados preoperatorios posoperatorios',
  calidad: 'seguridad del paciente Colombia protocolo de Londres',
  critico: 'enfermería cuidados intensivos RCP sepsis'
};

window.RR_CANALES = [
  { nombre: 'SalusPlay', foco: 'Farmacología y temas generales de salud', url: 'https://www.youtube.com/user/prescripcionenfermer', lang: 'ES' },
  { nombre: 'El enfermero del pendiente', foco: 'Técnicas y procedimientos', q: 'El enfermero del pendiente', lang: 'ES' },
  { nombre: 'Javi Matrón Academy', foco: 'Ginecología y obstetricia', q: 'Javi Matrón Academy', lang: 'ES' },
  { nombre: 'Enfermero Jorge Ángel', foco: 'Medicación, salud sexual y primeros auxilios', q: 'Enfermero Jorge Ángel', lang: 'ES' },
  { nombre: 'EBEVIDENCIA', foco: 'Enfermería basada en la evidencia', q: 'EBEVIDENCIA enfermería', lang: 'ES' },
  { nombre: 'Canal Enfermero', foco: 'Consejo General de Enfermería (España)', q: 'Canal Enfermero Consejo General de Enfermería', lang: 'ES' },
  { nombre: 'Level Up RN', foco: 'Farmacología, médico-quirúrgico, maternidad', q: 'Level Up RN', lang: 'EN' },
  { nombre: 'RegisteredNurseRN', foco: 'Explicaciones detalladas de enfermería', q: 'RegisteredNurseRN', lang: 'EN' }
];
