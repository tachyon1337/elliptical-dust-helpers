
/*
 * =============================================================
 * dust helpers
 * =============================================================
 *
 */

//umd pattern

(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        //commonjs
        module.exports = factory(require('dustjs'), require('dustjs-helpers'),require('elliptical-utils'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['dustjs','dustjs-helpers','elliptical-utils'], factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.dust,root.dust.helpers,root.elliptical.utils);
    }
}(this, function (dust,helpers,utils) {

    var string=utils.string;
    var random=utils.random;

    dust.helpers.formatCurrency=function(chunk, context, bodies, params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var money;
        try{
            if(utils.isNumeric(value)){
                value=parseFloat(value);
                money =value.toFixed(2);
            }else{
                money='';
            }
        }catch(ex){
            money='';
        }
        return chunk.write(money);
    };

    dust.helpers.extFormatCurrency=function(chunk, context, bodies, params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var money;
        try{
            if(utils.isNumeric(value)){
                value=parseFloat(value);
                money =value.toFixed(2);
                money = '$' + money.toString();
            }else{
                money='';
            }
        }catch(ex){
            money='';
        }
        return chunk.write(money);
    };


    dust.helpers.placeholder=function(chunk,context,bodies,params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var defaultValue=dust.helpers.tap(params.defaultValue, chunk, context);
        return (value) ? chunk.write(value) : chunk.write(defaultValue);
    };


    dust.helpers.phraseCase = function (chunk, context, bodies, params) {
        var value = dust.helpers.tap(params.value, chunk, context);
        value = string.camelCaseToSpace(value);
        return chunk.write(value);
    };

    dust.helpers.checked=function(chunk,context,bodies,params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var checked='';
        if(value){
            checked='checked';
        }
        return chunk.write(checked);
    };

    dust.helpers.radio=function(chunk,context,bodies,params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var key= dust.helpers.tap(params.key, chunk, context);
        var checked='';
        try{
            if(value && value.toLowerCase()===key.toLowerCase()){
                checked='checked';
            }
        }catch(ex){

        }
        return chunk.write(checked);
    };


    dust.helpers.selected=function(chunk,context,bodies,params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var key= dust.helpers.tap(params.key, chunk, context);
        var selected='';
        try{
            if(value && value.toLowerCase()===key.toLowerCase()){
                selected='selected';
            }
        }catch(ex){

        }
        return chunk.write(selected);
    };

    dust.helpers.truthy=function(chunk,context,bodies,params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var true_= dust.helpers.tap(params.true, chunk, context);
        var false_= dust.helpers.tap(params.false, chunk, context);

        var out=(value) ? true_ : false_;

        return chunk.write(out);
    };

    dust.helpers.hide=function(chunk,context,bodies,params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var hide='';
        if(value){
            hide='hide';
        }
        return chunk.write(hide);
    };

    dust.helpers.disable=function(chunk,context,bodies,params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var disable='';
        if(value){
            disable='disabled';
        }
        return chunk.write(disable);
    };

    dust.helpers.readonly=function(chunk,context,bodies,params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var readOnly='';
        if(value){
            readOnly='readonly';
        }
        return chunk.write(readOnly);
    };

    dust.helpers.position=function(chunk,context,bodies){
        var value=context.stack.index + 1;
        return chunk.write(value);
    };

    dust.helpers.index=function(chunk,context,bodies){
        var value=context.stack.index;
        return chunk.write(value);
    };

    dust.helpers.urlEncode=function(chunk, context, bodies, params){
        var value = dust.helpers.tap(params.value, chunk, context);
        if (value) {
            value=encodeURIComponent(value);
        }else{
            value='';
        }
        return chunk.write(value);
    };

    dust.helpers.toggle=function(chunk, context, bodies, params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var on=dust.helpers.tap(params.on, chunk, context);
        var onCss=dust.helpers.tap(params.onCss, chunk, context);
        var offCss=dust.helpers.tap(params.offCss, chunk, context);
        css=(value===on) ? onCss : offCss;

        return chunk.write(css);
    };

    dust.helpers.compare=function(chunk, context, bodies, params){
        var output='';
        var value = dust.helpers.tap(params.value, chunk, context);
        var test=dust.helpers.tap(params.test, chunk, context);
        var echo=dust.helpers.tap(params.echo, chunk, context);

        if(value===test){
            output=echo;
        }

        return chunk.write(output);
    };


    dust.helpers.pluralize=function(chunk,context,bodies,params){
        var count = dust.helpers.tap(params.count, chunk, context);
        var singular = dust.helpers.tap(params.singular, chunk, context);
        var plural = dust.helpers.tap(params.plural, chunk, context);

        var text=(count===1) ? singular : plural;
        return chunk.write(text);
    };

    dust.helpers.id=function(chunk, context, bodies, params){
        var id = dust.helpers.tap(params.value, chunk, context);
        if(id===undefined){
            id=random.id();
        }

        return chunk.write(id);
    };

    dust.helpers.guid=function(chunk, context, bodies, params){
        var id = dust.helpers.tap(params.value, chunk, context);
        if(id===undefined || id===''){
            id=random.guid();
        }

        return chunk.write(id);
    };


    dust.helpers.inline={};

    dust.helpers.inline.formatCurrency=function(val){
        val=parseFloat(val);
        var money;
        try{
            if(utils.isNumeric(val)){
                money =val.toFixed(2);
            }else{
                money='';
            }
        }catch(ex){
            money='';
        }

        return money;
    };

    dust.helpers.inline.extFormatCurrency=function(val){
        val=parseFloat(val);
        var money;
        if(utils.isNumeric(val)){
            money =val.toFixed(2);
            money = '$' + money.toString();
        }else{
            money='';
        }

        return money;
    };


    return dust;
}));

