//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
});

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (customSearch == true) {
      customSearch = false;
    } else {
      customSearch = true;
    }
    $('#personalizada').toggleClass('invisible')
  })
};


(function ($, window, document, undefined) {
  (function () {
    return Buscador = {
      apiUrl: '/api',
      btnBuscar: $("#buscar"),
      cboCiudad: $("#ciudad"),
      cboTipo: $("#tipo"),
      precioRango: $("#rangoPrecio").data("ionRangeSlider"),
      listaInmueble: $(".col.m8.lista"),

      Init: function () {
        let self = this;
        $('select').material_select();
        self.cargarCiudades();
        self.cargarTipoInmueble();
        self.btnBuscar.on('click', function () {
          
          let filtro = {
            customSearch: customSearch,
            min: self.precioRango.result.from,
            max: self.precioRango.result.to,
            Ciudad: self.cboCiudad.val(),
            Tipo: self.cboTipo.val()
          };

          self.filtrarDatos(filtro);
        });
      },

      ajaxRequest: (url, type, data) => {
        return $.ajax({
          url: url,
          type: type,
          data: data
        });
      },

      cargarCiudades: function () {
        var self = this;
        var endpoint = self.apiUrl + "/obtenerCuidades";
        self.ajaxRequest(endpoint, 'GET', {})
          .done(data => {
            data.forEach(element => {
              self.cboCiudad.append(`<option value="${element}">${element}</option>`);
            });
            $('select').material_select();
          }).fail(err => console.error(err));
      },

      cargarTipoInmueble: function () {
        var self = this;
        var endpoint = self.apiUrl + "/obtenerTipoInmueble";
        self.ajaxRequest(endpoint, 'GET', {})
          .done(data => {
            data.forEach(element => {
              self.cboTipo.append(`<option value="${element}">${element}</option>`);
            });
            $('select').material_select();
          }).fail(err => console.error(err));
      },

      filtrarDatos: function (filters) {
        var self = this;
        var endpoint = self.apiUrl + "/obtenerDatos";
        self.ajaxRequest(endpoint, 'POST', {filtro: filters})
          .done(data => {
            self.renderInmuebles(data);
          }).fail(err => console.error(err));
      },

      renderInmuebles: function (datos) {
        var self = this;
        self.listaInmueble.html("");
        datos.forEach(item => {
          let template = `<div class="card horizontal">
                            <div class="card-image">
                              <img src="img/home.jpg">
                            </div>
                            <div class="card-stacked">
                              <div class="card-content">
                                <div>
                                  <b>Direccion: </b><p>${item.Direccion}</p>
                                </div>
                                <div>
                                  <b>Ciudad: </b><p>${item.Ciudad}</p>
                                </div>
                                <div>
                                  <b>Telefono: </b><p>${item.Telefono}</p>
                                </div>
                                <div>
                                  <b>Código postal: </b><p>${item.Codigo_Postal}</p>
                                </div>
                                <div>
                                  <b>Precio: </b><p>${item.Precio}</p>
                                </div>
                                <div>
                                  <b>Tipo: </b><p>${item.Tipo}</p>
                                </div>
                              </div>
                              <div class="card-action right-align">
                                <a href="#">Ver más</a>
                              </div>
                            </div>
                          </div>`;
          self.listaInmueble.append(template);
        });
      }
    };
  })();
  Buscador.Init();
})(jQuery, window, document);

setSearch();
let customSearch = false;