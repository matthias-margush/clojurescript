goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('cljs.analyzer');
goog.require('clojure.string');
goog.require('cljs.io');
cljs.compiler.js_reserved = cljs.core.PersistentHashSet.fromArray(["new","debugger","enum","default","abstract","goto","private","finally","const","in","import","package","with","throw","continue","var","boolean","byte","for","public","transient","do","delete","instanceof","throws","yield","static","protected","int","return","case","implements","typeof","while","double","methods","synchronized","void","switch","export","final","char","native","class","function","extends","else","interface","try","let","catch","super","short","volatile","float","long","if","this","break"]);
cljs.compiler._STAR_position_STAR_ = null;
cljs.compiler._STAR_emitted_provides_STAR_ = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.ObjMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = cljs.core.PersistentHashSet.fromArray(["deps.cljs"]);
cljs.compiler.ns_first_segments = cljs.core.atom.call(null,cljs.core.set(["clojure","cljs"]));
cljs.compiler.CHAR_MAP = cljs.core.ObjMap.fromObject(["@","!","\"","#","%","&","'","*","+","-","/",":","[","{","<","\\","|","=","]","}",">","^","~","?"],{"@":"_CIRCA_","!":"_BANG_","\"":"_DOUBLEQUOTE_","#":"_SHARP_","%":"_PERCENT_","&":"_AMPERSAND_","'":"_SINGLEQUOTE_","*":"_STAR_","+":"_PLUS_","-":"_","/":"_SLASH_",":":"_COLON_","[":"_LBRACK_","{":"_LBRACE_","<":"_LT_","\\":"_BSLASH_","|":"_BAR_","=":"_EQ_","]":"_RBRACK_","}":"_RBRACE_",">":"_GT_","^":"_CARET_","~":"_TILDE_","?":"_QMARK_"});
cljs.compiler.munge = (function() {
var munge = null;
var munge__1 = (function (s){
return munge.call(null,s,cljs.compiler.js_reserved);
});
var munge__2 = (function (s,reserved){
if(cljs.core.map_QMARK_.call(null,s))
{var map__4400 = s;
var map__4400__$1 = ((cljs.core.seq_QMARK_.call(null,map__4400))?cljs.core.apply.call(null,cljs.core.hash_map,map__4400):map__4400);
var info = map__4400__$1;
var field = cljs.core._lookup.call(null,map__4400__$1,"\uFDD0'field",null);
var name = cljs.core._lookup.call(null,map__4400__$1,"\uFDD0'name",null);
var depth = (function (){var d = 0;
var G__4402 = info;
var map__4403 = G__4402;
var map__4403__$1 = ((cljs.core.seq_QMARK_.call(null,map__4403))?cljs.core.apply.call(null,cljs.core.hash_map,map__4403):map__4403);
var shadow = cljs.core._lookup.call(null,map__4403__$1,"\uFDD0'shadow",null);
var d__$1 = d;
var G__4402__$1 = G__4402;
while(true){
var d__$2 = d__$1;
var map__4404 = G__4402__$1;
var map__4404__$1 = ((cljs.core.seq_QMARK_.call(null,map__4404))?cljs.core.apply.call(null,cljs.core.hash_map,map__4404):map__4404);
var shadow__$1 = cljs.core._lookup.call(null,map__4404__$1,"\uFDD0'shadow",null);
if(cljs.core.truth_(shadow__$1))
{{
var G__4405 = (d__$2 + 1);
var G__4406 = shadow__$1;
d__$1 = G__4405;
G__4402__$1 = G__4406;
continue;
}
} else
{if(cljs.core.truth_(cljs.core.deref.call(null,cljs.compiler.ns_first_segments).call(null,[cljs.core.str(name)].join(''))))
{return (d__$2 + 1);
} else
{if("\uFDD0'else")
{return d__$2;
} else
{return null;
}
}
}
break;
}
})();
var renamed = cljs.compiler._STAR_lexical_renames_STAR_.call(null,cljs.core.hash.call(null,s));
var munged_name = munge.call(null,(cljs.core.truth_(field)?[cljs.core.str("self__."),cljs.core.str(name)].join(''):(cljs.core.truth_(renamed)?renamed:(("\uFDD0'else")?name:null))),reserved);
if(cljs.core.truth_((function (){var or__3824__auto__ = field;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return (depth === 0);
}
})()))
{return munged_name;
} else
{return cljs.core.symbol.call(null,[cljs.core.str(munged_name),cljs.core.str("__$"),cljs.core.str(depth)].join(''));
}
} else
{var ss = clojure.string.replace.call(null,[cljs.core.str(s)].join(''),/[.][.]/,"_DOTDOT_");
var ss__$1 = clojure.string.replace.call(null,ss,/\/(.)/,".$1");
var ss__$2 = clojure.string.join.call(null,".",cljs.core.map.call(null,(function (p1__4393_SHARP_){
if(cljs.core.truth_(reserved.call(null,p1__4393_SHARP_)))
{return [cljs.core.str(p1__4393_SHARP_),cljs.core.str("$")].join('');
} else
{return p1__4393_SHARP_;
}
}),clojure.string.split.call(null,ss__$1,/[.]/)));
var ms = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__4394_SHARP_){
return cljs.core._lookup.call(null,cljs.compiler.CHAR_MAP,p1__4394_SHARP_,p1__4394_SHARP_);
}),ss__$2));
if(cljs.core.symbol_QMARK_.call(null,s))
{return cljs.core.symbol.call(null,ms);
} else
{return ms;
}
}
});
munge = function(s,reserved){
switch(arguments.length){
case 1:
return munge__1.call(this,s);
case 2:
return munge__2.call(this,s,reserved);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
munge.cljs$lang$arity$1 = munge__1;
munge.cljs$lang$arity$2 = munge__2;
return munge;
})()
;
cljs.compiler.comma_sep = (function comma_sep(xs){
return cljs.core.interpose.call(null,",",xs);
});
cljs.compiler.escape_char = (function escape_char(c){
var cp = c.charCodeAt(0);
var G__4408 = cp;
if(cljs.core._EQ_.call(null,9,G__4408))
{return "\\t";
} else
{if(cljs.core._EQ_.call(null,13,G__4408))
{return "\\r";
} else
{if(cljs.core._EQ_.call(null,10,G__4408))
{return "\\n";
} else
{if(cljs.core._EQ_.call(null,12,G__4408))
{return "\\f";
} else
{if(cljs.core._EQ_.call(null,8,G__4408))
{return "\\b";
} else
{if(cljs.core._EQ_.call(null,92,G__4408))
{return "\\\\";
} else
{if(cljs.core._EQ_.call(null,34,G__4408))
{return "\\\"";
} else
{if("\uFDD0'else")
{if((function (){var and__3822__auto__ = (31 < cp);
if(and__3822__auto__)
{return (cp < 127);
} else
{return and__3822__auto__;
}
})())
{return c;
} else
{return cljs.core.apply.call(null,cljs.core.str,"\\u",cljs.core.take_last.call(null,4,[cljs.core.str("0000"),cljs.core.str(cp.toString(16))].join('')));
}
} else
{return null;
}
}
}
}
}
}
}
}
});
cljs.compiler.escape_pattern = (function escape_pattern(pattern){
return pattern.split("\\/").join("/").split("/").join("\\/");
});
cljs.compiler.escape_string = (function escape_string(s){
return cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__4409_SHARP_){
return cljs.compiler.escape_char.call(null,p1__4409_SHARP_);
}),s));
});
cljs.compiler.wrap_in_double_quotes = (function wrap_in_double_quotes(x){
return [cljs.core.str("\""),cljs.core.str(x),cljs.core.str("\"")].join('');
});
cljs.compiler.emit = (function (){var method_table__2178__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var prefer_table__2179__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var method_cache__2180__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var cached_hierarchy__2181__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var hierarchy__2182__auto__ = cljs.core._lookup.call(null,cljs.core.ObjMap.EMPTY,"\uFDD0'hierarchy",cljs.core.global_hierarchy);
return (new cljs.core.MultiFn("emit","\uFDD0'op","\uFDD0'default",hierarchy__2182__auto__,method_table__2178__auto__,prefer_table__2179__auto__,method_cache__2180__auto__,cached_hierarchy__2181__auto__));
})();
/**
* @param {...*} var_args
*/
cljs.compiler.emits = (function() { 
var emits__delegate = function (xs){
var G__4413_4416 = cljs.core.seq.call(null,xs);
while(true){
if(G__4413_4416)
{var x_4417 = cljs.core.first.call(null,G__4413_4416);
if((x_4417 == null))
{} else
{if(cljs.core.map_QMARK_.call(null,x_4417))
{cljs.compiler.emit.call(null,x_4417);
} else
{if(cljs.core.seq_QMARK_.call(null,x_4417))
{cljs.core.apply.call(null,emits,x_4417);
} else
{if(cljs.core.fn_QMARK_.call(null,x_4417))
{x_4417.call(null);
} else
{if("\uFDD0'else")
{var s_4418 = cljs.core.print_str.call(null,x_4417);
if(cljs.core.truth_(cljs.compiler._STAR_position_STAR_))
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_position_STAR_,((function (G__4413_4416,s_4418,x_4417){
return (function (p__4414){
var vec__4415 = p__4414;
var line = cljs.core.nth.call(null,vec__4415,0,null);
var column = cljs.core.nth.call(null,vec__4415,1,null);
return cljs.core.PersistentVector.fromArray([line,(column + cljs.core.count.call(null,s_4418))], true);
});})(G__4413_4416,s_4418,x_4417))
);
} else
{}
cljs.core.print.call(null,s_4418);
} else
{}
}
}
}
}
{
var G__4419 = cljs.core.next.call(null,G__4413_4416);
G__4413_4416 = G__4419;
continue;
}
} else
{}
break;
}
return null;
};
var emits = function (var_args){
var xs = null;
if (goog.isDef(var_args)) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return emits__delegate.call(this, xs);
};
emits.cljs$lang$maxFixedArity = 0;
emits.cljs$lang$applyTo = (function (arglist__4420){
var xs = cljs.core.seq(arglist__4420);;
return emits__delegate(xs);
});
emits.cljs$lang$arity$variadic = emits__delegate;
return emits;
})()
;
cljs.compiler.emit_str = (function emit_str(expr){
var sb__2218__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_4423_4425 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2219__auto__){
return sb__2218__auto__.append(x__2219__auto__);
});
cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_4423_4425;
}return [cljs.core.str(sb__2218__auto__)].join('');
});
/**
* @param {...*} var_args
*/
cljs.compiler.emitln = (function() { 
var emitln__delegate = function (xs){
cljs.core.apply.call(null,cljs.compiler.emits,xs);
cljs.core.println.call(null);
if(cljs.core.truth_(cljs.compiler._STAR_position_STAR_))
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_position_STAR_,(function (p__4428){
var vec__4429 = p__4428;
var line = cljs.core.nth.call(null,vec__4429,0,null);
var column = cljs.core.nth.call(null,vec__4429,1,null);
return cljs.core.PersistentVector.fromArray([(line + 1),0], true);
}));
} else
{}
return null;
};
var emitln = function (var_args){
var xs = null;
if (goog.isDef(var_args)) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return emitln__delegate.call(this, xs);
};
emitln.cljs$lang$maxFixedArity = 0;
emitln.cljs$lang$applyTo = (function (arglist__4430){
var xs = cljs.core.seq(arglist__4430);;
return emitln__delegate(xs);
});
emitln.cljs$lang$arity$variadic = emitln__delegate;
return emitln;
})()
;
cljs.compiler.emit_provide = (function emit_provide(sym){
if((function (){var or__3824__auto__ = (cljs.compiler._STAR_emitted_provides_STAR_ == null);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,cljs.compiler._STAR_emitted_provides_STAR_),sym);
}
})())
{return null;
} else
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_emitted_provides_STAR_,cljs.core.conj,sym);
return cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,sym),"');");
}
});
/**
* @param {...*} var_args
*/
cljs.compiler.emit_meta_constant = (function() { 
var emit_meta_constant__delegate = function (x,body){
if(cljs.core.truth_(cljs.core.meta.call(null,x)))
{cljs.compiler.emits.call(null,"cljs.core.with_meta(",body,",");
cljs.compiler.emit_constant.call(null,cljs.core.meta.call(null,x));
return cljs.compiler.emits.call(null,")");
} else
{return cljs.compiler.emits.call(null,body);
}
};
var emit_meta_constant = function (x,var_args){
var body = null;
if (goog.isDef(var_args)) {
  body = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return emit_meta_constant__delegate.call(this, x, body);
};
emit_meta_constant.cljs$lang$maxFixedArity = 1;
emit_meta_constant.cljs$lang$applyTo = (function (arglist__4431){
var x = cljs.core.first(arglist__4431);
var body = cljs.core.rest(arglist__4431);
return emit_meta_constant__delegate(x, body);
});
emit_meta_constant.cljs$lang$arity$variadic = emit_meta_constant__delegate;
return emit_meta_constant;
})()
;
cljs.compiler.emit_constant_keyword = (function emit_constant_keyword(x){
return cljs.compiler.emits.call(null,"\"","\\uFDD0","'",(cljs.core.truth_(cljs.core.namespace.call(null,x))?[cljs.core.str(cljs.core.namespace.call(null,x)),cljs.core.str("/")].join(''):""),cljs.core.name.call(null,x),"\"");
});
cljs.compiler.emit_constant_symbol = (function emit_constant_symbol(x){
return cljs.compiler.emits.call(null,"(new cljs.core.Symbol(",(cljs.core.truth_(cljs.core.meta.call(null,x))?cljs.compiler.emit_constant.call(null,cljs.core.meta.call(null,x)):"null"),",",[cljs.core.str("\""),cljs.core.str(x),cljs.core.str("\"")].join(''),"))");
});
cljs.compiler.emit_constant_map = (function emit_constant_map(x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.hash_map("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4432_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4432_SHARP_);
});
}),cljs.core.apply.call(null,cljs.core.concat,x))),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.compiler.emit_constant_set = (function emit_constant_set(x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.set(["], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4433_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4433_SHARP_);
});
}),x)),cljs.core.PersistentVector.fromArray(["])"], true)));
});
cljs.compiler.EmitConstant = {};
cljs.compiler.emit_constant = (function emit_constant(x){
if((function (){var and__3822__auto__ = x;
if(and__3822__auto__)
{return x.cljs$compiler$EmitConstant$emit_constant$arity$1;
} else
{return and__3822__auto__;
}
})())
{return x.cljs$compiler$EmitConstant$emit_constant$arity$1(x);
} else
{var x__2006__auto__ = (((x == null))?null:x);
return (function (){var or__3824__auto__ = (cljs.compiler.emit_constant[goog.typeOf(x__2006__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.compiler.emit_constant["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"EmitConstant.emit-constant",x);
}
}
})().call(null,x);
}
});
(cljs.compiler.EmitConstant["null"] = true);
(cljs.compiler.emit_constant["null"] = (function (x){
return cljs.compiler.emits.call(null,"null");
}));
cljs.core.PersistentArrayMap.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_map.call(null,x);
});
(cljs.compiler.EmitConstant["number"] = true);
(cljs.compiler.emit_constant["number"] = (function (x){
return cljs.compiler.emits.call(null,x);
}));
cljs.core.EmptyList.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.EmptyList.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,"cljs.core.List.EMPTY");
});
(cljs.compiler.EmitConstant["boolean"] = true);
(cljs.compiler.emit_constant["boolean"] = (function (x){
return cljs.compiler.emits.call(null,(cljs.core.truth_(x)?"true":"false"));
}));
(cljs.compiler.EmitConstant["string"] = true);
(cljs.compiler.emit_constant["string"] = (function (x){
if(cljs.core.keyword_QMARK_.call(null,x))
{return cljs.compiler.emit_constant_keyword.call(null,x);
} else
{if("\uFDD0'else")
{return cljs.compiler.emits.call(null,cljs.compiler.wrap_in_double_quotes.call(null,cljs.compiler.escape_string.call(null,x)));
} else
{return null;
}
}
}));
RegExp.prototype.cljs$compiler$EmitConstant$ = true;
RegExp.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
var vec__4437 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str(x)].join(''));
var _ = cljs.core.nth.call(null,vec__4437,0,null);
var flags = cljs.core.nth.call(null,vec__4437,1,null);
var pattern = cljs.core.nth.call(null,vec__4437,2,null);
return cljs.compiler.emits.call(null,[cljs.core.str("/"),cljs.core.str(cljs.compiler.escape_pattern.call(null,pattern)),cljs.core.str("/"),cljs.core.str(flags)].join(''));
});
cljs.core.ObjMap.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.ObjMap.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_map.call(null,x);
});
cljs.core.PersistentVector.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentVector.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.vec(["], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4436_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4436_SHARP_);
});
}),x)),cljs.core.PersistentVector.fromArray(["])"], true)));
});
cljs.core.PersistentTreeSet.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentTreeSet.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_set.call(null,x);
});
cljs.core.PersistentHashMap.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentHashMap.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_map.call(null,x);
});
cljs.core.Cons.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.Cons.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.list("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4435_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4435_SHARP_);
});
}),x)),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.core.Symbol.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.Symbol.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_symbol.call(null,x);
});
cljs.core.PersistentTreeMap.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentTreeMap.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_map.call(null,x);
});
cljs.core.List.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.List.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.list("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4434_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4434_SHARP_);
});
}),x)),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.core.PersistentHashSet.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentHashSet.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_set.call(null,x);
});
cljs.compiler.emit_block = (function emit_block(context,statements,ret){
if(cljs.core.truth_(statements))
{cljs.compiler.emits.call(null,statements);
} else
{}
return cljs.compiler.emit.call(null,ret);
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'no-op",(function (m){
return null;
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'var",(function (p__4438){
var map__4439 = p__4438;
var map__4439__$1 = ((cljs.core.seq_QMARK_.call(null,map__4439))?cljs.core.apply.call(null,cljs.core.hash_map,map__4439):map__4439);
var arg = map__4439__$1;
var env = cljs.core._lookup.call(null,map__4439__$1,"\uFDD0'env",null);
var info = cljs.core._lookup.call(null,map__4439__$1,"\uFDD0'info",null);
var n = (new cljs.core.Keyword("\uFDD0'name")).call(null,info);
var n__$1 = ((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,n),"js"))?cljs.core.name.call(null,n):info);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,n__$1));
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'meta",(function (p__4440){
var map__4441 = p__4440;
var map__4441__$1 = ((cljs.core.seq_QMARK_.call(null,map__4441))?cljs.core.apply.call(null,cljs.core.hash_map,map__4441):map__4441);
var env = cljs.core._lookup.call(null,map__4441__$1,"\uFDD0'env",null);
var meta = cljs.core._lookup.call(null,map__4441__$1,"\uFDD0'meta",null);
var expr = cljs.core._lookup.call(null,map__4441__$1,"\uFDD0'expr",null);
var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.array_map_threshold = 16;
cljs.compiler.obj_map_threshold = 32;
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'map",(function (p__4442){
var map__4443 = p__4442;
var map__4443__$1 = ((cljs.core.seq_QMARK_.call(null,map__4443))?cljs.core.apply.call(null,cljs.core.hash_map,map__4443):map__4443);
var vals = cljs.core._lookup.call(null,map__4443__$1,"\uFDD0'vals",null);
var keys = cljs.core._lookup.call(null,map__4443__$1,"\uFDD0'keys",null);
var simple_keys_QMARK_ = cljs.core._lookup.call(null,map__4443__$1,"\uFDD0'simple-keys?",null);
var env = cljs.core._lookup.call(null,map__4443__$1,"\uFDD0'env",null);
var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if((cljs.core.count.call(null,keys) === 0))
{cljs.compiler.emits.call(null,"cljs.core.ObjMap.EMPTY");
} else
{if(cljs.core.truth_((function (){var and__3822__auto__ = simple_keys_QMARK_;
if(cljs.core.truth_(and__3822__auto__))
{return (cljs.core.count.call(null,keys) <= cljs.compiler.obj_map_threshold);
} else
{return and__3822__auto__;
}
})()))
{cljs.compiler.emits.call(null,"cljs.core.ObjMap.fromObject([",cljs.compiler.comma_sep.call(null,keys),"],{",cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (k,v){
var sb__2218__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_4444_4446 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2219__auto__){
return sb__2218__auto__.append(x__2219__auto__);
});
cljs.compiler.emit.call(null,k);
cljs.core.print.call(null,":");
cljs.compiler.emit.call(null,v);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_4444_4446;
}return [cljs.core.str(sb__2218__auto__)].join('');
}),keys,vals)),"})");
} else
{if((cljs.core.count.call(null,keys) <= cljs.compiler.array_map_threshold))
{cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.fromArrays([",cljs.compiler.comma_sep.call(null,keys),"],[",cljs.compiler.comma_sep.call(null,vals),"])");
} else
{if("\uFDD0'else")
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashMap.fromArrays([",cljs.compiler.comma_sep.call(null,keys),"],[",cljs.compiler.comma_sep.call(null,vals),"])");
} else
{}
}
}
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'vector",(function (p__4447){
var map__4448 = p__4447;
var map__4448__$1 = ((cljs.core.seq_QMARK_.call(null,map__4448))?cljs.core.apply.call(null,cljs.core.hash_map,map__4448):map__4448);
var env = cljs.core._lookup.call(null,map__4448__$1,"\uFDD0'env",null);
var items = cljs.core._lookup.call(null,map__4448__$1,"\uFDD0'items",null);
var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.empty_QMARK_.call(null,items))
{cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else
{cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep.call(null,items),"], true)");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'set",(function (p__4449){
var map__4450 = p__4449;
var map__4450__$1 = ((cljs.core.seq_QMARK_.call(null,map__4450))?cljs.core.apply.call(null,cljs.core.hash_map,map__4450):map__4450);
var env = cljs.core._lookup.call(null,map__4450__$1,"\uFDD0'env",null);
var items = cljs.core._lookup.call(null,map__4450__$1,"\uFDD0'items",null);
var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.empty_QMARK_.call(null,items))
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.EMPTY");
} else
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.fromArray([",cljs.compiler.comma_sep.call(null,items),"])");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'constant",(function (p__4451){
var map__4452 = p__4451;
var map__4452__$1 = ((cljs.core.seq_QMARK_.call(null,map__4452))?cljs.core.apply.call(null,cljs.core.hash_map,map__4452):map__4452);
var env = cljs.core._lookup.call(null,map__4452__$1,"\uFDD0'env",null);
var form = cljs.core._lookup.call(null,map__4452__$1,"\uFDD0'form",null);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emit_constant.call(null,form);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.get_tag = (function get_tag(e){
var or__3824__auto__ = (new cljs.core.Keyword("\uFDD0'tag")).call(null,e);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return (new cljs.core.Keyword("\uFDD0'tag")).call(null,(new cljs.core.Keyword("\uFDD0'info")).call(null,e));
}
});
cljs.compiler.infer_tag = (function infer_tag(e){
var temp__3971__auto__ = cljs.compiler.get_tag.call(null,e);
if(cljs.core.truth_(temp__3971__auto__))
{var tag = temp__3971__auto__;
return tag;
} else
{var G__4455 = (new cljs.core.Keyword("\uFDD0'op")).call(null,e);
if(cljs.core._EQ_.call(null,"\uFDD0'constant",G__4455))
{var G__4456 = (new cljs.core.Keyword("\uFDD0'form")).call(null,e);
if(cljs.core._EQ_.call(null,false,G__4456))
{return (new cljs.core.Symbol(null,"boolean"));
} else
{if(cljs.core._EQ_.call(null,true,G__4456))
{return (new cljs.core.Symbol(null,"boolean"));
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'if",G__4455))
{var then_tag = infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'then")).call(null,e));
var else_tag = infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'else")).call(null,e));
if(cljs.core._EQ_.call(null,then_tag,else_tag))
{return then_tag;
} else
{return null;
}
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'let",G__4455))
{return infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'ret")).call(null,e));
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
}
}
});
cljs.compiler.safe_test_QMARK_ = (function safe_test_QMARK_(e){
var tag = cljs.compiler.infer_tag.call(null,e);
var or__3824__auto__ = cljs.core.PersistentHashSet.fromArray([(new cljs.core.Symbol(null,"boolean")),(new cljs.core.Symbol(null,"seq"))]).call(null,tag);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{if(cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'op")).call(null,e),"\uFDD0'constant"))
{var form = (new cljs.core.Keyword("\uFDD0'form")).call(null,e);
return cljs.core.not.call(null,(function (){var or__3824__auto____$1 = (function (){var and__3822__auto__ = cljs.core.string_QMARK_.call(null,form);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,form,"");
} else
{return and__3822__auto__;
}
})();
if(cljs.core.truth_(or__3824__auto____$1))
{return or__3824__auto____$1;
} else
{var and__3822__auto__ = cljs.core.number_QMARK_.call(null,form);
if(and__3822__auto__)
{return (form === 0);
} else
{return and__3822__auto__;
}
}
})());
} else
{return null;
}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'if",(function (p__4457){
var map__4458 = p__4457;
var map__4458__$1 = ((cljs.core.seq_QMARK_.call(null,map__4458))?cljs.core.apply.call(null,cljs.core.hash_map,map__4458):map__4458);
var unchecked = cljs.core._lookup.call(null,map__4458__$1,"\uFDD0'unchecked",null);
var env = cljs.core._lookup.call(null,map__4458__$1,"\uFDD0'env",null);
var else$ = cljs.core._lookup.call(null,map__4458__$1,"\uFDD0'else",null);
var then = cljs.core._lookup.call(null,map__4458__$1,"\uFDD0'then",null);
var test = cljs.core._lookup.call(null,map__4458__$1,"\uFDD0'test",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
var checked = cljs.core.not.call(null,(function (){var or__3824__auto__ = unchecked;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.compiler.safe_test_QMARK_.call(null,test);
}
})());
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"(",((checked)?"cljs.core.truth_":null),"(",test,")?",then,":",else$,")");
} else
{if(checked)
{cljs.compiler.emitln.call(null,"if(cljs.core.truth_(",test,"))");
} else
{cljs.compiler.emitln.call(null,"if(",test,")");
}
cljs.compiler.emitln.call(null,"{",then,"} else");
return cljs.compiler.emitln.call(null,"{",else$,"}");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'throw",(function (p__4459){
var map__4460 = p__4459;
var map__4460__$1 = ((cljs.core.seq_QMARK_.call(null,map__4460))?cljs.core.apply.call(null,cljs.core.hash_map,map__4460):map__4460);
var env = cljs.core._lookup.call(null,map__4460__$1,"\uFDD0'env",null);
var throw$ = cljs.core._lookup.call(null,map__4460__$1,"\uFDD0'throw",null);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return cljs.compiler.emits.call(null,"(function(){throw ",throw$,"})()");
} else
{return cljs.compiler.emitln.call(null,"throw ",throw$,";");
}
}));
/**
* Emit a nicely formatted comment string.
*/
cljs.compiler.emit_comment = (function emit_comment(doc,jsdoc){
var docs = (cljs.core.truth_(doc)?cljs.core.PersistentVector.fromArray([doc], true):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.call(null,docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.call(null,cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = (function print_comment_lines(e){
var G__4465 = cljs.core.seq.call(null,clojure.string.split_lines.call(null,e));
while(true){
if(G__4465)
{var next_line = cljs.core.first.call(null,G__4465);
cljs.compiler.emitln.call(null,"* ",clojure.string.trim.call(null,next_line));
{
var G__4467 = cljs.core.next.call(null,G__4465);
G__4465 = G__4467;
continue;
}
} else
{return null;
}
break;
}
});
if(cljs.core.seq.call(null,docs__$2))
{cljs.compiler.emitln.call(null,"/**");
var G__4466_4468 = cljs.core.seq.call(null,docs__$2);
while(true){
if(G__4466_4468)
{var e_4469 = cljs.core.first.call(null,G__4466_4468);
if(cljs.core.truth_(e_4469))
{print_comment_lines.call(null,e_4469);
} else
{}
{
var G__4470 = cljs.core.next.call(null,G__4466_4468);
G__4466_4468 = G__4470;
continue;
}
} else
{}
break;
}
return cljs.compiler.emitln.call(null,"*/");
} else
{return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'def",(function (p__4471){
var map__4472 = p__4471;
var map__4472__$1 = ((cljs.core.seq_QMARK_.call(null,map__4472))?cljs.core.apply.call(null,cljs.core.hash_map,map__4472):map__4472);
var export$ = cljs.core._lookup.call(null,map__4472__$1,"\uFDD0'export",null);
var doc = cljs.core._lookup.call(null,map__4472__$1,"\uFDD0'doc",null);
var env = cljs.core._lookup.call(null,map__4472__$1,"\uFDD0'env",null);
var init = cljs.core._lookup.call(null,map__4472__$1,"\uFDD0'init",null);
var name = cljs.core._lookup.call(null,map__4472__$1,"\uFDD0'name",null);
if(cljs.core.truth_(init))
{var mname = cljs.compiler.munge.call(null,name);
cljs.compiler.emit_comment.call(null,doc,(new cljs.core.Keyword("\uFDD0'jsdoc")).call(null,init));
cljs.compiler.emits.call(null,mname);
cljs.compiler.emits.call(null," = ",init);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{} else
{cljs.compiler.emitln.call(null,";");
}
if(cljs.core.truth_(export$))
{return cljs.compiler.emitln.call(null,"goog.exportSymbol('",cljs.compiler.munge.call(null,export$),"', ",mname,");");
} else
{return null;
}
} else
{return null;
}
}));
cljs.compiler.emit_apply_to = (function emit_apply_to(p__4473){
var map__4477 = p__4473;
var map__4477__$1 = ((cljs.core.seq_QMARK_.call(null,map__4477))?cljs.core.apply.call(null,cljs.core.hash_map,map__4477):map__4477);
var env = cljs.core._lookup.call(null,map__4477__$1,"\uFDD0'env",null);
var params = cljs.core._lookup.call(null,map__4477__$1,"\uFDD0'params",null);
var name = cljs.core._lookup.call(null,map__4477__$1,"\uFDD0'name",null);
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str("__delegate")].join('');
var params__$1 = cljs.core.map.call(null,cljs.compiler.munge,params);
cljs.compiler.emitln.call(null,"(function (",arglist,"){");
var G__4478_4480 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.butlast.call(null,params__$1)));
while(true){
if(G__4478_4480)
{var vec__4479_4481 = cljs.core.first.call(null,G__4478_4480);
var i_4482 = cljs.core.nth.call(null,vec__4479_4481,0,null);
var param_4483 = cljs.core.nth.call(null,vec__4479_4481,1,null);
cljs.compiler.emits.call(null,"var ",param_4483," = cljs.core.first(");
var n__2168__auto___4484 = i_4482;
var __4485 = 0;
while(true){
if((__4485 < n__2168__auto___4484))
{cljs.compiler.emits.call(null,"cljs.core.next(");
{
var G__4486 = (__4485 + 1);
__4485 = G__4486;
continue;
}
} else
{}
break;
}
cljs.compiler.emits.call(null,arglist,")");
var n__2168__auto___4487 = i_4482;
var __4488 = 0;
while(true){
if((__4488 < n__2168__auto___4487))
{cljs.compiler.emits.call(null,")");
{
var G__4489 = (__4488 + 1);
__4488 = G__4489;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,";");
{
var G__4490 = cljs.core.next.call(null,G__4478_4480);
G__4478_4480 = G__4490;
continue;
}
} else
{}
break;
}
if((1 < cljs.core.count.call(null,params__$1)))
{cljs.compiler.emits.call(null,"var ",cljs.core.last.call(null,params__$1)," = cljs.core.rest(");
var n__2168__auto___4491 = (cljs.core.count.call(null,params__$1) - 2);
var __4492 = 0;
while(true){
if((__4492 < n__2168__auto___4491))
{cljs.compiler.emits.call(null,"cljs.core.next(");
{
var G__4493 = (__4492 + 1);
__4492 = G__4493;
continue;
}
} else
{}
break;
}
cljs.compiler.emits.call(null,arglist);
var n__2168__auto___4494 = (cljs.core.count.call(null,params__$1) - 2);
var __4495 = 0;
while(true){
if((__4495 < n__2168__auto___4494))
{cljs.compiler.emits.call(null,")");
{
var G__4496 = (__4495 + 1);
__4495 = G__4496;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,");");
cljs.compiler.emitln.call(null,"return ",delegate_name,"(",clojure.string.join.call(null,", ",params__$1),");");
} else
{cljs.compiler.emits.call(null,"var ",cljs.core.last.call(null,params__$1)," = ");
cljs.compiler.emits.call(null,"cljs.core.seq(",arglist,");");
cljs.compiler.emitln.call(null,";");
cljs.compiler.emitln.call(null,"return ",delegate_name,"(",clojure.string.join.call(null,", ",params__$1),");");
}
return cljs.compiler.emits.call(null,"})");
});
cljs.compiler.emit_fn_method = (function emit_fn_method(p__4497){
var map__4499 = p__4497;
var map__4499__$1 = ((cljs.core.seq_QMARK_.call(null,map__4499))?cljs.core.apply.call(null,cljs.core.hash_map,map__4499):map__4499);
var max_fixed_arity = cljs.core._lookup.call(null,map__4499__$1,"\uFDD0'max-fixed-arity",null);
var recurs = cljs.core._lookup.call(null,map__4499__$1,"\uFDD0'recurs",null);
var env = cljs.core._lookup.call(null,map__4499__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4499__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4499__$1,"\uFDD0'statements",null);
var params = cljs.core._lookup.call(null,map__4499__$1,"\uFDD0'params",null);
var variadic = cljs.core._lookup.call(null,map__4499__$1,"\uFDD0'variadic",null);
var name = cljs.core._lookup.call(null,map__4499__$1,"\uFDD0'name",null);
var type = cljs.core._lookup.call(null,map__4499__$1,"\uFDD0'type",null);
var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emitln.call(null,"(function ",cljs.compiler.munge.call(null,name),"(",cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,cljs.compiler.munge,params)),"){");
if(cljs.core.truth_(type))
{cljs.compiler.emitln.call(null,"var self__ = this;");
} else
{}
if(cljs.core.truth_(recurs))
{cljs.compiler.emitln.call(null,"while(true){");
} else
{}
cljs.compiler.emit_block.call(null,"\uFDD0'return",statements,ret);
if(cljs.core.truth_(recurs))
{cljs.compiler.emitln.call(null,"break;");
cljs.compiler.emitln.call(null,"}");
} else
{}
cljs.compiler.emits.call(null,"})");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
});
cljs.compiler.emit_variadic_fn_method = (function emit_variadic_fn_method(p__4503){
var map__4505 = p__4503;
var map__4505__$1 = ((cljs.core.seq_QMARK_.call(null,map__4505))?cljs.core.apply.call(null,cljs.core.hash_map,map__4505):map__4505);
var f = map__4505__$1;
var max_fixed_arity = cljs.core._lookup.call(null,map__4505__$1,"\uFDD0'max-fixed-arity",null);
var recurs = cljs.core._lookup.call(null,map__4505__$1,"\uFDD0'recurs",null);
var env = cljs.core._lookup.call(null,map__4505__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4505__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4505__$1,"\uFDD0'statements",null);
var params = cljs.core._lookup.call(null,map__4505__$1,"\uFDD0'params",null);
var variadic = cljs.core._lookup.call(null,map__4505__$1,"\uFDD0'variadic",null);
var name = cljs.core._lookup.call(null,map__4505__$1,"\uFDD0'name",null);
var type = cljs.core._lookup.call(null,map__4505__$1,"\uFDD0'type",null);
var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
var name_4506__$1 = (function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null);
}
})();
var mname_4507 = cljs.compiler.munge.call(null,name_4506__$1);
var params_4508__$1 = cljs.core.map.call(null,cljs.compiler.munge,params);
var delegate_name_4509 = [cljs.core.str(mname_4507),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.call(null,"(function() { ");
cljs.compiler.emitln.call(null,"var ",delegate_name_4509," = function (",cljs.compiler.comma_sep.call(null,params_4508__$1),"){");
if(cljs.core.truth_(recurs))
{cljs.compiler.emitln.call(null,"while(true){");
} else
{}
cljs.compiler.emit_block.call(null,"\uFDD0'return",statements,ret);
if(cljs.core.truth_(recurs))
{cljs.compiler.emitln.call(null,"break;");
cljs.compiler.emitln.call(null,"}");
} else
{}
cljs.compiler.emitln.call(null,"};");
cljs.compiler.emitln.call(null,"var ",mname_4507," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params_4508__$1),cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(null,"var_args"))], true)):params_4508__$1)),"){");
if(cljs.core.truth_(type))
{cljs.compiler.emitln.call(null,"var self__ = this;");
} else
{}
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,"var ",cljs.core.last.call(null,params_4508__$1)," = null;");
cljs.compiler.emitln.call(null,"if (goog.isDef(var_args)) {");
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params_4508__$1)," = cljs.core.array_seq(Array.prototype.slice.call(arguments, ",(cljs.core.count.call(null,params_4508__$1) - 1),"),0);");
cljs.compiler.emitln.call(null,"} ");
} else
{}
cljs.compiler.emitln.call(null,"return ",delegate_name_4509,".call(",clojure.string.join.call(null,", ",cljs.core.cons.call(null,"this",params_4508__$1)),");");
cljs.compiler.emitln.call(null,"};");
cljs.compiler.emitln.call(null,mname_4507,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");
cljs.compiler.emits.call(null,mname_4507,".cljs$lang$applyTo = ");
cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,"\uFDD0'name",name_4506__$1));
cljs.compiler.emitln.call(null,";");
cljs.compiler.emitln.call(null,mname_4507,".cljs$lang$arity$variadic = ",delegate_name_4509,";");
cljs.compiler.emitln.call(null,"return ",mname_4507,";");
cljs.compiler.emitln.call(null,"})()");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'fn",(function (p__4510){
var map__4511 = p__4510;
var map__4511__$1 = ((cljs.core.seq_QMARK_.call(null,map__4511))?cljs.core.apply.call(null,cljs.core.hash_map,map__4511):map__4511);
var loop_lets = cljs.core._lookup.call(null,map__4511__$1,"\uFDD0'loop-lets",null);
var recur_frames = cljs.core._lookup.call(null,map__4511__$1,"\uFDD0'recur-frames",null);
var variadic = cljs.core._lookup.call(null,map__4511__$1,"\uFDD0'variadic",null);
var max_fixed_arity = cljs.core._lookup.call(null,map__4511__$1,"\uFDD0'max-fixed-arity",null);
var methods$ = cljs.core._lookup.call(null,map__4511__$1,"\uFDD0'methods",null);
var env = cljs.core._lookup.call(null,map__4511__$1,"\uFDD0'env",null);
var name = cljs.core._lookup.call(null,map__4511__$1,"\uFDD0'name",null);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,cljs.core.mapcat.call(null,"\uFDD0'params",cljs.core.filter.call(null,(function (p1__4500_SHARP_){
var and__3822__auto__ = p1__4500_SHARP_;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core.deref.call(null,(new cljs.core.Keyword("\uFDD0'flag")).call(null,p1__4500_SHARP_));
} else
{return and__3822__auto__;
}
}),recur_frames)),cljs.core.mapcat.call(null,"\uFDD0'params",loop_lets))));
if(loop_locals)
{if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emitln.call(null,"((function (",cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,cljs.compiler.munge,loop_locals)),"){");
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{} else
{cljs.compiler.emits.call(null,"return ");
}
} else
{}
if(cljs.core._EQ_.call(null,1,cljs.core.count.call(null,methods$)))
{if(cljs.core.truth_(variadic))
{cljs.compiler.emit_variadic_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),"\uFDD0'name",name));
} else
{cljs.compiler.emit_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),"\uFDD0'name",name));
}
} else
{var has_name_QMARK__4519 = (function (){var and__3822__auto__ = name;
if(cljs.core.truth_(and__3822__auto__))
{return true;
} else
{return and__3822__auto__;
}
})();
var name_4520__$1 = (function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null);
}
})();
var mname_4521 = cljs.compiler.munge.call(null,name_4520__$1);
var maxparams_4522 = cljs.core.map.call(null,cljs.compiler.munge,cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,"\uFDD0'params",methods$)));
var mmap_4523 = cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (method){
return cljs.core.PersistentVector.fromArray([cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str(mname_4521),cljs.core.str("__"),cljs.core.str(cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,method)))].join(''))),method], true);
}),methods$));
var ms_4524 = cljs.core.sort_by.call(null,(function (p1__4501_SHARP_){
return cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,cljs.core.second.call(null,p1__4501_SHARP_)));
}),cljs.core.seq.call(null,mmap_4523));
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emitln.call(null,"(function() {");
cljs.compiler.emitln.call(null,"var ",mname_4521," = null;");
var G__4512_4525 = cljs.core.seq.call(null,ms_4524);
while(true){
if(G__4512_4525)
{var vec__4513_4526 = cljs.core.first.call(null,G__4512_4525);
var n_4527 = cljs.core.nth.call(null,vec__4513_4526,0,null);
var meth_4528 = cljs.core.nth.call(null,vec__4513_4526,1,null);
cljs.compiler.emits.call(null,"var ",n_4527," = ");
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_4528)))
{cljs.compiler.emit_variadic_fn_method.call(null,meth_4528);
} else
{cljs.compiler.emit_fn_method.call(null,meth_4528);
}
cljs.compiler.emitln.call(null,";");
{
var G__4529 = cljs.core.next.call(null,G__4512_4525);
G__4512_4525 = G__4529;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,mname_4521," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_4522),cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(null,"var_args"))], true)):maxparams_4522)),"){");
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,"var ",cljs.core.last.call(null,maxparams_4522)," = var_args;");
} else
{}
cljs.compiler.emitln.call(null,"switch(arguments.length){");
var G__4514_4530 = cljs.core.seq.call(null,ms_4524);
while(true){
if(G__4514_4530)
{var vec__4515_4531 = cljs.core.first.call(null,G__4514_4530);
var n_4532 = cljs.core.nth.call(null,vec__4515_4531,0,null);
var meth_4533 = cljs.core.nth.call(null,vec__4515_4531,1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_4533)))
{cljs.compiler.emitln.call(null,"default:");
cljs.compiler.emitln.call(null,"return ",n_4532,".cljs$lang$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_4522)),(((cljs.core.count.call(null,maxparams_4522) > 1))?", ":null),"cljs.core.array_seq(arguments, ",max_fixed_arity,"));");
} else
{var pcnt_4534 = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,meth_4533));
cljs.compiler.emitln.call(null,"case ",pcnt_4534,":");
cljs.compiler.emitln.call(null,"return ",n_4532,".call(this",(((pcnt_4534 === 0))?null:cljs.core.list.call(null,",",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_4534,maxparams_4522)))),");");
}
{
var G__4535 = cljs.core.next.call(null,G__4514_4530);
G__4514_4530 = G__4535;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,"}");
cljs.compiler.emitln.call(null,"throw(new Error('Invalid arity: ' + arguments.length));");
cljs.compiler.emitln.call(null,"};");
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,mname_4521,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");
cljs.compiler.emitln.call(null,mname_4521,".cljs$lang$applyTo = ",cljs.core.some.call(null,(function (p1__4502_SHARP_){
var vec__4516 = p1__4502_SHARP_;
var n = cljs.core.nth.call(null,vec__4516,0,null);
var m = cljs.core.nth.call(null,vec__4516,1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,m)))
{return n;
} else
{return null;
}
}),ms_4524),".cljs$lang$applyTo;");
} else
{}
if(cljs.core.truth_(has_name_QMARK__4519))
{var G__4517_4536 = cljs.core.seq.call(null,ms_4524);
while(true){
if(G__4517_4536)
{var vec__4518_4537 = cljs.core.first.call(null,G__4517_4536);
var n_4538 = cljs.core.nth.call(null,vec__4518_4537,0,null);
var meth_4539 = cljs.core.nth.call(null,vec__4518_4537,1,null);
var c_4540 = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,meth_4539));
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_4539)))
{cljs.compiler.emitln.call(null,mname_4521,".cljs$lang$arity$variadic = ",n_4538,".cljs$lang$arity$variadic;");
} else
{cljs.compiler.emitln.call(null,mname_4521,".cljs$lang$arity$",c_4540," = ",n_4538,";");
}
{
var G__4541 = cljs.core.next.call(null,G__4517_4536);
G__4517_4536 = G__4541;
continue;
}
} else
{}
break;
}
} else
{}
cljs.compiler.emitln.call(null,"return ",mname_4521,";");
cljs.compiler.emitln.call(null,"})()");
}
if(loop_locals)
{return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else
{return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'do",(function (p__4542){
var map__4543 = p__4542;
var map__4543__$1 = ((cljs.core.seq_QMARK_.call(null,map__4543))?cljs.core.apply.call(null,cljs.core.hash_map,map__4543):map__4543);
var env = cljs.core._lookup.call(null,map__4543__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4543__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4543__$1,"\uFDD0'statements",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core.truth_((function (){var and__3822__auto__ = statements;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,"\uFDD0'expr",context);
} else
{return and__3822__auto__;
}
})()))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
cljs.compiler.emit_block.call(null,context,statements,ret);
if(cljs.core.truth_((function (){var and__3822__auto__ = statements;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,"\uFDD0'expr",context);
} else
{return and__3822__auto__;
}
})()))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'try*",(function (p__4545){
var map__4546 = p__4545;
var map__4546__$1 = ((cljs.core.seq_QMARK_.call(null,map__4546))?cljs.core.apply.call(null,cljs.core.hash_map,map__4546):map__4546);
var finally$ = cljs.core._lookup.call(null,map__4546__$1,"\uFDD0'finally",null);
var name = cljs.core._lookup.call(null,map__4546__$1,"\uFDD0'name",null);
var catch$ = cljs.core._lookup.call(null,map__4546__$1,"\uFDD0'catch",null);
var try$ = cljs.core._lookup.call(null,map__4546__$1,"\uFDD0'try",null);
var env = cljs.core._lookup.call(null,map__4546__$1,"\uFDD0'env",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
var subcontext = ((cljs.core._EQ_.call(null,"\uFDD0'expr",context))?"\uFDD0'return":context);
if(cljs.core.truth_((function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return finally$;
}
})()))
{if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
cljs.compiler.emits.call(null,"try{");
var map__4547_4551 = try$;
var map__4547_4552__$1 = ((cljs.core.seq_QMARK_.call(null,map__4547_4551))?cljs.core.apply.call(null,cljs.core.hash_map,map__4547_4551):map__4547_4551);
var ret_4553 = cljs.core._lookup.call(null,map__4547_4552__$1,"\uFDD0'ret",null);
var statements_4554 = cljs.core._lookup.call(null,map__4547_4552__$1,"\uFDD0'statements",null);
cljs.compiler.emit_block.call(null,subcontext,statements_4554,ret_4553);
cljs.compiler.emits.call(null,"}");
if(cljs.core.truth_(name))
{cljs.compiler.emits.call(null,"catch (",cljs.compiler.munge.call(null,name),"){");
if(cljs.core.truth_(catch$))
{var map__4548_4555 = catch$;
var map__4548_4556__$1 = ((cljs.core.seq_QMARK_.call(null,map__4548_4555))?cljs.core.apply.call(null,cljs.core.hash_map,map__4548_4555):map__4548_4555);
var ret_4557 = cljs.core._lookup.call(null,map__4548_4556__$1,"\uFDD0'ret",null);
var statements_4558 = cljs.core._lookup.call(null,map__4548_4556__$1,"\uFDD0'statements",null);
cljs.compiler.emit_block.call(null,subcontext,statements_4558,ret_4557);
} else
{}
cljs.compiler.emits.call(null,"}");
} else
{}
if(cljs.core.truth_(finally$))
{var map__4549_4559 = finally$;
var map__4549_4560__$1 = ((cljs.core.seq_QMARK_.call(null,map__4549_4559))?cljs.core.apply.call(null,cljs.core.hash_map,map__4549_4559):map__4549_4559);
var ret_4561 = cljs.core._lookup.call(null,map__4549_4560__$1,"\uFDD0'ret",null);
var statements_4562 = cljs.core._lookup.call(null,map__4549_4560__$1,"\uFDD0'statements",null);
if(cljs.core.not_EQ_.call(null,"\uFDD0'constant",(new cljs.core.Keyword("\uFDD0'op")).call(null,ret_4561)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("finally block cannot contain constant"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"not=")),"\uFDD0'constant",cljs.core.with_meta(cljs.core.list("\uFDD0'op",(new cljs.core.Symbol(null,"ret"))),cljs.core.hash_map("\uFDD0'line",588))),cljs.core.hash_map("\uFDD0'line",588))))].join('')));
}
cljs.compiler.emits.call(null,"finally {");
cljs.compiler.emit_block.call(null,subcontext,statements_4562,ret_4561);
cljs.compiler.emits.call(null,"}");
} else
{}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
} else
{var map__4550 = try$;
var map__4550__$1 = ((cljs.core.seq_QMARK_.call(null,map__4550))?cljs.core.apply.call(null,cljs.core.hash_map,map__4550):map__4550);
var ret = cljs.core._lookup.call(null,map__4550__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4550__$1,"\uFDD0'statements",null);
if(cljs.core.truth_((function (){var and__3822__auto__ = statements;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,"\uFDD0'expr",context);
} else
{return and__3822__auto__;
}
})()))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
cljs.compiler.emit_block.call(null,subcontext,statements,ret);
if(cljs.core.truth_((function (){var and__3822__auto__ = statements;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,"\uFDD0'expr",context);
} else
{return and__3822__auto__;
}
})()))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'let",(function (p__4563){
var map__4564 = p__4563;
var map__4564__$1 = ((cljs.core.seq_QMARK_.call(null,map__4564))?cljs.core.apply.call(null,cljs.core.hash_map,map__4564):map__4564);
var loop = cljs.core._lookup.call(null,map__4564__$1,"\uFDD0'loop",null);
var env = cljs.core._lookup.call(null,map__4564__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4564__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4564__$1,"\uFDD0'statements",null);
var bindings = cljs.core._lookup.call(null,map__4564__$1,"\uFDD0'bindings",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
var _STAR_lexical_renames_STAR_4565_4569 = cljs.compiler._STAR_lexical_renames_STAR_;
try{cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,"\uFDD0'statement",context))?cljs.core.map.call(null,(function (p1__4544_SHARP_){
return cljs.core.vector.call(null,cljs.core.hash.call(null,p1__4544_SHARP_),cljs.core.gensym.call(null,[cljs.core.str((new cljs.core.Keyword("\uFDD0'name")).call(null,p1__4544_SHARP_)),cljs.core.str("-")].join('')));
}),bindings):null));
var G__4567_4570 = cljs.core.seq.call(null,bindings);
while(true){
if(G__4567_4570)
{var map__4568_4571 = cljs.core.first.call(null,G__4567_4570);
var map__4568_4572__$1 = ((cljs.core.seq_QMARK_.call(null,map__4568_4571))?cljs.core.apply.call(null,cljs.core.hash_map,map__4568_4571):map__4568_4571);
var binding_4573 = map__4568_4572__$1;
var init_4574 = cljs.core._lookup.call(null,map__4568_4572__$1,"\uFDD0'init",null);
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_4573)," = ",init_4574,";");
{
var G__4575 = cljs.core.next.call(null,G__4567_4570);
G__4567_4570 = G__4575;
continue;
}
} else
{}
break;
}
if(cljs.core.truth_(loop))
{cljs.compiler.emitln.call(null,"while(true){");
} else
{}
cljs.compiler.emit_block.call(null,((cljs.core._EQ_.call(null,"\uFDD0'expr",context))?"\uFDD0'return":context),statements,ret);
if(cljs.core.truth_(loop))
{cljs.compiler.emitln.call(null,"break;");
cljs.compiler.emitln.call(null,"}");
} else
{}
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_4565_4569;
}if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'recur",(function (p__4576){
var map__4577 = p__4576;
var map__4577__$1 = ((cljs.core.seq_QMARK_.call(null,map__4577))?cljs.core.apply.call(null,cljs.core.hash_map,map__4577):map__4577);
var env = cljs.core._lookup.call(null,map__4577__$1,"\uFDD0'env",null);
var exprs = cljs.core._lookup.call(null,map__4577__$1,"\uFDD0'exprs",null);
var frame = cljs.core._lookup.call(null,map__4577__$1,"\uFDD0'frame",null);
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = (new cljs.core.Keyword("\uFDD0'params")).call(null,frame);
cljs.compiler.emitln.call(null,"{");
var n__2168__auto___4578 = cljs.core.count.call(null,exprs);
var i_4579 = 0;
while(true){
if((i_4579 < n__2168__auto___4578))
{cljs.compiler.emitln.call(null,"var ",temps.call(null,i_4579)," = ",exprs.call(null,i_4579),";");
{
var G__4580 = (i_4579 + 1);
i_4579 = G__4580;
continue;
}
} else
{}
break;
}
var n__2168__auto___4581 = cljs.core.count.call(null,exprs);
var i_4582 = 0;
while(true){
if((i_4582 < n__2168__auto___4581))
{cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_4582))," = ",temps.call(null,i_4582),";");
{
var G__4583 = (i_4582 + 1);
i_4582 = G__4583;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,"continue;");
return cljs.compiler.emitln.call(null,"}");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'letfn",(function (p__4584){
var map__4585 = p__4584;
var map__4585__$1 = ((cljs.core.seq_QMARK_.call(null,map__4585))?cljs.core.apply.call(null,cljs.core.hash_map,map__4585):map__4585);
var env = cljs.core._lookup.call(null,map__4585__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4585__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4585__$1,"\uFDD0'statements",null);
var bindings = cljs.core._lookup.call(null,map__4585__$1,"\uFDD0'bindings",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
var G__4586_4588 = cljs.core.seq.call(null,bindings);
while(true){
if(G__4586_4588)
{var map__4587_4589 = cljs.core.first.call(null,G__4586_4588);
var map__4587_4590__$1 = ((cljs.core.seq_QMARK_.call(null,map__4587_4589))?cljs.core.apply.call(null,cljs.core.hash_map,map__4587_4589):map__4587_4589);
var binding_4591 = map__4587_4590__$1;
var init_4592 = cljs.core._lookup.call(null,map__4587_4590__$1,"\uFDD0'init",null);
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_4591)," = ",init_4592,";");
{
var G__4593 = cljs.core.next.call(null,G__4586_4588);
G__4586_4588 = G__4593;
continue;
}
} else
{}
break;
}
cljs.compiler.emit_block.call(null,((cljs.core._EQ_.call(null,"\uFDD0'expr",context))?"\uFDD0'return":context),statements,ret);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
}));
cljs.compiler.protocol_prefix = (function protocol_prefix(psym){
return cljs.core.symbol.call(null,[cljs.core.str([cljs.core.str(psym)].join('').replace((new RegExp("\\.","g")),"$").replace((new RegExp("\\/","g")),"$")),cljs.core.str("$")].join(''));
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'invoke",(function (p__4594){
var map__4595 = p__4594;
var map__4595__$1 = ((cljs.core.seq_QMARK_.call(null,map__4595))?cljs.core.apply.call(null,cljs.core.hash_map,map__4595):map__4595);
var expr = map__4595__$1;
var env = cljs.core._lookup.call(null,map__4595__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__4595__$1,"\uFDD0'args",null);
var f = cljs.core._lookup.call(null,map__4595__$1,"\uFDD0'f",null);
var info = (new cljs.core.Keyword("\uFDD0'info")).call(null,f);
var fn_QMARK_ = (function (){var and__3822__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__3822__auto__))
{var and__3822__auto____$1 = cljs.core.not.call(null,(new cljs.core.Keyword("\uFDD0'dynamic")).call(null,info));
if(and__3822__auto____$1)
{return (new cljs.core.Keyword("\uFDD0'fn-var")).call(null,info);
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
})();
var protocol = (new cljs.core.Keyword("\uFDD0'protocol")).call(null,info);
var proto_QMARK_ = (function (){var tag = cljs.compiler.infer_tag.call(null,cljs.core.first.call(null,(new cljs.core.Keyword("\uFDD0'args")).call(null,expr)));
var and__3822__auto__ = protocol;
if(cljs.core.truth_(and__3822__auto__))
{var and__3822__auto____$1 = tag;
if(cljs.core.truth_(and__3822__auto____$1))
{var and__3822__auto____$2 = (function (){var or__3824__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return (new cljs.core.Keyword("\uFDD0'protocol-inline")).call(null,env);
}
})();
if(cljs.core.truth_(and__3822__auto____$2))
{var or__3824__auto__ = cljs.core._EQ_.call(null,protocol,tag);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var temp__3974__auto__ = (new cljs.core.Keyword("\uFDD0'protocols")).call(null,cljs.analyzer.resolve_existing_var.call(null,cljs.core.dissoc.call(null,env,"\uFDD0'locals"),tag));
if(cljs.core.truth_(temp__3974__auto__))
{var ps = temp__3974__auto__;
return ps.call(null,protocol);
} else
{return null;
}
}
} else
{return and__3822__auto____$2;
}
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
})();
var opt_not_QMARK_ = (function (){var and__3822__auto__ = cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'name")).call(null,info),(new cljs.core.Symbol(null,"cljs.core/not")));
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,cljs.compiler.infer_tag.call(null,cljs.core.first.call(null,(new cljs.core.Keyword("\uFDD0'args")).call(null,expr))),(new cljs.core.Symbol(null,"boolean")));
} else
{return and__3822__auto__;
}
})();
var ns = (new cljs.core.Keyword("\uFDD0'ns")).call(null,info);
var js_QMARK_ = cljs.core._EQ_.call(null,ns,(new cljs.core.Symbol(null,"js")));
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__3824__auto__ = cljs.core._EQ_.call(null,ns,(new cljs.core.Symbol(null,"goog")));
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var temp__3974__auto__ = [cljs.core.str(ns)].join('');
if(cljs.core.truth_(temp__3974__auto__))
{var ns_str = temp__3974__auto__;
return cljs.core._EQ_.call(null,cljs.core._lookup.call(null,clojure.string.split.call(null,ns_str,/\./),0,null),"goog");
} else
{return null;
}
}
})():null);
var keyword_QMARK_ = (function (){var and__3822__auto__ = cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'op")).call(null,f),"\uFDD0'constant");
if(and__3822__auto__)
{return cljs.core.keyword_QMARK_.call(null,(new cljs.core.Keyword("\uFDD0'form")).call(null,f));
} else
{return and__3822__auto__;
}
})();
var vec__4596 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
var variadic_QMARK_ = (new cljs.core.Keyword("\uFDD0'variadic")).call(null,info);
var mps = (new cljs.core.Keyword("\uFDD0'method-params")).call(null,info);
var mfa = (new cljs.core.Keyword("\uFDD0'max-fixed-arity")).call(null,info);
if((function (){var and__3822__auto__ = cljs.core.not.call(null,variadic_QMARK_);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,cljs.core.count.call(null,mps),1);
} else
{return and__3822__auto__;
}
})())
{return cljs.core.PersistentVector.fromArray([f,null], true);
} else
{if(cljs.core.truth_((function (){var and__3822__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__3822__auto__))
{return (arity > mfa);
} else
{return and__3822__auto__;
}
})()))
{return cljs.core.PersistentVector.fromArray([cljs.core.update_in.call(null,f,cljs.core.PersistentVector.fromArray(["\uFDD0'info","\uFDD0'name"], true),(function (name){
return cljs.core.symbol.call(null,[cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str(".cljs$lang$arity$variadic")].join(''));
})),cljs.core.ObjMap.fromObject(["\uFDD0'max-fixed-arity"],{"\uFDD0'max-fixed-arity":mfa})], true);
} else
{if("\uFDD0'else")
{var arities = cljs.core.map.call(null,cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([arity]),arities)))
{return cljs.core.PersistentVector.fromArray([cljs.core.update_in.call(null,f,cljs.core.PersistentVector.fromArray(["\uFDD0'info","\uFDD0'name"], true),(function (name){
return cljs.core.symbol.call(null,[cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str(".cljs$lang$arity$"),cljs.core.str(arity)].join(''));
})),null], true);
} else
{return cljs.core.PersistentVector.fromArray([f,null], true);
}
} else
{return null;
}
}
}
})():cljs.core.PersistentVector.fromArray([f,null], true));
var f__$1 = cljs.core.nth.call(null,vec__4596,0,null);
var variadic_invoke = cljs.core.nth.call(null,vec__4596,1,null);
var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(opt_not_QMARK_))
{cljs.compiler.emits.call(null,"!(",cljs.core.first.call(null,args),")");
} else
{if(cljs.core.truth_(proto_QMARK_))
{var pimpl_4597 = [cljs.core.str(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str(cljs.compiler.munge.call(null,cljs.core.name.call(null,(new cljs.core.Keyword("\uFDD0'name")).call(null,info)))),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_4597,"(",cljs.compiler.comma_sep.call(null,args),")");
} else
{if(cljs.core.truth_(keyword_QMARK_))
{cljs.compiler.emits.call(null,"(new cljs.core.Keyword(",f__$1,")).call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
} else
{if(cljs.core.truth_(variadic_invoke))
{var mfa_4598 = (new cljs.core.Keyword("\uFDD0'max-fixed-arity")).call(null,variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_4598,args)),(((mfa_4598 === 0))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_4598,args)),"], 0))");
} else
{if(cljs.core.truth_((function (){var or__3824__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = js_QMARK_;
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{return goog_QMARK_;
}
}
})()))
{cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,args),")");
} else
{if("\uFDD0'else")
{if(cljs.core.truth_((function (){var and__3822__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'op")).call(null,f__$1),"\uFDD0'var");
} else
{return and__3822__auto__;
}
})()))
{var fprop_4599 = [cljs.core.str(".cljs$lang$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,"(",f__$1,fprop_4599," ? ",f__$1,fprop_4599,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
} else
{cljs.compiler.emits.call(null,f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
}
} else
{}
}
}
}
}
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'new",(function (p__4600){
var map__4601 = p__4600;
var map__4601__$1 = ((cljs.core.seq_QMARK_.call(null,map__4601))?cljs.core.apply.call(null,cljs.core.hash_map,map__4601):map__4601);
var env = cljs.core._lookup.call(null,map__4601__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__4601__$1,"\uFDD0'args",null);
var ctor = cljs.core._lookup.call(null,map__4601__$1,"\uFDD0'ctor",null);
var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'set!",(function (p__4602){
var map__4603 = p__4602;
var map__4603__$1 = ((cljs.core.seq_QMARK_.call(null,map__4603))?cljs.core.apply.call(null,cljs.core.hash_map,map__4603):map__4603);
var env = cljs.core._lookup.call(null,map__4603__$1,"\uFDD0'env",null);
var val = cljs.core._lookup.call(null,map__4603__$1,"\uFDD0'val",null);
var target = cljs.core._lookup.call(null,map__4603__$1,"\uFDD0'target",null);
var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,target," = ",val);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'ns",(function (p__4604){
var map__4605 = p__4604;
var map__4605__$1 = ((cljs.core.seq_QMARK_.call(null,map__4605))?cljs.core.apply.call(null,cljs.core.hash_map,map__4605):map__4605);
var env = cljs.core._lookup.call(null,map__4605__$1,"\uFDD0'env",null);
var requires_macros = cljs.core._lookup.call(null,map__4605__$1,"\uFDD0'requires-macros",null);
var uses = cljs.core._lookup.call(null,map__4605__$1,"\uFDD0'uses",null);
var requires = cljs.core._lookup.call(null,map__4605__$1,"\uFDD0'requires",null);
var name = cljs.core._lookup.call(null,map__4605__$1,"\uFDD0'name",null);
cljs.core.swap_BANG_.call(null,cljs.compiler.ns_first_segments,cljs.core.conj,cljs.core.first.call(null,clojure.string.split.call(null,[cljs.core.str(name)].join(''),/\./)));
cljs.compiler.emit_provide.call(null,cljs.compiler.munge.call(null,name));
if(cljs.core._EQ_.call(null,name,(new cljs.core.Symbol(null,"cljs.core"))))
{} else
{cljs.compiler.emitln.call(null,"goog.require('cljs.core');");
}
var G__4606 = cljs.core.seq.call(null,cljs.core.into.call(null,cljs.core.vals.call(null,requires),cljs.core.distinct.call(null,cljs.core.vals.call(null,uses))));
while(true){
if(G__4606)
{var lib = cljs.core.first.call(null,G__4606);
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib),"');");
{
var G__4607 = cljs.core.next.call(null,G__4606);
G__4606 = G__4607;
continue;
}
} else
{return null;
}
break;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'deftype*",(function (p__4608){
var map__4609 = p__4608;
var map__4609__$1 = ((cljs.core.seq_QMARK_.call(null,map__4609))?cljs.core.apply.call(null,cljs.core.hash_map,map__4609):map__4609);
var pmasks = cljs.core._lookup.call(null,map__4609__$1,"\uFDD0'pmasks",null);
var fields = cljs.core._lookup.call(null,map__4609__$1,"\uFDD0'fields",null);
var t = cljs.core._lookup.call(null,map__4609__$1,"\uFDD0't",null);
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emit_provide.call(null,t);
cljs.compiler.emitln.call(null,"");
cljs.compiler.emitln.call(null,"/**");
cljs.compiler.emitln.call(null,"* @constructor");
cljs.compiler.emitln.call(null,"*/");
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");
var G__4610_4613 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__4610_4613)
{var fld_4614 = cljs.core.first.call(null,G__4610_4613);
cljs.compiler.emitln.call(null,"this.",fld_4614," = ",fld_4614,";");
{
var G__4615 = cljs.core.next.call(null,G__4610_4613);
G__4610_4613 = G__4615;
continue;
}
} else
{}
break;
}
var G__4611_4616 = cljs.core.seq.call(null,pmasks);
while(true){
if(G__4611_4616)
{var vec__4612_4617 = cljs.core.first.call(null,G__4611_4616);
var pno_4618 = cljs.core.nth.call(null,vec__4612_4617,0,null);
var pmask_4619 = cljs.core.nth.call(null,vec__4612_4617,1,null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_4618,"$ = ",pmask_4619,";");
{
var G__4620 = cljs.core.next.call(null,G__4611_4616);
G__4611_4616 = G__4620;
continue;
}
} else
{}
break;
}
return cljs.compiler.emitln.call(null,"})");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'defrecord*",(function (p__4621){
var map__4622 = p__4621;
var map__4622__$1 = ((cljs.core.seq_QMARK_.call(null,map__4622))?cljs.core.apply.call(null,cljs.core.hash_map,map__4622):map__4622);
var pmasks = cljs.core._lookup.call(null,map__4622__$1,"\uFDD0'pmasks",null);
var fields = cljs.core._lookup.call(null,map__4622__$1,"\uFDD0'fields",null);
var t = cljs.core._lookup.call(null,map__4622__$1,"\uFDD0't",null);
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),cljs.core.vec([(new cljs.core.Symbol(null,"__meta")),(new cljs.core.Symbol(null,"__extmap"))]));
cljs.compiler.emit_provide.call(null,t);
cljs.compiler.emitln.call(null,"");
cljs.compiler.emitln.call(null,"/**");
cljs.compiler.emitln.call(null,"* @constructor");
var G__4623_4627 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__4623_4627)
{var fld_4628 = cljs.core.first.call(null,G__4623_4627);
cljs.compiler.emitln.call(null,"* @param {*} ",fld_4628);
{
var G__4629 = cljs.core.next.call(null,G__4623_4627);
G__4623_4627 = G__4629;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,"* @param {*=} __meta ");
cljs.compiler.emitln.call(null,"* @param {*=} __extmap");
cljs.compiler.emitln.call(null,"*/");
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");
var G__4624_4630 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__4624_4630)
{var fld_4631 = cljs.core.first.call(null,G__4624_4630);
cljs.compiler.emitln.call(null,"this.",fld_4631," = ",fld_4631,";");
{
var G__4632 = cljs.core.next.call(null,G__4624_4630);
G__4624_4630 = G__4632;
continue;
}
} else
{}
break;
}
var G__4625_4633 = cljs.core.seq.call(null,pmasks);
while(true){
if(G__4625_4633)
{var vec__4626_4634 = cljs.core.first.call(null,G__4625_4633);
var pno_4635 = cljs.core.nth.call(null,vec__4626_4634,0,null);
var pmask_4636 = cljs.core.nth.call(null,vec__4626_4634,1,null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_4635,"$ = ",pmask_4636,";");
{
var G__4637 = cljs.core.next.call(null,G__4625_4633);
G__4625_4633 = G__4637;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,"if(arguments.length>",(cljs.core.count.call(null,fields__$1) - 2),"){");
cljs.compiler.emitln.call(null,"this.__meta = __meta;");
cljs.compiler.emitln.call(null,"this.__extmap = __extmap;");
cljs.compiler.emitln.call(null,"} else {");
cljs.compiler.emits.call(null,"this.__meta=");
cljs.compiler.emit_constant.call(null,null);
cljs.compiler.emitln.call(null,";");
cljs.compiler.emits.call(null,"this.__extmap=");
cljs.compiler.emit_constant.call(null,null);
cljs.compiler.emitln.call(null,";");
cljs.compiler.emitln.call(null,"}");
return cljs.compiler.emitln.call(null,"})");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'dot",(function (p__4638){
var map__4639 = p__4638;
var map__4639__$1 = ((cljs.core.seq_QMARK_.call(null,map__4639))?cljs.core.apply.call(null,cljs.core.hash_map,map__4639):map__4639);
var env = cljs.core._lookup.call(null,map__4639__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__4639__$1,"\uFDD0'args",null);
var method = cljs.core._lookup.call(null,map__4639__$1,"\uFDD0'method",null);
var field = cljs.core._lookup.call(null,map__4639__$1,"\uFDD0'field",null);
var target = cljs.core._lookup.call(null,map__4639__$1,"\uFDD0'target",null);
var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(field))
{cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else
{cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'js",(function (p__4640){
var map__4641 = p__4640;
var map__4641__$1 = ((cljs.core.seq_QMARK_.call(null,map__4641))?cljs.core.apply.call(null,cljs.core.hash_map,map__4641):map__4641);
var args = cljs.core._lookup.call(null,map__4641__$1,"\uFDD0'args",null);
var segs = cljs.core._lookup.call(null,map__4641__$1,"\uFDD0'segs",null);
var code = cljs.core._lookup.call(null,map__4641__$1,"\uFDD0'code",null);
var env = cljs.core._lookup.call(null,map__4641__$1,"\uFDD0'env",null);
var env__2992__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(code))
{cljs.compiler.emits.call(null,code);
} else
{cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,cljs.core.PersistentVector.fromArray([null], true))));
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2992__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
/**
* Seq of forms in a Clojure or ClojureScript file.
*/
cljs.compiler.forms_seq = (function() {
var forms_seq = null;
var forms_seq__1 = (function (f){
return forms_seq.call(null,f,cljs.reader.indexing_push_back_reader.call(null,cljs.io.file_read.call(null,f)));
});
var forms_seq__2 = (function (f,rdr){
var temp__3971__auto__ = (function (){var _STAR_ns_sym_STAR_4644 = cljs.core._STAR_ns_sym_STAR_;
try{cljs.core._STAR_ns_sym_STAR_ = cljs.analyzer._STAR_reader_ns_name_STAR_;
return cljs.reader.read.call(null,rdr,null,null);
}finally {cljs.core._STAR_ns_sym_STAR_ = _STAR_ns_sym_STAR_4644;
}})();
if(cljs.core.truth_(temp__3971__auto__))
{var form = temp__3971__auto__;
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,form,forms_seq.call(null,f,rdr));
}),null));
} else
{return null;
}
});
forms_seq = function(f,rdr){
switch(arguments.length){
case 1:
return forms_seq__1.call(this,f);
case 2:
return forms_seq__2.call(this,f,rdr);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
forms_seq.cljs$lang$arity$1 = forms_seq__1;
forms_seq.cljs$lang$arity$2 = forms_seq__2;
return forms_seq;
})()
;
/**
* Change the file extension from .cljs to .js. Takes a File or a
* String. Always returns a String.
*/
cljs.compiler.rename_to_js = (function rename_to_js(file_str){
return clojure.string.replace.call(null,file_str,/\.cljs$/,".js");
});
/**
* Create all parent directories for the passed file.
*/
cljs.compiler.mkdirs = (function mkdirs(f){
return f.getCanonicalFile().getParentFile().mkdirs();
});
cljs.compiler.compile_forms_STAR_ = (function compile_forms_STAR_(forms,ns_name,deps,eval_QMARK_,code,output){
while(true){
if(cljs.core.seq.call(null,forms))
{var env = cljs.analyzer.empty_env.call(null);
var form = cljs.core.first.call(null,forms);
var ast = cljs.analyzer.analyze.call(null,env,form);
var js_str = cljs.compiler.emit_str.call(null,ast);
var code__$1 = [cljs.core.str(code),cljs.core.str(js_str)].join('');
var output__$1 = [cljs.core.str(output),cljs.core.str((cljs.core.truth_(eval_QMARK_)?(function (){try{var sb__2218__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_4650_4652 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = ((function (forms,ns_name,deps,eval_QMARK_,code,output){
return (function (x__2219__auto__){
return sb__2218__auto__.append(x__2219__auto__);
});})(forms,ns_name,deps,eval_QMARK_,code,output))
;
eval(js_str);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_4650_4652;
}return [cljs.core.str(sb__2218__auto__)].join('');
}catch (e4649){if(cljs.core.instance_QMARK_.call(null,Error,e4649))
{var e = e4649;
throw (new Error([cljs.core.str(e),cljs.core.str((cljs.core.truth_((new cljs.core.Keyword("\uFDD0'line")).call(null,cljs.core.meta.call(null,form)))?[cljs.core.str(", line "),cljs.core.str((new cljs.core.Keyword("\uFDD0'line")).call(null,cljs.core.meta.call(null,form))),cljs.core.str(", column "),cljs.core.str((new cljs.core.Keyword("\uFDD0'column")).call(null,cljs.core.meta.call(null,form)))].join(''):null)),cljs.core.str("\n  while compiling form: "),cljs.core.str(form),cljs.core.str("\n  which emitted JavaScript: "),cljs.core.str(cljs.core.pr_str.call(null,js_str))].join('')));
} else
{if("\uFDD0'else")
{throw e4649;
} else
{return null;
}
}
}})():null))].join('');
if(cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'op")).call(null,ast),"\uFDD0'ns"))
{{
var G__4653 = cljs.core.rest.call(null,forms);
var G__4654 = (new cljs.core.Keyword("\uFDD0'name")).call(null,ast);
var G__4655 = cljs.core.merge.call(null,(new cljs.core.Keyword("\uFDD0'uses")).call(null,ast),(new cljs.core.Keyword("\uFDD0'requires")).call(null,ast));
var G__4656 = eval_QMARK_;
var G__4657 = code__$1;
var G__4658 = output__$1;
forms = G__4653;
ns_name = G__4654;
deps = G__4655;
eval_QMARK_ = G__4656;
code = G__4657;
output = G__4658;
continue;
}
} else
{{
var G__4659 = cljs.core.rest.call(null,forms);
var G__4660 = ns_name;
var G__4661 = deps;
var G__4662 = eval_QMARK_;
var G__4663 = code__$1;
var G__4664 = output__$1;
forms = G__4659;
ns_name = G__4660;
deps = G__4661;
eval_QMARK_ = G__4662;
code = G__4663;
output = G__4664;
continue;
}
}
} else
{return cljs.core.ObjMap.fromObject(["\uFDD0'ns","\uFDD0'emit-str","\uFDD0'output","\uFDD0'provides","\uFDD0'requires"],{"\uFDD0'ns":(function (){var or__3824__auto__ = ns_name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.analyzer._STAR_cljs_ns_STAR_;
}
})(),"\uFDD0'emit-str":code,"\uFDD0'output":output,"\uFDD0'provides":cljs.core.PersistentVector.fromArray([ns_name], true),"\uFDD0'requires":((cljs.core._EQ_.call(null,ns_name,(new cljs.core.Symbol(null,"cljs.core"))))?cljs.core.set.call(null,cljs.core.vals.call(null,deps)):cljs.core.conj.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,deps)),(new cljs.core.Symbol(null,"cljs.core"))))});
}
break;
}
});
cljs.compiler.compile_forms = (function compile_forms(forms){
return cljs.compiler.compile_forms_STAR_.call(null,forms,null,null,false,"","");
});
cljs.compiler.compile_and_eval_forms = (function compile_and_eval_forms(forms){
return cljs.compiler.compile_forms_STAR_.call(null,forms,null,null,true,"","");
});
/**
* Snapshot the given namespace. Returns the JavaScript to update
* cljs.core/namespace based on the snapshot.
*/
cljs.compiler.ns_snap = (function ns_snap(ns){
var nss1 = cljs.core.update_in.call(null,cljs.core.dissoc.call(null,cljs.core._lookup.call(null,cljs.core.deref.call(null,cljs.analyzer.namespaces),ns,null),"\uFDD0'requires-macros"),cljs.core.PersistentVector.fromArray(["\uFDD0'defs",(new cljs.core.Symbol(null,"/"))], true),cljs.core.assoc,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.core/_SLASH_")));
var nss2 = cljs.core.update_in.call(null,cljs.reader.read_string.call(null,cljs.core.pr_str.call(null,nss1)),cljs.core.PersistentVector.fromArray(["\uFDD0'defs",(new cljs.core.Symbol(null,"/"))], true),cljs.core.assoc,"\uFDD0'name",cljs.core.symbol.call(null,"cljs.core//"));
return cljs.core.apply.call(null,cljs.core.str,cljs.compiler.emit_str.call(null,cljs.analyzer.analyze.call(null,cljs.analyzer.empty_env.call(null),cljs.core.list.call(null,(new cljs.core.Symbol(null,"swap!")),(new cljs.core.Symbol(null,"cljs.core/namespaces")),(new cljs.core.Symbol(null,"assoc")),cljs.core.list.call(null,(new cljs.core.Symbol(null,"quote")),ns),cljs.core.list.call(null,(new cljs.core.Symbol(null,"quote")),nss2)))));
});
cljs.compiler.compile_file_STAR_ = (function compile_file_STAR_(src,dest){
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'defs")).call(null,cljs.core._lookup.call(null,cljs.core.deref.call(null,cljs.analyzer.namespaces),(new cljs.core.Symbol(null,"cljs.core")),null))))
{} else
{cljs.core.println.call(null,"// analyzing cljs/core.cljs");
cljs.analyzer.analyze_file.call(null,"cljs/core.cljs");
}
var _STAR_cljs_ns_STAR_4670 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_cljs_file_STAR_4671 = cljs.analyzer._STAR_cljs_file_STAR_;
var _STAR_position_STAR_4672 = cljs.compiler._STAR_position_STAR_;
var _STAR_emitted_provides_STAR_4673 = cljs.compiler._STAR_emitted_provides_STAR_;
try{cljs.analyzer._STAR_cljs_ns_STAR_ = (new cljs.core.Symbol(null,"cljs.user"));
cljs.analyzer._STAR_cljs_file_STAR_ = src.getPath();
cljs.compiler._STAR_position_STAR_ = cljs.core.atom.call(null,cljs.core.PersistentVector.fromArray([0,0], true));
cljs.compiler._STAR_emitted_provides_STAR_ = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
var cf = cljs.core.merge.call(null,cljs.compiler.compile_forms.call(null,cljs.compiler.forms_seq.call(null,src)),cljs.core.ObjMap.fromObject(["\uFDD0'file"],{"\uFDD0'file":cljs.io.file.call(null,dest.getPath())}));
var ns_str = cljs.compiler.ns_snap.call(null,cljs.core.first.call(null,(new cljs.core.Keyword("\uFDD0'provides")).call(null,cf)));
var write_str = [cljs.core.str((new cljs.core.Keyword("\uFDD0'emit-str")).call(null,cf)),cljs.core.str("\n// Analyzer namespace snapshot:\n"),cljs.core.str(ns_str)].join('');
cljs.io.file_write.call(null,dest,write_str);
return cljs.core.dissoc.call(null,cf,"\uFDD0'emit-str","\uFDD0'output");
}finally {cljs.compiler._STAR_emitted_provides_STAR_ = _STAR_emitted_provides_STAR_4673;
cljs.compiler._STAR_position_STAR_ = _STAR_position_STAR_4672;
cljs.analyzer._STAR_cljs_file_STAR_ = _STAR_cljs_file_STAR_4671;
cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_4670;
}});
/**
* Return true if the src file requires compilation.
*/
cljs.compiler.requires_compilation_QMARK_ = (function requires_compilation_QMARK_(src,dest){
var or__3824__auto__ = cljs.core.not.call(null,dest.exists());
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return (src.lastModified() > dest.lastModified());
}
});
/**
* Compiles src to a file of the same name, but with a .js extension,
* in the src file's directory.
* 
* With dest argument, write file to provided location. If the dest
* argument is a file outside the source tree, missing parent
* directories will be created. The src file will only be compiled if
* the dest file has an older modification time.
* 
* Both src and dest may be either a String or a File.
* 
* Returns a map containing {:ns .. :provides .. :requires .. :file ..}.
* If the file was not compiled returns only {:file ...}
*/
cljs.compiler.compile_file = (function() {
var compile_file = null;
var compile_file__1 = (function (src){
var dest = cljs.compiler.rename_to_js.call(null,src);
return compile_file.call(null,src,dest);
});
var compile_file__2 = (function (src,dest){
var src_file = cljs.io.file.call(null,src);
var dest_file = cljs.io.file.call(null,dest);
if(cljs.core.truth_(src_file.exists()))
{if(cljs.core.truth_(cljs.compiler.requires_compilation_QMARK_.call(null,src_file,dest_file)))
{cljs.compiler.mkdirs.call(null,dest_file);
return cljs.compiler.compile_file_STAR_.call(null,src_file,dest_file);
} else
{return cljs.core.ObjMap.fromObject(["\uFDD0'file"],{"\uFDD0'file":dest_file});
}
} else
{throw (new Error([cljs.core.str("The file "),cljs.core.str(src),cljs.core.str(" does not exist.")].join('')));
}
});
compile_file = function(src,dest){
switch(arguments.length){
case 1:
return compile_file__1.call(this,src);
case 2:
return compile_file__2.call(this,src,dest);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
compile_file.cljs$lang$arity$1 = compile_file__1;
compile_file.cljs$lang$arity$2 = compile_file__2;
return compile_file;
})()
;
cljs.compiler.path_seq = (function path_seq(file_str){
return clojure.string.split.call(null,file_str,cljs.io.path_separator);
});
cljs.compiler.to_path = (function() {
var to_path = null;
var to_path__1 = (function (parts){
return to_path.call(null,parts,cljs.io.path_separator);
});
var to_path__2 = (function (parts,sep){
return cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null,sep,parts));
});
to_path = function(parts,sep){
switch(arguments.length){
case 1:
return to_path__1.call(this,parts);
case 2:
return to_path__2.call(this,parts,sep);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
to_path.cljs$lang$arity$1 = to_path__1;
to_path.cljs$lang$arity$2 = to_path__2;
return to_path;
})()
;
/**
* Given the source root directory, the output target directory and
* file under the source root, produce the target file.
*/
cljs.compiler.to_target_file = (function to_target_file(dir,target,file){
var dir_path = cljs.compiler.path_seq.call(null,dir.getAbsolutePath());
var file_path = cljs.compiler.path_seq.call(null,file.getAbsolutePath());
var relative_path = cljs.core.drop.call(null,cljs.core.count.call(null,dir_path),file_path);
var parents = cljs.core.butlast.call(null,relative_path);
var parent_file = cljs.io.file.call(null,cljs.compiler.to_path.call(null,cljs.core.cons.call(null,target,parents)));
return cljs.io.file.call(null,parent_file,cljs.compiler.rename_to_js.call(null,cljs.core.last.call(null,relative_path)));
});
/**
* Return a sequence of all .cljs files in the given directory.
*/
cljs.compiler.cljs_files_in = (function cljs_files_in(dir){
return cljs.core.filter.call(null,(function (p1__4675_SHARP_){
var name = p1__4675_SHARP_.getName();
var and__3822__auto__ = cljs.core.re_find.call(null,/\.cljs$/,name);
if(cljs.core.truth_(and__3822__auto__))
{var and__3822__auto____$1 = cljs.core.not_EQ_.call(null,".",cljs.core.first.call(null,name));
if(and__3822__auto____$1)
{return !(cljs.core.contains_QMARK_.call(null,cljs.compiler.cljs_reserved_file_names,name));
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
}),cljs.io.file_seq.call(null,dir));
});
/**
* Looks recursively in src-dir for .cljs files and compiles them to
* .js files. If target-dir is provided, output will go into this
* directory mirroring the source directory structure. Returns a list
* of maps containing information about each file which was compiled
* in dependency order.
*/
cljs.compiler.compile_root = (function() {
var compile_root = null;
var compile_root__1 = (function (src_dir){
return compile_root.call(null,src_dir,"out");
});
var compile_root__2 = (function (src_dir,target_dir){
var src_dir_file = cljs.io.file.call(null,src_dir);
var cljs_files = cljs.compiler.cljs_files_in.call(null,src_dir_file);
var output_files = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.seq.call(null,cljs_files))
{var cljs_file = cljs.core.first.call(null,cljs_files);
var output_file = cljs.compiler.to_target_file.call(null,src_dir_file,target_dir,cljs_file);
var ns_info = cljs.compiler.compile_file.call(null,cljs_file,output_file);
{
var G__4676 = cljs.core.rest.call(null,cljs_files);
var G__4677 = cljs.core.conj.call(null,output_files,cljs.core.assoc.call(null,ns_info,"\uFDD0'file-name",output_file.getPath()));
cljs_files = G__4676;
output_files = G__4677;
continue;
}
} else
{return output_files;
}
break;
}
});
compile_root = function(src_dir,target_dir){
switch(arguments.length){
case 1:
return compile_root__1.call(this,src_dir);
case 2:
return compile_root__2.call(this,src_dir,target_dir);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
compile_root.cljs$lang$arity$1 = compile_root__1;
compile_root.cljs$lang$arity$2 = compile_root__2;
return compile_root;
})()
;

// Analyzer namespace snapshot:
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.update_in,cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(null,"cljs.compiler"))], true),(function (old){
return cljs.core.deep_merge_with.call(null,(function() { 
var G__4678__delegate = function (m){
return cljs.core.first.call(null,m);
};
var G__4678 = function (var_args){
var m = null;
if (goog.isDef(var_args)) {
  m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__4678__delegate.call(this, m);
};
G__4678.cljs$lang$maxFixedArity = 0;
G__4678.cljs$lang$applyTo = (function (arglist__4679){
var m = cljs.core.seq(arglist__4679);;
return G__4678__delegate(m);
});
G__4678.cljs$lang$arity$variadic = G__4678__delegate;
return G__4678;
})()
,cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map((new cljs.core.Symbol(null,"cljs-reserved-file-names")),cljs.core.hash_map("\uFDD0'line",41,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/cljs-reserved-file-names"))),(new cljs.core.Symbol(null,"get-tag")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"e"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"e")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/get-tag")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",338,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-apply-to")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec([(new cljs.core.Symbol(null,"name")),(new cljs.core.Symbol(null,"params")),(new cljs.core.Symbol(null,"env"))]))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4473")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-apply-to")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",410,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"compile-and-eval-forms")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"forms"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"forms")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/compile-and-eval-forms")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",857,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"escape-char")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"c"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"c")),"\uFDD0'tag",(new cljs.core.Symbol(null,"Character")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/escape-char")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",105,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"*lexical-renames*")),cljs.core.hash_map("\uFDD0'line",40,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/*lexical-renames*"))),(new cljs.core.Symbol(null,"infer-tag")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"e"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"e")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/infer-tag")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",342,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"requires-compilation?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"src")),(new cljs.core.Symbol(null,"dest"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"src")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"dest")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/requires-compilation?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Return true if the src file requires compilation.","\uFDD0'line",897,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-provide")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"sym"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sym")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-provide")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",167,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"mkdirs")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"f"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"f")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/mkdirs")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Create all parent directories for the passed file.","\uFDD0'line",819,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant-set")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant-set")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",204,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"munge")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]),cljs.core.vec([(new cljs.core.Symbol(null,"s")),(new cljs.core.Symbol(null,"reserved"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reserved")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/munge")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",73,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-meta-constant")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x")),(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"body"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"body")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-meta-constant")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",173,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"ns-first-segments")),cljs.core.hash_map("\uFDD0'line",44,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/ns-first-segments"))),(new cljs.core.Symbol(null,"forms-seq")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"f"))]),cljs.core.vec([(new cljs.core.Symbol(null,"f")),(new cljs.core.Symbol(null,"rdr"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"f")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"f")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/forms-seq")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Seq of forms in a Clojure or ClojureScript file.","\uFDD0'line",803,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"js-reserved")),cljs.core.hash_map("\uFDD0'line",24,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/js-reserved"))),(new cljs.core.Symbol(null,"safe-test?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"e"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"e")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/safe-test?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",357,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"compile-file*")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"src")),(new cljs.core.Symbol(null,"dest"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"src")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"dest")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/compile-file*")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",882,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emitln")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"xs"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"xs")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emitln")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",155,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"compile-forms")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"forms"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"forms")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/compile-forms")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",855,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"/")),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"cljs.core//"))),(new cljs.core.Symbol(null,"array-map-threshold")),cljs.core.hash_map("\uFDD0'line",284,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'private",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/array-map-threshold"))),(new cljs.core.Symbol(null,"escape-string")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",(new cljs.core.Symbol(null,"CharSequence")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/escape-string")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",129,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant-keyword")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant-keyword")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",181,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"escape-pattern")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"pattern"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"pattern")),"\uFDD0'tag",(new cljs.core.Symbol(null,"String")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/escape-pattern")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",122,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'protocol",(new cljs.core.Symbol(null,"cljs.compiler/EmitConstant")),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",210,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-block")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"context")),(new cljs.core.Symbol(null,"statements")),(new cljs.core.Symbol(null,"ret"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"context")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"statements")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ret")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-block")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",256,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-variadic-fn-method")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec([(new cljs.core.Symbol(null,"type")),(new cljs.core.Symbol(null,"name")),(new cljs.core.Symbol(null,"variadic")),(new cljs.core.Symbol(null,"params")),(new cljs.core.Symbol(null,"statements")),(new cljs.core.Symbol(null,"ret")),(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"recurs")),(new cljs.core.Symbol(null,"max-fixed-arity"))]),"\uFDD0'as",(new cljs.core.Symbol(null,"f")))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4503")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-variadic-fn-method")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",450,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"cljs-files-in")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"dir"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"dir")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/cljs-files-in")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Return a sequence of all .cljs files in the given directory.","\uFDD0'line",959,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"*emitted-provides*")),cljs.core.hash_map("\uFDD0'line",39,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/*emitted-provides*"))),(new cljs.core.Symbol(null,"rename-to-js")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"file-str"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"file-str")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/rename-to-js")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Change the file extension from .cljs to .js. Takes a File or a\n  String. Always returns a String.","\uFDD0'line",813,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-fn-method")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec([(new cljs.core.Symbol(null,"type")),(new cljs.core.Symbol(null,"name")),(new cljs.core.Symbol(null,"variadic")),(new cljs.core.Symbol(null,"params")),(new cljs.core.Symbol(null,"statements")),(new cljs.core.Symbol(null,"ret")),(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"recurs")),(new cljs.core.Symbol(null,"max-fixed-arity"))]))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4497")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-fn-method")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",437,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"path-seq")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"file-str"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"file-str")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/path-seq")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",938,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"EmitConstant")),cljs.core.hash_map("\uFDD0'line",210,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'protocol-symbol",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/EmitConstant"))),(new cljs.core.Symbol(null,"*position*")),cljs.core.hash_map("\uFDD0'line",38,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/*position*"))),(new cljs.core.Symbol(null,"to-path")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"parts"))]),cljs.core.vec([(new cljs.core.Symbol(null,"parts")),(new cljs.core.Symbol(null,"sep"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"parts")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"parts")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sep")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/to-path")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",942,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-str")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"expr"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"expr")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-str")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",152,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'tag",(new cljs.core.Symbol(null,"String"))),(new cljs.core.Symbol(null,"compile-forms*")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"forms")),(new cljs.core.Symbol(null,"ns-name")),(new cljs.core.Symbol(null,"deps")),(new cljs.core.Symbol(null,"eval?")),(new cljs.core.Symbol(null,"code")),(new cljs.core.Symbol(null,"output"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"forms")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ns-name")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"deps")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"eval?")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"code")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"output")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/compile-forms*")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",6,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",824,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"compile-root")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"src-dir"))]),cljs.core.vec([(new cljs.core.Symbol(null,"src-dir")),(new cljs.core.Symbol(null,"target-dir"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"src-dir")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"src-dir")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"target-dir")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/compile-root")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Looks recursively in src-dir for .cljs files and compiles them to\n   .js files. If target-dir is provided, output will go into this\n   directory mirroring the source directory structure. Returns a list\n   of maps containing information about each file which was compiled\n   in dependency order.","\uFDD0'line",968,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"to-target-file")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"dir")),(new cljs.core.Symbol(null,"target")),(new cljs.core.Symbol(null,"file"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"dir")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"target")),"\uFDD0'tag",(new cljs.core.Symbol(null,"String")),"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"file")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/to-target-file")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Given the source root directory, the output target directory and\n  file under the source root, produce the target file.","\uFDD0'line",948,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"comma-sep")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"xs"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"xs")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/comma-sep")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",102,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant-symbol")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant-symbol")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",188,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"protocol-prefix")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"psym"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"psym")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/protocol-prefix")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",638,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"obj-map-threshold")),cljs.core.hash_map("\uFDD0'line",285,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'private",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/obj-map-threshold"))),(new cljs.core.Symbol(null,"emit-comment")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"doc")),(new cljs.core.Symbol(null,"jsdoc"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"doc")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"jsdoc")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-comment")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Emit a nicely formatted comment string.","\uFDD0'line",384,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"compile-file")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"src"))]),cljs.core.vec([(new cljs.core.Symbol(null,"src")),(new cljs.core.Symbol(null,"dest"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"src")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"src")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"dest")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/compile-file")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Compiles src to a file of the same name, but with a .js extension,\n   in the src file's directory.\n\n   With dest argument, write file to provided location. If the dest\n   argument is a file outside the source tree, missing parent\n   directories will be created. The src file will only be compiled if\n   the dest file has an older modification time.\n\n   Both src and dest may be either a String or a File.\n\n   Returns a map containing {:ns .. :provides .. :requires .. :file ..}.\n   If the file was not compiled returns only {:file ...}","\uFDD0'line",903,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emits")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"xs"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"xs")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emits")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",137,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant-map")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant-map")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",197,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"wrap-in-double-quotes")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/wrap-in-double-quotes")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",132,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"CHAR_MAP")),cljs.core.hash_map("\uFDD0'line",47,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/CHAR_MAP"))),(new cljs.core.Symbol(null,"emit")),cljs.core.hash_map("\uFDD0'line",135,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit"))),(new cljs.core.Symbol(null,"ns-snap")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"ns"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ns")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/ns-snap")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Snapshot the given namespace. Returns the JavaScript to update\n  cljs.core/namespace based on the snapshot.","\uFDD0'line",867,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs")),"\uFDD0'imports",null,"\uFDD0'uses-macros",cljs.core.hash_map((new cljs.core.Symbol(null,"with-core-cljs")),(new cljs.core.Symbol(null,"cljs.compiler-macros")),(new cljs.core.Symbol(null,"emit-wrap")),(new cljs.core.Symbol(null,"cljs.compiler-macros"))),"\uFDD0'requires",cljs.core.hash_map((new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"cljs.reader")),(new cljs.core.Symbol(null,"ana")),(new cljs.core.Symbol(null,"cljs.analyzer")),(new cljs.core.Symbol(null,"string")),(new cljs.core.Symbol(null,"clojure.string")),(new cljs.core.Symbol(null,"io")),(new cljs.core.Symbol(null,"cljs.io"))),"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set([(new cljs.core.Symbol(null,"munge")),(new cljs.core.Symbol(null,"macroexpand-1"))]),"\uFDD0'doc",null,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler"))),old);
}));
