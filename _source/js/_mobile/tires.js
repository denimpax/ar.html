$(document).ready(function () {
  $("body").on("click", ".js-show", function () {
      $(this).text("Скрыть текст").removeClass("js-show").addClass("js-hide"), $(".first").addClass("active"), $(".hide").slideDown();
  }),
      $("body").on("click", ".js-hide", function () {
          $(this).text("Читать далее").removeClass("js-hide").addClass("js-show"), $(".first").removeClass("active"), $(".hide").slideUp();
      }),
      $("body").on("click", ".closed", function () {
          $(".main-portrait").slideUp();
      }),
      (window.sl = $("#weight")
          .slider({
              id: "weight",
              min: 0,
              max: 100,
              range: !0,
              step: 5,
              value: [70, 90],
              formatter: function (e) {
                  return "Current value: " + e;
              },
              tooltip: "hide",
              enable: !0,
          })
          .on("slideEnabled", function () {
              $(".slider-track-low").html('<div class="tire-tooltip winter">Лед+Снег 70%</div>'),
                  $(".slider-selection").html('<div class="tire-tooltip asphalt">Асфальт 20%</div>'),
                  $(".slider-track-high").html('<div class="tire-tooltip comfort">Комфорт 10%</div>');
          })
          .on("change", function (e) {
              (selected_score.winter = e.value.newValue[0]),
                  (selected_score.asphalt = e.value.newValue[1] - e.value.newValue[0]),
                  (selected_score.comfort = 100 - e.value.newValue[1]),
                  $(".tire-tooltip.winter").html("Снег " + selected_score.winter + "%"),
                  $(".tire-tooltip.asphalt").html("Асфальт " + selected_score.asphalt + "%"),
                  $(".tire-tooltip.comfort").html("Комфорт " + selected_score.comfort + "%"),
                  fetchTires();
          })
          .slider("enable"));
});
