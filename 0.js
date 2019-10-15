(window.webpackJsonp=window.webpackJsonp||[]).push([[0],Array(61).concat([function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));class r{constructor(t){this.part_table=new Map,this.vertices=[],this.edges=new Map,this.labels=new Map,this.is_sorted=!0,this.root_part=this.init({...this.default_parameters,...t})}get machine_type(){return"machine"}get default_parameters(){return{parent:void 0}}get time_step(){return 1/60}add_edge(t,e){this.edges.has(t)||this.edges.set(t,[]),this.edges.get(t).push(e)}add_part(t,e){const s=t.id;this.vertices.push(s),this.part_table.set(s,t),this.labels.set(e,s),this.is_sorted=!1;for(let e of t.parents){const t=e.id;this.add_edge(t,s)}}add_parts(t){for(let e of t)this.add_part(e)}get_part(t){return this.part_table.get(t)}find_part(t){const e=this.labels.get(t);return this.get_part(e)}postorder(t,e,s){if(e.has(t))return;e.add(t);const r=this.edges.get(t)||[];for(let t of r)this.postorder(t,e,s);s.push(t)}get is_empty(){return 0==this.vertices.length}topological_sort(){if(this.is_empty)return;const t=new Set,e=[];for(let s of this.vertices)this.postorder(s,t,e);e.reverse(),this.vertices=e}*parts(){this.is_sorted||(this.topological_sort(),this.is_sorted=!0);for(let t of this.vertices)yield this.part_table.get(t)}init(t){}build(t){let e=void 0;for(let s of this.parts()){const r=s.build(t);void 0===e&&(e=r)}return e}update(t){for(let e of this.parts())e.update(t)}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));var r=s(0),a=s(29),i=s(64),n=s(66);class o extends n.a{get default_parameters(){return{offset:r.r.Zero(),parent:void 0,show_offset:!1}}init(t){super.init(t),this.offset=t.offset,this.show_offset=t.show_offset}get part_type(){return"point"}get transform_names(){return["translate"]}get primitive_names(){return["line"]}make_line(t){return i.a.CreateLines(`${this.id}-line`,{points:[r.r.Zero(),this.offset.negate()]},t)}build(t){const e=new a.a(`${this.id}-translate`,t);if(e.position=this.offset,void 0!==this.parent&&(e.parent=this.parent.node),this.translate=e,this.show_offset){const s=this.make_line(t);s.parent=e,this.line=s}return e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));var r=s(0),a=(s(29),s(64)),i=s(66),n=s(70),o=(s(75),s(72));class h extends i.a{get default_parameters(){return{source:void 0,target:void 0,origin:void 0,num_points:1e3,palette:new n.a,palette_freq:2}}init(t){this.source=Object(o.a)(t,"source"),this.target=t.target,this.origin=Object(o.a)(t,"origin"),this.points=[],this.num_points=t.num_points,this.palette=t.palette,this.palette_freq=t.palette_freq}get primitive_names(){return["polyline_primitive"]}init_points(){const t=[],e=this.compute_point();for(let s=0;s<this.num_points;s++)t.push(e);return t}get part_type(){return"trace"}get parents(){const t=[this.source.part,this.origin.part];return void 0!==this.target&&t.push(this.target.part),t}build(t){const e=this.init_points(),s=this.palette.get_palette(e.length,this.palette_freq),r=a.a.CreateLines(`${this.id}-polyline`,{colors:s,updatable:!0,points:e},t);r.parent=this.origin.node,this.polyline_primitive=r,this.points=e}compute_point(){let t=this.source.position;if(void 0!==this.target){const e=this.target.inverse_matrix;t=r.r.TransformCoordinates(t,e)}else{const e=this.origin.inverse_matrix;t=r.r.TransformCoordinates(t,e)}return t}update(t){const e=this.points,s=this.compute_point();e.push(s),e.shift(),this.polyline_primitive=a.a.CreateLines(`${this.id}-polyline`,{instance:this.polyline_primitive,points:e})}}},,function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));var r=s(0),a=s(29),i=s(64),n=s(68),o=s(66);class h extends o.a{get default_parameters(){return{parent:void 0,radius:2,axes:[new r.r(0,1,0),new r.r(0,0,1)],angular_frequencies:[.1,2],phases:[0,0],show_offset:!0,start_direction:new r.r(1,0,0)}}init(t){super.init(t),this.radius=t.radius,this.angular_frequencies=t.angular_frequencies,this.axes=t.axes,this.phases=t.phases,this.show_offset=t.show_offset,this.start_direction=t.start_direction}get transform_names(){return["rotate","translate"]}get primitive_names(){return["sphere_primitive","radius_primitive"]}get parents(){return[this.parent.part]}build(t){const e=new a.a(`${this.id}-rotate`,t);e.rotationQuaternion=r.l.Identity(),e.parent=this.parent.node,this.rotate=e;const s=new a.a(`${this.id}-translate`,t);if(s.position=this.start_direction.scale(this.radius),s.parent=e,this.translate=s,!this.show_offset)return;const o=i.a.CreateSphere(`${this.id}-sphere`,{diameter:.2},t);o.material=new n.a(`${this.id}-mat-grid`,t),o.parent=s,this.sphere_primitive=o;const h=i.a.CreateLines(`${this.id}-line`,{points:[r.r.Zero(),s.position.negate()]},t);h.parent=s,this.line_primitive=h,this.update(0)}compute_angles(t){const e=[];for(let s=0;s<this.phases.length;s++){const r=this.phases[s],a=this.angular_frequencies[s]*t+r;e.push(a)}return e}compose_rotations(t){let e=r.l.Identity();for(let s=0;s<this.axes.length;s++){e=r.l.RotationAxis(this.axes[s],t[s]).multiply(e)}return e}update(t){const e=this.compute_angles(t),s=this.compose_rotations(e);this.rotate.rotationQuaternion=s}}},function(t,e,s){"use strict";var r=s(0);class a{constructor(t,e){this.part=t,this.node_name=e}get node(){return this.part[this.node_name]}get matrix(){return this.node.getWorldMatrix()}get inverse_matrix(){return r.g.Invert(this.matrix)}get position(){return r.r.TransformCoordinates(r.r.Zero(),this.matrix)}}s.d(e,"a",(function(){return n}));let i=0;class n{static make_id(){const t=i;return i++,t}constructor(t){this.init({...this.default_parameters,...t}),this.id=`${this.part_type}-${n.make_id()}`}get part_type(){return"part"}get transform_names(){return[]}get primitive_names(){return[]}get default_parameters(){return{parent:void 0}}change_parent(t){this.parent=t}init(t){this.parent=t.parent}get parents(){return void 0!==this.parent?[this.parent.part]:[]}update(t){}build(t){}to_joint(t){return new a(this,t)}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return u}));var r=s(0),a=s(29),i=s(64),n=s(68),o=s(66),h=s(69);class u extends o.a{get default_parameters(){return{parent:void 0,offset:r.r.Zero(),amplitude:1,phase:0,direction:new r.r(0,1,0),frequency:1,radius:.1,wave:new h.a}}init(t){super.init(t),this.offset=t.offset,this.amplitude=t.amplitude,this.phase=t.phase,this.direction=t.direction,this.frequency=t.frequency,this.radius=t.radius,this.wave=t.wave}get transform_names(){return["translate","translate_wave","scale"]}get primitive_names(){return["line_primitive","sphere_primitive"]}get part_type(){return"osc"}build(t){const e=new a.a(`${this.id}-translate`,t);e.position=this.offset,void 0!==this.parent&&(e.parent=this.parent.node),this.translate=e;const s=new a.a(`${this.id}-translate-wave`,t);s.position=r.r.Zero(),s.parent=e,this.translate_wave=s;const o=i.a.CreateSphere(`${this.id}-sphere`,{diameter:2*this.radius},t);o.material=new n.a(`${this.id}-mat-grid`,t),o.parent=s,this.sphere_primitive=o;const h=i.a.CreateLines(`${this.id}-line`,{points:[this.direction.scale(this.amplitude),this.direction.scale(-this.amplitude)]},t);h.parent=e,this.line_primitive=h}update(t){const e=this.amplitude*this.wave.compute(2*Math.PI*this.frequency*t+this.phase),s=this.direction.scale(e);this.translate_wave.position=s}}},,function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));var r=s(74);class a extends r.a{compute(t){return Math.sin(t)}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return n}));var r=s(0),a=s(80),i=s(69);class n extends a.a{get default_parameters(){return{waves:[new i.a,new i.a,new i.a,new i.a],biases:[.3,.5,.6,1],amplitudes:[.5,.7,.5,0],frequencies:[1,4,10,0],phases:[.6,.1,.4,0]}}constructor(t){super(),this.init({...this.default_parameters,...t})}init(t){this.waves=t.waves,this.biases=t.biases,this.amplitudes=t.amplitudes,this.frequencies=t.frequencies,this.phases=t.phases}get_color(t){const e=[];for(let s=0;s<4;s++){const r=this.waves[s],a=this.biases[s],i=this.amplitudes[s],n=this.frequencies[s],o=this.phases[s],h=2*Math.PI*(n*t+o),u=a+i*r.compute(h);e.push(u)}return new r.d(...e)}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));var r=s(0),a=s(29),i=s(64),n=s(68),o=s(66);class h extends o.a{get default_parameters(){return{points:[],weights:[],origin:void 0}}constructor(t){super(t),this.points=t.points,this.origin=t.origin,this.weights=t.weights,this.translate=void 0,this.sphere_primitive=void 0}get part_type(){return"centroid"}get parents(){const t=this.points.map(t=>t.part);return t.push(this.origin.part),t}static compute_point(t,e){const s=t.position;return r.r.TransformCoordinates(s,e)}get centroid(){const t=this.origin.inverse_matrix,e=this.points.map(e=>h.compute_point(e,t)),s=this.weights,a=r.r.Zero();let i=0;for(let t=0;t<e.length;t++){const r=s[t];a.addInPlace(e[t].scale(r)),i+=r}return a.scale(1/i)}build(t){const e=new a.a(`${this.id}-translate`,t);e.position=r.r.Zero(),e.parent=this.origin.node,this.translate=e;const s=i.a.CreateSphere(`${this.id}-sphere`,{diameter:.2},t);s.material=new n.a(`${this.id}-mat-grid`,t),s.parent=e,this.sphere_primitive=s}update(t){const e=this.centroid;this.translate.position=e}}},function(t,e,s){"use strict";function r(t,e){const s=t[e];if(null==s)throw new Error(`${e} is required`);return s}s.d(e,"a",(function(){return r}))},function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));var r=s(0),a=s(29),i=s(64),n=(s(68),s(66));class o extends n.a{get default_parameters(){return{parent:void 0,frame_radius:.96,wheel_radius:-.3,angular_frequency:4,frame_phase:0,wheel_phase:0,show_radii:!1,offset:new r.r(.2,0,0)}}init(t){super.init(t),this.offset=t.offset,this.show_radii=t.show_radii,this.frame_radius=t.frame_radius,this.wheel_radius=t.wheel_radius,this.angular_frequency=t.angular_frequency,this.frame_phase=t.frame_phase,this.wheel_phase=t.frame_phase,this.frame_angle=t.frame_phase,this.wheel_angle=t.wheel_phase}get primitive_names(){return["frame_radius_primitive","wheel_radius_primitive"]}get transform_names(){return["rotate_frame","translate_frame","translate_wheel","rotate_wheel","translate_offset"]}get part_type(){return"centered-trochoid"}build(t){const e=new a.a(`${this.id}-rotate-frame`,t);e.rotation.y=this.frame_angle,void 0!==this.parent&&(e.parent=this.parent.node),this.rotate_frame=e;const s=new a.a(`${this.id}-translate-frame`,t);s.position=new r.r(this.frame_radius,0,0),s.parent=e,this.translate_frame=s;const n=new a.a(`${this.id}-translate-wheel`,t);n.position=new r.r(this.wheel_radius,0,0),n.parent=s,this.translate_wheel=n;const o=new a.a(`${this.id}-rotate-wheel`,t);o.rotation.y=this.wheel_angle,o.parent=n,this.rotate_wheel=o;const h=new a.a(`${this.id}-translate-offset`,t);if(h.position=this.offset,h.parent=o,this.translate_offset=h,this.update(0),!this.show_radii)return;const u=i.a.CreateLines(`${this.id}-line-frame`,{points:[r.r.Zero(),new r.r(-this.frame_radius,0,0)]},t);u.parent=s,this.frame_radius_primitive=u;const p=i.a.CreateLines(`${this.id}-line-wheel`,{points:[r.r.Zero(),new r.r(-this.wheel_radius,0,0)]},t);p.parent=n,this.wheel_radius_primitive=p;const c=i.a.CreateLines(`${this.id}-line-offset`,{points:[r.r.Zero(),this.offset.negate()]},t);c.parent=h,this.offset_primitive=c}get wheel_ratio(){return 0===this.wheel_radius?1:1+this.frame_radius/this.wheel_radius}update(t){const e=this.angular_frequency*t;this.frame_angle=e+this.frame_phase,this.wheel_angle=this.wheel_ratio*e+this.wheel_phase,this.rotate_frame.rotation.y=this.frame_angle,this.rotate_wheel.rotation.y=this.wheel_angle}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));class r{compute(t){}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));var r=s(0),a=s(80);function i(t,e,s){return t*(1-s)+e*s}function n(t,e,s){const a=i(t.r,e.r,s),n=i(t.g,e.g,s),o=i(t.b,e.b,s),h=i(t.a,e.a,s);return new r.d(a,n,o,h)}function o(t,e,s){return s<t?0:e<s?1:3*s*s-2*s*s*s}class h extends a.a{get default_parameters(){return{stops:[0,1/3,2/3,1],colors:[new r.d(0,0,0,1),new r.d(1,0,0,1),new r.d(0,0,0,1),new r.d(0,0,1,1)]}}init(t){this.stops=t.stops,this.colors=t.colors}get_color(t){let e=this.colors[0];for(let s=1;s<this.colors.length;s++){const r=this.stops[s-1],a=this.stops[s];e=n(e,this.colors[s],o(r,a,t))}return e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));var r=s(74);class a extends r.a{constructor(t){super(),this.amplitudes=t.amplitudes,this.frequencies=t.frequencies}compute(t){let e=0,s=0;for(let r=0;r<this.amplitudes.length;r++){const a=this.amplitudes[r],i=this.frequencies[r];e+=a*Math.sin(i*t),s+=a}return e/s}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return u}));var r=s(0),a=s(29),i=s(64),n=s(68),o=s(66),h=s(69);class u extends o.a{get default_parameters(){return{parent:void 0,amplitudes:new r.r(1,1,1),frequencies:new r.r(1,.1,1),phases:new r.r(0,0,Math.PI/2),waves:[new h.a,new h.a,new h.a]}}init(t){super.init(t),this.frequencies=t.frequencies,this.phases=t.phases,this.amplitudes=t.amplitudes,this.waves=t.waves}get transform_names(){return["translate","translate_wave"]}get primitive_names(){return["sphere_primitive"]}get part_type(){return"xyzosc"}get parents(){return void 0!==this.parent?[this.parent.part]:[]}build(t){const e=new a.a(`${this.id}-translate-wave`,t);e.position=this.compute_wave(0),void 0!==this.parent&&(e.parent=this.parent.node),this.translate_wave=e;const s=i.a.CreateSphere(`${this.id}-sphere`,{diameter:.2},t);s.material=new n.a(`${this.id}-mat-grid`,t),s.parent=e,this.sphere_primitive=s}compute_wave(t){const e=2*Math.PI*this.frequencies.x*t+this.phases.x,s=2*Math.PI*this.frequencies.y*t+this.phases.y,a=2*Math.PI*this.frequencies.z*t+this.phases.z,[i,n,o]=this.waves,h=this.amplitudes.x*i.compute(e),u=this.amplitudes.y*n.compute(s),p=this.amplitudes.z*o.compute(a);return new r.r(h,u,p)}update(t){this.translate_wave.position=this.compute_wave(t)}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));var r=s(74);class a extends r.a{compute(t){return Math.sign(Math.sin(t))}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));var r=s(0),a=s(61),i=s(62),n=s(63),o=s(72);class h extends a.a{get default_parameters(){return{origin_offset:r.r.Zero(),trace_length:1e3,part:void 0,trace_joint:"translate",time_step:1/60}}get time_step(){return this._time_step}init(t){this._time_step=t.time_step;const e=new i.a({offset:t.origin_offset,show_offset:!1}),s=Object(o.a)(t,"part");s.parent=e.to_joint("translate");const r=new n.a({source:s.to_joint(t.trace_joint),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_part(s,"part"),this.add_part(r),e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));var r=s(0);class a{get default_parameters(){return{}}constructor(t){this.init({...this.default_parameters,...t})}init(t){}get_color(t){return new r.d(0,0,0,0)}get_palette(t,e){const s=[];for(let r=0;r<t;r++){const a=r/(t-1)*e%1;s.push(this.get_color(a))}return s}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return u}));var r=s(0),a=s(61),i=s(62),n=s(65),o=s(63),h=s(70);class u extends a.a{get default_parameters(){return{parent:void 0,amplitudes:[4,3,2,1],angular_frequencies:[1,1.25,3.25,4.5].map(t=>t*Math.PI/4),phases:[0,0,0,0],axes:[new r.r(0,1,0),new r.r(0,1,0),new r.r(0,1,0),new r.r(0,1,0)],trace_length:1e3,time_step:.01,palette:new h.a,palette_freq:2}}get time_step(){return this._time_step}make_spheres(t,e){const s=[];let r=e;for(let e=0;e<t.amplitudes.length;e++){const a=new n.a({radius:t.amplitudes[e],axes:[t.axes[e]],angular_frequencies:[t.angular_frequencies[e]],phases:[t.phases[e]],parent:r.to_joint("translate")});s.push(a),r=a}return s}init(t){this._time_step=t.time_step;const e=new i.a({parent:t.parent,offset:r.r.Zero(),show_offset:!1}),s=this.make_spheres(t,e),a=s[s.length-1],n=new o.a({source:a.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length,palette:t.palette,palette_freq:t.palette_freq});return this.add_part(e),this.add_parts(s),this.add_part(n),e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return u}));var r=s(0),a=s(61),i=s(62),n=s(71),o=s(63),h=s(75);s(72);class u extends a.a{get default_parameters(){return{parts:[],joint_names:[],offsets:[],weights:[],trace_length:1e3,palette:new h.a({colors:[new r.d(0,1,1,1),new r.d(1,.5,0,1),new r.d(1,.5,0,1),new r.d(1,.5,0,1),new r.d(0,1,1,1)],stops:[0,.25,.5,.75,1]}),palette_freq:20}}make_offsets(t,e){const s=[];for(let r of t.offsets){const t=new i.a({parent:e.to_joint("translate"),offset:r});s.push(t)}return s}make_parts(t,e){const s=[];for(let r=0;r<t.parts.length;r++){const a=t.parts[r];a.change_parent(e[r].to_joint("translate")),s.push(a)}return s}make_centroid(t,e,s){const r=t.joint_names,a=e.map((t,e)=>t.to_joint(r[e]));return new n.a({points:a,weights:t.weights,origin:s.to_joint("translate")})}init(t){const e=new i.a({show_offset:!0}),s=this.make_offsets(t,e),r=this.make_parts(t,s),a=this.make_centroid(t,r,e),n=new o.a({source:a.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length,palette:t.palette,palette_freq:t.palette_freq});return this.add_part(e),this.add_parts(s),this.add_parts(r),this.add_part(a),this.add_part(n),e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return u}));var r=s(0),a=s(61),i=s(62),n=s(67),o=s(71),h=s(63);class u extends a.a{get default_parameters(){return{parent:void 0,size:new r.r(3,3,3),frequencies:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1,1.1,1.2],weights:[1,1,1,1,1,1,1,1,1,1,1,1],phases:[0,0,0,0,0,0,0,0,0,0,0,0],trace_length:1e4}}static get NUM_OSCILATORS(){return 12}static get DIRECTIONS(){const t=new r.r(1,0,0),e=new r.r(0,1,0),s=new r.r(0,0,1),a=new r.r(-1,0,0);return{up:e,down:new r.r(0,-1,0),left:a,right:t,front:new r.r(0,0,-1),back:s}}static get OSCILATION_DIRECTIONS(){const t=this.DIRECTIONS;return[t.right,t.right,t.right,t.right,t.up,t.up,t.up,t.up,t.back,t.back,t.back,t.back]}get_offsets(t){const e=t.size,s=u.DIRECTIONS,r=s.front.scale(e.z),a=s.back.scale(e.z),i=s.left.scale(e.x),n=s.right.scale(e.x),o=s.up.scale(e.y),h=s.down.scale(e.y);return[r.add(o),r.add(h),a.add(o),a.add(h),r.add(i),r.add(n),a.add(i),a.add(n),i.add(o),i.add(h),n.add(o),n.add(h)]}get_amplitudes(t){const e=t.size;return[e.x,e.x,e.x,e.x,e.y,e.y,e.y,e.y,e.z,e.z,e.z,e.z]}make_oscillators(t,e){const s=[],r=(t.size,t.phases),a=t.frequencies,i=u.OSCILATION_DIRECTIONS,o=this.get_offsets(t),h=this.get_amplitudes(t),p=e.to_joint("translate");for(let t=0;t<u.NUM_OSCILATORS;t++){const e=new n.a({parent:p,offset:o[t],direction:i[t],amplitude:h[t],frequency:a[t],phase:r[t],radius:.2});s.push(e)}return s}init(t){const e=new i.a({parent:t.parent,offset:r.r.Zero(),show_offset:!1}),s=this.make_oscillators(t,e),a=new o.a({points:s.map(t=>t.to_joint("translate_wave")),origin:e.to_joint("translate"),weights:t.weights}),n=new h.a({source:a.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_parts(s),this.add_part(a,"centroid"),this.add_part(n),e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return p}));var r=s(0),a=s(61),i=s(62),n=s(63),o=s(67),h=s(65),u=s(76);class p extends a.a{get default_parameters(){return{trace_length:1e3,num_oscs:6,rotation_freq:1,osc_freq:.1,radius:2,wave:new u.a({amplitudes:[1,2,3],frequencies:[2,4,8]})}}make_oscs(t,e){const s=[],a=t.num_oscs,i=t.radius,n=t.wave,h=t.osc_freq;for(let t=0;t<a;t++){const u=2*Math.PI*t/a,p=new r.r(Math.cos(u),0,Math.sin(u)),c=new o.a({parent:e.to_joint("rotate"),direction:new r.r(0,1,0),offset:p.scale(i),frequency:h,wave:n});s.push(c)}return s}make_traces(t,e,s){return s.map(t=>new n.a({source:t.to_joint("translate_wave"),origin:e.to_joint("translate")}))}init(t){const e=new i.a,s=new h.a({parent:e.to_joint("translate"),radius:t.radius,axes:[new r.r(0,1,0)],angular_frequencies:[t.rotation_freq]}),a=this.make_oscs(t,s),n=this.make_traces(t,e,a);return this.add_part(e),this.add_part(s),this.add_parts(a),this.add_parts(n),e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));s(0);var r=s(61),a=s(62),i=s(63),n=s(77),o=s(86);class h extends r.a{get default_parameters(){return{trace_length:1e3}}init(t){const e=new a.a,s=new o.a({parent:e.to_joint("translate")}),r=new n.a({parent:s.to_joint("scale")}),h=new i.a({source:r.to_joint("translate_wave"),target:e.to_joint("translate"),origin:e.to_joint("translate"),trace_length:t.trace_length});return this.add_part(e),this.add_part(s),this.add_part(r),this.add_part(h),e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));var r=s(0),a=s(29),i=(s(64),s(66)),n=s(69);class o extends i.a{get default_parameters(){return{parent:void 0,wave:new n.a,amplitude:1,frequency:1,phase:0}}init(t){super.init(t),this.wave=t.wave,this.phase=t.phase,this.frequency=t.frequency,this.amplitude=t.amplitude}build(t){const e=this.wave.compute(0),s=new a.a(`${this.id}-scale`,t);s.scaling=new r.r(1,1,1).scale(e),void 0!==this.parent&&(s.parent=this.parent.node),this.scale=s}update(t){const e=this.amplitude*this.wave.compute(this.frequency*t+this.phase);this.scale.scaling=new r.r(1,1,1).scale(e)}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return u}));var r=s(0),a=s(61),i=s(62),n=s(63),o=s(67),h=s(65);class u extends a.a{get default_parameters(){return{trace_length:4e3,angular_frequencies:[2,.1]}}init(t){const e=new i.a,s=new o.a({parent:e.to_joint("translate"),direction:new r.r(0,0,1)}),a=new i.a({parent:s.to_joint("translate_wave"),offset:new r.r(0,-3,0),show_offset:!0}),u=new h.a({parent:a.to_joint("translate"),axes:[new r.r(1,0,0),new r.r(0,1,0)],start_direction:new r.r(0,0,1),angular_frequencies:t.angular_frequencies}),p=new n.a({source:u.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_part(s),this.add_part(a),this.add_part(u),this.add_part(p),e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return p}));var r=s(0),a=s(61),i=s(62),n=s(63),o=s(67),h=s(71),u=s(65);class p extends a.a{get default_parameters(){return{trace_length:2e3,height:3,amps:[0,1,.5,.25],freqs:[0,1,.5,.25],rotate_freq:2,rotate_radius:5}}static get OFFSETS(){return[new r.r(1,-2,1),new r.r(-1,-2,1),new r.r(1,-2,-1),new r.r(-1,-2,-1)]}make_tree(t,e,s,r){if(0===r)return[s];const a=t.amps[r],i=t.freqs[r],n=p.OFFSETS.map(t=>new o.a({parent:s.to_joint("translate_wave"),amplitude:a,frequency:i,offset:t}));this.add_parts(n);const h=[s],u=n.map(s=>this.make_tree(t,e,s,r-1));return h.concat(...u)}init(t){const e=new i.a,s=new o.a({parent:e.to_joint("translate")}),a=this.make_tree(t,s,s,t.height),p=new h.a({points:a.map(t=>t.to_joint("translate_wave")),weights:a.map(t=>1),origin:e.to_joint("translate")}),c=new u.a({parent:p.to_joint("translate"),radius:t.rotate_radius,axes:[new r.r(0,1,0)],angular_frequencies:[t.rotate_freq]}),d=new n.a({source:c.to_joint("translate"),origin:e.to_joint("translate"),trace_length:t.trace_length});return this.add_part(e),this.add_part(s),this.add_part(p),this.add_part(c),this.add_part(d),e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));s(0);var r=s(61),a=s(62),i=s(63),n=s(73);class o extends r.a{get default_parameters(){return{trace_length:8e3,height:2,angular_frequencies:[0,.1,.2,.3],radii:[0,.25,.5,1]}}static get ANGLES(){return[0,1,2,3].map(t=>Math.PI/2*t)}make_tree(t,e,s,r){if(0===r){const r=new i.a({source:s.to_joint("translate_offset"),origin:e.to_joint("translate"),num_points:t.trace_length});return void this.add_part(r)}const h=s instanceof a.a?"translate":"rotate_wheel",u=t.radii,p=o.ANGLES.map(e=>new n.a({parent:s.to_joint(h),angular_frequency:t.angular_frequencies[r],frame_phase:e,frame_radius:u[r],wheel_radius:u[r+1],wheel_phase:0,show_radii:!0}));this.add_parts(p);for(const s of p)this.make_tree(t,e,s,r-1)}init(t){const e=new a.a;return this.make_tree(t,e,e,t.height),this.add_part(e),e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return u}));var r=s(0),a=s(61),i=s(62),n=s(63),o=s(65),h=s(67);class u extends a.a{get default_parameters(){return{trace_length:1e3,offsets:[1,3,2],angular_frequencies:[1,2,1.5],amplitudes:[.5,.25,1],num_discs:3}}make_osc_disc(t,e,s){const a=new o.a({parent:e,axes:[new r.r(0,1,0)],angular_frequencies:[t.angular_frequencies[s]]}),n=new i.a({parent:a.to_joint("translate"),offset:new r.r(0,t.offsets[s],0),show_offset:!0}),u=new h.a({parent:n.to_joint("translate"),amplitude:t.amplitudes[s]});return this.add_part(a),this.add_part(n),this.add_part(u),u.to_joint("translate_wave")}init(t){const e=new i.a;let s=e.to_joint("translate");for(let e=0;e<t.num_discs;e++)s=this.make_osc_disc(t,s,e);const r=new n.a({source:s,origin:e.to_joint("translate"),trace_length:t.trace_length});return this.add_part(e),this.add_part(r),e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));var r=s(0),a=s(61),i=s(62),n=s(63),o=s(65);class h extends a.a{get default_parameters(){return{trace_length:1e3,height:2,angular_frequencies:[.4,.2,.1],radii:[1,2,4]}}static get RIGHT_VECTORS(){return[new r.r(1,0,0),new r.r(0,0,1),new r.r(-1,0,0),new r.r(0,0,-1)]}make_tree(t,e,s,a,i,h){const u=new o.a({parent:s.to_joint("translate"),start_direction:h,axes:[i],radius:t.radii[a],angular_frequencies:[t.angular_frequencies[a]]});if(this.add_part(u),0===a){const s=new n.a({source:u.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length});return void this.add_part(s)}const p=r.r.Cross(i,h),c=h,d=[p,i,p.negate(),i.negate()];for(const s of d)this.make_tree(t,e,u,a-1,c,s)}init(t){const e=new i.a;return h.RIGHT_VECTORS.forEach(s=>{this.make_tree(t,e,e,t.height,new r.r(0,1,0),s)}),this.add_part(e),e}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));s(0),s(29),s(64),s(68);var r=s(66),a=s(72);class i extends r.a{get default_parameters(){return{parent:void 0,machine:void 0}}init(t){super.init(t),this.machine=Object(a.a)(t,"machine"),this.machine.root_part.parent=t.parent}change_parent(t){this.parent=t,this.machine.root_part.parent=t}get part_type(){return`prefab-${this.machine.machine_type}`}build(t){this.machine.build(t)}update(t){this.machine.update(t)}to_joint(t){const[e,...s]=t.split("."),r=s.join(".");return this.machine.find_part(e).to_joint(r)}}}])]);