# FlyEdit
*This jquery plugin helps you to edit table cell text on the fly a very easy way*

## Screen Shot

![FlyEdit sample screen shot](https://github.com/saikatdutta1991/FlyEdit/blob/master/screenshots/screenshot.png?raw=true "FlyEdit sample screen shot")

*on hover pencil  icon(need to add fontawesome css)*

![FlyEdit sample screen shot](https://raw.githubusercontent.com/saikatdutta1991/FlyEdit/master/screenshots/3Cscreencapture-1526724544272.png "FlyEdit sample screen shot")

## Usage
- import `.css` and `.js` file inside the html page.

```javascript
 <link rel="stylesheet" href="flyEdit.css">
```
```javascript
<script src="jquery.min.js "></script> // import jquery library before flyEdit.js file
<script src="flyEdit.js"></script>
```

- Add specific class name to the table cell(s) which you want to make editable.
```html
<tbody>
    <tr>
	<td class="my-flyedit-cell">John</td>
	<td>Doe</td>
	<td class="my-flyedit-cell">john@example.com</td>
    </tr>
</tbody>
............
..............
```
- Now initialize the FlyEdit library followed after importing `flyEdit.js`
```javascript
<script>
	$(document).ready(function () {
		$('.my-flyedit-cell').flyEdit({}, function (event, oldContent, newContent, container) {
			console.log(event, oldContent, newContent, container)
		}, function (event, container) {
			console.log(event, container)
		});
	})
</script>
```
###### note: container = table cell element, event = raw jquery event, oldContent = old cell value, newContent = new cell value

- Default editbox event is dobule click on the cell. So now if you double click on those specific cell edit box will be popup.
![snap](https://github.com/saikatdutta1991/FlyEdit/blob/master/screenshots/3Cscreencapture-1526648077380.png?raw=true "snap")

## Options
- 
