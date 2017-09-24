class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
       if (!config) throw new Error();
         else {this.config=config;
               this.state=this.config.initial;
               this.history=[];
               this.z=0;
               this.max=0;
               this.history[this.z]=this.state;
         }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state; 
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
       if (!(state in this.config.states)) {throw new Error();}
       else {this.state=state;
             this.z=this.z+1;
             this.max=this.z;
             this.history[this.z]=this.state;           
       }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!(event in this.config.states[this.state].transitions)) {
            throw new Error();}
       else {
            this.state=this.config.states[this.state].transitions[event];
            this.z=this.z+1;
            this.max=this.z;
            this.history[this.z]=this.state;
       }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state=this.config.initial;
        this.history=[];
        this.z=0;
        this.max=0;
        this.history[this.z]=this.state;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
              var p=this.dump(this.config.states, "this.config.states");
              return p;
           } 
           else {
               var p1=[];
               var k=0;
               var p=this.dump(this.config.states, "this.config.states");
               for (var i=0; i<p.length; i++) {
                   if (event in this.config.states[p[i]].transitions) {
                         p1[k]=p[i];
                         k=k+1;
                   }     
               }
           return p1;
           }
    } 
    

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.z==0) return false;
          if (this.z!=0) {
               this.z=this.z-1;
               this.state=this.history[this.z];
               return true;
          }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.max>this.z) {
                this.z=this.z+1;
                this.state=this.history[this.z];
                return true;
           } 
           if (this.z==this.max) return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state=this.config.initial;
        this.history=[];
        this.z=0;
        this.max=0;
        this.history[this.z]=this.state;
    }
    
    dump(obj, obj_name) {
       var result=[];
       var j=0;
       for (var i in obj) {
           result[j] = ""+ i;
           j=j+1;
       }
       return result;
     } 
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
