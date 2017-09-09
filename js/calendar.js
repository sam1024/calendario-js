 var date = new Date(), mes = date.getMonth(), year = date.getFullYear(),
     number_dias_mes = obtNumberDayMes(mes + 1, year), array = [];
$(document).ready(function() {
  for (var i = 1; i <= number_dias_mes; i++) {
    array[i] = $("#diames" + i).val();
  }
  recorre();
  $("#hola").on("click", function() {
    $.ajax({
      type: "POST",
      url: "prueba.php",
      data: {fecha: new Date()},
    })
    .done(function(h) {
      success: $("#fecha").html(h);
    });
  });
});
function calendar() {
    number_dia_week_start_mes = obtNumberDayWeekStartMes(year, mes);
    if (number_dia_week_start_mes > 0) {
        total_dias_mes_anterior = obtNumberDayMes(mes, year);
    }
    $("#dias_mes").append("<tr>");
    day_week = 0;
    dia_mes = 1;
    while (dia_mes <= number_dias_mes) {
      if (day_week < number_dia_week_start_mes) {
        $("#dias_mes").append("<td><a href='javascript:void(0)' style='color: #bdbdbd'>" + total_dias_mes_anterior + "</a></td>");
        day_week++;
      } else {
        if (day_week === 7) {
          $("#dias_mes").append("</tr><tr>");
          day_week = 0;
          number_dia_week_start_mes = -1;
        } else {
          $("#dias_mes").append("<td ><input id='diames" + dia_mes + "' type='hidden' value='" + year + "/" + mesLessTen((mes + 1)) +
                                "/" + dayLessTen(dia_mes) + "' /><a id='dia_mes" + dia_mes + "' href='javascript:void(0)'>" + dia_mes + "</a></td>");
          dia_mes++;
          day_week++;
        }
      }
    }//CIERRE BUCLE WHILE
    obtNumberDayWeekStartMes();
}

function recorre() {
  j = 1;
  array.forEach(function(e) {
    $("#dia_mes" + j).on("click", function() {
      $.ajax({
        type: "POST",
        url: "prueba.php",
        data: {fecha: e},
      })
      .done(function(h) {
        success: $("#fecha").html(h);
      });
    });
    j++;
  });
}

/** OBTENER EL NUMERO DE DIAS QUE TRAE UN MES **/
function obtNumberDayMes(number_mes, year) {
    return new Date(year, number_mes, 0).getDate();
}
/** FIN OBTENER EL NUMERO DE DIAS QUE TRAE UN MES **/

/** OBTENER EL NUMERO DEL DIA DE LA SEMANA DE INICIO DEL MES **/
function obtNumberDayWeekStartMes(year, number_mes) {
  return new Date(year, number_mes, 1).getDay();
}
/** FIN OBTENER EL NUMERO DEL DIA DE LA SEMANA DE INICIO DEL MES **/

function dayLessTen(number_day) {
  number_day < 10 ? number_day = "0" + number_day : number_day = number_day;
  return number_day;
}

function mesLessTen(number_mes) {
  number_mes < 10 ? number_mes = "0" + number_mes : number_mes = number_mes;
  return number_mes;
}
