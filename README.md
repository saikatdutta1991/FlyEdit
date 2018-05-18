# FlyEdit
*This jquery plugin helps you to edit table cell text on the fly a very easy way*

## Screen Shot

![FlyEdit sample screen shot](https://github.com/saikatdutta1991/FlyEdit/blob/master/screenshot.png?raw=true "FlyEdit sample screen shot")

## Usage
```javascript
$(document).ready(function () {
	$('.flyedit').flyEdit({}, function (event, oldContent, newContent, container) {
		console.log(container)
	}, function (event) {
		// alert('cancel button clicked')
	});
})
```
