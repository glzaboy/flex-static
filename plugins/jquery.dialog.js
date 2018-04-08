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
    // the base DOM structure needed to create a modal
    var templates = {
        dialog:
        "<div class='jquerydialog modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'> <button type='button' class='close' data-dismiss='modal'><i class='pci-cross pci-circl'></i></button>" +
        "<h4 class='modal-title'>Modal Heading</h4></div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>",
        form:
            "<form class='bootbox-form'></form>"
    };
    function each(collection, iterator) {
        var index = 0;
        $.each(collection, function(key, value) {
            iterator(key, value, index++);
        });
    }
    function processCallback(e, dialog, callback) {
        e.stopPropagation();
        e.preventDefault();

        // by default we assume a callback will get rid of the dialog,
        // although it is given the opportunity to override this

        // so, if the callback can be invoked and it *explicitly returns false*
        // then we'll set a flag to keep the dialog active...
        var preserveDialog = $.isFunction(callback) && callback(e) === false;

        // ... otherwise we'll bin it
        if (!preserveDialog) {
            Plugin("hide");
        }
    }
    var dialog = function (element, options) {
        this.$element      = $(element)
        this.options       = $.extend({}, dialog.DEFAULTS, options);
        console.log(this.options);
        var body = this.$element.find(".modal-body");
        var buttonStr = "";
        var callbacks = {
            onEscape: options.onEscape
        };
        each(this.options.buttons, function(key, button) {

            // @TODO I don't like this string appending to itself; bit dirty. Needs reworking
            // can we just build up button elements instead? slower but neater. Then button
            // can just become a template too
            buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>";
            callbacks[key] = button.callback;
        });

        // if (this.options.title) {
        //     body.before(templates.header);
        // }
        if (this.options.title) {
            this.$element.find(".modal-title").html(this.options.title);
        }
        if (this.options.url) {
            this.load(this.options.url);
        }else{
            this.$element.find('.modal-body').html(this.options.message);
        }
        if (buttonStr.length) {
            this.$element.find(".modal-footer").html(buttonStr);
        }
        this.$element.on('click',".modal-footer button", function(e) {
            var callbackKey = $(this).data("bb-handler");

            processCallback(e, dialog, callbacks[callbackKey]);

        });

        this.$element.modal(this.options);
    }
    dialog.DEFAULTS={
        title:'提示消息',
        remote:'',
        backdrop: false,
        keyboard: true,
        show: true
    };
    dialog.prototype.hide=function (){
        this.$element.modal('hide');
    }
    dialog.prototype.show=function (){
        this.$element.modal('show');
    }
    dialog.prototype.load=function (url){
        this.$element
            .find('.modal-body')
            .load(url, $.proxy(function () {
                this.$element.trigger('loaded.bs.modal')
            }, this));
        this.$element.modal('show');
    }

    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        var jquerydialog=$('.jquerydialog');
        if(jquerydialog.length){
            jquerydialog.each(function () {
                var $this   = $(this)
                var data    = $this.data('bs.dialog')
                var options = $.extend({}, dialog.DEFAULTS, $this.data(), typeof option == 'object' && option)

                if (!data) $this.data('bs.dialog', (data = new dialog(this, options)))
                if (typeof option == 'string') data[option](_relatedTarget)
                else if (options.show) data.show(_relatedTarget)
            });
        }else{
            return $(templates.dialog).each(function () {
                var $this   = $(this)
                var data    = $this.data('bs.dialog')
                var options = $.extend({}, dialog.DEFAULTS, $this.data(), typeof option == 'object' && option)

                if (!data) $this.data('bs.dialog', (data = new dialog(this, options)))
                if (typeof option == 'string') data[option](_relatedTarget)
                else if (options.show) data.show(_relatedTarget)
            });
        }
    }
    var old = $.dialog;

    $.dialog             = Plugin
    $.dialog.Constructor = dialog


    // COLLAPSE NO CONFLICT
    // ====================

    $.dialog.noConflict = function () {
        $.dialog = old
        return this;
    };
}));