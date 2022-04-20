$(function () {
  var icons = {
    header: false,
    activeHeader: false,
  };
  $("#accordion").accordion({
    animate: {
      duration: 50,
    },
    collapsible: true,
    active: 0,
    icons: icons,
    heightStyle: "content",
  });
});