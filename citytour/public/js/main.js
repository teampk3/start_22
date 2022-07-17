$('document').ready(function () {
  var area0 = ["시/군 선택", "가평군", "안산시", "여주시", "파주시", "광명시"];
  var area1 = ["가평터미널", "가평레일바이크", "자라섬", "가평역", "남이섬", "인터렉티브아트뮤지엄", "쁘띠프랑스", "청평터미널", "아침고요수목원", "스위스마을", "설악터미널", "쁘띠프랑스"];
  var area2 = ["중앙역", "시화호조력발전소", "대부해솔길 1코스", "탄도바닷길"];
  var area3 = ["여주역", "세종대왕릉", "여주5일장", "신륵사", "목아박물관","강천보","금은모래유원지","황학산수목원","명성황후생가","여주아울렛"];
  var area4 = ["운정역", "임진강황포돛배", "감악산출렁다리", "율곡수목원"];
  var area5 = ["광명역", "이케아", "기형도문학관", "충현박물관", "광명전통시장", "철산역"];


  // 시/도 선택 박스 초기화

  $("select[name^=local]").each(function () {
    $sellocal = $(this);
    $.each(eval(area0), function () {
      $sellocal.append("<option value='" + this + "'>" + this + "</option>");
    });
    $sellocal.next().append("<option value=''>시티투어 여행지</option>");
  });


  // 시/도 선택시 시티투어여행 설정

  $("select[name^=local]").change(function () {
    var area = "area" + $("option", $(this)).index($("option:selected", $(this))); // 선택지역의 시티투어여행Array
    var $citytourname = $(this).next(); // 선택영역 시티투어 장소 객체
    $("option", $citytourname).remove(); //시티투 초기화

    if (area == "area0")
      $citytourname.append("<option value=''>시티투어 여행지</option>");
    else {
      $.each(eval(area), function () {
        $citytourname.append("<option value='" + this + "'>" + this + "</option>");
      });
    }
  });


});
