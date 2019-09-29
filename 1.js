(window.webpackJsonp=window.webpackJsonp||[]).push([[1,3],{44:function(t,e,i){"use strict";i.r(e),i.d(e,"metadata",(function(){return s}));const s=[{date:"2019-10-03",title:"Cylindrical Oscillator",desc:"A particle oscillates independently on all 3 axes. If the settings are chosen carefully, the particle can be confined to a cylinder."},{date:"2019-10-02",title:"Average Box",desc:"A bunch of points oscillate on the edges of a box. What shape does the centroid of those points make?"},{date:"2019-10-01",title:"Gear Train Turntable",desc:"Gears rotate a turntable and the ends of a sliding arm. A pen attached to the arm draws on the turntable."}]},58:function(t,e,i){"use strict";i.r(e);var s=i(0),r=i(64),a=i(65),n=i(29),o=i(61),h=i(63),p=i(62);class d extends p.a{get default_parameters(){return{radius:1,half_height:.1,offset:s.r.Zero(),initial_angle:0,angular_velocity:1,parent:void 0}}init(t){super.init(t),this.radius=t.radius,this.half_height=t.half_height,this.offset=t.offset,this.initial_angle=t.initial_angle,this.angular_velocity=t.angular_velocity,this.angle=this.initial_angle}get transform_names(){return["translate","rotate","scale"]}get primitive_names(){return["wheel_primitive"]}get part_type(){return"wheel"}build(t){const e=new n.a(`${this.id}-translate`,t);e.position=this.offset,void 0!==this.parent&&(e.parent=this.parent.node),this.translate=e;const i=new n.a(`${this.id}-rotate`,t);i.rotation.y=this.angle,i.parent=e,this.rotate=i;const r=new n.a(`${this.id}-scale`,t);r.scaling=new s.r(this.radius,this.half_height,this.radius),r.parent=i,this.scale=r;const a=o.a.CreateCylinder(`${this.id}-wheel`,{diameter:2,height:2},t);a.material=new h.a(`${this.id}-mat-grid`,t),a.parent=r,this.wheel_primitive=a}update(t){this.angle=this.angular_velocity*t+this.initial_angle,this.rotate.rotation.y=this.angle}}class l extends d{get default_parameters(){super.default_parameters;return{offset_angle:0}}init(t){super.init(t);const e=this.parent.part;this.angular_velocity=-e.radius/this.radius*e.angular_velocity;const i=t.offset_angle,r=this.radius+e.radius,a=r*Math.cos(i),n=r*Math.sin(i);this.offset=new s.r(a,0,n)}get part_type(){return"driven-wheel"}}var u=i(67);class c extends p.a{get default_parameters(){return{parents:void 0}}init(t){[this.start_parent,this.end_parent]=Object(u.a)(t,"parents")}get transform_names(){return["rotate","scale"]}get parents(){return[this.start_parent.part,this.end_parent.part]}get arm_vector(){const t=this.start_parent.position,e=this.end_parent.position,i=e.subtract(t).length(),r=this.start_parent.inverse_matrix,a=s.r.TransformCoordinates(e,r);return{arm_len:i,angle:-Math.atan2(a.z,a.x)}}build(t){const e=this.arm_vector,i=new n.a(`${this.id}-rotate`,t);i.rotation.y=e.angle,i.parent=this.start_parent.node,this.rotate=i;const r=new n.a(`${this.id}-scale`,t);r.scaling.x=e.arm_len,r.parent=i,this.scale=r;const a=o.a.CreateLines(`${this.id}-line`,{points:[s.r.Zero(),new s.r(1,0,0)]},t);a.parent=r,this.arm_primitive=a}update(t){const e=this.arm_vector;this.rotate.rotation.y=e.angle,this.scale.scaling.x=e.arm_len}}var _=i(66);class f extends r.a{get default_parameters(){return{parent:void 0,radii:[1,2,3,5],half_height:.1,phases:[0,0,0,0],contact_angles:[Math.PI/4,-Math.PI/4,0],angular_velocity:5,arm_gears:[0,3],arm_offsets:[new s.r(1,.2,0),new s.r(2,.2,1)],pen_offset:new s.r(3,0,2.5),trace_length:1e3}}make_gears(t,e){const i=[],r=t.half_height,a=t.radii;for(let n=0;n<a.length;n++){const o=a[n],h=t.phases[n];if(0===n){const a=new d({parent:e.to_joint("translate"),radius:o,offset:s.r.Zero(),initial_angle:h,half_height:r,angular_velocity:t.angular_velocity});i.push(a)}else{const e=new l({parent:i[n-1].to_joint("translate"),radius:o,offset_angle:t.contact_angles[n-1],initial_angle:h,half_height:r});i.push(e)}}return i}make_arm_points(t,e){const[i,s]=t.arm_gears,[r,n]=t.arm_offsets,o=e[i],h=e[s];return[new a.a({parent:o.to_joint("rotate"),offset:r,show_offset:!0}),new a.a({parent:h.to_joint("rotate"),offset:n,show_offset:!0})]}init(t){const e=new a.a,i=this.make_gears(t,e),s=this.make_arm_points(t,i),r=new c({parents:s.map(t=>t.to_joint("translate"))}),n=new a.a({parent:r.to_joint("rotate"),offset:t.pen_offset,show_offset:!0}),o=new _.a({source:n.to_joint("translate"),target:i[1].to_joint("rotate"),origin:i[1].to_joint("rotate"),num_points:t.trace_length});return this.add_part(e),this.add_parts(i),this.add_parts(s),this.add_part(r),this.add_part(n),this.add_part(o),e}}var g=i(72),m=i(70);class w extends r.a{get default_parameters(){return{parent:void 0,size:new s.r(3,3,3),frequencies:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1,1.1,1.2],weights:[1,1,1,1,1,1,1,1,1,1,1,1],phases:[0,0,0,0,0,0,0,0,0,0,0,0],trace_length:1e4}}static get NUM_OSCILATORS(){return 12}static get DIRECTIONS(){const t=new s.r(1,0,0),e=new s.r(0,1,0),i=new s.r(0,0,1),r=new s.r(-1,0,0);return{up:e,down:new s.r(0,-1,0),left:r,right:t,front:new s.r(0,0,-1),back:i}}static get OSCILATION_DIRECTIONS(){const t=this.DIRECTIONS;return[t.right,t.right,t.right,t.right,t.up,t.up,t.up,t.up,t.back,t.back,t.back,t.back]}get_offsets(t){const e=t.size,i=w.DIRECTIONS,s=i.front.scale(e.z),r=i.back.scale(e.z),a=i.left.scale(e.x),n=i.right.scale(e.x),o=i.up.scale(e.y),h=i.down.scale(e.y);return[s.add(o),s.add(h),r.add(o),r.add(h),s.add(a),s.add(n),r.add(a),r.add(n),a.add(o),a.add(h),n.add(o),n.add(h)]}get_amplitudes(t){const e=t.size;return[e.x,e.x,e.x,e.x,e.y,e.y,e.y,e.y,e.z,e.z,e.z,e.z]}make_oscillators(t,e){const i=[],s=(t.size,t.phases),r=t.frequencies,a=w.OSCILATION_DIRECTIONS,n=this.get_offsets(t),o=this.get_amplitudes(t),h=e.to_joint("translate");for(let t=0;t<w.NUM_OSCILATORS;t++){const e=new g.a({parent:h,offset:n[t],direction:a[t],amplitude:o[t],frequency:r[t],phase:s[t],radius:.2});i.push(e)}return i}init(t){const e=new a.a({parent:t.parent,offset:s.r.Zero(),show_offset:!1}),i=this.make_oscillators(t,e),r=new m.a({points:i.map(t=>t.to_joint("translate_wave")),origin:e.to_joint("translate"),weights:t.weights}),n=new _.a({source:r.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_parts(i),this.add_part(r,"centroid"),this.add_part(n),e}}var v=i(71),y=i(73),b=i(68),x=i(44);i.d(e,"machines",(function(){return I})),i.d(e,"metadata",(function(){return x.metadata}));const I=[new v.a({part:new y.a({parent:void 0,amplitudes:new s.r(.5,6,.5),frequencies:new s.r(4,.05,4),phases:new s.r(0,0,Math.PI/2),waves:[new b.a,new b.a,new b.a]}),trace_joint:"translate_wave",trace_length:2e3,time_step:.01}),new w({size:new s.r(4,4,4),frequencies:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1,1.1,1.2],weights:[1,.5,.5,1,1,.5,.5,1,1,.5,.5,1],phases:[0,0,0,0,1,1,1,1,2,2,2,2].map(t=>t*Math.PI/4),trace_length:750}),new f({angular_velocity:4,half_height:.1,radii:[2,5,3,7],phases:[0,0,0,0],contact_angles:[4,2,3].map(t=>t*Math.PI/4),arm_gears:[0,3],arm_offsets:[new s.r(1,.2,.1),new s.r(0,.2,1.5)],pen_offset:new s.r(4,0,4),trace_length:4e3})]},62:function(t,e,i){"use strict";var s=i(0);class r{constructor(t,e){this.part=t,this.node_name=e}get node(){return this.part[this.node_name]}get matrix(){return this.node.getWorldMatrix()}get inverse_matrix(){return s.g.Invert(this.matrix)}get position(){return s.r.TransformCoordinates(s.r.Zero(),this.matrix)}}i.d(e,"a",(function(){return n}));let a=0;class n{static make_id(){const t=a;return a++,t}constructor(t){this.init({...this.default_parameters,...t}),this.id=`${this.part_type}-${n.make_id()}`}get part_type(){return"part"}get transform_names(){return[]}get primitive_names(){return[]}get default_parameters(){return{parent:void 0}}change_parent(t){this.parent=t}init(t){this.parent=t.parent}get parents(){return void 0!==this.parent?[this.parent.part]:[]}update(t){}build(t){}to_joint(t){return new r(this,t)}}},64:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));class s{constructor(t){this.part_table=new Map,this.vertices=[],this.edges=new Map,this.labels=new Map,this.is_sorted=!0,this.root_part=this.init({...this.default_parameters,...t})}get machine_type(){return"machine"}get default_parameters(){return{parent:void 0}}get time_step(){return 1/60}add_edge(t,e){this.edges.has(t)||this.edges.set(t,[]),this.edges.get(t).push(e)}add_part(t,e){const i=t.id;this.vertices.push(i),this.part_table.set(i,t),this.labels.set(e,i),this.is_sorted=!1;for(let e of t.parents){const t=e.id;this.add_edge(t,i)}}add_parts(t){for(let e of t)this.add_part(e)}get_part(t){return this.part_table.get(t)}find_part(t){const e=this.labels.get(t);return this.get_part(e)}postorder(t,e,i){if(e.has(t))return;e.add(t);const s=this.edges.get(t)||[];for(let t of s)this.postorder(t,e,i);i.push(t)}get is_empty(){return 0==this.vertices.length}topological_sort(){if(this.is_empty)return;const t=new Set,e=[];for(let i of this.vertices)this.postorder(i,t,e);e.reverse(),this.vertices=e}*parts(){this.is_sorted||(this.topological_sort(),this.is_sorted=!0);for(let t of this.vertices)yield this.part_table.get(t)}init(t){}build(t){let e=void 0;for(let i of this.parts()){const s=i.build(t);void 0===e&&(e=s)}return e}update(t){for(let e of this.parts())e.update(t)}}},65:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var s=i(0),r=i(29),a=i(61),n=i(62);class o extends n.a{get default_parameters(){return{offset:s.r.Zero(),parent:void 0,show_offset:!1}}init(t){super.init(t),this.offset=t.offset,this.show_offset=t.show_offset}get part_type(){return"point"}get transform_names(){return["translate"]}get primitive_names(){return["line"]}make_line(t){return a.a.CreateLines(`${this.id}-line`,{points:[s.r.Zero(),this.offset.negate()]},t)}build(t){const e=new r.a(`${this.id}-translate`,t);if(e.position=this.offset,void 0!==this.parent&&(e.parent=this.parent.node),this.translate=e,this.show_offset){const i=this.make_line(t);i.parent=e,this.line=i}return e}}},66:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var s=i(0),r=(i(29),i(61)),a=i(62),n=i(67);class o extends a.a{get default_parameters(){return{source:void 0,target:void 0,origin:void 0,num_points:1e3,color:new s.d(1,.5,0,1)}}init(t){this.source=Object(n.a)(t,"source"),this.target=t.target,this.origin=Object(n.a)(t,"origin"),this.points=[],this.num_points=t.num_points,this.color=t.color}get primitive_names(){return["polyline_primitive"]}init_points(){const t=[],e=this.compute_point();for(let i=0;i<this.num_points;i++)t.push(e);return t}get part_type(){return"trace"}get parents(){const t=[this.source.part,this.origin.part];return void 0!==this.target&&t.push(this.target.part),t}build(t){const e=this.init_points(),i=r.a.CreateLines(`${this.id}-polyline`,{colors:Array(e.length).fill(this.color),updatable:!0,points:e},t);i.parent=this.origin.node,this.polyline_primitive=i,this.points=e}compute_point(){let t=this.source.position;if(void 0!==this.target){const e=this.target.inverse_matrix;t=s.r.TransformCoordinates(t,e)}else{const e=this.origin.inverse_matrix;t=s.r.TransformCoordinates(t,e)}return t}update(t){const e=this.points,i=this.compute_point();e.push(i),e.shift(),this.polyline_primitive=r.a.CreateLines(`${this.id}-polyline`,{instance:this.polyline_primitive,points:e})}}},67:function(t,e,i){"use strict";function s(t,e){const i=t[e];if(null==i)throw new Error(`${e} is required`);return i}i.d(e,"a",(function(){return s}))},68:function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var s=i(69);class r extends s.a{compute(t){return Math.sin(t)}}},69:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));class s{compute(t){}}},70:function(t,e,i){"use strict";i.d(e,"a",(function(){return h}));var s=i(0),r=i(29),a=i(61),n=i(63),o=i(62);class h extends o.a{get default_parameters(){return{points:[]}}constructor(t){super(t),this.points=t.points,this.origin=t.origin,this.weights=t.weights,this.translate=void 0,this.sphere_primitive=void 0}get part_type(){return"centroid"}get parents(){const t=this.points.map(t=>t.part);return t.push(this.origin.part),t}static compute_point(t,e){const i=t.position;return s.r.TransformCoordinates(i,e)}get centroid(){const t=this.origin.inverse_matrix,e=this.points.map(e=>h.compute_point(e,t)),i=this.weights,r=s.r.Zero();let a=0;for(let t=0;t<e.length;t++){const s=i[t];r.addInPlace(e[t].scale(s)),a+=s}return r.scale(1/a)}build(t){const e=new r.a(`${this.id}-translate`,t);e.position=s.r.Zero(),e.parent=this.origin.node,this.translate=e;const i=a.a.CreateSphere(`${this.id}-sphere`,{diameter:.2},t);i.material=new n.a(`${this.id}-mat-grid`,t),i.parent=e,this.sphere_primitive=i}update(t){const e=this.centroid;this.translate.position=e}}},71:function(t,e,i){"use strict";i.d(e,"a",(function(){return h}));var s=i(0),r=i(64),a=i(65),n=i(66),o=i(67);class h extends r.a{get default_parameters(){return{origin_offset:s.r.Zero(),trace_length:1e3,part:void 0,trace_joint:"translate",time_step:1/60}}get time_step(){return this._time_step}init(t){this._time_step=t.time_step;const e=new a.a({offset:t.origin_offset,show_offset:!1}),i=Object(o.a)(t,"part");i.parent=e.to_joint("translate");const s=new n.a({source:i.to_joint(t.trace_joint),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_part(i),this.add_part(s),e}}},72:function(t,e,i){"use strict";i.d(e,"a",(function(){return p}));var s=i(0),r=i(29),a=i(61),n=i(63),o=i(62),h=i(68);class p extends o.a{get default_parameters(){return{parent:void 0,offset:s.r.Zero(),amplitude:1,phase:0,direction:new s.r(0,1,0),frequency:1,radius:.1,wave:new h.a}}init(t){super.init(t),this.offset=t.offset,this.amplitude=t.amplitude,this.phase=t.phase,this.direction=t.direction,this.frequency=t.frequency,this.radius=t.radius,this.wave=t.wave}get transform_names(){return["translate","translate_wave","scale"]}get primitive_names(){return["line_primitive","sphere_primitive"]}get part_type(){return"osc"}build(t){const e=new r.a(`${this.id}-translate`,t);e.position=this.offset,void 0!==this.parent&&(e.parent=this.parent.node),this.translate=e;const i=new r.a(`${this.id}-translate-wave`,t);i.position=s.r.Zero(),i.parent=e,this.translate_wave=i;const o=a.a.CreateSphere(`${this.id}-sphere`,{diameter:2*this.radius},t);o.material=new n.a(`${this.id}-mat-grid`,t),o.parent=i,this.sphere_primitive=o;const h=a.a.CreateLines(`${this.id}-line`,{points:[this.direction.scale(this.amplitude),this.direction.scale(-this.amplitude)]},t);h.parent=e,this.line_primitive=h}update(t){const e=this.amplitude*this.wave.compute(2*Math.PI*this.frequency*t+this.phase),i=this.direction.scale(e);this.translate_wave.position=i}}},73:function(t,e,i){"use strict";i.d(e,"a",(function(){return p}));var s=i(0),r=i(29),a=i(61),n=i(63),o=i(62),h=i(68);class p extends o.a{get default_parameters(){return{parent:void 0,amplitudes:new s.r(1,1,1),frequencies:new s.r(1,.1,1),phases:new s.r(0,0,Math.PI/2),waves:[new h.a,new h.a,new h.a]}}init(t){super.init(t),this.frequencies=t.frequencies,this.phases=t.phases,this.amplitudes=t.amplitudes,this.waves=t.waves}get transform_names(){return["translate","translate_wave"]}get primitive_names(){return["sphere_primitive"]}get part_type(){return"xyzosc"}get parents(){return void 0!==this.parent?[this.parent.part]:[]}build(t){const e=new r.a(`${this.id}-translate-wave`,t);e.position=this.compute_wave(0),void 0!==this.parent&&(e.parent=this.parent.node),this.translate_wave=e;const i=a.a.CreateSphere(`${this.id}-sphere`,{diameter:.2},t);i.material=new n.a(`${this.id}-mat-grid`,t),i.parent=e,this.sphere_primitive=i}compute_wave(t){const e=2*Math.PI*this.frequencies.x*t+this.phases.x,i=2*Math.PI*this.frequencies.y*t+this.phases.y,r=2*Math.PI*this.frequencies.z*t+this.phases.z,[a,n,o]=this.waves,h=this.amplitudes.x*a.compute(e),p=this.amplitudes.y*n.compute(i),d=this.amplitudes.z*o.compute(r);return new s.r(h,p,d)}update(t){this.translate_wave.position=this.compute_wave(t)}}}}]);