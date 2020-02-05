function loadContent(pageName) {
  var pageContent = PROVIDER.getPageContent(pageName);
  $(".content").html(pageContent);

  $("a").click(function(e) {
    var cp = PROVIDER.getCurrentPageName();
    var btnID = e.currentTarget.id;

    if (cp != btnID) {
      loadContent(btnID);
    }
  });
}

function populateNavigation() {
  var nav = PROVIDER.getNavigation();
  $.each(nav, function(index, link) {
    $("nav").append(`<a id="${link.path}" href="#">${link.name}</a>`);
  });

  var social = PROVIDER.getSocialMedia();
  $.each(social, function(index, social) {
    $(".navigation__social").append(
      `<img src="${social.imgPath}" alt="${social.imgAlt}" />`
    );
  });

  loadContent("home");
}

$(document).ready(() => {
  PROVIDER.getData(populateNavigation);
});
