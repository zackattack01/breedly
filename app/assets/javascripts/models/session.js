Breedly.Models.Session = Backbone.Model.extend({
  url: '/session',

  logout: function() {
    this.destroy();
    if (Breedly.RAILS_ENV === "development") {
      window.location.replace("http://localhost:3000/session/new");
    } else {
      window.location.replace("http://breedly.co/session/new");
    }    
  },

  isNew: function() {
    return false;
  }
});