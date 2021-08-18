(this.webpackJsonpudacitycapstone=this.webpackJsonpudacitycapstone||[]).push([[0],{118:function(e,t,a){},120:function(e,t,a){"use strict";a.r(t);var n,i=a(0),c=a.n(i),r=a(7),s=a.n(r),o=a(85),l=a(184),j=a(185),d=a(42),b=a(69),h=a(151),u=a(31),m=a(30),x=a(36),O=a(61),p=Object(O.b)({name:"darkMode",initialState:{status:null!==(n=JSON.parse(localStorage.getItem("darkMode")))&&void 0!==n&&n},reducers:{toggle:function(e){var t=!e.status;e.status=t,localStorage.setItem("darkMode",JSON.stringify(t))}}}),g=p.actions.toggle,f=p.reducer,y=a(186),v=a(157),k=a(158),w=a(154),C=a(33),N=a(189),S=a(188),I=a(161),M=a(162),P=a(190),L=a(165),A=a(160),z=a(121),B=a(166),T=a(168),W=a(155),D=a(156),E=a(159),F=a(163),G=a(164),J=a(167),R=a(169),H=a(170),K=a(171),U=a(172),V=a(173),Y=a(2),q=Object(h.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1,"@media (max-width:400px)":{fontSize:"1.2rem"},"@media (max-width:253px)":{fontSize:"0.8rem"}},drawer:{width:240,"@media (max-width:240px)":{width:190}},drawerHeader:Object(b.a)(Object(b.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"space-between"}),linkStyle:{color:"inherit",textDecorationLine:"inherit"},shortcutButtons:{display:"flex",justifyContent:"space-between",alignItems:"center","@media (max-width:480px)":{display:"none"}}}}));function Q(){var e=q(),t=Object(u.b)(),a=t.user,n=t.isAuthenticated,i=t.loginWithRedirect,r=t.logout,s=c.a.useState(null),o=Object(d.a)(s,2),l=o[0],j=o[1],b=Object(x.c)((function(e){return e.darkMode.status})),h=c.a.useState(!1),O=Object(d.a)(h,2),p=O[0],f=O[1],Q=c.a.useState(!b),X=Object(d.a)(Q,2),Z=X[0],$=X[1],_=Boolean(l),ee=Object(x.b)();function te(){f(!1)}var ae=function(){j(null)};function ne(){return Object(Y.jsx)(y.a,{onChange:ie,title:"Toggle Dark Mode",checked:Z,icon:Object(Y.jsx)(W.a,{style:{color:"#fff"}}),checkedIcon:Object(Y.jsx)(D.a,{}),color:"default"})}function ie(e){$(e.target.checked),ee(g())}return Object(Y.jsxs)("div",{className:e.root,children:[Object(Y.jsx)(v.a,{position:"static",children:Object(Y.jsxs)(k.a,{children:[Object(Y.jsx)(w.a,{edge:"start",className:e.menuButton,color:"inherit",onClick:function(){return f(!0)},"aria-label":"menu",children:Object(Y.jsx)(E.a,{})}),Object(Y.jsx)(C.a,{variant:"h6",className:e.title,children:"Movies Rating"}),Object(Y.jsxs)("div",{className:e.shortcutButtons,children:[Object(Y.jsx)(ne,{}),n?Object(Y.jsxs)("div",{children:[Object(Y.jsx)(w.a,{"aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){j(e.currentTarget)},color:"inherit",children:Object(Y.jsx)(N.a,{alt:a.name,src:a.picture})}),Object(Y.jsxs)(S.a,{id:"menu-appbar",anchorEl:l,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:_,onClose:ae,children:[Object(Y.jsx)(m.b,{to:"myprofile",className:e.linkStyle,children:Object(Y.jsx)(I.a,{onClick:ae,children:"Profile"})}),Object(Y.jsx)(I.a,{onClick:function(){return r()},children:"Logout"})]})]}):Object(Y.jsx)(M.a,{variant:"contained",color:"default",endIcon:Object(Y.jsx)(F.a,{}),onClick:function(){return i()},children:"Login"})]})]})}),Object(Y.jsxs)(P.a,{classes:{paper:e.drawer},open:p,onClose:te,children:[Object(Y.jsxs)("div",{className:e.drawerHeader,children:[Object(Y.jsx)(ne,{}),Object(Y.jsx)(w.a,{onClick:te,children:Object(Y.jsx)(G.a,{})})]}),Object(Y.jsx)(L.a,{}),Object(Y.jsx)("div",{role:"presentation",onClick:te,onKeyDown:te,children:Object(Y.jsxs)(A.a,{children:[Object(Y.jsx)(m.b,{to:"/",className:e.linkStyle,children:Object(Y.jsxs)(z.a,{button:!0,children:[Object(Y.jsx)(B.a,{children:Object(Y.jsx)(J.a,{})}),Object(Y.jsx)(T.a,{primary:"Home"})]},"home")}),n?Object(Y.jsxs)(c.a.Fragment,{children:[Object(Y.jsx)(m.b,{to:"/newmovie",className:e.linkStyle,children:Object(Y.jsxs)(z.a,{button:!0,children:[Object(Y.jsx)(B.a,{children:Object(Y.jsx)(R.a,{})}),Object(Y.jsx)(T.a,{primary:"New Movie"})]},"newmovie")}),Object(Y.jsx)(m.b,{to:"/myProfile",className:e.linkStyle,children:Object(Y.jsxs)(z.a,{button:!0,children:[Object(Y.jsx)(B.a,{children:Object(Y.jsx)(F.a,{})}),Object(Y.jsx)(T.a,{primary:"My Profile"})]},"myProfile")}),Object(Y.jsxs)(z.a,{button:!0,onClick:function(){return r({returnTo:window.location.origin})},children:[Object(Y.jsx)(B.a,{children:Object(Y.jsx)(H.a,{})}),Object(Y.jsx)(T.a,{primary:"Logout"})]},"Logout")]}):Object(Y.jsxs)(z.a,{button:!0,onClick:function(){return i()},children:[Object(Y.jsx)(B.a,{children:Object(Y.jsx)(K.a,{})}),Object(Y.jsx)(T.a,{primary:"Login"})]},"Login"),Object(Y.jsx)(L.a,{}),Object(Y.jsx)(m.b,{to:"/Contactus",className:e.linkStyle,children:Object(Y.jsxs)(z.a,{button:!0,children:[Object(Y.jsx)(B.a,{children:Object(Y.jsx)(U.a,{})}),Object(Y.jsx)(T.a,{primary:"Contact us"})]},"/Contactus")}),Object(Y.jsx)(m.b,{to:"/Aboutus",className:e.linkStyle,children:Object(Y.jsxs)(z.a,{button:!0,children:[Object(Y.jsx)(B.a,{children:Object(Y.jsx)(V.a,{})}),Object(Y.jsx)(T.a,{primary:"About us"})]},"/Aboutus")})]})})]})]})}var X=a(12),Z=a(175),$=a(176),_=a(180),ee=a(179),te=a(178),ae=a(174),ne=a(177),ie=Object(h.a)({root:{padding:"0 5 5",display:"flex",justifyContent:"center",alignItems:"center",marginTop:100},gridPadding:{padding:5},card:{maxWidth:345,width:300},img:{width:"auto",height:"auto",borderRadius:5},notLoggedIn:{textAlign:"center"},btn:{fontSize:22,marginTop:15}});function ce(){var e=ie(),t=Object(u.b)(),a=t.user,n=t.isAuthenticated,i=t.loginWithRedirect;return Object(Y.jsx)(ae.a,{className:e.root,children:n?Object(Y.jsxs)(Z.a,{className:e.card,children:[Object(Y.jsxs)($.a,{children:[Object(Y.jsx)(ne.a,{container:!0,justifyContent:"center",alignItems:"center",children:Object(Y.jsx)(ne.a,{item:!0,className:e.gridPadding,children:Object(Y.jsx)(te.a,{className:e.img,component:"img",alt:"Profile pic",image:a.picture,title:"Profile pic"})})}),Object(Y.jsxs)(ee.a,{children:[Object(Y.jsx)(C.a,{gutterBottom:!0,variant:"h6",children:a.name}),Object(Y.jsxs)(C.a,{variant:"body2",color:"textSecondary",component:"p",children:["Email: ",a.email,Object(Y.jsx)("br",{}),"Gender: ",a.gender,Object(Y.jsx)("br",{}),"Birthday: ",a.birthdate,Object(Y.jsx)("br",{}),"Your forms: 8"]})]})]}),Object(Y.jsxs)(_.a,{children:[Object(Y.jsx)(M.a,{size:"small",variant:"outlined",color:"default",disabled:!0,children:"Edit"}),Object(Y.jsx)(M.a,{size:"small",variant:"outlined",color:"default",disabled:!0,children:"Change password"})]})]}):Object(Y.jsxs)("div",{className:e.notLoggedIn,children:[Object(Y.jsx)(C.a,{variant:"h4",children:"You are not logged in, Please login to view this page"}),Object(Y.jsx)("hr",{}),Object(Y.jsx)(M.a,{className:e.btn,variant:"contained",color:"default",endIcon:Object(Y.jsx)(F.a,{}),onClick:function(){return i()},children:"Login"})]})})}var re=a(191),se=(a(118),Object(h.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:"#000"}}})));function oe(){var e=se();return Object(Y.jsx)(Y.Fragment,{children:Object(Y.jsx)(re.a,{className:e.backdrop,open:!0,children:Object(Y.jsxs)("div",{className:"lds-ripple",children:[Object(Y.jsx)("div",{}),Object(Y.jsx)("div",{})]})})})}var le=a(55),je=a(4),de=a(182),be=a(183),he=a(181),ue=a(82),me=a.n(ue),xe=a(83),Oe=a.n(xe),pe=a(84),ge=a.n(pe),fe=a(81),ye=a.n(fe),ve=Object(h.a)((function(e){return{root:{maxWidth:345},media:{height:0,paddingTop:"56.25%"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:he.a[500]}}}));function ke(e){var t=ve(),a=c.a.useState(!1),n=Object(d.a)(a,2),i=n[0],r=n[1];return Object(Y.jsxs)(Z.a,{className:t.root,children:[Object(Y.jsx)(de.a,{avatar:Object(Y.jsx)(N.a,{"aria-label":"recipe",className:t.avatar,children:e.rate}),action:Object(Y.jsx)(w.a,{"aria-label":"settings",children:Object(Y.jsx)(ye.a,{})}),title:e.title,subheader:e.date}),Object(Y.jsx)(te.a,{className:t.media,image:e.image,title:"poster"}),Object(Y.jsx)(ee.a,{children:Object(Y.jsx)(C.a,{variant:"body2",color:"textSecondary",component:"p",children:e.description})}),Object(Y.jsxs)(_.a,{disableSpacing:!0,children:[Object(Y.jsx)(w.a,{"aria-label":"Like",children:Object(Y.jsx)(me.a,{})}),Object(Y.jsx)(w.a,{"aria-label":"share",children:Object(Y.jsx)(Oe.a,{})}),Object(Y.jsx)(w.a,{className:Object(je.a)(t.expand,Object(le.a)({},t.expandOpen,i)),onClick:function(){r(!i)},disabled:!0,"aria-expanded":i,"aria-label":"show more",children:Object(Y.jsx)(ge.a,{})})]}),Object(Y.jsx)(be.a,{in:i,timeout:"auto",unmountOnExit:!0,children:Object(Y.jsx)(ee.a,{})})]})}var we=Object(h.a)({root:{padding:"0 5 5",display:"flex",justifyContent:"center",alignItems:"center",margin:50}}),Ce=[{name:"Gunpowder Milkshake",imgPath:"http://127.0.0.1:5000/static/images/gunpowder.jpg",description:"The film stars Karen Gillan as a young assassin who must team up with her estranged assassin mother...",rate:6,date:"July 14, 2021"},{name:"Cruella",imgPath:"http://127.0.0.1:5000/static/images/cruella.jpg",description:"Cruella is a 2021 American crime comedy film based on the character Cruella de Vil from Dodie Smith's...",rate:7.4,date:"May 28, 2021"},{name:"",imgPath:"http://127.0.0.1:5000/static/images/blast-from-past.jpg",description:"Eccentric American scientist Dr. Calvin Webber (Christopher Walken) believes nuclear war with the Soviet Union is imminent...",rate:6.6,date:"February 12, 1999"},{name:"Gunpowder Milkshake",imgPath:"http://127.0.0.1:5000/static/images/gunpowder.jpg",description:"The film stars Karen Gillan as a young assassin who must team up with her estranged assassin mother...",rate:6,date:"July 14, 2021"},{name:"Cruella",imgPath:"http://127.0.0.1:5000/static/images/cruella.jpg",description:"Cruella is a 2021 American crime comedy film based on the character Cruella de Vil from Dodie Smith's...",rate:7.4,date:"May 28, 2021"},{name:"",imgPath:"http://127.0.0.1:5000/static/images/blast-from-past.jpg",description:"Eccentric American scientist Dr. Calvin Webber (Christopher Walken) believes nuclear war with the Soviet Union is imminent...",rate:6.6,date:"February 12, 1999"}];function Ne(){var e=we();return Object(Y.jsx)(ae.a,{className:e.root,children:Object(Y.jsx)(ne.a,{spacing:2,container:!0,justifyContent:"center",alignItems:"center",children:Ce.map((function(e,t){return Object(Y.jsx)(ne.a,{item:!0,children:Object(Y.jsx)(ke,{date:e.date,rate:e.rate,title:e.name,image:e.imgPath,description:e.description})},t)}))})})}function Se(){var e=Object(x.c)((function(e){return e.darkMode.status})),t=Object(u.b)().isLoading,a=c.a.useMemo((function(){return Object(o.a)({palette:{type:e?"dark":"light",primary:{main:e?"#002984":"#3f51b5"}}})}),[e]);return Object(Y.jsxs)(l.a,{theme:a,children:[Object(Y.jsx)(j.a,{}),Object(Y.jsxs)(m.a,{children:[Object(Y.jsx)(Q,{}),t?Object(Y.jsx)(oe,{}):Object(Y.jsxs)(X.c,{children:[Object(Y.jsx)(X.a,{path:"/",exact:!0,component:Ne}),Object(Y.jsx)(X.a,{path:"/myprofile",component:ce}),Object(Y.jsx)(X.a,{path:"/aboutus",children:Object(Y.jsxs)("div",{style:{textAlign:"center"},children:[Object(Y.jsx)("h1",{children:"Capstone"}),Object(Y.jsx)("p",{children:"This is the Capstone project for the Full-Stack Nanodegree"})]})}),Object(Y.jsx)(X.a,{path:"/contactus",children:Object(Y.jsx)("h1",{children:"Contact us"})})]})]})]})}var Ie=Object(O.a)({reducer:{darkMode:f}});s.a.render(Object(Y.jsx)(u.a,{domain:"dev-yl2ra7dk.us.auth0.com",clientId:"tuq7hBIMP0FnpmNVpJtyhMzgljB2StF7",redirectUri:window.location.origin,children:Object(Y.jsx)(x.a,{store:Ie,children:Object(Y.jsx)(Se,{})})}),document.getElementById("root"))}},[[120,1,2]]]);
//# sourceMappingURL=main.401dc0ee.chunk.js.map