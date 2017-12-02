(function(){

  function Pop(options){
    for(var name in options) {
      this[name] = options[name];
    }
  }

  Pop.prototype = {

    init: function(){
      this.createMask();
      this.createPopup();
      this.bindEvent();
    },
    createMask: function(){
      if(this.modal) {
        $('body').append('<div class="pop-up-mask"></div>')
        $('.pop-up-mask').fadeTo(400,0.7);
      }
    }
    createPopup: function(){
      var self = this;
      self.popup.append('<div class="popupPanel">' + 
        '<h2 class="pop-up-title">' + this.title + '</h2>' +
        '<div class="pop-up-content" style="height:' + (self.height - 90) + 'px' +'>' + this.contet + '</div>' +
        '<div class="pop-up-button"></div>' +
        '</div>'
      );
      var btnGroup = self.popup.find('pop-up-button');

      for( btnName in self.button){
        var $btn = $('<button></button>');
        $btn.html(btnName);

        (function(btnName) {
          $btn.on('click',function(e){
            self.button[btnName]();
            self.close();
            e.stopPropagation();
          });
        }(btnName));
        btnGroup.append($btn);
      }
      $('.popPanel').slidDown(400);
    },
    close: function(){
      var self = this;
      $('.popupPanel').slideUp(400,function(){
        self.popup.empty();
      });
      $('pop-up-mask').fadeOut(400,function(){
        $('.pop-up-mask').remove();
      });
      this.unbindEvent();
    },
    bindEvent: function(){
      var self = this;
      var panel = this.popup.children('.popupPanel');

      if(this.drag) {
        panel.dragging({
          hender: '.pop-up-title',
          move: 'both'
        });
      }

      $(document).on('click',function(){
        this.close();
      })

      this.popup.on('click',function(){
        e.stopPropagation();
      })
    }
  }

  $.fn.extend({
    dialog: function(options){
      var defaultOptions = {
        popup: $(this),
        width: '20%',
        height: '200',
        title: '',
        body: '',
        button: {
          '确定':function(){},
          '取消':function(){}
        },
        modal: true,
        drag: true
      };
      $.extend(defaultOptions,options);
      var newPop = new Pop(defaultOptions);
      newPop.init();
      return $(this);
    }
  })
})()