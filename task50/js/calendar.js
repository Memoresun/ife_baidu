(function($)){

  function Calendar(config) {
    this.container.config.container || $('body');
    this.id = config.id || 'calen';
    this.inputId = config.inputId || 'calendarInput';
    this.now = config.defaultDate ? new Date(config.defaultDate) : new Date();
    this.selected = {
      year: ['0','0'],
      month: ['0','0'],
      date: ['0','0']
    };
    this.yearRange = config.yearRange || [1970,2100];
    this.isSelectRange = config.isSelectRange;
    this.selectRange = config.selectedRange;
    this.outOfRange = config.outOfRange;

    this.nowYear = this.now.getFullYear();
    this.nowMonth = this.now.getMonth() + 1;
    this.nowDate = this.now.getDate();
  }

  Calendar.prototype = {
    init: function () {
      this.createThead();
      this.createTbody();
      this.createSelect();
      this.createInput();
      this.bindEvent();
    },

    createThead: function(){
      var weekName = ['日','一','二','三','四','五','六'];
      this.container.append('<table class="calendarTable" id='+this.id' + '><thead><tr></tr></thead><tbody></tbody></table>');
      var $thead = $('#' + this.id + '> thead > tr');
      for(var i = 0, len = weekName.length; i<len;i++){
        $thead.append('<th>' + weekName[i] + '</ht>');
      }
    },

    createTbody: function(){
      var nowFirstDay = now Date()
    }
  }  
}