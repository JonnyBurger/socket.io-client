!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.io=e():t.io=e()}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){function o(t,e){"object"==typeof t&&(e=t,t=void 0),e=e||{};var n,o=r(t),i=o.source,a=o.id,p=o.path,h=c[a]&&p in c[a].nsps,u=e.forceNew||e["force new connection"]||!1===e.multiplex||h;return u?n=s(i,e):(c[a]||(c[a]=s(i,e)),n=c[a]),o.query&&!e.query&&(e.query=o.query),n.socket(o.path,e)}var r=n(1),i=n(4),s=n(9);n(3)("socket.io-client");t.exports=e=o;var c=e.managers={};e.protocol=i.protocol,e.connect=o,e.Manager=n(9),e.Socket=n(25)},function(t,e,n){function o(t,e){var n=t;e=e||"undefined"!=typeof location&&location,null==t&&(t=e.protocol+"//"+e.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?e.protocol+t:e.host+t),/^(https?|wss?):\/\//.test(t)||(t="undefined"!=typeof e?e.protocol+"//"+t:"https://"+t),n=r(t)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";var o=n.host.indexOf(":")!==-1,i=o?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+i+":"+n.port,n.href=n.protocol+"://"+i+(e&&e.port===n.port?"":":"+n.port),n}var r=n(2);n(3)("socket.io-client:url");t.exports=o},function(t,e){var n=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,o=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(t){var e=t,r=t.indexOf("["),i=t.indexOf("]");r!=-1&&i!=-1&&(t=t.substring(0,r)+t.substring(r,i).replace(/:/g,";")+t.substring(i,t.length));for(var s=n.exec(t||""),c={},a=14;a--;)c[o[a]]=s[a]||"";return r!=-1&&i!=-1&&(c.source=e,c.host=c.host.substring(1,c.host.length-1).replace(/;/g,":"),c.authority=c.authority.replace("[","").replace("]","").replace(/;/g,":"),c.ipv6uri=!0),c}},function(t,e){t.exports=function(){return function(){}}},function(t,e,n){function o(){}function r(t){var n=""+t.type;if(e.BINARY_EVENT!==t.type&&e.BINARY_ACK!==t.type||(n+=t.attachments+"-"),t.nsp&&"/"!==t.nsp&&(n+=t.nsp+","),null!=t.id&&(n+=t.id),null!=t.data){var o=i(t.data);if(o===!1)return m;n+=o}return n}function i(t){try{return JSON.stringify(t)}catch(t){return!1}}function s(t,e){function n(t){var n=l.deconstructPacket(t),o=r(n.packet),i=n.buffers;i.unshift(o),e(i)}l.removeBlobs(t,n)}function c(){this.reconstructor=null}function a(t){var n=0,o={type:Number(t.charAt(0))};if(null==e.types[o.type])return u("unknown packet type "+o.type);if(e.BINARY_EVENT===o.type||e.BINARY_ACK===o.type){for(var r="";"-"!==t.charAt(++n)&&(r+=t.charAt(n),n!=t.length););if(r!=Number(r)||"-"!==t.charAt(n))throw new Error("Illegal attachments");o.attachments=Number(r)}if("/"===t.charAt(n+1))for(o.nsp="";++n;){var i=t.charAt(n);if(","===i)break;if(o.nsp+=i,n===t.length)break}else o.nsp="/";var s=t.charAt(n+1);if(""!==s&&Number(s)==s){for(o.id="";++n;){var i=t.charAt(n);if(null==i||Number(i)!=i){--n;break}if(o.id+=t.charAt(n),n===t.length)break}o.id=Number(o.id)}if(t.charAt(++n)){var c=p(t.substr(n)),a=c!==!1&&(o.type===e.ERROR||d(c));if(!a)return u("invalid payload");o.data=c}return o}function p(t){try{return JSON.parse(t)}catch(t){return!1}}function h(t){this.reconPack=t,this.buffers=[]}function u(t){return{type:e.ERROR,data:"parser error: "+t}}var f=(n(3)("socket.io-parser"),n(5)),l=n(6),d=n(7),y=n(8);e.protocol=4,e.types=["CONNECT","DISCONNECT","EVENT","ACK","ERROR","BINARY_EVENT","BINARY_ACK"],e.CONNECT=0,e.DISCONNECT=1,e.EVENT=2,e.ACK=3,e.ERROR=4,e.BINARY_EVENT=5,e.BINARY_ACK=6,e.Encoder=o,e.Decoder=c;var m=e.ERROR+'"encode error"';o.prototype.encode=function(t,n){if(e.BINARY_EVENT===t.type||e.BINARY_ACK===t.type)s(t,n);else{var o=r(t);n([o])}},f(c.prototype),c.prototype.add=function(t){var n;if("string"==typeof t)n=a(t),e.BINARY_EVENT===n.type||e.BINARY_ACK===n.type?(this.reconstructor=new h(n),0===this.reconstructor.reconPack.attachments&&this.emit("decoded",n)):this.emit("decoded",n);else{if(!y(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");n=this.reconstructor.takeBinaryData(t),n&&(this.reconstructor=null,this.emit("decoded",n))}},c.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()},h.prototype.takeBinaryData=function(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){var e=l.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null},h.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]}},function(t,e,n){function o(t){if(t)return r(t)}function r(t){for(var e in o.prototype)t[e]=o.prototype[e];return t}t.exports=o,o.prototype.on=o.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},o.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},o.prototype.off=o.prototype.removeListener=o.prototype.removeAllListeners=o.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var o,r=0;r<n.length;r++)if(o=n[r],o===e||o.fn===e){n.splice(r,1);break}return this},o.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks["$"+t];if(n){n=n.slice(0);for(var o=0,r=n.length;o<r;++o)n[o].apply(this,e)}return this},o.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},o.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e,n){function o(t,e){if(!t)return t;if(s(t)){var n={_placeholder:!0,num:e.length};return e.push(t),n}if(i(t)){for(var r=new Array(t.length),c=0;c<t.length;c++)r[c]=o(t[c],e);return r}if("object"==typeof t&&!(t instanceof Date)){var r={};for(var a in t)r[a]=o(t[a],e);return r}return t}function r(t,e){if(!t)return t;if(t&&t._placeholder)return e[t.num];if(i(t))for(var n=0;n<t.length;n++)t[n]=r(t[n],e);else if("object"==typeof t)for(var o in t)t[o]=r(t[o],e);return t}var i=n(7),s=n(8),c=Object.prototype.toString,a="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===c.call(Blob),p="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===c.call(File);e.deconstructPacket=function(t){var e=[],n=t.data,r=t;return r.data=o(n,e),r.attachments=e.length,{packet:r,buffers:e}},e.reconstructPacket=function(t,e){return t.data=r(t.data,e),t.attachments=void 0,t},e.removeBlobs=function(t,e){function n(t,c,h){if(!t)return t;if(a&&t instanceof Blob||p&&t instanceof File){o++;var u=new FileReader;u.onload=function(){h?h[c]=this.result:r=this.result,--o||e(r)},u.readAsArrayBuffer(t)}else if(i(t))for(var f=0;f<t.length;f++)n(t[f],f,t);else if("object"==typeof t&&!s(t))for(var l in t)n(t[l],l,t)}var o=0,r=t;n(r),o||e(r)}},function(t,e){var n={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},function(t,e){function n(t){return o&&Buffer.isBuffer(t)||r&&(t instanceof ArrayBuffer||i(t))}t.exports=n;var o="function"==typeof Buffer&&"function"==typeof Buffer.isBuffer,r="function"==typeof ArrayBuffer,i=function(t){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer}},function(t,e,n){function o(t,e){if(!(this instanceof o))return new o(t,e);t&&"object"==typeof t&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.nsps={},this.subs=[],this.opts=e,this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor(e.randomizationFactor||.5),this.backoff=new h({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==e.timeout?2e4:e.timeout),this.readyState="closed",this.uri=t,this.connecting=[],this.lastPing=null,this.encoding=!1,this.packetBuffer=[];var n=e.parser||c;this.encoder=new n.Encoder,this.decoder=new n.Decoder,this.autoConnect=e.autoConnect!==!1,this.autoConnect&&this.open()}var r=n(10),i=n(25),s=n(5),c=n(4),a=n(27),p=n(28),h=n(29),u=Object.prototype.hasOwnProperty;t.exports=o,o.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var t in this.nsps)u.call(this.nsps,t)&&this.nsps[t].emit.apply(this.nsps[t],arguments)},o.prototype.updateSocketIds=function(){for(var t in this.nsps)u.call(this.nsps,t)&&(this.nsps[t].id=this.generateId(t))},o.prototype.generateId=function(t){return("/"===t?"":t+"#")+this.engine.id},s(o.prototype),o.prototype.reconnection=function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection},o.prototype.reconnectionAttempts=function(t){return arguments.length?(this._reconnectionAttempts=t,this):this._reconnectionAttempts},o.prototype.reconnectionDelay=function(t){return arguments.length?(this._reconnectionDelay=t,this.backoff&&this.backoff.setMin(t),this):this._reconnectionDelay},o.prototype.randomizationFactor=function(t){return arguments.length?(this._randomizationFactor=t,this.backoff&&this.backoff.setJitter(t),this):this._randomizationFactor},o.prototype.reconnectionDelayMax=function(t){return arguments.length?(this._reconnectionDelayMax=t,this.backoff&&this.backoff.setMax(t),this):this._reconnectionDelayMax},o.prototype.timeout=function(t){return arguments.length?(this._timeout=t,this):this._timeout},o.prototype.maybeReconnectOnOpen=function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()},o.prototype.open=o.prototype.connect=function(t,e){if(~this.readyState.indexOf("open"))return this;this.engine=r(this.uri,this.opts);var n=this.engine,o=this;this.readyState="opening",this.skipReconnect=!1;var i=a(n,"open",function(){o.onopen(),t&&t()}),s=a(n,"error",function(e){if(o.cleanup(),o.readyState="closed",o.emitAll("connect_error",e),t){var n=new Error("Connection error");n.data=e,t(n)}else o.maybeReconnectOnOpen()});if(!1!==this._timeout){var c=this._timeout,p=setTimeout(function(){i.destroy(),n.close(),n.emit("error","timeout"),o.emitAll("connect_timeout",c)},c);this.subs.push({destroy:function(){clearTimeout(p)}})}return this.subs.push(i),this.subs.push(s),this},o.prototype.onopen=function(){this.cleanup(),this.readyState="open",this.emit("open");var t=this.engine;this.subs.push(a(t,"data",p(this,"ondata"))),this.subs.push(a(t,"ping",p(this,"onping"))),this.subs.push(a(t,"pong",p(this,"onpong"))),this.subs.push(a(t,"error",p(this,"onerror"))),this.subs.push(a(t,"close",p(this,"onclose"))),this.subs.push(a(this.decoder,"decoded",p(this,"ondecoded")))},o.prototype.onping=function(){this.lastPing=new Date,this.emitAll("ping")},o.prototype.onpong=function(){this.emitAll("pong",new Date-this.lastPing)},o.prototype.ondata=function(t){this.decoder.add(t)},o.prototype.ondecoded=function(t){this.emit("packet",t)},o.prototype.onerror=function(t){this.emitAll("error",t)},o.prototype.socket=function(t,e){function n(){~r.connecting.indexOf(o)||r.connecting.push(o)}var o=this.nsps[t];if(!o){o=new i(this,t,e),this.nsps[t]=o;var r=this;o.on("connecting",n),o.on("connect",function(){o.id=r.generateId(t)}),this.autoConnect&&n()}return o},o.prototype.destroy=function(t){var e=this.connecting.indexOf(t);~e&&this.connecting.splice(e,1),this.connecting.length||this.close()},o.prototype.packet=function(t){var e=this;t.query&&0===t.type&&(t.nsp+="?"+t.query),e.encoding?e.packetBuffer.push(t):(e.encoding=!0,this.encoder.encode(t,function(n){for(var o=0;o<n.length;o++)e.engine.write(n[o],t.options);e.encoding=!1,e.processPacketQueue()}))},o.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var t=this.packetBuffer.shift();this.packet(t)}},o.prototype.cleanup=function(){for(var t=this.subs.length,e=0;e<t;e++){var n=this.subs.shift();n.destroy()}this.packetBuffer=[],this.encoding=!1,this.lastPing=null,this.decoder.destroy()},o.prototype.close=o.prototype.disconnect=function(){this.skipReconnect=!0,this.reconnecting=!1,"opening"===this.readyState&&this.cleanup(),this.backoff.reset(),this.readyState="closed",this.engine&&this.engine.close()},o.prototype.onclose=function(t){this.cleanup(),this.backoff.reset(),this.readyState="closed",this.emit("close",t),this._reconnection&&!this.skipReconnect&&this.reconnect()},o.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var t=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var e=this.backoff.duration();this.reconnecting=!0;var n=setTimeout(function(){t.skipReconnect||(t.emitAll("reconnect_attempt",t.backoff.attempts),t.emitAll("reconnecting",t.backoff.attempts),t.skipReconnect||t.open(function(e){e?(t.reconnecting=!1,t.reconnect(),t.emitAll("reconnect_error",e.data)):t.onreconnect()}))},e);this.subs.push({destroy:function(){clearTimeout(n)}})}},o.prototype.onreconnect=function(){var t=this.backoff.attempts;this.reconnecting=!1,this.backoff.reset(),this.updateSocketIds(),this.emitAll("reconnect",t)}},function(t,e,n){t.exports=n(11),t.exports.parser=n(15)},function(t,e,n){function o(t,e){return this instanceof o?(e=e||{},t&&"object"==typeof t&&(e=t,t=null),t?(t=a(t),e.hostname=t.host,e.secure="https"===t.protocol||"wss"===t.protocol,e.port=t.port,t.query&&(e.query=t.query)):e.host&&(e.hostname=a(e.host).host),this.secure=null!=e.secure?e.secure:"undefined"!=typeof location&&"https:"===location.protocol,e.hostname&&!e.port&&(e.port=this.secure?"443":"80"),this.hostname=e.hostname||("undefined"!=typeof location?location.hostname:"localhost"),this.port=e.port||("undefined"!=typeof location&&location.port?location.port:this.secure?443:80),this.query=e.query||{},"string"==typeof this.query&&(this.query=p.decode(this.query)),this.upgrade=!1!==e.upgrade,this.path=(e.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!e.forceJSONP,this.jsonp=!1!==e.jsonp,this.forceBase64=!!e.forceBase64,this.enablesXDR=!!e.enablesXDR,this.withCredentials=!1!==e.withCredentials,this.timestampParam=e.timestampParam||"t",this.timestampRequests=e.timestampRequests,this.transports=e.transports||["websocket"],this.transportOptions=e.transportOptions||{},this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.policyPort=e.policyPort||843,this.rememberUpgrade=e.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=e.onlyBinaryUpgrades,this.ca=e.ca||null,this.forceNode=!!e.forceNode,this.isReactNative="undefined"!=typeof navigator&&"string"==typeof navigator.product&&"reactnative"===navigator.product.toLowerCase(),("undefined"==typeof self||this.isReactNative)&&(e.extraHeaders&&Object.keys(e.extraHeaders).length>0&&(this.extraHeaders=e.extraHeaders),e.localAddress&&(this.localAddress=e.localAddress)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingIntervalTimer=null,this.pingTimeoutTimer=null,void this.open()):new o(t,e)}function r(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}var i=n(12),s=n(5),c=n(15),a=n(2),p=n(21);t.exports=o,o.priorWebsocketSuccess=!1,s(o.prototype),o.protocol=c.protocol,o.Socket=o,o.Transport=n(14),o.transports=n(12),o.parser=n(15),o.prototype.createTransport=function(t){var e=r(this.query);e.EIO=c.protocol,e.transport=t;var n=this.transportOptions[t]||{};this.id&&(e.sid=this.id);var o=new i[t]({query:e,socket:this,hostname:n.hostname||this.hostname,port:n.port||this.port,secure:n.secure||this.secure,path:n.path||this.path,forceJSONP:n.forceJSONP||this.forceJSONP,jsonp:n.jsonp||this.jsonp,forceBase64:n.forceBase64||this.forceBase64,enablesXDR:n.enablesXDR||this.enablesXDR,withCredentials:n.withCredentials||this.withCredentials,timestampRequests:n.timestampRequests||this.timestampRequests,timestampParam:n.timestampParam||this.timestampParam,policyPort:n.policyPort||this.policyPort,extraHeaders:n.extraHeaders||this.extraHeaders,forceNode:n.forceNode||this.forceNode,localAddress:n.localAddress||this.localAddress,requestTimeout:n.requestTimeout||this.requestTimeout,protocols:n.protocols||void 0,isReactNative:this.isReactNative});return o},o.prototype.open=function(){var t;if(this.rememberUpgrade&&o.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)t="websocket";else{if(0===this.transports.length){var e=this;return void setTimeout(function(){e.emit("error","No transports available")},0)}t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(t){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)},o.prototype.setTransport=function(t){var e=this;this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",function(){e.onDrain()}).on("packet",function(t){e.onPacket(t)}).on("error",function(t){e.onError(t)}).on("close",function(){e.onClose("transport close")})},o.prototype.probe=function(t){function e(){if(u.onlyBinaryUpgrades){var t=!this.supportsBinary&&u.transport.supportsBinary;h=h||t}h||(p.send([{type:"ping",data:"probe"}]),p.once("packet",function(t){if(!h)if("pong"===t.type&&"probe"===t.data){if(u.upgrading=!0,u.emit("upgrading",p),!p)return;o.priorWebsocketSuccess="websocket"===p.name,u.transport.pause(function(){h||"closed"!==u.readyState&&(a(),u.setTransport(p),p.send([{type:"upgrade"}]),u.emit("upgrade",p),p=null,u.upgrading=!1,u.flush())})}else{var e=new Error("probe error");e.transport=p.name,u.emit("upgradeError",e)}}))}function n(){h||(h=!0,a(),p.close(),p=null)}function r(t){var e=new Error("probe error: "+t);e.transport=p.name,n(),u.emit("upgradeError",e)}function i(){r("transport closed")}function s(){r("socket closed")}function c(t){p&&t.name!==p.name&&n()}function a(){p.removeListener("open",e),p.removeListener("error",r),p.removeListener("close",i),u.removeListener("close",s),u.removeListener("upgrading",c)}var p=this.createTransport(t,{probe:1}),h=!1,u=this;o.priorWebsocketSuccess=!1,p.once("open",e),p.once("error",r),p.once("close",i),this.once("close",s),this.once("upgrading",c),p.open()},o.prototype.onOpen=function(){if(this.readyState="open",o.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.upgrade&&this.transport.pause)for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])},o.prototype.onPacket=function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emit("data",t.data),this.emit("message",t.data)}},o.prototype.onHandshake=function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!==this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},o.prototype.onHeartbeat=function(t){clearTimeout(this.pingTimeoutTimer);var e=this;e.pingTimeoutTimer=setTimeout(function(){"closed"!==e.readyState&&e.onClose("ping timeout")},t||e.pingInterval+e.pingTimeout)},o.prototype.setPing=function(){var t=this;clearTimeout(t.pingIntervalTimer),t.pingIntervalTimer=setTimeout(function(){t.ping(),t.onHeartbeat(t.pingTimeout)},t.pingInterval)},o.prototype.ping=function(){var t=this;this.sendPacket("ping",function(){t.emit("ping")})},o.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()},o.prototype.flush=function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},o.prototype.write=o.prototype.send=function(t,e,n){return this.sendPacket("message",t,e,n),this},o.prototype.sendPacket=function(t,e,n,o){if("function"==typeof e&&(o=e,e=void 0),"function"==typeof n&&(o=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){n=n||{},n.compress=!1!==n.compress;var r={type:t,data:e,options:n};this.emit("packetCreate",r),this.writeBuffer.push(r),o&&this.once("flush",o),this.flush()}},o.prototype.close=function(){function t(){o.onClose("forced close"),o.transport.close()}function e(){o.removeListener("upgrade",e),o.removeListener("upgradeError",e),t()}function n(){o.once("upgrade",e),o.once("upgradeError",e)}if("opening"===this.readyState||"open"===this.readyState){this.readyState="closing";var o=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?n():t()}):this.upgrading?n():t()}return this},o.prototype.onError=function(t){o.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t)},o.prototype.onClose=function(t,e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){var n=this;clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",t,e),n.writeBuffer=[],n.prevBufferLen=0}},o.prototype.filterUpgrades=function(t){for(var e=[],n=0,o=t.length;n<o;n++)~this.transports.indexOf(t[n])&&e.push(t[n]);return e}},function(t,e,n){var o=n(13);e.websocket=o},function(t,e,n){function o(t){var e=t&&t.forceBase64;e&&(this.supportsBinary=!1),this.usingBrowserWebSocket=r&&!t.forceNode,this.protocols=t.protocols,this.usingBrowserWebSocket||(u=i),s.call(this,t)}var r,i,s=n(14),c=n(15),a=n(21),p=n(22),h=n(23);if("undefined"!=typeof WebSocket?r=WebSocket:"undefined"!=typeof self&&(r=self.WebSocket||self.MozWebSocket),"undefined"==typeof window)try{i=n(24)}catch(t){}var u=r||i;t.exports=o,p(o,s),o.prototype.name="websocket",o.prototype.supportsBinary=!0,o.prototype.doOpen=function(){if(this.check()){var t=this.uri(),e=this.protocols,n={};this.extraHeaders&&(n.headers=this.extraHeaders),this.localAddress&&(n.localAddress=this.localAddress);try{this.ws=this.usingBrowserWebSocket&&!this.isReactNative?e?new u(t,e):new u(t):new u(t,e,n)}catch(t){return this.emit("error",t)}void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="nodebuffer"):this.ws.binaryType="arraybuffer",this.addEventListeners()}},o.prototype.addEventListeners=function(){var t=this;this.ws.onopen=function(){t.onOpen()},this.ws.onclose=function(){t.onClose()},this.ws.onmessage=function(e){t.onData(e.data)},this.ws.onerror=function(e){t.onError("websocket error",e)}},o.prototype.write=function(t){function e(){n.emit("flush"),setTimeout(function(){n.writable=!0,n.emit("drain")},0)}var n=this;this.writable=!1;for(var o=t.length,r=0,i=o;r<i;r++)!function(t){c.encodePacket(t,n.supportsBinary,function(r){if(!n.usingBrowserWebSocket){var i={};if(t.options&&(i.compress=t.options.compress),n.perMessageDeflate){var s="string"==typeof r?Buffer.byteLength(r):r.length;s<n.perMessageDeflate.threshold&&(i.compress=!1)}}try{n.usingBrowserWebSocket?n.ws.send(r):n.ws.send(r,i)}catch(t){}--o||e()})}(t[r])},o.prototype.onClose=function(){s.prototype.onClose.call(this)},o.prototype.doClose=function(){"undefined"!=typeof this.ws&&this.ws.close()},o.prototype.uri=function(){var t=this.query||{},e=this.secure?"wss":"ws",n="";this.port&&("wss"===e&&443!==Number(this.port)||"ws"===e&&80!==Number(this.port))&&(n=":"+this.port),this.timestampRequests&&(t[this.timestampParam]=h()),this.supportsBinary||(t.b64=1),t=a.encode(t),t.length&&(t="?"+t);var o=this.hostname.indexOf(":")!==-1;return e+"://"+(o?"["+this.hostname+"]":this.hostname)+n+this.path+t},o.prototype.check=function(){return!(!u||"__initialize"in u&&this.name===o.prototype.name)}},function(t,e,n){function o(t){this.path=t.path,this.hostname=t.hostname,this.port=t.port,this.secure=t.secure,this.query=t.query,this.timestampParam=t.timestampParam,this.timestampRequests=t.timestampRequests,this.readyState="",this.agent=t.agent||!1,this.socket=t.socket,this.enablesXDR=t.enablesXDR,this.withCredentials=t.withCredentials,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.forceNode=t.forceNode,this.isReactNative=t.isReactNative,this.extraHeaders=t.extraHeaders,this.localAddress=t.localAddress}var r=n(15),i=n(5);t.exports=o,i(o.prototype),o.prototype.onError=function(t,e){var n=new Error(t);return n.type="TransportError",n.description=e,this.emit("error",n),this},o.prototype.open=function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this},o.prototype.close=function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this},o.prototype.send=function(t){if("open"!==this.readyState)throw new Error("Transport not open");this.write(t)},o.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},o.prototype.onData=function(t){var e=r.decodePacket(t,this.socket.binaryType);this.onPacket(e)},o.prototype.onPacket=function(t){this.emit("packet",t)},o.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},function(t,e,n){function o(t){try{t=p.decode(t,{strict:!1})}catch(t){return!1}return t}function r(t,e,n){for(var o=new Array(t.length),r=a(t.length,n),i=function(t,n,r){e(n,function(e,n){o[t]=n,r(e,o)})},s=0;s<t.length;s++)i(s,t[s],r)}var i=n(16),s=n(17),c=n(18),a=n(19),p=n(20);e.protocol=3;var h=e.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},u=i(h),f={type:"error",data:"parser error"};e.encodePacket=function(t,e,n,o){"function"==typeof e&&(o=e,e=!1),"function"==typeof n&&(o=n,n=null);var r=(void 0===t.data?void 0:t.data.buffer||t.data,h[t.type]);return void 0!==t.data&&(r+=n?p.encode(String(t.data),{strict:!1}):String(t.data)),o(""+r)},e.decodePacket=function(t,e,n){if(void 0===t)return f;if("string"==typeof t){if(n&&(t=o(t),t===!1))return f;var r=t.charAt(0);return Number(r)==r&&u[r]?t.length>1?{type:u[r],data:t.substring(1)}:{type:u[r]}:f}var i=new Uint8Array(t),r=i[0],s=c(t,1);return{type:u[r],data:s}},e.encodePayload=function(t,n,o){function i(t){return t.length+":"+t}function c(t,o){e.encodePacket(t,!!a&&n,!1,function(t){o(null,i(t))})}"function"==typeof n&&(o=n,n=null);var a=s(t);return t.length?void r(t,c,function(t,e){return o(e.join(""))}):o("0:")},e.decodePayload=function(t,n,o){"function"==typeof n&&(o=n,n=null);var r;if(""===t)return o(f,0,1);for(var i,s,c="",a=0,p=t.length;a<p;a++){var h=t.charAt(a);if(":"===h){if(""===c||c!=(i=Number(c)))return o(f,0,1);if(s=t.substr(a+1,i),c!=s.length)return o(f,0,1);if(s.length){if(r=e.decodePacket(s,n,!1),f.type===r.type&&f.data===r.data)return o(f,0,1);var u=o(r,a+i,p);if(!1===u)return}a+=i,c=""}else c+=h}return""!==c?o(f,0,1):void 0}},function(t,e){t.exports=Object.keys||function(t){var e=[],n=Object.prototype.hasOwnProperty;for(var o in t)n.call(t,o)&&e.push(o);return e}},function(t,e,n){function o(t){if(!t||"object"!=typeof t)return!1;if(r(t)){for(var e=0,n=t.length;e<n;e++)if(o(t[e]))return!0;return!1}if("function"==typeof Buffer&&Buffer.isBuffer&&Buffer.isBuffer(t)||"function"==typeof ArrayBuffer&&t instanceof ArrayBuffer||s&&t instanceof Blob||c&&t instanceof File)return!0;if(t.toJSON&&"function"==typeof t.toJSON&&1===arguments.length)return o(t.toJSON(),!0);for(var i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&o(t[i]))return!0;return!1}var r=n(7),i=Object.prototype.toString,s="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===i.call(Blob),c="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===i.call(File);t.exports=o},function(t,e){t.exports=function(t,e,n){var o=t.byteLength;if(e=e||0,n=n||o,t.slice)return t.slice(e,n);if(e<0&&(e+=o),n<0&&(n+=o),n>o&&(n=o),e>=o||e>=n||0===o)return new ArrayBuffer(0);for(var r=new Uint8Array(t),i=new Uint8Array(n-e),s=e,c=0;s<n;s++,c++)i[c]=r[s];return i.buffer}},function(t,e){function n(t,e,n){function r(t,o){if(r.count<=0)throw new Error("after called too many times");--r.count,t?(i=!0,e(t),e=n):0!==r.count||i||e(null,o)}var i=!1;return n=n||o,r.count=t,0===t?e():r}function o(){}t.exports=n},function(t,e){function n(t){for(var e,n,o=[],r=0,i=t.length;r<i;)e=t.charCodeAt(r++),e>=55296&&e<=56319&&r<i?(n=t.charCodeAt(r++),56320==(64512&n)?o.push(((1023&e)<<10)+(1023&n)+65536):(o.push(e),r--)):o.push(e);return o}function o(t){for(var e,n=t.length,o=-1,r="";++o<n;)e=t[o],e>65535&&(e-=65536,r+=d(e>>>10&1023|55296),e=56320|1023&e),r+=d(e);return r}function r(t,e){if(t>=55296&&t<=57343){if(e)throw Error("Lone surrogate U+"+t.toString(16).toUpperCase()+" is not a scalar value");return!1}return!0}function i(t,e){return d(t>>e&63|128)}function s(t,e){if(0==(4294967168&t))return d(t);var n="";return 0==(4294965248&t)?n=d(t>>6&31|192):0==(4294901760&t)?(r(t,e)||(t=65533),n=d(t>>12&15|224),n+=i(t,6)):0==(4292870144&t)&&(n=d(t>>18&7|240),n+=i(t,12),n+=i(t,6)),n+=d(63&t|128)}function c(t,e){e=e||{};for(var o,r=!1!==e.strict,i=n(t),c=i.length,a=-1,p="";++a<c;)o=i[a],p+=s(o,r);return p}function a(){if(l>=f)throw Error("Invalid byte index");var t=255&u[l];if(l++,128==(192&t))return 63&t;throw Error("Invalid continuation byte")}function p(t){var e,n,o,i,s;if(l>f)throw Error("Invalid byte index");if(l==f)return!1;if(e=255&u[l],l++,0==(128&e))return e;if(192==(224&e)){if(n=a(),s=(31&e)<<6|n,s>=128)return s;throw Error("Invalid continuation byte")}if(224==(240&e)){if(n=a(),o=a(),s=(15&e)<<12|n<<6|o,s>=2048)return r(s,t)?s:65533;throw Error("Invalid continuation byte")}if(240==(248&e)&&(n=a(),o=a(),i=a(),s=(7&e)<<18|n<<12|o<<6|i,s>=65536&&s<=1114111))return s;throw Error("Invalid UTF-8 detected")}function h(t,e){e=e||{};var r=!1!==e.strict;u=n(t),f=u.length,l=0;for(var i,s=[];(i=p(r))!==!1;)s.push(i);return o(s)}/*! https://mths.be/utf8js v2.1.2 by @mathias */
var u,f,l,d=String.fromCharCode;t.exports={version:"2.1.2",encode:c,decode:h}},function(t,e){e.encode=function(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e},e.decode=function(t){for(var e={},n=t.split("&"),o=0,r=n.length;o<r;o++){var i=n[o].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}},function(t,e){t.exports=function(t,e){var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},function(t,e){"use strict";function n(t){var e="";do e=s[t%c]+e,t=Math.floor(t/c);while(t>0);return e}function o(t){var e=0;for(h=0;h<t.length;h++)e=e*c+a[t.charAt(h)];return e}function r(){var t=n(+new Date);return t!==i?(p=0,i=t):t+"."+n(p++)}for(var i,s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),c=64,a={},p=0,h=0;h<c;h++)a[s[h]]=h;r.encode=n,r.decode=o,t.exports=r},function(t,e){},function(t,e,n){function o(t,e,n){this.io=t,this.nsp=e,this.json=this,this.ids=0,this.acks={},this.receiveBuffer=[],this.sendBuffer=[],this.connected=!1,this.disconnected=!0,this.flags={},n&&n.query&&(this.query=n.query),this.io.autoConnect&&this.open()}var r=n(4),i=n(5),s=n(26),c=n(27),a=n(28),p=n(21),h=n(17);t.exports=e=o;var u={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1},f=i.prototype.emit;i(o.prototype),o.prototype.subEvents=function(){if(!this.subs){var t=this.io;this.subs=[c(t,"open",a(this,"onopen")),c(t,"packet",a(this,"onpacket")),c(t,"close",a(this,"onclose"))]}},o.prototype.open=o.prototype.connect=function(){return this.connected?this:(this.subEvents(),this.io.open(),"open"===this.io.readyState&&this.onopen(),this.emit("connecting"),this)},o.prototype.send=function(){var t=s(arguments);return t.unshift("message"),this.emit.apply(this,t),this},o.prototype.emit=function(t){if(u.hasOwnProperty(t))return f.apply(this,arguments),this;var e=s(arguments),n={type:(void 0!==this.flags.binary?this.flags.binary:h(e))?r.BINARY_EVENT:r.EVENT,data:e};return n.options={},n.options.compress=!this.flags||!1!==this.flags.compress,"function"==typeof e[e.length-1]&&(this.acks[this.ids]=e.pop(),n.id=this.ids++),this.connected?this.packet(n):this.sendBuffer.push(n),this.flags={},this},o.prototype.packet=function(t){t.nsp=this.nsp,this.io.packet(t)},o.prototype.onopen=function(){if("/"!==this.nsp)if(this.query){var t="object"==typeof this.query?p.encode(this.query):this.query;this.packet({type:r.CONNECT,query:t})}else this.packet({type:r.CONNECT})},o.prototype.onclose=function(t){this.connected=!1,this.disconnected=!0,delete this.id,this.emit("disconnect",t)},o.prototype.onpacket=function(t){var e=t.nsp===this.nsp,n=t.type===r.ERROR&&"/"===t.nsp;if(e||n)switch(t.type){case r.CONNECT:this.onconnect();break;case r.EVENT:this.onevent(t);break;case r.BINARY_EVENT:this.onevent(t);break;case r.ACK:this.onack(t);break;case r.BINARY_ACK:this.onack(t);break;case r.DISCONNECT:this.ondisconnect();break;case r.ERROR:this.emit("error",t.data)}},o.prototype.onevent=function(t){var e=t.data||[];null!=t.id&&e.push(this.ack(t.id)),this.connected?f.apply(this,e):this.receiveBuffer.push(e)},o.prototype.ack=function(t){var e=this,n=!1;return function(){if(!n){n=!0;var o=s(arguments);e.packet({type:h(o)?r.BINARY_ACK:r.ACK,id:t,data:o})}}},o.prototype.onack=function(t){var e=this.acks[t.id];"function"==typeof e&&(e.apply(this,t.data),delete this.acks[t.id])},o.prototype.onconnect=function(){this.connected=!0,this.disconnected=!1,this.emit("connect"),this.emitBuffered()},o.prototype.emitBuffered=function(){var t;for(t=0;t<this.receiveBuffer.length;t++)f.apply(this,this.receiveBuffer[t]);for(this.receiveBuffer=[],t=0;t<this.sendBuffer.length;t++)this.packet(this.sendBuffer[t]);this.sendBuffer=[]},o.prototype.ondisconnect=function(){this.destroy(),this.onclose("io server disconnect")},o.prototype.destroy=function(){if(this.subs){for(var t=0;t<this.subs.length;t++)this.subs[t].destroy();this.subs=null}this.io.destroy(this)},o.prototype.close=o.prototype.disconnect=function(){return this.connected&&this.packet({type:r.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this},o.prototype.compress=function(t){return this.flags.compress=t,this},o.prototype.binary=function(t){return this.flags.binary=t,this}},function(t,e){function n(t,e){var n=[];e=e||0;for(var o=e||0;o<t.length;o++)n[o-e]=t[o];return n}t.exports=n},function(t,e){function n(t,e,n){return t.on(e,n),{destroy:function(){t.removeListener(e,n)}}}t.exports=n},function(t,e){var n=[].slice;t.exports=function(t,e){if("string"==typeof e&&(e=t[e]),"function"!=typeof e)throw new Error("bind() requires a function");var o=n.call(arguments,2);return function(){return e.apply(t,o.concat(n.call(arguments)))}}},function(t,e){function n(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}t.exports=n,n.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-n:t+n}return 0|Math.min(t,this.max)},n.prototype.reset=function(){this.attempts=0},n.prototype.setMin=function(t){this.ms=t},n.prototype.setMax=function(t){this.max=t},n.prototype.setJitter=function(t){this.jitter=t}}])});
//# sourceMappingURL=socket.io.slim.dev.js.map