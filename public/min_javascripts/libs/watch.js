/*! Wireless_Car_Control - v1.0.0 - 2017-06-26 */
"use strict";!function(factory){"object"==typeof exports?module.exports=factory():"function"==typeof define&&define.amd?define(factory):(window.WatchJS=factory(),window.watch=window.WatchJS.watch,window.unwatch=window.WatchJS.unwatch,window.callWatchers=window.WatchJS.callWatchers)}(function(){var defineWatcher,unwatchOne,callWatchers,WatchJS={noMore:!1},isFunction=function(functionToCheck){var getType={};return functionToCheck&&"[object Function]"==getType.toString.call(functionToCheck)},isInt=function(x){return x%1===0},isArray=function(obj){return"[object Array]"===Object.prototype.toString.call(obj)},isModernBrowser=function(){return Object.defineProperty||Object.prototype.__defineGetter__},defineGetAndSet=function(obj,propName,getter,setter){try{Object.defineProperty(obj,propName,{get:getter,set:setter,enumerable:!0,configurable:!0})}catch(error){try{Object.prototype.__defineGetter__.call(obj,propName,getter),Object.prototype.__defineSetter__.call(obj,propName,setter)}catch(error2){throw"watchJS error: browser not supported :/"}}},defineProp=function(obj,propName,value){try{Object.defineProperty(obj,propName,{enumerable:!1,configurable:!0,writable:!1,value:value})}catch(error){obj[propName]=value}},watch=function(){isFunction(arguments[1])?watchAll.apply(this,arguments):isArray(arguments[1])?watchMany.apply(this,arguments):watchOne.apply(this,arguments)},watchAll=function(obj,watcher,level){if(!(obj instanceof String)&&(obj instanceof Object||isArray(obj))){var props=[];if(isArray(obj))for(var prop=0;prop<obj.length;prop++)props.push(prop);else for(var prop2 in obj)props.push(prop2);watchMany(obj,props,watcher,level)}},watchMany=function(obj,props,watcher,level){for(var prop in props)watchOne(obj,props[prop],watcher,level)},watchOne=function(obj,prop,watcher,level){isFunction(obj[prop])||(null!=obj[prop]&&(void 0===level||level>0)&&(void 0!==level&&level--,watchAll(obj[prop],watcher,level)),defineWatcher(obj,prop,watcher))},unwatch=function(){isFunction(arguments[1])?unwatchAll.apply(this,arguments):isArray(arguments[1])?unwatchMany.apply(this,arguments):unwatchOne.apply(this,arguments)},unwatchAll=function(obj,watcher){if(!(obj instanceof String)&&(obj instanceof Object||isArray(obj))){var props=[];if(isArray(obj))for(var prop=0;prop<obj.length;prop++)props.push(prop);else for(var prop2 in obj)props.push(prop2);unwatchMany(obj,props,watcher)}},unwatchMany=function(obj,props,watcher){for(var prop2 in props)unwatchOne(obj,props[prop2],watcher)};if(isModernBrowser()){defineWatcher=function(obj,prop,watcher){var val=obj[prop];watchFunctions(obj,prop),obj.watchers||defineProp(obj,"watchers",{}),obj.watchers[prop]||(obj.watchers[prop]=[]),obj.watchers[prop].push(watcher);var getter=function(){return val},setter=function(newval){var oldval=val;val=newval,obj[prop]&&watchAll(obj[prop],watcher),watchFunctions(obj,prop),WatchJS.noMore||JSON.stringify(oldval)!==JSON.stringify(newval)&&(callWatchers(obj,prop,"set",newval,oldval),WatchJS.noMore=!1)};defineGetAndSet(obj,prop,getter,setter)},callWatchers=function(obj,prop,action,newval,oldval){for(var wr in obj.watchers[prop])isInt(wr)&&obj.watchers[prop][wr].call(obj,prop,action,newval,oldval)};var methodNames=["pop","push","reverse","shift","sort","slice","unshift"],defineArrayMethodWatcher=function(obj,prop,original,methodName){defineProp(obj[prop],methodName,function(){var response=original.apply(obj[prop],arguments);return watchOne(obj,obj[prop]),"slice"!==methodName&&callWatchers(obj,prop,methodName,arguments),response})},watchFunctions=function(obj,prop){if(obj[prop]&&!(obj[prop]instanceof String)&&isArray(obj[prop]))for(var methodName,i=methodNames.length;i--;)methodName=methodNames[i],defineArrayMethodWatcher(obj,prop,obj[prop][methodName],methodName)};unwatchOne=function(obj,prop,watcher){for(var i in obj.watchers[prop]){var w=obj.watchers[prop][i];w==watcher&&obj.watchers[prop].splice(i,1)}}}else{var subjects=[];defineWatcher=function(obj,prop,watcher){subjects.push({obj:obj,prop:prop,serialized:JSON.stringify(obj[prop]),watcher:watcher})},unwatchOne=function(obj,prop,watcher){for(var i in subjects){var subj=subjects[i];subj.obj==obj&&subj.prop==prop&&subj.watcher==watcher&&subjects.splice(i,1)}},callWatchers=function(obj,prop,action,value){for(var i in subjects){var subj=subjects[i];subj.obj==obj&&subj.prop==prop&&subj.watcher.call(obj,prop,action,value)}};var loop=function(){for(var i in subjects){var subj=subjects[i],newSer=JSON.stringify(subj.obj[subj.prop]);newSer!=subj.serialized&&(subj.watcher.call(subj.obj,subj.prop,subj.obj[subj.prop],JSON.parse(subj.serialized)),subj.serialized=newSer)}};setInterval(loop,50)}return WatchJS.watch=watch,WatchJS.unwatch=unwatch,WatchJS.callWatchers=callWatchers,WatchJS});
//# sourceMappingURL=watch.js.map