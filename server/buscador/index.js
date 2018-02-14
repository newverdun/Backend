const express = require('express'),
      storage = require('../storage'),
      router = express.Router();


obtenerRegistroUnico = (datos, prop) => {
    let registrosUnicos = [];
    datos.forEach(element => {
        if (registrosUnicos.indexOf(element[prop]) === -1) {
            registrosUnicos.push(element[prop]);
        }
    });

    return registrosUnicos;
};

filtrarRangoPrecios = (datos, filtro) => {
    let registros = [];
    datos.forEach(item => {
        let fixPrecio = item.Precio.replace(",", "").replace("$", "");
        fixPrecio = parseFloat(fixPrecio);
        let min = parseFloat(filtro.min);
        let max = parseFloat(filtro.max);

        if ((fixPrecio >= min) && (fixPrecio <= max)) {
            registros.push(item);
        }
    });

    return registros;
};

filtrarPorPropiedad = (datos, filtro, prop) => {
    if (filtro[prop] === "") {
        return datos;
    }
    else{
        let registros = [];
        datos.forEach(item => {
            if (item[prop] == filtro[prop]) {
                registros.push(item);
            }
        });

        return registros;
    }
};


filtrarDatos = (datos, filtro) => {
    let registros = filtrarRangoPrecios(datos, filtro);
    registros = filtrarPorPropiedad(registros, filtro, "Ciudad");
    registros = filtrarPorPropiedad(registros, filtro, "Tipo");

    return registros;
};

router.post("/obtenerDatos", (request, response) => {
    let filter = request.body.filtro;
    storage.getData()
        .then(datos => {
            if (filter.customSearch == "false") {
                response.json(datos);
            } else{
                let registros = filtrarDatos(datos, filter);
                response.json(registros);
            }
        }).catch(err => {
            response.sendStatus(500).json(err);
        });
});

router.get("/obtenerCuidades", (request, response) => {
    storage.getData()
        .then(datos => {
            let cuidades = obtenerRegistroUnico(datos, "Ciudad");
            response.json(cuidades);
        }).catch(err => {
            response.sendStatus(500).json(err);
        });
});

router.get("/obtenerTipoInmueble", (request, response) => {
    storage.getData()
        .then(datos => {
            let tipos = obtenerRegistroUnico(datos, "Tipo");
            response.json(tipos);
        }).catch(err => {
            response.sendStatus(500).json(err);
        });
});

module.exports = router;