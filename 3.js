(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{58:function(t,e,a){"use strict";a.r(e);var r=a(0),n=(a(79),a(81),a(82),a(83),a(61)),s=a(62),i=a(63);var o=a(73);var _=a(76),d=a(84);var l=a(67),c=a(65);var u=a(70);class h extends n.a{get default_parameters(){return{trace_length:2e3,height:3,amps:[0,1,.5,.25],freqs:[0,1,.5,.25],rotate_freq:2,rotate_radius:5}}static get OFFSETS(){return[new r.r(1,-2,1),new r.r(-1,-2,1),new r.r(1,-2,-1),new r.r(-1,-2,-1)]}make_tree(t,e,a,r){if(0===r)return[a];const n=t.amps[r],s=t.freqs[r],i=h.OFFSETS.map(t=>new l.a({parent:a.to_joint("translate_wave"),amplitude:n,frequency:s,offset:t}));this.add_parts(i);const o=[a],_=i.map(a=>this.make_tree(t,e,a,r-1));return o.concat(..._)}init(t){const e=new s.a,a=new l.a({parent:e.to_joint("translate")}),n=this.make_tree(t,a,a,t.height),o=new u.a({points:n.map(t=>t.to_joint("translate_wave")),weights:n.map(t=>1),origin:e.to_joint("translate")}),_=new c.a({parent:o.to_joint("translate"),radius:t.rotate_radius,axes:[new r.r(0,1,0)],angular_frequencies:[t.rotate_freq]}),d=new i.a({source:_.to_joint("translate"),origin:e.to_joint("translate"),trace_length:t.trace_length});return this.add_part(e),this.add_part(a),this.add_part(o),this.add_part(_),this.add_part(d),e}}var w=a(77);a(85),a(69),a(78);a.d(e,"machines",(function(){return q}));new class extends n.a{get default_parameters(){return{trace_length:1e3}}init(t){const e=new s.a,a=new i.a({source:e.to_joint("translate"),target:e.to_joint("translate"),origin:e.to_joint("translate"),trace_length:t.trace_length});return this.add_part(e),this.add_part(a),e}};const p=new class extends n.a{get default_parameters(){return{trace_length:1e3,frame_radius:1.5,wheel_radius:.3}}get time_step(){return.01}init(t){const e=new s.a,a=new o.a({parent:e.to_joint("translate"),wheel_radius:t.wheel_radius}),r=new o.a({parent:e.to_joint("translate"),wheel_radius:-t.wheel_radius}),n=new i.a({source:a.to_joint("translate_offset"),origin:e.to_joint("translate"),trace_length:t.trace_length}),_=new i.a({source:r.to_joint("translate_offset"),origin:e.to_joint("translate"),trace_length:t.trace_length});return this.add_part(e),this.add_part(a),this.add_part(r),this.add_part(n),this.add_part(_),e}},g=new class extends n.a{get default_parameters(){return{trace_length:1e3,num_oscs:6,rotation_freq:1,osc_freq:.1,radius:2,wave:new w.a({amplitudes:[1,2,3],frequencies:[2,4,8]})}}make_oscs(t,e){const a=[],n=t.num_oscs,s=t.radius,i=t.wave,o=t.osc_freq;for(let t=0;t<n;t++){const _=2*Math.PI*t/n,d=new r.r(Math.cos(_),0,Math.sin(_)),c=new l.a({parent:e.to_joint("rotate"),direction:new r.r(0,1,0),offset:d.scale(s),frequency:o,wave:i});a.push(c)}return a}make_traces(t,e,a){return a.map(t=>new i.a({source:t.to_joint("translate_wave"),origin:e.to_joint("translate")}))}init(t){const e=new s.a,a=new c.a({parent:e.to_joint("translate"),radius:t.radius,axes:[new r.r(0,1,0)],angular_frequencies:[t.rotation_freq]}),n=this.make_oscs(t,a),i=this.make_traces(t,e,n);return this.add_part(e),this.add_part(a),this.add_parts(n),this.add_parts(i),e}},f=new class extends n.a{get default_parameters(){return{trace_length:1e3}}init(t){const e=new s.a,a=new d.a({parent:e.to_joint("translate")}),r=new _.a({parent:a.to_joint("scale")}),n=new i.a({source:r.to_joint("translate_wave"),target:e.to_joint("translate"),origin:e.to_joint("translate"),trace_length:t.trace_length});return this.add_part(e),this.add_part(a),this.add_part(r),this.add_part(n),e}},j=new class extends n.a{get default_parameters(){return{trace_length:4e3,angular_frequencies:[2,.1]}}init(t){const e=new s.a,a=new l.a({parent:e.to_joint("translate"),direction:new r.r(0,0,1)}),n=new s.a({parent:a.to_joint("translate_wave"),offset:new r.r(0,-3,0),show_offset:!0}),o=new c.a({parent:n.to_joint("translate"),axes:[new r.r(1,0,0),new r.r(0,1,0)],start_direction:new r.r(0,0,1),angular_frequencies:t.angular_frequencies}),_=new i.a({source:o.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_part(a),this.add_part(n),this.add_part(o),this.add_part(_),e}},m=new h,q=(new class extends n.a{get default_parameters(){return{trace_length:1e3}}init(t){const e=new s.a,a=new i.a({source:e.to_joint("translate"),target:e.to_joint("translate"),origin:e.to_joint("translate"),trace_length:t.trace_length});return this.add_part(e),this.add_part(a),e}},new class extends n.a{get default_parameters(){return{trace_length:1e3}}init(t){const e=new s.a,a=new i.a({source:e.to_joint("translate"),target:e.to_joint("translate"),origin:e.to_joint("translate"),trace_length:t.trace_length});return this.add_part(e),this.add_part(a),e}},[j,spiral_spheres,m,f,g,p])}}]);