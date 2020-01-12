(function (factory) {

    "use strict";
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    } else if (typeof exports === "object") {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("jquery"));
    } else {
        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
    }

}(function ($){
    var op={
        "escapeurl":function (str) {
            var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
            return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
        },
        'geturlparam':function (name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]); return null;
        },
        'geturlparams':function (){
            var args = {};
            var match = null;
            var search = decodeURIComponent(location.search.substring(1));
            var reg = /(?:([^&]+)=([^&]+))/g;
            while((match = reg.exec(search))!==null){
                args[match[1]] = match[2];
            }
            return args;
        }
    };
    $.extend({
        "escapeurl":op.escapeurl,
        'geturlparam':op.geturlparam,
        'geturlparams':op.geturlparams,
        'replaceurlparams':function (params, pathname){
            var pathname=pathname?pathname:window.location.href.replace(/\?.{0,}/,'');
            var search=window.location.search?window.location.search:'';
            $.each(params,function (index,obj){
                console.log(index);
                console.log(obj);
                var reg = new RegExp("(^|&)" + index + "=[^&]*", "i");
                if(op.geturlparam(index)){
                    search='?'+search.substr(1).replace(reg,RegExp.$1+index+'='+obj);
                }else{
                    if(search.match(/^\?/) && search.length>1){
                        search=search+'&'+index+'='+encodeURIComponent(obj);
                    }else{
                        search='?'+index+'='+encodeURIComponent(obj);
                    }
                }
            });
            window.location.href=pathname+search;
        }
    });
    $.extend({
        'replaceurlparam':function (name,value, pathname) {
           $.replaceurlparams(JSON.parse('{"'+name+'": "'+value+'"}'), pathname);
        }
    });
    $.fn.extend({
        'formErrorReset':function (){
            $(this).each(function (index,item){
                var hasinline =$(this).hasClass('form-inline');
                $(this).find('.alert').remove();
                $(this).find('.form-group,.checkbox,.radio').each(
                    function(index,item) {
                        if(hasinline){
                            $(this).removeClass('has-error').find('input,textarea,select').each(function (){
                                $(this).tooltip('destroy');
                            });
                            $(this).tooltip('destroy');
                        }else{
                            if ($(this).hasClass('has-error')&& $(this).find('.help-block').data('orgtext')) {
                                $(this).removeClass('has-error').find('.help-block').html($(this).find('.help-block').data('orgtext'));
                            } else if($(this).hasClass('has-error')) {
                                $(this).removeClass('has-error').find('.help-block').remove();
                            }
                        }
                    }
                );
            });
            return $(this);
        },
        'formFiledError':function (message){
            var formgroup = $(this).parents('.form-group,.checkbox,.radio');
            var isCheckBox=$(this).attr('type')=='checkbox'|| $(this).attr('type')=='radio';
            var hasinline=$(this).parents('form').hasClass('form-inline');
            if (formgroup.length) {
                formgroup.addClass('has-error');
                if(isCheckBox && !formgroup.hasClass('checkbox')){
                    formgroup.addClass('checkbox');
                }
                if (formgroup.find('.help-block').length) {
                    html = formgroup.find('.help-block').html();
                    formgroup.find('.help-block').data('orgtext',html).html(message);
                } else {
                    if(hasinline){
                        window.setTimeout(function (){
                            formgroup.tooltip({
                                container: 'body',
                                html: true,
                                placement: 'top',
                                title: message
                            })
                        },500);
                    }else{
                        $(this).parent().append('<small class=\"help-block\">'+ message+ '</small>');
                    }

                }
            }else{
                $(this).parent('form').prepend('<div class=\"alert alert-danger\"><button class=\"close\" data-dismiss=\"alert\"><i class=\"pci-cross pci-circle\"></i></button>'+obj+'</div>');
            }
        }
    });
    /**
     * link ajax ajaxask
     */
    $('body').on('req.ajax','.ajax',function(e){
        var linkobj=$(this);
        var title = linkobj.attr('title');
        if (!title) {
            title = linkobj.text();
        }
        var url = $(this).attr('href');
        console.log('url'+url);
        if(linkobj.data('ajaxing')){
            $.niftyNoty({
                type: 'danger',
                message : '程序已经提交中了，请稍后片刻。',
                container : 'floating',
                timer : 5000
            });
            return false;
        }
        linkobj.data('ajaxing',true);
        $.ajax({
                type : 'GET',
                url : url,
                dataType : 'json',
                'data':{form:'.ajax'}
            }
        ).done(function(data) {
            console.log(data);
            if(data.linkTextChange){
                linkobj.text(data.linkTextChange)
            }
            if(data.linkTextChange){
                linkobj.text(data.linkTextChange)
            }
            if(data.autoJump && data.link && data.link.length>0){
                window.setTimeout(function() {
                    window.location.href = data.link;
                }, data.autoJump*1000);
            }
            if(data.autoHide){
                if(typeof data.autoHide ==='string' && linkobj.parents(data.autoHide).length){
                    linkobj.parents(data.autoHide).hide(1000,function (){$(this).remove();});
                }else{
                    linkobj.hide(1000,function (){$(this).remove();});
                }
            }
            if(data.message){
                $dialogoption={};
                $dialogoption.message=data.message;
                $dialogoption.title='提示信息';
                $dialogoption.buttons={};
                if (data.link && data.link.length>0) {
                    $dialogoption.buttons.ok = {
                        label : '确定',
                        className: "btn-primary",
                        callback : function() {
                            window.location.href = data.link;
                        }
                    } ;
                } else {
                    $dialogoption.buttons.ok = {
                        label : '确定',
                        className: "btn-primary",
                        callback : function() {
                        }
                    } ;
                }
                $.dialog("remove");
                $.dialog($dialogoption);
            }
        }).fail(function (jqXHR, textStatus) {
            $.niftyNoty({
                type: 'danger',
                message : textStatus,
                container : 'floating',
                timer : 5000
            });
        }).always(function (xx){
            linkobj.data('ajaxing',false);
        });
    });
    $('body').on('click','.ajaxask,.ajax',function(e){
        e.preventDefault();
        var linkobj=$(this);
        if(!linkobj.hasClass("ajax")){
            linkobj.addClass("ajax");
        }
        if(linkobj.hasClass("ajaxask")){
            var asktext = linkobj.data('asktext') ? linkobj.data('asktext') : "您确定要" + linkobj.text()+ "?";
            $dialogoption={};
            $dialogoption.message=asktext;
            $dialogoption.title='提示信息';
            $dialogoption.buttons={};
            $dialogoption.buttons.ok = {
                label : '确定',
                className: "btn-primary",
                callback : function() {
                    linkobj.trigger('req.ajax')
                }
            } ;
            $dialogoption.buttons.cancel = {
                label : '取消',
                className: "btn",
                callback : function() {
                }
            } ;
            $.dialog("remove");
            return $.dialog($dialogoption);
        };
        $(this).trigger('req.ajax');
    });
    $('body').on('click','.ajaxdialog',function(e){
        e.preventDefault();
        var linkobj=$(this);
        var title=linkobj.attr('title');
        if(!title){
            title=linkobj.text();
        }
        var url=linkobj.attr('href');
        $dialogoption={};
        $dialogoption.url=url;
        $dialogoption.title=title;
        $dialogoption.buttons={};
        $dialogoption.buttons.ok = {
            label : '提交',
            className: "btn-primary",
            callback : function(event){
                var form=$('.jquerydialog').find('form');
                if(form.length){
                    form.trigger('submit');
                }
                return false;
            }
        } ;
        $dialogoption.buttons.cancel = {
            label : '取消',
            className: "btn",
            callback : function() {
            }
        } ;
        return $.dialog($dialogoption);
    });
    $('body').on('submit','form.ajaxform',function(e){
        e.preventDefault();
        var jqueryfrom = $(this);
        if(jqueryfrom.data('submiting')){
            $.niftyNoty({
                type: 'danger',
                message : '程序已经提交中了，请稍后片刻。',
                container : 'floating',
                timer : 5000
            });
            return false;
        }
        jqueryfrom.data('submiting',1);
        var options={};
        options.url=jqueryfrom.attr('action')?jqueryfrom.attr('action'):window.location.href;
        options.type=jqueryfrom.attr('method')?jqueryfrom.attr('method'):'GET';
        options.data=jqueryfrom.serializeArray();
        options.dataType ='json';
        if (options.type.toUpperCase() == 'GET') {
            var queryString = $.param( options.data);
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + queryString;
            options.data = null;  // data is null for 'get'
        }
        // console.log(options);
        jqueryfrom.formErrorReset();
        $.ajax(options)
        .done(function (data, statusText){
                console.log(data);
                if(data.message){
                    $dialogoption={};
                    $dialogoption.message=data.message;
                    $dialogoption.title='提示信息';
                    $dialogoption.buttons={};
                    if (data.link && data.link.length>0) {
                        $dialogoption.buttons.ok = {
                            label : '确定',
                            className: "btn-primary",
                            callback : function() {
                                window.location.href = data.link;
                            }
                        } ;
                    } else {
                        $dialogoption.buttons.ok = {
                            label : '确定',
                            className: "btn-primary",
                            callback : function() {
                            }
                        } ;
                    }
                    $.dialog("remove");
                    $.dialog($dialogoption);
                }
                if(data.autoJump && data.link && data.link.length>0){
                    window.setTimeout(function() {
                        window.location.href = $.escapeurl(data.link);
                    }, data.autoJump*1000);
                }
                // console.log(data.error)
                if(data.error){
                    $.each(data.error,function (index,obj){
                        var fieldobj=jqueryfrom.find('input[name=\''+ index+ '\'],textarea[name=\''+ index+ '\'],select[name=\''+ index+ '\']');
                        var formgroup = fieldobj.parents('.form-group,.checkbox,.radio');
                        if(fieldobj.length && formgroup.length){
                            fieldobj.formFiledError(obj);
                        }else{
                            jqueryfrom.prepend('<div class=\"alert alert-danger\"><button class=\"close\" data-dismiss=\"alert\"><i class=\"pci-cross pci-circle\"></i></button>'+obj+'</div>');
                        }
                    });
                }
        }).fail(function (jqXHR, statusText){
            // console.error(statusText);
            $.niftyNoty({
                type: 'danger',
                message : '提交数据出错，可能是服务器正在维护或是网络问题，请稍后再试。',
                container : 'floating',
                timer : 5000
            });
        }).always(function (){
            jqueryfrom.data('submiting',0);
            console.log("complete");
        });
    });
}));