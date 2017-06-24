/*! remote_diagnostics_prod - v1.0.0 - 2017-06-23 */
var Speech=function(undefined){function Speech(options){if(this.options={debugging:!1,continuous:!1,interimResults:!1,autoRestart:!1},"[object Object]"===Object.prototype.toString.call(options))for(var op in options)this.options[op]=options[op];this.active=!1,this.manualStopped=!1,this.history=[],this.lastIndex=-1,this.lastResult="",this.recognition=new webkitSpeechRecognition;var rec=this.recognition,self=this;rec.continuous=self.options.continuous,rec.interimResults=self.options.interimResults,options.lang&&(rec.lang=options.lang),rec.onstart=function(){self.active=!0,this.manualStopped=!1,self.emit("start")},rec.onresult=function(e){if(e.results&&e.results.length){var updatedResult=e.results[e.resultIndex],transcript=updatedResult[0].transcript.replace(/^\s*/,"");e.resultIndex!==self.lastIndex&&(self.lastIndex=e.resultIndex,self.lastResult=""),(transcript!==self.lastResult||updatedResult.isFinal)&&(transcript.length<self.lastResult.length||(self.lastResult=transcript,updatedResult.isFinal?(self.history.push(transcript),self.emit("finalResult",transcript)):self.emit("interimResult",transcript),self.options.debugging&&console.log(transcript+(updatedResult.isFinal?" (final)":""))))}},rec.onerror=function(e){self.emit("error",e)},rec.onend=function(){self.active=!1,self.history=[],self.lastIndex=-1,self.lastResult="",self.emit("end"),self.options.autoRestart&&!self.manualStopped&&self.start()}}var eventSplitter=/\s+/,Events=function(){};return Events.prototype.on=function(events,callback,context){var cache,event,list;if(!callback)return this;for(cache=this.__events||(this.__events={}),events=events.split(eventSplitter);event=events.shift();)list=cache[event]||(cache[event]=[]),list.push(callback,context);return this},Events.prototype.off=function(events,callback,context){var cache,event,list,i;if(!(cache=this.__events))return this;if(!(events||callback||context))return delete this.__events,this;for(events=events?events.split(eventSplitter):Object.keys(cache);event=events.shift();)if(list=cache[event])if(callback||context)for(i=list.length-2;i>=0;i-=2)callback&&list[i]!==callback||context&&list[i+1]!==context||list.splice(i,2);else delete cache[event];return this},Events.prototype.emit=function(events){var cache,event,all,list,i,len,args,rest=[];if(!(cache=this.__events))return this;for(events=events.split(eventSplitter),i=1,len=arguments.length;i<len;i++)rest[i-1]=arguments[i];for(;event=events.shift();){if((all=cache.all)&&(all=all.slice()),(list=cache[event])&&(list=list.slice()),list)for(i=0,len=list.length;i<len;i+=2)list[i].apply(list[i+1]||this,rest);if(all)for(args=[event].concat(rest),i=0,len=all.length;i<len;i+=2)all[i].apply(all[i+1]||this,args)}return this},Events.mixTo=function(receiver){receiver=receiver.prototype||receiver;var proto=Events.prototype;for(var p in proto)proto.hasOwnProperty(p)&&(receiver[p]=proto[p])},Speech.prototype.start=function(){this.active||this.recognition.start()},Speech.prototype.stop=function(){this.active&&(this.manualStopped=!0,this.recognition.stop())},Events.mixTo(Speech),Speech}();module&&module.exports&&(module.exports=Speech);
//# sourceMappingURL=speech.js.map