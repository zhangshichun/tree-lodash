(window.webpackJsonp=window.webpackJsonp||[]).push([[3,6,10],{239:function(t,e,s){},241:function(t,e,s){"use strict";s(239)},242:function(t,e,s){"use strict";s.r(e);var a={props:{treeData:{type:Object}},watch:{treeData(){var t,e,s;null===(t=this.graph)||void 0===t||t.data(this.treeData),null===(e=this.graph)||void 0===e||e.render(),null===(s=this.graph)||void 0===s||s.fitView()}},mounted(){const t=new G6.TreeGraph({container:this.$refs.tree,width:300,height:300,defaultNode:{type:"tree-node",size:26,anchorPoints:[[.5,.5],[.5,.5]]},defaultEdge:{type:"cubic-horizontal"},layout:{type:"compactBox",direction:"LR",getId:function(t){return t.key},getHeight:function(){return 16},getWidth:function(){return 16},getVGap:function(){return 40},getHGap:function(){return 20}}});this.graph=t,t.data(this.treeData),t.render(),t.fitView()}},r=s(14),n=Object(r.a)(a,(function(){return(0,this._self._c)("div",{ref:"tree",staticClass:"tree"})}),[],!1,null,null,null);e.default=n.exports},243:function(t,e,s){"use strict";s.r(e);var a={model:{prop:"strategy",event:"change"},props:{strategy:{type:String,default:null}},methods:{onChange(t){this.$emit("change",t.target.value)}}},r=(s(241),s(14)),n=Object(r.a)(a,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"demo-layout"},[t._t("tree"),t._v(" "),e("div",{staticClass:"operations"},[e("div",{staticClass:"strategies"},[t._v("\n      选择遍历策略：\n      "),e("div",{staticClass:"strategy"},[e("input",{attrs:{type:"radio",id:"pre",name:"drone",value:"pre"},domProps:{checked:"pre"==t.strategy},on:{change:t.onChange}}),t._v(" "),e("label",{attrs:{for:"pre"}},[t._v("pre")])]),t._v(" "),e("div",{staticClass:"strategy"},[e("input",{attrs:{type:"radio",id:"post",name:"drone",value:"post"},domProps:{checked:"post"==t.strategy},on:{change:t.onChange}}),t._v(" "),e("label",{attrs:{for:"post"}},[t._v("post")])]),t._v(" "),e("div",{staticClass:"strategy"},[e("input",{attrs:{type:"radio",id:"breadth",name:"drone",value:"breadth"},domProps:{checked:"breadth"==t.strategy},on:{change:t.onChange}}),t._v(" "),e("label",{attrs:{for:"breadth"}},[t._v("breadth")])])]),t._v(" "),e("div",{staticClass:"buttons"},[t._t("buttons")],2)])],2)}),[],!1,null,"4e2fb5df",null);e.default=n.exports},258:function(t,e,s){},280:function(t,e,s){"use strict";s(258)},288:function(t,e,s){"use strict";s.r(e);s(90);var a=s(242),r=s(243);const n={key:1,children:[{key:11,children:[{key:111},{key:112}]},{key:12,children:[{key:122,children:[{key:1221},{key:1222}]}]}]};var i={components:{Tree:a.default,Layout:r.default},data:()=>({strategy:"pre",passedItems:[],invalidItems:[]}),computed:{treeData(){return window.treeLodash.map(n,t=>{const e=this.passedItems.some(e=>e.key===t.key),s=this.invalidItems.some(e=>e.key===t.key),a=e?"green":s?"red":"#fff";return{...t,label:t.key,style:{fill:a}}})}},methods:{play(){this.passedItems=[],this.invalidItems=[],clearTimeout(this.timer);const t=[];window.treeLodash.filter(this.treeData,e=>{const s=e.key<100;return t.push({result:s,item:e}),s},{strategy:this.strategy});const e=()=>{const s=t.shift();if(s){s.result?this.passedItems.push(s.item):this.invalidItems.push(s.item)}t.length&&(this.timer=setTimeout(e,500))};e()}}},o=(s(280),s(14)),l=Object(o.a)(i,(function(){var t=this,e=t._self._c;return e("Layout",{model:{value:t.strategy,callback:function(e){t.strategy=e},expression:"strategy"}},[e("template",{slot:"tree"},[e("Tree",{staticClass:"tree",attrs:{treeData:t.treeData}})],1),t._v(" "),e("template",{slot:"buttons"},[e("button",{staticClass:"primary-btn",on:{click:t.play}},[t._v("play(尝试一下！)")])])],2)}),[],!1,null,"2d739c44",null);e.default=l.exports}}]);