(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-704fe663"],{bb51:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-page"},[a("div",{staticClass:"banner"},[a("div",{staticClass:"container"},[a("h1",{staticClass:"logo-font"},[t._v(t._s(t.$t("app-name")))]),a("p",[t._v(t._s(t.$t("app-slogan")))])])]),a("div",{staticClass:"container page"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-9"},[a("div",{staticClass:"feed-toggle"},[a("ul",{staticClass:"nav nav-pills outline-active"},[t.isAuthenticated?a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:{name:"home-my-feed"},"active-class":"active"}},[t._v("\n                "+t._s(t.$t("your-feed"))+"\n              ")])],1):t._e(),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:{name:"home"},exact:"","active-class":"active"}},[t._v("\n                "+t._s(t.$t("global-feed"))+"\n              ")])],1),t.tag?a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:{name:"home-tag",params:{tag:t.tag}},"active-class":"active"}},[a("i",{staticClass:"ion-pound"}),t._v(" "+t._s(t.tag)+"\n              ")])],1):t._e()])]),a("router-view")],1),a("div",{staticClass:"col-md-3"},[a("div",{staticClass:"sidebar"},[a("p",[t._v(t._s(t.$t("popular-tags")))]),a("div",{staticClass:"tag-list"},t._l(t.tags,function(t,e){return a("RwvTag",{key:e,attrs:{name:t}})}),1)])])])])])},n=[],i=(a("8e6e"),a("ac6a"),a("456d"),a("bd86")),r=a("2f62"),c=a("f53f"),o=a("6c33");function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,s)}return a}function u(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(a,!0).forEach(function(e){Object(i["a"])(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(a).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var p={name:"Home",components:{RwvTag:c["a"]},mounted:function(){this.$store.dispatch(o["r"])},computed:u({},Object(r["b"])(["isAuthenticated","tags"]),{tag:function(){return this.$route.params.tag}})},v=p,m=a("2877"),f=Object(m["a"])(v,s,n,!1,null,null,null);e["default"]=f.exports},f53f:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("router-link",{class:t.className,attrs:{to:t.homeRoute},domProps:{textContent:t._s(t.name)}})},n=[],i={name:"RwvTag",props:{name:{type:String,required:!0},className:{type:String,default:"tag-pill tag-default"}},computed:{homeRoute:function(){return{name:"home-tag",params:{tag:name}}}}},r=i,c=a("2877"),o=Object(c["a"])(r,s,n,!1,null,null,null);e["a"]=o.exports}}]);
//# sourceMappingURL=chunk-704fe663.cc109a97.js.map