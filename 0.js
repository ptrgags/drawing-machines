(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{62:function(t,e,s){"use strict";var i=s(0);class r{constructor(t,e){this.part=t,this.node_name=e}get node(){return this.part[this.node_name]}get matrix(){return this.node.getWorldMatrix()}get inverse_matrix(){return i.g.Invert(this.matrix)}get position(){return i.r.TransformCoordinates(i.r.Zero(),this.matrix)}}s.d(e,"a",(function(){return a}));let n=0;class a{static make_id(){const t=n;return n++,t}constructor(t){this.init({...this.default_parameters,...t}),this.id=`${this.part_type}-${a.make_id()}`}get part_type(){return"part"}get transform_names(){return[]}get primitive_names(){return[]}get default_parameters(){return{parent:void 0}}change_parent(t){this.parent=t}init(t){this.parent=t.parent}get parents(){return void 0!==this.parent?[this.parent.part]:[]}update(t){}build(t){}to_joint(t){return new r(this,t)}}},63:function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));class i{constructor(t){this.part_table=new Map,this.vertices=[],this.edges=new Map,this.labels=new Map,this.is_sorted=!0,this.root_part=this.init({...this.default_parameters,...t})}get machine_type(){return"machine"}get default_parameters(){return{parent:void 0}}get time_step(){return 1/60}add_edge(t,e){this.edges.has(t)||this.edges.set(t,[]),this.edges.get(t).push(e)}add_part(t,e){const s=t.id;this.vertices.push(s),this.part_table.set(s,t),this.labels.set(e,s),this.is_sorted=!1;for(let e of t.parents){const t=e.id;this.add_edge(t,s)}}add_parts(t){for(let e of t)this.add_part(e)}get_part(t){return this.part_table.get(t)}find_part(t){const e=this.labels.get(t);return this.get_part(e)}postorder(t,e,s){if(e.has(t))return;e.add(t);const i=this.edges.get(t)||[];for(let t of i)this.postorder(t,e,s);s.push(t)}get is_empty(){return 0==this.vertices.length}topological_sort(){if(this.is_empty)return;const t=new Set,e=[];for(let s of this.vertices)this.postorder(s,t,e);e.reverse(),this.vertices=e}*parts(){this.is_sorted||(this.topological_sort(),this.is_sorted=!0);for(let t of this.vertices)yield this.part_table.get(t)}init(t){}build(t){let e=void 0;for(let s of this.parts()){const i=s.build(t);void 0===e&&(e=i)}return e}update(t){for(let e of this.parts())e.update(t)}}},64:function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));var i=s(0),r=s(29),n=s(61),a=s(62);class o extends a.a{get default_parameters(){return{offset:i.r.Zero(),parent:void 0,show_offset:!1}}init(t){super.init(t),this.offset=t.offset,this.show_offset=t.show_offset}get part_type(){return"point"}get transform_names(){return["translate"]}get primitive_names(){return["line"]}make_line(t){return n.a.CreateLines(`${this.id}-line`,{points:[i.r.Zero(),this.offset.negate()]},t)}build(t){const e=new r.a(`${this.id}-translate`,t);if(e.position=this.offset,void 0!==this.parent&&(e.parent=this.parent.node),this.translate=e,this.show_offset){const s=this.make_line(t);s.parent=e,this.line=s}return e}}},65:function(t,e,s){"use strict";s.d(e,"a",(function(){return p}));var i=s(0),r=(s(29),s(61)),n=s(62),a=s(71),o=(s(77),s(68));class p extends n.a{get default_parameters(){return{source:void 0,target:void 0,origin:void 0,num_points:1e3,palette:new a.a,palette_freq:2}}init(t){this.source=Object(o.a)(t,"source"),this.target=t.target,this.origin=Object(o.a)(t,"origin"),this.points=[],this.num_points=t.num_points,this.palette=t.palette,this.palette_freq=t.palette_freq}get primitive_names(){return["polyline_primitive"]}init_points(){const t=[],e=this.compute_point();for(let s=0;s<this.num_points;s++)t.push(e);return t}get part_type(){return"trace"}get parents(){const t=[this.source.part,this.origin.part];return void 0!==this.target&&t.push(this.target.part),t}build(t){const e=this.init_points(),s=this.palette.get_palette(e.length,this.palette_freq),i=r.a.CreateLines(`${this.id}-polyline`,{colors:s,updatable:!0,points:e},t);i.parent=this.origin.node,this.polyline_primitive=i,this.points=e}compute_point(){let t=this.source.position;if(void 0!==this.target){const e=this.target.inverse_matrix;t=i.r.TransformCoordinates(t,e)}else{const e=this.origin.inverse_matrix;t=i.r.TransformCoordinates(t,e)}return t}update(t){const e=this.points,s=this.compute_point();e.push(s),e.shift(),this.polyline_primitive=r.a.CreateLines(`${this.id}-polyline`,{instance:this.polyline_primitive,points:e})}}},67:function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));var i=s(72);class r extends i.a{compute(t){return Math.sin(t)}}},68:function(t,e,s){"use strict";function i(t,e){const s=t[e];if(null==s)throw new Error(`${e} is required`);return s}s.d(e,"a",(function(){return i}))},69:function(t,e,s){"use strict";s.d(e,"a",(function(){return p}));var i=s(0),r=s(29),n=s(61),a=s(66),o=s(62);class p extends o.a{get default_parameters(){return{parent:void 0,radius:2,axes:[new i.r(0,1,0),new i.r(0,0,1)],angular_frequencies:[.1,2],phases:[0,0],show_offset:!0}}init(t){super.init(t),this.radius=t.radius,this.angular_frequencies=t.angular_frequencies,this.axes=t.axes,this.phases=t.phases,this.show_offset=t.show_offset}get transform_names(){return["rotate","translate"]}get primitive_names(){return["sphere_primitive","radius_primitive"]}get parents(){return[this.parent.part]}build(t){const e=new r.a(`${this.id}-rotate`,t);e.rotationQuaternion=i.l.Identity(),e.parent=this.parent.node,this.rotate=e;const s=new r.a(`${this.id}-translate`,t);if(s.position=new i.r(this.radius,0,0),s.parent=e,this.translate=s,!this.show_offset)return;const o=n.a.CreateSphere(`${this.id}-sphere`,{diameter:.2},t);o.material=new a.a(`${this.id}-mat-grid`,t),o.parent=s,this.sphere_primitive=o;const p=n.a.CreateLines(`${this.id}-line`,{points:[i.r.Zero(),s.position.negate()]},t);p.parent=s,this.line_primitive=p}compute_angles(t){const e=[];for(let s=0;s<this.phases.length;s++){const i=this.phases[s],r=this.angular_frequencies[s]*t+i;e.push(r)}return e}compose_rotations(t){let e=i.l.Identity();for(let s=0;s<this.axes.length;s++){e=i.l.RotationAxis(this.axes[s],t[s]).multiply(e)}return e}update(t){const e=this.compute_angles(t),s=this.compose_rotations(e);this.rotate.rotationQuaternion=s}}},70:function(t,e,s){"use strict";s.d(e,"a",(function(){return p}));var i=s(0),r=s(29),n=s(61),a=s(66),o=s(62);class p extends o.a{get default_parameters(){return{points:[]}}constructor(t){super(t),this.points=t.points,this.origin=t.origin,this.weights=t.weights,this.translate=void 0,this.sphere_primitive=void 0}get part_type(){return"centroid"}get parents(){const t=this.points.map(t=>t.part);return t.push(this.origin.part),t}static compute_point(t,e){const s=t.position;return i.r.TransformCoordinates(s,e)}get centroid(){const t=this.origin.inverse_matrix,e=this.points.map(e=>p.compute_point(e,t)),s=this.weights,r=i.r.Zero();let n=0;for(let t=0;t<e.length;t++){const i=s[t];r.addInPlace(e[t].scale(i)),n+=i}return r.scale(1/n)}build(t){const e=new r.a(`${this.id}-translate`,t);e.position=i.r.Zero(),e.parent=this.origin.node,this.translate=e;const s=n.a.CreateSphere(`${this.id}-sphere`,{diameter:.2},t);s.material=new a.a(`${this.id}-mat-grid`,t),s.parent=e,this.sphere_primitive=s}update(t){const e=this.centroid;this.translate.position=e}}},71:function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));var i=s(0),r=s(76),n=s(67);class a extends r.a{get default_parameters(){return{waves:[new n.a,new n.a,new n.a,new n.a],biases:[.3,.5,.6,1],amplitudes:[.5,.7,.5,0],frequencies:[1,4,10,0],phases:[.6,.1,.4,0]}}constructor(t){super(),this.init({...this.default_parameters,...t})}init(t){this.waves=t.waves,this.biases=t.biases,this.amplitudes=t.amplitudes,this.frequencies=t.frequencies,this.phases=t.phases}get_color(t){const e=[];for(let s=0;s<4;s++){const i=this.waves[s],r=this.biases[s],n=this.amplitudes[s],a=this.frequencies[s],o=this.phases[s],p=2*Math.PI*(a*t+o),h=r+n*i.compute(p);e.push(h)}return new i.d(...e)}}},72:function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));class i{compute(t){}}},73:function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));var i=s(0),r=s(29),n=s(61),a=s(66),o=s(62),p=s(67);class h extends o.a{get default_parameters(){return{parent:void 0,offset:i.r.Zero(),amplitude:1,phase:0,direction:new i.r(0,1,0),frequency:1,radius:.1,wave:new p.a}}init(t){super.init(t),this.offset=t.offset,this.amplitude=t.amplitude,this.phase=t.phase,this.direction=t.direction,this.frequency=t.frequency,this.radius=t.radius,this.wave=t.wave}get transform_names(){return["translate","translate_wave","scale"]}get primitive_names(){return["line_primitive","sphere_primitive"]}get part_type(){return"osc"}build(t){const e=new r.a(`${this.id}-translate`,t);e.position=this.offset,void 0!==this.parent&&(e.parent=this.parent.node),this.translate=e;const s=new r.a(`${this.id}-translate-wave`,t);s.position=i.r.Zero(),s.parent=e,this.translate_wave=s;const o=n.a.CreateSphere(`${this.id}-sphere`,{diameter:2*this.radius},t);o.material=new a.a(`${this.id}-mat-grid`,t),o.parent=s,this.sphere_primitive=o;const p=n.a.CreateLines(`${this.id}-line`,{points:[this.direction.scale(this.amplitude),this.direction.scale(-this.amplitude)]},t);p.parent=e,this.line_primitive=p}update(t){const e=this.amplitude*this.wave.compute(2*Math.PI*this.frequency*t+this.phase),s=this.direction.scale(e);this.translate_wave.position=s}}},74:function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));var i=s(72);class r extends i.a{compute(t){return Math.sign(Math.sin(t))}}},75:function(t,e,s){"use strict";s.d(e,"a",(function(){return p}));var i=s(0),r=s(63),n=s(64),a=s(65),o=s(68);class p extends r.a{get default_parameters(){return{origin_offset:i.r.Zero(),trace_length:1e3,part:void 0,trace_joint:"translate",time_step:1/60}}get time_step(){return this._time_step}init(t){this._time_step=t.time_step;const e=new n.a({offset:t.origin_offset,show_offset:!1}),s=Object(o.a)(t,"part");s.parent=e.to_joint("translate");const i=new a.a({source:s.to_joint(t.trace_joint),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_part(s,"part"),this.add_part(i),e}}},76:function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));var i=s(0);class r{get default_parameters(){return{}}constructor(t){this.init({...this.default_parameters,...t})}init(t){}get_color(t){return new i.d(0,0,0,0)}get_palette(t,e){const s=[];for(let i=0;i<t;i++){const r=i/(t-1)*e%1;s.push(this.get_color(r))}return s}}},77:function(t,e,s){"use strict";s.d(e,"a",(function(){return p}));var i=s(0),r=s(76);function n(t,e,s){return t*(1-s)+e*s}function a(t,e,s){const r=n(t.r,e.r,s),a=n(t.g,e.g,s),o=n(t.b,e.b,s),p=n(t.a,e.a,s);return new i.d(r,a,o,p)}function o(t,e,s){return s<t?0:e<s?1:3*s*s-2*s*s*s}class p extends r.a{get default_parameters(){return{stops:[0,1/3,2/3,1],colors:[new i.d(0,0,0,1),new i.d(1,0,0,1),new i.d(0,0,0,1),new i.d(0,0,1,1)]}}init(t){this.stops=t.stops,this.colors=t.colors}get_color(t){let e=this.colors[0];for(let s=1;s<this.colors.length;s++){const i=this.stops[s-1],r=this.stops[s];e=a(e,this.colors[s],o(i,r,t))}return e}}},78:function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));var i=s(0),r=s(63),n=s(64),a=s(69),o=s(65),p=s(71);class h extends r.a{get default_parameters(){return{parent:void 0,amplitudes:[4,3,2,1],angular_frequencies:[1,1.25,3.25,4.5].map(t=>t*Math.PI/4),phases:[0,0,0,0],axes:[new i.r(0,1,0),new i.r(0,1,0),new i.r(0,1,0),new i.r(0,1,0)],trace_length:1e3,time_step:.01,palette:new p.a,palette_freq:2}}get time_step(){return this._time_step}make_spheres(t,e){const s=[];let i=e;for(let e=0;e<t.amplitudes.length;e++){const r=new a.a({radius:t.amplitudes[e],axes:[t.axes[e]],angular_frequencies:[t.angular_frequencies[e]],phases:[t.phases[e]],parent:i.to_joint("translate")});s.push(r),i=r}return s}init(t){this._time_step=t.time_step;const e=new n.a({parent:t.parent,offset:i.r.Zero(),show_offset:!1}),s=this.make_spheres(t,e),r=s[s.length-1],a=new o.a({source:r.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length,palette:t.palette,palette_freq:t.palette_freq});return this.add_part(e),this.add_parts(s),this.add_part(a),e}}},79:function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));var i=s(0),r=s(63),n=s(64),a=s(70),o=s(65),p=s(77);s(68);class h extends r.a{get default_parameters(){return{parts:[],joint_names:[],offsets:[],weights:[],trace_length:1e3,palette:new p.a({colors:[new i.d(0,1,1,1),new i.d(1,.5,0,1),new i.d(1,.5,0,1),new i.d(1,.5,0,1),new i.d(0,1,1,1)],stops:[0,.25,.5,.75,1]}),palette_freq:20}}make_offsets(t,e){const s=[];for(let i of t.offsets){const t=new n.a({parent:e.to_joint("translate"),offset:i});s.push(t)}return s}make_parts(t,e){const s=[];for(let i=0;i<t.parts.length;i++){const r=t.parts[i];r.change_parent(e[i].to_joint("translate")),s.push(r)}return s}make_centroid(t,e,s){const i=t.joint_names,r=e.map((t,e)=>t.to_joint(i[e]));return new a.a({points:r,weights:t.weights,origin:s.to_joint("translate")})}init(t){const e=new n.a({show_offset:!0}),s=this.make_offsets(t,e),i=this.make_parts(t,s),r=this.make_centroid(t,i,e),a=new o.a({source:r.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length,palette:t.palette,palette_freq:t.palette_freq});return this.add_part(e),this.add_parts(s),this.add_parts(i),this.add_part(r),this.add_part(a),e}}},80:function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));var i=s(0),r=s(63),n=s(64),a=s(73),o=s(70),p=s(65);class h extends r.a{get default_parameters(){return{parent:void 0,size:new i.r(3,3,3),frequencies:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1,1.1,1.2],weights:[1,1,1,1,1,1,1,1,1,1,1,1],phases:[0,0,0,0,0,0,0,0,0,0,0,0],trace_length:1e4}}static get NUM_OSCILATORS(){return 12}static get DIRECTIONS(){const t=new i.r(1,0,0),e=new i.r(0,1,0),s=new i.r(0,0,1),r=new i.r(-1,0,0);return{up:e,down:new i.r(0,-1,0),left:r,right:t,front:new i.r(0,0,-1),back:s}}static get OSCILATION_DIRECTIONS(){const t=this.DIRECTIONS;return[t.right,t.right,t.right,t.right,t.up,t.up,t.up,t.up,t.back,t.back,t.back,t.back]}get_offsets(t){const e=t.size,s=h.DIRECTIONS,i=s.front.scale(e.z),r=s.back.scale(e.z),n=s.left.scale(e.x),a=s.right.scale(e.x),o=s.up.scale(e.y),p=s.down.scale(e.y);return[i.add(o),i.add(p),r.add(o),r.add(p),i.add(n),i.add(a),r.add(n),r.add(a),n.add(o),n.add(p),a.add(o),a.add(p)]}get_amplitudes(t){const e=t.size;return[e.x,e.x,e.x,e.x,e.y,e.y,e.y,e.y,e.z,e.z,e.z,e.z]}make_oscillators(t,e){const s=[],i=(t.size,t.phases),r=t.frequencies,n=h.OSCILATION_DIRECTIONS,o=this.get_offsets(t),p=this.get_amplitudes(t),u=e.to_joint("translate");for(let t=0;t<h.NUM_OSCILATORS;t++){const e=new a.a({parent:u,offset:o[t],direction:n[t],amplitude:p[t],frequency:r[t],phase:i[t],radius:.2});s.push(e)}return s}init(t){const e=new n.a({parent:t.parent,offset:i.r.Zero(),show_offset:!1}),s=this.make_oscillators(t,e),r=new o.a({points:s.map(t=>t.to_joint("translate_wave")),origin:e.to_joint("translate"),weights:t.weights}),a=new p.a({source:r.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_parts(s),this.add_part(r,"centroid"),this.add_part(a),e}}},81:function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));var i=s(0),r=s(29),n=s(61),a=s(66),o=s(62),p=s(67);class h extends o.a{get default_parameters(){return{parent:void 0,amplitudes:new i.r(1,1,1),frequencies:new i.r(1,.1,1),phases:new i.r(0,0,Math.PI/2),waves:[new p.a,new p.a,new p.a]}}init(t){super.init(t),this.frequencies=t.frequencies,this.phases=t.phases,this.amplitudes=t.amplitudes,this.waves=t.waves}get transform_names(){return["translate","translate_wave"]}get primitive_names(){return["sphere_primitive"]}get part_type(){return"xyzosc"}get parents(){return void 0!==this.parent?[this.parent.part]:[]}build(t){const e=new r.a(`${this.id}-translate-wave`,t);e.position=this.compute_wave(0),void 0!==this.parent&&(e.parent=this.parent.node),this.translate_wave=e;const s=n.a.CreateSphere(`${this.id}-sphere`,{diameter:.2},t);s.material=new a.a(`${this.id}-mat-grid`,t),s.parent=e,this.sphere_primitive=s}compute_wave(t){const e=2*Math.PI*this.frequencies.x*t+this.phases.x,s=2*Math.PI*this.frequencies.y*t+this.phases.y,r=2*Math.PI*this.frequencies.z*t+this.phases.z,[n,a,o]=this.waves,p=this.amplitudes.x*n.compute(e),h=this.amplitudes.y*a.compute(s),u=this.amplitudes.z*o.compute(r);return new i.r(p,h,u)}update(t){this.translate_wave.position=this.compute_wave(t)}}},82:function(t,e,s){"use strict";s.d(e,"a",(function(){return n}));s(0),s(29),s(61),s(66);var i=s(62),r=s(68);class n extends i.a{get default_parameters(){return{parent:void 0,machine:void 0}}init(t){super.init(t),this.machine=Object(r.a)(t,"machine"),this.machine.root_part.parent=t.parent}change_parent(t){this.parent=t,this.machine.root_part.parent=t}get part_type(){return`prefab-${this.machine.machine_type}`}build(t){this.machine.build(t)}update(t){this.machine.update(t)}to_joint(t){const[e,...s]=t.split("."),i=s.join(".");return this.machine.find_part(e).to_joint(i)}}},83:function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));var i=s(72);class r extends i.a{constructor(t){super(),this.amplitudes=t.amplitudes,this.frequencies=t.frequencies}compute(t){let e=0,s=0;for(let i=0;i<this.amplitudes.length;i++){const r=this.amplitudes[i],n=this.frequencies[i];e+=r*Math.sin(n*t),s+=r}return e/s}}}}]);