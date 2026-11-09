/* =========================================================
   Ruta Rural · Generadores de casos y juegos (opción A, sin IA)
   Cada plantilla mezcla variables al azar (persona, vereda, hora,
   signos, laboratorios, antecedentes) para que los casos no se repitan.
   ========================================================= */
(function () {
  function rnd(a, b, paso) { paso = paso || 1; var n = Math.floor((b - a) / paso) + 1; return a + Math.floor(Math.random() * n) * paso; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function mezclar(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function fmt(n) { return String(n).replace('.', ','); }
  function miles(n) { var s = Math.abs(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return (n < 0 ? '−' : '') + s; }
  function signo(n) { return (n > 0 ? '+' : '') + miles(n); }

  var VEREDAS = ['La Esperanza', 'El Retiro', 'San Isidro', 'La Palma', 'El Carmen', 'Buenavista', 'Santa Rosa', 'La Florida', 'El Paraíso', 'Monte Bello', 'La Cabaña', 'Alto Bonito', 'El Porvenir', 'Las Mercedes'];
  var HORAS = ['las 7 de la mañana', 'las 8 de la mañana', 'las 9 de la mañana', 'las 10 de la mañana', 'las 11 de la mañana', 'las 2 de la tarde', 'las 3 de la tarde', 'las 4 de la tarde'];
  var MAYORES_M = ['don Arturo', 'don Jairo', 'don Hernando', 'don Efraín', 'don Álvaro', 'don Rubén', 'don Gustavo', 'don Octavio', 'don Luis Alfonso', 'don Ramiro'];
  var MAYORES_F = ['doña Rosa', 'doña Carmen', 'doña Luz Marina', 'doña Blanca', 'doña Gloria', 'doña Esperanza', 'doña Inés', 'doña Fanny', 'doña Myriam', 'doña Aurora'];
  var JOVENES_F = ['Yuliana', 'Daniela', 'Katherine', 'Marcela', 'Leidy', 'Paola', 'Natalia', 'Viviana', 'Sandra', 'Luisa', 'Tatiana', 'Erika', 'Lorena', 'Yesenia'];

  function persona() {
    var mujer = Math.random() < 0.5;
    return { nombre: pick(mujer ? MAYORES_F : MAYORES_M), mujer: mujer };
  }
  function entorno() { return 'Jefe {n}, son ' + pick(HORAS) + ' en el puesto de salud de la vereda ' + pick(VEREDAS) + '.'; }

  /* ---------- Plantillas de casos ---------- */
  var PLANTILLAS = [
    /* 1. Hiperpotasemia en paciente hipertenso */
    function () {
      var p = persona(); var edad = rnd(55, 79);
      var ant = pick(['hipertensión y enfermedad renal crónica', 'hipertensión y diabetes con daño renal', 'hipertensión de muchos años y enfermedad renal crónica']);
      var med = pick(['losartán', 'enalapril', 'losartán y espironolactona', 'enalapril y espironolactona']);
      var sint = pick(['siente las piernas débiles', 'dice que siente el corazón acelerado', 'se siente muy cansad' + (p.mujer ? 'a' : 'o') + ' desde ayer', 'tiene hormigueo en las manos']);
      var k = (rnd(59, 69) / 10).toFixed(1);
      var variante = Math.random() < 0.6 ? 'ecg' : 'med';
      var base = {
        tema: 'HTA · Electrolitos', firma: 'hk|' + p.nombre + edad + med + k + variante,
        mensajes: [entorno(), 'Llega ' + p.nombre + ', ' + edad + ' años. Tiene ' + ant + ' y toma ' + med + '. Hoy ' + sint + '.'],
        datos: [{ t: 'PA ' + rnd(130, 158) + '/' + rnd(80, 96) + ' mmHg', tono: 'neutro' }, { t: 'K⁺ ' + fmt(k) + ' mEq/L', tono: 'alerta' }],
        conducta: 'Avisas de inmediato al médico, tomas ECG si hay equipo y activas la remisión según el protocolo. Mientras tanto, monitorizas signos vitales.'
      };
      if (variante === 'ecg') {
        base.pregunta = '¿Qué hallazgo esperas en el electrocardiograma?';
        base.opciones = [{ t: 'Ondas T altas y picudas', ok: true }, { t: 'Onda U prominente' }, { t: 'Intervalo QT prolongado' }, { t: 'Onda delta' }];
        base.explicacion = 'La hiperpotasemia produce ondas T altas y picudas; si avanza, el QRS se ensancha y aparecen arritmias. La onda U va con potasio bajo y el QT prolongado con calcio bajo.';
      } else {
        var culpable = med.indexOf('espironolactona') >= 0 ? 'La combinación con espironolactona' : (med.indexOf('losartán') >= 0 ? 'El losartán' : 'El enalapril');
        base.pregunta = '¿Qué puede estar contribuyendo a que el potasio esté alto?';
        base.opciones = [{ t: culpable + ', junto con la enfermedad renal', ok: true }, { t: 'Haber tomado mucha agua' }, { t: 'Una dieta baja en sal' }, { t: 'La hidroclorotiazida' }];
        base.explicacion = 'Los IECA, los ARA II y la espironolactona retienen potasio, y el riñón enfermo no logra eliminarlo. La hidroclorotiazida hace lo contrario: baja el potasio.';
      }
      return base;
    },
    /* 2. Hipoglucemia */
    function () {
      var p = persona(); var edad = rnd(48, 80);
      var med = pick(['insulina NPH', 'glibenclamida', 'insulina NPH y metformina']);
      var razon = pick(['no desayunó porque madrugó a ordeñar', 'vomitó en la mañana y no pudo comer', 'se aplicó la insulina y no alcanzó a almorzar', 'caminó una hora desde la finca sin comer']);
      var g = rnd(42, 66);
      var inconsciente = Math.random() < 0.3;
      var b = {
        tema: 'Procedimientos · Glucometría', firma: 'hg|' + p.nombre + edad + med + g + inconsciente,
        mensajes: [entorno(), 'Traen a ' + p.nombre + ', ' + edad + ' años, con diabetes en tratamiento con ' + med + '. Hoy ' + razon + '.',
          inconsciente ? 'No responde al llamado, aunque respira bien.' : 'Está sudoros' + (p.mujer ? 'a' : 'o') + ', tembloros' + (p.mujer ? 'a' : 'o') + ' y algo confundid' + (p.mujer ? 'a' : 'o') + ', pero responde y puede tragar.'],
        datos: [{ t: 'Glucometría ' + g + ' mg/dL', tono: 'alerta' }],
        pregunta: '¿Qué haces primero?'
      };
      if (!inconsciente) {
        b.opciones = [{ t: 'Darle 15 g de azúcar de absorción rápida y repetir la glucometría en 15 minutos', ok: true }, { t: 'Aplicarle su dosis de insulina' }, { t: 'Esperar 1 hora y repetir la glucometría' }, { t: 'Darle solo agua y dejarlo en reposo' }];
        b.explicacion = 'Es la regla de los 15: 15 g de carbohidratos rápidos (medio vaso de jugo o gaseosa normal, o 3–4 cucharaditas de azúcar en agua) y control a los 15 minutos. Se repite si sigue por debajo de 70 mg/dL.';
        b.conducta = 'Cuando se recupere, que coma algo con carbohidratos complejos. Informa al médico para revisar la dosis de su medicamento.';
      } else {
        b.opciones = [{ t: 'No darle nada por boca; glucagón IM o dextrosa IV según protocolo y avisar', ok: true }, { t: 'Ponerle azúcar en la boca' }, { t: 'Darle jugo con una jeringa' }, { t: 'Aplicarle insulina' }];
        b.explicacion = 'Con alteración de la conciencia no se da nada por boca por el riesgo de broncoaspiración. Se usa glucagón IM o dextrosa IV, según disponibilidad y protocolo.';
        b.conducta = 'Colócalo de lado, protege la vía aérea, avisa al médico y prepara la remisión.';
      }
      return b;
    },
    /* 3. Crisis hipertensiva */
    function () {
      var p = persona(); var edad = rnd(50, 82);
      var pas = rnd(182, 214); var pad = rnd(112, 132);
      var conDano = Math.random() < 0.5;
      var sint = conDano ? pick(['tiene dolor opresivo en el pecho desde hace media hora', 'le cuesta hablar y tiene debilidad en el brazo derecho', 'tiene mucha dificultad para respirar y se le escuchan crépitos', 'tiene visión borrosa, confusión y cefalea muy intensa'])
        : pick(['no tiene síntomas: dejó de tomar las pastillas hace 4 días porque se le acabaron', 'tiene un dolor de cabeza leve y no tiene otros síntomas', 'viene a su control y dice sentirse bien, pero no ha tomado la pastilla en una semana']);
      return {
        tema: 'HTA en el paciente crónico', firma: 'cr|' + p.nombre + edad + pas + pad + conDano + sint.length,
        mensajes: [entorno(), p.nombre.charAt(0).toUpperCase() + p.nombre.slice(1) + ', ' + edad + ' años, hipertens' + (p.mujer ? 'a' : 'o') + ' conocid' + (p.mujer ? 'a' : 'o') + '. ' + sint.charAt(0).toUpperCase() + sint.slice(1) + '.', 'Tomaste la presión dos veces, con técnica correcta.'],
        datos: [{ t: 'PA ' + pas + '/' + pad + ' mmHg', tono: 'alerta' }, { t: 'FC ' + rnd(72, 104) + ' lpm', tono: 'neutro' }],
        pregunta: '¿Cómo clasificas esta situación?',
        opciones: [{ t: 'Emergencia hipertensiva', ok: conDano }, { t: 'Urgencia hipertensiva (sin daño agudo de órgano)', ok: !conDano }, { t: 'Hipertensión controlada' }, { t: 'Hipotensión ortostática' }],
        explicacion: conDano ? 'Hay cifras muy altas con signos de daño agudo de órgano blanco (corazón, cerebro, pulmón u ojos): es una emergencia hipertensiva.'
          : 'Las cifras son muy altas, pero no hay signos de daño agudo de órgano blanco: es una urgencia hipertensiva (o HTA severa sin daño de órgano).',
        conducta: conDano ? 'Avisas al médico de inmediato y activas la remisión urgente. Monitorizas signos vitales; no se busca bajar la presión de golpe por vía oral.'
          : 'Reposo y nueva toma; informas al médico para ajustar el tratamiento según protocolo. Revisas la adherencia y por qué se le acabaron los medicamentos.'
      };
    },
    /* 4. Cistoirrigación */
    function () {
      var edad = rnd(60, 84); var nombre = pick(MAYORES_M);
      var horas = pick([6, 8, 12]);
      var irr = rnd(3000, 9000, 500); var real = rnd(300, 950, 50); var total = irr + real;
      var opts = mezclar([{ t: miles(real) + ' ml', ok: true }, { t: miles(total) + ' ml' }, { t: miles(irr) + ' ml' }, { t: miles(total + irr) + ' ml' }]);
      return {
        tema: 'Procedimientos · Cistoirrigación', firma: 'ci|' + nombre + edad + horas + irr + real,
        mensajes: ['Jefe {n}, estás de turno en el hospital local. ' + nombre.charAt(0).toUpperCase() + nombre.slice(1) + ', ' + edad + ' años, está en posoperatorio de resección transuretral de próstata con cistoirrigación continua.', 'Al cierre de tu turno de ' + horas + ' horas registras lo siguiente:'],
        datos: [{ t: 'Irrigación infundida: ' + miles(irr) + ' ml', tono: 'neutro' }, { t: 'Total drenado: ' + miles(total) + ' ml', tono: 'neutro' }],
        pregunta: '¿Cuál es la diuresis real del turno?',
        opciones: opts,
        explicacion: 'Diuresis real = total drenado − irrigación infundida = ' + miles(total) + ' − ' + miles(irr) + ' = ' + miles(real) + ' ml.',
        conducta: 'Registra la diuresis real en el balance (no el total drenado) y vigila color del drenaje, coágulos y dolor suprapúbico.'
      };
    },
    /* 5. Tamizaje de cuello uterino */
    function () {
      var nombre = pick(JOVENES_F);
      var edad = pick([rnd(21, 24), rnd(25, 29), rnd(30, 45), rnd(46, 64)]);
      var motivo = pick(['viene a consulta de planificación familiar', 'acompaña a su mamá y aprovecha para preguntar por "la citología"', 'viene a su control y dice que nunca se ha hecho la prueba', 'pregunta qué examen le toca para prevenir el cáncer de cuello uterino']);
      var correcta = edad < 25 ? 'Ninguna de rutina por ahora (solo si hay factores de riesgo)' : (edad < 30 ? 'Citología, esquema 1-3-3' : 'Prueba de ADN-VPH, esquema 1-5-5');
      var todas = ['Ninguna de rutina por ahora (solo si hay factores de riesgo)', 'Citología, esquema 1-3-3', 'Prueba de ADN-VPH, esquema 1-5-5', 'Colposcopia directa'];
      return {
        tema: 'Planificación familiar · Tamizaje', firma: 'tz|' + nombre + edad + motivo.length,
        mensajes: [entorno(), nombre + ', ' + edad + ' años, ' + motivo + '.', 'No tiene tamizajes previos ni factores de riesgo especiales.'],
        datos: [{ t: edad + ' años', tono: 'neutro' }],
        pregunta: 'Según la Resolución 3280, ¿qué tamizaje le corresponde?',
        opciones: todas.map(function (t) { return { t: t, ok: t === correcta }; }),
        explicacion: 'Menores de 25: no se tamizan de rutina. De 25 a 29: citología 1-3-3. De 30 a 65: ADN-VPH 1-5-5 ante resultados negativos.',
        conducta: edad < 25 ? 'Aprovecha la consulta para educar sobre vacunación contra el VPH, uso del condón y signos de alarma.' : 'Explica la prueba, resuelve dudas y deja registrado cuándo le toca la siguiente.'
      };
    },
    /* 6. Implante subdérmico */
    function () {
      var nombre = pick(JOVENES_F); var edad = rnd(19, 38);
      var jad = Math.random() < 0.5; var tipo = jad ? 'Jadelle (2 varillas)' : 'Implanon NXT (1 varilla)';
      var dur = jad ? 5 : 3; var anos = rnd(1, dur + 2); var vigente = anos < dur;
      return {
        tema: 'Planificación familiar · Implante', firma: 'im|' + nombre + edad + jad + anos,
        mensajes: [entorno(), nombre + ', ' + edad + ' años, viene a control de planificación. Tiene un implante ' + tipo + ' que le pusieron hace ' + anos + ' año' + (anos > 1 ? 's' : '') + '.', 'Pregunta si todavía está protegida.'],
        datos: [{ t: tipo, tono: 'neutro' }, { t: 'Colocado hace ' + anos + ' año' + (anos > 1 ? 's' : ''), tono: 'neutro' }],
        pregunta: '¿Qué le respondes?',
        opciones: [{ t: 'Sí, sigue protegida', ok: vigente }, { t: 'Ya venció: ofrecer retiro y colocación de uno nuevo u otro método', ok: !vigente }, { t: 'Debe retirarlo ya porque produce infección' }, { t: 'Depende de si le llega la menstruación' }],
        explicacion: 'Jadelle protege 5 años e Implanon NXT 3 años. ' + (vigente ? 'Todavía está dentro del tiempo de protección.' : 'Ya cumplió su tiempo y debe cambiarse.'),
        conducta: vigente ? 'Palpa el implante, revisa el patrón de sangrado y deja anotada la fecha de recambio.' : 'Mientras se hace el recambio, recomienda condón. Palpa el implante y programa el procedimiento.'
      };
    }
  ];

  /* ---------- Juego: balance de líquidos ---------- */
  function juegoBalance() {
    var kg = rnd(48, 95); var h = pick([6, 8, 12]);
    var lev = rnd(300, 1500, 50); var vo = rnd(0, 900, 50); var dil = Math.random() < 0.4 ? rnd(50, 200, 50) : 0;
    var diu = rnd(300, 1600, 50); var dep = Math.random() < 0.35 ? rnd(100, 300, 50) : 0; var vom = Math.random() < 0.2 ? rnd(100, 300, 50) : 0;
    var pi = 0.5 * kg * h;
    var ing = lev + vo + dil; var egr = diu + dep + vom + pi; var bal = ing - egr;
    var cand = [bal, ing - (egr - pi), ing + pi - (egr - pi), -bal];
    if (dil) cand.push(bal - dil);
    var vistos = {}; var opts = [];
    cand.forEach(function (v, i) { if (!vistos[v] && opts.length < 4) { vistos[v] = 1; opts.push({ t: signo(v) + ' ml', ok: i === 0 }); } });
    while (opts.length < 4) { var x = bal + rnd(-4, 4) * 50; if (!vistos[x]) { vistos[x] = 1; opts.push({ t: signo(x) + ' ml' }); } }
    var ingresos = [['LEV', lev]]; if (vo) ingresos.push(['Vía oral', vo]); if (dil) ingresos.push(['Medicamentos diluidos', dil]);
    var egresos = [['Diuresis', diu]]; if (dep) egresos.push(['Deposición', dep]); if (vom) egresos.push(['Vómito', vom]);
    return {
      tipo: 'balance', titulo: 'Calcula el balance del turno', tema: 'Balance de líquidos', firma: 'bj|' + [kg, h, lev, vo, dil, diu, dep, vom].join('-'),
      intro: 'Jefe {n}, este es de balance hídrico. Recuerda: lo que entra menos lo que sale, sin olvidar las pérdidas que no se ven.',
      enunciado: 'Adulto de ' + kg + ' kg, turno de ' + h + ' horas. Tu servicio calcula las pérdidas insensibles con 0,5 ml/kg/h.',
      ingresos: ingresos, egresos: egresos.concat([['Insensibles', '?']]),
      opciones: mezclar(opts),
      solucion: ['Ingresos: ' + ingresos.map(function (x) { return miles(x[1]); }).join(' + ') + ' = ' + miles(ing) + ' ml',
        'Insensibles: 0,5 × ' + kg + ' × ' + h + ' = ' + miles(pi) + ' ml',
        'Egresos: ' + egresos.map(function (x) { return miles(x[1]); }).concat([miles(pi)]).join(' + ') + ' = ' + miles(egr) + ' ml',
        'Balance: ' + miles(ing) + ' − ' + miles(egr) + ' = ' + signo(bal) + ' ml']
    };
  }

  /* ---------- Juego: cálculo de goteo ---------- */
  function juegoGoteo() {
    var vol = pick([500, 1000, 1500]); var horas = pick([4, 6, 8, 10, 12]); var macro = Math.random() < 0.75;
    var factor = macro ? 20 : 60; var mlh = Math.round(vol / horas);
    var correcto = Math.round(vol * factor / (horas * 60));
    var cand = [correcto, mlh, Math.round(vol * (macro ? 60 : 20) / (horas * 60)), Math.round(vol / (horas * 60))];
    var vistos = {}; var opts = [];
    cand.forEach(function (v, i) { if (!vistos[v] && opts.length < 4) { vistos[v] = 1; opts.push({ t: v + (macro ? ' gotas/min' : ' microgotas/min'), ok: i === 0 }); } });
    while (opts.length < 4) { var x = correcto + rnd(-6, 6); if (x > 0 && !vistos[x]) { vistos[x] = 1; opts.push({ t: x + (macro ? ' gotas/min' : ' microgotas/min') }); } }
    return {
      tipo: 'goteo', titulo: 'Calcula el goteo', tema: 'Cálculo de goteo', firma: 'gt|' + vol + '-' + horas + '-' + macro,
      intro: 'Jefe {n}, toca programar un goteo sin bomba de infusión. Fórmula: volumen × factor ÷ minutos.',
      enunciado: 'Orden médica: pasar ' + miles(vol) + ' ml de solución salina 0,9 % en ' + horas + ' horas. Usas un equipo de ' + (macro ? 'macrogoteo (20 gotas/ml)' : 'microgoteo (60 microgotas/ml)') + '.',
      ingresos: [['Volumen', vol], ['Tiempo', horas * 60 + ' min']], egresos: [['Factor', factor + (macro ? ' gotas/ml' : ' microgotas/ml')]],
      etiquetas: ['Datos', 'Equipo'],
      opciones: mezclar(opts),
      solucion: [miles(vol) + ' × ' + factor + ' ÷ ' + (horas * 60) + ' = ' + (vol * factor / (horas * 60)).toFixed(1).replace('.', ',') + ' → ' + correcto + (macro ? ' gotas/min' : ' microgotas/min'),
        macro ? 'Atajo: ' + mlh + ' ml/h ÷ 3 ≈ ' + Math.round(mlh / 3) + ' gotas/min' : 'En microgoteo, microgotas/min = ml/h = ' + mlh]
    };
  }

  function generarUnico(fn, vistos) {
    var c;
    for (var i = 0; i < 40; i++) { c = fn(); if (vistos.indexOf(c.firma) < 0) return c; }
    return c;
  }

  window.RR_GEN = {
    caso: function (vistos) {
      var c = generarUnico(function () { return pick(PLANTILLAS)(); }, vistos || []);
      if (!c.opciones.some(function (o) { return o.ok; })) c.opciones[0].ok = true;
      c.opciones = c.opciones.length && c.tema.indexOf('Tamizaje') >= 0 ? c.opciones : mezclar(c.opciones);
      return c;
    },
    juego: function (vistos) { return generarUnico(function () { return Math.random() < 0.6 ? juegoBalance() : juegoGoteo(); }, vistos || []); },
    totalPlantillas: PLANTILLAS.length
  };
})();
