/* =========================================================
   Ruta Rural · Registro de materias, énfasis y ayudas de carga
   - C(materia, filas): agrega tarjetas.  Fila: [tema, pregunta, respuesta, nota, pista, fuente?, énfasis?]
   - G(materia, filas): agrega juegos.    Filas:
       ['o', pregunta, [opciones], índiceCorrecto, explicación]   opción múltiple
       ['v', afirmación, true|false, explicación]                 verdadero o falso
       ['p', instrucción, [[a, b], ...]]                           parejas
       ['s', instrucción, [pasos en orden], explicación]           ordenar
       ['c', nombreCalculadora]                                    ejercicio generado al azar
   IMPORTANTE: las tarjetas nuevas se numeran por posición; agrega siempre AL FINAL
   de cada lista para no mover el progreso guardado de quien ya estudió.
   ========================================================= */
window.RR = { tarjetas: [], juegos: {}, mat: {} };

RR.materias = [
  /* periodo, id, nombre, color, ícono, fuente por defecto */
  [1, 'bioetica', 'Bioética y Constitución', 'lav', 'scale', 'Beauchamp y Childress; Ley 911 de 2004; Constitución Política de 1991'],
  [1, 'bioq1', 'Bioquímica I', 'mint', 'flask', 'Texto de bioquímica (p. ej., Lehninger o Harper)'],
  [1, 'morfo1', 'Morfofisiología I', 'peach', 'body', 'Texto de anatomía y fisiología (p. ej., Tortora o Guyton)'],
  [1, 'psicog', 'Psicología General y Evolutiva', 'sky', 'brain', 'Texto de psicología del desarrollo (p. ej., Papalia)'],
  [1, 'socio', 'Socioantropología', 'butter', 'globe', 'Leininger; OMS (determinantes sociales); textos de antropología de la salud'],
  [2, 'aps1', 'Atención Primaria en Salud I', 'mint', 'hills', 'OMS/OPS – Atención primaria de salud'],
  [2, 'bioest', 'Bioestadística', 'sky', 'chart', 'Texto de bioestadística'],
  [2, 'bioq2', 'Bioquímica II', 'lav', 'flask', 'Texto de bioquímica (p. ej., Lehninger o Harper)'],
  [2, 'morfo2', 'Morfofisiología II', 'peach', 'heart', 'Texto de anatomía y fisiología (p. ej., Tortora o Guyton)'],
  [2, 'psicop', 'Psicología de la Personalidad', 'mauve', 'brain', 'Texto de psicología de la personalidad'],
  [2, 'segsoc', 'Seguridad Social', 'butter', 'scale', 'Ley 100 de 1993 y normas del SGSSS'],
  [3, 'aps2', 'Atención Primaria en Salud II', 'mint', 'home', 'Resolución 3280 de 2018 y normas del MinSalud'],
  [3, 'epi', 'Epidemiología', 'butter', 'chart', 'OPS – Módulos de principios de epidemiología'],
  [3, 'farma', 'Farmacología', 'lav', 'pill', 'Texto de farmacología clínica / protocolo institucional'],
  [3, 'cuidado', 'Principios del Cuidado de Enfermería', 'peach', 'case', 'Texto de fundamentos de enfermería / protocolo institucional'],
  [3, 'psicos', 'Psicología Social', 'sky', 'users', 'Texto de psicología social'],
  [4, 'mental', 'Cuidado de Enfermería en Salud Mental', 'lav', 'brain', 'OMS mhGAP; Ley 1616 de 2013; texto de enfermería en salud mental'],
  [4, 'medicas', 'Cuidados de Enfermería en Clínicas Médicas', 'sky', 'stetho', 'Guías del MinSalud / texto de enfermería médico-quirúrgica'],
  [4, 'fisio1', 'Fisiopatología I', 'peach', 'bolt', 'Texto de fisiopatología (p. ej., Porth)'],
  [5, 'familia', 'Cuidado Básico de Familia', 'mint', 'users', 'Texto de enfermería familiar; Resolución 3280 de 2018'],
  [5, 'gineco', 'Cuidados de Enfermería en Ginecobstetricia', 'mauve', 'venus', 'OMS; Resolución 3280 de 2018 (Ruta materno perinatal)'],
  [5, 'fr1', 'Factores de Riesgo I', 'butter', 'heart', 'OMS; Resolución 3280 de 2018; guías del MinSalud'],
  [5, 'fisio2', 'Fisiopatología II', 'peach', 'pulse', 'Texto de fisiopatología (p. ej., Porth)'],
  [6, 'pedia', 'Cuidados de Enfermería en Pediatría', 'sky', 'baby', 'AIEPI (OPS/MinSalud); Resolución 2350 de 2020'],
  [6, 'fr2', 'Factores de Riesgo II', 'mint', 'hills', 'INS Colombia (protocolos de vigilancia); OMS/OPS'],
  [7, 'quirur', 'Cuidado de Enfermería en Clínicas Quirúrgicas', 'lav', 'scissors', 'OMS (Cirugía segura); texto de enfermería quirúrgica'],
  [8, 'calidad', 'Calidad de Servicios de Salud', 'butter', 'shield', 'Decreto 1011 de 2006 (compilado en el Decreto 780 de 2016); Política de Seguridad del Paciente'],
  [8, 'critico', 'Cuidado de Enfermería al Paciente Crítico', 'mauve', 'pulse', 'AHA 2020; Surviving Sepsis Campaign; texto de cuidado crítico']
].map(function (r) {
  var m = { periodo: r[0], id: r[1], nombre: r[2], color: r[3], icono: r[4], f: r[5] };
  RR.mat[m.id] = m;
  return m;
});

/* Énfasis del rural: vistas transversales que reúnen tarjetas de varias materias */
RR.enfasis = [
  { id: 'pf', nombre: 'Planificación familiar y SSR', sub: 'Implantes, métodos, citología, parto', color: 'lav', icono: 'venus', calcs: ['fpp'] },
  { id: 'proc', nombre: 'Procedimientos', sub: 'Cistoirrigación, glucometría, goteo', color: 'mint', icono: 'syringe', calcs: ['goteo', 'dosis'] },
  { id: 'hta', nombre: 'HTA en el paciente crónico', sub: 'Diagnóstico, toma de PA, fármacos', color: 'peach', icono: 'heart', calcs: ['pam'] },
  { id: 'bal', nombre: 'Balance de líquidos', sub: 'Ingresos, egresos, pérdidas', color: 'sky', icono: 'drop', calcs: ['balance', 'parkland'] },
  { id: 'elec', nombre: 'Equilibrio electrolítico', sub: 'Na, K, Ca, Mg, ácido-base', color: 'butter', icono: 'bolt', calcs: ['gases'] }
];
RR.enf = {};
RR.enfasis.forEach(function (e) { RR.enf[e.id] = e; });

function rrPad(n) { return n < 10 ? '0' + n : String(n); }

function C(mat, filas) {
  var m = RR.mat[mat];
  filas.forEach(function (r, i) {
    RR.tarjetas.push({ id: mat + '-' + rrPad(i + 1), mat: mat, t: r[0], q: r[1], a: r[2], n: r[3] || '', h: r[4] || '', f: r[5] || m.f, e: r[6] || '' });
  });
}

/* Tarjetas de la primera versión: conservan su id para no perder el progreso */
function CX(lista) {
  lista.forEach(function (c) { RR.tarjetas.push(c); });
}

function G(mat, filas) {
  RR.juegos[mat] = filas.map(function (r, i) {
    var id = mat + '-j' + rrPad(i + 1);
    if (r[0] === 'o') return { id: id, tipo: 'o', q: r[1], ops: r[2], ok: r[3], exp: r[4] || '' };
    if (r[0] === 'v') return { id: id, tipo: 'v', q: r[1], v: r[2], exp: r[3] || '' };
    if (r[0] === 'p') return { id: id, tipo: 'p', q: r[1], pares: r[2] };
    if (r[0] === 's') return { id: id, tipo: 's', q: r[1], pasos: r[2], exp: r[3] || '' };
    return { id: id, tipo: 'c', calc: r[1] };
  });
}
