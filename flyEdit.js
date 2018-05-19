/**
 * binding flyedit plugin with jquey
 */
(function ($) {

    //initializing plugin
    return $.fn.flyEdit = flyEdit;

    /**
     * this is the main pluign function
     */
    function flyEdit(options, okCallback, cancelCallback) {

        /**
         * store configurations 
         */
        let settings = {
            activation_event: 'dblclick', //activattion event
            ok_btn_text: 'Ok',
            cancel_btn_text: 'Cancel',
            ok_btn_default_classes: 'ok-btn btn btn-sm btn-success',
            cancel_btn_default_classes: 'cancel-btn btn btn-sm btn-danger',
            textarea_deafult_classes: 'form-control input-sm',
            ok_btn_custom_classes: '',
            cancel_btn_custom_classes: '',
            textarea_custom_classes: '',
            boxcontaner_position_relative: true,
            is_edit_btn: true,
            edit_btn_color: 'blue',
            edit_btn_template: '<i class="fa fa-pencil fa-2" aria-hidden="true"></i>'
        }


        /**
         * generate edit box element fragment and return with wrapped jquery
         */
        let buildTemplateNode = (function () {

            let template = `<div class="fly-edit-box">
                                <input type="text" class="${settings.textarea_deafult_classes} ${settings.textarea_custom_classes}">
                                <div class="buttons-div">
                                    <button type="button" class="${settings.ok_btn_default_classes} ${settings.ok_btn_custom_classes}">${settings.ok_btn_text}</button>
                                    <button type="button" class="${settings.cancel_btn_default_classes} ${settings.cancel_btn_custom_classes}">${settings.cancel_btn_text}</button>
                                </div>
                            </div>`;

            let boxelem = $(document.createRange().createContextualFragment(template));

            //bind enter event on text field
            boxelem.find('input[type="text"]').on('keypress', enterKeyOntextHandler)

            //bind ok button click handler 
            boxelem.find('.ok-btn').on('click', okButtonHandler)

            //bind cancel button click handler 
            boxelem.find('.cancel-btn').on('click', cancelButtonHandler)

            return boxelem;


        }).bind(this)



        /**
         * enter key on text field handler
         */
        let enterKeyOntextHandler = function (event) {
            if (event.keyCode == 13) {  // detect the enter key
                $(this).parent().find('.ok-btn').trigger('click')
            }
        }




        /**
         * ok button click handler
         */
        let cancelButtonHandler = function (event) {

            //hold editbox container element
            var boxContainer = $(this).parent().parent().parent();

            let removeboxElem = true //remove editbox by default

            if (cancelCallback) {
                removeboxElem = cancelCallback.apply(this, [event, boxContainer]);
            }


            //if callback returns true means remove editbox
            if (removeboxElem || removeboxElem === null || removeboxElem === undefined) {
                removeEditBox(boxContainer);
            }



        }



        /** 
         * remove edit box
         */
        function removeEditBox(boxContainer) {

            //remove edit box
            boxContainer.find('.fly-edit-box').remove();

            //bind activate handler with activation_event with main container     
            setTimeout(() => {
                boxContainer.on(settings.activation_event, activateHandler);
            }, 0)
        }



        /**
         * ok button click handler
         */
        let okButtonHandler = function (event) {

            //hold editbox container element
            var boxContainer = $(this).parent().parent().parent();

            //retrive textarea data and pass to ok callback
            var newContent = $(this).parent().parent().find('input[type="text"]').val()
            var oldContent = $(this).parent().parent().find('input[type="text"]').val()

            //replace old content in container
            let replaceold = true

            if (okCallback) {
                okCallback.bind(boxContainer);
                replaceold = okCallback.apply(this, [event, oldContent, newContent, boxContainer]);
            }

            //if callback returns true means remove editbox
            if (replaceold == true || replaceold === null || replaceold === undefined) {

                //remove exit box
                removeEditBox(boxContainer);

                //replace old content of container
                boxContainer.text(newContent)


            }


        }



        /**
         * flyedit activate handler(click on bind element to show editbox)
         */
        let activateHandler = function (event) {

            //boxcontainer element
            let boxContainerElem = $(this)

            //if box already added then return
            if (boxContainerElem.find('.fly-edit-box').length) {
                return false;
            }


            //box element
            let box = buildTemplateNode();

            //prefill box with text
            let text = box.find('input[type="text"]');
            text.val(boxContainerElem.text())
            setTimeout(() => { text.select() }, 0)


            //add box to container
            boxContainerElem.append(box)

            //after appending child node, find element from parent node and fadein
            boxContainerElem.find('.fly-edit-box').css('opacity', 0).animate({ 'opacity': 1 }, 500);

            //remove click event from container
            boxContainerElem.off(settings.activation_event, activateHandler)

        }



        /** 
         * edit button click handler
        */
        let editButtonClickHandler = function (event) {
            $(this).parent().trigger(settings.activation_event)
        }


        /**
         * get edit icon element
         */
        let editBtn = null;
        let editIconElement = function () {

            let template = `<span class="flyedit-edit-btn" style="color:${settings.edit_btn_color}">
                                ${settings.edit_btn_template}
                            </span>`;
            editBtn = $(document.createRange().createContextualFragment(template));

            //binding click event on edit button
            editBtn.children().on('click', editButtonClickHandler)

            return editBtn;

        }.bind(this)



        /** main logic goes here */


        //merge options and default settings
        settings = $.extend(settings, options);

        //bind activate handler with activation_event
        this.on(settings.activation_event, activateHandler);

        //make box conatiner position relative
        if (settings.boxcontaner_position_relative) {
            this.css({ position: 'relative' })
        }


        if (settings.is_edit_btn) {

            this.append(editIconElement())

            //hide show on hover

            this.each((index) => {

                $(this[index]).hover(() => {
                    $(this[index]).children('.flyedit-edit-btn').css('opacity', 0).animate({ 'opacity': 1 }, 100)
                }, () => {
                    $(this[index]).children('.flyedit-edit-btn').css('opacity', 1).animate({ 'opacity': 0 }, 100)
                })
            })

        }

        /** main logic ends*/



    }





}(jQuery));