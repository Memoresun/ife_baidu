(function(){
  console.log('1');

  var Spaceship = function(id){
    this.id = id;
    this.power = 100;
    this.currState = "stop";
    this.deg = 0;
    this.timer = null;
  }

  // 动力系统
  Spaceship.prototype.dynamicManager = function(){
    var self = this;

    var fly = function(){
      self.timer = setInterval(function(){
        self.deg += SPACESHIP_SPEED;
        if(self.deg > 360) self.deg = 0;
        AnimUtil.fly(self.id, self.deg);
      },20)
    }

    var stop = function(){
      clearInterval(self.timer);
      AnimUtil.stop(self.id);
    }

    return {
      fly: fly,
      stop: stop
    }
  }

  // 能源系统
  Spaceship.prototype.powerManger = function(){
    var self = this;

    var charge = function(){
      var chargeRate = DEFAULT_CHARGE_RATE;

      var timer = setInterval(function(){
        if(self.currState == "fly" || self.currState == "destroy"){
          clearInterval(timer);
          retur false;
        }

        if(self.power >= 100 ){
          clearInterval(timer);
          self.power = 100;
          retur false;
        }

        self.power += chargeRate;
        AnimUtil.updatePower(self.id,self.power);
      })
    }

    var discharge = function(){
      var dischargeRate = DEFAULT_DISCHARGE_RATE;
      var timer = setInterval(function(){
        if(self.currState == "stop" || self.currState == "destroy"){
          clearInterval(timer);
          return false;
        }
        if(self.power <= 0){
          clearInterval(timer);
          self.power = 0;
          self.stateManager().changeState('stop');
          return false;
        }
        self.power -= dischargeRate;
        AnimUtil.updatePower(self.id,self.power);
      })
    }

    return {
      charge: charge,
      discharge: discharge
    }
  }

  // 状态系统
  Spaceship.prototype.stateManager = function(){
    var self = this;
    var states = {
      fly: function(state){
        self.currState = "fly";
        self.dynamicManager().fly();
        self.powerManger().discharge()
      },
      stop: function(state){
        self.currState = "stop";
        self.dynamicManager().stop();
        self.powerManger().charge()
      },
      distroy: function(state){
        self.currState = "destroy";
        AnimUtil.destroy(self.id);
        self.mediator.remove(self);
      }
    }

    var changeState = function(state){
      states[state]();
    };
    return {
      changeState : changeState
    };
  }

  // 信号系统
  Spaceship.prototype.signalManager = function(){
    var self = this;
    return {
      receive: function(msg,from){
        if(self.currState != msg.cmd && self.id == msg.id){
          self.stateManager().changeState(msg.cmd);
        }
      }
    }
  }

  // 指挥官
  var Commander = function(){
    this.id = "Don";
    this.msgs = [];
    this.mediator = null;
  }

  Commander.prototype.send = function(msg){
    this.mediator.send(msg);
    this.msgs.push(msg);
  }

  // 中转系统
  var Mediator = function(){
    var spaceships = [];
    var commander = null;

    return {
      register: function(obj){
        if( obj instanceof Commander){
          this.commander = obj;
          obj.mediator = this;
          return true;
        }
        if( obj instanceof Spaceship){
          spaceships[obj.id] = obj;
          obj.mediator = this;
          return true;
        }
      },
      send: function(msg,from,to){
        var self = this;
        setTimeout(function(){
          var success = Math.random() > 0.3 ? true: false;
          if(success) {

          }
        })
      },
      remove: function(obj){
        if(obj instanceof Spaceship){
          spaceships[obj.id] = undefined;
          delete obj;
          return true;
        }
      },
      create: function(msg){
        if(spaceships[msg.id] !== undefined ){
          return false;
        }
        var spaceships = new Spaceship(msg.id);
        this.register(spaceships);
        AnimUtil.create(msg.id,spaceships.power);
      },
      getSpaceships: function(){
        return spaceships;
      }
    }
  }

  var Message = function(target,command){
    this.id = target;
    this.cmd = null;
    switch(command) {
      case "launch":
      case "stop":
      case "fly":
      case "destroy":
        this.cmd = command;
        break;
      default:
        alert("invalid command");
    }
  }

  var buttonHandler = function(commander){
    var id = null;
    var cmd = null;
  }

  var AnimUtil = (function(){
    var mediator = null;
    return {
      create: function(id,power){ 
      },
      fly: function(id,deg){
      },
      stop: function(id){
      },
      updatePower: function(id,power){
      },
      destroy: function(id){

      }
    }
  })

  // 控制台工具
  var ConsoleUtil = (function(){
    var consoleLog = $("#console ul");
    var show = function(msg){
      var msg.text(msg);
      consoleLog.propend(msg);
    }
  })

  window.onload = function(){
    var command = new Commander();
    var mediator = new Mediator();
    mediator.register(commander);
    buttonHandler(commander);
  }
})()