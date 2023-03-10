;(function($,_,undefined){"use strict";ips.controller.mixin('customIMGUSubmituploadImages','gallery.front.submit.uploadImages',true,function(){this.after('initialize',function(){console.log('customIMGUSubmituploadImages initialized');});this.after('filesAdded',function(){if($('#elGallerySubmit').find('[data-role="file"]').length>0){$('#play_icon').parent().hide();}});this.after('fileRemoved',function(){if($('#elGallerySubmit').find('[data-role="file"]').length===0){$('.cGalleryDialog_uploadStep').removeClass('cGalleryDialog_uploadStep');$('#play_icon').parent().show();}});});}(jQuery,_));;(function($,_,undefined){"use strict";ips.controller.mixin('customIMGUploadSubmitWrapper','gallery.front.submit.wrapper',true,function(){this.lastUrl='';this.after('initialize',function(){console.log('customIMGUploadSubmitWrapper initialized');$('#elGallerySubmit_imageUploader').hide();this.on('click','#play_icon',this.playClicked);this.on('input','#elGallerySubmit_imageUploader',this.imgUploaderChanged);this.on('keyup','#elGallerySubmit_imageUploader',this.imgUploaderChanged);this.on('blur','#elGallerySubmit_imageUploader',this.imgUploaderChanged);});this.playClicked=function(e){console.log("playClicked");$('#elGallerySubmit_imageUploader').show();this.scope.find('[data-role="submitForm"]').prop('disabled',false);$('#elGallerySubmit_imageUploader')[0].scrollIntoView();$('#elGallerySubmit_imageUploader').focus();};this.imgUploaderChanged=function(e){console.warn("imgUploaderChanged");let url=$('#elGallerySubmit_imageUploader input').val().trim();let key=event.keyCode||event.charCode;if(key!==undefined){if($.inArray(key,[16,17,18,20,9])){return true;}}
if(url.length>0){$('#img_error').hide();if(checkIfImage(url)){$('#img_error2').hide();this.updateThumbnail(url);this.scope.find('[data-role="submitForm"]').html(ips.getString("dp45galleryuploadurl_submit_image_via_url"));$('#elGallerySubmit_imageUploader').hide();}else{$('#img_error2').show();this.removeThumbnail();}}else{this.scope.find('[data-role="submitForm"]').html(ips.getString("dp45galleryuploadurl_submit_all_images"));$('#elGallerySubmit_imageUploader').show();$('#img_error2').hide();this.removeThumbnail();}};this.removeThumbnail=function(e){if($('#URLthumbContainer').length>0){$('#URLthumbContainer').remove();$('#image_details_URLthumbContainer').remove();$('.cGallerySubmit_preview').addClass('ipsBox_transparent').addClass('ipsNoThumb').addClass('ipsNoThumb_video').html("").show();$('.cGalleryDialog_uploadStep').removeClass('cGalleryDialog_uploadStep');}};this.updateThumbnail=function(url){if(url!=this.lastUrl){this.removeThumbnail();}
this.lastUrl=url;$('.cGalleryDialog').removeClass('cGalleryDialog_uploadStep').addClass('cGalleryDialog_uploadStep');let template="gallery.submit.imageItem";let listContainer=$('.cGallerySubmit_uploadImages [data-role="fileList"]');let data={id:'URLthumbContainer',imagesrc:url,thumbnail:url,thumb:'<img src="'+url+'" class="ipsImage">',isImage:true,title:url.substring(url.lastIndexOf("/")+1),field_name:'image_url',newUpload:' ',insertable:' ',done:false,'default':null,supportsDelete:false};if($('#URLthumbContainer').length===0){listContainer.append(ips.templates.render(template,data));$('#URLthumbContainer').click();}};function checkIfImage(url){return true;if(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi)!==null){console.log("valid url");return true;}
return false;}
this.around('submitForm',function(origFn,e){if($('#play_icon').parent().is(":hidden")){return origFn(e);}
let url=$('#elGallerySubmit_imageUploader input').val();if(typeof url!=='undefined'&&(url.length===0||!checkIfImage(url))){if(url.length===0){$('#img_error').show();$('#img_error2').hide();}else{$('#img_error').hide();$('#img_error2').show();}
e.preventDefault();e.stopPropagation();return false;}
return origFn(e);});});}(jQuery,_));;