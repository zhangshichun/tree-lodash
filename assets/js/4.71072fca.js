(window.webpackJsonp=window.webpackJsonp||[]).push([[4,6,10],{239:function(t,e,a){},241:function(t,e,a){"use strict";a(239)},242:function(t,e,a){"use strict";a.r(e);var s={props:{treeData:{type:Object}},watch:{treeData(){var t,e,a;null===(t=this.graph)||void 0===t||t.data(this.treeData),null===(e=this.graph)||void 0===e||e.render(),null===(a=this.graph)||void 0===a||a.fitView()}},mounted(){const t=new G6.TreeGraph({container:this.$refs.tree,width:300,height:300,defaultNode:{type:"tree-node",size:26,anchorPoints:[[.5,.5],[.5,.5]]},defaultEdge:{type:"cubic-horizontal"},layout:{type:"compactBox",direction:"LR",getId:function(t){return t.key},getHeight:function(){return 16},getWidth:function(){return 16},getVGap:function(){return 40},getHGap:function(){return 20}}});this.graph=t,t.data(this.treeData),t.render(),t.fitView()}},r=a(14),n=Object(r.a)(s,(function(){return(0,this._self._c)("div",{ref:"tree",staticClass:"tree"})}),[],!1,null,null,null);e.default=n.exports},243:function(t,e,a){"use strict";a.r(e);var s={model:{prop:"strategy",event:"change"},props:{strategy:{type:String,default:null}},methods:{onChange(t){this.$emit("change",t.target.value)}}},r=(a(241),a(14)),n=Object(r.a)(s,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"demo-layout"},[t._t("tree"),t._v(" "),e("div",{staticClass:"operations"},[e("div",{staticClass:"strategies"},[t._v("\n      选择遍历策略：\n      "),e("div",{staticClass:"strategy"},[e("input",{attrs:{type:"radio",id:"pre",name:"drone",value:"pre"},domProps:{checked:"pre"==t.strategy},on:{change:t.onChange}}),t._v(" "),e("label",{attrs:{for:"pre"}},[t._v("pre")])]),t._v(" "),e("div",{staticClass:"strategy"},[e("input",{attrs:{type:"radio",id:"post",name:"drone",value:"post"},domProps:{checked:"post"==t.strategy},on:{change:t.onChange}}),t._v(" "),e("label",{attrs:{for:"post"}},[t._v("post")])]),t._v(" "),e("div",{staticClass:"strategy"},[e("input",{attrs:{type:"radio",id:"breadth",name:"drone",value:"breadth"},domProps:{checked:"breadth"==t.strategy},on:{change:t.onChange}}),t._v(" "),e("label",{attrs:{for:"breadth"}},[t._v("breadth")])])]),t._v(" "),e("div",{staticClass:"buttons"},[t._t("buttons")],2)])],2)}),[],!1,null,"4e2fb5df",null);e.default=n.exports},258:function(t,e,a){},280:function(t,e,a){"use strict";a(258)},288:function(t,e,a){"use strict";a.r(e);a(90);var s=a(242),r=a(243);const n={key:1,children:[{key:11,children:[{key:111},{key:112}]},{key:12,children:[{key:122,children:[{key:1221},{key:1222}]}]}]};var i={components:{Tree:s.default,Layout:r.default},data:()=>({strategy:"pre",passedItems:[],invalidItems:[]}),computed:{treeData(){return window.treeLodash.map(n,t=>{const e=this.passedItems.some(e=>e.key===t.key),a=this.invalidItems.some(e=>e.key===t.key),s=e?"green":a?"red":"#fff";return{...t,label:t.key,style:{fill:s}}})}},methods:{play(){this.passedItems=[],this.invalidItems=[],clearTimeout(this.timer);const t=[];window.treeLodash.find(this.treeData,e=>{const a=e.key<100&&e.key>10;return t.push({result:a,item:e}),a},{strategy:this.strategy});const e=()=>{const a=t.shift();if(a){a.result?this.passedItems.push(a.item):this.invalidItems.push(a.item)}t.length&&(this.timer=setTimeout(e,500))};e()}}},o=(a(280),a(14)),l=Object(o.a)(i,(function(){var t=this,e=t._self._c;return e("Layout",{model:{value:t.strategy,callback:function(e){t.strategy=e},expression:"strategy"}},[e("template",{slot:"tree"},[e("Tree",{staticClass:"tree",attrs:{treeData:t.treeData}})],1),t._v(" "),e("template",{slot:"buttons"},[e("button",{staticClass:"primary-btn",on:{click:t.play}},[t._v("play(尝试一下！)")])])],2)}),[],!1,null,"cec34f1a",null);e.default=l.exports}}]);