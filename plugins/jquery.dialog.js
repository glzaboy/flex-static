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
        "<div class='jquerydialog modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class=\"modal-header\">\n" +
        "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><i class=\"pci-cross pci-circle\"></i></button>\n" +
        "                    <h4 class=\"modal-title\">Modal Heading</h4>\n" +
        "                </div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>",
        footer:
            "<div class='modal-footer'></div>",
        form:
            "<form class='bootbox-form'></form>",
        inputs: {
            text:
                "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
            textarea:
                "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
            email:
                "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
            select:
                "<select class='bootbox-input bootbox-input-select form-control'></select>",
            checkbox:
                "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
            date:
                "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
            time:
                "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
            number:
                "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
            password:
                "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
        }
    };
    function each(collection, iterator) {
        var index = 0;
        $.each(collection, function(key, value) {
            iterator(key, value, index++);
        });
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
        }
        if (buttonStr.length) {
            this.$element.find(".modal-footer").html(buttonStr);
        }

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