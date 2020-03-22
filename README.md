# suneditor-gallery-plugin
Image Gallery Plugin For SunEditor

This is a plugin for the [SunEditor](https://github.com/JiHong88/SunEditor).
This will get images from a given REST api and populate it for user to select. The REST API url can be changes from the following line of code which is at the editor initilization.

```javascript
"mediaurl":"http://localhost:8081/images/get"
```

REST API response
```javascript
result:= [{url: "/images/img1.jpg",name: "image1"},{url: "/images/img1.jpg",name: "Image2"}]
```
To see this in action run the following commands
```
npm install
npm start
```
